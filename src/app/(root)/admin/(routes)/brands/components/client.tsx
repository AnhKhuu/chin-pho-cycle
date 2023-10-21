'use client';

import { Button, DataTable, Heading, Separator } from '@/components';
import { AdminRoutes } from '@/utils/constant';
import { Plus } from 'lucide-react';
import Link from 'next/link';

import { TBrandColumn, columns } from './columns';

interface IBrandsClientProps {
  data: TBrandColumn[];
}

export const BrandClient: React.FC<IBrandsClientProps> = ({ data }) => {
  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading
          title={`Brands ${data ? `(${data.length})` : ''}`}
          description='Manage brands for your store'
        />
        <Link href={`${AdminRoutes.BRANDS}/create`}>
          <Button>
            <Plus className='mr-2 h-4 w-4' />
            Add New
          </Button>
        </Link>
      </div>
      <Separator />
      {data && <DataTable columns={columns} data={data} />}
    </>
  );
};
