import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/admin-auth";
import AdminShell from "@/components/AdminShell";
import Link from "next/link";

export default async function AdminDashboardPage() {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <AdminShell activePage="dashboard" adminName={session.admin.name}>
      <div className="mb-8">
        <p className="text-sm font-medium text-neutral-500">Ringkasan</p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight text-neutral-950">
          Selamat datang, {session.admin.name}
        </h1>
      </div>

      <section className="grid gap-4 sm:grid-cols-2">
        <div className="border border-neutral-200 bg-white p-5">
          <p className="text-sm text-neutral-500">Akun admin</p>
          <p className="mt-2 font-medium text-neutral-950">{session.admin.name}</p>
          <p className="mt-1 text-sm text-neutral-600">{session.admin.email}</p>
        </div>
        <div className="flex flex-col items-start justify-between gap-5 border border-neutral-200 bg-white p-5">
          <div>
            <p className="text-sm text-neutral-500">Pengaturan akun</p>
            <p className="mt-2 text-sm text-neutral-700">
              Perbarui nama, email, atau password admin.
            </p>
          </div>
          <Link
            href="/admin/settings"
            className="text-sm font-medium text-neutral-950 underline underline-offset-4"
          >
            Buka pengaturan
          </Link>
        </div>
      </section>
    </AdminShell>
  );
}