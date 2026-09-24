import Link from "next/link";
import Reveal from "@/components/Reveal";

export default function ContactSection() {
  return (
    <section className="bg-neutral-100 px-8 py-32 md:px-16 lg:px-24">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="max-w-5xl">
            <p className="mb-6 text-sm uppercase tracking-[0.3em] text-gray-500">
              Get In Touch
            </p>

            <h2 className="text-5xl font-medium leading-[1.05] tracking-tight md:text-7xl lg:text-8xl">
              Have an idea?
              <br />
              Let's make it happen.
            </h2>

            <p className="mt-8 max-w-xl text-lg leading-relaxed text-gray-600">
              Whether you have a project in mind or simply want to discuss
              an idea, we would love to hear from you.
            </p>

            <Link
              href="/contact"
              className="mt-10 inline-flex items-center rounded-full bg-black px-8 py-4 text-sm text-white transition duration-300 hover:bg-gray-800"
            >
              Start a Conversation
              <span className="ml-3 text-lg">→</span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}