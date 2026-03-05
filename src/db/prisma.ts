import { PrismaPg } from '@prisma/adapter-pg'; // or the adapter for your database
import { PrismaClient } from '@/lib/schema/generated/prisma/client';
import { env } from '@/lib/schema/env/server';

const adapter = new PrismaPg({ connectionString: env.DATABASE_URL });
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });
if (env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
