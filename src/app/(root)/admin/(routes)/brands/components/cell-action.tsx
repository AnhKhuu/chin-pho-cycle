'use client';

import { Button } from '@/components';
import { MoreHorizontal } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { BrandColumn } from './columns';

interface CellActionProps {
  data: BrandColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();

  return (
    <div className='flex justify-center'>
      <Button
        variant='ghost'
        className='h-8 w-8 p-0'
        onClick={() => router.push(`/admin/brands/${data.id}`)}
      >
        <span className='sr-only'>View details</span>
        <MoreHorizontal className='h-4 w-4' />
      </Button>
    </div>
  );
};
