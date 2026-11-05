
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
    <section className="relative isolate flex min-h-[calc(100vh-88px)] items-center overflow-hidden bg-[#F0F7FF] px-6 py-20 sm:px-10 md:px-16 lg:px-24">

      {/* Background Company Image */}
      <div
        className="absolute inset-0 -z-20 bg-cover bg-[position:65%_center] md:bg-center"
        style={{
          backgroundImage: "url('/images/hero-company.png')",
        }}
      />

      {/* White Blue Overlay */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#F8FBFF]/95 via-[#F8FBFF]/75 to-[#F8FBFF]/20" />

      {/* Additional Blue Decoration */}
      <div className="pointer-events-none absolute -right-32 -top-32 -z-10 h-80 w-80 rounded-full bg-blue-400/10 blur-[100px]" />

      <div className="mx-auto w-full max-w-7xl">

        {/* Main Content */}
        <div className="max-w-2xl">

          {/* Label */}
          <div
            className={`mb-8 inline-flex items-center gap-3 rounded-full border border-blue-300/80 bg-white/60 px-5 py-2.5 shadow-sm backdrop-blur-md transition-all duration-700 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-5 opacity-0"
            }`}
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-500 opacity-50" />
              <span className="relative h-2.5 w-2.5 rounded-full bg-blue-600" />
            </span>

            <span className="text-xs font-bold uppercase tracking-[0.18em] text-blue-900 sm:text-sm">
              PT Dunia Sports
            </span>
          </div>

          {/* Heading */}
          <h1
            className={`text-5xl font-bold leading-[1.05] tracking-[-0.05em] text-slate-950 transition-all duration-700 sm:text-6xl md:text-7xl lg:text-[5.3rem] ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
            style={{ transitionDelay: "120ms" }}
          >
            WE DISTRIBUTE
            <br />

            <span className="bg-gradient-to-r from-blue-800 via-blue-600 to-sky-500 bg-clip-text text-transparent">
              SPORTS
            </span>{" "}
            PRODUCTS
          </h1>

          {/* Subtitle */}
          <h2
            className={`mt-5 text-xl font-semibold tracking-tight text-blue-950 transition-all duration-700 sm:text-2xl md:text-3xl ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-6 opacity-0"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            Trade & Distributor Company
          </h2>

          {/* Description */}
          <p
            className={`mt-6 max-w-lg text-base leading-8 text-slate-700 transition-all duration-700 sm:text-lg ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-6 opacity-0"
            }`}
            style={{ transitionDelay: "250ms" }}
          >
            We distribute quality sports products with reliability and care.
            Connecting businesses through trusted trading, sourcing, and
            distribution solutions.
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
              className="group inline-flex items-center justify-center gap-4 rounded-full bg-blue-800 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-blue-900/20 transition-all duration-300 hover:-translate-y-1 hover:bg-blue-900 hover:shadow-xl"
            >
              Explore Our Work

              <span className="transition-transform duration-300 group-hover:translate-x-1.5">
                →
              </span>
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-3 rounded-full border border-blue-300 bg-white/70 px-8 py-4 text-sm font-semibold text-blue-950 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:bg-white"
            >
              Let's Talk
              <span>↗</span>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div
            className={`mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-blue-200/80 pt-6 text-sm font-medium text-slate-700 transition-all duration-700 ${
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
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-blue-800/70 md:flex">
        <span className="h-9 w-5 rounded-full border-2 border-blue-700/60 p-1">
          <span className="mx-auto block h-2 w-1 rounded-full bg-blue-700 animate-bounce" />
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em]">
          Scroll
        </span>
      </div>

    </section>
  );
}
