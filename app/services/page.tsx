
import { getPublishedServices } from "@/lib/content";

export default async function ServicesPage() {
  const services = await getPublishedServices();

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#eaf3ff] via-[#d8eaff] to-[#b8e3ff] px-6 py-20 text-[#102b59] md:px-16 md:py-28 lg:px-24">
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
            border-color 0.35s ease,
            background-color 0.35s ease;
        }

        .service-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 45px rgba(16, 43, 89, 0.12);
          border-color: #7db8f4;
          background-color: rgba(255, 255, 255, 0.95);
        }

        .service-icon {
          transition:
            transform 0.35s ease,
            background-color 0.35s ease,
            color 0.35s ease;
        }

        .service-card:hover .service-icon {
          transform: scale(1.08) rotate(4deg);
          background-color: #dbeafe;
          color: #1768ac;
        }

        .service-arrow {
          transition:
            transform 0.3s ease,
            color 0.3s ease;
        }

        .service-card:hover .service-arrow {
          transform: translate(4px, -4px);
          color: #1768ac;
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

      {/* BACKGROUND DECORATION */}
      <div className="pointer-events-none absolute -right-32 top-20 h-80 w-80 rounded-full bg-sky-300/25 blur-3xl" />
      <div className="pointer-events-none absolute -left-32 top-[45%] h-72 w-72 rounded-full bg-blue-300/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-20 right-[15%] h-48 w-48 rounded-full bg-white/30 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* HEADER */}
        <div className="services-fade-in">
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-blue-200/80 bg-white/60 px-4 py-2 backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-sky-500" />
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#1768ac]">
              Our Services
            </p>
          </div>

          <h1 className="max-w-5xl text-4xl font-semibold leading-[1.08] tracking-tight text-[#102b59] sm:text-5xl md:text-7xl">
            Solutions for{" "}
            <span className="bg-gradient-to-r from-[#1768ac] via-[#2589d8] to-[#54b9ed] bg-clip-text text-transparent">
              your growth.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-[#45658a] md:text-lg">
            Discover the services we provide to support your goals,
            strengthen your business, and create opportunities for growth.
          </p>
        </div>

        {/* SERVICES LIST */}
        {services.length === 0 ? (
          <div
            className="services-fade-up mt-14 rounded-3xl border border-dashed border-blue-300 bg-white/50 p-8 text-[#45658a] backdrop-blur-sm"
            style={{ animationDelay: "450ms" }}
          >
            Belum ada layanan yang dipublikasikan.
          </div>
        ) : (
          <div className="mt-14 space-y-5">
            {services.map((service, index) => (
              <article
                key={service.id}
                className="service-card services-fade-up rounded-3xl border border-white/80 bg-white/70 p-6 shadow-[0_8px_30px_rgba(16,43,89,0.04)] backdrop-blur-md md:p-8"
                style={{
                  animationDelay: `${400 + index * 120}ms`,
                }}
              >
                <div className="flex items-start gap-4 md:gap-6">
                  {/* ICON */}
                  <div className="service-icon flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-100/80 text-xl text-[#1768ac] md:h-14 md:w-14">
                    {service.icon || "•"}
                  </div>

                  {/* CONTENT */}
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#5893c5]">
                      {String(
                        service.sortOrder || index + 1
                      ).padStart(2, "0")}
                    </p>

                    <h2 className="mt-2 text-xl font-semibold leading-snug text-[#102b59] md:text-2xl">
                      {service.title}
                    </h2>

                    <p className="mt-3 max-w-3xl text-sm leading-7 text-[#45658a] md:text-base">
                      {service.description}
                    </p>
                  </div>

                  {/* ARROW */}
                  <div className="service-arrow hidden text-xl text-[#80a6cb] sm:block">
                    ↗
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* BOTTOM CTA */}
        <div
          className="services-fade-up mt-20 border-t border-blue-300/60 pt-10 md:mt-28 md:pt-12"
          style={{ animationDelay: "500ms" }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#4b85b8]">
            Let&apos;s Work Together
          </p>

          <h2 className="mt-4 max-w-3xl text-3xl font-semibold leading-tight tracking-tight text-[#102b59] md:text-5xl">
            Ready to grow your business with us?
          </h2>

          <p className="mt-5 max-w-xl text-base leading-8 text-[#45658a]">
            Let&apos;s discuss your needs and find the right solutions
            to help you move forward.
          </p>

          <a
            href="/contact"
            className="group mt-8 inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#102b59] to-[#1768ac] px-7 py-4 text-sm font-semibold text-white shadow-lg shadow-blue-900/15 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/25"
          >
            Contact Us
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>
      </div>
    </main>
  );
}
