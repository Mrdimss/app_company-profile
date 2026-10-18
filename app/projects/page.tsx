import Image from "next/image";
import { getPublishedProjects } from "@/lib/content";

export default async function ProjectsPage() {
  const projects: Awaited<ReturnType<typeof getPublishedProjects>> = await getPublishedProjects();

  return (
    <main>
      <section className="px-8 py-24 md:px-16 md:py-32 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <p className="mb-6 text-sm uppercase tracking-[0.3em] text-gray-500">Our Projects</p>
          <h1 className="max-w-6xl text-5xl font-medium leading-[1] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
            Selected work that makes an impact.
          </h1>
        </div>
      </section>

      <section className="px-8 pb-24 md:px-16 lg:px-24">
        <div className="mx-auto max-w-7xl">
          {projects.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-neutral-300 p-8 text-neutral-500">
              Belum ada project yang dipublikasikan.
            </div>
          ) : (
            <div className="grid gap-x-8 gap-y-16 md:grid-cols-2">
              {projects.map((project, index) => (
                <article key={project.id} className={`group ${index % 2 === 1 ? "md:mt-24" : ""}`}>
                  <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover transition duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-neutral-200 text-sm text-neutral-500">
                        No image
                      </div>
                    )}
                  </div>

                  <div className="mt-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="mb-2 text-xs uppercase tracking-[0.2em] text-gray-500">
                          {project.category || "General"}
                        </p>
                        <h2 className="text-2xl font-medium tracking-tight md:text-3xl">{project.title}</h2>
                      </div>
                      <span className="text-sm text-gray-500">{String(project.sortOrder || index + 1).padStart(2, "0")}</span>
                    </div>

                    <p className="mt-4 max-w-lg leading-relaxed text-gray-600">{project.description}</p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}