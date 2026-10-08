import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function PUT(request: Request) {
  const session = await getAdminSession();

  if (!session) {
    return NextResponse.json({ error: "Sesi admin tidak valid." }, { status: 401 });
  }

  let body: { name?: unknown; email?: unknown };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Data profil tidak valid." }, { status: 400 });
  }

  if (typeof body.name !== "string" || typeof body.email !== "string") {
    return NextResponse.json({ error: "Nama dan email wajib diisi." }, { status: 400 });
  }

  const name = body.name.trim();
  const email = body.email.trim().toLowerCase();

  if (!name || name.length > 100) {
    return NextResponse.json({ error: "Nama wajib diisi dan maksimal 100 karakter." }, { status: 400 });
  }

  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Format email tidak valid." }, { status: 400 });
  }

  try {
    const currentAdmin = await prisma.adminUser.findUnique({
      where: { id: session.admin.id },
      select: { email: true },
    });
    const emailChanged = currentAdmin?.email !== email;

    const admin = await prisma.$transaction(async (transaction) => {
      const updated = await transaction.adminUser.update({
        where: { id: session.admin.id },
        data: { name, email },
        select: { id: true, name: true, email: true },
      });

      if (emailChanged) {
        await transaction.adminSession.deleteMany({
          where: { userId: session.admin.id, id: { not: session.id } },
        });
      }

      return updated;
    });

    return NextResponse.json({ ok: true, admin });
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "P2002"
    ) {
      return NextResponse.json({ error: "Email tersebut sudah digunakan." }, { status: 409 });
    }

    return NextResponse.json({ error: "Profil admin gagal disimpan." }, { status: 500 });
  }
}