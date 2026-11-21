import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import {
  InvalidImageUploadError,
  removeUploadedImage,
  rollbackUploadedImage,
  saveUploadedImage,
} from "@/lib/storage";
import { getUniqueSlug } from "@/lib/content";
import { InvalidMarketplaceUrlError, normalizeMarketplaceUrl } from "@/lib/marketplace-url";

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
  const item = await prisma.product.findFirst({
    where: { id, isPublished: true },
  });

  if (!item) {
    return NextResponse.json({ error: "Produk tidak ditemukan." }, { status: 404 });
  }

  return NextResponse.json({ item });
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  let uploadedImageUrl: string | null = null;

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
    const productUrl = normalizeMarketplaceUrl(body.productUrl, "shopee");
    const tokopediaUrl = normalizeMarketplaceUrl(body.tokopediaUrl, "tokopedia");
    const slugValue = body.slug === undefined ? undefined : readString(body.slug);
    const imageFile = body.image instanceof File ? body.image : null;
    const shouldRemoveImage = body.removeImage === "true" || body.removeImage === true;

    let nextImageUrl = existing.image;

    if (imageFile) {
      nextImageUrl = await saveUploadedImage(imageFile, "product");
      uploadedImageUrl = nextImageUrl;
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
      tokopediaUrl?: string | null;
      isPublished?: boolean;
    } = {};

    if (name) updateData.name = name;
    if (description) updateData.description = description;
    if (typeof category !== "undefined") updateData.category = category;
    if (typeof productUrl !== "undefined") updateData.productUrl = productUrl;
    if (typeof tokopediaUrl !== "undefined") updateData.tokopediaUrl = tokopediaUrl;
    if (typeof body.isPublished !== "undefined") updateData.isPublished = readBoolean(body.isPublished, true);
    const requestedSlug =
      slugValue || (body.slug !== undefined || name !== undefined ? name : undefined);
    if (requestedSlug) {
      updateData.slug = await getUniqueSlug(
        requestedSlug,
        (value) => prisma.product.findUnique({ where: { slug: value }, select: { id: true } }),
        id,
      );
    }
    if (typeof nextImageUrl !== "undefined") updateData.image = nextImageUrl;

    const item = await prisma.product.update({
      where: { id },
      data: updateData,
    });

    let storageCleanupPending = false;
    if ((imageFile || shouldRemoveImage) && existing.image) {
      try {
        await removeUploadedImage(existing.image);
      } catch (error) {
        console.error("Previous product image cleanup failed:", error);
        storageCleanupPending = true;
      }
    }

    revalidatePath("/");
    revalidatePath("/product");

    return NextResponse.json({ item, storageCleanupPending });
  } catch (error) {
    await rollbackUploadedImage(uploadedImageUrl);

    if (error instanceof InvalidImageUploadError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    if (error instanceof InvalidMarketplaceUrlError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

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

    let storageCleanupPending = false;
    if (deleted.image) {
      try {
        await removeUploadedImage(deleted.image);
      } catch (error) {
        console.error("Deleted product image cleanup failed:", error);
        storageCleanupPending = true;
      }
    }

    revalidatePath("/");
    revalidatePath("/product");

    return NextResponse.json({ ok: true, item: deleted, storageCleanupPending });
  } catch (error) {
    console.error("Product delete failed:", error);
    return NextResponse.json({ error: "Produk gagal dihapus." }, { status: 500 });
  }
}
