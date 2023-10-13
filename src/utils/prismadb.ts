import { PrismaClient } from '@prisma/client';

declare global {
  /* eslint-disable */
  var prisma: PrismaClient | undefined;
}

const prismadb = globalThis.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalThis.prisma = prismadb; // prevent hot reload recreating Prisma client

export default prismadb;
