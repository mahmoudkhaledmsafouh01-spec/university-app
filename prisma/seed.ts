import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding DB...");

  await prisma.user.deleteMany();

  const hashed = await bcrypt.hash("admin123", 10);

  await prisma.user.create({
    data: {
      email: "admin@example.com",
      name: "Admin",
      password: hashed,
      role: "ADMIN",
    },
  });

  console.log("✔️ Seed completed!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
