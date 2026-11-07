
import Image from "next/image";
import Link from "next/link";
import { getPublishedProjects } from "@/lib/content";

export default async function ProjectsPage() {
  const projects: Awaited<
    ReturnType<typeof getPublishedProjects>
  > = await getPublishedProjects();

  // Mengambil gambar proyek pertama yang tersedia untuk hero
  const heroProject = projects.find((project) => project.image);

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#F8FBFF] via-[#EAF3FF] to-[#DCEBFF] text-[#0B1F3A]">
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

        @keyframes projectFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }

        .project-fade-up {
          animation: projectFadeUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .project-fade-in {
          animation: projectFadeIn 1s ease both;
        }

        .project-float {
          animation: projectFloat 5s ease-in-out infinite;
        }

        .project-card {
          transition: transform 0.4s ease, box-shadow 0.4s ease;
        }

        .project-card:hover {
          transform: translateY(-7px);
          box-shadow: 0 24px 55px rgba(11, 31, 58, 0.13);
        }

        .project-image {
          transition: transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .project-card:hover .project-image {
          transform: scale(1.06);
        }

        .project-number {
          transition: color 0.3s ease, transform 0.3s ease;
        }

        .project-card:hover .project-number {
          color: #075BEA;
          transform: translateX(4px);
        }

        .project-overlay {
          transition: opacity 0.4s ease;
        }

        .project-card:hover .project-overlay {
          opacity: 0.2;
        }

        @media (prefers-reduced-motion: reduce) {
          .project-fade-up,
          .project-fade-in,
          .project-float {
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
      <div className="pointer-events-none absolute -right-40 top-20 h-[500px] w-[500px] rounded-full bg-sky-300/25 blur-3xl" />
      <div className="pointer-events-none absolute -left-40 top-[35%] h-[450px] w-[450px] rounded-full bg-blue-300/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-[20%] right-[10%] h-72 w-72 rounded-full bg-white/40 blur-3xl" />

      {/* HERO SECTION */}
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-[#F8FBFF] via-[#E2F0FF] to-[#8CC8FA] px-6 pb-20 pt-16 md:px-16 md:pb-28 md:pt-20 lg:px-24">

        {/* HERO DECORATION */}
        <div className="pointer-events-none absolute -right-32 top-10 h-[500px] w-[500px] rounded-full bg-blue-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-white/60 blur-3xl" />

        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-8">

          {/* LEFT CONTENT */}
          <div className="relative z-20">

            <div className="project-fade-in inline-flex items-center gap-3 rounded-full border border-blue-200/80 bg-white/65 px-5 py-2.5 shadow-sm backdrop-blur-md">
              <span className="h-3 w-3 rounded-full bg-sky-500" />
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#075BEA]">
                Our Projects
              </p>
            </div>

            <h1
              className="project-fade-up mt-7 text-5xl font-extrabold leading-[1.05] tracking-tight text-[#0B1F3A] sm:text-6xl md:text-7xl lg:text-[70px] xl:text-[76px]"
              style={{ animationDelay: "150ms" }}
            >
              Selected Work
              <span className="block bg-gradient-to-r from-[#075BEA] via-[#168BFA] to-[#39A9F5] bg-clip-text text-transparent">
                That Makes
              </span>
              <span className="block text-[#0B1F3A]">
                An Impact.
              </span>
            </h1>

            <p
              className="project-fade-up mt-7 max-w-xl text-base font-medium leading-8 text-[#405E82] md:text-lg"
              style={{ animationDelay: "300ms" }}
            >
              Explore our projects, solutions, and work that demonstrate
              our commitment to quality, innovation, and business growth.
            </p>

            <div
              className="project-fade-up mt-8 flex items-center gap-5"
              style={{ animationDelay: "400ms" }}
            >
              <span className="h-[3px] w-16 rounded-full bg-[#075BEA]" />
              <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#1768AC]">
                Ideas Into Impact
              </span>
            </div>

            {/* HERO BUTTONS */}
            <div
              className="project-fade-up mt-10 flex flex-wrap gap-4"
              style={{ animationDelay: "500ms" }}
            >
              <Link
                href="#project-collection"
                className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#075BEA] to-[#168BFA] px-8 py-4 text-sm font-bold text-white shadow-xl shadow-blue-600/25 transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >
                View Our Projects
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>

              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-full border-2 border-[#1768AC] bg-white/60 px-8 py-4 text-sm font-bold text-[#0B1F3A] backdrop-blur-sm transition duration-300 hover:bg-white"
              >
                Learn More
              </Link>
            </div>

            {/* PROJECT STATISTIC */}
            <div
              className="project-fade-up mt-12 flex flex-wrap gap-8 border-t border-blue-200/80 pt-7"
              style={{ animationDelay: "600ms" }}
            >
              <div>
                <p className="text-2xl font-extrabold text-[#0B1F3A]">
                  {String(projects.length).padStart(2, "0")}+
                </p>
                <p className="mt-1 text-xs font-medium text-[#58799D]">
                  Published Projects
                </p>
              </div>

              <div className="h-12 w-px bg-blue-200" />

              <div>
                <p className="text-2xl font-extrabold text-[#0B1F3A]">
                  100%
                </p>
                <p className="mt-1 text-xs font-medium text-[#58799D]">
                  Quality Commitment
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT HERO VISUAL */}
          <div
            className="project-fade-up relative mx-auto w-full max-w-[650px]"
            style={{ animationDelay: "250ms" }}
          >
            <div className="relative flex min-h-[370px] items-center justify-center md:min-h-[520px]">

              {/* BLUE CIRCLE */}
              <div className="absolute right-3 top-1/2 h-[270px] w-[270px] -translate-y-1/2 rounded-full bg-gradient-to-br from-[#168BFA] to-[#075BEA] opacity-90 shadow-2xl shadow-blue-600/20 md:right-8 md:h-[420px] md:w-[420px]" />

              {/* BACKGROUND RING */}
              <div className="absolute right-0 top-4 h-[85%] w-[85%] rounded-[45%] border border-white/60 bg-white/10 backdrop-blur-[2px]" />

              {/* IMAGE */}
              {heroProject?.image ? (
                <div className="project-float relative z-10 h-[340px] w-full md:h-[490px]">
                  <Image
                    src="/images/girik-projects-building-visual.png"
                    alt={heroProject.title}
                    fill
                    priority
                    unoptimized
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="rounded-[28px] object-cover drop-shadow-[0_25px_30px_rgba(11,31,58,0.22)]"
                  />
                  <div className="pointer-events-none absolute inset-0 rounded-[28px] bg-gradient-to-t from-[#0B1F3A]/35 via-transparent to-transparent" />
                </div>
              ) : (
                <div className="project-float relative z-10 flex h-[340px] w-full items-center justify-center rounded-[28px] border border-white/50 bg-white/30 shadow-2xl backdrop-blur-md md:h-[490px]">
                  <div className="text-center">
                    <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-[#168BFA] to-[#075BEA] text-5xl text-white shadow-xl">
                      ◈
                    </div>
                    <p className="mt-6 text-xl font-extrabold text-[#0B1F3A]">
                      GIRIK Projects
                    </p>
                    <p className="mt-2 text-sm text-[#45658A]">
                      Creating Better Solutions
                    </p>
                  </div>
                </div>
              )}

              {/* FLOATING PROJECT LABEL */}
              {heroProject && (
                <div className="absolute bottom-5 left-0 z-20 max-w-[85%] rounded-2xl border border-white/70 bg-white/90 px-5 py-4 shadow-xl backdrop-blur-xl md:bottom-10 md:left-[-20px]">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#075BEA]">
                    Featured Project
                  </p>
                  <p className="mt-1 line-clamp-1 text-sm font-extrabold text-[#0B1F3A]">
                    {heroProject.title}
                  </p>
                  <p className="mt-1 text-xs text-[#58799D]">
                    GIRIK Selected Work
                  </p>
                </div>
              )}

              {/* TOP RIGHT BADGE */}
              <div className="absolute right-0 top-8 z-20 rounded-2xl border border-white/70 bg-white/85 px-4 py-3 shadow-lg backdrop-blur-xl md:right-[-5px]">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
                  <span className="text-xs font-bold text-[#0B1F3A]">
                    Quality First
                  </span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* COMPANY FEATURES */}
      <section className="relative z-20 -mt-5 px-6 pb-14 md:px-16 lg:px-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 rounded-[30px] border border-white/80 bg-white/85 p-6 shadow-[0_15px_50px_rgba(11,31,58,0.10)] backdrop-blur-xl sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:px-5 lg:py-7">

          <div className="flex items-center gap-4 border-slate-200 px-3 py-3 lg:border-r lg:px-5">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-3xl font-bold text-blue-600">
              ✓
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#0B1F3A] md:text-base">
                Quality Solutions
              </h3>
              <p className="mt-1 text-xs text-slate-500">
                Built to Last
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 border-slate-200 px-3 py-3 lg:border-r lg:px-5">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-3xl text-blue-600">
              ✦
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#0B1F3A] md:text-base">
                Innovative Approach
              </h3>
              <p className="mt-1 text-xs text-slate-500">
                For a Better Tomorrow
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 border-slate-200 px-3 py-3 lg:border-r lg:px-5">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-3xl">
              🤝
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#0B1F3A] md:text-base">
                Trusted Partnership
              </h3>
              <p className="mt-1 text-xs text-slate-500">
                Together We Grow
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 px-3 py-3 lg:px-5">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-3xl text-blue-600">
              ☎
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#0B1F3A] md:text-base">
                24/7 Support
              </h3>
              <p className="mt-1 text-xs text-slate-500">
                Always Here for You
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* PROJECT COLLECTION */}
      <section
        id="project-collection"
        className="relative px-6 py-16 md:px-16 md:py-24 lg:px-24"
      >
        <div className="mx-auto max-w-7xl">

          {/* SECTION HEADING */}
          <div className="project-fade-up mb-12 flex flex-wrap items-end justify-between gap-5">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/70 px-4 py-2">
                <span className="h-2 w-2 rounded-full bg-blue-600" />
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#075BEA]">
                  Our Portfolio
                </p>
              </div>

              <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-[#0B1F3A] md:text-5xl">
                Explore Our{" "}
                <span className="bg-gradient-to-r from-[#075BEA] to-[#39A9F5] bg-clip-text text-transparent">
                  Projects.
                </span>
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-7 text-[#58799D] md:text-base">
                Discover our selected projects and the solutions we create
                to deliver meaningful results.
              </p>
            </div>

            <div className="rounded-2xl border border-blue-100 bg-white/70 px-5 py-3 shadow-sm">
              <p className="text-xs text-[#58799D]">
                Total Published
              </p>
              <p className="mt-1 text-2xl font-extrabold text-[#075BEA]">
                {String(projects.length).padStart(2, "0")}
              </p>
            </div>
          </div>

          {/* PROJECT LIST */}
          {projects.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-blue-300 bg-white/70 px-6 py-20 text-center backdrop-blur-sm">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-3xl text-blue-600">
                ◇
              </div>
              <h3 className="mt-5 text-xl font-bold text-[#0B1F3A]">
                No Projects Yet
              </h3>
              <p className="mt-2 text-sm text-[#58799D]">
                Belum ada project yang dipublikasikan.
              </p>
            </div>
          ) : (
            <div className="grid gap-x-8 gap-y-14 md:grid-cols-2 md:gap-y-16">
              {projects.map((project, index) => (
                <article
                  key={project.id}
                  className={`project-card project-fade-up group ${
                    index % 2 === 1 ? "md:mt-16" : ""
                  }`}
                  style={{
                    animationDelay: `${150 + index * 120}ms`,
                  }}
                >
                  {/* PROJECT IMAGE */}
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] border border-white/80 bg-white/70 shadow-[0_10px_35px_rgba(11,31,58,0.08)]">
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        unoptimized
                        className="project-image object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-gradient-to-br from-blue-100 to-sky-200 text-sm text-[#45658a]">
                        No image available
                      </div>
                    )}

                    <div className="project-overlay pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/30 via-transparent to-transparent opacity-60" />

                    {/* CATEGORY */}
                    <div className="absolute left-4 top-4 rounded-full border border-white/70 bg-white/90 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#075BEA] shadow-sm backdrop-blur-sm">
                      {project.category || "General"}
                    </div>

                    {/* NUMBER */}
                    <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/70 bg-white/90 text-xs font-extrabold text-[#0B1F3A] shadow-sm backdrop-blur-sm">
                      {String(project.sortOrder || index + 1).padStart(2, "0")}
                    </div>

                    {/* ARROW */}
                    <div className="absolute bottom-4 right-4 flex h-12 w-12 items-center justify-center rounded-full border border-white/70 bg-white/90 text-lg text-[#075BEA] shadow-lg backdrop-blur-sm transition duration-300 group-hover:scale-110 group-hover:bg-[#0B1F3A] group-hover:text-white">
                      ↗
                    </div>
                  </div>

                  {/* PROJECT INFORMATION */}
                  <div className="mt-6 px-1">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-2xl font-extrabold leading-snug tracking-tight text-[#0B1F3A] md:text-3xl">
                        {project.title}
                      </h3>
                    </div>

                    <p className="mt-4 max-w-lg text-sm leading-7 text-[#58799D] md:text-base">
                      {project.description}
                    </p>

                    <div className="mt-6 h-[2px] w-full bg-blue-100 transition-colors duration-300 group-hover:bg-[#168BFA]" />
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-[#08172F] via-[#0B1F3A] to-[#0753A6] px-6 py-20 text-white md:px-16 md:py-28 lg:px-24">

        {/* CTA DECORATION */}
        <div className="pointer-events-none absolute -right-20 -top-32 h-96 w-96 rounded-full border border-sky-300/10" />
        <div className="pointer-events-none absolute -right-8 -top-20 h-72 w-72 rounded-full border border-sky-300/10" />
        <div className="pointer-events-none absolute bottom-[-150px] left-[15%] h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl">

          <div className="project-fade-in inline-flex items-center gap-3 rounded-full border border-sky-300/20 bg-white/5 px-4 py-2">
            <span className="h-2 w-2 rounded-full bg-sky-400" />
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-sky-300">
              Have a Project in Mind?
            </p>
          </div>

          <h2
            className="project-fade-up mt-6 max-w-4xl text-3xl font-extrabold leading-tight tracking-tight md:text-5xl lg:text-6xl"
            style={{ animationDelay: "150ms" }}
          >
            Let&apos;s Create Something{" "}
            <span className="bg-gradient-to-r from-sky-300 to-blue-200 bg-clip-text text-transparent">
              Meaningful Together.
            </span>
          </h2>

          <p
            className="project-fade-up mt-6 max-w-xl text-sm leading-8 text-blue-100/70 md:text-base"
            style={{ animationDelay: "300ms" }}
          >
            Contact our team to discuss your business needs and explore
            opportunities to work together.
          </p>

          <Link
            href="/contact"
            className="group mt-9 inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-sky-400 to-blue-500 px-8 py-4 text-sm font-bold text-[#08172F] shadow-lg shadow-blue-950/20 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-950/30"
          >
            Contact Us
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </section>
    </main>
  );
}
