import { redirect } from "next/navigation";
import ContentManager from "@/components/ContentManager";
import AdminShell from "@/components/AdminShell";
import { getAdminSession } from "@/lib/admin-auth";

export default async function AdminServicesPage() {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <AdminShell activePage="services" adminName={session.admin.name}>
      <ContentManager
        kind="service"
        title="Service"
        emptyText="Belum ada layanan yang ditambahkan."
      />
    </AdminShell>
  );
}
