import Reveal from "@/components/Reveal";

type ServiceItem = {
  id: string;
  title: string;
  description: string;
  icon?: string | null;
  sortOrder: number;
};

export default function ServicesSection({ services }: { services: ServiceItem[] }) {
  return (
    <section className="bg-black px-8 py-24 text-white md:px-16 lg:px-24">
      <div className="mx-auto max-w-7xl">
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

        <div className="border-t border-white/20">
          {services.map((service, index) => (
            <Reveal key={service.id} delay={index * 100}>
              <div className="group grid gap-6 border-b border-white/20 py-8 transition duration-300 md:grid-cols-[100px_1fr_1.5fr] md:items-start md:gap-10">
                <span className="text-sm text-gray-500">
                  {String((service.sortOrder || index + 1)).padStart(2, "0")}
                </span>

                <div className="flex items-center gap-3">
                  {service.icon ? (
                    <span className="text-xl text-gray-300">{service.icon}</span>
                  ) : null}
                  <h3 className="text-2xl font-medium transition-transform duration-300 group-hover:translate-x-2 md:text-3xl">
                    {service.title}
                  </h3>
                </div>

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