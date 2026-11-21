import type { NextConfig } from "next";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseImagePatterns: NonNullable<
  NonNullable<NextConfig["images"]>["remotePatterns"]
> = [];

if (supabaseUrl) {
  const url = new URL(supabaseUrl);
  const bucket = process.env.SUPABASE_STORAGE_BUCKET || "girik-assets";

  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL must use HTTP or HTTPS.");
  }

  supabaseImagePatterns.push({
    protocol: url.protocol === "https:" ? "https" : "http",
    hostname: url.hostname,
    pathname: `/storage/v1/object/public/${bucket}/**`,
  });
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: supabaseImagePatterns,
  },
};

export default nextConfig;
