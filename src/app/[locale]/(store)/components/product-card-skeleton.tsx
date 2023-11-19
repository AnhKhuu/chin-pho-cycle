import { Skeleton } from '@/components';
import React from 'react';

export default function ProductCardSkeleton() {
  return (
    <div className='mb-4'>
      <Skeleton className='h-52 w-full sm:h-80 lg:h-80 xl:h-96' />
      <Skeleton className='mb-2 mt-4 h-5 w-full' />
      <Skeleton className='mb-2 h-5 w-2/3' />
      <Skeleton className='h-5 w-1/3' />
    </div>
  );
}
