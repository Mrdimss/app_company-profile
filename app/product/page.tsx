
"use client";

import Image from "next/image";
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

        if (!response.ok) {
          throw new Error("Failed to load products");
        }

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
    () => [
      "All",
      ...Array.from(
        new Set(
          products
            .map((item) => item.category)
            .filter(Boolean) as string[]
        )
      ),
    ],
    [products]
  );

  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter(
          (product) => product.category === activeCategory
        );

  function openDetail(productId: string) {
    router.push(`/DetailProduk?id=${productId}`);
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#eaf3ff] via-[#d8eaff] to-[#b8e3ff] text-[#102b59]">
      <style>{`
        .product-filter {
          transition:
            color 0.3s ease,
            background-color 0.3s ease,
            border-color 0.3s ease,
            box-shadow 0.3s ease;
        }

        .product-card {
          transition:
            transform 0.4s ease,
            box-shadow 0.4s ease;
        }

        .product-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 45px rgba(16, 43, 89, 0.12);
        }

        .product-image {
          transition: transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .product-card:hover .product-image {
          transform: scale(1.06);
        }

        .product-arrow {
          transition:
            transform 0.3s ease,
            background-color 0.3s ease,
            color 0.3s ease;
        }

        .product-card:hover .product-arrow {
          transform: translate(3px, -3px);
          background-color: #102b59;
          color: white;
        }

        @media (prefers-reduced-motion: reduce) {
          .product-filter,
          .product-card,
          .product-image,
          .product-arrow {
            transition: none;
          }

          .product-card:hover,
          .product-card:hover .product-image,
          .product-card:hover .product-arrow {
            transform: none;
          }
        }
      `}</style>

      {/* BACKGROUND DECORATION */}
      <div className="pointer-events-none absolute -right-32 top-24 h-96 w-96 rounded-full bg-sky-300/25 blur-3xl" />
      <div className="pointer-events-none absolute -left-32 top-[40%] h-80 w-80 rounded-full bg-blue-300/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-[25%] right-[10%] h-64 w-64 rounded-full bg-white/30 blur-3xl" />

      {/* HERO */}
      <section className="relative px-6 py-20 md:px-16 md:py-28 lg:px-24">
        <div className="relative z-10 mx-auto max-w-7xl">
          <Reveal>
            <div className="inline-flex items-center gap-3 rounded-full border border-blue-200/80 bg-white/60 px-4 py-2 backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-sky-500" />
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#1768ac]">
                Our Products
              </p>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <h1 className="mt-6 text-5xl font-semibold tracking-tight text-[#102b59] sm:text-6xl md:text-7xl">
              Discover Our{" "}
              <span className="bg-gradient-to-r from-[#1768ac] via-[#2589d8] to-[#54b9ed] bg-clip-text text-transparent">
                Products.
              </span>
            </h1>
          </Reveal>

          <Reveal delay={300}>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[#45658a] md:text-lg">
              Explore our curated collection of products and solutions,
              designed to support your needs with quality and reliability.
            </p>
          </Reveal>

          <Reveal delay={450}>
            <div className="mt-10 flex items-center gap-4">
              <span className="h-px w-12 bg-[#2589d8]" />
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-[#4b85b8]">
                Quality · Innovation · Reliability
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CATEGORY FILTER */}
      <section className="relative border-y border-blue-200/70 bg-white/35 px-6 backdrop-blur-md md:px-16 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div
              className="flex gap-3 overflow-x-auto py-5"
              role="group"
              aria-label="Filter products by category"
            >
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  aria-pressed={activeCategory === category}
                  className={`product-filter shrink-0 rounded-full border px-5 py-3 text-xs font-semibold uppercase tracking-[0.15em] ${
                    activeCategory === category
                      ? "border-[#102b59] bg-[#102b59] text-white shadow-md shadow-blue-900/10"
                      : "border-blue-200 bg-white/60 text-[#6684a6] hover:border-[#2589d8] hover:bg-white hover:text-[#1768ac]"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* PRODUCTS GRID */}
      <section className="relative px-6 py-16 md:px-16 md:py-20 lg:px-24">
        <div className="relative z-10 mx-auto max-w-7xl">
          <Reveal>
            <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#4b85b8]">
                  Our Collection
                </p>
                <p className="mt-2 text-sm text-[#45658a]">
                  {loading
                    ? "Loading products..."
                    : `${filteredProducts.length} ${
                        filteredProducts.length === 1
                          ? "Product"
                          : "Products"
                      }`}
                </p>
              </div>

              <span className="rounded-full border border-blue-200 bg-white/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#1768ac]">
                {activeCategory}
              </span>
            </div>
          </Reveal>

          {loading ? (
            <div
              className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
              aria-label="Loading products"
            >
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="animate-pulse overflow-hidden rounded-3xl border border-white/80 bg-white/60 p-3"
                >
                  <div className="aspect-square rounded-2xl bg-blue-100/80" />
                  <div className="px-2 pb-3 pt-5">
                    <div className="h-3 w-20 rounded bg-blue-100" />
                    <div className="mt-3 h-5 w-3/4 rounded bg-blue-100" />
                    <div className="mt-5 h-3 w-28 rounded bg-blue-100" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((product, index) => (
                <Reveal
                  key={product.id}
                  delay={Math.min(index * 100, 400)}
                  duration={800}
                >
                  <article className="product-card group h-full overflow-hidden rounded-3xl border border-white/80 bg-white/65 p-3 shadow-[0_8px_30px_rgba(16,43,89,0.04)] backdrop-blur-md">
                    {/* PRODUCT IMAGE */}
                    <button
                      type="button"
                      onClick={() => openDetail(product.id)}
                      aria-label={`View ${product.name} details`}
                      className="relative block aspect-square w-full overflow-hidden rounded-2xl bg-gradient-to-br from-blue-100 to-sky-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2589d8] focus-visible:ring-offset-2"
                    >
                      {product.image ? (
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          unoptimized
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="product-image object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-sm text-[#45658a]">
                          No image available
                        </div>
                      )}

                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#102b59]/20 via-transparent to-transparent opacity-60" />

                      <span className="product-arrow absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/70 bg-white/90 text-lg text-[#1768ac] shadow-md">
                        ↗
                      </span>
                    </button>

                    {/* PRODUCT INFORMATION */}
                    <div className="px-3 pb-4 pt-5">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#5893c5]">
                        {product.category || "General"}
                      </p>

                      <h2 className="mt-2 text-xl font-semibold leading-snug text-[#102b59]">
                        {product.name}
                      </h2>

                      <div className="mt-5 border-t border-blue-100 pt-4">
                        <button
                          type="button"
                          onClick={() => openDetail(product.id)}
                          className="group/link inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#1768ac] transition-colors hover:text-[#102b59] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2589d8] focus-visible:ring-offset-4"
                        >
                          View Product
                          <span className="transition-transform duration-300 group-hover/link:translate-x-1">
                            →
                          </span>
                        </button>
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          )}

          {!loading && filteredProducts.length === 0 && (
            <div className="rounded-3xl border border-dashed border-blue-300 bg-white/50 px-6 py-20 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-2xl text-[#1768ac]">
                ◇
              </div>
              <h2 className="mt-5 text-xl font-semibold text-[#102b59]">
                No products found
              </h2>
              <p className="mt-2 text-sm leading-7 text-[#45658a]">
                There are no products in this category yet.
              </p>

              {activeCategory !== "All" && (
                <button
                  type="button"
                  onClick={() => setActiveCategory("All")}
                  className="mt-6 rounded-full bg-[#102b59] px-6 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-white transition hover:bg-[#1768ac]"
                >
                  View All Products
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0b1730] via-[#102b59] to-[#123f7a] px-6 py-20 text-white md:px-16 md:py-28 lg:px-24">
        <div className="pointer-events-none absolute -right-20 -top-32 h-96 w-96 rounded-full border border-sky-300/10" />
        <div className="pointer-events-none absolute -right-8 -top-20 h-72 w-72 rounded-full border border-sky-300/10" />
        <div className="pointer-events-none absolute bottom-[-150px] left-[15%] h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <Reveal>
            <div className="inline-flex items-center gap-3 rounded-full border border-sky-300/20 bg-white/5 px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-sky-400" />
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-300">
                Discover More
              </p>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <h2 className="mt-6 max-w-4xl text-3xl font-semibold leading-tight tracking-tight md:text-5xl lg:text-6xl">
              Quality products for{" "}
              <span className="bg-gradient-to-r from-sky-300 to-blue-200 bg-clip-text text-transparent">
                every need.
              </span>
            </h2>
          </Reveal>

          <Reveal delay={350}>
            <p className="mt-6 max-w-xl text-sm leading-8 text-blue-100/70 md:text-base">
              Need more information about our products? Get in touch
              with our team and let&apos;s find the right solution for you.
            </p>
          </Reveal>

          <Reveal delay={450}>
            <a
              href="/contact"
              className="group mt-9 inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-sky-400 to-blue-500 px-8 py-4 text-sm font-semibold text-[#0b1730] shadow-lg shadow-blue-950/20 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-950/30"
            >
              Contact Us
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
          </Reveal>
        </div>
      </section>
    </main>
  );
}