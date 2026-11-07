
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
  tokopediaUrl?: string | null;
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
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  // HERO IMAGE: AMBIL GAMBAR PRODUK PERTAMA YANG TERSEDIA
  const heroImage = products.find((product) => product.image)?.image;

  // LOAD PRODUCTS
  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await fetch("/api/products");

        if (!response.ok) {
          throw new Error("Failed to load products");
        }

        const result = await response.json();
        setProducts(result.items ?? []);
      } catch (error) {
        console.error("Failed to load products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    void loadProducts();
  }, []);

  // CATEGORY LIST
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

  // SEARCH + CATEGORY FILTER
  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return products.filter((product) => {
      const matchesCategory =
        activeCategory === "All" ||
        product.category === activeCategory;

      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        (product.category ?? "").toLowerCase().includes(query) ||
        (product.description ?? "").toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [products, activeCategory, searchQuery]);

  // OPEN PRODUCT DETAIL
  function openDetail(productId: string) {
    router.push(`/DetailProduk?id=${encodeURIComponent(productId)}`);
  }

  // RESET SEARCH AND CATEGORY
  function resetFilters() {
    setSearchQuery("");
    setActiveCategory("All");
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#F8FBFF] via-[#EAF3FF] to-[#DCEBFF] text-[#0B1F3A]">

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
          box-shadow: 0 20px 45px rgba(11, 31, 58, 0.13);
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
          background-color: #0B1F3A;
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

      {/* ===================================== */}
      {/* HERO SECTION */}
      {/* ===================================== */}
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-[#F8FBFF] via-[#DCEBFF] to-[#72B8F5] px-6 py-16 md:px-16 md:py-20 lg:px-24">

        {/* HERO BACKGROUND */}
        <div className="pointer-events-none absolute -right-32 top-20 h-[500px] w-[500px] rounded-full bg-blue-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-white/60 blur-3xl" />

        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">

          {/* LEFT CONTENT */}
          <div className="relative z-20">

            <Reveal>
              <div className="inline-flex items-center gap-3 rounded-full border border-blue-200/70 bg-blue-100/70 px-5 py-2.5 backdrop-blur-md">
                <span className="h-3 w-3 rounded-full bg-blue-600" />
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-700">
                  Our Products
                </p>
              </div>
            </Reveal>

            <Reveal delay={150}>
              <h1 className="mt-7 text-5xl font-extrabold leading-[1.05] tracking-tight text-[#0B1F3A] sm:text-6xl md:text-7xl lg:text-[76px]">
                Discover Our
                <span className="block bg-gradient-to-r from-[#075BEA] via-[#1768D8] to-[#2998F0] bg-clip-text text-transparent">
                  Products.
                </span>
              </h1>
            </Reveal>

            <Reveal delay={250}>
              <p className="mt-7 max-w-xl text-base font-medium leading-8 text-[#344F75] md:text-lg">
                Explore our curated collection of products and solutions,
                designed to support your needs with quality and reliability.
              </p>
            </Reveal>

            <Reveal delay={350}>
              <div className="mt-8 flex items-center gap-5">
                <span className="h-[3px] w-16 rounded-full bg-blue-600" />
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
                  Quality · Innovation · Reliability
                </span>
              </div>
            </Reveal>

            {/* HERO BUTTONS */}
            <Reveal delay={450}>
              <div className="mt-10 flex flex-wrap gap-4">

                <a
                  href="#product-collection"
                  className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#075BEA] to-[#168BFA] px-8 py-4 text-sm font-bold text-white shadow-xl shadow-blue-600/25 transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
                >
                  View Products
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </a>

                <a
                  href="/about"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-blue-600 bg-white/60 px-8 py-4 text-sm font-bold text-[#0B1F3A] backdrop-blur-sm transition duration-300 hover:bg-white"
                >
                  Learn More
                </a>

              </div>
            </Reveal>
          </div>

          {/* RIGHT PRODUCT VISUAL */}
          <Reveal delay={250}>
            <div className="relative mx-auto flex min-h-[350px] w-full max-w-[650px] items-center justify-center md:min-h-[500px]">

              {/* BLUE CIRCLE */}
              <div className="absolute right-4 top-1/2 h-[280px] w-[280px] -translate-y-1/2 rounded-full bg-gradient-to-br from-[#168BFA] to-[#075BEA] opacity-90 md:right-8 md:h-[420px] md:w-[420px]" />

              {/* LIGHT DECORATION */}
              <div className="absolute right-0 top-10 h-[80%] w-[75%] rounded-[45%] bg-white/20 blur-2xl" />

              {/* PRODUCT IMAGE */}
              {heroImage ? (
                <div className="relative z-10 h-[340px] w-full md:h-[500px]">
                  <Image
                    src="/images/produk-company.png"
                    alt="GIRIK Sports Products"
                    fill
                    priority
                    unoptimized
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-contain drop-shadow-[0_25px_25px_rgba(11,31,58,0.25)]"
                  />
                </div>
              ) : (
                <div className="relative z-10 flex h-[350px] w-full items-center justify-center rounded-3xl border border-white/40 bg-white/20 text-center backdrop-blur-sm md:h-[450px]">
                  <div>
                    <p className="text-7xl">🏸</p>
                    <p className="mt-4 text-sm font-bold text-[#0B1F3A]">
                      GIRIK Sports Collection
                    </p>
                    <p className="mt-2 text-xs text-slate-600">
                      Quality Sports Equipment
                    </p>
                  </div>
                </div>
              )}

              {/* FLOATING LABEL */}
              <div className="absolute bottom-5 left-0 z-20 rounded-2xl border border-white/70 bg-white/85 px-5 py-3 shadow-xl backdrop-blur-xl">
                <p className="text-[10px] font-bold uppercase tracking-widest text-blue-600">
                  GIRIK Collection
                </p>
                <p className="mt-1 text-sm font-bold text-[#0B1F3A]">
                  Quality You Can Trust
                </p>
              </div>

            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================================== */}
      {/* COMPANY FEATURES */}
      {/* ===================================== */}
      <section className="relative z-20 -mt-5 px-6 pb-12 md:px-16 lg:px-24">
        <Reveal>
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 rounded-[30px] border border-white/80 bg-white/85 p-6 shadow-[0_15px_50px_rgba(11,31,58,0.10)] backdrop-blur-xl sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:px-5 lg:py-7">

            {/* FEATURE 1 */}
            <div className="flex items-center gap-4 border-slate-200 px-3 py-3 lg:border-r lg:px-5">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-3xl font-bold text-blue-600">
                ✓
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#0B1F3A] md:text-base">
                  Premium Quality
                </h3>
                <p className="mt-1 text-xs text-slate-500">
                  Best quality products
                </p>
              </div>
            </div>

            {/* FEATURE 2 */}
            <div className="flex items-center gap-4 border-slate-200 px-3 py-3 lg:border-r lg:px-5">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-3xl text-blue-600">
                ✦
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#0B1F3A] md:text-base">
                  Innovative Solutions
                </h3>
                <p className="mt-1 text-xs text-slate-500">
                  Modern and creative
                </p>
              </div>
            </div>

            {/* FEATURE 3 */}
            <div className="flex items-center gap-4 border-slate-200 px-3 py-3 lg:border-r lg:px-5">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-3xl">
                🤝
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#0B1F3A] md:text-base">
                  Trusted Partner
                </h3>
                <p className="mt-1 text-xs text-slate-500">
                  Your reliable partner
                </p>
              </div>
            </div>

            {/* FEATURE 4 */}
            <div className="flex items-center gap-4 px-3 py-3 lg:px-5">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-3xl text-blue-600">
                ☎
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#0B1F3A] md:text-base">
                  24/7 Support
                </h3>
                <p className="mt-1 text-xs text-slate-500">
                  Always here for you
                </p>
              </div>
            </div>

          </div>
        </Reveal>
      </section>

      {/* ===================================== */}
      {/* CATEGORY FILTER */}
      {/* ===================================== */}
      <section className="relative border-y border-blue-200/70 bg-white/60 px-6 backdrop-blur-md md:px-16 lg:px-24">
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
                      ? "border-[#0B1F3A] bg-[#0B1F3A] text-white shadow-md shadow-blue-900/10"
                      : "border-blue-200 bg-white/80 text-[#6684a6] hover:border-[#2589d8] hover:bg-white hover:text-[#1768ac]"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================================== */}
      {/* SEARCH BAR */}
      {/* ===================================== */}
      <section className="relative px-6 pt-10 md:px-16 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="mx-auto max-w-2xl">

              <label
                htmlFor="product-search"
                className="mb-3 block text-xs font-bold uppercase tracking-[0.2em] text-[#1768ac]"
              >
                Search Our Products
              </label>

              <div className="relative">

                <span className="pointer-events-none absolute inset-y-0 left-5 flex items-center text-[#5893c5]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                    aria-hidden="true"
                  >
                    <circle cx="11" cy="11" r="7" />
                    <path d="m20 20-4-4" />
                  </svg>
                </span>

                <input
                  id="product-search"
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by product name, category, or description..."
                  className="w-full rounded-full border border-blue-200 bg-white/90 py-4 pl-14 pr-14 text-sm text-[#0B1F3A] shadow-sm outline-none backdrop-blur-md transition duration-300 placeholder:text-[#8ba8c5] focus:border-[#2589d8] focus:bg-white focus:ring-4 focus:ring-blue-100"
                />

                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    aria-label="Clear search"
                    className="absolute inset-y-0 right-5 text-2xl text-[#6684a6] transition hover:text-[#0B1F3A]"
                  >
                    ×
                  </button>
                )}

              </div>

              {searchQuery.trim() && (
                <p className="mt-3 text-xs text-[#6684a6]">
                  Search results for:{" "}
                  <span className="font-semibold text-[#1768ac]">
                    {searchQuery}
                  </span>
                </p>
              )}

            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================================== */}
      {/* PRODUCTS GRID */}
      {/* ===================================== */}
      <section
        id="product-collection"
        className="relative px-6 py-16 md:px-16 md:py-20 lg:px-24"
      >
        <div className="relative z-10 mx-auto max-w-7xl">

          <Reveal>
            <div className="mb-10 flex flex-wrap items-center justify-between gap-4">

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#1768ac]">
                  Our Collection
                </p>

                <p className="mt-2 text-sm text-[#45658a]">
                  {loading
                    ? "Loading products..."
                    : `${filteredProducts.length} ${
                        filteredProducts.length === 1
                          ? "Product"
                          : "Products"
                      } found`}
                </p>
              </div>

              <span className="rounded-full border border-blue-200 bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] text-[#1768ac]">
                {activeCategory}
              </span>

            </div>
          </Reveal>

          {/* LOADING */}
          {loading ? (
            <div
              className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
              aria-label="Loading products"
            >
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="animate-pulse overflow-hidden rounded-3xl border border-white/80 bg-white/80 p-3"
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
            <>
              {/* PRODUCT LIST */}
              {filteredProducts.length > 0 && (
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

                  {filteredProducts.map((product, index) => (
                    <Reveal
                      key={product.id}
                      delay={Math.min(index * 100, 400)}
                      duration={800}
                    >
                      <article className="product-card group h-full overflow-hidden rounded-3xl border border-white/90 bg-white/85 p-3 shadow-[0_8px_30px_rgba(11,31,58,0.07)] backdrop-blur-md">

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

                          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/20 via-transparent to-transparent opacity-60" />

                          <span className="product-arrow absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/70 bg-white/90 text-lg text-[#1768ac] shadow-md">
                            ↗
                          </span>
                        </button>

                        {/* PRODUCT INFORMATION */}
                        <div className="px-3 pb-4 pt-5">

                          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#5893c5]">
                            {product.category || "General"}
                          </p>

                          <h2 className="mt-2 text-xl font-bold leading-snug text-[#0B1F3A]">
                            {product.name}
                          </h2>

                          <div className="mt-5 border-t border-blue-100 pt-4">
                            <button
                              type="button"
                              onClick={() => openDetail(product.id)}
                              className="group/link inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#1768ac] transition-colors hover:text-[#0B1F3A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2589d8] focus-visible:ring-offset-4"
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

              {/* EMPTY SEARCH RESULT */}
              {filteredProducts.length === 0 && (
                <div className="rounded-3xl border border-dashed border-blue-300 bg-white/70 px-6 py-20 text-center">

                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-2xl text-[#1768ac]">
                    ◇
                  </div>

                  <h2 className="mt-5 text-xl font-bold text-[#0B1F3A]">
                    No products found
                  </h2>

                  <p className="mt-2 text-sm leading-7 text-[#45658a]">
                    {searchQuery.trim()
                      ? `No products match "${searchQuery}". Try another keyword.`
                      : "There are no products in this category yet."}
                  </p>

                  <button
                    type="button"
                    onClick={resetFilters}
                    className="mt-6 rounded-full bg-[#0B1F3A] px-6 py-3 text-xs font-bold uppercase tracking-[0.15em] text-white transition hover:bg-[#075BEA]"
                  >
                    View All Products
                  </button>

                </div>
              )}
            </>
          )}

        </div>
      </section>

      {/* ===================================== */}
      {/* BOTTOM CTA */}
      {/* ===================================== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#08172F] via-[#0B1F3A] to-[#0753A6] px-6 py-20 text-white md:px-16 md:py-28 lg:px-24">

        {/* BACKGROUND DECORATION */}
        <div className="pointer-events-none absolute -right-20 -top-32 h-96 w-96 rounded-full border border-sky-300/10" />
        <div className="pointer-events-none absolute -right-8 -top-20 h-72 w-72 rounded-full border border-sky-300/10" />
        <div className="pointer-events-none absolute bottom-[-150px] left-[15%] h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl">

          <Reveal>
            <div className="inline-flex items-center gap-3 rounded-full border border-sky-300/20 bg-white/5 px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-sky-400" />
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-sky-300">
                Discover More
              </p>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <h2 className="mt-6 max-w-4xl text-3xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
              Quality products for{" "}
              <span className="bg-gradient-to-r from-sky-300 to-blue-200 bg-clip-text text-transparent">
                every need
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
              className="group mt-9 inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-sky-400 to-blue-500 px-8 py-4 text-sm font-bold text-[#08172F] shadow-lg shadow-blue-950/20 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-950/30"
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
