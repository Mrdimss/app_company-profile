import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/content";

function readString(value: unknown): string | undefined {
  if (typeof value === "string") {
    return value.trim();
  }

  return undefined;
}

function readBoolean(value: unknown, fallback = true): boolean {
  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();

    if (normalized === "true") return true;
    if (normalized === "false") return false;
  }

  if (typeof value === "boolean") {
    return value;
  }

  return fallback;
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const item = await prisma.service.findUnique({ where: { id } });

  if (!item) {
    return NextResponse.json({ error: "Layanan tidak ditemukan." }, { status: 404 });
  }

  return NextResponse.json({ item });
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await getAdminSession();

    if (!session) {
      return NextResponse.json({ error: "Sesi admin tidak valid." }, { status: 401 });
    }

    const { id } = await params;
    const existing = await prisma.service.findUnique({ where: { id } });

    if (!existing) {
      return NextResponse.json({ error: "Layanan tidak ditemukan." }, { status: 404 });
    }

    let body: Record<string, unknown> = {};

    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Data layanan tidak valid." }, { status: 400 });
    }

    const title = readString(body.title);
    const description = readString(body.description);
    const icon = body.icon === undefined ? undefined : readString(body.icon) ?? null;
    const slugValue = body.slug === undefined ? undefined : readString(body.slug) ?? undefined;
    const sortOrderValue =
      body.sortOrder === undefined ? undefined : Number.parseInt(readString(body.sortOrder) ?? "0", 10) || 0;

    const updateData: {
      title?: string;
      slug?: string;
      description?: string;
      icon?: string | null;
      sortOrder?: number;
      isPublished?: boolean;
    } = {};

    if (title) updateData.title = title;
    if (description) updateData.description = description;
    if (typeof icon !== "undefined") updateData.icon = icon;
    if (typeof sortOrderValue !== "undefined") updateData.sortOrder = sortOrderValue;
    if (typeof body.isPublished !== "undefined") updateData.isPublished = readBoolean(body.isPublished, true);
    if (typeof slugValue !== "undefined" && slugValue) updateData.slug = slugify(slugValue);

    const item = await prisma.service.update({
      where: { id },
      data: updateData,
    });

    revalidatePath("/");
    revalidatePath("/services");

    return NextResponse.json({ item });
  } catch (error) {
    if (error && typeof error === "object" && "code" in error && error.code === "P2002") {
      return NextResponse.json({ error: "Slug layanan sudah digunakan." }, { status: 409 });
    }

    console.error("Service update failed:", error);
    return NextResponse.json({ error: "Layanan gagal diperbarui." }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await getAdminSession();

    if (!session) {
      return NextResponse.json({ error: "Sesi admin tidak valid." }, { status: 401 });
    }

    const { id } = await params;
    const existing = await prisma.service.findUnique({ where: { id } });

    if (!existing) {
      return NextResponse.json({ error: "Layanan tidak ditemukan." }, { status: 404 });
    }

    const deleted = await prisma.service.delete({ where: { id } });

    revalidatePath("/");
    revalidatePath("/services");

    return NextResponse.json({ ok: true, item: deleted });
  } catch (error) {
    console.error("Service delete failed:", error);
    return NextResponse.json({ error: "Layanan gagal dihapus." }, { status: 500 });
  }
}
