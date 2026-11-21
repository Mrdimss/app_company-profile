import { describe, expect, it } from "vitest";
import {
  InvalidImageUploadError,
  MAX_IMAGE_SIZE_BYTES,
  validateImageUpload,
} from "./image-validation";

describe("validateImageUpload", () => {
  it("accepts supported formats only when their content signatures match", () => {
    expect(
      validateImageUpload("image/jpeg", 3, Uint8Array.of(0xff, 0xd8, 0xff)),
    ).toBe("jpg");
    expect(
      validateImageUpload(
        "image/png",
        8,
        Uint8Array.of(0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a),
      ),
    ).toBe("png");
    expect(
      validateImageUpload(
        "image/webp",
        12,
        Uint8Array.of(0x52, 0x49, 0x46, 0x46, 0, 0, 0, 0, 0x57, 0x45, 0x42, 0x50),
      ),
    ).toBe("webp");
  });

  it("rejects a spoofed or unsupported MIME type", () => {
    expect(() =>
      validateImageUpload("image/png", 3, Uint8Array.of(0xff, 0xd8, 0xff)),
    ).toThrow(InvalidImageUploadError);
    expect(() =>
      validateImageUpload("image/gif", 3, Uint8Array.of(0x47, 0x49, 0x46)),
    ).toThrow(InvalidImageUploadError);
  });

  it("rejects empty and oversized files", () => {
    expect(() => validateImageUpload("image/jpeg", 0, new Uint8Array())).toThrow(
      InvalidImageUploadError,
    );
    expect(() =>
      validateImageUpload("image/jpeg", MAX_IMAGE_SIZE_BYTES + 1, new Uint8Array()),
    ).toThrow(InvalidImageUploadError);
  });
});
