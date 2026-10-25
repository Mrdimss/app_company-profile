"use client";

import { useEffect, useState } from "react";

type MessageStatus = "UNREAD" | "READ";
type EmailNotificationStatus = "PENDING" | "SENT" | "FAILED";

type ContactMessageListItem = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: MessageStatus;
  emailNotification: EmailNotificationStatus;
  createdAt: string;
};

type ContactMessage = ContactMessageListItem & {
  message: string;
  phone: string;
  company: string;
  country: string;
  updatedAt: string;
};

type ApiError = {
  error?: unknown;
};

async function responseError(response: Response, fallback: string) {
  const body: ApiError | null = await response.json().catch(() => null);
  return typeof body?.error === "string" ? body.error : fallback;
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export default function ContactMessagesManager() {
  const [messages, setMessages] = useState<ContactMessageListItem[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");
  const [appliedStatus, setAppliedStatus] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isDetailLoading, setIsDetailLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    const params = new URLSearchParams();
    if (appliedSearch) params.set("search", appliedSearch);
    if (appliedStatus) params.set("status", appliedStatus);

    async function loadMessages() {
      setIsLoading(true);
      setError("");

      try {
        const response = await fetch(
          `/api/admin/contact-messages?${params.toString()}`,
          { signal: controller.signal },
        );
        if (!response.ok) {
          throw new Error(await responseError(response, "Daftar pesan gagal dimuat."));
        }

        const result = (await response.json()) as {
          messages: ContactMessageListItem[];
        };
        setMessages(result.messages);
        if (selectedId && !result.messages.some((item) => item.id === selectedId)) {
          setSelectedId(null);
          setSelectedMessage(null);
        }
      } catch (loadError) {
        if (!controller.signal.aborted) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Daftar pesan gagal dimuat.",
          );
        }
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    }

    void loadMessages();
    return () => controller.abort();
  }, [appliedSearch, appliedStatus, refreshKey, selectedId]);

  useEffect(() => {
    if (!selectedId) {
      return;
    }

    const messageId = selectedId;
    const controller = new AbortController();

    async function loadMessage() {
      setIsDetailLoading(true);
      setError("");

      try {
        const response = await fetch(
          `/api/admin/contact-messages/${encodeURIComponent(messageId)}`,
          { signal: controller.signal },
        );
        if (!response.ok) {
          throw new Error(await responseError(response, "Detail pesan gagal dimuat."));
        }

        const result = (await response.json()) as { message: ContactMessage };
        setSelectedMessage(result.message);
        setRefreshKey((value) => value + 1);
      } catch (loadError) {
        if (!controller.signal.aborted) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Detail pesan gagal dimuat.",
          );
        }
      } finally {
        if (!controller.signal.aborted) setIsDetailLoading(false);
      }
    }

    void loadMessage();
    return () => controller.abort();
  }, [selectedId]);

  async function updateStatus() {
    if (!selectedMessage) return;

    setIsSaving(true);
    setError("");
    setNotice("");

    try {
      const status = selectedMessage.status === "READ" ? "UNREAD" : "READ";
      const response = await fetch(
        `/api/admin/contact-messages/${encodeURIComponent(selectedMessage.id)}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        },
      );

      if (!response.ok) {
        throw new Error(await responseError(response, "Status pesan gagal diperbarui."));
      }

      const result = (await response.json()) as { message: ContactMessage };
      setSelectedMessage(result.message);
      setNotice("Status pesan berhasil diperbarui.");
      setRefreshKey((value) => value + 1);
    } catch (saveError) {
      setError(
        saveError instanceof Error
          ? saveError.message
          : "Status pesan gagal diperbarui.",
      );
    } finally {
      setIsSaving(false);
    }
  }

  async function deleteMessage() {
    if (!selectedMessage || !window.confirm("Hapus pesan ini secara permanen?")) {
      return;
    }

    setIsSaving(true);
    setError("");
    setNotice("");

    try {
      const response = await fetch(
        `/api/admin/contact-messages/${encodeURIComponent(selectedMessage.id)}`,
        { method: "DELETE" },
      );
      if (!response.ok) {
        throw new Error(await responseError(response, "Pesan gagal dihapus."));
      }

      setSelectedId(null);
      setSelectedMessage(null);
      setNotice("Pesan berhasil dihapus.");
      setRefreshKey((value) => value + 1);
    } catch (deleteError) {
      setError(
        deleteError instanceof Error
          ? deleteError.message
          : "Pesan gagal dihapus.",
      );
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div>
      <div className="mb-8">
        <p className="text-sm font-medium text-neutral-500">Admin</p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight text-neutral-950">
          Messeges
        </h1>
        <p className="mt-2 text-sm text-neutral-500">
          Kelola pesan yang dikirim melalui formulir Contact.
        </p>
      </div>

      <form
        className="mb-6 flex flex-col gap-3 rounded-lg border border-neutral-200 bg-white p-4 sm:flex-row"
        onSubmit={(event) => {
          event.preventDefault();
          setAppliedSearch(search.trim());
          setAppliedStatus(statusFilter);
          setSelectedId(null);
          setSelectedMessage(null);
          setNotice("");
        }}
      >
        <label className="sr-only" htmlFor="message-search">
          Cari pesan
        </label>
        <input
          id="message-search"
          value={search}
          maxLength={100}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Cari nama, email, atau subject"
          className="min-w-0 flex-1 border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-900"
        />
        <label className="sr-only" htmlFor="message-status">
          Filter status
        </label>
        <select
          id="message-status"
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
          className="border border-neutral-300 bg-white px-3 py-2 text-sm outline-none focus:border-neutral-900"
        >
          <option value="">Semua status</option>
          <option value="UNREAD">Belum dibaca</option>
          <option value="READ">Sudah dibaca</option>
        </select>
        <button
          type="submit"
          className="bg-neutral-950 px-5 py-2 text-sm font-medium text-white hover:bg-neutral-700"
        >
          Cari
        </button>
      </form>

      {error && (
        <p className="mb-4 rounded-md bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
          {error}
        </p>
      )}
      {notice && (
        <p className="mb-4 rounded-md bg-green-50 px-4 py-3 text-sm text-green-700" role="status">
          {notice}
        </p>
      )}

      <div className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <section
          aria-label="Daftar pesan"
          className="divide-y divide-neutral-200 rounded-lg border border-neutral-200 bg-white"
        >
          {isLoading ? (
            <p className="p-5 text-sm text-neutral-500">Memuat pesan...</p>
          ) : messages.length === 0 ? (
            <p className="p-5 text-sm text-neutral-500">Tidak ada pesan ditemukan.</p>
          ) : (
            messages.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setSelectedId(item.id);
                  setSelectedMessage(null);
                  setNotice("");
                }}
                aria-current={selectedId === item.id ? "true" : undefined}
                className={`block w-full px-5 py-4 text-left transition hover:bg-neutral-50 ${
                  selectedId === item.id ? "bg-neutral-50" : ""
                }`}
              >
                <span className="flex items-center justify-between gap-3">
                  <span className="truncate text-sm font-semibold text-neutral-950">
                    {item.name}
                  </span>
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-1 text-xs ${
                      item.status === "UNREAD"
                        ? "bg-amber-100 text-amber-800"
                        : "bg-neutral-100 text-neutral-600"
                    }`}
                  >
                    {item.status === "UNREAD" ? "Belum dibaca" : "Sudah dibaca"}
                  </span>
                </span>
                <span className="mt-1 block truncate text-xs text-neutral-500">
                  {item.email}
                </span>
                <span className="mt-2 block truncate text-sm text-neutral-700">
                  {item.subject}
                </span>
                <span className="mt-1 block truncate text-xs text-neutral-500">
                  {item.message}
                </span>
                <span className="mt-2 block text-xs text-neutral-400">
                  {formatDate(item.createdAt)}
                </span>
              </button>
            ))
          )}
        </section>

        <section
          aria-label="Detail pesan"
          className="min-h-64 rounded-lg border border-neutral-200 bg-white p-5 sm:p-6"
        >
          {!selectedId ? (
            <p className="text-sm text-neutral-500">
              Pilih pesan untuk melihat detailnya.
            </p>
          ) : isDetailLoading ? (
            <p className="text-sm text-neutral-500">Memuat detail pesan...</p>
          ) : selectedMessage ? (
            <>
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-neutral-200 pb-5">
                <div>
                  <p className="text-xs uppercase tracking-wide text-neutral-500">
                    {selectedMessage.status === "UNREAD" ? "Belum dibaca" : "Sudah dibaca"}
                  </p>
                  <h2 className="mt-2 text-xl font-semibold text-neutral-950">
                    {selectedMessage.subject}
                  </h2>
                  <p className="mt-1 text-sm text-neutral-500">
                    {formatDate(selectedMessage.createdAt)}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <a
                    href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
                      selectedMessage.email,
                    )}&su=${encodeURIComponent(
                      `Re: ${selectedMessage.subject}`,
                    )}&body=${encodeURIComponent(
                      `Hello ${selectedMessage.name},\n\nThank you for contacting Girik.\n\n`,
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-neutral-300 px-3 py-2 text-xs font-medium hover:bg-neutral-50"
                  >
                    Reply via Gmail
                  </a>
                  <button
                    type="button"
                    disabled={isSaving}
                    onClick={() => void updateStatus()}
                    className="border border-neutral-300 px-3 py-2 text-xs font-medium hover:bg-neutral-50 disabled:opacity-50"
                  >
                    Tandai {selectedMessage.status === "READ" ? "belum dibaca" : "dibaca"}
                  </button>
                  <button
                    type="button"
                    disabled={isSaving}
                    onClick={() => void deleteMessage()}
                    className="border border-red-200 px-3 py-2 text-xs font-medium text-red-700 hover:bg-red-50 disabled:opacity-50"
                  >
                    Hapus
                  </button>
                </div>
              </div>

              <dl className="grid gap-x-5 gap-y-3 border-b border-neutral-200 py-5 text-sm sm:grid-cols-2">
                <div>
                  <dt className="text-xs text-neutral-500">Nama</dt>
                  <dd className="mt-1 break-words text-neutral-900">{selectedMessage.name}</dd>
                </div>
                <div>
                  <dt className="text-xs text-neutral-500">Email</dt>
                  <dd className="mt-1 break-all text-neutral-900">{selectedMessage.email}</dd>
                </div>
                <div>
                  <dt className="text-xs text-neutral-500">Telepon</dt>
                  <dd className="mt-1 break-words text-neutral-900">{selectedMessage.phone}</dd>
                </div>
                <div>
                  <dt className="text-xs text-neutral-500">Perusahaan</dt>
                  <dd className="mt-1 break-words text-neutral-900">{selectedMessage.company}</dd>
                </div>
                <div>
                  <dt className="text-xs text-neutral-500">Negara</dt>
                  <dd className="mt-1 break-words text-neutral-900">{selectedMessage.country}</dd>
                </div>
                <div>
                  <dt className="text-xs text-neutral-500">Notifikasi email</dt>
                  <dd className="mt-1 text-neutral-900">
                    {selectedMessage.emailNotification === "SENT"
                      ? "Terkirim"
                      : selectedMessage.emailNotification === "FAILED"
                        ? "Gagal dikirim"
                        : "Menunggu"}
                  </dd>
                </div>
              </dl>

              <div className="pt-5">
                <h3 className="text-xs font-medium uppercase tracking-wide text-neutral-500">
                  Pesan
                </h3>
                <p className="mt-3 whitespace-pre-wrap break-words text-sm leading-6 text-neutral-800">
                  {selectedMessage.message}
                </p>
              </div>
            </>
          ) : (
            <p className="text-sm text-neutral-500">
              Detail pesan tidak tersedia.
            </p>
          )}
        </section>
      </div>
    </div>
  );
}
