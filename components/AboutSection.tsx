import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";

export default function AboutSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#eaf3ff] via-[#d8eaff] to-[#b8e3ff] px-6 py-24 md:px-16 md:py-28 lg:px-24">

      {/* Background Decoration */}
      <div className="pointer-events-none absolute -left-32 top-16 h-80 w-80 rounded-full border border-blue-300/40" />
      <div className="pointer-events-none absolute -left-20 top-28 h-60 w-60 rounded-full border border-blue-400/30" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-blue-400/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* Heading */}
        <Reveal>
          <div>
            <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-blue-200 bg-white/70 px-4 py-2 shadow-sm backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-blue-600" />
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-800">
                About Us
              </p>
            </div>

            <h2 className="max-w-4xl text-4xl font-semibold leading-tight tracking-tight text-[#101a30] md:text-6xl">
              Delivering Quality In{" "}
              <span className="bg-gradient-to-r from-blue-700 to-sky-500 bg-clip-text text-transparent">
                Sports .
              </span>
            </h2>

            <div className="mt-6 h-1 w-20 rounded-full bg-gradient-to-r from-blue-700 to-sky-400" />
          </div>
        </Reveal>

        {/* Content */}
        <div className="mt-14 grid gap-10 md:grid-cols-2 md:items-center md:gap-16">

          {/* Image */}
          <Reveal delay={100}>
            <div className="group relative">
              {/* Decorative Frame */}
              <div className="absolute -bottom-3 -right-3 h-full w-full rounded-2xl border-2 border-blue-300/50 transition-transform duration-500 group-hover:translate-x-1 group-hover:translate-y-1" />

              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/80 bg-white/60 shadow-[0_20px_60px_rgba(30,64,175,0.14)]">
                <Image
                  src="/images/template.png"
                  alt="About our company"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Image Overlay */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-blue-950/30 via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-100" />

                {/* Image Label */}
                <div className="absolute bottom-5 left-5 rounded-xl border border-white/40 bg-white/85 px-4 py-3 shadow-lg backdrop-blur-md">
                  <p className="text-xs font-medium text-slate-500">
                    Our Commitment
                  </p>
                  <p className="mt-1 text-sm font-semibold text-blue-800">
                    Quality & Partnership
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Text */}
          <Reveal delay={200}>
            <div className="max-w-xl md:pl-2">
              <p className="text-lg leading-relaxed text-slate-700 md:text-xl">
                PT Dunia Sports Interprises is a trading and distribution
                company based in Jakarta, Indonesia. The company focuses on
                providing and selling a wide range of products, particularly
                sports equipment, to meet market needs through various
                marketing and distribution channels, including direct sales
                and e-commerce.
              </p>

              <p className="mt-6 leading-relaxed text-slate-600">
                The company&apos;s business operations are supported by various
                activities, including merchandising, marketing, trade
                marketing, logistics, delivery, import, warehouse management,
                and customer services.
              </p>

              {/* Highlights */}
              <div className="mt-8 flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/60 px-4 py-2 text-sm font-medium text-blue-800">
                  <span className="text-blue-600">✓</span>
                  Reliable Distribution
                </span>

                <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/60 px-4 py-2 text-sm font-medium text-blue-800">
                  <span className="text-blue-600">✓</span>
                  Quality Products
                </span>
              </div>

              {/* Button */}
              <Link
                href="/about"
                className="group mt-9 inline-flex items-center gap-4 rounded-full bg-blue-700 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-700/20 transition-all duration-300 hover:-translate-y-1 hover:bg-blue-800 hover:shadow-xl hover:shadow-blue-700/30"
              >
                More About Us
                <span className="transition-transform duration-300 group-hover:translate-x-1.5">
                  →
                </span>
              </Link>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}