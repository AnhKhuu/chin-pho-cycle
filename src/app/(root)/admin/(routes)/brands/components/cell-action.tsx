'use client';

import { Button } from '@/components';
import { AdminRoutes } from '@/utils/constant';
import { MoreHorizontal } from 'lucide-react';
import Link from 'next/link';

import { TBrandColumn } from './columns';

interface ICellActionProps {
  data: TBrandColumn;
}

export const CellAction: React.FC<ICellActionProps> = ({ data }) => {
  return (
    <div className='flex justify-center'>
      <Link href={`${AdminRoutes.BRAND}/${data.id}`}>
        <Button variant='ghost' className='h-8 w-8 p-0'>
          <span className='sr-only'>View details</span>
          <MoreHorizontal className='h-4 w-4' />
        </Button>
      </Link>
    </div>
  );
};
