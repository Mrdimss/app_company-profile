export const MAX_IMAGE_SIZE_BYTES = 2 * 1024 * 1024;
export const ALLOWED_IMAGE_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
]);

export class InvalidImageUploadError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidImageUploadError";
  }
}

export function validateImageMetadata(mimeType: string, fileSize: number) {
  const normalizedMimeType = mimeType.toLowerCase();

  if (!ALLOWED_IMAGE_MIME_TYPES.has(normalizedMimeType)) {
    throw new InvalidImageUploadError("Format gambar tidak didukung. Gunakan JPG, PNG, atau WebP.");
  }

  if (fileSize === 0 || fileSize > MAX_IMAGE_SIZE_BYTES) {
    throw new InvalidImageUploadError("Ukuran gambar harus lebih dari 0 dan maksimal 2MB.");
  }

  return normalizedMimeType;
}

export function getVerifiedImageExtension(mimeType: string, bytes: Uint8Array) {
  const hasJpegSignature =
    bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
  const hasPngSignature =
    bytes.length >= 8 &&
    [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a].every(
      (byte, index) => bytes[index] === byte,
    );
  const hasWebpSignature =
    bytes.length >= 12 &&
    String.fromCharCode(...bytes.subarray(0, 4)) === "RIFF" &&
    String.fromCharCode(...bytes.subarray(8, 12)) === "WEBP";

  if (mimeType === "image/jpeg" && hasJpegSignature) return "jpg";
  if (mimeType === "image/png" && hasPngSignature) return "png";
  if (mimeType === "image/webp" && hasWebpSignature) return "webp";

  throw new InvalidImageUploadError("Isi file tidak sesuai dengan format gambar yang diizinkan.");
}

export function validateImageUpload(mimeType: string, fileSize: number, bytes: Uint8Array) {
  return getVerifiedImageExtension(validateImageMetadata(mimeType, fileSize), bytes);
}
