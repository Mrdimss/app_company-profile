
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type ProductItem = {
  id: string;
  name: string;
  category?: string | null;
  image?: string | null;
  description: string;
  productUrl?: string | null;
};

function Reveal({
  children,
  delay = 0,
  duration = 700,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}) {
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
        isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
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

export default function ProductPage() {
  const router = useRouter();
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await fetch("/api/products");
        const result = await response.json();
        setProducts(result.items ?? []);
      } catch {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    void loadProducts();
  }, []);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(products.map((item) => item.category).filter(Boolean) as string[]))],
    [products]
  );

  const filteredProducts =
    activeCategory === "All" ? products : products.filter((product) => product.category === activeCategory);

  function openDetail(productId: string) {
    router.push(`/DetailProduk?id=${productId}`);
  }

  return (
    <main className="min-h-screen bg-white text-black">
      <section className="px-8 py-20 md:px-16 md:py-28 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="text-sm uppercase tracking-[0.3em] text-gray-500">Our Products</p>
          </Reveal>

          <Reveal delay={150}>
            <h1 className="mt-5 text-5xl font-medium tracking-tight sm:text-6xl md:text-7xl">Products</h1>
          </Reveal>

          <Reveal delay={300}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-500">
              Explore a curated list of products and solutions from our brand.
            </p>
          </Reveal>
        </div>
      </section>

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
                    activeCategory === category ? "border-b-2 border-black pb-2 text-black" : "text-gray-400 hover:text-black"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-8 py-20 md:px-16 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="mb-12 flex items-center justify-between">
              <p className="text-sm text-gray-500">{loading ? "Loading..." : `${filteredProducts.length} Products`}</p>
              <p className="text-sm uppercase tracking-[0.2em]">{activeCategory}</p>
            </div>
          </Reveal>

          <div className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product, index) => (
              <Reveal key={product.id} delay={index * 150} duration={800}>
                <div className="group">
                  <button
                    type="button"
                    onClick={() => openDetail(product.id)}
                    aria-label={`View ${product.name} details`}
                    className="block aspect-square w-full overflow-hidden bg-neutral-100"
                  >
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-neutral-200 text-sm text-neutral-500">
                        No image
                      </div>
                    )}
                  </button>

                  <div className="mt-5">
                    <p className="text-xs uppercase tracking-[0.2em] text-gray-400">{product.category || "General"}</p>
                    <h2 className="mt-2 text-xl font-medium">{product.name}</h2>
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

          {!loading && filteredProducts.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-gray-500">No products found in this category.</p>
            </div>
          )}
        </div>
      </section>

      <section className="bg-black px-8 py-20 text-white md:px-16 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.3em] text-gray-400">Discover More</p>
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
