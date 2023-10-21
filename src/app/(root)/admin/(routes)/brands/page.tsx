'use client';

import { PublicApi, QueryKeys } from '@/utils/constant';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useQuery } from 'react-query';

import { BrandClient } from './components/client';
import { TBrandColumn } from './components/columns';

export default function BrandsPage() {
  const { data, error } = useQuery(QueryKeys.BRANDS, getBrands);

  async function getBrands() {
    return await axios.get(PublicApi.BRANDS);
  }

  if (error) {
    toast.error('Something went wrong!');
  }

  const formattedBrands: TBrandColumn[] = data?.data?.map(
    (item: TBrandColumn) => ({
      id: item.id,
      name: item.name,
    })
  );

  return (
    <main className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <BrandClient data={formattedBrands} />
      </div>
    </main>
  );
}
