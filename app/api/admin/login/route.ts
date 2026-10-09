
import { compare } from "bcryptjs";
import { NextResponse } from "next/server";
import { createAdminSession } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    let credentials: {
      email?: unknown;
      password?: unknown;
    };

    try {
      credentials = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Data login tidak valid." },
        { status: 400 }
      );
    }

    if (
      typeof credentials.email !== "string" ||
      typeof credentials.password !== "string" ||
      credentials.email.length > 254 ||
      credentials.password.length > 256
    ) {
      return NextResponse.json(
        { error: "Email atau password salah." },
        { status: 400 }
      );
    }

    const email = credentials.email.trim().toLowerCase();
    const admin = await prisma.adminUser.findUnique({
      where: { email },
      select: {
        id: true,
        passwordHash: true,
      },
    });

    if (!admin) {
      return NextResponse.json(
        { error: "Email atau password salah." },
        { status: 401 }
      );
    }

    const validPassword = await compare(credentials.password, admin.passwordHash);

    if (!validPassword) {
      return NextResponse.json(
        { error: "Email atau password salah." },
        { status: 401 }
      );
    }

    await createAdminSession(admin.id);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Admin login failed:", error);
    return NextResponse.json(
      { error: "Login gagal. Silakan coba lagi." },
      { status: 500 },
    );
  }
}