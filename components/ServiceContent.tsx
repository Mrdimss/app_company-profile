
"use client";

import { motion } from "framer-motion";

type Service = {
  id: string | number;
  icon?: string | null;
  sortOrder?: number | null;
  title: string;
  description: string;
};

type ServicesContentProps = {
  services: Service[];
};

export default function ServicesContent({
  services,
}: ServicesContentProps) {
  return (
    <main className="px-8 py-20 md:px-16 md:py-28 lg:px-24">
      <div className="mx-auto max-w-7xl">

        {/* HEADER ANIMATION */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-6 text-sm uppercase tracking-[0.3em] text-gray-500"
        >
          Our Services
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="max-w-6xl text-5xl font-medium leading-[1] tracking-tight sm:text-6xl md:text-7xl"
        >
          Solutions for your growth.
        </motion.h1>

        {/* SERVICE LIST */}
        {services.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 rounded-2xl border border-dashed border-neutral-300 p-8 text-neutral-500"
          >
            Belum ada layanan yang dipublikasikan.
          </motion.div>
        ) : (
          <div className="mt-12 space-y-6">
            {services.map((service, index) => (
              <motion.article
                key={service.id}
                initial={{ opacity: 0, y: 45 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.7,
                  delay: (index % 3) * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{
                  y: -5,
                  transition: { duration: 0.25 },
                }}
                className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-lg md:p-8"
              >
                <div className="flex items-start gap-4 md:gap-6">

                  {/* ICON */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.25 }}
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-xl md:h-14 md:w-14"
                  >
                    {service.icon || "•"}
                  </motion.div>

                  {/* CONTENT */}
                  <div className="flex-1">
                    <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
                      {String(
                        service.sortOrder || index + 1
                      ).padStart(2, "0")}
                    </p>

                    <h2 className="mt-2 text-2xl font-medium text-neutral-950 md:text-3xl">
                      {service.title}
                    </h2>

                    <p className="mt-3 max-w-3xl text-base leading-relaxed text-gray-600">
                      {service.description}
                    </p>
                  </div>

                  {/* ARROW */}
                  <motion.span
                    whileHover={{ x: 5, y: -5 }}
                    className="hidden text-xl text-neutral-400 sm:block"
                  >
                    ↗
                  </motion.span>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
