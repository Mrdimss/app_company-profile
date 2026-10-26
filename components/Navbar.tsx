
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

type NavbarProps = {
  company: {
    companyName: string;
    logoUrl?: string | null;
    logoAltText?: string | null;
  };
};

export default function Navbar({ company }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const brandName = company.companyName || "GIRIK";

  const linkClass =
    "relative text-white transition-colors duration-300 hover:text-blue-200";

  return (
    <nav className="relative z-50 border-b border-white/10 bg-[#0B1F3A] text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-6 md:px-16 lg:px-24">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 text-xl font-semibold tracking-tight"
        >
          {company.logoUrl ? (
            <Image
              alt={company.logoAltText || brandName}
              width={200}
              height={80}
              loading="eager"
              unoptimized
              className="h-10 w-auto object-contain"
              src={company.logoUrl}
            />
          ) : (
            <span className="text-white">{brandName}</span>
          )}
        </Link>

        {/* Desktop Menu */}
        <div className="hidden items-center gap-8 text-sm md:flex">
          <Link href="/" className={linkClass}>
            Home
          </Link>

          <Link href="/about" className={linkClass}>
            About
          </Link>

          <Link href="/services" className={linkClass}>
            Services
          </Link>

          <Link href="/projects" className={linkClass}>
            Projects
          </Link>

          <Link href="/contact" className={linkClass}>
            Contact
          </Link>

          <Link href="/product" className={linkClass}>
            Product
          </Link>
        </div>

        {/* Mobile Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-10 w-10 items-center justify-center md:hidden"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          <div className="space-y-1.5">
            <span
              className={`block h-px w-6 bg-white transition-transform ${
                isOpen ? "translate-y-2 rotate-45" : ""
              }`}
            />

            <span
              className={`block h-px w-6 bg-white transition-opacity ${
                isOpen ? "opacity-0" : ""
              }`}
            />

            <span
              className={`block h-px w-6 bg-white transition-transform ${
                isOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-t border-white/10 bg-[#0B1F3A] px-8 py-6 md:hidden">
          <div className="flex flex-col gap-6 text-lg">
            <Link
              href="/"
              className={linkClass}
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>

            <Link
              href="/about"
              className={linkClass}
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>

            <Link
              href="/services"
              className={linkClass}
              onClick={() => setIsOpen(false)}
            >
              Services
            </Link>

            <Link
              href="/projects"
              className={linkClass}
              onClick={() => setIsOpen(false)}
            >
              Projects
            </Link>

            <Link
              href="/contact"
              className={linkClass}
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>

            <Link
              href="/product"
              className={linkClass}
              onClick={() => setIsOpen(false)}
            >
              Product
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
