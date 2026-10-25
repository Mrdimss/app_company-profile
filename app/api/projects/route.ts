import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-auth";
import { getPublishedProjects, getUniqueSlug } from "@/lib/content";
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

    const items = await prisma.project.findMany({
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    });

    return NextResponse.json({ items });
  }

  const items = await getPublishedProjects();
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
      return NextResponse.json({ error: "Data project tidak valid." }, { status: 400 });
    }

    const title = readString(body.title);
    const description = readString(body.description);
    const category = readString(body.category) ?? null;
    const projectUrl = readString(body.projectUrl) ?? null;
    const slugInput = readString(body.slug) ?? title;
    const sortOrderValue = Number.parseInt(readString(body.sortOrder) ?? "0", 10) || 0;
    const imageFile = body.image instanceof File ? body.image : null;

    if (!title || !description) {
      return NextResponse.json({ error: "Judul dan deskripsi project wajib diisi." }, { status: 400 });
    }

    const slug = await getUniqueSlug(slugInput || title, (value) =>
      prisma.project.findUnique({ where: { slug: value }, select: { id: true } }),
    );
    let imageUrl: string | null = null;

    if (imageFile) {
      imageUrl = await saveUploadedImage(imageFile, "project");
    }

    const item = await prisma.project.create({
      data: {
        title,
        slug,
        description,
        image: imageUrl,
        category,
        projectUrl,
        isPublished: readBoolean(body.isPublished, true),
        sortOrder: sortOrderValue,
      },
    });

    revalidatePath("/");
    revalidatePath("/projects");

    return NextResponse.json({ item }, { status: 201 });
  } catch (error) {
    if (error && typeof error === "object" && "code" in error && error.code === "P2002") {
      return NextResponse.json({ error: "Slug project sudah digunakan." }, { status: 409 });
    }

    console.error("Project create failed:", error);
    return NextResponse.json({ error: "Project gagal dibuat." }, { status: 500 });
  }
}
