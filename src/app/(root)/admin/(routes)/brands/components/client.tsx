'use client';

import { Button, DataTable, Heading, Separator } from '@/components';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { BrandColumn, columns } from './columns';

interface BrandsClientProps {
  data: BrandColumn[];
}

export const BrandClient: React.FC<BrandsClientProps> = ({ data }) => {
  const router = useRouter();

  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading
          title={`Brands (${data.length})`}
          description='Manage brands for your store'
        />
        <Button onClick={() => router.push('/admin/brands/new')}>
          <Plus className='mr-2 h-4 w-4' />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} />
    </>
  );
};
