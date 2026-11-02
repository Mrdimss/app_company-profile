import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";

type ProjectItem = {
  id: string;
  title: string;
  category?: string | null;
  image?: string | null;
};

export default function ProjectSection({
  projects,
}: {
  projects: ProjectItem[];
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#eaf3ff] via-[#dcecff] to-[#c5e5ff] px-6 py-24 md:px-16 md:py-28 lg:px-24">

      {/* Background Decoration */}
      <div className="pointer-events-none absolute -right-32 top-20 h-96 w-96 rounded-full border border-blue-300/40" />
      <div className="pointer-events-none absolute -right-20 top-32 h-72 w-72 rounded-full border border-blue-400/30" />
      <div className="pointer-events-none absolute -left-40 bottom-0 h-80 w-80 rounded-full bg-blue-400/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* Section Heading */}
        <Reveal>
          <div className="mb-16 flex flex-col justify-between gap-8 md:mb-20 md:flex-row md:items-end">
            <div>
              <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-blue-200 bg-white/70 px-4 py-2 shadow-sm backdrop-blur-sm">
                <span className="h-2 w-2 rounded-full bg-blue-600" />
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-800">
                  Our Portfolio
                </p>
              </div>

              <h2 className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-[#101a30] md:text-6xl">
                Work we are
                <br />
                <span className="bg-gradient-to-r from-blue-700 to-sky-500 bg-clip-text text-transparent">
                  proud of.
                </span>
              </h2>

              <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-600 md:text-lg">
                Discover our projects, partnerships, and work that reflect
                our commitment to quality and excellence.
              </p>
            </div>

            <Link
              href="/projects"
              className="group inline-flex w-fit items-center gap-4 rounded-full border border-blue-200 bg-white/80 px-6 py-3.5 text-sm font-semibold text-blue-800 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-600 hover:bg-blue-600 hover:text-white hover:shadow-lg hover:shadow-blue-600/20"
            >
              View All Projects
              <span className="transition-transform duration-300 group-hover:translate-x-1.5">
                →
              </span>
            </Link>
          </div>
        </Reveal>

        {/* Projects Grid */}
        <div className="grid gap-x-8 gap-y-12 md:grid-cols-2 md:gap-y-16">
          {projects.map((project, index) => (
            <Reveal key={project.id} delay={index * 120}>
              <Link
                href="/projects"
                className={`group block ${
                  index % 2 === 1 ? "md:mt-20" : ""
                }`}
              >
                {/* Project Image */}
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/80 bg-white/60 shadow-[0_10px_40px_rgba(30,64,175,0.08)] transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_24px_60px_rgba(30,64,175,0.18)]">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-gradient-to-br from-blue-100 to-sky-200">
                      <div className="text-center">
                        <span className="text-4xl text-blue-400">✦</span>
                        <p className="mt-3 text-sm font-medium text-blue-700">
                          Project Preview
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Image Overlay */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-blue-950/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  {/* Project Number */}
                  <div className="absolute left-5 top-5 rounded-full border border-white/50 bg-white/85 px-3.5 py-1.5 text-xs font-semibold tracking-wider text-blue-800 shadow-sm backdrop-blur-md">
                    PROJECT {String(index + 1).padStart(2, "0")}
                  </div>

                  {/* Arrow Button */}
                  <div className="absolute bottom-5 right-5 flex h-12 w-12 translate-y-3 items-center justify-center rounded-full bg-white text-xl text-blue-700 opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    ↗
                  </div>
                </div>

                {/* Project Information */}
                <div className="mt-6 flex items-start justify-between gap-4 px-1">
                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
                      {project.category || "General"}
                    </p>

                    <h3 className="text-xl font-semibold tracking-tight text-[#101a30] transition-colors duration-300 group-hover:text-blue-700 md:text-2xl">
                      {project.title}
                    </h3>

                    <div className="mt-3 h-0.5 w-10 rounded-full bg-blue-500 transition-all duration-300 group-hover:w-20" />
                  </div>

                  <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-blue-200 bg-white/70 text-lg text-blue-700 transition-all duration-300 group-hover:border-blue-600 group-hover:bg-blue-600 group-hover:text-white">
                    ↗
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        {/* Empty State */}
        {projects.length === 0 && (
          <Reveal>
            <div className="rounded-3xl border border-blue-200/70 bg-white/60 px-6 py-20 text-center shadow-sm backdrop-blur-sm">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-3xl text-blue-700">
                ✦
              </div>
              <h3 className="mt-6 text-xl font-semibold text-[#101a30]">
                Projects Coming Soon
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                We are preparing our portfolio. Check back soon for updates.
              </p>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}