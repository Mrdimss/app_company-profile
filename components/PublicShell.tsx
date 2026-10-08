"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function PublicShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) return children;

  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}