"use client";

import { useEffect, useRef, useState } from "react";

const products = [
  {
    id: 1,
    name: "Badminton Racket",
    category: "Sports",
    image:
      "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 2,
    name: "Sports Shoes",
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
    name: "Skincare Product",
    category: "Beauty",
    image:
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 5,
    name: "Body Care",
    category: "Beauty",
    image:
      "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 6,
    name: "Beauty Care",
    category: "Beauty",
    image:
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=1000&q=80",
  },
];

const categories = ["All", "Sports", "Beauty"];


/* =========================================================
   REVEAL COMPONENT
   Efek muncul ketika elemen masuk ke layar
========================================================= */

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

          // Animasi hanya dijalankan satu kali
          observer.unobserve(element);
        }
      },
      {
        threshold: 0.12,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`
        transition-all ease-out
        ${
          isVisible
            ? "translate-y-0 opacity-100"
            : "translate-y-12 opacity-0"
        }
        ${className}
      `}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}


/* =========================================================
   PRODUCT PAGE
========================================================= */

export default function ProductPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter(
          (product) => product.category === activeCategory
        );

  return (
    <main className="min-h-screen bg-white text-black">


      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="px-8 py-20 md:px-16 md:py-28 lg:px-24">

        <div className="mx-auto max-w-7xl">

          {/* Label */}

          <Reveal delay={0}>

            <p className="text-sm uppercase tracking-[0.3em] text-gray-500">
              Our Products
            </p>

          </Reveal>


          {/* Heading */}

          <Reveal delay={150}>

            <h1 className="mt-5 text-5xl font-medium tracking-tight sm:text-6xl md:text-7xl">
              Products
            </h1>

          </Reveal>


          {/* Description */}

          <Reveal delay={300}>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-500">
              Explore our collection of sports and beauty products
              designed to meet different customer needs.
            </p>

          </Reveal>

        </div>

      </section>



      {/* =====================================================
          CATEGORY
      ===================================================== */}

      <section className="border-y border-black/10 px-8 md:px-16 lg:px-24">

        <div className="mx-auto max-w-7xl">

          <Reveal delay={0}>

            <div className="flex gap-8 overflow-x-auto py-6">

              {categories.map((category, index) => (

                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  style={{
                    transitionDelay: `${index * 100}ms`,
                  }}
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



      {/* =====================================================
          PRODUCTS
      ===================================================== */}

      <section className="px-8 py-20 md:px-16 lg:px-24">

        <div className="mx-auto max-w-7xl">


          {/* PRODUCT COUNT */}

          <Reveal delay={0}>

            <div className="mb-12 flex items-center justify-between">

              <p className="text-sm text-gray-500">
                {filteredProducts.length} Products
              </p>

              <p className="text-sm uppercase tracking-[0.2em]">
                {activeCategory}
              </p>

            </div>

          </Reveal>



          {/* PRODUCT GRID */}

          <div className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">

            {filteredProducts.map((product, index) => (

              <Reveal
                key={product.id}
                delay={index * 150}
                duration={800}
              >

                <div className="group">


                  {/* IMAGE */}

                  <div className="aspect-square overflow-hidden bg-neutral-100">

                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />

                  </div>


                  {/* INFORMATION */}

                  <div className="mt-5">

                    <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
                      {product.category}
                    </p>

                    <h2 className="mt-2 text-xl font-medium">
                      {product.name}
                    </h2>

                    <button
                      className="mt-4 text-xs uppercase tracking-[0.2em] underline underline-offset-4 transition hover:text-gray-500"
                    >
                      View Product →
                    </button>

                  </div>

                </div>

              </Reveal>

            ))}

          </div>



          {/* EMPTY STATE */}

          {filteredProducts.length === 0 && (

            <Reveal delay={0}>

              <div className="py-20 text-center">

                <p className="text-gray-500">
                  No products found in this category.
                </p>

              </div>

            </Reveal>

          )}

        </div>

      </section>



      {/* =====================================================
          CTA
      ===================================================== */}

      <section className="bg-black px-8 py-20 text-white md:px-16 lg:px-24">

        <div className="mx-auto max-w-7xl">


          <Reveal delay={0}>

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