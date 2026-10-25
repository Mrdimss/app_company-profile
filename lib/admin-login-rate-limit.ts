import "server-only";

import { createHash } from "node:crypto";
import { prisma } from "@/lib/prisma";

const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 5;
const BLOCK_DURATION_MS = 60 * 1000;
const THROTTLE_RETENTION_MS = 24 * 60 * 60 * 1000;
const CLEANUP_INTERVAL = 256;

let requestsSinceCleanup = 0;

function getThrottleId(scope: string, identifier: string): string {
  return createHash("sha256")
    .update(`${scope}:${identifier}`)
    .digest("hex");
}

async function consumeThrottleAttempt(scope: string, identifier: string) {
  const now = new Date();
  const windowExpiredAt = new Date(now.getTime() - WINDOW_MS);
  const id = getThrottleId(scope, identifier);

  await prisma.$executeRaw`
    INSERT INTO \`admin_login_throttles\`
      (\`id\`, \`attempts\`, \`window_started_at\`, \`blocked_until\`, \`updated_at\`)
    VALUES (${id}, 1, ${now}, NULL, ${now})
    ON DUPLICATE KEY UPDATE
      \`attempts\` = IF(
        \`window_started_at\` <= ${windowExpiredAt}
          OR \`blocked_until\` <= ${now},
        1,
        \`attempts\` + 1
      ),
      \`window_started_at\` = IF(
        \`window_started_at\` <= ${windowExpiredAt}
          OR \`blocked_until\` <= ${now},
        ${now},
        \`window_started_at\`
      ),
      \`blocked_until\` = IF(
        \`window_started_at\` <= ${windowExpiredAt}
          OR \`blocked_until\` <= ${now},
        NULL,
        \`blocked_until\`
      ),
      \`updated_at\` = ${now}
  `;

  let throttle = await prisma.adminLoginThrottle.findUniqueOrThrow({
    where: { id },
    select: { attempts: true, blockedUntil: true },
  });

  if (throttle.blockedUntil && throttle.blockedUntil > now) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(
        1,
        Math.ceil((throttle.blockedUntil.getTime() - now.getTime()) / 1000),
      ),
    };
  }

  if (throttle.attempts > MAX_ATTEMPTS) {
    const blockedUntil = new Date(now.getTime() + BLOCK_DURATION_MS);
    await prisma.adminLoginThrottle.updateMany({
      where: { id, blockedUntil: null },
      data: { blockedUntil },
    });
    throttle = await prisma.adminLoginThrottle.findUniqueOrThrow({
      where: { id },
      select: { attempts: true, blockedUntil: true },
    });

    return {
      allowed: false,
      retryAfterSeconds: throttle.blockedUntil
        ? Math.max(
            1,
            Math.ceil((throttle.blockedUntil.getTime() - now.getTime()) / 1000),
          )
        : Math.ceil(BLOCK_DURATION_MS / 1000),
    };
  }

  requestsSinceCleanup += 1;
  if (requestsSinceCleanup >= CLEANUP_INTERVAL) {
    requestsSinceCleanup = 0;
    await prisma.adminLoginThrottle.deleteMany({
      where: {
        updatedAt: {
          lt: new Date(now.getTime() - THROTTLE_RETENTION_MS),
        },
      },
    });
  }

  return { allowed: true, retryAfterSeconds: 0 };
}

export function consumeAdminLoginAttempt(email: string) {
  return consumeThrottleAttempt("admin-login", email);
}

export function consumeContactMessageAttempt(clientIp: string) {
  return consumeThrottleAttempt("contact-message", clientIp);
}

export async function clearAdminLoginAttempts(email: string) {
  await prisma.adminLoginThrottle.deleteMany({
    where: { id: getThrottleId("admin-login", email) },
  });
}
