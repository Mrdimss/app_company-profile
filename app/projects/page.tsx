
import Image from "next/image";
import { getPublishedProjects } from "@/lib/content";

export default async function ProjectsPage() {
  const projects: Awaited<
    ReturnType<typeof getPublishedProjects>
  > = await getPublishedProjects();

  return (
    <main className="min-h-screen overflow-hidden bg-white text-black">

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
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
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
          color: #111827;
          transform: translateX(4px);
        }

        @media (prefers-reduced-motion: reduce) {
          .project-fade-up,
          .project-fade-in {
            animation: none;
          }

          .project-card,
          .project-image,
          .project-number {
            transition: none;
          }
        }
      `}</style>

      {/* HERO */}

      <section className="px-8 py-24 md:px-16 md:py-32 lg:px-24">
        <div className="mx-auto max-w-7xl">

          <p
            className="project-fade-in mb-6 text-sm uppercase tracking-[0.3em] text-gray-500"
          >
            Our Projects
          </p>

          <h1
            className="project-fade-up max-w-6xl text-5xl font-medium leading-[1] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
            style={{ animationDelay: "150ms" }}
          >
            Selected work that makes an impact.
          </h1>

          <p
            className="project-fade-up mt-8 max-w-2xl text-base leading-relaxed text-gray-500 md:text-lg"
            style={{ animationDelay: "300ms" }}
          >
            Explore our projects, solutions, and work that
            demonstrate our commitment to quality, innovation,
            and business growth.
          </p>

        </div>
      </section>

      {/* PROJECT GRID */}

      <section className="px-8 pb-24 md:px-16 lg:px-24">
        <div className="mx-auto max-w-7xl">

          {projects.length === 0 ? (
            <div
              className="project-fade-up rounded-2xl border border-dashed border-neutral-300 p-8 text-neutral-500"
            >
              Belum ada project yang dipublikasikan.
            </div>
          ) : (
            <div className="grid gap-x-8 gap-y-16 md:grid-cols-2">

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

                  <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">

                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="project-image object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-neutral-200 text-sm text-neutral-500">
                        No image available
                      </div>
                    )}

                    {/* IMAGE OVERLAY */}

                    <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/5" />

                    {/* PROJECT NUMBER */}

                    <div className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-white text-sm text-black shadow-sm transition-transform duration-300 group-hover:scale-110">
                      ↗
                    </div>

                  </div>

                  {/* PROJECT INFORMATION */}

                  <div className="mt-6">

                    <div className="flex items-start justify-between gap-4">

                      <div className="min-w-0">

                        <p className="mb-2 text-xs uppercase tracking-[0.2em] text-gray-500">
                          {project.category || "General"}
                        </p>

                        <h2 className="text-2xl font-medium tracking-tight md:text-3xl">
                          {project.title}
                        </h2>

                      </div>

                      <span className="project-number shrink-0 text-sm text-gray-400">
                        {String(
                          project.sortOrder || index + 1
                        ).padStart(2, "0")}
                      </span>

                    </div>

                    <p className="mt-4 max-w-lg leading-relaxed text-gray-600">
                      {project.description}
                    </p>

                  </div>

                </article>
              ))}

            </div>
          )}

        </div>
      </section>

      {/* BOTTOM CTA */}

      <section className="bg-black px-8 py-20 text-white md:px-16 md:py-28 lg:px-24">
        <div className="mx-auto max-w-7xl">

          <p
            className="project-fade-in text-xs uppercase tracking-[0.3em] text-gray-400"
          >
            Have a Project in Mind?
          </p>

          <h2
            className="project-fade-up mt-6 max-w-4xl text-4xl font-medium leading-tight tracking-tight md:text-6xl"
            style={{ animationDelay: "150ms" }}
          >
            Let&apos;s create something meaningful together.
          </h2>

          <p
            className="project-fade-up mt-6 max-w-xl text-base leading-relaxed text-gray-400"
            style={{ animationDelay: "300ms" }}
          >
            Contact our team to discuss your business needs
            and explore opportunities to work together.
          </p>

          <a
            href="/contact"
            className="mt-9 inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-sm text-black transition duration-300 hover:-translate-y-1 hover:bg-gray-200"
          >
            Contact Us <span>→</span>
          </a>

        </div>
      </section>

    </main>
  );
}
