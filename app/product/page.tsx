
"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

const products = [
  {
    id: 1,
    name: "Barbel",
    category: "Sports",
    image:
      "https://down-id.img.susercontent.com/file/sg-11134201-8258o-mstlszjzklc78d@resize_w900_nl.webp",
  },
  {
    id: 2,
    name: "Shoes",
    category: "Sports",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 3,
    name: "Tennis Racket",
    category: "Sports",
    image:
      "https://images.unsplash.com/photo-1617083934555-5d4a4b0c8f3f?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 4,
    name: "Peeroo Henna Mehandi Impor Quality Natural Henna Warna Hitam Brown Chesnut Dark Brown Burgundy per warna rambut Box isi 6 Sachet -",
    category: "Beauty",
    image:
      "https://down-id.img.susercontent.com/file/id-11134207-8224z-miicnugkan7s13@resize_w900_nl.webp",
  },
  {
    id: 5,
    name: "Eagle Henna Mehandi Impor Quality Natural Henna Eagle Warna Hitam Brown Chesnut Dark Brown Burgundy per warna rambut Schet 10 gme",
    category: "Beauty",
    image:
      "https://down-id.img.susercontent.com/file/id-11134207-7r98t-lxc1e10ifmei41@resize_w900_nl.webp",
  },
  {
    id: 6,
    name: "NEHA KUKU PACAR 1 BOX ISI 12 PCS HENNA KUKU PACAR KUKU ASLI ORIGINAL HALAL BISA DIPAKAI SHOLAT OLEH OLEH HAJI DAN UMROH",
    category: "Beauty",
    image:
      "https://down-id.img.susercontent.com/file/id-11134207-81ztc-mrvh2c1pznr9ee@resize_w900_nl.webp",
  },
];

const categories = ["All", "Sports", "Beauty"];

/* REVEAL ANIMATION */

type RevealProps = {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
};

function Reveal({
  children,
  delay = 0,
  duration = 700,
  className = "",
}: RevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all ease-out ${
        isVisible
          ? "translate-y-0 opacity-100"
          : "translate-y-12 opacity-0"
      } ${className}`}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* PRODUCT PAGE */

export default function ProductPage() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter(
          (product) => product.category === activeCategory
        );

  function openDetail(productId: number) {
    router.push(`/DetailProduk?id=${productId}`);
  }

  return (
    <main className="min-h-screen bg-white text-black">
      {/* HERO */}

      <section className="px-8 py-20 md:px-16 md:py-28 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="text-sm uppercase tracking-[0.3em] text-gray-500">
              Our Products
            </p>
          </Reveal>

          <Reveal delay={150}>
            <h1 className="mt-5 text-5xl font-medium tracking-tight sm:text-6xl md:text-7xl">
              Products
            </h1>
          </Reveal>

          <Reveal delay={300}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-500">
              Explore our collection of sports and beauty products
              designed to meet different customer needs.
            </p>
          </Reveal>
        </div>
      </section>

      {/* CATEGORY FILTER */}

      <section className="border-y border-black/10 px-8 md:px-16 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="flex gap-8 overflow-x-auto py-6">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`whitespace-nowrap text-sm uppercase tracking-[0.2em] transition-all duration-300 ${
                    activeCategory === category
                      ? "border-b-2 border-black pb-2 text-black"
                      : "text-gray-400 hover:text-black"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* PRODUCT GRID */}

      <section className="px-8 py-20 md:px-16 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="mb-12 flex items-center justify-between">
              <p className="text-sm text-gray-500">
                {filteredProducts.length} Products
              </p>

              <p className="text-sm uppercase tracking-[0.2em]">
                {activeCategory}
              </p>
            </div>
          </Reveal>

          <div className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product, index) => (
              <Reveal
                key={product.id}
                delay={index * 150}
                duration={800}
              >
                <div className="group">
                  {/* PRODUCT IMAGE */}

                  <button
                    type="button"
                    onClick={() => openDetail(product.id)}
                    aria-label={`View ${product.name} details`}
                    className="block aspect-square w-full overflow-hidden bg-neutral-100"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                  </button>

                  {/* PRODUCT INFORMATION */}

                  <div className="mt-5">
                    <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
                      {product.category}
                    </p>

                    <h2 className="mt-2 text-xl font-medium">
                      {product.name}
                    </h2>

                    {/* VIEW PRODUCT BUTTON */}

                    <button
                      type="button"
                      onClick={() => openDetail(product.id)}
                      className="mt-4 text-xs uppercase tracking-[0.2em] underline underline-offset-4 transition hover:text-gray-500"
                    >
                      View Product →
                    </button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-gray-500">
                No products found in this category.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}

      <section className="bg-black px-8 py-20 text-white md:px-16 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.3em] text-gray-400">
              Discover More
            </p>
          </Reveal>

          <Reveal delay={200}>
            <h2 className="mt-5 max-w-4xl text-4xl font-medium leading-tight tracking-tight md:text-6xl">
              Quality products for every need.
            </h2>
          </Reveal>

          <Reveal delay={400}>
            <a
              href="/contact"
              className="mt-10 inline-flex rounded-full bg-white px-8 py-4 text-sm text-black transition duration-300 hover:-translate-y-1 hover:bg-gray-200"
            >
              Contact Us →
            </a>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
