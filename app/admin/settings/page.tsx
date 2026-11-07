
import { redirect } from "next/navigation";
import AdminProfileForm from "@/components/AdminProfileForm";
import AdminSecurityForm from "@/components/AdminSecurityForm";
import AdminShell from "@/components/AdminShell";
import CompanySettingsForm from "@/components/CompanySettingsForm";
import { getAdminSession } from "@/lib/admin-auth";

export default async function AdminSettingsPage() {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <AdminShell activePage="settings" adminName={session.admin.name}>
      <div className="relative">

        {/* Background Decoration */}
        <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-blue-300/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-16 h-64 w-64 rounded-full bg-blue-400/10 blur-3xl" />

        <div className="relative z-10">

          {/* Page Heading */}
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
              Admin / Settings
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#0B1F3A]">
              Pengaturan
            </h1>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Kelola informasi perusahaan, profil administrator, dan keamanan
              akun GIRIK.
            </p>

            <div className="mt-5 h-1 w-20 rounded-full bg-gradient-to-r from-blue-700 to-blue-300" />
          </div>

          <div className="space-y-8">

            {/* Company Settings */}
            <section
              aria-labelledby="branding-heading"
              className="overflow-hidden rounded-2xl border border-blue-100 bg-white/85 shadow-xl shadow-blue-900/5 backdrop-blur-md"
            >
              <div className="border-b border-blue-100 bg-gradient-to-r from-[#0B1F3A] to-[#174477] px-6 py-5">
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 text-xl text-white">
                    🏢
                  </div>

                  <div>
                    <h2
                      id="branding-heading"
                      className="text-lg font-bold text-white"
                    >
                      Perusahaan
                    </h2>

                    <p className="mt-1 text-xs text-blue-100">
                      Identitas dan informasi perusahaan
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <p className="mb-6 text-sm leading-6 text-slate-500">
                  Kelola nama, logo, dan informasi perusahaan yang tampil di
                  website publik.
                </p>

                <CompanySettingsForm />
              </div>
            </section>

            {/* Admin Profile */}
            <section
              aria-labelledby="profile-heading"
              className="overflow-hidden rounded-2xl border border-blue-100 bg-white/85 shadow-xl shadow-blue-900/5 backdrop-blur-md"
            >
              <div className="border-b border-blue-100 bg-gradient-to-r from-[#0B1F3A] to-[#174477] px-6 py-5">
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 text-xl text-white">
                    👤
                  </div>

                  <div>
                    <h2
                      id="profile-heading"
                      className="text-lg font-bold text-white"
                    >
                      Profil Administrator
                    </h2>

                    <p className="mt-1 text-xs text-blue-100">
                      Informasi akun administrator
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <p className="mb-6 text-sm leading-6 text-slate-500">
                  Kelola nama dan email akun admin yang digunakan untuk
                  mengakses dashboard.
                </p>

                <AdminProfileForm
                  initialName={session.admin.name}
                  initialEmail={session.admin.email}
                />
              </div>
            </section>

            {/* Admin Security */}
            <section
              aria-labelledby="security-heading"
              className="overflow-hidden rounded-2xl border border-blue-100 bg-white/85 shadow-xl shadow-blue-900/5 backdrop-blur-md"
            >
              <div className="border-b border-blue-100 bg-gradient-to-r from-[#0B1F3A] to-[#174477] px-6 py-5">
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 text-xl text-white">
                    🔒
                  </div>

                  <div>
                    <h2
                      id="security-heading"
                      className="text-lg font-bold text-white"
                    >
                      Keamanan Akun
                    </h2>

                    <p className="mt-1 text-xs text-blue-100">
                      Perlindungan akses administrator
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <p className="mb-6 text-sm leading-6 text-slate-500">
                  Ubah password secara berkala untuk menjaga keamanan akun
                  administrator.
                </p>

                <AdminSecurityForm />
              </div>
            </section>

          </div>
        </div>
      </div>
    </AdminShell>
  );
}
