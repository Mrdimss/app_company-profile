"use client";

import { FormEvent, useState } from "react";

const inputClassName =
  "mt-2 w-full border border-neutral-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-neutral-900";

export default function AdminSecurityForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setError("");

    if (newPassword !== confirmPassword) {
      setError("Konfirmasi password baru tidak cocok.");
      return;
    }

    setSaving(true);

    try {
      const response = await fetch("/api/admin/settings/security", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword, confirmPassword }),
      });
      const result = await response.json();

      if (!response.ok) {
        setError(result.error ?? "Password gagal diubah.");
        return;
      }

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setMessage("Password berhasil diubah.");
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
          Password saat ini
          <input
            autoComplete="current-password"
            className={inputClassName}
            onChange={(event) => setCurrentPassword(event.target.value)}
            required
            type="password"
            value={currentPassword}
          />
        </label>
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block text-sm font-medium text-neutral-700">
            Password baru
            <input
              autoComplete="new-password"
              className={inputClassName}
              minLength={12}
              onChange={(event) => setNewPassword(event.target.value)}
              required
              type="password"
              value={newPassword}
            />
          </label>
          <label className="block text-sm font-medium text-neutral-700">
            Konfirmasi password baru
            <input
              autoComplete="new-password"
              className={inputClassName}
              minLength={12}
              onChange={(event) => setConfirmPassword(event.target.value)}
              required
              type="password"
              value={confirmPassword}
            />
          </label>
        </div>
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
          {saving ? "Menyimpan..." : "Ubah password"}
        </button>
      </div>
    </form>
  );
}