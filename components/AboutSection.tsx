import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";

export default function AboutSection() {
  return (
    <section className="px-8 py-24 md:px-16 lg:px-24">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <Reveal>
          <div>
            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-gray-500">
              About Us
            </p>

            <h2 className="max-w-4xl text-4xl font-medium leading-tight tracking-tight md:text-6xl">
             Delivering quality in sports and beauty
            </h2>
          </div>
        </Reveal>

        {/* Content */}
        <div className="mt-12 grid gap-12 md:grid-cols-2 md:items-center">

          {/* Image */}
          <Reveal delay={100}>
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src="/images/template.png"
                alt="About our company"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                loading="eager"
                className="object-cover transition duration-700 hover:scale-105"
              />
            </div>
          </Reveal>

          {/* Text */}
          <Reveal delay={200}>
            <div className="max-w-xl">
              <p className="text-lg leading-relaxed text-gray-600">
                PT Dunia Sports Interprises is a trading and distribution
                company based in Jakarta, Indonesia. The company focuses on
                providing and selling a wide range of products, particularly
                sports equipment, to meet market needs through various
                marketing and distribution channels, including direct sales
                and e-commerce.
              </p>

              <p className="mt-6 leading-relaxed text-gray-500">
                The company&apos;s business operations are supported by various
                activities, including merchandising, marketing, trade
                marketing, logistics, delivery, import, warehouse management,
                and customer services.
              </p>

              <Link
                href="/about"
                className="mt-8 inline-flex border-b border-black pb-1 text-sm font-medium transition duration-300 hover:-translate-y-1 hover:opacity-60"
              >
                More About Us →
              </Link>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}