import Image from "next/image";

const projects = [
  {
    title: "Digital Experience",
    category: "Web Development",
    year: "2026",
    image: "/images/about.png",
    description:
      "A modern digital platform designed to create a simple and engaging experience for users.",
  },
  {
    title: "Brand Identity",
    category: "UI/UX Design",
    year: "2026",
    image: "/images/about.png",
    description:
      "A visual identity and digital interface created to build a strong and consistent brand presence.",
  },
  {
    title: "Business Platform",
    category: "Digital Solution",
    year: "2025",
    image: "/images/about.png",
    description:
      "A business platform designed to simplify processes and improve operational efficiency.",
  },
  {
    title: "Creative Website",
    category: "Web Development",
    year: "2025",
    image: "/images/about.png",
    description:
      "A creative website focused on presenting products, services, and brand stories in an engaging way.",
  },
];

export default function ProjectsPage() {
  return (
    <main>
      {/* Hero */}
      <section className="px-8 py-24 md:px-16 md:py-32 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <p className="mb-6 text-sm uppercase tracking-[0.3em] text-gray-500">
            Our Projects
          </p>

          <h1 className="max-w-6xl text-5xl font-medium leading-[1] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
            Selected work that
            <br />
            makes an impact.
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-gray-600">
            Explore some of the projects we have created through
            collaboration, creativity, and technology.
          </p>
        </div>
      </section>

      {/* Projects */}
      <section className="px-8 pb-24 md:px-16 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-x-8 gap-y-16 md:grid-cols-2">
            {projects.map((project, index) => (
              <article
                key={project.title}
                className={`group ${
                  index % 2 === 1 ? "md:mt-24" : ""
                }`}
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>

                <div className="mt-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="mb-2 text-xs uppercase tracking-[0.2em] text-gray-500">
                        {project.category}
                      </p>

                      <h2 className="text-2xl font-medium tracking-tight md:text-3xl">
                        {project.title}
                      </h2>
                    </div>

                    <span className="text-sm text-gray-500">
                      {project.year}
                    </span>
                  </div>

                  <p className="mt-4 max-w-lg leading-relaxed text-gray-600">
                    {project.description}
                  </p>

                  <div className="mt-5 inline-flex items-center gap-2 text-sm font-medium">
                    View Project
                    <span className="transition-transform duration-300 group-hover:translate-x-2">
                      →
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-black px-8 py-24 text-white md:px-16 md:py-32 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-5xl">
            <p className="mb-6 text-sm uppercase tracking-[0.3em] text-gray-500">
              Start a Project
            </p>

            <h2 className="text-5xl font-medium leading-[1.05] tracking-tight md:text-7xl">
              Let's create something
              <br />
              meaningful together.
            </h2>

            <a
              href="/contact"
              className="mt-10 inline-flex rounded-full bg-white px-8 py-4 text-sm text-black transition duration-300 hover:bg-gray-200"
            >
              Contact Us →
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}