"use client";

import { useEffect, useRef, useState } from "react";

/* =========================================================
   REVEAL COMPONENT
   Efek muncul saat elemen masuk ke layar
========================================================= */

type RevealProps = {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
};

function Reveal({
  children,
  delay = 0,
  duration = 700,
  className = "",
}: RevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

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
      className={`
        transition-all ease-out
        ${
          isVisible
            ? "translate-y-0 opacity-100"
            : "translate-y-12 opacity-0"
        }
        ${className}
      `}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}


/* =========================================================
   CONTACT PAGE
========================================================= */

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-white text-black">


      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="px-6 pt-16 pb-12 md:px-16 md:pt-24 lg:px-24">

        <div className="mx-auto max-w-7xl">

          <Reveal delay={0}>

            <p className="text-xs uppercase tracking-[0.3em] text-gray-500">
              Contact Us
            </p>

          </Reveal>


          <Reveal delay={150}>

            <h1 className="mt-5 max-w-5xl text-5xl font-medium leading-[0.95] tracking-[-0.04em] sm:text-6xl md:text-7xl lg:text-[7rem]">

              Let&apos;s work

              <br />

              <span className="text-gray-400">
                together.
              </span>

            </h1>

          </Reveal>


          <Reveal delay={300}>

            <p className="mt-8 max-w-2xl text-base leading-relaxed text-gray-500 md:text-lg">

              Have a question, business inquiry, or partnership
              opportunity? Get in touch with PT Dunia Sports
              Interprises and our team will be happy to assist you.

            </p>

          </Reveal>

        </div>

      </section>



      {/* =====================================================
          CONTACT CARDS
      ===================================================== */}

      <section className="px-6 py-10 md:px-16 lg:px-24">

        <div className="mx-auto max-w-7xl">

          <div className="grid gap-4 md:grid-cols-3">


            {/* OFFICE */}

            <Reveal delay={0}>

              <div className="group flex min-h-[190px] flex-col justify-between rounded-xl bg-neutral-100 p-6 transition-all duration-500 hover:-translate-y-1 hover:bg-neutral-200">

                <div className="flex items-start justify-between">

                  <div className="grid h-11 w-11 place-items-center rounded-full bg-white text-lg">
                    ♧
                  </div>

                  <span className="text-xl transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>

                </div>


                <div>

                  <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
                    Our Office
                  </p>

                  <p className="mt-3 text-sm leading-relaxed text-gray-700">
                    G-165, Sector-10, Faridabad, India, 121006
                  </p>

                </div>

              </div>

            </Reveal>



            {/* PHONE */}

            <Reveal delay={150}>

              <div className="group flex min-h-[190px] flex-col justify-between rounded-xl bg-neutral-100 p-6 transition-all duration-500 hover:-translate-y-1 hover:bg-neutral-200">

                <div className="flex items-start justify-between">

                  <div className="grid h-11 w-11 place-items-center rounded-full bg-white text-lg">
                    ☎
                  </div>

                  <span className="text-xl transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>

                </div>


                <div>

                  <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
                    Call Us
                  </p>

                  <p className="mt-3 text-sm text-gray-700">
                    +91 - 9891112185
                  </p>

                </div>

              </div>

            </Reveal>



            {/* EMAIL */}

            <Reveal delay={300}>

              <div className="group flex min-h-[190px] flex-col justify-between rounded-xl bg-neutral-100 p-6 transition-all duration-500 hover:-translate-y-1 hover:bg-neutral-200">

                <div className="flex items-start justify-between">

                  <div className="grid h-11 w-11 place-items-center rounded-full bg-white text-lg">
                    ✉
                  </div>

                  <span className="text-xl transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>

                </div>


                <div>

                  <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
                    Email Us
                  </p>

                  <p className="mt-3 text-sm text-gray-700">
                    info@earthyby.com
                  </p>

                </div>

              </div>

            </Reveal>

          </div>

        </div>

      </section>



      {/* =====================================================
          LOCATION
      ===================================================== */}

      <section className="px-6 py-20 md:px-16 md:py-28 lg:px-24">

        <div className="mx-auto max-w-7xl">


          <Reveal delay={0}>

            <p className="text-xs uppercase tracking-[0.3em] text-gray-500">
              Our Location
            </p>

          </Reveal>


          <Reveal delay={150}>

            <h2 className="mt-5 max-w-4xl text-4xl font-medium leading-tight tracking-tight md:text-6xl">

              Our team is ready to
              <br />
              work with you.

            </h2>

          </Reveal>


          <Reveal delay={300}>

            <p className="mt-6 max-w-2xl leading-relaxed text-gray-500">

              Visit our office or contact us to discuss your
              business, product distribution, and partnership
              opportunities.

            </p>

          </Reveal>



          {/* INDONESIA / MAIN OFFICE */}

          <Reveal delay={450}>

            <div className="mt-14 border-t border-black/10 py-8">

              <div className="grid gap-6 md:grid-cols-[180px_1fr_auto] md:items-center">

                <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
                  India Branch
                </p>


                <div>

                  <p className="text-lg font-medium">
                    Faridabad Office
                  </p>

                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-gray-600">

                    G-165, Sector-10,
                    Faridabad, India, 121006

                  </p>

                </div>


                <span className="text-2xl text-gray-400">
                  →
                </span>

              </div>

            </div>

          </Reveal>



          {/* GLOBAL NETWORK */}

          <Reveal delay={600}>

            <div className="border-t border-black/10 py-8">

              <div className="grid gap-6 md:grid-cols-[180px_1fr_auto] md:items-center">

                <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
                  Business Network
                </p>


                <div>

                  <p className="text-lg font-medium">
                    Global Distribution
                  </p>

                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-gray-600">

                    Supporting product sourcing, marketing,
                    logistics, and distribution activities.

                  </p>

                </div>


                <span className="text-2xl text-gray-400">
                  →
                </span>

              </div>

            </div>

          </Reveal>

        </div>

      </section>



      {/* =====================================================
          CONTACT FORM
      ===================================================== */}

      <section className="px-6 pb-20 md:px-16 lg:px-24">

        <div className="mx-auto max-w-7xl">


          <Reveal delay={0}>

            <p className="text-xs uppercase tracking-[0.3em] text-gray-500">
              Contact Us Form
            </p>

          </Reveal>


          <Reveal delay={150}>

            <h2 className="mt-5 max-w-4xl text-4xl font-medium leading-tight tracking-tight md:text-6xl">

              Ready to work
              <br />
              with us?

            </h2>

          </Reveal>


          <Reveal delay={300}>

            <p className="mt-6 max-w-2xl leading-relaxed text-gray-500">

              Send us a message and tell us how we can help
              your business.

            </p>

          </Reveal>



          {/* FORM */}

          <Reveal delay={450}>

            <form
              onSubmit={handleSubmit}
              className="mt-12 overflow-hidden rounded-2xl border border-black/10"
            >


              {/* FORM HEADER */}

              <div className="flex items-center justify-between bg-[#0b4a43] px-6 py-5 text-white md:px-8">

                <div>

                  <p className="text-lg font-medium">
                    Schedule a Free Consultation
                  </p>

                  <p className="mt-1 text-xs text-white/60">
                    Tell us about your business and your needs.
                  </p>

                </div>


                <span className="text-2xl">
                  ↗
                </span>

              </div>



              {/* FORM CONTENT */}

              <div className="grid gap-6 p-6 md:grid-cols-2 md:p-8">


                {/* FIRST NAME */}

                <div>

                  <label className="mb-2 block text-xs text-gray-600">
                    First name <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="text"
                    required
                    placeholder="First name"
                    className="w-full border border-gray-200 px-4 py-4 text-sm outline-none transition focus:border-black"
                  />

                </div>



                {/* LAST NAME */}

                <div>

                  <label className="mb-2 block text-xs text-gray-600">
                    Last name <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="text"
                    required
                    placeholder="Last name"
                    className="w-full border border-gray-200 px-4 py-4 text-sm outline-none transition focus:border-black"
                  />

                </div>



                {/* EMAIL */}

                <div className="md:col-span-2">

                  <label className="mb-2 block text-xs text-gray-600">
                    Email <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="email"
                    required
                    placeholder="your@email.com"
                    className="w-full border border-gray-200 px-4 py-4 text-sm outline-none transition focus:border-black"
                  />

                </div>



                {/* PHONE */}

                <div>

                  <label className="mb-2 block text-xs text-gray-600">
                    Phone <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="tel"
                    required
                    placeholder="+91"
                    className="w-full border border-gray-200 px-4 py-4 text-sm outline-none transition focus:border-black"
                  />

                </div>



                {/* COMPANY */}

                <div>

                  <label className="mb-2 block text-xs text-gray-600">
                    Company <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="text"
                    required
                    placeholder="Company name"
                    className="w-full border border-gray-200 px-4 py-4 text-sm outline-none transition focus:border-black"
                  />

                </div>



                {/* COUNTRY */}

                <div className="md:col-span-2">

                  <label className="mb-2 block text-xs text-gray-600">
                    Country <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="text"
                    required
                    placeholder="Country"
                    className="w-full border border-gray-200 px-4 py-4 text-sm outline-none transition focus:border-black"
                  />

                </div>



                {/* MESSAGE */}

                <div className="md:col-span-2">

                  <label className="mb-2 block text-xs text-gray-600">
                    Message <span className="text-red-500">*</span>
                  </label>

                  <textarea
                    required
                    rows={7}
                    placeholder="To better assist you, please describe how we can help."
                    className="w-full resize-none border border-gray-200 px-4 py-4 text-sm outline-none transition focus:border-black"
                  />

                </div>



                {/* SUBMIT */}

                <div className="md:col-span-2">

                  <button
                    type="submit"
                    className="rounded-full bg-black px-8 py-4 text-sm text-white transition duration-300 hover:-translate-y-1 hover:bg-gray-800"
                  >
                    Send Message →
                  </button>


                  {isSubmitted && (

                    <p className="mt-4 text-sm text-green-600">
                      Thank you. Your message has been submitted.
                    </p>

                  )}

                </div>

              </div>

            </form>

          </Reveal>

        </div>

      </section>



      {/* =====================================================
          GOOGLE MAPS
      ===================================================== */}

      <section className="px-6 pb-20 md:px-16 lg:px-24">

        <div className="mx-auto max-w-7xl">


          {/* MAP TITLE */}

          <Reveal delay={0}>

            <div className="mb-8">

              <p className="text-xs uppercase tracking-[0.3em] text-gray-500">
                Find Us
              </p>

              <h2 className="mt-4 text-4xl font-medium tracking-tight md:text-6xl">
                Visit Our Office
              </h2>

              <p className="mt-4 max-w-2xl text-gray-500">
                G-165, Sector-10, Faridabad, India, 121006
              </p>

            </div>

          </Reveal>



          {/* MAP */}

          <Reveal delay={200}>

            <div className="overflow-hidden rounded-2xl border border-black/10">

              <div className="relative h-[350px] w-full md:h-[500px]">

                <iframe
                  src="https://www.google.com/maps?q=G-165%2C%20Sector-10%2C%20Faridabad%2C%20India%2C%20121006&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                  title="PT Dunia Sports Interprises Location"
                />

              </div>



              {/* MAP INFORMATION */}

              <div className="flex flex-col gap-5 bg-neutral-100 p-6 md:flex-row md:items-center md:justify-between">

                <div>

                  <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
                    Office Address
                  </p>

                  <p className="mt-2 text-sm text-gray-700">
                    G-165, Sector-10, Faridabad, India, 121006
                  </p>

                </div>



                {/* GOOGLE MAPS BUTTON */}

                <a
                  href="https://www.google.com/maps/search/?api=1&query=G-165%2C%20Sector-10%2C%20Faridabad%2C%20India%2C%20121006"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-black px-7 py-4 text-sm text-white transition-all duration-300 hover:-translate-y-1 hover:bg-gray-800"
                >

                  Open in Google Maps

                  <span className="ml-4">
                    →
                  </span>

                </a>

              </div>

            </div>

          </Reveal>

        </div>

      </section>



      {/* =====================================================
          BOTTOM CTA
      ===================================================== */}

      <section className="bg-black px-6 py-20 text-white md:px-16 md:py-28 lg:px-24">

        <div className="mx-auto max-w-7xl">

          <Reveal delay={0}>

            <p className="text-xs uppercase tracking-[0.3em] text-gray-400">
              Let&apos;s Connect
            </p>

          </Reveal>


          <Reveal delay={200}>

            <h2 className="mt-5 max-w-4xl text-4xl font-medium leading-tight tracking-tight md:text-6xl">

              Let&apos;s build meaningful
              <br />
              business opportunities together.

            </h2>

          </Reveal>

        </div>

      </section>

    </main>
  );
}