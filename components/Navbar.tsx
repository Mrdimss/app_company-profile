"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="relative z-50 border-b border-black/10 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-6 md:px-16 lg:px-24">

        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-semibold tracking-tight"
        >
          LOGO
        </Link>

        {/* Desktop Menu */}
        <div className="hidden items-center gap-8 text-sm md:flex">
          <Link
            href="/"
            className="relative transition-opacity duration-300 hover:opacity-50"
          >
            Home
          </Link>

          <Link
            href="/about"
            className="relative transition-opacity duration-300 hover:opacity-50"
          >
            About
          </Link>

          <Link
            href="/services"
            className="relative transition-opacity duration-300 hover:opacity-50"
          >
            Services
          </Link>

          <Link
            href="/projects"
            className="relative transition-opacity duration-300 hover:opacity-50"
          >
            Projects
          </Link>

          <Link
            href="/contact"
            className="relative transition-opacity duration-300 hover:opacity-50"
          >
            Contact
          </Link>
        </div>

        {/* Mobile Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-10 w-10 items-center justify-center md:hidden"
          aria-label="Toggle menu"
        >
          <div className="space-y-1.5">
            <span
              className={`block h-px w-6 bg-black transition-transform ${
                isOpen ? "translate-y-2 rotate-45" : ""
              }`}
            />

            <span
              className={`block h-px w-6 bg-black transition-opacity ${
                isOpen ? "opacity-0" : ""
              }`}
            />

            <span
              className={`block h-px w-6 bg-black transition-transform ${
                isOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-t border-black/10 bg-white px-8 py-6 md:hidden">
          <div className="flex flex-col gap-6 text-lg">

            <Link
              href="/"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>

            <Link
              href="/about"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>

            <Link
              href="/services"
              onClick={() => setIsOpen(false)}
            >
              Services
            </Link>

            <Link
              href="/projects"
              onClick={() => setIsOpen(false)}
            >
              Projects
            </Link>

            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>

          </div>
        </div>
      )}
    </nav>
  );
}