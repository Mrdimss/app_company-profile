"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative flex min-h-[calc(100vh-88px)] items-center overflow-hidden px-8 py-20 md:px-16 lg:px-24">

      {/* Background Accent */}
      <div className="pointer-events-none absolute right-[-10%] top-[10%] h-[500px] w-[500px] rounded-full bg-neutral-100 blur-3xl" />

      <div className="relative z-10 mx-auto w-full max-w-7xl">

        {/* Small Label */}
        <p
          className={`mb-8 text-xs uppercase tracking-[0.35em] text-gray-500 transition-all duration-700 ease-out md:text-sm ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          }`}
        >
          Digital Creative Studio
        </p>

        {/* Main Heading */}
        <h1
          className={`max-w-6xl text-5xl font-medium leading-[0.95] tracking-[-0.04em] transition-all duration-700 ease-out sm:text-6xl md:text-7xl lg:text-[8rem] ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          }`}
          style={{
            transitionDelay: "150ms",
          }}
        >
          We create
          <br />
          <span className="text-gray-400">digital</span> experiences.
        </h1>

        {/* Bottom Content */}
        <div
          className={`mt-12 flex flex-col justify-between gap-10 transition-all duration-700 ease-out md:mt-16 md:flex-row md:items-end ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          }`}
          style={{
            transitionDelay: "300ms",
          }}
        >

          {/* Description */}
          <p className="max-w-md text-base leading-relaxed text-gray-500 md:text-lg">
            We transform ideas into meaningful digital experiences
            through design, technology, and creativity.
          </p>

          {/* CTA */}
          <div className="flex flex-col gap-4 sm:flex-row">

            <Link
              href="/projects"
              className="group inline-flex items-center justify-center rounded-full bg-black px-7 py-4 text-sm text-white transition-all duration-300 hover:-translate-y-1 hover:bg-gray-800"
            >
              Explore Our Work

              <span className="ml-4 transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-gray-300 px-7 py-4 text-sm transition-all duration-300 hover:-translate-y-1 hover:border-black hover:bg-gray-100"
            >
              Let's Talk
            </Link>

          </div>
        </div>

        {/* Bottom Indicator */}
        <div
          className={`mt-20 flex items-center gap-4 text-xs uppercase tracking-[0.25em] text-gray-400 transition-all duration-700 ease-out md:mt-24 ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          }`}
          style={{
            transitionDelay: "450ms",
          }}
        >
          <span className="h-px w-12 bg-gray-300" />
          Scroll to explore
        </div>

      </div>
    </section>
  );
}