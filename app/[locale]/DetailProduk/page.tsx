import DetailProdukPage from "@/app/DetailProduk/page";
import { isLocale, locales, translate } from "@/lib/i18n";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ id?: string }>;
}) {
  const [{ locale }, { id }] = await Promise.all([params, searchParams]);
  if (!isLocale(locale)) notFound();
  return pageMetadata(
    locale,
    "/DetailProduk",
    translate(locale).metadata.detailTitle,
    id ? `id=${encodeURIComponent(id)}` : "",
  );
}

export default function LocaleProductDetailsPage() {
  return <DetailProdukPage />;
}
