import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-auth";
import { getPublishedProducts, slugify } from "@/lib/content";
import { prisma } from "@/lib/prisma";
import { saveUploadedImage } from "@/lib/storage";

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

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const wantsAdminData = searchParams.get("all") === "true";

  if (wantsAdminData) {
    const session = await getAdminSession();

    if (!session) {
      return NextResponse.json({ error: "Sesi admin tidak valid." }, { status: 401 });
    }

    const items = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ items });
  }

  const items = await getPublishedProducts();
  return NextResponse.json({ items });
}

export async function POST(request: Request) {
  try {
    const session = await getAdminSession();

    if (!session) {
      return NextResponse.json({ error: "Sesi admin tidak valid." }, { status: 401 });
    }

    const body = await parseRequestData(request);

    if (!body) {
      return NextResponse.json({ error: "Data produk tidak valid." }, { status: 400 });
    }

    const name = readString(body.name);
    const description = readString(body.description);
    const category = readString(body.category) ?? null;
    const productUrl = readString(body.productUrl) ?? null;
    const slugInput = readString(body.slug) ?? name;
    const imageFile = body.image instanceof File ? body.image : null;

    if (!name || !description) {
      return NextResponse.json({ error: "Nama dan deskripsi produk wajib diisi." }, { status: 400 });
    }

    let imageUrl: string | null = null;

    if (imageFile) {
      imageUrl = await saveUploadedImage(imageFile, "product");
    }

    const item = await prisma.product.create({
      data: {
        name,
        slug: slugify(slugInput || name),
        description,
        image: imageUrl,
        category,
        productUrl,
        isPublished: readBoolean(body.isPublished, true),
      },
    });

    revalidatePath("/");
    revalidatePath("/product");

    return NextResponse.json({ item }, { status: 201 });
  } catch (error) {
    if (error && typeof error === "object" && "code" in error && error.code === "P2002") {
      return NextResponse.json({ error: "Slug produk sudah digunakan." }, { status: 409 });
    }

    console.error("Product create failed:", error);
    return NextResponse.json({ error: "Produk gagal dibuat." }, { status: 500 });
  }
}
