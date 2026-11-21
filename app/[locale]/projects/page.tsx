import ProjectsPage from "@/app/projects/page";
import { isLocale, locales, translate } from "@/lib/i18n";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return pageMetadata(locale, "/projects", translate(locale).metadata.projectsTitle);
}

export default function LocaleProjectsPage() {
  return <ProjectsPage />;
}
