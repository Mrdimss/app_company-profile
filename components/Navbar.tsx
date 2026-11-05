
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

const navItems = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Product", href: "/product" },
];

export default function Navbar({ company }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const brandName = company.companyName || "GIRIK";

  const linkClass =
    "group relative py-2 text-sm font-semibold text-[#0B1F3A] transition-colors duration-300 hover:text-white";

  return (
    <nav className="sticky top-0 z-50 border-b border-blue-900/20 bg-gradient-to-r from-white via-[#93C5FD] to-[#0B1F3A] text-[#0B1F3A] shadow-lg shadow-blue-900/10 backdrop-blur-xl">

      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-16 lg:px-24">

        {/* Logo */}
        <Link
          href="/"
          onClick={() => setIsOpen(false)}
          className="group flex items-center gap-3"
        >
          {company.logoUrl ? (
            <Image
              alt={company.logoAltText || brandName}
              width={200}
              height={80}
              loading="eager"
              unoptimized
              className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              src={company.logoUrl}
            />
          ) : (
            <span className="text-2xl font-bold tracking-tight text-[#0B1F3A]">
              {brandName}
              <span className="text-blue-600">.</span>
            </span>
          )}
        </Link>

        {/* Desktop Menu */}
        <div className="hidden items-center gap-7 md:flex lg:gap-9">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={linkClass}
            >
              {item.label}

              <span className="absolute bottom-0 left-0 h-0.5 w-0 rounded-full bg-white transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}

          {/* Contact Button */}
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/80 px-5 py-2.5 text-sm font-semibold text-[#0B1F3A] transition-all duration-300 hover:-translate-y-0.5 hover:border-white hover:bg-white hover:shadow-lg hover:shadow-blue-900/20"
          >
            Contact Us

            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-blue-900/20 bg-white/70 transition-colors hover:bg-white md:hidden"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
        >
          <div className="flex w-5 flex-col gap-1.5">
            <span
              className={`block h-0.5 w-full rounded-full bg-[#0B1F3A] transition-all duration-300 ${
                isOpen ? "translate-y-2 rotate-45" : ""
              }`}
            />

            <span
              className={`block h-0.5 w-full rounded-full bg-[#0B1F3A] transition-all duration-300 ${
                isOpen ? "scale-x-0 opacity-0" : ""
              }`}
            />

            <span
              className={`block h-0.5 w-full rounded-full bg-[#0B1F3A] transition-all duration-300 ${
                isOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-navigation"
        className={`grid overflow-hidden border-t border-white/30 transition-[grid-template-rows,opacity] duration-300 ease-in-out md:hidden ${
          isOpen
            ? "grid-rows-[1fr] opacity-100"
            : "pointer-events-none grid-rows-[0fr] opacity-0"
        }`}
        aria-hidden={!isOpen}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="bg-gradient-to-b from-white via-[#93C5FD] to-[#0B1F3A] px-6 py-5">
            <div className="mx-auto flex max-w-7xl flex-col gap-1">

              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  tabIndex={isOpen ? 0 : -1}
                  onClick={() => setIsOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm font-semibold text-[#0B1F3A] transition-all duration-200 hover:bg-white/30 hover:pl-6 hover:text-white"
                >
                  {item.label}
                </Link>
              ))}

              {/* Contact Button Mobile */}
              <Link
                href="/contact"
                tabIndex={isOpen ? 0 : -1}
                onClick={() => setIsOpen(false)}
                className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3.5 text-sm font-semibold text-[#0B1F3A] transition-all duration-300 hover:bg-blue-100"
              >
                Contact Us
                <span>→</span>
              </Link>

            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
