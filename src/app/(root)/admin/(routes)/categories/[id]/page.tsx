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

export default function Page({ params }: { params: { id: string } }) {
  const { data: category } = useQuery([QueryKeys, params.id], getCategory);
  const router = useRouter();

  const createCategory = useMutation(postCategory, {
    onSuccess: () => {
      toast.success('Category created!');
      router.push(AdminRouteTypes.CATEGORY_PAGE);
    },
    onError: () => {
      toast.error('Something went wrong');
    },
  });

  const updateCategory = useMutation(patchCategory, {
    onSuccess: () => {
      toast.success('Category updated!');
      router.push(AdminRouteTypes.CATEGORY_PAGE);
    },
    onError: () => {
      toast.error('Something went wrong');
    },
  });

  const deleteCategoryMutation = useMutation(deleteCategory, {
    onSuccess: () => {
      toast.success('Category deleted!');
      router.push(AdminRouteTypes.CATEGORY_PAGE);
    },
    onError: () => {
      toast.error('Something went wrong');
    },
  });

  async function getCategory() {
    return await axios.get(`${BaseUrl.CATEGORIES}/${params.id}`);
  }

  async function postCategory(data: CategoryData) {
    return await axios.post(BaseUrl.CATEGORIES, data);
  }

  async function patchCategory(data: CategoryData) {
    return await axios.patch(`${BaseUrl.CATEGORIES}/${params.id}`, data);
  }

  async function deleteCategory() {
    return await axios.delete(`${BaseUrl.CATEGORIES}/${params.id}`);
  }

  const handleCreateCategory = (data: CategoryData) => {
    createCategory.mutate(data);
  };

  const handleUpdateCategory = (data: CategoryData) => {
    updateCategory.mutate(data);
  };

  const handleDeleteCategory = () => {
    deleteCategoryMutation.mutate();
  };

  return (
    <main className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        {category && (
          <CategoryForm
            initialData={category.data}
            createCategory={handleCreateCategory}
            updateCategory={handleUpdateCategory}
            deleteCategory={handleDeleteCategory}
          />
        )}
      </div>
    </main>
  );
}
