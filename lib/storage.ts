import { randomUUID } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";

export const MAX_IMAGE_SIZE_BYTES = 2 * 1024 * 1024;
export const ALLOWED_IMAGE_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
]);

const PUBLIC_ROOT = path.join(process.cwd(), "public");

export async function ensureUploadDirectory() {
  await fs.mkdir(path.join(PUBLIC_ROOT, "uploads"), { recursive: true });
}

export function normalizeFileExt(name: string, mimeType?: string): string {
  const safeName = (name || "image").split(".").pop()?.toLowerCase() ?? "jpg";

  if (mimeType === "image/png") {
    return "png";
  }

  if (mimeType === "image/webp") {
    return "webp";
  }

  return safeName === "jpg" || safeName === "jpeg" ? "jpg" : "png";
}

export function buildSafeFileName(originalName: string, prefix: string, mimeType?: string) {
  const extension = normalizeFileExt(originalName, mimeType);
  return `${prefix}-${randomUUID()}.${extension}`;
}

export async function saveUploadedImage(file: File | Blob, prefix: string) {
  const mimeType = file.type || "application/octet-stream";

  if (!ALLOWED_IMAGE_MIME_TYPES.has(mimeType)) {
    throw new Error("Format gambar tidak didukung. Gunakan JPG, PNG, atau WebP.");
  }

  if (file.size > MAX_IMAGE_SIZE_BYTES) {
    throw new Error("Ukuran gambar maksimal 2MB.");
  }

  await ensureUploadDirectory();

  const originalName = "name" in file && typeof file.name === "string" ? file.name : "image";
  const fileName = buildSafeFileName(originalName, prefix, mimeType);
  const filePath = path.join(PUBLIC_ROOT, "uploads", fileName);

  await fs.writeFile(filePath, Buffer.from(await file.arrayBuffer()));

  return `/uploads/${fileName}`;
}

export async function removeUploadedImage(imageUrl?: string | null) {
  if (!imageUrl || !imageUrl.startsWith("/uploads/")) {
    return;
  }

  const relativePath = imageUrl.replace(/^\/+/, "");
  const fullPath = path.join(PUBLIC_ROOT, relativePath);

  if (!fullPath.startsWith(PUBLIC_ROOT)) {
    return;
  }

  try {
    await fs.unlink(fullPath);
  } catch {
    // Ignore missing file or file already deleted.
  }
}
