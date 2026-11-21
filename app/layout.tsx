import "./globals.css";
import PublicShell from "@/components/PublicShell";
import { LocaleProvider } from "@/components/LocaleProvider";
import { getCompanySettings } from "@/lib/content";
import { isLocale } from "@/lib/i18n";
import { headers } from "next/headers";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "GIRIK",
    template: "%s",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const requestHeaders = await headers();
  const requestedLocale = requestHeaders.get("x-girik-locale");
  const locale = requestedLocale && isLocale(requestedLocale) ? requestedLocale : "id";
  const company = await getCompanySettings();

  return (
    <html lang={locale === "id" ? "id-ID" : "en"} data-scroll-behavior="smooth">
      <body>
        <LocaleProvider locale={locale}>
          <PublicShell company={company}>{children}</PublicShell>
        </LocaleProvider>
      </body>
    </html>
  );
}