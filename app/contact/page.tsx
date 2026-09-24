export default function ContactPage() {
  return (
    <main>
      {/* Hero */}
      <section className="px-8 py-24 md:px-16 md:py-32 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <p className="mb-6 text-sm uppercase tracking-[0.3em] text-gray-500">
            Contact Us
          </p>

          <h1 className="max-w-6xl text-5xl font-medium leading-[1] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
            Let's create
            <br />
            something meaningful.
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-gray-600">
            Have a project, idea, or collaboration in mind?
            Tell us about it and let's start a conversation.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="bg-black px-8 py-24 text-white md:px-16 md:py-32 lg:px-24">
        <div className="mx-auto grid max-w-7xl gap-16 md:grid-cols-2">
          {/* Contact Information */}
          <div>
            <p className="mb-5 text-sm uppercase tracking-[0.3em] text-gray-500">
              Get In Touch
            </p>

            <h2 className="max-w-xl text-4xl font-medium leading-tight tracking-tight md:text-5xl">
              We'd love to hear from you.
            </h2>

            <div className="mt-12 space-y-8">
              <div>
                <p className="mb-2 text-sm text-gray-500">
                  Email
                </p>
                <a
                  href="mailto:hello@company.com"
                  className="text-lg transition hover:text-gray-400"
                >
                  hello@company.com
                </a>
              </div>

              <div>
                <p className="mb-2 text-sm text-gray-500">
                  Phone
                </p>
                <a
                  href="tel:+6281234567890"
                  className="text-lg transition hover:text-gray-400"
                >
                  +62 812 3456 7890
                </a>
              </div>

              <div>
                <p className="mb-2 text-sm text-gray-500">
                  Location
                </p>
                <p className="text-lg">
                  Jakarta, Indonesia
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <form className="space-y-8">
              <div>
                <label
                  htmlFor="name"
                  className="mb-3 block text-sm text-gray-400"
                >
                  Your Name
                </label>

                <input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  className="w-full border-b border-white/20 bg-transparent px-0 py-4 text-white outline-none transition placeholder:text-gray-600 focus:border-white"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-3 block text-sm text-gray-400"
                >
                  Email Address
                </label>

                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="w-full border-b border-white/20 bg-transparent px-0 py-4 text-white outline-none transition placeholder:text-gray-600 focus:border-white"
                />
              </div>

              <div>
                <label
                  htmlFor="company"
                  className="mb-3 block text-sm text-gray-400"
                >
                  Company
                </label>

                <input
                  id="company"
                  type="text"
                  placeholder="Your company name"
                  className="w-full border-b border-white/20 bg-transparent px-0 py-4 text-white outline-none transition placeholder:text-gray-600 focus:border-white"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-3 block text-sm text-gray-400"
                >
                  Message
                </label>

                <textarea
                  id="message"
                  rows={5}
                  placeholder="Tell us about your project..."
                  className="w-full resize-none border-b border-white/20 bg-transparent px-0 py-4 text-white outline-none transition placeholder:text-gray-600 focus:border-white"
                />
              </div>

              <button
                type="submit"
                className="rounded-full bg-white px-8 py-4 text-sm font-medium text-black transition duration-300 hover:-translate-y-1 bg-gray-200"
              >
                Send Message →
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Social */}
      <section className="px-8 py-24 md:px-16 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <div className="border-t border-black/10 pt-8">
            <p className="mb-6 text-sm uppercase tracking-[0.3em] text-gray-500">
              Follow Us
            </p>

            <div className="flex flex-wrap gap-8 text-lg">
              <a
                href="#"
                className="transition hover:opacity-50"
              >
                Instagram
              </a>

              <a
                href="#"
                className="transition hover:opacity-50"
              >
                LinkedIn
              </a>

              <a
                href="#"
                className="transition hover:opacity-50"
              >
                Facebook
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}