import Link from "next/link";
import type { ReactNode } from "react";
import LogoutButton from "@/components/LogoutButton";

type AdminShellProps = {
  activePage: "dashboard" | "settings";
  adminName: string;
  children: ReactNode;
};

const navigation = [
  { href: "/admin/dashboard", label: "Dashboard", page: "dashboard" },
  { href: "/admin/settings", label: "Pengaturan", page: "settings" },
] as const;

export default function AdminShell({
  activePage,
  adminName,
  children,
}: AdminShellProps) {
  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-950 md:grid md:grid-cols-[220px_minmax(0,1fr)]">
      <aside className="border-b border-neutral-200 bg-white md:min-h-screen md:border-b-0 md:border-r">
        <div className="flex h-16 items-center border-b border-neutral-200 px-5">
          <Link href="/admin/dashboard" className="font-semibold tracking-wide">
            GIRIK <span className="ml-1 text-xs font-normal text-neutral-500">ADMIN</span>
          </Link>
        </div>
        <nav aria-label="Navigasi admin" className="flex gap-1 overflow-x-auto p-3 md:flex-col">
          {navigation.map((item) => {
            const active = item.page === activePage;

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`shrink-0 px-3 py-2 text-sm ${
                  active
                    ? "bg-neutral-100 font-medium text-neutral-950"
                    : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-950"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      <div className="min-w-0">
        <header className="flex h-16 items-center justify-between border-b border-neutral-200 bg-white px-5 sm:px-8">
          <p className="truncate text-sm text-neutral-600">{adminName}</p>
          <LogoutButton />
        </header>
        <main className="mx-auto w-full max-w-5xl px-5 py-8 sm:px-8 sm:py-10">
          {children}
        </main>
      </div>
    </div>
  );
}