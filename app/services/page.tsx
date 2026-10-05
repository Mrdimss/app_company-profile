"use client";

import { useEffect, useRef, useState } from "react";

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(element);
        }
      },
      {
        threshold: 0.15,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-1000 ease-out ${
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-12 opacity-0"
      }`}
      style={{
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="bg-white text-black">

      {/* =====================================================
          HEADER
      ===================================================== */}
      <header className="sticky top-0 z-50 border-b border-black/10 bg-white">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:px-10">

          {/* MENU */}
          <button className="flex items-center gap-2 text-sm">
            <span className="text-xl">☰</span>
            <span className="hidden md:block">MENU</span>
          </button>

          {/* LOGO */}
          <div className="absolute left-1/2 -translate-x-1/2">
            <div className="text-xl font-bold tracking-[0.15em]">
              GIRIK
            </div>
          </div>

          {/* SEARCH */}
          <button className="text-xl">
            ⌕
          </button>

        </div>
      </header>


      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="relative">

        <div className="relative h-[500px] overflow-hidden md:h-[650px]">

          <img
            src="https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=2000&q=85"
            alt="Sports"
            className="h-full w-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/25" />

          {/* Hero Content */}
          <div className="absolute inset-0 flex items-center">
            <div className="mx-auto w-full max-w-7xl px-8 md:px-16">

              <Reveal>
                <p className="mb-5 text-sm uppercase tracking-[0.35em] text-white">
                  PT Dunia Sports Interprises
                </p>
              </Reveal>

              <Reveal delay={150}>
                <h1 className="max-w-3xl text-5xl font-medium uppercase leading-[0.95] tracking-tight text-white md:text-7xl lg:text-8xl">
                  Moving Sports
                  <br />
                  Forward
                </h1>
              </Reveal>

              <Reveal delay={300}>
                <a
                  href="/about"
                  className="mt-8 inline-flex bg-white px-8 py-4 text-xs font-medium uppercase tracking-[0.2em] text-black transition hover:bg-black hover:text-white"
                >
                  Learn More
                </a>
              </Reveal>

            </div>
          </div>
        </div>


        {/* SLIDER INDICATOR */}
        <div className="flex h-16 items-center justify-center gap-4 border-b border-black/10">

          <span className="text-xs">Ⅱ</span>

          <span className="h-1.5 w-1.5 rounded-full bg-black" />
          <span className="h-1.5 w-1.5 rounded-full bg-gray-300" />
          <span className="h-1.5 w-1.5 rounded-full bg-gray-300" />
          <span className="h-1.5 w-1.5 rounded-full bg-gray-300" />
          <span className="h-1.5 w-1.5 rounded-full bg-gray-300" />

        </div>

      </section>


      {/* =====================================================
          RECENT NEWS
      ===================================================== */}
      <section className="px-6 py-32 md:px-12 md:py-40 lg:px-20">

        <div className="mx-auto max-w-7xl">

          <Reveal>
            <div className="mb-24 text-center">

              <p className="text-xs uppercase tracking-[0.35em] text-gray-500">
                Latest Updates
              </p>

              <h2 className="mt-5 text-4xl font-medium uppercase tracking-tight md:text-6xl">
                Recent News
              </h2>

            </div>
          </Reveal>


          {/* NEWS */}
          <div className="grid items-center gap-16 md:grid-cols-2 md:gap-24">

            {/* IMAGE */}
            <Reveal>
              <div className="relative overflow-hidden">

                <img
                  src="https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1200&q=85"
                  alt="Sports news"
                  className="h-[400px] w-full object-cover grayscale transition duration-700 hover:scale-105 hover:grayscale-0 md:h-[520px]"
                />

              </div>
            </Reveal>


            {/* CONTENT */}
            <Reveal delay={150}>

              <div className="max-w-lg">

                <p className="text-xs uppercase tracking-[0.25em] text-gray-400">
                  Sports · September 2026
                </p>

                <h3 className="mt-8 text-4xl font-medium uppercase leading-tight tracking-tight md:text-5xl">
                  Building the Future
                  <br />
                  of Sports
                </h3>

                <p className="mt-8 text-base leading-relaxed text-gray-500">
                  Discover the latest developments, products, and
                  innovations from PT Dunia Sports Interprises as we
                  continue to provide quality sports equipment and
                  distribution solutions.
                </p>

                <a
                  href="/news"
                  className="mt-10 inline-flex bg-black px-8 py-4 text-xs uppercase tracking-[0.2em] text-white transition hover:bg-gray-700"
                >
                  Read More
                </a>

              </div>

            </Reveal>

          </div>

        </div>

      </section>


      {/* =====================================================
          PRODUCT FEATURE
      ===================================================== */}
      <section className="overflow-hidden bg-neutral-50">

        <div className="mx-auto grid max-w-[1600px] items-center md:grid-cols-2">

          {/* TEXT */}
          <Reveal>

            <div className="px-8 py-24 md:px-16 lg:px-24">

              <p className="text-xs uppercase tracking-[0.3em] text-gray-500">
                Featured Product
              </p>

              <h2 className="mt-6 text-5xl font-medium uppercase tracking-tight md:text-7xl">
                Sports
                <br />
                Equipment
              </h2>

              <p className="mt-8 max-w-md leading-relaxed text-gray-500">
                Quality sports equipment designed to support athletes,
                sports communities, and active lifestyles with reliable
                products and professional distribution.
              </p>

              <a
                href="/products"
                className="mt-10 inline-flex border border-black px-8 py-4 text-xs uppercase tracking-[0.2em] transition hover:bg-black hover:text-white"
              >
                Explore Products
              </a>

            </div>

          </Reveal>


          {/* PRODUCT IMAGE */}
          <Reveal delay={200}>

            <div className="relative h-[500px] md:h-[700px]">

              <img
                src="https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?auto=format&fit=crop&w=1400&q=85"
                alt="Sports equipment"
                className="h-full w-full object-cover"
              />

            </div>

          </Reveal>

        </div>

      </section>


      {/* =====================================================
          COMPANY INTRO
      ===================================================== */}
      <section className="px-8 py-32 md:px-16 md:py-40 lg:px-24">

        <div className="mx-auto max-w-7xl">

          <Reveal>

            <p className="text-xs uppercase tracking-[0.35em] text-gray-500">
              About The Company
            </p>

          </Reveal>

          <Reveal delay={150}>

            <h2 className="mt-8 max-w-6xl text-4xl font-medium leading-tight tracking-tight md:text-6xl lg:text-7xl">
              Connecting quality products with
              <span className="text-gray-400">
                {" "}the right market.
              </span>
            </h2>

          </Reveal>

          <Reveal delay={300}>

            <div className="mt-12 flex flex-col justify-between gap-10 border-t border-black/10 pt-8 md:flex-row">

              <p className="max-w-xl leading-relaxed text-gray-500">
                PT Dunia Sports Interprises is a trading and distribution
                company based in Jakarta, Indonesia, focusing on sports
                equipment and various consumer products.
              </p>

              <a
                href="/about"
                className="text-sm uppercase tracking-[0.2em] underline underline-offset-8"
              >
                Discover More →
              </a>

            </div>

          </Reveal>

        </div>

      </section>


      {/* =====================================================
          CTA
      ===================================================== */}
      <section className="bg-black px-8 py-28 text-white md:px-16 md:py-40 lg:px-24">

        <div className="mx-auto max-w-7xl">

          <Reveal>

            <p className="text-xs uppercase tracking-[0.35em] text-gray-400">
              Get In Touch
            </p>

          </Reveal>

          <Reveal delay={150}>

            <h2 className="mt-8 max-w-5xl text-5xl font-medium uppercase leading-tight tracking-tight md:text-7xl">
              Let's build the
              <br />
              future together.
            </h2>

          </Reveal>

          <Reveal delay={300}>

            <a
              href="/contact"
              className="mt-12 inline-flex rounded-full bg-white px-9 py-5 text-sm text-black transition hover:-translate-y-1 hover:bg-gray-200"
            >
              Contact Us →
            </a>

          </Reveal>

        </div>

      </section>

    </main>
  );
}