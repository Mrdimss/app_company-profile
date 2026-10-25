"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { slugify } from "@/lib/slugify";

type ContentKind = "project" | "service" | "product";

type ItemRecord = {
  id: string;
  title?: string | null;
  name?: string | null;
  slug: string;
  description: string;
  image?: string | null;
  category?: string | null;
  projectUrl?: string | null;
  productUrl?: string | null;
  icon?: string | null;
  sortOrder?: number | null;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
};

type FormState = {
  title: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  projectUrl: string;
  productUrl: string;
  icon: string;
  sortOrder: number;
  isPublished: boolean;
};

const inputClassName =
  "mt-2 w-full border border-neutral-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-neutral-900";

function getApiBase(kind: ContentKind) {
  return kind === "project"
    ? "/api/projects"
    : kind === "service"
      ? "/api/services"
      : "/api/products";
}

function getDefaultState(): FormState {
  return {
    title: "",
    name: "",
    slug: "",
    description: "",
    category: "",
    projectUrl: "",
    productUrl: "",
    icon: "",
    sortOrder: 0,
    isPublished: true,
  };
}

function getTitleValue(item: ItemRecord, kind: ContentKind) {
  if (kind === "product") {
    return item.name ?? "Produk";
  }

  return item.title ?? "Judul";
}

