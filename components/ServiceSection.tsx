import Reveal from "@/components/Reveal";

const services = [
  {
    number: "01",
    title: "Web Development",
    description:
      "We build modern, responsive, and functional websites designed to support your business goals.",
  },
  {
    number: "02",
    title: "UI/UX Design",
    description:
      "We create simple and intuitive digital experiences that are easy to understand and enjoyable to use.",
  },
  {
    number: "03",
    title: "Digital Solutions",
    description:
      "We develop digital solutions that help businesses improve their processes, efficiency, and customer experience.",
  },
  {
    number: "04",
    title: "Business Strategy",
    description:
      "We help transform ideas into clear digital strategies that align with business needs and objectives.",
  },
];

export default function ServicesSection() {
  return (
    <section className="bg-black px-8 py-24 text-white md:px-16 lg:px-24">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <Reveal>
          <div className="mb-20">
            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-gray-400">
              Our Services
            </p>

            <h2 className="max-w-4xl text-4xl font-medium leading-tight tracking-tight md:text-6xl">
              What we can do
              <br />
              for your business.
            </h2>
          </div>
        </Reveal>

        {/* Services */}
        <div className="border-t border-white/20">
          {services.map((service, index) => (
            <Reveal
              key={service.number}
              delay={index * 100}
            >
              <div className="group grid gap-6 border-b border-white/20 py-8 transition duration-300 md:grid-cols-[100px_1fr_1.5fr] md:items-start md:gap-10">

                {/* Number */}
                <span className="text-sm text-gray-500">
                  {service.number}
                </span>

                {/* Title */}
                <h3 className="text-2xl font-medium transition-transform duration-300 group-hover:translate-x-2 md:text-3xl">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="max-w-lg leading-relaxed text-gray-400">
                  {service.description}
                </p>

              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}