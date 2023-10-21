import prismadb from '@/utils/prismadb';

import { BrandForm } from './components/brand-form';

export default async function BrandPage({
  params,
}: {
  params: { id: string };
}) {
  const brand = await prismadb.brand.findUnique({
    where: {
      id: params.id,
    },
  });

  return (
    <main className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <BrandForm initialData={brand} />
      </div>
    </main>
  );
}
