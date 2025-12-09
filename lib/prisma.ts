import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

const defaultDatabaseUrl =
  "postgresql://postgres:postgres@localhost:5432/universitydb";

if (!process.env.DATABASE_URL) {
  console.warn(
    `DATABASE_URL is not set. Using default local connection string: ${defaultDatabaseUrl}`
  );
  process.env.DATABASE_URL = defaultDatabaseUrl;
}

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
