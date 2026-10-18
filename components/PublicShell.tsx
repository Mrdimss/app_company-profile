"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

type CompanyBrand = {
  companyName: string;
  tagline?: string | null;
  logoUrl?: string | null;
  logoAltText?: string | null;
  email?: string | null;
  phone?: string | null;
  address?: string | null;
};

export default function PublicShell({
  children,
  company,
}: {
  children: ReactNode;
  company: CompanyBrand;
}) {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) return children;

  return (
    <>
      <Navbar company={company} />
      {children}
      <Footer company={company} />
    </>
  );
}