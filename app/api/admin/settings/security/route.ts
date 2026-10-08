import { compare, hash } from "bcryptjs";
import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function PUT(request: Request) {
  const session = await getAdminSession();

  if (!session) {
    return NextResponse.json({ error: "Sesi admin tidak valid." }, { status: 401 });
  }

  let body: {
    currentPassword?: unknown;
    newPassword?: unknown;
    confirmPassword?: unknown;
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Data keamanan tidak valid." }, { status: 400 });
  }

  if (
    typeof body.currentPassword !== "string" ||
    typeof body.newPassword !== "string" ||
    typeof body.confirmPassword !== "string"
  ) {
    return NextResponse.json({ error: "Lengkapi semua field password." }, { status: 400 });
  }

  const { currentPassword, newPassword, confirmPassword } = body;

  if (Buffer.byteLength(currentPassword, "utf8") > 72) {
    return NextResponse.json({ error: "Password saat ini tidak valid." }, { status: 400 });
  }

  if (
    newPassword.length < 12 ||
    Buffer.byteLength(newPassword, "utf8") > 72 ||
    newPassword !== confirmPassword
  ) {
    return NextResponse.json(
      { error: "Password baru minimal 12 karakter, maksimal 72 byte, dan harus cocok dengan konfirmasi." },
      { status: 400 },
    );
  }

  const admin = await prisma.adminUser.findUnique({ where: { id: session.admin.id } });

  if (!admin || !(await compare(currentPassword, admin.passwordHash))) {
    return NextResponse.json({ error: "Password saat ini salah." }, { status: 403 });
  }

  const passwordHash = await hash(newPassword, 12);

  await prisma.$transaction([
    prisma.adminUser.update({
      where: { id: admin.id },
      data: { passwordHash },
    }),
    prisma.adminSession.deleteMany({
      where: { userId: admin.id, id: { not: session.id } },
    }),
  ]);

  return NextResponse.json({ ok: true });
}