export default function ContentManager({
  kind,
  title,
  emptyText,
}: {
  kind: ContentKind;
  title: string;
  emptyText: string;
}) {
  const [items, setItems] = useState<ItemRecord[]>([]);
  const [loadedApiBase, setLoadedApiBase] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [form, setForm] = useState<FormState>(getDefaultState);

  const apiBase = getApiBase(kind);
  const loading = loadedApiBase !== apiBase;
  const titleField = kind === "product" ? "name" : "title";
  const loadAbortController = useRef<AbortController | null>(null);

  function handleTitleChange(value: string) {
    setForm((current) => ({
      ...current,
      [titleField]: value,
      slug: slugify(value),
    }));
  }

  const loadItems = useCallback(async (signal?: AbortSignal) => {
    try {
      const response = await fetch(`${apiBase}?all=true`, { signal });
      const result = await response.json();

      if (signal?.aborted) return { items: [], error: null };

      if (!response.ok) {
        return {
          items: [],
          error: result.error ?? "Gagal memuat data.",
        };
      }

      return {
        items: Array.isArray(result.items) ? result.items : [],
        error: null,
      };
    } catch {
      return {
        items: [],
        error: signal?.aborted ? null : "Tidak dapat memuat data dari server.",
      };
    }
  }, [apiBase]);

  useEffect(() => {
    const controller = new AbortController();
    loadAbortController.current = controller;
    let isCurrent = true;

    async function load() {
      const result = await loadItems(controller.signal);

      if (!isCurrent || controller.signal.aborted) return;

      if (result.error) {
        setError(result.error);
      } else {
        setItems(result.items);
        setError("");
      }
      setLoadedApiBase(apiBase);
    }

    void load();

    return () => {
      isCurrent = false;
      controller.abort();
      if (loadAbortController.current === controller) {
        loadAbortController.current = null;
      }
    };
  }, [apiBase, loadItems]);

  const refreshItems = useCallback(async (signal?: AbortSignal) => {
    const result = await loadItems(signal);

    if (signal?.aborted) return;

    if (result.error) {
      setError(result.error);
    } else {
      setItems(result.items);
      setError("");
    }
    setLoadedApiBase(apiBase);
  }, [apiBase, loadItems]);

  function resetForm() {
    setEditingId(null);
    setImageFile(null);
    setForm(getDefaultState());
  }

  function handleEdit(item: ItemRecord) {
    setEditingId(item.id);
    setForm({
      title: item.title ?? "",
      name: item.name ?? "",
      slug: item.slug ?? "",
      description: item.description ?? "",
      category: item.category ?? "",
      projectUrl: item.projectUrl ?? "",
      productUrl: item.productUrl ?? "",
      icon: item.icon ?? "",
      sortOrder: item.sortOrder ?? 0,
      isPublished: item.isPublished,
    });
    setImageFile(null);
  }

  async function handleDelete(id: string) {
    const confirmed = window.confirm("Apakah Anda yakin ingin menghapus data ini?");

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(`${apiBase}/${id}`, { method: "DELETE" });
      const result = await response.json();

      if (!response.ok) {
        setError(result.error ?? "Gagal menghapus data.");
        return;
      }

      setMessage("Data berhasil dihapus.");
      setError("");
      await refreshItems(loadAbortController.current?.signal);
    } catch {
      setError("Tidak dapat menghapus data.");
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");
    setSaving(true);

    try {
      const formData = new FormData();
      const recordValue = kind === "product" ? form.name : form.title;

      if (recordValue.trim().length === 0) {
        setError("Judul atau nama wajib diisi.");
        setSaving(false);
        return;
      }

      if (kind === "project") {
        formData.append("title", form.title);
        formData.append("category", form.category);
        formData.append("projectUrl", form.projectUrl);
      }

      if (kind === "service") {
        formData.append("title", form.title);
        formData.append("icon", form.icon);
        formData.append("sortOrder", String(form.sortOrder));
      }

      if (kind === "product") {
        formData.append("name", form.name);
        formData.append("category", form.category);
        formData.append("productUrl", form.productUrl);
      }

      formData.append("slug", form.slug);
      formData.append("description", form.description);
      formData.append("isPublished", String(form.isPublished));

      if (imageFile) {
        formData.append("image", imageFile);
      }

      const method = editingId ? "PATCH" : "POST";
      const url = editingId ? `${apiBase}/${editingId}` : apiBase;
      const response = await fetch(url, {
        method,
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.error ?? "Gagal menyimpan data.");
        return;
      }

      setMessage(editingId ? "Data berhasil diperbarui." : "Data berhasil ditambahkan.");
      resetForm();
      await refreshItems(loadAbortController.current?.signal);
    } catch {
      setError("Tidak dapat terhubung ke server.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-neutral-500">Data</p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight text-neutral-950">{title}</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="border border-neutral-200 bg-white">
        <div className="space-y-5 p-5 sm:p-7">
          {kind !== "service" && (
            <label className="block text-sm font-medium text-neutral-700">
              {kind === "project" ? "Judul project" : "Nama produk"}
              <input
                className={inputClassName}
                onChange={(event) => handleTitleChange(event.target.value)}
                required
                value={kind === "project" ? form.title : form.name}
              />
            </label>
          )}

          {kind === "service" && (
            <label className="block text-sm font-medium text-neutral-700">
              Judul layanan
              <input
                className={inputClassName}
                onChange={(event) => handleTitleChange(event.target.value)}
                required
                value={form.title}
              />
            </label>
          )}

          <div className="grid gap-5 md:grid-cols-2">
            <label className="block text-sm font-medium text-neutral-700">
              Slug
              <input
                className={inputClassName}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    slug: event.target.value,
                  }))
                }
                placeholder="contoh-judul"
                required
                value={form.slug}
              />
            </label>

            {kind !== "service" && (
              <label className="block text-sm font-medium text-neutral-700">
                Kategori
                <input
                  className={inputClassName}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      category: event.target.value,
                    }))
                  }
                  value={form.category}
                />
              </label>
            )}
          </div>

          {kind === "service" && (
            <div className="grid gap-5 md:grid-cols-2">
              <label className="block text-sm font-medium text-neutral-700">
                Icon / identifier
                <input
                  className={inputClassName}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      icon: event.target.value,
                    }))
                  }
                  value={form.icon}
                />
              </label>

              <label className="block text-sm font-medium text-neutral-700">
                Urutan tampil
                <input
                  className={inputClassName}
                  min={0}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      sortOrder: Number(event.target.value) || 0,
                    }))
                  }
                  type="number"
                  value={form.sortOrder}
                />
              </label>
            </div>
          )}

          {(kind === "project" || kind === "product") && (
            <div>
              <label className="block text-sm font-medium text-neutral-700">
                Unggah gambar
                <input
                  accept="image/jpeg,image/png,image/webp"
                  className="mt-2 block w-full text-sm text-neutral-700 file:mr-4 file:border file:border-neutral-300 file:bg-white file:px-3 file:py-2 file:text-sm file:font-medium file:text-neutral-900"
                  onChange={(event) => setImageFile(event.target.files?.[0] ?? null)}
                  type="file"
                />
              </label>
            </div>
          )}

          <label className="block text-sm font-medium text-neutral-700">
            Deskripsi
            <textarea
              className={`${inputClassName} min-h-32`}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  description: event.target.value,
                }))
              }
              required
              value={form.description}
            />
          </label>

          {kind === "project" && (
            <label className="block text-sm font-medium text-neutral-700">
              URL project
              <input
                className={inputClassName}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    projectUrl: event.target.value,
                  }))
                }
                type="url"
                value={form.projectUrl}
              />
            </label>
          )}

          {kind === "product" && (
            <label className="block text-sm font-medium text-neutral-700">
              URL produk
              <input
                className={inputClassName}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    productUrl: event.target.value,
                  }))
                }
                type="url"
                value={form.productUrl}
              />
            </label>
          )}

          <label className="flex items-center gap-3 text-sm font-medium text-neutral-700">
            <input
              checked={form.isPublished}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  isPublished: event.target.checked,
                }))
              }
              type="checkbox"
            />
            Tampilkan di website publik
          </label>
        </div>

        <div className="flex flex-col items-start gap-3 border-t border-neutral-200 p-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
          <div aria-live="polite">
            {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
            {message && <p role="status" className="text-sm text-green-700">{message}</p>}
          </div>
          <div className="flex gap-3">
            {editingId && (
              <button
                className="border border-neutral-300 bg-white px-4 py-2.5 text-sm font-medium text-neutral-900 hover:bg-neutral-50"
                onClick={resetForm}
                type="button"
              >
                Batal
              </button>
            )}
            <button
              className="bg-neutral-950 px-4 py-2.5 text-sm font-medium text-white hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={saving || loading}
              type="submit"
            >
              {saving ? "Menyimpan..." : editingId ? "Perbarui data" : "Tambah data"}
            </button>
          </div>
        </div>
      </form>

      <section className="border border-neutral-200 bg-white">
        <div className="border-b border-neutral-200 p-5">
          <h2 className="text-xl font-semibold text-neutral-950">Daftar {title}</h2>
        </div>

        {loading ? (
          <div className="p-5 text-sm text-neutral-500">Memuat data...</div>
        ) : items.length === 0 ? (
          <div className="p-5 text-sm text-neutral-500">{emptyText}</div>
        ) : (
          <div className="divide-y divide-neutral-200">
            {items.map((item) => (
              <div key={item.id} className="grid gap-5 p-5 md:grid-cols-[1fr_auto] md:items-start">
                <div className="flex gap-4">
                  {(kind === "project" || kind === "product") && item.image && (
                    <Image
                      alt={getTitleValue(item, kind)}
                      width={80}
                      height={80}
                      unoptimized
                      className="h-20 w-20 rounded-md border border-neutral-200 object-cover"
                      src={item.image}
                    />
                  )}
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg font-medium text-neutral-950">{getTitleValue(item, kind)}</h3>
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.15em] ${
                          item.isPublished ? "bg-emerald-100 text-emerald-700" : "bg-neutral-200 text-neutral-600"
                        }`}
                      >
                        {item.isPublished ? "Published" : "Draft"}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-neutral-500">Slug: {item.slug}</p>
                    <p className="mt-2 line-clamp-3 text-sm text-neutral-700">{item.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    className="border border-neutral-300 bg-white px-3 py-2 text-sm font-medium text-neutral-900 hover:bg-neutral-50"
                    onClick={() => handleEdit(item)}
                    type="button"
                  >
                    Edit
                  </button>
                  <button
                    className="border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-100"
                    onClick={() => void handleDelete(item.id)}
                    type="button"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
