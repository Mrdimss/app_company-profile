
import Link from "next/link";
import type { ReactNode } from "react";
import LogoutButton from "@/components/LogoutButton";

type AdminShellProps = {
  activePage:
    | "dashboard"
    | "settings"
    | "projects"
    | "services"
    | "products"
    | "contact-messages";
  adminName: string;
  children: ReactNode;
};

const navigation = [
  { href: "/admin/dashboard", label: "Dashboard", page: "dashboard" },
  { href: "/admin/projects", label: "Project", page: "projects" },
  { href: "/admin/services", label: "Service", page: "services" },
  { href: "/admin/products", label: "Product", page: "products" },
  {
    href: "/admin/contact-messages",
    label: "Messages",
    page: "contact-messages",
  },
  { href: "/admin/settings", label: "Settings", page: "settings" },
] as const;

export default function AdminShell({
  activePage,
  adminName,
  children,
}: AdminShellProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-white via-blue-50 to-blue-200 text-slate-900 md:grid md:grid-cols-[250px_minmax(0,1fr)]">

      {/* Dekorasi Background */}
      <div className="pointer-events-none fixed -right-32 -top-32 h-96 w-96 rounded-full bg-blue-300/30 blur-3xl" />
      <div className="pointer-events-none fixed -bottom-32 left-1/3 h-96 w-96 rounded-full bg-blue-400/20 blur-3xl" />

      {/* Sidebar */}
      <aside className="relative z-10 border-b border-white/10 bg-gradient-to-b from-[#0B1F3A] via-[#102D50] to-[#174477] text-white shadow-xl md:min-h-screen md:border-b-0 md:border-r md:border-white/10">

        {/* Logo */}
        <div className="flex h-20 items-center border-b border-white/10 px-6">
          <Link
            href="/admin/dashboard"
            className="flex items-center gap-2"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-lg font-bold text-white shadow-inner">
              G
            </div>

            <div>
              <p className="text-lg font-bold tracking-widest">GIRIK</p>
              <p className="text-[10px] font-medium tracking-[0.25em] text-blue-200">
                ADMIN PANEL
              </p>
            </div>
          </Link>
        </div>

        {/* Navigasi */}
        <nav
          aria-label="Navigasi admin"
          className="flex gap-2 overflow-x-auto p-4 md:flex-col"
        >
          <p className="mb-2 hidden px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-200/60 md:block">
            Main Menu
          </p>

          {navigation.map((item) => {
            const active = item.page === activePage;

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`group flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                  active
                    ? "bg-white text-[#0B1F3A] shadow-lg shadow-blue-950/20"
                    : "text-blue-100 hover:bg-white/10 hover:text-white"
                }`}
              >
                <span
                  className={`h-2 w-2 rounded-full transition ${
                    active
                      ? "bg-blue-600"
                      : "bg-blue-200/40 group-hover:bg-white"
                  }`}
                />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="hidden border-t border-white/10 p-5 md:block">
          <p className="text-xs text-blue-200/70">
            GIRIK Company Profile
          </p>
          <p className="mt-1 text-[10px] text-blue-200/40">
            Administration System
          </p>
        </div>
      </aside>

      {/* Main Content */}
      <div className="relative z-10 min-w-0">

        {/* Header */}
        <header className="sticky top-0 z-20 flex h-20 items-center justify-between border-b border-blue-100/70 bg-white/75 px-5 shadow-sm backdrop-blur-xl sm:px-8">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-blue-600">
              GIRIK Administration
            </p>
            <p className="mt-1 text-sm font-semibold text-[#0B1F3A]">
              Welcome back, {adminName}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-xs font-semibold text-slate-800">
                Administrator
              </p>
              <p className="text-[11px] text-slate-500">
                Management Panel
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-700 to-[#0B1F3A] text-sm font-bold text-white shadow-md">
              {adminName.charAt(0).toUpperCase()}
            </div>

            <LogoutButton />
          </div>
        </header>

        {/* Content */}
        <main className="mx-auto w-full max-w-7xl px-5 py-8 sm:px-8 sm:py-10">

          {/* Content Container */}
          <div className="rounded-2xl border border-white/80 bg-white/75 p-5 shadow-xl shadow-blue-900/5 backdrop-blur-md sm:p-8">
            {children}
          </div>

          {/* Footer */}
          <footer className="mt-8 pb-4 text-center text-xs text-slate-500">
            © {new Date().getFullYear()} GIRIK. All rights reserved.
          </footer>
        </main>
      </div>
    </div>
  );
}
