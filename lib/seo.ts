import type { Metadata } from "next";
import { translate, type Locale } from "@/lib/i18n";

const siteUrl = (process.env.NEXT_PUBLIC_APP_URL || "https://girik.com").replace(/\/$/, "");

export function pageMetadata(
  locale: Locale,
  path: string,
  title: string,
  query = "",
): Metadata {
  const localizedPath = path ? `/${locale}${path}` : `/${locale}`;
  const queryString = query ? `?${query.replace(/^\?/, "")}` : "";
  const description = translate(locale).metadata.description;
  const idPath = `${path ? `/id${path}` : "/id"}${queryString}`;
  const enPath = `${path ? `/en${path}` : "/en"}${queryString}`;

  return {
    title,
    description,
    alternates: {
      canonical: `${siteUrl}${localizedPath}${queryString}`,
      languages: {
        "id-ID": `${siteUrl}${idPath}`,
        en: `${siteUrl}${enPath}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${siteUrl}${localizedPath}${queryString}`,
      siteName: "GIRIK",
      locale: locale === "id" ? "id_ID" : "en_US",
      type: "website",
    },
  };
}
