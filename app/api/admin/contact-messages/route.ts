import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

const MESSAGE_STATUSES = ["UNREAD", "READ"] as const;

export async function GET(request: Request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Sesi admin tidak valid." }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search")?.trim() ?? "";
    const status = searchParams.get("status") ?? "";

    if (search.length > 100) {
      return NextResponse.json({ error: "Kata pencarian maksimal 100 karakter." }, { status: 400 });
    }
    if (status && !MESSAGE_STATUSES.includes(status as (typeof MESSAGE_STATUSES)[number])) {
      return NextResponse.json({ error: "Filter status tidak valid." }, { status: 400 });
    }

    const messages = await prisma.contactMessage.findMany({
      where: {
        ...(status ? { status: status as (typeof MESSAGE_STATUSES)[number] } : {}),
        ...(search
          ? {
              OR: [
                { name: { contains: search } },
                { email: { contains: search } },
                { subject: { contains: search } },
              ],
            }
          : {}),
      },
      orderBy: { createdAt: "desc" },
      take: 100,
      select: {
        id: true,
        name: true,
        email: true,
        subject: true,
        message: true,
        status: true,
        emailNotification: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ messages });
  } catch (error) {
    console.error("Admin contact message list failed:", error);
    return NextResponse.json(
      { error: "Daftar pesan gagal dimuat." },
      { status: 500 },
    );
  }
}
