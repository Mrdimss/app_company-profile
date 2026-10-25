import { NextResponse } from "next/server";
import { consumeContactMessageAttempt } from "@/lib/admin-login-rate-limit";
import { sendContactEmail } from "@/lib/contact-email";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

const MAX_REQUEST_BYTES = 16_000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ContactMessage = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  country: string;
  message: string;
};

function normalizeSingleLine(value: unknown, maxLength: number): string | null {
  if (typeof value !== "string") return null;
  const normalized = value.replace(/[\u0000-\u001f\u007f]+/g, " ").trim();
  return normalized && normalized.length <= maxLength ? normalized : null;
}

function parseContactMessage(body: unknown): ContactMessage | null {
  if (!body || typeof body !== "object" || Array.isArray(body)) return null;

  const values = body as Record<string, unknown>;
  const firstName = normalizeSingleLine(values.firstName, 80);
  const lastName = normalizeSingleLine(values.lastName, 80);
  const email = normalizeSingleLine(values.email, 254)?.toLowerCase() ?? null;
  const phone = normalizeSingleLine(values.phone, 40);
  const company = normalizeSingleLine(values.company, 120);
  const country = normalizeSingleLine(values.country, 100);
  const message =
    typeof values.message === "string"
      ? values.message.replace(/\r\n?/g, "\n").replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "").trim()
      : null;

  if (
    !firstName ||
    !lastName ||
    firstName.length + lastName.length + 1 > 160 ||
    !email ||
    !EMAIL_PATTERN.test(email) ||
    !phone ||
    !company ||
    !country ||
    !message ||
    message.length > 5000
  ) {
    return null;
  }

  return { firstName, lastName, email, phone, company, country, message };
}

function getClientIp(request: Request): string {
  const realIp = request.headers.get("x-real-ip")?.trim();
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const clientIp = realIp || forwardedFor;

  return clientIp && clientIp.length <= 100 ? clientIp : "unknown";
}

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";
  if (contentType.split(";")[0].trim().toLowerCase() !== "application/json") {
    return NextResponse.json({ error: "Request format is not supported." }, { status: 415 });
  }

  const contentLength = Number(request.headers.get("content-length"));
  if (Number.isFinite(contentLength) && contentLength > MAX_REQUEST_BYTES) {
    return NextResponse.json({ error: "Your message is too large." }, { status: 413 });
  }

  let rawBody: string;
  try {
    rawBody = await request.text();
  } catch {
    return NextResponse.json({ error: "Request data could not be read." }, { status: 400 });
  }

  if (new TextEncoder().encode(rawBody).byteLength > MAX_REQUEST_BYTES) {
    return NextResponse.json({ error: "Your message is too large." }, { status: 413 });
  }

  let body: unknown;
  try {
    body = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Request data is not valid JSON." }, { status: 400 });
  }

  const contact = parseContactMessage(body);
  if (!contact) {
    return NextResponse.json(
      { error: "Please provide valid values for all required fields." },
      { status: 400 },
    );
  }

  try {
    const rateLimit = await consumeContactMessageAttempt(getClientIp(request));
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: "Too many messages have been sent. Please try again shortly." },
        {
          status: 429,
          headers: { "Retry-After": String(rateLimit.retryAfterSeconds) },
        },
      );
    }

    const name = `${contact.firstName} ${contact.lastName}`;
    const subject = `Website contact from ${name}`;
    const savedMessage = await prisma.contactMessage.create({
      data: {
        name,
        email: contact.email,
        subject,
        message: contact.message,
        phone: contact.phone,
        company: contact.company,
        country: contact.country,
      },
    });

    const emailSent = await sendContactEmail({
      name: savedMessage.name,
      email: savedMessage.email,
      subject: savedMessage.subject,
      message: savedMessage.message,
      phone: savedMessage.phone,
      company: savedMessage.company,
      country: savedMessage.country,
      receivedAt: savedMessage.createdAt,
    });

    await prisma.contactMessage.update({
      where: { id: savedMessage.id },
      data: { emailNotification: emailSent ? "SENT" : "FAILED" },
    }).catch(() => {
      console.error("Contact email notification status could not be saved.");
    });

    return NextResponse.json({ ok: true, emailSent });
  } catch (error) {
    console.error("Contact message save failed:", error);
    return NextResponse.json(
      { error: "We could not save your message. Please try again later." },
      { status: 500 },
    );
  }
}
