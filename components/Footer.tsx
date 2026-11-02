import Link from "next/link";
import Image from "next/image";

type FooterProps = {
  company: {
    companyName: string;
    tagline?: string | null;
    logoUrl?: string | null;
    logoAltText?: string | null;
    email?: string | null;
    phone?: string | null;
    address?: string | null;
  };
};

export default function Footer({ company }: FooterProps) {
  const brandName = company.companyName || "GIRIK";

  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-[#0b1730] via-[#102b59] to-[#123f7a] px-6 py-16 text-white md:px-16 md:py-20 lg:px-24">

      {/* Background Decoration */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full border border-blue-400/20" />
      <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full border border-sky-400/20" />
      <div className="pointer-events-none absolute -bottom-40 -left-20 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* Top Section */}
        <div className="grid gap-12 border-b border-white/15 pb-14 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="inline-flex items-center gap-3 transition-opacity duration-300 hover:opacity-80"
            >
              {company.logoUrl ? (
                <Image
                  alt={company.logoAltText || brandName}
                  width={240}
                  height={96}
                  unoptimized
                  className="h-12 w-auto object-contain"
                  src={company.logoUrl}
                />
              ) : (
                <span className="text-3xl font-bold tracking-tight">
                  {brandName}
                  <span className="text-sky-400">.</span>
                </span>
              )}
            </Link>

            <p className="mt-6 max-w-md text-sm leading-7 text-blue-100/70 md:text-base">
              {company.tagline ||
                "We create meaningful digital experiences through creativity, technology, and collaboration."}
            </p>

            {/* Brand Accent */}
            <div className="mt-7 flex items-center gap-2">
              <span className="h-1 w-10 rounded-full bg-sky-400" />
              <span className="h-1 w-3 rounded-full bg-blue-300/50" />
              <span className="h-1 w-1 rounded-full bg-blue-200/40" />
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-sky-300">
              <span className="h-px w-5 bg-sky-400" />
              Navigation
            </h3>

            <nav className="flex flex-col items-start gap-4 text-sm">
              {[
                { label: "Home", href: "/" },
                { label: "About", href: "/about" },
                { label: "Services", href: "/services" },
                { label: "Projects", href: "/projects" },
                { label: "Contact", href: "/contact" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group inline-flex items-center gap-2 text-blue-100/75 transition-colors duration-300 hover:text-white"
                >
                  <span className="h-1 w-0 rounded-full bg-sky-400 transition-all duration-300 group-hover:w-2" />
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-sky-300">
              <span className="h-px w-5 bg-sky-400" />
              Contact
            </h3>

            <div className="flex flex-col gap-5 text-sm text-blue-100/75">

              {/* Address */}
              <div className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-sky-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
                    <circle cx="12" cy="10" r="2.5" />
                  </svg>
                </span>
                <p className="pt-1 leading-6">
                  {company.address || "Jakarta, Indonesia"}
                </p>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-sky-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="m3 7 9 6 9-6" />
                  </svg>
                </span>
                <a
                  href={`mailto:${company.email || "hello@company.com"}`}
                  className="break-all pt-2 transition-colors duration-300 hover:text-sky-300"
                >
                  {company.email || "hello@company.com"}
                </a>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-sky-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.2-1.3a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.8 2.1Z" />
                  </svg>
                </span>
                <a
                  href={`tel:${company.phone || "+6281234567890"}`}
                  className="pt-2 transition-colors duration-300 hover:text-sky-300"
                >
                  {company.phone || "+62 812 3456 7890"}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col gap-6 pt-7 text-sm md:flex-row md:items-center md:justify-between">

          <p className="text-blue-100/55">
            © {new Date().getFullYear()} {brandName}. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex flex-wrap items-center gap-6">
            <a
              href="#"
              aria-label="Instagram"
              className="text-blue-100/65 transition-all duration-300 hover:-translate-y-0.5 hover:text-sky-300"
            >
              Instagram
            </a>

            <a
              href="#"
              aria-label="LinkedIn"
              className="text-blue-100/65 transition-all duration-300 hover:-translate-y-0.5 hover:text-sky-300"
            >
              LinkedIn
            </a>

            <a
              href="#"
              aria-label="Facebook"
              className="text-blue-100/65 transition-all duration-300 hover:-translate-y-0.5 hover:text-sky-300"
            >
              Facebook
            </a>
          </div>

          <Link
            href="/contact"
            className="group inline-flex w-fit items-center gap-2 rounded-full border border-sky-300/30 bg-sky-300/10 px-5 py-2.5 font-medium text-sky-200 transition-all duration-300 hover:border-sky-300 hover:bg-sky-300 hover:text-[#0b1730]"
          >
            Let&apos;s Talk
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </div>
    </footer>
  );
}