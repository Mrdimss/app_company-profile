import { redirect } from "next/navigation";
import ContentManager from "@/components/ContentManager";
import AdminShell from "@/components/AdminShell";
import { getAdminSession } from "@/lib/admin-auth";

export default async function AdminProjectsPage() {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <AdminShell activePage="projects" adminName={session.admin.name}>
      <ContentManager
        kind="project"
        title="Project"
        emptyText="Belum ada project yang ditambahkan."
      />
    </AdminShell>
  );
}
