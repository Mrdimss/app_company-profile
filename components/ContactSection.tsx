import Link from "next/link";
import Reveal from "@/components/Reveal";

export default function ContactSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#eaf3ff] via-[#d8eaff] to-[#b8e3ff] px-6 py-28 md:px-16 md:py-36 lg:px-24">

      {/* Background Decoration */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full border border-blue-300/40" />
      <div className="pointer-events-none absolute -right-12 -top-12 h-72 w-72 rounded-full border border-blue-400/30" />
      <div className="pointer-events-none absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-blue-400/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <Reveal>
          <div className="max-w-5xl">

            {/* Label */}
            <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-blue-200 bg-white/70 px-4 py-2 shadow-sm backdrop-blur-sm">
              <span className="h-2 w-2 animate-pulse rounded-full bg-blue-600" />
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-800">
                Get In Touch
              </p>
            </div>

            {/* Heading */}
            <h2 className="text-5xl font-semibold leading-[1.05] tracking-tight text-[#101a30] md:text-7xl lg:text-8xl">
              Have an idea?
              <br />
              <span className="bg-gradient-to-r from-blue-700 via-blue-600 to-sky-500 bg-clip-text text-transparent">
                Let&apos;s make it happen.
              </span>
            </h2>

            {/* Description */}
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-slate-600 md:text-xl">
              Whether you have a project in mind or simply want to discuss
              an idea, we would love to hear from you.
              Let&apos;s build something great together.
            </p>

            {/* Button */}
            <Link
              href="/contact"
              className="group mt-10 inline-flex items-center gap-4 rounded-full bg-blue-700 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-blue-700/20 transition-all duration-300 hover:-translate-y-1 hover:bg-blue-800 hover:shadow-xl hover:shadow-blue-700/30"
            >
              Start a Conversation
              <span className="text-lg transition-transform duration-300 group-hover:translate-x-1.5">
                →
              </span>
            </Link>

            {/* Bottom Accent */}
            <div className="mt-16 h-px w-full max-w-3xl bg-gradient-to-r from-blue-400/60 via-blue-300/40 to-transparent md:mt-20" />

            <p className="mt-5 text-sm font-medium tracking-wide text-blue-800/70">
              We&apos;re ready to hear from you.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}