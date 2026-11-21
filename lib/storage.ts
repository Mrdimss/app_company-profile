import "server-only";

import { randomUUID } from "node:crypto";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { prisma } from "@/lib/prisma";
import {
  getVerifiedImageExtension,
  InvalidImageUploadError,
  validateImageMetadata,
} from "@/lib/image-validation";

export { InvalidImageUploadError };

type UploadKind = "product" | "project" | "category" | "logo" | "banner";

const STORAGE_FOLDERS: Record<UploadKind, string> = {
  product: "products",
  project: "projects",
  category: "categories",
  logo: "logos",
  banner: "banners",
};

let supabaseAdmin: SupabaseClient | undefined;

function getStorageConfig() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const bucket = process.env.SUPABASE_STORAGE_BUCKET?.trim() || "girik-assets";

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required for storage operations.",
    );
  }

  const parsedUrl = new URL(supabaseUrl);
  if (!["http:", "https:"].includes(parsedUrl.protocol) || parsedUrl.pathname !== "/") {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL must be a Supabase project URL.");
  }

  return { supabaseUrl, serviceRoleKey, bucket, origin: parsedUrl.origin };
}

function getSupabaseAdminClient() {
  if (!supabaseAdmin) {
    const { supabaseUrl, serviceRoleKey } = getStorageConfig();
    supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
        detectSessionInUrl: false,
      },
    });
  }

  return supabaseAdmin;
}

export async function saveUploadedImage(file: File | Blob, kind: UploadKind) {
  const mimeType = validateImageMetadata(file.type, file.size);
  const bytes = Buffer.from(await file.arrayBuffer());
  const extension = getVerifiedImageExtension(mimeType, bytes);
  const objectPath = `${STORAGE_FOLDERS[kind]}/${kind}-${randomUUID()}.${extension}`;
  const { bucket } = getStorageConfig();
  const { data, error } = await getSupabaseAdminClient()
    .storage
    .from(bucket)
    .upload(objectPath, bytes, {
      cacheControl: "31536000",
      contentType: mimeType,
      upsert: false,
    });

  if (error) {
    throw new Error(`Supabase Storage upload failed: ${error.message}`);
  }

  return getSupabaseAdminClient().storage.from(bucket).getPublicUrl(data.path).data.publicUrl;
}

function getManagedObjectPath(imageUrl: string) {
  let parsedImageUrl: URL;

  try {
    parsedImageUrl = new URL(imageUrl);
  } catch {
    return null;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  if (!supabaseUrl) {
    return null;
  }

  const { bucket, origin } = getStorageConfig();
  if (parsedImageUrl.origin !== origin) {
    return null;
  }

  const prefix = `/storage/v1/object/public/${bucket}/`;
  if (!parsedImageUrl.pathname.startsWith(prefix)) {
    return null;
  }

  const objectPath = parsedImageUrl.pathname.slice(prefix.length);
  if (!/^(products|projects|categories|logos|banners)\/[a-z0-9-]+\.(jpg|png|webp)$/.test(objectPath)) {
    return null;
  }

  return objectPath;
}

export async function removeUploadedImage(imageUrl?: string | null) {
  if (!imageUrl || imageUrl.startsWith("/")) {
    return;
  }

  const objectPath = getManagedObjectPath(imageUrl);
  if (!objectPath) {
    return;
  }

  const [productCount, projectCount, companySettingCount] = await Promise.all([
    prisma.product.count({ where: { image: imageUrl } }),
    prisma.project.count({ where: { image: imageUrl } }),
    prisma.companySetting.count({ where: { logoUrl: imageUrl } }),
  ]);

  if (productCount > 0 || projectCount > 0 || companySettingCount > 0) {
    return;
  }

  const { bucket } = getStorageConfig();
  const { error } = await getSupabaseAdminClient().storage.from(bucket).remove([objectPath]);

  if (error) {
    throw new Error(`Supabase Storage delete failed: ${error.message}`);
  }
}

export async function rollbackUploadedImage(imageUrl?: string | null) {
  try {
    await removeUploadedImage(imageUrl);
  } catch (error) {
    console.error("Uploaded image rollback failed:", error);
  }
}
