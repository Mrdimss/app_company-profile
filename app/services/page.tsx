import { getPublishedServices } from "@/lib/content";

export default async function ServicesPage() {
  const services: Awaited<ReturnType<typeof getPublishedServices>> = await getPublishedServices();

  return (
    <main className="px-8 py-20 md:px-16 md:py-28 lg:px-24">
      <div className="mx-auto max-w-7xl">
        <p className="mb-6 text-sm uppercase tracking-[0.3em] text-gray-500">Our Services</p>
        <h1 className="max-w-6xl text-5xl font-medium leading-[1] tracking-tight sm:text-6xl md:text-7xl">
          Solutions for your growth.
        </h1>

        {services.length === 0 ? (
          <div className="mt-12 rounded-2xl border border-dashed border-neutral-300 p-8 text-neutral-500">
            Belum ada layanan yang dipublikasikan.
          </div>
        ) : (
          <div className="mt-12 space-y-6">
            {services.map((service, index) => (
              <article key={service.id} className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100 text-xl">
                    {service.icon || "•"}
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
                      {String((service.sortOrder || index + 1)).padStart(2, "0")}
                    </p>
                    <h2 className="mt-2 text-2xl font-medium text-neutral-950">{service.title}</h2>
                    <p className="mt-3 max-w-3xl text-base leading-relaxed text-gray-600">
                      {service.description}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}