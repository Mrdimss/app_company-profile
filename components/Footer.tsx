import Link from "next/link";

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
    <footer className="bg-black px-8 py-16 text-white md:px-16 lg:px-24">
      <div className="mx-auto max-w-7xl">

        {/* Top */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="flex items-center gap-3 text-2xl font-semibold tracking-tight"
            >
              {company.logoUrl ? (
                <img
                  alt={company.logoAltText || brandName}
                  className="h-12 w-auto object-contain"
                  src={company.logoUrl}
                />
              ) : (
                <span>{brandName}</span>
              )}
            </Link>

            <p className="mt-6 max-w-md leading-relaxed text-gray-400">
              {company.tagline || "We create meaningful digital experiences through creativity, technology, and collaboration."}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="mb-5 text-sm uppercase tracking-wider text-gray-500">
              Navigation
            </h3>

            <div className="flex flex-col gap-3 text-sm">
              <Link
                href="/"
                className="text-gray-300 transition hover:text-white"
              >
                Home
              </Link>

              <Link
                href="/about"
                className="text-gray-300 transition hover:text-white"
              >
                About
              </Link>

              <Link
                href="/services"
                className="text-gray-300 transition hover:text-white"
              >
                Services
              </Link>

              <Link
                href="/projects"
                className="text-gray-300 transition hover:text-white"
              >
                Projects
              </Link>

              <Link
                href="/contact"
                className="text-gray-300 transition hover:text-white"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-5 text-sm uppercase tracking-wider text-gray-500">
              Contact
            </h3>

            <div className="flex flex-col gap-3 text-sm text-gray-300">
              <p>{company.address || "Jakarta, Indonesia"}</p>

              <a
                href={`mailto:${company.email || "hello@company.com"}`}
                className="transition hover:text-white"
              >
                {company.email || "hello@company.com"}
              </a>

              <a
                href={`tel:${company.phone || "+6281234567890"}`}
                className="transition hover:text-white"
              >
                {company.phone || "+62 812 3456 7890"}
              </a>
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="mt-20 flex flex-col gap-5 border-t border-white/20 pt-6 text-sm text-gray-500 md:flex-row md:items-center md:justify-between">

          <p>
            © {new Date().getFullYear()} {brandName}. All rights reserved.
          </p>

          <div className="flex gap-6">
            <a
              href="#"
              className="transition hover:text-white"
            >
              Instagram
            </a>

            <a
              href="#"
              className="transition hover:text-white"
            >
              LinkedIn
            </a>

            <a
              href="#"
              className="transition hover:text-white"
            >
              Facebook
            </a>
          </div>

        </div>

      </div>
    </footer>
  );
}