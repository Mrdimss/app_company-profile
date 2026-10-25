
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
};

function ProductDetails({ id }: { id: string | null }) {
  const router = useRouter();
  const [product, setProduct] = useState<ProductItem | null>(null);
  const [loading, setLoading] = useState(id !== null);

  useEffect(() => {
    if (!id) {
      return;
    }

    let isCurrent = true;

    async function loadProduct() {
      try {
        const response = await fetch(`/api/products/${id}`);
        const data = await response.json();

        if (!isCurrent) return;

        if (!response.ok) {
          setProduct(null);
          return;
        }

        setProduct(data.item ?? null);
      } catch {
        if (isCurrent) {
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
    };
  }, [id]);

  if (!id) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white px-8 text-black">
        <div className="text-center">
          <h1 className="text-3xl font-medium">Product Not Found</h1>
          <p className="mt-4 text-gray-500">The product you are looking for is unavailable.</p>
          <button
            type="button"
            onClick={() => router.push("/product")}
            className="mt-8 rounded-full bg-black px-8 py-4 text-sm text-white transition hover:bg-gray-700"
          >
            Back to Products
          </button>
        </div>
      </main>
    );
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white text-gray-500">
        Loading product...
      </main>
    );
  }

  if (!product) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white px-8 text-black">
        <div className="text-center">
          <h1 className="text-3xl font-medium">Product Not Found</h1>
          <p className="mt-4 text-gray-500">The product you are looking for is unavailable.</p>
          <button
            type="button"
            onClick={() => router.push("/product")}
            className="mt-8 rounded-full bg-black px-8 py-4 text-sm text-white transition hover:bg-gray-700"
          >
            Back to Products
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white px-8 py-12 text-black md:px-16 md:py-16 lg:px-24">
      <div className="mx-auto max-w-7xl">
        <button
          type="button"
          onClick={() => router.back()}
          className="mb-10 text-sm text-gray-500 transition hover:text-black"
        >
          ← Back
        </button>

        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
          <div className="relative aspect-square overflow-hidden bg-neutral-100">
            {product.image ? (
              <Image
                src={product.image}
                alt={product.name}
                fill
                unoptimized
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            ) : (
              <div className="flex aspect-square items-center justify-center bg-neutral-200 text-sm text-neutral-500">
                No image
              </div>
            )}
          </div>

          <div className="flex flex-col items-start">
            <p className="text-xs uppercase tracking-[0.3em] text-gray-400">{product.category || "General"}</p>
            <h1 className="mt-5 text-4xl font-medium tracking-tight md:text-5xl">{product.name}</h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-gray-500">{product.description}</p>

            <div className="mt-8 border-y border-black/10 py-5">
              <p className="text-sm text-gray-500">Quality products for your business and personal needs.</p>
            </div>

            {product.productUrl ? (
              <a
                href={product.productUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex rounded-full bg-black px-8 py-4 text-sm text-white transition duration-300 hover:-translate-y-1 hover:bg-gray-700"
              >
                View Product →
              </a>
            ) : null}

            <button
              type="button"
              onClick={() => router.push("/product")}
              className="mt-5 text-xs uppercase tracking-[0.2em] underline underline-offset-4 transition hover:text-gray-500"
            >
              Continue Exploring
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function DetailProdukPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-white text-gray-500">
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
