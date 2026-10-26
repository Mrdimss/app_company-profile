
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative isolate flex min-h-[calc(100vh-88px)] items-center overflow-hidden bg-gradient-to-br from-[#F0F7FF] via-[#DBEAFE] to-[#BFDBFE] px-6 py-20 sm:px-10 md:px-16 lg:px-24">
      {/* Background Decorations */}
      <div className="pointer-events-none absolute -right-32 -top-32 -z-10 h-[450px] w-[450px] rounded-full bg-blue-300/40 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-40 -left-32 -z-10 h-[400px] w-[400px] rounded-full bg-sky-300/40 blur-[100px]" />
      <div className="pointer-events-none absolute right-[12%] top-[12%] -z-10 hidden h-40 w-40 rounded-full border border-blue-400/20 md:block" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.12] [background-image:radial-gradient(#4778AD_0.7px,transparent_0.7px)] [background-size:24px_24px]" />

      <div className="mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
        {/* Left Content */}
        <div>
          {/* Label */}
          <div
            className={`mb-8 inline-flex items-center gap-3 rounded-full border border-blue-200/80 bg-white/70 px-4 py-2 shadow-sm backdrop-blur-xl transition-all duration-700 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-5 opacity-0"
            }`}
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-500 opacity-50" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-blue-600" />
            </span>

            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-900 sm:text-sm">
              PT Dunia Sports
            </span>
          </div>

          {/* Heading */}
          <h1
            className={`max-w-3xl text-5xl font-semibold leading-[1.04] tracking-[-0.055em] text-slate-900 transition-all duration-700 sm:text-6xl md:text-7xl lg:text-[5.2rem] ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
            style={{ transitionDelay: "120ms" }}
          >
            We distributor
            <br />
            <span className="bg-gradient-to-r from-blue-800 via-blue-600 to-sky-500 bg-clip-text text-transparent">
              sports
            </span>{" "}
            products.
          </h1>

          {/* Description */}
          <p
            className={`mt-7 max-w-xl text-base leading-8 text-slate-600 transition-all duration-700 sm:text-lg ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-6 opacity-0"
            }`}
            style={{ transitionDelay: "250ms" }}
          >
            We distribute quality sports and beauty products with reliability and care.
          </p>

          {/* Buttons */}
          <div
            className={`mt-9 flex flex-col gap-4 transition-all duration-700 sm:flex-row ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-6 opacity-0"
            }`}
            style={{ transitionDelay: "350ms" }}
          >
            <Link
              href="/projects"
              className="group inline-flex items-center justify-center gap-4 rounded-full bg-blue-700 px-7 py-4 text-sm font-semibold text-white shadow-lg shadow-blue-700/20 transition-all duration-300 hover:-translate-y-1 hover:bg-blue-800 hover:shadow-xl hover:shadow-blue-700/25"
            >
              Explore Our Work
              <span className="transition-transform duration-300 group-hover:translate-x-1.5">
                →
              </span>
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-3 rounded-full border border-blue-200 bg-white/70 px-7 py-4 text-sm font-semibold text-blue-950 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-blue-400 hover:bg-white"
            >

              Let&apos;s Talk
=======
              Let's Talk
              <span aria-hidden="true">↗</span>
              fc22d4b (Update project company profile)
            </Link>
          </div>

          {/* Trust Indicators */}
          <div
            className={`mt-12 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-blue-200/80 pt-6 text-sm text-slate-600 transition-all duration-700 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
            style={{ transitionDelay: "450ms" }}
          >
            <span className="flex items-center gap-2">
              <span className="font-bold text-blue-700">✓</span>
              Reliable Distribution
            </span>

            <span className="flex items-center gap-2">
              <span className="font-bold text-blue-700">✓</span>
              Quality Products
            </span>
          </div>
        </div>

        {/* Right Visual */}
        <div
          className={`relative mx-auto w-full max-w-md transition-all duration-1000 lg:max-w-none ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          }`}
          style={{ transitionDelay: "300ms" }}
        >
          {/* Decorative Ring */}
          <div className="absolute -right-4 -top-4 h-28 w-28 rounded-full border border-blue-400/40 sm:-right-6 sm:-top-6 sm:h-36 sm:w-36" />

          {/* Main Visual Card */}
          <div className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-white/50 p-3 shadow-2xl shadow-blue-900/10 backdrop-blur-xl sm:rounded-[2.5rem] sm:p-4">
            <div className="relative flex min-h-[390px] flex-col justify-between overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-blue-900 via-blue-700 to-sky-500 p-6 text-white sm:min-h-[460px] sm:rounded-[2rem] sm:p-8">
              {/* Decorative Circles */}
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border border-white/15" />
              <div className="absolute -right-10 -top-10 h-44 w-44 rounded-full border border-white/15" />
              <div className="absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-sky-300/20 blur-2xl" />

              {/* Card Header */}
              <div className="relative z-10 flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-blue-100">
                    Our Commitment
                  </p>
                  <p className="mt-2 text-lg font-semibold sm:text-xl">
                    Built on Trust.
                  </p>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-2xl backdrop-blur-md">
                  ↗
                </div>
              </div>

              {/* Sports Illustration */}
              <div className="relative z-10 flex flex-1 items-center justify-center py-8">
                <div className="relative flex h-44 w-44 items-center justify-center rounded-full border border-white/25 bg-white/10 shadow-2xl backdrop-blur-sm sm:h-52 sm:w-52">
                  <div className="absolute inset-4 rounded-full border border-white/20" />
                  <div className="absolute inset-8 rounded-full border border-white/20" />

                  <svg
                    viewBox="0 0 120 120"
                    className="h-28 w-28 text-white drop-shadow-lg sm:h-36 sm:w-36"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinejoin="round"
                    role="img"
                    aria-label="Sports ball illustration"
                  >
                    <circle cx="60" cy="60" r="43" />
                    <path d="M60 17 L76 38 L68 57 L45 57 L36 37 Z" />
                    <path
                      d="M45 57 L28 76 L38 94 M68 57 L86 72 L82 92 M36 37 L19 44 M76 38 L96 34 M28 76 L14 68 M86 72 L105 62 M38 94 L60 103 L82 92 M60 17 L60 4"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>

              {/* Card Footer */}
              <div className="relative z-10 border-t border-white/20 pt-5">
                <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                  Moving Brands Forward.
                </h2>

                <p className="mt-2 max-w-xs text-sm leading-6 text-blue-100">
                  Quality products. Reliable partnerships. Better opportunities.
                </p>
              </div>
            </div>
          </div>

          {/* Floating Badge */}
          <div className="absolute -bottom-5 -left-2 rounded-2xl border border-white/80 bg-white/90 px-4 py-3 shadow-xl shadow-blue-900/10 backdrop-blur-xl sm:-left-8 sm:px-5 sm:py-4">
            <p className="text-xs text-slate-500">Our focus</p>
            <p className="mt-1 text-sm font-bold text-blue-900 sm:text-base">
              Quality & Partnership
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
