"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type CompanySettings = {
  companyName: string;
  tagline: string | null;
  logoUrl: string | null;
  logoAltText: string;
  email: string | null;
  phone: string | null;
  address: string | null;
};

const inputClassName =
  "mt-2 w-full border border-neutral-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-neutral-900";

export default function CompanySettingsForm() {
  const [settings, setSettings] = useState<CompanySettings>({
    companyName: "GIRIK",
    tagline: "Trade & Distribution Company",
    logoUrl: null,
    logoAltText: "Company logo",
    email: "hello@company.com",
    phone: "+62 812 3456 7890",
    address: "Jakarta, Indonesia",
  });

  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadSettings() {
      try {
        const response = await fetch("/api/settings/company");
        const result = await response.json();

        if (!response.ok) {
          setError(result.error ?? "Gagal memuat pengaturan perusahaan.");
          return;
        }

        setSettings({
          companyName: result.company.companyName ?? "GIRIK",
          tagline: result.company.tagline ?? "",
          logoUrl: result.company.logoUrl ?? null,
          logoAltText: result.company.logoAltText ?? "Company logo",
          email: result.company.email ?? "",
          phone: result.company.phone ?? "",
          address: result.company.address ?? "",
        });
      } catch {
        setError("Tidak dapat memuat pengaturan perusahaan.");
      } finally {
        setLoading(false);
      }
    }

    void loadSettings();
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");
    setSaving(true);

    try {
      const formData = new FormData();
      formData.append("companyName", settings.companyName);
      formData.append("tagline", settings.tagline ?? "");
      formData.append("logoAltText", settings.logoAltText);
      formData.append("email", settings.email ?? "");
      formData.append("phone", settings.phone ?? "");
      formData.append("address", settings.address ?? "");

      if (logoFile) {
        formData.append("logo", logoFile);
      }

      const response = await fetch("/api/settings/company", {
        method: "PATCH",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.error ?? "Pengaturan perusahaan gagal disimpan.");
        return;
      }

      setSettings((current) => ({
        ...current,
        companyName: result.company.companyName ?? current.companyName,
        tagline: result.company.tagline ?? current.tagline,
        logoUrl: result.company.logoUrl ?? current.logoUrl,
        logoAltText: result.company.logoAltText ?? current.logoAltText,
        email: result.company.email ?? current.email,
        phone: result.company.phone ?? current.phone,
        address: result.company.address ?? current.address,
      }));
      setLogoFile(null);
      setMessage("Pengaturan perusahaan berhasil disimpan.");
    } catch {
      setError("Tidak dapat terhubung ke server.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl border border-neutral-200 bg-white">
      <div className="space-y-5 p-5 sm:p-7">
        <div className="grid gap-5 md:grid-cols-2">
          <label className="block text-sm font-medium text-neutral-700">
            Nama perusahaan
            <input
              className={inputClassName}
              maxLength={100}
              onChange={(event) =>
                setSettings((current) => ({
                  ...current,
                  companyName: event.target.value,
                }))
              }
              required
              value={settings.companyName}
            />
          </label>

          <label className="block text-sm font-medium text-neutral-700">
            Tagline
            <input
              className={inputClassName}
              maxLength={160}
              onChange={(event) =>
                setSettings((current) => ({
                  ...current,
                  tagline: event.target.value,
                }))
              }
              value={settings.tagline ?? ""}
            />
          </label>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <label className="block text-sm font-medium text-neutral-700">
            Email
            <input
              className={inputClassName}
              onChange={(event) =>
                setSettings((current) => ({
                  ...current,
                  email: event.target.value,
                }))
              }
              type="email"
              value={settings.email ?? ""}
            />
          </label>

          <label className="block text-sm font-medium text-neutral-700">
            Telepon
            <input
              className={inputClassName}
              onChange={(event) =>
                setSettings((current) => ({
                  ...current,
                  phone: event.target.value,
                }))
              }
              value={settings.phone ?? ""}
            />
          </label>
        </div>

        <label className="block text-sm font-medium text-neutral-700">
          Alamat
          <input
            className={inputClassName}
            maxLength={255}
            onChange={(event) =>
              setSettings((current) => ({
                ...current,
                address: event.target.value,
              }))
            }
            value={settings.address ?? ""}
          />
        </label>

        <label className="block text-sm font-medium text-neutral-700">
          Teks alt logo
          <input
            className={inputClassName}
            maxLength={160}
            onChange={(event) =>
              setSettings((current) => ({
                ...current,
                logoAltText: event.target.value,
              }))
            }
            value={settings.logoAltText}
          />
        </label>

        <div>
          <label className="block text-sm font-medium text-neutral-700">
            Unggah logo baru
            <input
              className="mt-2 block w-full text-sm text-neutral-700 file:mr-4 file:border file:border-neutral-300 file:bg-white file:px-3 file:py-2 file:text-sm file:font-medium file:text-neutral-900"
              onChange={(event) => setLogoFile(event.target.files?.[0] ?? null)}
              type="file"
              accept="image/jpeg,image/png,image/webp"
            />
          </label>
        </div>

        {settings.logoUrl && (
          <div className="overflow-hidden rounded-lg border border-neutral-200 bg-neutral-50 p-3">
            <p className="mb-3 text-xs uppercase tracking-[0.2em] text-neutral-500">Preview logo</p>
            <Image
              alt={settings.logoAltText || settings.companyName}
              width={320}
              height={160}
              unoptimized
              className="max-h-20 w-auto object-contain"
              src={settings.logoUrl}
            />
          </div>
        )}
      </div>

      <div className="flex flex-col items-start gap-3 border-t border-neutral-200 p-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
        <div aria-live="polite">
          {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
          {message && <p role="status" className="text-sm text-green-700">{message}</p>}
        </div>
        <button
          className="bg-neutral-950 px-4 py-2.5 text-sm font-medium text-white hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={saving || loading}
          type="submit"
        >
          {saving ? "Menyimpan..." : "Simpan pengaturan"}
        </button>
      </div>
    </form>
  );
}
