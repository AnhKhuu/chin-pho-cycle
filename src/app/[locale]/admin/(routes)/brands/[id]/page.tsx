'use client';

import { AdminRoutes, PrivateApi, QueryKeys } from '@/utils/constant';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useMutation, useQuery } from 'react-query';

import { BrandForm, TBrandFormValues } from './components/brand-form';

export default function BrandPage({ params }: { params: { id: string } }) {
  const router = useRouter();

  const { data: brand } = useQuery(
    [QueryKeys.BRAND, params.id],
    async () => await axios.get(`${PrivateApi.BRANDS}/${params.id}`)
  );

  const createBrand = useMutation(
    async (data: TBrandFormValues) => await axios.post(PrivateApi.BRANDS, data),
    {
      onSuccess: () => {
        toast.success('Brand created!');
      },
      onError: () => {
        toast.error('Something went wrong');
      },
    }
  );

  const updateBrand = useMutation(
    async (data: TBrandFormValues) =>
      await axios.patch(`${PrivateApi.BRANDS}/${params.id}`, data),
    {
      onSuccess: () => {
        toast.success('Brand updated!');
      },
      onError: () => {
        toast.error('Something went wrong');
      },
    }
  );

  const deleteBrand = useMutation(
    async () => await axios.delete(`${PrivateApi.BRANDS}/${params.id}`),
    {
      onSuccess: () => {
        toast.success('Brand deleted!');
        router.push(AdminRoutes.BRANDS);
      },
      onError: () => {
        toast.error('Make sure you removed all products of this brand!');
      },
    }
  );

  const handleCreateBrand = (data: TBrandFormValues) => {
    createBrand.mutate(data);
  };

  const handleUpdateBrand = (data: TBrandFormValues) => {
    updateBrand.mutate(data);
  };

  const handleDeleteBrand = () => {
    deleteBrand.mutate();
  };

  return (
    <main className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        {brand && (
          <BrandForm
            initialData={brand.data}
            createBrand={handleCreateBrand}
            updateBrand={handleUpdateBrand}
            deleteBrand={handleDeleteBrand}
          />
        )}
      </div>
    </main>
  );
}
