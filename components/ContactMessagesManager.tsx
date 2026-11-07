
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
  const [selectedMessage, setSelectedMessage] =
    useState<ContactMessage | null>(null);
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
          throw new Error(
            await responseError(response, "Daftar pesan gagal dimuat."),
          );
        }

        const result = (await response.json()) as {
          messages: ContactMessageListItem[];
        };

        setMessages(result.messages);

        if (
          selectedId &&
          !result.messages.some((item) => item.id === selectedId)
        ) {
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
    if (!selectedId) return;

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
          throw new Error(
            await responseError(response, "Detail pesan gagal dimuat."),
          );
        }

        const result = (await response.json()) as {
          message: ContactMessage;
        };

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
      const status =
        selectedMessage.status === "READ" ? "UNREAD" : "READ";

      const response = await fetch(
        `/api/admin/contact-messages/${encodeURIComponent(selectedMessage.id)}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        },
      );

      if (!response.ok) {
        throw new Error(
          await responseError(response, "Status pesan gagal diperbarui."),
        );
      }

      const result = (await response.json()) as {
        message: ContactMessage;
      };

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
    if (
      !selectedMessage ||
      !window.confirm("Hapus pesan ini secara permanen?")
    ) {
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
        throw new Error(
          await responseError(response, "Pesan gagal dihapus."),
        );
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
    <div className="relative">

      {/* Background Decoration */}
      <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-blue-300/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-blue-400/10 blur-3xl" />

      <div className="relative z-10">

        {/* Page Heading */}
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            Admin / Messages
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#0B1F3A]">
            Messages
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Kelola dan pantau pesan yang dikirim melalui formulir Contact
            GIRIK.
          </p>

          <div className="mt-5 h-1 w-20 rounded-full bg-gradient-to-r from-blue-700 to-blue-300" />
        </div>

        {/* Search and Filter */}
        <form
          className="mb-6 flex flex-col gap-3 rounded-2xl border border-blue-100 bg-white/80 p-4 shadow-lg shadow-blue-900/5 backdrop-blur-md sm:flex-row"
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
            placeholder="Cari nama, email, atau subject..."
            className="min-w-0 flex-1 rounded-xl border border-blue-100 bg-blue-50/50 px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
          />

          <label className="sr-only" htmlFor="message-status">
            Filter status
          </label>

          <select
            id="message-status"
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="rounded-xl border border-blue-100 bg-blue-50/50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="">Semua status</option>
            <option value="UNREAD">Belum dibaca</option>
            <option value="READ">Sudah dibaca</option>
          </select>

          <button
            type="submit"
            className="rounded-xl bg-gradient-to-r from-[#0B1F3A] to-[#174477] px-6 py-3 text-sm font-semibold text-white shadow-md shadow-blue-900/15 transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            Cari Pesan
          </button>
        </form>

        {/* Error and Notice */}
        {error && (
          <p
            className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            role="alert"
          >
            {error}
          </p>
        )}

        {notice && (
          <p
            className="mb-4 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700"
            role="status"
          >
            {notice}
          </p>
        )}

        {/* Message List and Detail */}
        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">

          {/* Message List */}
          <section
            aria-label="Daftar pesan"
            className="overflow-hidden rounded-2xl border border-blue-100 bg-white/85 shadow-xl shadow-blue-900/5 backdrop-blur-md"
          >
            <div className="border-b border-blue-100 bg-gradient-to-r from-[#0B1F3A] to-[#174477] px-5 py-4">
              <h2 className="text-sm font-semibold text-white">
                Daftar Pesan Masuk
              </h2>
              <p className="mt-1 text-xs text-blue-100">
                Pilih pesan untuk melihat detail
              </p>
            </div>

            {isLoading ? (
              <p className="p-5 text-sm text-slate-500">
                Memuat pesan...
              </p>
            ) : messages.length === 0 ? (
              <p className="p-5 text-sm text-slate-500">
                Tidak ada pesan ditemukan.
              </p>
            ) : (
              <div className="divide-y divide-blue-50">
                {messages.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setSelectedId(item.id);
                      setSelectedMessage(null);
                      setNotice("");
                    }}
                    aria-current={
                      selectedId === item.id ? "true" : undefined
                    }
                    className={`block w-full px-5 py-4 text-left transition ${
                      selectedId === item.id
                        ? "border-l-4 border-blue-600 bg-blue-50"
                        : "border-l-4 border-transparent hover:bg-blue-50/70"
                    }`}
                  >
                    <span className="flex items-center justify-between gap-3">
                      <span className="truncate text-sm font-semibold text-[#0B1F3A]">
                        {item.name}
                      </span>

                      <span
                        className={`shrink-0 rounded-full px-3 py-1 text-[11px] font-semibold ${
                          item.status === "UNREAD"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {item.status === "UNREAD"
                          ? "Belum dibaca"
                          : "Sudah dibaca"}
                      </span>
                    </span>

                    <span className="mt-1 block truncate text-xs text-slate-500">
                      {item.email}
                    </span>

                    <span className="mt-2 block truncate text-sm font-medium text-slate-700">
                      {item.subject}
                    </span>

                    <span className="mt-1 block truncate text-xs text-slate-500">
                      {item.message}
                    </span>

                    <span className="mt-3 block text-[11px] text-slate-400">
                      {formatDate(item.createdAt)}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </section>

          {/* Message Detail */}
          <section
            aria-label="Detail pesan"
            className="min-h-64 overflow-hidden rounded-2xl border border-blue-100 bg-white/85 shadow-xl shadow-blue-900/5 backdrop-blur-md"
          >
            <div className="border-b border-blue-100 bg-gradient-to-r from-[#0B1F3A] to-[#174477] px-5 py-4">
              <h2 className="text-sm font-semibold text-white">
                Detail Pesan
              </h2>
              <p className="mt-1 text-xs text-blue-100">
                Informasi lengkap pesan dari pengunjung
              </p>
            </div>

            <div className="p-5 sm:p-6">
              {!selectedId ? (
                <div className="flex min-h-52 flex-col items-center justify-center text-center">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-2xl text-blue-700">
                    ✉
                  </div>
                  <p className="text-sm font-semibold text-[#0B1F3A]">
                    Belum Ada Pesan Dipilih
                  </p>
                  <p className="mt-2 text-xs text-slate-500">
                    Pilih pesan dari daftar untuk melihat detailnya.
                  </p>
                </div>
              ) : isDetailLoading ? (
                <p className="py-10 text-center text-sm text-slate-500">
                  Memuat detail pesan...
                </p>
              ) : selectedMessage ? (
                <>
                  <div className="flex flex-wrap items-start justify-between gap-4 border-b border-blue-100 pb-5">
                    <div>
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                          selectedMessage.status === "UNREAD"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {selectedMessage.status === "UNREAD"
                          ? "Belum dibaca"
                          : "Sudah dibaca"}
                      </span>

                      <h2 className="mt-3 text-xl font-bold text-[#0B1F3A]">
                        {selectedMessage.subject}
                      </h2>

                      <p className="mt-2 text-xs text-slate-500">
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
                        className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-blue-700"
                      >
                        Reply via Gmail
                      </a>

                      <button
                        type="button"
                        disabled={isSaving}
                        onClick={() => void updateStatus()}
                        className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-xs font-semibold text-[#174477] transition hover:bg-blue-100 disabled:opacity-50"
                      >
                        Tandai{" "}
                        {selectedMessage.status === "READ"
                          ? "belum dibaca"
                          : "dibaca"}
                      </button>

                      <button
                        type="button"
                        disabled={isSaving}
                        onClick={() => void deleteMessage()}
                        className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-700 transition hover:bg-red-100 disabled:opacity-50"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>

                  {/* Sender Information */}
                  <dl className="grid gap-x-5 gap-y-5 border-b border-blue-100 py-5 text-sm sm:grid-cols-2">
                    {[
                      { label: "Nama", value: selectedMessage.name },
                      { label: "Email", value: selectedMessage.email },
                      { label: "Telepon", value: selectedMessage.phone },
                      { label: "Perusahaan", value: selectedMessage.company },
                      { label: "Negara", value: selectedMessage.country },
                    ].map((item) => (
                      <div key={item.label}>
                        <dt className="text-xs font-medium text-slate-400">
                          {item.label}
                        </dt>
                        <dd className="mt-1 break-words font-medium text-slate-800">
                          {item.value || "-"}
                        </dd>
                      </div>
                    ))}

                    <div>
                      <dt className="text-xs font-medium text-slate-400">
                        Notifikasi Email
                      </dt>
                      <dd className="mt-1">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                            selectedMessage.emailNotification === "SENT"
                              ? "bg-green-100 text-green-700"
                              : selectedMessage.emailNotification === "FAILED"
                                ? "bg-red-100 text-red-700"
                                : "bg-amber-100 text-amber-700"
                          }`}
                        >
                          {selectedMessage.emailNotification === "SENT"
                            ? "Terkirim"
                            : selectedMessage.emailNotification === "FAILED"
                              ? "Gagal dikirim"
                              : "Menunggu"}
                        </span>
                      </dd>
                    </div>
                  </dl>

                  {/* Message Content */}
                  <div className="pt-5">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-blue-700">
                      Isi Pesan
                    </h3>

                    <div className="mt-3 rounded-xl border border-blue-100 bg-gradient-to-br from-blue-50/80 to-white p-4">
                      <p className="whitespace-pre-wrap break-words text-sm leading-7 text-slate-700">
                        {selectedMessage.message}
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <p className="py-10 text-center text-sm text-slate-500">
                  Detail pesan tidak tersedia.
                </p>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
