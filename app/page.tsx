import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import ServiceSection from "@/components/ServiceSection";
import ProjectSection from "@/components/ProjectSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <main>
      <Hero />
      <AboutSection />
      <ServiceSection />
      <ProjectSection />
      <ContactSection />
    </main>
  );
}