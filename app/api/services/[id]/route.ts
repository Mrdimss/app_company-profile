import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import { getUniqueSlug } from "@/lib/content";

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

function parseRequestData(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";

  if (contentType.includes("multipart/form-data")) {
    return request.formData().then((formData) => {
      const output: Record<string, unknown> = {};

      for (const [key, value] of formData.entries()) {
        output[key] = value;
      }

      return output;
    });
  }

  return request.json().catch(() => null);
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const item = await prisma.service.findFirst({
    where: { id, isPublished: true },
  });

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

    const body = await parseRequestData(request);
    if (!body) {
      return NextResponse.json({ error: "Data layanan tidak valid." }, { status: 400 });
    }

    const title = readString(body.title);
    const description = readString(body.description);
    const icon = body.icon === undefined ? undefined : readString(body.icon) ?? null;
    const slugValue = body.slug === undefined ? undefined : readString(body.slug);
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
    const requestedSlug =
      slugValue || (body.slug !== undefined || title !== undefined ? title : undefined);
    if (requestedSlug) {
      updateData.slug = await getUniqueSlug(
        requestedSlug,
        (value) => prisma.service.findUnique({ where: { slug: value }, select: { id: true } }),
        id,
      );
    }

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
