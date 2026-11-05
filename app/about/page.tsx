
"use client";

import Image from "next/image";
import Link from "next/link";
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
      { threshold: 0.15 }
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
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

const goals = [
  {
    number: "01",
    title: "Our Vision",
    description:
      "To become one of the world’s most trusted partners who helps businesses grow with confidence.",
    icon: "◎",
  },
  {
    number: "02",
    title: "Our Mission",
    description:
      "To simplify global commerce by connecting businesses with the right sourcing and distribution opportunities.",
    icon: "↗",
  },
  {
    number: "03",
    title: "Our Purpose",
    description:
      "We believe commerce is one of the strongest forces for growth, impact, and real value creation.",
    icon: "✦",
  },
];

export default function AboutPage() {
  return (
    <main className="overflow-hidden bg-[#f7faff]">

      {/* ================= HERO ================= */}
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-[#f5f9ff] via-[#e3efff] to-[#c4e3ff] px-6 py-20 md:px-16 md:py-28 lg:px-24">

        {/* Background Decorations */}
        <div className="pointer-events-none absolute -left-40 top-10 h-96 w-96 rounded-full bg-white/70 blur-3xl" />

        <div className="pointer-events-none absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-blue-300/20 to-transparent" />

        <div className="pointer-events-none absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full border border-blue-400/20" />

        <div className="pointer-events-none absolute -right-20 -top-20 h-[380px] w-[380px] rounded-full border border-blue-400/20" />

        {/* Hero Content */}
        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-16 md:grid-cols-2 md:gap-10 lg:gap-16">

          {/* LEFT CONTENT */}
          <div className="relative z-20">

            <Reveal>
              <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-blue-200 bg-white/70 px-5 py-2.5 shadow-sm backdrop-blur-md">
                <span className="h-2.5 w-2.5 rounded-full bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.5)]" />

                <span className="text-xs font-bold uppercase tracking-[0.25em] text-blue-800">
                  About Us
                </span>
              </div>
            </Reveal>

            <Reveal delay={150}>
              <h1 className="text-5xl font-bold leading-[1.08] tracking-tight text-[#101a30] sm:text-6xl md:text-6xl lg:text-7xl">
                About{" "}
                <span className="bg-gradient-to-r from-blue-700 via-blue-600 to-sky-500 bg-clip-text text-transparent">
                  Girik.
                </span>
              </h1>
            </Reveal>

            <Reveal delay={250}>
              <p className="mt-7 text-xl font-medium tracking-tight text-[#173b70] md:text-2xl">
                Trade & Distributor Company
              </p>

              <div className="mt-7 h-1.5 w-20 rounded-full bg-gradient-to-r from-blue-700 to-sky-400" />
            </Reveal>

            <Reveal delay={350}>
              <p className="mt-7 max-w-xl text-base leading-8 text-slate-600 md:text-lg">
                Connecting businesses through reliable trading,
                sourcing, and distribution solutions. We deliver
                quality products and build trusted partnerships
                to support business growth.
              </p>
            </Reveal>

            <Reveal delay={450}>
              <div className="mt-9 flex flex-wrap items-center gap-5">

                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-4 rounded-full bg-gradient-to-r from-[#0b3478] to-[#0755b5] px-8 py-4 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(11,52,120,0.25)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_35px_rgba(11,52,120,0.35)]"
                >
                  Work With Us

                  <span className="text-lg transition-transform duration-300 group-hover:translate-x-1.5">
                    →
                  </span>
                </Link>

                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#173b70] transition-colors hover:text-blue-600"
                >
                  Explore Services
                  <span>↗</span>
                </Link>

              </div>
            </Reveal>

            {/* Small Information */}
            <Reveal delay={550}>
              <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-blue-200/70 pt-7">

                <div>
                  <p className="text-sm font-bold text-[#102b59]">
                    Quality
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Trusted Products
                  </p>
                </div>

                <div className="h-9 w-px bg-blue-200" />

                <div>
                  <p className="text-sm font-bold text-[#102b59]">
                    Innovation
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Better Solutions
                  </p>
                </div>

                <div className="h-9 w-px bg-blue-200" />

                <div>
                  <p className="text-sm font-bold text-[#102b59]">
                    Partnership
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Growing Together
                  </p>
                </div>

              </div>
            </Reveal>
          </div>

          {/* RIGHT IMAGE */}
          <Reveal delay={250}>
            <div className="relative mx-auto w-full max-w-2xl">

              {/* Blue Decorative Shape */}
              <div className="absolute -right-10 -top-10 h-44 w-44 rounded-full bg-blue-400/20 blur-2xl" />

              <div className="absolute -bottom-10 -left-10 h-52 w-52 rounded-full bg-sky-400/25 blur-3xl" />

              {/* Image Frame */}
              <div className="relative rounded-[2rem] border border-white/80 bg-white/40 p-2.5 shadow-[0_30px_80px_rgba(30,64,175,0.18)] backdrop-blur-sm">

                <div className="group relative aspect-[5/4] overflow-hidden rounded-[1.5rem] bg-blue-100">

                  <Image
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85"
                    alt="Modern corporate office building"
                    fill
                    priority
                    unoptimized
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#071d40]/80 via-transparent to-transparent" />

                  <div className="absolute bottom-7 left-7 right-7">

                    <div className="mb-3 flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-sky-400" />
                      <span className="text-xs font-bold uppercase tracking-[0.25em] text-sky-300">
                        GIRIK COMPANY
                      </span>
                    </div>

                    <h2 className="max-w-md text-2xl font-bold leading-tight text-white md:text-3xl">
                      Connecting Businesses.
                      <br />
                      Delivering Quality.
                    </h2>

                  </div>
                </div>
              </div>

              {/* Floating Card */}
              <div className="absolute -bottom-8 -left-5 rounded-2xl border border-blue-100 bg-white/95 p-5 shadow-[0_15px_40px_rgba(30,64,175,0.15)] backdrop-blur-xl md:-left-10">

                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-700 to-sky-400 text-xl text-white">
                    ✦
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                      Our Commitment
                    </p>

                    <p className="mt-1 text-base font-bold text-[#101a30]">
                      Quality & Partnership
                    </p>
                  </div>
                </div>
              </div>

              {/* Top Floating Decoration */}
              <div className="absolute -right-5 top-12 hidden rounded-2xl border border-white/70 bg-white/80 p-4 shadow-xl backdrop-blur-xl sm:block">

                <div className="flex items-center gap-3">
                  <div className="h-3 w-3 rounded-full bg-blue-600" />

                  <p className="text-xs font-bold text-[#102b59]">
                    Global Commerce
                  </p>
                </div>
              </div>

            </div>
          </Reveal>

        </div>
      </section>

      {/* ================= ABOUT / STORY ================= */}
      <section className="relative px-6 py-20 md:px-16 md:py-28 lg:px-24">

        <div className="pointer-events-none absolute -left-32 top-32 h-80 w-80 rounded-full bg-blue-100/60 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl gap-12 md:grid-cols-2 md:items-center md:gap-16">

          {/* Story Image */}
          <Reveal>
            <div className="group relative">

              <div className="absolute -bottom-3 -right-3 h-full w-full rounded-2xl border-2 border-blue-200 transition-transform duration-500 group-hover:translate-x-1 group-hover:translate-y-1" />

              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white bg-blue-100 shadow-[0_20px_60px_rgba(30,64,175,0.12)]">

                <Image
                  src="https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=1400&q=80"
                  alt="Global trade and shipping"
                  fill
                  unoptimized
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-blue-950/50 via-transparent to-transparent" />

                <div className="absolute bottom-5 left-5 right-5 rounded-xl border border-white/40 bg-white/85 p-4 shadow-lg backdrop-blur-md">

                  <p className="text-xs font-medium uppercase tracking-wider text-blue-600">
                    Our Commitment
                  </p>

                  <p className="mt-1 text-lg font-semibold text-[#101a30]">
                    Quality & Partnership
                  </p>

                </div>
              </div>
            </div>
          </Reveal>

          {/* Company Story */}
          <Reveal delay={150}>
            <div className="max-w-xl">

              <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-blue-100 bg-blue-50 px-4 py-2">

                <span className="h-2 w-2 rounded-full bg-blue-600" />

                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-800">
                  Our Story
                </p>

              </div>

              <h2 className="text-4xl font-semibold leading-tight tracking-tight text-[#101a30] md:text-5xl">
                Building connections through{" "}
                <span className="text-blue-700">
                  global commerce.
                </span>
              </h2>

              <p className="mt-7 text-base leading-8 text-slate-600">
                PT Dunia Sports Interprises is a trading and distribution
                company based in Jakarta, Indonesia. The company focuses on
                providing and selling a wide range of products, particularly
                sports equipment, to meet market needs through various
                marketing and distribution channels, including direct sales
                and e-commerce.
              </p>

              <p className="mt-5 text-base leading-8 text-slate-600">
                The company&apos;s business operations are supported by various
                activities, including merchandising, marketing, trade
                marketing, logistics, delivery, import, warehouse management,
                and customer services. In addition to sports products, PT
                Dunia Sports Interprises also distributes consumer goods such
                as personal care, skincare and body care, herbal wellness,
                and food products.
              </p>

              <p className="mt-5 text-base leading-8 text-slate-600">
                Supported by networks across modern markets, general trade,
                and e-commerce, PT Dunia Sports Interprises continues to
                develop its trading and distribution operations in an
                organized manner to provide products and services that meet
                customer needs.
              </p>

              <Link
                href="/contact"
                className="group mt-8 inline-flex items-center gap-3 rounded-full bg-blue-700 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-700/20 transition-all duration-300 hover:-translate-y-1 hover:bg-blue-800 hover:shadow-xl hover:shadow-blue-700/30"
              >
                Work With Us

                <span className="transition-transform duration-300 group-hover:translate-x-1.5">
                  →
                </span>
              </Link>

            </div>
          </Reveal>

        </div>
      </section>

      {/* ================= OUR GOAL ================= */}
      <section className="relative bg-gradient-to-b from-[#eaf3ff] via-[#dcecff] to-[#c5e5ff] px-6 py-20 md:px-16 md:py-28 lg:px-24">

        <div className="pointer-events-none absolute -right-32 top-10 h-80 w-80 rounded-full border border-blue-300/30" />

        <div className="relative z-10 mx-auto max-w-7xl">

          {/* Heading */}
          <Reveal>
            <div className="mb-14 max-w-3xl md:mb-16">

              <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-blue-200 bg-white/70 px-4 py-2 shadow-sm backdrop-blur-sm">

                <span className="h-2 w-2 rounded-full bg-blue-600" />

                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-800">
                  Our Goal
                </p>

              </div>

              <h2 className="text-4xl font-semibold leading-tight tracking-tight text-[#101a30] md:text-6xl">
                Driving the Future of{" "}
                <span className="bg-gradient-to-r from-blue-700 to-sky-500 bg-clip-text text-transparent">
                  Global Commerce.
                </span>
              </h2>

              <p className="mt-6 max-w-2xl leading-relaxed text-slate-600">
                Guided by a shared vision, mission, and purpose, we strive to
                build trusted relationships and create lasting value.
              </p>

            </div>
          </Reveal>

          {/* Vision, Mission & Purpose */}
          <div className="grid gap-6 md:grid-cols-3">

            {goals.map((goal, index) => (
              <Reveal key={goal.title} delay={index * 150}>

                <div className="group h-full rounded-2xl border border-white/80 bg-white/70 p-7 shadow-[0_10px_40px_rgba(30,64,175,0.06)] backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:border-blue-200 hover:bg-white hover:shadow-[0_24px_50px_rgba(30,64,175,0.13)] md:p-8">

                  <div className="flex items-center justify-between">

                    <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-blue-700 to-sky-500 text-2xl text-white shadow-lg shadow-blue-700/20 transition-transform duration-300 group-hover:scale-110">
                      {goal.icon}
                    </div>

                    <span className="text-sm font-semibold tracking-widest text-blue-300">
                      {goal.number}
                    </span>

                  </div>

                  <h3 className="mt-7 text-2xl font-semibold tracking-tight text-[#101a30]">
                    {goal.title}
                  </h3>

                  <p className="mt-4 leading-7 text-slate-600">
                    {goal.description}
                  </p>

                  <div className="mt-7 h-1 w-10 rounded-full bg-blue-500 transition-all duration-300 group-hover:w-20" />

                </div>

              </Reveal>
            ))}

          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0b1730] via-[#102b59] to-[#123f7a] px-6 py-24 text-white md:px-16 md:py-32 lg:px-24">

        {/* Background Decoration */}
        <div className="pointer-events-none absolute -right-24 -top-32 h-96 w-96 rounded-full border border-blue-300/20" />

        <div className="pointer-events-none absolute -bottom-40 -left-20 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />

        <Reveal>
          <div className="relative z-10 mx-auto max-w-7xl">

            <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-sky-300/20 bg-white/5 px-4 py-2 backdrop-blur-sm">

              <span className="h-2 w-2 rounded-full bg-sky-400" />

              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-sky-200">
                Let&apos;s Connect
              </p>

            </div>

            <h2 className="max-w-4xl text-4xl font-semibold leading-tight tracking-tight md:text-6xl lg:text-7xl">
              Partner with PT Dunia Sports Interprises to{" "}
              <span className="bg-gradient-to-r from-sky-300 to-blue-200 bg-clip-text text-transparent">
                grow your business globally.
              </span>
            </h2>

            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-blue-100/75">
              Have a business opportunity or want to learn more about our
              company? We would love to hear from you.
            </p>

            <Link
              href="/contact"
              className="group mt-10 inline-flex items-center gap-4 rounded-full bg-sky-400 px-8 py-4 text-sm font-semibold text-[#0b1730] shadow-lg shadow-sky-400/20 transition-all duration-300 hover:-translate-y-1 hover:bg-sky-300 hover:shadow-xl hover:shadow-sky-400/30"
            >
              Get in Touch

              <span className="text-lg transition-transform duration-300 group-hover:translate-x-1.5">
                →
              </span>
            </Link>

          </div>
        </Reveal>
      </section>

    </main>
  );
}
