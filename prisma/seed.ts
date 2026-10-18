
import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const name = process.env.ADMIN_NAME;
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;

  if (!name || !email || !password) {
    throw new Error(
      "ADMIN_NAME, ADMIN_EMAIL, dan ADMIN_PASSWORD wajib diisi di .env"
    );
  }

  if (password.length < 12) {
    throw new Error("Password admin minimal 12 karakter.");
  }

  const existingAdmin = await prisma.adminUser.findUnique({
    where: { email },
  });

  if (existingAdmin) {
    console.log(`Admin ${email} sudah tersedia. Tidak ada perubahan.`);
    return;
  }

  const passwordHash = await hash(password, 12);

  const admin = await prisma.adminUser.create({
    data: {
      name,
      email,
      passwordHash,
    },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });

  console.log("Admin berhasil dibuat:", admin);
}

main()
  .catch((error) => {
    console.error("Seed admin gagal:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
