import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

type RouteContext = {
  params: Promise<{ id: string }>;
};

async function readMessageId(context: RouteContext) {
  const { id } = await context.params;
  return id.length > 0 && id.length <= 40 ? id : null;
}

export async function GET(_request: Request, context: RouteContext) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Sesi admin tidak valid." }, { status: 401 });
    }

    const id = await readMessageId(context);
    if (!id) {
      return NextResponse.json({ error: "Pesan tidak ditemukan." }, { status: 404 });
    }

    const existingMessage = await prisma.contactMessage.findUnique({ where: { id } });
    if (!existingMessage) {
      return NextResponse.json({ error: "Pesan tidak ditemukan." }, { status: 404 });
    }

    if (existingMessage.status === "UNREAD") {
      await prisma.contactMessage.update({
        where: { id },
        data: { status: "READ" },
      });
    }

    const message = await prisma.contactMessage.findUnique({ where: { id } });
    if (!message) {
      return NextResponse.json({ error: "Pesan tidak ditemukan." }, { status: 404 });
    }

    return NextResponse.json({ message });
  } catch (error) {
    console.error("Admin contact message detail failed:", error);
    return NextResponse.json(
      { error: "Detail pesan gagal dimuat." },
      { status: 500 },
    );
  }
}

export async function PATCH(request: Request, context: RouteContext) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Sesi admin tidak valid." }, { status: 401 });
    }

    const id = await readMessageId(context);
    if (!id) {
      return NextResponse.json({ error: "Pesan tidak ditemukan." }, { status: 404 });
    }

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Data status tidak valid." }, { status: 400 });
    }

    const status =
      body && typeof body === "object" && "status" in body
        ? body.status
        : undefined;
    if (status !== "UNREAD" && status !== "READ") {
      return NextResponse.json({ error: "Status pesan tidak valid." }, { status: 400 });
    }

    const message = await prisma.contactMessage.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json({ ok: true, message });
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "P2025"
    ) {
      return NextResponse.json({ error: "Pesan tidak ditemukan." }, { status: 404 });
    }

    console.error("Admin contact message update failed:", error);
    return NextResponse.json(
      { error: "Status pesan gagal diperbarui." },
      { status: 500 },
    );
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Sesi admin tidak valid." }, { status: 401 });
    }

    const id = await readMessageId(context);
    if (!id) {
      return NextResponse.json({ error: "Pesan tidak ditemukan." }, { status: 404 });
    }

    await prisma.contactMessage.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "P2025"
    ) {
      return NextResponse.json({ error: "Pesan tidak ditemukan." }, { status: 404 });
    }

    console.error("Admin contact message delete failed:", error);
    return NextResponse.json(
      { error: "Pesan gagal dihapus." },
      { status: 500 },
    );
  }
}
