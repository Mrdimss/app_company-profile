
import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/admin-auth";
import AdminShell from "@/components/AdminShell";
import Link from "next/link";

const dashboardMenus = [
  {
    title: "Project",
    description: "Kelola project dan portofolio perusahaan.",
    href: "/admin/projects",
    icon: "📁",
    number: "01",
    color: "from-blue-500 to-blue-700",
  },
  {
    title: "Service",
    description: "Kelola layanan profesional perusahaan.",
    href: "/admin/services",
    icon: "⚙️",
    number: "02",
    color: "from-indigo-500 to-indigo-700",
  },
  {
    title: "Product",
    description: "Kelola produk dan tautan marketplace.",
    href: "/admin/products",
    icon: "📦",
    number: "03",
    color: "from-sky-500 to-cyan-700",
  },
  {
    title: "Settings",
    description: "Atur logo dan informasi perusahaan.",
    href: "/admin/settings",
    icon: "🎨",
    number: "04",
    color: "from-slate-600 to-slate-800",
  },
  {
    title: "Messages",
    description: "Lihat pesan dari pengunjung website.",
    href: "/admin/contact-messages",
    icon: "✉️",
    number: "05",
    color: "from-cyan-500 to-blue-800",
  },
];

export default async function AdminDashboardPage() {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  const firstName = session.admin.name
    .trim()
    .split(" ")[0];

  return (
    <AdminShell
      activePage="dashboard"
      adminName={session.admin.name}
    >
      <div className="relative isolate">

        {/* Background Decoration */}
        <div className="pointer-events-none absolute -right-20 -top-20 -z-10 h-72 w-72 rounded-full bg-blue-400/20 blur-[100px]" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 -z-10 h-72 w-72 rounded-full bg-indigo-500/10 blur-[100px]" />

        {/* Welcome Section */}
        <section className="relative mb-9 overflow-hidden rounded-3xl bg-gradient-to-br from-white via-blue-50 to-blue-200 p-6 shadow-lg shadow-blue-950/5 sm:p-9">

          <div className="absolute -right-10 -top-20 h-64 w-64 rounded-full border-[35px] border-blue-300/20" />
          <div className="absolute -bottom-24 right-32 h-48 w-48 rounded-full bg-blue-400/20 blur-3xl" />

          <div className="relative flex flex-col justify-between gap-7 md:flex-row md:items-center">

            <div className="max-w-2xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/70 px-4 py-2 text-xs font-bold uppercase tracking-widest text-blue-800 shadow-sm backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-green-500" />
                Administration Dashboard
              </div>

              <h1 className="text-3xl font-extrabold tracking-tight text-[#0B1F3A] sm:text-4xl lg:text-5xl">
                Welcome Back,
                <span className="mt-1 block bg-gradient-to-r from-blue-700 to-[#0B1F3A] bg-clip-text text-transparent">
                  {firstName}!
                </span>
              </h1>

              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
                Selamat datang di dashboard administrator GIRIK.
                Kelola seluruh informasi dan konten website perusahaan
                dengan mudah melalui satu tempat.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  href="/admin/projects"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#0B1F3A] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-950/20 transition-all hover:-translate-y-1 hover:bg-blue-800"
                >
                  Mulai Kelola
                  <span>→</span>
                </Link>

                <span className="inline-flex items-center gap-2 rounded-xl border border-blue-200 bg-white/70 px-4 py-3 text-sm font-medium text-slate-600 backdrop-blur">
                  <span className="text-blue-700">✦</span>
                  GIRIK Management
                </span>
              </div>
            </div>

            {/* Welcome Illustration */}
            <div className="hidden shrink-0 items-center justify-center md:flex">
              <div className="flex h-40 w-40 items-center justify-center rounded-[2rem] border border-white/70 bg-gradient-to-br from-blue-700 to-[#0B1F3A] shadow-2xl shadow-blue-950/20 lg:h-48 lg:w-48">
                <div className="text-center">
                  <p className="text-6xl font-black tracking-widest text-white">
                    G
                  </p>
                  <p className="mt-2 text-xs font-semibold tracking-[0.3em] text-blue-200">
                    GIRIK
                  </p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Admin Information */}
        <section className="mb-10 grid gap-5 lg:grid-cols-2">

          {/* Admin Profile */}
          <div className="group relative overflow-hidden rounded-2xl border border-blue-100 bg-white/80 p-6 shadow-lg shadow-blue-950/5 backdrop-blur-xl transition-all hover:shadow-xl">

            <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-blue-100 blur-2xl transition-all group-hover:bg-blue-200" />

            <div className="relative flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-[#0B1F3A] text-2xl font-bold text-white shadow-lg shadow-blue-900/20">
                {session.admin.name.charAt(0).toUpperCase()}
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold uppercase tracking-widest text-blue-600">
                  Administrator Profile
                </p>

                <h2 className="mt-2 truncate text-xl font-bold text-[#0B1F3A]">
                  {session.admin.name}
                </h2>

                <p className="mt-1 break-all text-sm text-slate-500">
                  {session.admin.email}
                </p>

                <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700">
                  <span className="h-2 w-2 rounded-full bg-green-500" />
                  Account Active
                </div>
              </div>
            </div>
          </div>

          {/* System Information */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#174477] via-[#0B1F3A] to-[#061326] p-6 text-white shadow-xl shadow-blue-950/15">

            <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-blue-400/20 blur-3xl" />

            <div className="relative">
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-200">
                  System Overview
                </p>
                <span className="rounded-lg border border-white/20 bg-white/10 px-3 py-1 text-xs text-blue-100">
                  GIRIK
                </span>
              </div>

              <h2 className="mt-5 text-2xl font-bold">
                Website Management
              </h2>

              <p className="mt-2 max-w-md text-sm leading-6 text-blue-100/75">
                Satu platform untuk mengelola project, layanan,
                produk, dan informasi perusahaan secara terpusat.
              </p>

              <div className="mt-6 flex items-center gap-3 border-t border-white/15 pt-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-400/15 text-green-300">
                  ✓
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">
                    Management System
                  </p>
                  <p className="text-xs text-blue-200">
                    Sistem administrator siap digunakan
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Management Menu */}
        <section>

          <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-700">
                Management Center
              </p>

              <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-[#0B1F3A]">
                Pengelolaan Website
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Pilih menu untuk mulai mengelola website GIRIK.
              </p>
            </div>

            <div className="inline-flex w-fit items-center gap-2 rounded-xl border border-blue-100 bg-white/80 px-4 py-2 text-xs font-semibold text-slate-600 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-blue-600" />
              5 Management Menus
            </div>
          </div>

          {/* Menu Cards */}
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {dashboardMenus.map((menu) => (
              <Link
                key={menu.href}
                href={menu.href}
                className="group relative overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-br from-white via-white to-blue-50 p-6 shadow-md shadow-blue-950/5 transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-900/10"
              >
                {/* Decorative Number */}
                <span className="absolute right-5 top-4 text-4xl font-black text-blue-100/70 transition-colors group-hover:text-blue-200">
                  {menu.number}
                </span>

                {/* Icon */}
                <div
                  className={`relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${menu.color} text-2xl text-white shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}
                >
                  {menu.icon}
                </div>

                {/* Text */}
                <div className="relative mt-6">
                  <h3 className="text-lg font-bold text-[#0B1F3A] transition-colors group-hover:text-blue-700">
                    {menu.title}
                  </h3>

                  <p className="mt-2 min-h-12 text-sm leading-6 text-slate-500">
                    {menu.description}
                  </p>
                </div>

                {/* Action */}
                <div className="mt-6 flex items-center justify-between border-t border-blue-100 pt-4">
                  <span className="text-sm font-bold text-blue-800">
                    Kelola sekarang
                  </span>

                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-800 transition-all duration-300 group-hover:translate-x-1 group-hover:bg-[#0B1F3A] group-hover:text-white">
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-10 border-t border-blue-200/70 pt-6 text-center">
          <p className="text-xs font-medium text-slate-500">
            © {new Date().getFullYear()} GIRIK Administration System.
            All rights reserved.
          </p>
        </footer>

      </div>
    </AdminShell>
  );
}
