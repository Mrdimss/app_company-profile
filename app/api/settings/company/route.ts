import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-auth";
import { getCompanySettings } from "@/lib/content";
import { prisma } from "@/lib/prisma";
import {
  InvalidImageUploadError,
  removeUploadedImage,
  rollbackUploadedImage,
  saveUploadedImage,
} from "@/lib/storage";

function readString(value: unknown): string | undefined {
  if (typeof value === "string") {
    return value.trim();
  }

  return undefined;
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

export async function GET() {
  const company = await getCompanySettings();
  return NextResponse.json({ company });
}

export async function PATCH(request: Request) {
  let uploadedLogoUrl: string | null = null;

  try {
    const session = await getAdminSession();

    if (!session) {
      return NextResponse.json({ error: "Sesi admin tidak valid." }, { status: 401 });
    }

    const body = await parseRequestData(request);

    if (!body) {
      return NextResponse.json({ error: "Data pengaturan tidak valid." }, { status: 400 });
    }

    const existing = await prisma.companySetting.findUnique({ where: { id: "company" } });

    const companyName = readString(body.companyName) ?? existing?.companyName ?? "GIRIK";
    const tagline = readString(body.tagline) ?? existing?.tagline ?? null;
    const logoAltText = readString(body.logoAltText) ?? existing?.logoAltText ?? "Company logo";
    const email = readString(body.email) ?? existing?.email ?? null;
    const phone = readString(body.phone) ?? existing?.phone ?? null;
    const address = readString(body.address) ?? existing?.address ?? null;
    const removeLogo = body.removeLogo === "true" || body.removeLogo === true;
    const logoFile = body.logo instanceof File ? body.logo : null;

    let logoUrl = existing?.logoUrl ?? null;

    if (logoFile) {
      logoUrl = await saveUploadedImage(logoFile, "logo");
      uploadedLogoUrl = logoUrl;
    }

    if (removeLogo && !logoFile) {
      logoUrl = null;
    }

    const company = await prisma.companySetting.upsert({
      where: { id: "company" },
      create: {
        id: "company",
        companyName,
        tagline,
        logoUrl,
        logoAltText,
        email,
        phone,
        address,
      },
      update: {
        companyName,
        tagline,
        logoUrl,
        logoAltText,
        email,
        phone,
        address,
      },
    });

    let storageCleanupPending = false;
    if ((logoFile || removeLogo) && existing?.logoUrl) {
      try {
        await removeUploadedImage(existing.logoUrl);
      } catch (error) {
        console.error("Previous company logo cleanup failed:", error);
        storageCleanupPending = true;
      }
    }

    revalidatePath("/");
    revalidatePath("/projects");
    revalidatePath("/services");
    revalidatePath("/product");

    return NextResponse.json({ company, storageCleanupPending });
  } catch (error) {
    await rollbackUploadedImage(uploadedLogoUrl);

    if (error instanceof InvalidImageUploadError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    console.error("Company settings update failed:", error);
    return NextResponse.json({ error: "Pengaturan perusahaan gagal disimpan." }, { status: 500 });
  }
}
