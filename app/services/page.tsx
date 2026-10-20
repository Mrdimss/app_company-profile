
import { getPublishedServices } from "@/lib/content";

export default async function ServicesPage() {
  const services = await getPublishedServices();

  return (
    <main className="min-h-screen overflow-hidden bg-white px-8 py-20 text-black md:px-16 md:py-28 lg:px-24">
      <style>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(35px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .services-fade-up {
          animation: fadeUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .services-fade-in {
          animation: fadeIn 1s ease both;
        }

        .service-card {
          transition:
            transform 0.35s ease,
            box-shadow 0.35s ease,
            border-color 0.35s ease;
        }

        .service-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 35px rgba(0, 0, 0, 0.07);
          border-color: #a3a3a3;
        }

        .service-icon {
          transition:
            transform 0.35s ease,
            background-color 0.35s ease;
        }

        .service-card:hover .service-icon {
          transform: scale(1.08) rotate(4deg);
          background-color: #e5e5e5;
        }

        .service-arrow {
          transition: transform 0.3s ease;
        }

        .service-card:hover .service-arrow {
          transform: translate(4px, -4px);
        }

        @media (prefers-reduced-motion: reduce) {
          .services-fade-up,
          .services-fade-in {
            animation: none;
          }

          .service-card,
          .service-icon,
          .service-arrow {
            transition: none;
          }
        }
      `}</style>

      <div className="mx-auto max-w-7xl">

        {/* HEADER */}

        <div className="services-fade-in">
          <p className="mb-6 text-sm uppercase tracking-[0.3em] text-gray-500">
            Our Services
          </p>
        </div>

        <div
          className="services-fade-up"
          style={{ animationDelay: "150ms" }}
        >
          <h1 className="max-w-6xl text-5xl font-medium leading-[1] tracking-tight sm:text-6xl md:text-7xl">
            Solutions for your growth.
          </h1>
        </div>

        <div
          className="services-fade-up"
          style={{ animationDelay: "300ms" }}
        >
          <p className="mt-7 max-w-2xl text-base leading-relaxed text-gray-500 md:text-lg">
            We provide reliable solutions for sports equipment,
            beauty products, distribution, and business growth.
            Discover the services we offer to support your needs.
          </p>
        </div>

        {/* SERVICE LIST */}

        {services.length === 0 ? (
          <div
            className="services-fade-up mt-14 rounded-2xl border border-dashed border-neutral-300 p-8 text-neutral-500"
            style={{ animationDelay: "450ms" }}
          >
            Belum ada layanan yang dipublikasikan.
          </div>
        ) : (
          <div className="mt-14 space-y-5">
            {services.map((service, index) => (
              <article
                key={service.id}
                className="service-card services-fade-up rounded-2xl border border-neutral-200 bg-white p-6 md:p-8"
                style={{
                  animationDelay: `${400 + index * 120}ms`,
                }}
              >
                <div className="flex items-start gap-4 md:gap-6">

                  {/* ICON */}

                  <div className="service-icon flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-xl md:h-14 md:w-14">
                    {service.icon || "•"}
                  </div>

                  {/* CONTENT */}

                  <div className="min-w-0 flex-1">
                    <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
                      {String(
                        service.sortOrder || index + 1
                      ).padStart(2, "0")}
                    </p>

                    <h2 className="mt-2 text-xl font-medium leading-snug text-neutral-950 md:text-2xl">
                      {service.title}
                    </h2>

                    <p className="mt-3 max-w-3xl text-sm leading-7 text-gray-600 md:text-base">
                      {service.description}
                    </p>
                  </div>

                  {/* ARROW */}

                  <div className="service-arrow hidden text-xl text-neutral-400 sm:block">
                    ↗
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* BOTTOM CTA */}

        <div
          className="services-fade-up mt-20 border-t border-neutral-200 pt-10 md:mt-28"
          style={{ animationDelay: "500ms" }}
        >
          <p className="text-xs uppercase tracking-[0.3em] text-gray-400">
            Let&apos;s Work Together
          </p>

          <h2 className="mt-4 max-w-3xl text-3xl font-medium leading-tight tracking-tight md:text-5xl">
            Ready to grow your business with us?
          </h2>

          <a
            href="/contact"
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-black px-7 py-4 text-sm text-white transition duration-300 hover:-translate-y-1 hover:bg-neutral-700"
          >
            Contact Us <span>→</span>
          </a>
        </div>

      </div>
    </main>
  );
}
