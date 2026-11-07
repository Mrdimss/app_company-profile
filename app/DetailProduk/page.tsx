
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Suspense, useEffect, useState } from "react";

type ProductItem = {
  id: string;
  name: string;
  category?: string | null;
  description: string;
  image?: string | null;
  productUrl?: string | null;
  tokopediaUrl?: string | null;
};

function ProductDetails({ id }: { id: string | null }) {
  const router = useRouter();

  const [product, setProduct] = useState<ProductItem | null>(null);
  const [loading, setLoading] = useState(id !== null);

  useEffect(() => {
    if (!id) return;

    const controller = new AbortController();
    let isCurrent = true;

    async function loadProduct() {
      try {
        const response = await fetch(`/api/products/${id}`, {
          signal: controller.signal,
        });

        const data = await response.json();

        if (!isCurrent) return;

        if (!response.ok) {
          setProduct(null);
          return;
        }

        setProduct(data.item ?? null);
      } catch {
        if (isCurrent && !controller.signal.aborted) {
          setProduct(null);
        }
      } finally {
        if (isCurrent) {
          setLoading(false);
        }
      }
    }

    void loadProduct();

    return () => {
      isCurrent = false;
      controller.abort();
    };
  }, [id]);

  const buttonClass =
    "inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-[#0b1730] via-[#123f7a] to-blue-700 px-8 py-4 text-sm font-medium text-white shadow-lg shadow-blue-900/15 transition duration-300 hover:-translate-y-1 hover:shadow-xl";

  if (!id || loading || !product) {
    const message = !id
      ? "The product you are looking for is unavailable."
      : loading
        ? "Loading product..."
        : "The product you are looking for is unavailable.";

    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f7faff] px-8 text-[#101a30]">
        <div className="text-center">
          {loading ? (
            <div className="mx-auto mb-5 h-10 w-10 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600" />
          ) : (
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#eaf3ff] text-3xl text-blue-600">
              !
            </div>
          )}

          <h1 className="text-3xl font-semibold">
            {loading ? "Please Wait" : "Product Not Found"}
          </h1>

          <p className="mt-4 text-slate-500">{message}</p>

          {!loading && (
            <button
              type="button"
              onClick={() => router.push("/product")}
              className={`${buttonClass} mt-8`}
            >
              Back to Products
            </button>
          )}
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7faff] px-6 py-12 text-[#101a30] md:px-16 md:py-16 lg:px-24">
      <div className="mx-auto max-w-7xl">

        {/* Back Button */}
        <button
          type="button"
          onClick={() => router.back()}
          className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-blue-700"
        >
          <span>←</span>
          Back
        </button>

        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">

          {/* Product Image */}
          <div className="group relative aspect-square overflow-hidden rounded-3xl border border-blue-100 bg-[#eaf3ff] shadow-sm">
            {product.image ? (
              <Image
                src={product.image}
                alt={product.name}
                fill
                unoptimized
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition duration-700 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-slate-400">
                No image available
              </div>
            )}
          </div>

          {/* Product Information */}
          <div className="flex flex-col items-start">

            <span className="rounded-full border border-blue-100 bg-[#eaf3ff] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
              {product.category || "General"}
            </span>

            <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-[#101a30] md:text-5xl">
              {product.name}
            </h1>

            <div className="mt-5 h-1 w-20 rounded-full bg-gradient-to-r from-blue-400 to-blue-700" />

            <p className="mt-7 max-w-xl text-base leading-8 text-slate-600">
              {product.description}
            </p>

            {/* Product Quality */}
            <div className="mt-8 w-full rounded-2xl border border-blue-100 bg-[#eaf3ff] p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-blue-700">
                  ✓
                </div>

                <div>
                  <h3 className="font-semibold text-[#101a30]">
                    Product Quality
                  </h3>

                  <p className="mt-1 text-sm leading-relaxed text-slate-600">
                    Quality products for your business and personal needs.
                  </p>
                </div>
              </div>
            </div>

            {/* Marketplace Buttons */}
            {(product.productUrl || product.tokopediaUrl) && (
              <div className="mt-8 w-full">
                <h3 className="mb-4 text-sm font-semibold text-[#101a30]">
                  Buy This Product
                </h3>

                <div className="flex flex-wrap gap-4">

                  {/* Shopee Button */}
                  {product.productUrl && (
                    <a
                      href={product.productUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Shopee"
                      aria-label="Beli produk ini di Shopee"
                      className={buttonClass}
                    >
                      <span aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white">
                        <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none">
                          <path d="M8 9V7a4 4 0 0 1 8 0v2" stroke="#ee4d2d" strokeWidth="1.8" strokeLinecap="round" />
                          <path d="M5.5 9h13l1.2 12h-15L5.5 9Z" fill="#ee4d2d" />
                          <text x="12" y="18" fill="white" fontSize="9" fontWeight="700" textAnchor="middle">S</text>
                        </svg>
                      </span>
                      Buy on Shopee
                      <span>↗</span>
                    </a>
                  )}

                  {/* Tokopedia Button */}
                  {product.tokopediaUrl && (
                    <a
                      href={product.tokopediaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Tokopedia"
                      aria-label="Beli produk ini di Tokopedia"
                      className={buttonClass}
                    >
                      <span aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white">
                        <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none">
                          <path d="M4.5 10.5 6 6h12l1.5 4.5v8h-15v-8Z" fill="#03ac0e" />
                          <path d="M4.5 10.5h15M8 6l1.5 4.5M16 6l-1.5 4.5" stroke="white" strokeWidth="1.2" strokeLinejoin="round" />
                          <circle cx="9.5" cy="14" r="1.4" fill="white" />
                          <circle cx="14.5" cy="14" r="1.4" fill="white" />
                        </svg>
                      </span>
                      Buy on Tokopedia
                      <span>↗</span>
                    </a>
                  )}

                </div>
              </div>
            )}

            {/* Continue Exploring */}
            <button
              type="button"
              onClick={() => router.push("/product")}
              className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 underline underline-offset-4 transition hover:text-blue-700"
            >
              Continue Exploring
            </button>

          </div>
        </div>

        {/* Bottom Information */}
        <div className="mt-20 rounded-3xl bg-gradient-to-r from-[#0b1730] via-[#123f7a] to-blue-700 px-8 py-10 text-center text-white md:px-16">

          <h2 className="text-2xl font-semibold md:text-3xl">
            Discover More of Our Products
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-blue-100">
            Explore our product collection and find the right solutions for
            your business and personal needs.
          </p>

          <button
            type="button"
            onClick={() => router.push("/product")}
            className="mt-7 rounded-full bg-white px-8 py-3 text-sm font-semibold text-[#123f7a] transition hover:-translate-y-1 hover:bg-blue-50"
          >
            Explore Products →
          </button>

        </div>

      </div>
    </main>
  );
}

export default function DetailProdukPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-[#f7faff] text-slate-500">
          Loading product...
        </main>
      }
    >
      <DetailProdukContent />
    </Suspense>
  );
}

function DetailProdukContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  return <ProductDetails key={id ?? "missing"} id={id} />;
}
