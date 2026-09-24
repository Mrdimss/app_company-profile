import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black px-8 py-16 text-white md:px-16 lg:px-24">
      <div className="mx-auto max-w-7xl">

        {/* Top */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="text-2xl font-semibold tracking-tight"
            >
              LOGO
            </Link>

            <p className="mt-6 max-w-md leading-relaxed text-gray-400">
              We create meaningful digital experiences through
              creativity, technology, and collaboration.
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
              <p>Jakarta, Indonesia</p>

              <a
                href="mailto:hello@company.com"
                className="transition hover:text-white"
              >
                hello@company.com
              </a>

              <a
                href="tel:+6281234567890"
                className="transition hover:text-white"
              >
                +62 812 3456 7890
              </a>
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="mt-20 flex flex-col gap-5 border-t border-white/20 pt-6 text-sm text-gray-500 md:flex-row md:items-center md:justify-between">

          <p>
            © {new Date().getFullYear()} Company Name. All rights reserved.
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