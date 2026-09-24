import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";

const projects = [
  {
    title: "Digital Experience",
    category: "Web Development",
    image: "/images/about.png",
  },
  {
    title: "Brand Identity",
    category: "UI/UX Design",
    image: "/images/about.png",
  },
  {
    title: "Business Platform",
    category: "Digital Solution",
    image: "/images/about.png",
  },
  {
    title: "Creative Website",
    category: "Web Development",
    image: "/images/about.png",
  },
];

export default function ProjectSection() {
  return (
    <section className="px-8 py-24 md:px-16 lg:px-24">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
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

        {/* Projects */}
        <div className="grid gap-x-8 gap-y-16 md:grid-cols-2">
          {projects.map((project, index) => (
            <Reveal
              key={project.title}
              delay={index * 120}
            >
              <Link
                href="/projects"
                className={`group block ${
                  index % 2 === 1 ? "md:mt-24" : ""
                }`}
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>

                {/* Information */}
                <div className="mt-5 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-medium transition-transform duration-300 group-hover:translate-x-1">
                      {project.title}
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      {project.category}
                    </p>
                  </div>

                  <span className="text-xl transition-transform duration-300 group-hover:translate-x-2">
                    →
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}