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
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
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
      className={`${className} transition-all duration-700 ease-out ${
        isVisible
          ? "translate-y-0 opacity-100"
          : "translate-y-10 opacity-0"
      }`}
      style={{
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export default function AboutPage() {
  return (
    <main>
      {/* ================= HERO ================= */}
      <section className="px-8 py-20 md:px-16 md:py-28 lg:px-24">
        <div className="mx-auto max-w-7xl">

          <Reveal>
            <p className="mb-6 text-sm uppercase tracking-[0.3em] text-gray-500">
              About Us
            </p>
          </Reveal>

          <Reveal delay={150}>
            <h1 className="max-w-6xl text-5xl font-medium leading-[1] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
              About Girik
            </h1>
          </Reveal>

          <Reveal delay={300}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-600">
              Trade & Distributor Company
            </p>
          </Reveal>

        </div>
      </section>


      {/* ================= ABOUT / STORY ================= */}
      <section className="bg-neutral-100 px-8 py-16 md:px-16 lg:px-24">
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2 md:items-start">

          {/* IMAGE */}
          <Reveal>
            <div className="overflow-hidden rounded-2xl shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=1400&q=80"
                alt="Container ship"
                className="h-[340px] w-full object-cover md:h-[520px]"
              />
            </div>
          </Reveal>


          {/* TEXT */}
          <Reveal delay={150}>
            <div className="max-w-xl">

              <p className="text-sm uppercase tracking-[0.3em] text-gray-500">
                About Us
              </p>

              <h2 className="mt-4 text-4xl font-medium tracking-tight md:text-5xl">
                About Girik
              </h2>

              <p className="mt-6 leading-relaxed text-gray-700">
                PT Dunia Sports Interprises is a trading and distribution
                company based in Jakarta, Indonesia. The company focuses on
                providing and selling a wide range of products, particularly
                sports equipment, to meet market needs through various
                marketing and distribution channels, including direct sales
                and e-commerce.
              </p>

              <p className="mt-6 leading-relaxed text-gray-700">
                The company's business operations are supported by various
                activities, including merchandising, marketing, trade
                marketing, logistics, delivery, import, warehouse management,
                and customer services. In addition to sports products, PT
                Dunia Sports Interprises also distributes consumer goods such
                as personal care, skincare and body care, herbal wellness,
                and food products.
              </p>

              <p className="mt-6 leading-relaxed text-gray-700">
                Supported by networks across modern markets, general trade,
                and e-commerce, PT Dunia Sports Interprises continues to
                develop its trading and distribution operations in an
                organized manner to provide products and services that meet
                customer needs.
              </p>

            </div>
          </Reveal>

        </div>
      </section>


      {/* ================= OUR GOAL ================= */}
      <section className="px-8 py-20 md:px-16 lg:px-24">
        <div className="mx-auto max-w-7xl">

          {/* TITLE */}
          <Reveal>
            <div className="mb-16">

              <p className="mb-4 text-sm uppercase tracking-[0.3em] text-gray-500">
                Our Goal
              </p>

              <h2 className="max-w-3xl text-4xl font-medium leading-tight tracking-tight md:text-6xl">
                Driving the Future of Global Commerce
              </h2>

            </div>
          </Reveal>


          <div className="border-t border-black/10 pt-8">

            <div className="grid gap-8 md:grid-cols-3">

              {/* ================= VISION ================= */}
              <Reveal delay={0}>
                <div className="rounded-2xl border border-black/10 bg-white p-6 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-lg">

                  <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-neutral-100">
                    ✅
                  </div>

                  <h3 className="mt-5 text-2xl font-medium">
                    Our Vision
                  </h3>

                  <p className="mt-4 leading-relaxed text-gray-600">
                    To become one of the world’s most trusted partners who
                    helps businesses grow with confidence.
                  </p>

                </div>
              </Reveal>


              {/* ================= MISSION ================= */}
              <Reveal delay={150}>
                <div className="rounded-2xl border border-black/10 bg-white p-6 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-lg">

                  <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-neutral-100">
                    ✅
                  </div>

                  <h3 className="mt-5 text-2xl font-medium">
                    Our Mission
                  </h3>

                  <p className="mt-4 leading-relaxed text-gray-600">
                    To simplify global commerce by connecting businesses with
                    the right sourcing and distribution opportunities.
                  </p>

                </div>
              </Reveal>


              {/* ================= PURPOSE ================= */}
              <Reveal delay={300}>
                <div className="rounded-2xl border border-black/10 bg-white p-6 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-lg">

                  <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-neutral-100">
                    ✅
                  </div>

                  <h3 className="mt-5 text-2xl font-medium">
                    Our Purpose
                  </h3>

                  <p className="mt-4 leading-relaxed text-gray-600">
                    We believe commerce is one of the strongest forces for
                    growth, impact, and real value creation.
                  </p>

                </div>
              </Reveal>

            </div>

          </div>
        </div>
      </section>


      {/* ================= CTA ================= */}
      <section className="bg-black px-8 py-20 text-white md:px-16 lg:px-24">

        <Reveal>
          <div className="mx-auto max-w-7xl">

            <h2 className="max-w-4xl text-4xl font-medium leading-tight tracking-tight md:text-6xl">
              Partner with PT Dunia Sports Interprises to grow your business
              globally.
            </h2>

            <a
              href="/contact"
              className="mt-10 inline-flex rounded-full bg-white px-8 py-4 text-sm text-black transition hover:-translate-y-1 hover:bg-gray-200"
            >
              Get in Touch →
            </a>

          </div>
        </Reveal>

      </section>

    </main>
  );
}