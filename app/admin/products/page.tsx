import { redirect } from "next/navigation";
import ContentManager from "@/components/ContentManager";
import AdminShell from "@/components/AdminShell";
import { getAdminSession } from "@/lib/admin-auth";

export default async function AdminProductsPage() {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <AdminShell activePage="products" adminName={session.admin.name}>
      <ContentManager
        kind="product"
        title="Product"
        emptyText="Belum ada produk yang ditambahkan."
      />
    </AdminShell>
  );
}
