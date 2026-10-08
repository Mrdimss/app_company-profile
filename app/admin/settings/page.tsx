import { redirect } from "next/navigation";
import AdminProfileForm from "@/components/AdminProfileForm";
import AdminSecurityForm from "@/components/AdminSecurityForm";
import AdminShell from "@/components/AdminShell";
import { getAdminSession } from "@/lib/admin-auth";

export default async function AdminSettingsPage() {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <AdminShell activePage="settings" adminName={session.admin.name}>
      <div className="mb-8">
        <p className="text-sm font-medium text-neutral-500">Admin</p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight text-neutral-950">
          Pengaturan
        </h1>
      </div>
      <div className="space-y-8">
        <section aria-labelledby="profile-heading">
          <div className="mb-4">
            <h2 id="profile-heading" className="text-xl font-semibold">Profil</h2>
            <p className="mt-1 text-sm text-neutral-500">Kelola nama dan email akun admin.</p>
          </div>
          <AdminProfileForm
            initialName={session.admin.name}
            initialEmail={session.admin.email}
          />
        </section>

        <section aria-labelledby="security-heading">
          <div className="mb-4">
            <h2 id="security-heading" className="text-xl font-semibold">Keamanan</h2>
            <p className="mt-1 text-sm text-neutral-500">Ubah password untuk akun admin.</p>
          </div>
          <AdminSecurityForm />
        </section>
      </div>
    </AdminShell>
  );
}