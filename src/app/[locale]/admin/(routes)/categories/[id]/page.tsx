'use client';

import { AdminRoutes, PrivateApi, QueryKeys } from '@/utils/constant';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useMutation, useQuery } from 'react-query';

import CategoryForm from './components/category-form';

type TCategoryData = {
  value: string;
};

type TSubCategory = {
  value: string;
};

export default function Page({ params }: { params: { id: string } }) {
  const router = useRouter();

  const { data: category, refetch } = useQuery(
    [QueryKeys.CATEGORY, params.id],
    async () => await axios.get(`${PrivateApi.CATEGORIES}/${params.id}`)
  );

  const createCategory = useMutation(
    async (data: TCategoryData) =>
      await axios.post(PrivateApi.CATEGORIES, data),
    {
      onSuccess: () => {
        toast.success('Category created!');
        router.push(AdminRoutes.CATEGORIES);
      },
      onError: () => {
        toast.error('Something went wrong');
      },
    }
  );

  const updateCategory = useMutation(
    async (data: TCategoryData) =>
      await axios.patch(`${PrivateApi.CATEGORIES}/${params.id}`, data),
    {
      onSuccess: () => {
        toast.success('Category updated!');
        router.push(AdminRoutes.CATEGORIES);
      },
      onError: () => {
        toast.error('Something went wrong');
      },
    }
  );

  const deleteCategory = useMutation(
    async () => await axios.delete(`${PrivateApi.CATEGORIES}/${params.id}`),
    {
      onSuccess: () => {
        toast.success('Category deleted!');
        router.push(AdminRoutes.CATEGORIES);
      },
      onError: () => {
        toast.error(
          'Make sure you removed all sub-categories of this category!'
        );
      },
    }
  );

  const createSubCategory = useMutation(
    async (data: TSubCategory) =>
      await axios.post(PrivateApi.SUB_CATEGORIES, {
        ...data,
        categoryId: params.id,
      }),
    {
      onSuccess: () => {
        refetch();
        toast.success('Sub-category created!');
      },
      onError: () => {
        toast.error('Something went wrong');
      },
    }
  );

  const updateSubCategory = useMutation(
    async (options: { subCategoryId: string; data: TSubCategory }) =>
      await axios.patch(
        `${PrivateApi.SUB_CATEGORIES}/${options.subCategoryId}`,
        options.data
      ),
    {
      onSuccess: () => {
        refetch();
        toast.success('Sub-category updated!');
      },
      onError: () => {
        toast.error('Something went wrong');
      },
    }
  );

  const deleteSubCategory = useMutation(
    async (subCategoryId: string) =>
      await axios.delete(`${PrivateApi.SUB_CATEGORIES}/${subCategoryId}`),
    {
      onSuccess: () => {
        refetch();
        toast.success('Sub-category deleted!');
      },
      onError: () => {
        toast.error('Something went wrong');
      },
    }
  );

  const handleCreateCategory = (data: TCategoryData) => {
    createCategory.mutate(data);
  };

  const handleUpdateCategory = (data: TCategoryData) => {
    updateCategory.mutate(data);
  };

  const handleDeleteCategory = () => {
    deleteCategory.mutate();
  };

  const handleCreateSubCategory = (data: TSubCategory) => {
    createSubCategory.mutate(data);
  };

  const handleUpdateSubCategory = (options: {
    subCategoryId: string;
    data: TSubCategory;
  }) => {
    updateSubCategory.mutate(options);
  };

  const handleDeleteSubCategory = (subCategoryId: string) => {
    deleteSubCategory.mutate(subCategoryId);
  };

  return (
    <main className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        {category && (
          <>
            <CategoryForm
              initialData={category.data}
              createCategory={handleCreateCategory}
              updateCategory={handleUpdateCategory}
              deleteCategory={handleDeleteCategory}
              createSubCategory={handleCreateSubCategory}
              updateSubCategory={handleUpdateSubCategory}
              deleteSubCategory={handleDeleteSubCategory}
            />
          </>
        )}
      </div>
    </main>
  );
}
