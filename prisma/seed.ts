import { PrismaClient } from '@prisma/client';

import brands from './json/brands.json';
import colors from './json/colors.json';
import products from './json/products.json';
import sizes from './json/sizes.json';
import types from './json/types.json';

const prisma = new PrismaClient();

async function main() {
  // INSERT MOCK DATA
  await prisma.brand.createMany({ data: brands });
  await prisma.productType.createMany({ data: types });
  await prisma.productSize.createMany({ data: sizes });
  await prisma.productColor.createMany({ data: colors });
  await prisma.product.createMany({ data: products });

  // DELETE ALL DATA
  // await prisma.brand.deleteMany();
  // await prisma.productType.deleteMany();
  // await prisma.productSize.deleteMany();
  // await prisma.productColor.deleteMany();
  // await prisma.product.deleteMany();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
