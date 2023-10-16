'use client';

import { Button } from '@/components';
import { AdminRouteTypes } from '@/utils/constant';
import { MoreHorizontal } from 'lucide-react';
import Link from 'next/link';

import { BrandColumn } from './columns';

interface CellActionProps {
  data: BrandColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  return (
    <div className='flex justify-center'>
      <Link href={`${AdminRouteTypes.BRAND_PAGE}/${data.id}`}>
        <Button variant='ghost' className='h-8 w-8 p-0'>
          <span className='sr-only'>View details</span>
          <MoreHorizontal className='h-4 w-4' />
        </Button>
      </Link>
    </div>
  );
};
