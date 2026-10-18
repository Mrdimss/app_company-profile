import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import { removeUploadedImage, saveUploadedImage } from "@/lib/storage";
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
  const item = await prisma.product.findUnique({ where: { id } });

  if (!item) {
    return NextResponse.json({ error: "Produk tidak ditemukan." }, { status: 404 });
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
    const existing = await prisma.product.findUnique({ where: { id } });

    if (!existing) {
      return NextResponse.json({ error: "Produk tidak ditemukan." }, { status: 404 });
    }

    const body = await parseRequestData(request);

    if (!body) {
      return NextResponse.json({ error: "Data produk tidak valid." }, { status: 400 });
    }

    const name = readString(body.name);
    const description = readString(body.description);
    const category = body.category === undefined ? undefined : readString(body.category) ?? null;
    const productUrl = body.productUrl === undefined ? undefined : readString(body.productUrl) ?? null;
    const slugValue = body.slug === undefined ? undefined : readString(body.slug) ?? undefined;
    const imageFile = body.image instanceof File ? body.image : null;
    const shouldRemoveImage = body.removeImage === "true" || body.removeImage === true;

    let nextImageUrl = existing.image;

    if (imageFile) {
      nextImageUrl = await saveUploadedImage(imageFile, "product");
    } else if (shouldRemoveImage) {
      nextImageUrl = null;
    }

    const updateData: {
      name?: string;
      slug?: string;
      description?: string;
      image?: string | null;
      category?: string | null;
      productUrl?: string | null;
      isPublished?: boolean;
    } = {};

    if (name) updateData.name = name;
    if (description) updateData.description = description;
    if (typeof category !== "undefined") updateData.category = category;
    if (typeof productUrl !== "undefined") updateData.productUrl = productUrl;
    if (typeof body.isPublished !== "undefined") updateData.isPublished = readBoolean(body.isPublished, true);
    if (typeof slugValue !== "undefined" && slugValue) updateData.slug = slugify(slugValue);
    if (typeof nextImageUrl !== "undefined") updateData.image = nextImageUrl;

    const item = await prisma.product.update({
      where: { id },
      data: updateData,
    });

    if (imageFile && existing.image) {
      await removeUploadedImage(existing.image);
    }

    if (shouldRemoveImage && existing.image) {
      await removeUploadedImage(existing.image);
    }

    revalidatePath("/");
    revalidatePath("/product");

    return NextResponse.json({ item });
  } catch (error) {
    if (error && typeof error === "object" && "code" in error && error.code === "P2002") {
      return NextResponse.json({ error: "Slug produk sudah digunakan." }, { status: 409 });
    }

    console.error("Product update failed:", error);
    return NextResponse.json({ error: "Produk gagal diperbarui." }, { status: 500 });
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
    const existing = await prisma.product.findUnique({ where: { id } });

    if (!existing) {
      return NextResponse.json({ error: "Produk tidak ditemukan." }, { status: 404 });
    }

    const deleted = await prisma.product.delete({ where: { id } });

    if (deleted.image) {
      await removeUploadedImage(deleted.image);
    }

    revalidatePath("/");
    revalidatePath("/product");

    return NextResponse.json({ ok: true, item: deleted });
  } catch (error) {
    console.error("Product delete failed:", error);
    return NextResponse.json({ error: "Produk gagal dihapus." }, { status: 500 });
  }
}
