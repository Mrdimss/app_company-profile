import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";

type ProjectItem = {
  id: string;
  title: string;
  category?: string | null;
  image?: string | null;
};

export default function ProjectSection({ projects }: { projects: ProjectItem[] }) {
  return (
    <section className="px-8 py-24 md:px-16 lg:px-24">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="mb-4 text-sm uppercase tracking-[0.3em] text-gray-500">
                Selected Projects
              </p>

              <h2 className="max-w-3xl text-4xl font-medium leading-tight tracking-tight md:text-6xl">
                Work we are
                <br />
                proud of.
              </h2>
            </div>

            <Link
              href="/projects"
              className="w-fit border-b border-black pb-1 text-sm font-medium transition-opacity hover:opacity-50"
            >
              View All Projects →
            </Link>
          </div>
        </Reveal>

        <div className="grid gap-x-8 gap-y-16 md:grid-cols-2">
          {projects.map((project, index) => (
            <Reveal key={project.id} delay={index * 120}>
              <Link href="/projects" className={`group block ${index % 2 === 1 ? "md:mt-24" : ""}`}>
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

                <div className="mt-5 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-medium transition-transform duration-300 group-hover:translate-x-1">
                      {project.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{project.category || "General"}</p>
                  </div>
                  <span className="text-xl transition-transform duration-300 group-hover:translate-x-2">→</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}