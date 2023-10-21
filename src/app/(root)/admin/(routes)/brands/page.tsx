import prismadb from '@/utils/prismadb';

import { BrandClient } from './components/client';
import { TBrandColumn } from './components/columns';

export default async function BrandsPage() {
  const brands = await prismadb.brand.findMany({
    include: {
      products: {
        select: {
          sku: true,
        },
      },
    },
    orderBy: {
      name: 'asc',
    },
  });

  const formattedBrands: TBrandColumn[] = brands.map((item) => ({
    id: item.id,
    name: item.name,
    numberOfProducts: item.products.length,
  }));

  return (
    <main className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <BrandClient data={formattedBrands} />
      </div>
    </main>
  );
}
