import "./globals.css";
import PublicShell from "@/components/PublicShell";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <PublicShell>{children}</PublicShell>
      </body>
    </html>
  );
}