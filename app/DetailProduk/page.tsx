
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

const products = [
  {
    id: 1,
    name: "Barbel",
    category: "Sports",
    image:
      "https://down-id.img.susercontent.com/file/sg-11134201-8258o-mstlszjzklc78d@resize_w900_nl.webp",
    description:
      "Sports equipment for strength training and fitness activities.",
    link: "https://shopee.co.id/",
  },
  {
    id: 2,
    name: "Shoes",
    category: "Sports",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80",
    description:
      "Comfortable sports shoes designed to support your active lifestyle.",
    link: "https://shopee.co.id/",
  },
  {
    id: 3,
    name: "Tennis Racket",
    category: "Sports",
    image:
      "https://images.unsplash.com/photo-1617083934555-5d4a4b0c8f3f?auto=format&fit=crop&w=1000&q=80",
    description:
      "Tennis equipment suitable for practice and recreational play.",
    link: "https://shopee.co.id/",
  },
  {
    id: 4,
    name: "Peeroo Henna Mehandi Impor Quality Natural Henna Warna Hitam Brown Chesnut Dark Brown Burgundy per warna rambut Box isi 6 Sachet -",
    category: "Beauty",
    image:
      "https://down-id.img.susercontent.com/file/id-11134207-8224z-miicnugkan7s13@resize_w900_nl.webp",
    description:
      "Imported henna product for beauty and personal care needs.",
    link: "https://shopee.co.id/Peeroo-Henna-Mehandi-Impor-Quality-Natural-Henna-Warna-Hitam-Brown-Chesnut-Dark-Brown-Burgundy-per-warna-rambut-Box-isi-6-Sachet-60-gm-i.1170298087.29781131035?extraParams=%7B%22display_model_id%22%3A109447711239%2C%22model_selection_logic%22%3A3%7D",
  },
  {
    id: 5,
    name: "Eagle Henna Mehandi Impor Quality Natural Henna Eagle Warna Hitam Brown Chesnut Dark Brown Burgundy per warna rambut Schet 10 gm",
    category: "Beauty",
    image:
      "https://down-id.img.susercontent.com/file/id-11134207-7r98t-lxc1e10ifmei41@resize_w900_nl.webp",
    description:
      "Body care products for your everyday personal care routine.",
    link: "https://shopee.co.id/Eagle-Henna-Mehandi-Impor-Quality-Natural-Henna-Eagle-Warna-Hitam-Brown-Chesnut-Dark-Brown-Burgundy-per-warna-rambut-Schet-10-gm-i.1170298087.25083107995?extraParams=%7B%22display_model_id%22%3A137974193566%2C%22model_selection_logic%22%3A3%7D",
  },
  {
    id: 6,
    name: "NEHA KUKU PACAR 1 BOX ISI 12 PCS HENNA KUKU PACAR KUKU ASLI ORIGINAL HALAL BISA DIPAKAI SHOLAT OLEH OLEH HAJI DAN",
    category: "Beauty",
    image:
      "https://down-id.img.susercontent.com/file/id-11134207-81ztc-mrvh2c1pznr9ee@resize_w900_nl.webp",
    description:
      "Beauty care products to complement your daily beauty routine.",
    link: "https://shopee.co.id/NEHA-KUKU-PACAR-1-BOX-ISI-12-PCS-HENNA-KUKU-PACAR-KUKU-ASLI-ORIGINAL-HALAL-BISA-DIPAKAI-SHOLAT-OLEH-OLEH-HAJI-DAN-UMROH-i.1170298087.52816002317?extraParams=%7B%22display_model_id%22%3A431366117623%2C%22model_selection_logic%22%3A3%7D",
  },
];

function DetailProdukContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const idParam = searchParams.get("id");
  const id = idParam ? Number(idParam) : NaN;

  const product = products.find((item) => item.id === id);

  if (!product) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white px-8 text-black">
        <div className="text-center">
          <h1 className="text-3xl font-medium">
            Product Not Found
          </h1>

          <p className="mt-4 text-gray-500">
            The product you are looking for is unavailable.
          </p>

          <button
            type="button"
            onClick={() => router.push("/products")}
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
        {/* BACK BUTTON */}

        <button
          type="button"
          onClick={() => router.back()}
          className="mb-10 text-sm text-gray-500 transition hover:text-black"
        >
          ← Back
        </button>

        {/* PRODUCT DETAIL */}

        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
          {/* PRODUCT IMAGE */}

          <div className="overflow-hidden bg-neutral-100">
            <img
              src={product.image}
              alt={product.name}
              className="aspect-square h-full w-full object-cover"
            />
          </div>

          {/* PRODUCT INFORMATION */}

          <div className="flex flex-col items-start">
            <p className="text-xs uppercase tracking-[0.3em] text-gray-400">
              {product.category}
            </p>

            <h1 className="mt-5 text-4xl font-medium tracking-tight md:text-5xl">
              {product.name}
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-gray-500">
              {product.description}
            </p>

            <div className="mt-8 border-y border-black/10 py-5">
              <p className="text-sm text-gray-500">
                Quality products for your sports and beauty needs.
              </p>
            </div>

            {/* SHOPEE BUTTON */}

            <a
              href={product.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex rounded-full bg-black px-8 py-4 text-sm text-white transition duration-300 hover:-translate-y-1 hover:bg-gray-700"
            >
              Buy on Shopee →
            </a>

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
