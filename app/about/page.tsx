export default function AboutPage() {
  return (
    <main>
      {/* Hero */}
      <section className="px-8 py-24 md:px-16 md:py-32 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <p className="mb-6 text-sm uppercase tracking-[0.3em] text-gray-500">
            About Us
          </p>

          <h1 className="max-w-6xl text-5xl font-medium leading-[1] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
            We believe good ideas can create meaningful change.
          </h1>
        </div>
      </section>

      {/* Story */}
      <section className="bg-neutral-100 px-8 py-24 md:px-16 lg:px-24">
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2 md:items-start">
          
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-gray-500">
              Our Story
            </p>
          </div>

          <div className="max-w-2xl">
            <p className="text-2xl leading-relaxed tracking-tight md:text-3xl">
              We started with a simple idea: creating digital solutions
              that are not only visually appealing, but also useful and
              meaningful for the people who use them.
            </p>

            <p className="mt-8 leading-relaxed text-gray-600">
              Our approach combines creativity, technology, and an
              understanding of business needs. We believe that every
              project has its own story, challenges, and opportunities.
            </p>

            <p className="mt-6 leading-relaxed text-gray-600">
              That's why we work closely with our clients from the early
              stages of an idea until the final solution is delivered.
            </p>
          </div>

        </div>
      </section>

      {/* Values */}
      <section className="px-8 py-24 md:px-16 lg:px-24">
        <div className="mx-auto max-w-7xl">

          <div className="mb-16">
            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-gray-500">
              Our Values
            </p>

            <h2 className="max-w-3xl text-4xl font-medium leading-tight tracking-tight md:text-6xl">
              Principles that guide the way we work.
            </h2>
          </div>

          <div className="border-t border-black/10">
            <div className="grid gap-6 border-b border-black/10 py-8 md:grid-cols-[100px_1fr_1.5fr]">
              <span className="text-sm text-gray-400">
                01
              </span>

              <h3 className="text-2xl font-medium">
                Creativity
              </h3>

              <p className="leading-relaxed text-gray-600">
                We explore new ideas and approaches to create solutions
                that are relevant and distinctive.
              </p>
            </div>

            <div className="grid gap-6 border-b border-black/10 py-8 md:grid-cols-[100px_1fr_1.5fr]">
              <span className="text-sm text-gray-400">
                02
              </span>

              <h3 className="text-2xl font-medium">
                Collaboration
              </h3>

              <p className="leading-relaxed text-gray-600">
                We believe the best results come from working together
                and understanding different perspectives.
              </p>
            </div>

            <div className="grid gap-6 border-b border-black/10 py-8 md:grid-cols-[100px_1fr_1.5fr]">
              <span className="text-sm text-gray-400">
                03
              </span>

              <h3 className="text-2xl font-medium">
                Impact
              </h3>

              <p className="leading-relaxed text-gray-600">
                We focus on creating solutions that provide real value
                for businesses and their customers.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="bg-black px-8 py-24 text-white md:px-16 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="max-w-4xl text-4xl font-medium leading-tight tracking-tight md:text-6xl">
            Let's create something meaningful together.
          </h2>

          <a
            href="/contact"
            className="mt-10 inline-flex rounded-full bg-white px-8 py-4 text-sm text-black transition hover:bg-gray-200"
          >
            Get in Touch →
          </a>
        </div>
      </section>
    </main>
  );
}