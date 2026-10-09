import { NextResponse } from "next/server";
import { deleteAdminSession } from "@/lib/admin-auth";

export const runtime = "nodejs";

export async function POST() {
  try {
    await deleteAdminSession();
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Admin logout failed:", error);
    return NextResponse.json(
      { error: "Logout gagal. Silakan coba lagi." },
      { status: 500 },
    );
  }
}