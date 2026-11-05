
import Image from "next/image";
import { getPublishedProjects } from "@/lib/content";

export default async function ProjectsPage() {
  const projects: Awaited<
    ReturnType<typeof getPublishedProjects>
  > = await getPublishedProjects();

  return (
    <main className="min-h-screen overflow-hidden bg-gradient-to-b from-[#eaf3ff] via-[#d8eaff] to-[#b8e3ff] text-[#102b59]">
      <style>{`
        @keyframes projectFadeUp {
          from {
            opacity: 0;
            transform: translateY(35px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes projectFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .project-fade-up {
          animation: projectFadeUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .project-fade-in {
          animation: projectFadeIn 1s ease both;
        }

        .project-card {
          transition:
            transform 0.4s ease,
            box-shadow 0.4s ease;
        }

        .project-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 45px rgba(16, 43, 89, 0.12);
        }

        .project-image {
          transition: transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .project-card:hover .project-image {
          transform: scale(1.06);
        }

        .project-number {
          transition:
            color 0.3s ease,
            transform 0.3s ease;
        }

        .project-card:hover .project-number {
          color: #1768ac;
          transform: translateX(4px);
        }

        .project-overlay {
          transition: background-color 0.5s ease;
        }

        .project-card:hover .project-overlay {
          background-color: rgba(23, 104, 172, 0.08);
        }

        @media (prefers-reduced-motion: reduce) {
          .project-fade-up,
          .project-fade-in {
            animation: none;
          }

          .project-card,
          .project-image,
          .project-number,
          .project-overlay {
            transition: none;
          }
        }
      `}</style>

      {/* BACKGROUND DECORATION */}
      <div className="pointer-events-none absolute right-[-100px] top-32 h-80 w-80 rounded-full bg-sky-300/25 blur-3xl" />
      <div className="pointer-events-none absolute left-[-120px] top-[45%] h-80 w-80 rounded-full bg-blue-300/20 blur-3xl" />

      {/* HERO */}
      <section className="relative px-6 py-20 md:px-16 md:py-32 lg:px-24">
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="project-fade-in mb-6 inline-flex items-center gap-3 rounded-full border border-blue-200/80 bg-white/60 px-4 py-2 backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-sky-500" />
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#1768ac]">
              Our Projects
            </p>
          </div>

          <h1
            className="project-fade-up max-w-6xl text-4xl font-semibold leading-[1.05] tracking-tight text-[#102b59] sm:text-5xl md:text-7xl lg:text-8xl"
            style={{ animationDelay: "150ms" }}
          >
            Selected work that{" "}
            <span className="bg-gradient-to-r from-[#1768ac] via-[#2589d8] to-[#54b9ed] bg-clip-text text-transparent">
              makes an impact
            </span>
          </h1>

          <p
            className="project-fade-up mt-8 max-w-2xl text-base leading-8 text-[#45658a] md:text-lg"
            style={{ animationDelay: "300ms" }}
          >
            Explore our projects, solutions, and work that demonstrate
            our commitment to quality, innovation, and business growth.
          </p>

          <div
            className="project-fade-up mt-10 flex items-center gap-4"
            style={{ animationDelay: "450ms" }}
          >
            <span className="h-px w-12 bg-[#2589d8]" />
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-[#4b85b8]">
              Ideas into impact
            </span>
          </div>
        </div>
      </section>

      {/* PROJECT GRID */}
      <section className="relative px-6 pb-24 md:px-16 lg:px-24">
        <div className="mx-auto max-w-7xl">
          {projects.length === 0 ? (
            <div className="project-fade-up rounded-3xl border border-dashed border-blue-300 bg-white/50 p-8 text-[#45658a] backdrop-blur-sm">
              Belum ada project yang dipublikasikan.
            </div>
          ) : (
            <div className="grid gap-x-8 gap-y-14 md:grid-cols-2 md:gap-y-20">
              {projects.map((project, index) => (
                <article
                  key={project.id}
                  className={`project-card project-fade-up group ${
                    index % 2 === 1 ? "md:mt-24" : ""
                  }`}
                  style={{
                    animationDelay: `${200 + index * 150}ms`,
                  }}
                >
                  {/* PROJECT IMAGE */}
                  <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/70 bg-white/50 shadow-[0_10px_35px_rgba(16,43,89,0.08)]">
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="project-image object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-gradient-to-br from-blue-100 to-sky-200 text-sm text-[#45658a]">
                        No image available
                      </div>
                    )}

                    {/* IMAGE OVERLAY */}
                    <div className="project-overlay pointer-events-none absolute inset-0 bg-transparent" />

                    {/* PROJECT ARROW */}
                    <div className="absolute bottom-4 right-4 flex h-12 w-12 items-center justify-center rounded-full border border-white/70 bg-white/90 text-lg text-[#1768ac] shadow-lg backdrop-blur-sm transition duration-300 group-hover:scale-110 group-hover:bg-[#102b59] group-hover:text-white">
                      ↗
                    </div>

                    {/* PROJECT CATEGORY */}
                    <div className="absolute left-4 top-4 rounded-full border border-white/70 bg-white/85 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#1768ac] shadow-sm backdrop-blur-sm">
                      {project.category || "General"}
                    </div>
                  </div>

                  {/* PROJECT INFORMATION */}
                  <div className="mt-6 px-1">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <h2 className="text-2xl font-semibold leading-snug tracking-tight text-[#102b59] md:text-3xl">
                          {project.title}
                        </h2>
                      </div>

                      <span className="project-number shrink-0 pt-1 text-sm font-semibold tracking-widest text-[#80a6cb]">
                        {String(
                          project.sortOrder || index + 1
                        ).padStart(2, "0")}
                      </span>
                    </div>

                    <p className="mt-4 max-w-lg text-sm leading-7 text-[#45658a] md:text-base">
                      {project.description}
                    </p>

                    <div className="mt-6 h-px w-full bg-blue-300/50 transition-colors duration-300 group-hover:bg-[#2589d8]" />
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0b1730] via-[#102b59] to-[#123f7a] px-6 py-20 text-white md:px-16 md:py-28 lg:px-24">
        {/* CTA DECORATION */}
        <div className="pointer-events-none absolute -right-20 -top-32 h-96 w-96 rounded-full border border-sky-300/10" />
        <div className="pointer-events-none absolute -right-8 -top-20 h-72 w-72 rounded-full border border-sky-300/10" />
        <div className="pointer-events-none absolute bottom-[-150px] left-[15%] h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="project-fade-in inline-flex items-center gap-3 rounded-full border border-sky-300/20 bg-white/5 px-4 py-2">
            <span className="h-2 w-2 rounded-full bg-sky-400" />
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-300">
              Have a Project in Mind?
            </p>
          </div>

          <h2
            className="project-fade-up mt-6 max-w-4xl text-3xl font-semibold leading-tight tracking-tight md:text-5xl lg:text-6xl"
            style={{ animationDelay: "150ms" }}
          >
            Let&apos;s create something{" "}
            <span className="bg-gradient-to-r from-sky-300 to-blue-200 bg-clip-text text-transparent">
              meaningful together.
            </span>
          </h2>

          <p
            className="project-fade-up mt-6 max-w-xl text-sm leading-8 text-blue-100/70 md:text-base"
            style={{ animationDelay: "300ms" }}
          >
            Contact our team to discuss your business needs and explore
            opportunities to work together.
          </p>

          <a
            href="/contact"
            className="group mt-9 inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-sky-400 to-blue-500 px-8 py-4 text-sm font-semibold text-[#0b1730] shadow-lg shadow-blue-950/20 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-950/30"
          >
            Contact Us
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>
      </section>
    </main>
  );
}
