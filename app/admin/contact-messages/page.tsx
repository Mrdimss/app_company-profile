import { redirect } from "next/navigation";
import AdminShell from "@/components/AdminShell";
import ContactMessagesManager from "@/components/ContactMessagesManager";
import { getAdminSession } from "@/lib/admin-auth";

export default async function AdminContactMessagesPage() {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <AdminShell
      activePage="contact-messages"
      adminName={session.admin.name}
    >
      <ContactMessagesManager />
    </AdminShell>
  );
}
