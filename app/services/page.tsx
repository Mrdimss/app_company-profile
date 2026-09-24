const services = [
  {
    number: "01",
    title: "Web Development",
    description:
      "We create modern, responsive, and scalable websites that help businesses build a strong digital presence.",
    details: [
      "Company Profile",
      "E-Commerce",
      "Web Application",
      "Custom Website",
    ],
  },
  {
    number: "02",
    title: "UI/UX Design",
    description:
      "We design digital experiences that are simple, intuitive, and focused on the needs of users.",
    details: [
      "User Interface Design",
      "User Experience Design",
      "Wireframing",
      "Prototyping",
    ],
  },
  {
    number: "03",
    title: "Digital Solutions",
    description:
      "We develop technology solutions that help businesses improve their processes and work more efficiently.",
    details: [
      "Business Applications",
      "System Development",
      "Database Solutions",
      "Process Optimization",
    ],
  },
  {
    number: "04",
    title: "Business Strategy",
    description:
      "We help businesses turn ideas into practical digital strategies that support their goals.",
    details: [
      "Digital Strategy",
      "Business Analysis",
      "Technology Consulting",
      "Digital Transformation",
    ],
  },
];

export default function ServicesPage() {
  return (
    <main>
      {/* Hero */}
      <section className="px-8 py-24 md:px-16 md:py-32 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <p className="mb-6 text-sm uppercase tracking-[0.3em] text-gray-500">
            Our Services
          </p>

          <h1 className="max-w-6xl text-5xl font-medium leading-[1] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
            Digital solutions designed around your needs.
          </h1>
        </div>
      </section>

      {/* Services */}
      <section className="bg-black px-8 py-24 text-white md:px-16 lg:px-24">
        <div className="mx-auto max-w-7xl">

          <div className="border-t border-white/20">
            {services.map((service) => (
              <article
                key={service.number}
                className="border-b border-white/20 py-12 md:py-16"
              >
                <div className="grid gap-8 md:grid-cols-[100px_1fr_1.2fr]">

                  {/* Number */}
                  <span className="text-sm text-gray-500">
                    {service.number}
                  </span>

                  {/* Title */}
                  <div>
                    <h2 className="text-3xl font-medium tracking-tight md:text-5xl">
                      {service.title}
                    </h2>
                  </div>

                  {/* Description */}
                  <div>
                    <p className="leading-relaxed text-gray-400">
                      {service.description}
                    </p>

                    <ul className="mt-8 space-y-3">
                      {service.details.map((detail) => (
                        <li
                          key={detail}
                          className="flex items-center gap-3 text-sm text-gray-300"
                        >
                          <span className="text-gray-600">—</span>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>
              </article>
            ))}
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="px-8 py-24 md:px-16 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-3xl bg-neutral-100 px-8 py-16 md:px-16 md:py-20">

            <p className="mb-5 text-sm uppercase tracking-[0.3em] text-gray-500">
              Start a Project
            </p>

            <h2 className="max-w-4xl text-4xl font-medium leading-tight tracking-tight md:text-6xl">
              Have a project in mind?
            </h2>

            <p className="mt-6 max-w-xl leading-relaxed text-gray-600">
              Tell us about your idea and let's explore how we can
              turn it into a meaningful digital solution.
            </p>

            <a
              href="/contact"
              className="mt-8 inline-flex rounded-full bg-black px-8 py-4 text-sm text-white transition hover:bg-gray-800"
            >
              Contact Us →
            </a>

          </div>
        </div>
      </section>
    </main>
  );
}