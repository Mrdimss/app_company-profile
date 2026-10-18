import "./globals.css";
import PublicShell from "@/components/PublicShell";
import { getCompanySettings } from "@/lib/content";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const company = await getCompanySettings();

  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <PublicShell company={company}>{children}</PublicShell>
      </body>
    </html>
  );
}