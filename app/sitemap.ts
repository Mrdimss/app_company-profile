import type { MetadataRoute } from "next";
import { getPublishedProducts } from "@/lib/content";

const siteUrl = (process.env.NEXT_PUBLIC_APP_URL || "https://girik.com").replace(/\/$/, "");
const publicPaths = ["", "/about", "/services", "/projects", "/product", "/contact"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getPublishedProducts();
  const staticPages = publicPaths.flatMap((path) => {
    const idUrl = `${siteUrl}/id${path}`;
    const enUrl = `${siteUrl}/en${path}`;
    return [
      {
        url: idUrl,
        alternates: { languages: { "id-ID": idUrl, en: enUrl } },
      },
      {
        url: enUrl,
        alternates: { languages: { "id-ID": idUrl, en: enUrl } },
      },
    ];
  });

  const productDetails = products.flatMap((product) => {
    const query = `?id=${encodeURIComponent(product.id)}`;
    const idUrl = `${siteUrl}/id/DetailProduk${query}`;
    const enUrl = `${siteUrl}/en/DetailProduk${query}`;
    return [
      {
        url: idUrl,
        alternates: { languages: { "id-ID": idUrl, en: enUrl } },
      },
      {
        url: enUrl,
        alternates: { languages: { "id-ID": idUrl, en: enUrl } },
      },
    ];
  });

  return [...staticPages, ...productDetails];
}
