
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
  tokopediaUrl?: string | null;
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
  tokopediaUrl: string;
  icon: string;
  sortOrder: number;
  isPublished: boolean;
};

const inputClassName =
  "mt-2 w-full rounded-xl border border-blue-100 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100/70";

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
    tokopediaUrl: "",
    icon: "",
    sortOrder: 0,
    isPublished: true,
  };
}

function getTitleValue(item: ItemRecord, kind: ContentKind) {
  return kind === "product"
    ? item.name ?? "Produk"
    : item.title ?? "Judul";
}

function getKindIcon(kind: ContentKind) {
  if (kind === "project") return "📁";
  if (kind === "service") return "⚙️";
  return "📦";
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

      if (signal?.aborted) {
        return { items: [], error: null };
      }

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
        error: signal?.aborted
          ? null
          : "Tidak dapat memuat data dari server.",
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
      tokopediaUrl: item.tokopediaUrl ?? "",
      icon: item.icon ?? "",
      sortOrder: item.sortOrder ?? 0,
      isPublished: item.isPublished,
    });

    setImageFile(null);
    setError("");
    setMessage("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  async function handleDelete(id: string) {
    const confirmed = window.confirm(
      "Apakah Anda yakin ingin menghapus data ini?"
    );

    if (!confirmed) return;

    try {
      const response = await fetch(`${apiBase}/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.error ?? "Gagal menghapus data.");
        return;
      }

      setMessage("Data berhasil dihapus.");
      setError("");

      if (editingId === id) {
        resetForm();
      }

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
        formData.append("tokopediaUrl", form.tokopediaUrl);
      }

      formData.append("slug", form.slug);
      formData.append("description", form.description);
      formData.append("isPublished", String(form.isPublished));

      if (imageFile) {
        formData.append("image", imageFile);
      }

      const method = editingId ? "PATCH" : "POST";
      const url = editingId
        ? `${apiBase}/${editingId}`
        : apiBase;

      const response = await fetch(url, {
        method,
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.error ?? "Gagal menyimpan data.");
        return;
      }

      setMessage(
        editingId
          ? "Data berhasil diperbarui."
          : "Data berhasil ditambahkan."
      );

      resetForm();

      await refreshItems(loadAbortController.current?.signal);
    } catch {
      setError("Tidak dapat terhubung ke server.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="relative isolate min-h-screen space-y-8 overflow-hidden rounded-3xl bg-gradient-to-br from-white via-blue-100 to-[#0B1F3A] p-4 sm:p-6 lg:p-8">

      {/* BACKGROUND DECORATION */}
      <div className="pointer-events-none absolute -right-32 -top-32 -z-10 h-[450px] w-[450px] rounded-full bg-blue-300/40 blur-[110px]" />

      <div className="pointer-events-none absolute -bottom-40 -left-32 -z-10 h-[400px] w-[400px] rounded-full bg-sky-300/30 blur-[100px]" />

      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.12] [background-image:radial-gradient(#4778AD_0.7px,transparent_0.7px)] [background-size:24px_24px]" />

      {/* HEADER */}
      <section className="relative overflow-hidden rounded-3xl border border-white/70 bg-gradient-to-br from-white via-blue-50 to-blue-200 p-6 shadow-xl shadow-blue-950/10 backdrop-blur-xl sm:p-8">

        <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full border-[35px] border-blue-300/20" />
        <div className="absolute -bottom-24 right-32 h-48 w-48 rounded-full bg-blue-400/20 blur-3xl" />

        <div className="relative flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-widest text-blue-800 shadow-sm backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              GIRIK Management System
            </div>

            <p className="text-sm font-medium text-blue-700">
              Dashboard / Data Management
            </p>

            <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-[#0B1F3A] sm:text-4xl">
              {title}
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600">
              Kelola informasi {title.toLowerCase()} perusahaan
              dengan mudah melalui administrator GIRIK.
            </p>
          </div>

          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl border border-white/80 bg-gradient-to-br from-blue-700 to-[#0B1F3A] text-4xl text-white shadow-xl shadow-blue-950/20">
            {getKindIcon(kind)}
          </div>
        </div>
      </section>

      {/* SUMMARY */}
      <section className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-white/80 bg-white/85 p-5 shadow-lg shadow-blue-950/5 backdrop-blur-xl">
          <p className="text-xs font-bold uppercase tracking-widest text-blue-600">
            Total Data
          </p>

          <div className="mt-3 flex items-end justify-between">
            <h2 className="text-4xl font-extrabold text-[#0B1F3A]">
              {loading ? "..." : items.length}
            </h2>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-2xl text-blue-700">
              {getKindIcon(kind)}
            </div>
          </div>

          <p className="mt-2 text-sm text-slate-500">
            Jumlah seluruh data {title.toLowerCase()}.
          </p>
        </div>

        <div className="rounded-2xl border border-white/20 bg-gradient-to-br from-[#174477] via-[#0B1F3A] to-[#061326] p-5 text-white shadow-xl shadow-blue-950/15">
          <p className="text-xs font-bold uppercase tracking-widest text-blue-200">
            Status Publikasi
          </p>

          <div className="mt-3 flex items-end justify-between">
            <h2 className="text-4xl font-extrabold">
              {loading
                ? "..."
                : items.filter((item) => item.isPublished).length}
            </h2>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-2xl">
              ✓
            </div>
          </div>

          <p className="mt-2 text-sm text-blue-100/75">
            Data yang ditampilkan di website publik.
          </p>
        </div>
      </section>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="overflow-hidden rounded-3xl border border-white/80 bg-white/90 shadow-xl shadow-blue-950/10 backdrop-blur-xl"
      >
        {/* FORM HEADER */}
        <div className="border-b border-blue-100 bg-gradient-to-r from-white to-blue-50 px-5 py-6 sm:px-7">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-[#0B1F3A] text-2xl text-white shadow-lg shadow-blue-900/20">
              {editingId ? "✎" : "+"}
            </div>

            <div>
              <h2 className="text-xl font-extrabold text-[#0B1F3A]">
                {editingId ? "Edit Data" : "Tambah Data Baru"}
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Lengkapi informasi {title.toLowerCase()} berikut.
              </p>
            </div>
          </div>
        </div>

        {/* FORM BODY */}
        <div className="space-y-6 p-5 sm:p-7">

          {/* TITLE */}
          {kind !== "service" && (
            <label className="block text-sm font-bold text-slate-700">
              {kind === "project" ? "Judul Project" : "Nama Produk"}

              <input
                className={inputClassName}
                onChange={(event) =>
                  handleTitleChange(event.target.value)
                }
                placeholder={
                  kind === "project"
                    ? "Masukkan judul project"
                    : "Masukkan nama produk"
                }
                required
                value={kind === "project" ? form.title : form.name}
              />
            </label>
          )}

          {kind === "service" && (
            <label className="block text-sm font-bold text-slate-700">
              Judul Layanan

              <input
                className={inputClassName}
                onChange={(event) =>
                  handleTitleChange(event.target.value)
                }
                placeholder="Masukkan judul layanan"
                required
                value={form.title}
              />
            </label>
          )}

          {/* SLUG AND CATEGORY */}
          <div className="grid gap-5 md:grid-cols-2">
            <label className="block text-sm font-bold text-slate-700">
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
              <span className="mt-1 block text-xs font-normal text-slate-400">
                URL khusus untuk identitas konten.
              </span>
            </label>

            {kind !== "service" && (
              <label className="block text-sm font-bold text-slate-700">
                Kategori

                <input
                  className={inputClassName}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      category: event.target.value,
                    }))
                  }
                  placeholder="Masukkan kategori"
                  value={form.category}
                />
              </label>
            )}
          </div>

          {/* SERVICE FIELDS */}
          {kind === "service" && (
            <div className="grid gap-5 md:grid-cols-2">
              <label className="block text-sm font-bold text-slate-700">
                Icon / Identifier

                <input
                  className={inputClassName}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      icon: event.target.value,
                    }))
                  }
                  placeholder="Contoh: truck"
                  value={form.icon}
                />
              </label>

              <label className="block text-sm font-bold text-slate-700">
                Urutan Tampil

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

          {/* IMAGE UPLOAD */}
          {(kind === "project" || kind === "product") && (
            <div>
              <label className="block text-sm font-bold text-slate-700">
                Unggah Gambar

                <input
                  accept="image/jpeg,image/png,image/webp"
                  className="mt-2 block w-full rounded-xl border border-blue-100 bg-white p-3 text-sm text-slate-700 file:mr-4 file:rounded-lg file:border-0 file:bg-gradient-to-r file:from-blue-700 file:to-[#0B1F3A] file:px-4 file:py-2 file:text-sm file:font-bold file:text-white hover:file:opacity-90"
                  onChange={(event) =>
                    setImageFile(event.target.files?.[0] ?? null)
                  }
                  type="file"
                />
              </label>

              {imageFile && (
                <div className="mt-3 flex items-center gap-3 rounded-xl border border-blue-100 bg-blue-50 p-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100 text-lg">
                    🖼️
                  </span>

                  <div className="min-w-0">
                    <p className="text-xs font-bold text-blue-800">
                      Gambar dipilih
                    </p>
                    <p className="truncate text-xs text-slate-500">
                      {imageFile.name}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* DESCRIPTION */}
          <label className="block text-sm font-bold text-slate-700">
            Deskripsi

            <textarea
              className={`${inputClassName} min-h-36 resize-y`}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  description: event.target.value,
                }))
              }
              placeholder="Masukkan deskripsi..."
              required
              value={form.description}
            />
          </label>

          {/* PROJECT URL */}
          {kind === "project" && (
            <label className="block text-sm font-bold text-slate-700">
              URL Project

              <input
                className={inputClassName}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    projectUrl: event.target.value,
                  }))
                }
                placeholder="https://..."
                type="url"
                value={form.projectUrl}
              />
            </label>
          )}

          {/* PRODUCT URLS */}
          {kind === "product" && (
            <div className="grid gap-5 md:grid-cols-2">
              <label className="block text-sm font-bold text-slate-700">
                URL Shopee

                <input
                  className={inputClassName}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      productUrl: event.target.value,
                    }))
                  }
                  placeholder="https://shopee.co.id/..."
                  type="url"
                  value={form.productUrl}
                />
              </label>

              <label className="block text-sm font-bold text-slate-700">
                URL Tokopedia

                <input
                  className={inputClassName}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      tokopediaUrl: event.target.value,
                    }))
                  }
                  placeholder="https://www.tokopedia.com/..."
                  type="url"
                  value={form.tokopediaUrl}
                />
              </label>
            </div>
          )}

          {/* PUBLISH STATUS */}
          <label className="flex cursor-pointer items-center gap-4 rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-white p-4 transition hover:border-blue-300">
            <input
              checked={form.isPublished}
              className="h-5 w-5 accent-blue-700"
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  isPublished: event.target.checked,
                }))
              }
              type="checkbox"
            />

            <div>
              <p className="text-sm font-bold text-[#0B1F3A]">
                Tampilkan di website publik
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Aktifkan untuk menampilkan konten kepada pengunjung.
              </p>
            </div>
          </label>
        </div>

        {/* BUTTONS AND MESSAGES */}
        <div className="flex flex-col gap-4 border-t border-blue-100 bg-gradient-to-r from-white to-blue-50/80 p-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
          <div aria-live="polite">
            {error && (
              <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm font-semibold text-red-600">
                {error}
              </p>
            )}

            {message && (
              <p role="status" className="rounded-lg bg-green-50 px-3 py-2 text-sm font-semibold text-green-700">
                {message}
              </p>
            )}
          </div>

          <div className="flex flex-wrap gap-3">
            {editingId && (
              <button
                className="rounded-xl border border-blue-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-blue-50"
                onClick={resetForm}
                type="button"
              >
                Batal
              </button>
            )}

            <button
              className="rounded-xl bg-gradient-to-r from-blue-700 to-[#0B1F3A] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-900/20 transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
              disabled={saving || loading}
              type="submit"
            >
              {saving
                ? "Menyimpan..."
                : editingId
                  ? "Perbarui Data"
                  : "Tambah Data"}
            </button>
          </div>
        </div>
      </form>

      {/* DATA LIST */}
      <section className="overflow-hidden rounded-3xl border border-white/80 bg-white/90 shadow-xl shadow-blue-950/10 backdrop-blur-xl">

        {/* LIST HEADER */}
        <div className="flex flex-col justify-between gap-4 border-b border-blue-100 bg-gradient-to-r from-white to-blue-50 p-5 sm:flex-row sm:items-center sm:px-7">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-blue-600">
              Content Management
            </p>

            <h2 className="mt-2 text-xl font-extrabold text-[#0B1F3A]">
              Daftar {title}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Kelola dan perbarui informasi yang tersimpan.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-blue-100 bg-white px-4 py-3 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-blue-600" />
            <span className="text-sm font-bold text-blue-800">
              {items.length} Data
            </span>
          </div>
        </div>

        {/* LOADING */}
        {loading ? (
          <div className="p-12 text-center">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-blue-100 border-t-blue-700" />
            <p className="mt-4 text-sm font-medium text-slate-500">
              Memuat data...
            </p>
          </div>
        ) : items.length === 0 ? (
          /* EMPTY STATE */
          <div className="p-12 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-100 to-blue-200 text-3xl text-blue-700">
              ◇
            </div>

            <p className="mt-4 font-bold text-[#0B1F3A]">
              Belum Ada Data
            </p>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              {emptyText}
            </p>
          </div>
        ) : (
          /* DATA ITEMS */
          <div className="divide-y divide-blue-100">
            {items.map((item) => (
              <div
                key={item.id}
                className="grid gap-5 p-5 transition-colors hover:bg-blue-50/60 md:grid-cols-[1fr_auto] md:items-center sm:p-6"
              >
                <div className="flex min-w-0 gap-4">

                  {/* IMAGE */}
                  {(kind === "project" || kind === "product") &&
                    item.image && (
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border border-blue-100 bg-blue-50 shadow-sm sm:h-24 sm:w-24">
                        <Image
                          alt={getTitleValue(item, kind)}
                          width={96}
                          height={96}
                          unoptimized
                          className="h-full w-full object-cover"
                          src={item.image}
                        />
                      </div>
                    )}

                  {/* ITEM INFORMATION */}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base font-extrabold text-[#0B1F3A] sm:text-lg">
                        {getTitleValue(item, kind)}
                      </h3>

                      <span
                        className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${
                          item.isPublished
                            ? "border border-emerald-200 bg-emerald-50 text-emerald-700"
                            : "border border-slate-200 bg-slate-100 text-slate-600"
                        }`}
                      >
                        {item.isPublished ? "Published" : "Draft"}
                      </span>
                    </div>

                    <p className="mt-2 break-all text-xs font-medium text-blue-700">
                      Slug: {item.slug}
                    </p>

                    {item.category && (
                      <p className="mt-1 text-xs text-slate-500">
                        Kategori: {item.category}
                      </p>
                    )}

                    <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">
                      {item.description}
                    </p>

                    {/* PRODUCT MARKETPLACE LINKS */}
                    {kind === "product" && (
                      <div className="mt-3 flex flex-col gap-1 text-xs text-slate-500">
                        {item.productUrl && (
                          <p className="break-all">
                            <span className="font-bold text-orange-600">
                              Shopee:
                            </span>{" "}
                            {item.productUrl}
                          </p>
                        )}

                        {item.tokopediaUrl && (
                          <p className="break-all">
                            <span className="font-bold text-green-700">
                              Tokopedia:
                            </span>{" "}
                            {item.tokopediaUrl}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* ACTION BUTTONS */}
                <div className="flex items-center gap-2 md:justify-end">
                  <button
                    className="flex-1 rounded-xl border border-blue-200 bg-white px-5 py-2.5 text-sm font-bold text-blue-800 shadow-sm transition hover:border-blue-500 hover:bg-blue-50 md:flex-none"
                    onClick={() => handleEdit(item)}
                    type="button"
                  >
                    ✎ Edit
                  </button>

                  <button
                    className="flex-1 rounded-xl border border-red-200 bg-red-50 px-5 py-2.5 text-sm font-bold text-red-600 transition hover:border-red-300 hover:bg-red-100 md:flex-none"
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

      {/* FOOTER */}
      <footer className="pb-2 text-center">
        <p className="text-xs font-medium text-white/80">
          © {new Date().getFullYear()} GIRIK Administration System.
          All rights reserved.
        </p>
      </footer>
    </div>
  );
}
