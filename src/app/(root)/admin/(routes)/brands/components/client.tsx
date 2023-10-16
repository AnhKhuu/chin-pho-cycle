'use client';

import { Button, DataTable, Heading, Separator } from '@/components';
import { AdminRouteTypes } from '@/utils/constant';
import { Plus } from 'lucide-react';
import Link from 'next/link';

import { BrandColumn, columns } from './columns';

interface BrandsClientProps {
  data: BrandColumn[];
}

export const BrandClient: React.FC<BrandsClientProps> = ({ data }) => {
  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading
          title={`Brands (${data.length})`}
          description='Manage brands for your store'
        />
        <Link href={`${AdminRouteTypes.BRAND_PAGE}/new`}>
          <Button>
            <Plus className='mr-2 h-4 w-4' />
            Add New
          </Button>
        </Link>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} />
    </>
  );
};
