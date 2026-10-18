import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import ServiceSection from "@/components/ServiceSection";
import ProjectSection from "@/components/ProjectSection";
import ContactSection from "@/components/ContactSection";
import { getPublishedProjects, getPublishedServices } from "@/lib/content";

export default async function Home() {
  const [services, projects] = await Promise.all([
    getPublishedServices(),
    getPublishedProjects(),
  ]);

  return (
    <main>
      <Hero />
      <AboutSection />
      <ServiceSection services={services} />
      <ProjectSection projects={projects} />
      <ContactSection />
    </main>
  );
}