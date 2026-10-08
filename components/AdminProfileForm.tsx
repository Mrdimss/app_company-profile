"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

type AdminProfileFormProps = {
  initialName: string;
  initialEmail: string;
};

const inputClassName =
  "mt-2 w-full border border-neutral-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-neutral-900";

export default function AdminProfileForm({
  initialName,
  initialEmail,
}: AdminProfileFormProps) {
  const router = useRouter();
  const [name, setName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setError("");
    setSaving(true);

    try {
      const response = await fetch("/api/admin/settings/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });
      const result = await response.json();

      if (!response.ok) {
        setError(result.error ?? "Profil gagal disimpan.");
        return;
      }

      setName(result.admin.name);
      setEmail(result.admin.email);
      setMessage("Profil berhasil disimpan.");
      router.refresh();
    } catch {
      setError("Tidak dapat terhubung ke server. Silakan coba lagi.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl border border-neutral-200 bg-white">
      <div className="space-y-5 p-5 sm:p-7">
        <label className="block text-sm font-medium text-neutral-700">
          Nama
          <input
            autoComplete="name"
            className={inputClassName}
            maxLength={100}
            onChange={(event) => setName(event.target.value)}
            required
            value={name}
          />
        </label>
        <label className="block text-sm font-medium text-neutral-700">
          Email
          <input
            autoComplete="email"
            className={inputClassName}
            maxLength={254}
            onChange={(event) => setEmail(event.target.value)}
            required
            type="email"
            value={email}
          />
        </label>
      </div>
      <div className="flex flex-col items-start gap-3 border-t border-neutral-200 p-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
        <div aria-live="polite">
          {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
          {message && <p role="status" className="text-sm text-green-700">{message}</p>}
        </div>
        <button
          className="bg-neutral-950 px-4 py-2.5 text-sm font-medium text-white hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={saving}
          type="submit"
        >
          {saving ? "Menyimpan..." : "Simpan profil"}
        </button>
      </div>
    </form>
  );
}