'use client';

import { AdminRouteTypes, BaseUrl, QueryKeys } from '@/utils/constant';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useMutation, useQuery } from 'react-query';

import CategoryForm from './components/category-form';

type CategoryData = {
  value: string;
};

type SubCategory = {
  value: string;
};

export default function Page({ params }: { params: { id: string } }) {
  const router = useRouter();

  const { data: category, refetch } = useQuery(
    [QueryKeys.CATEGORY, params.id],
    async () => await axios.get(`${BaseUrl.CATEGORIES}/${params.id}`)
  );

  const createCategory = useMutation(
    async (data: CategoryData) => await axios.post(BaseUrl.CATEGORIES, data),
    {
      onSuccess: () => {
        toast.success('Category created!');
        router.push(AdminRouteTypes.CATEGORY);
      },
      onError: () => {
        toast.error('Something went wrong');
      },
    }
  );

  const updateCategory = useMutation(
    async (data: CategoryData) =>
      await axios.patch(`${BaseUrl.CATEGORIES}/${params.id}`, data),
    {
      onSuccess: () => {
        toast.success('Category updated!');
        router.push(AdminRouteTypes.CATEGORY);
      },
      onError: () => {
        toast.error('Something went wrong');
      },
    }
  );

  const deleteCategory = useMutation(
    async () => await axios.delete(`${BaseUrl.CATEGORIES}/${params.id}`),
    {
      onSuccess: () => {
        toast.success('Category deleted!');
        router.push(AdminRouteTypes.CATEGORY);
      },
      onError: () => {
        toast.error(
          'Make sure you removed all sub categories of this category!'
        );
      },
    }
  );

  const createSubCategory = useMutation(
    async (data: SubCategory) =>
      await axios.post(BaseUrl.SUB_CATEGORIES, {
        ...data,
        categoryId: params.id,
      }),
    {
      onSuccess: () => {
        refetch();
        toast.success('Sub category created!');
      },
      onError: () => {
        toast.error('Something went wrong');
      },
    }
  );

  const updateSubCategory = useMutation(
    async (options: { subCategoryId: string; data: SubCategory }) =>
      await axios.patch(
        `${BaseUrl.SUB_CATEGORIES}/${options.subCategoryId}`,
        options.data
      ),
    {
      onSuccess: () => {
        refetch();
        toast.success('Sub category updated!');
      },
      onError: () => {
        toast.error('Something went wrong');
      },
    }
  );

  const deleteSubCategory = useMutation(
    async (subCategoryId: string) =>
      await axios.delete(`${BaseUrl.SUB_CATEGORIES}/${subCategoryId}`),
    {
      onSuccess: () => {
        refetch();
        toast.success('Sub category deleted!');
      },
      onError: () => {
        toast.error('Something went wrong');
      },
    }
  );

  const handleCreateCategory = (data: CategoryData) => {
    createCategory.mutate(data);
  };

  const handleUpdateCategory = (data: CategoryData) => {
    updateCategory.mutate(data);
  };

  const handleDeleteCategory = () => {
    deleteCategory.mutate();
  };

  const handleCreateSubCategory = (data: SubCategory) => {
    createSubCategory.mutate(data);
  };

  const handleUpdateSubCategory = (options: {
    subCategoryId: string;
    data: SubCategory;
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
