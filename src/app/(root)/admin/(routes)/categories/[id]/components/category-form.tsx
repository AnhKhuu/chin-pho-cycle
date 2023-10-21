'use client';

import {
  AlertModal,
  Button,
  DataTable,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Heading,
  Input,
  Modal,
  Separator,
} from '@/components';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, Trash } from 'lucide-react';
import { Dispatch, SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Columns } from './columns';
import SubCategoryForm from './sub-category-form';

const formSchema = z.object({
  value: z.string().nonempty(),
});

type TFormValue = z.infer<typeof formSchema>;

type TCategory = {
  id: string;
  value: string;
  subCategories: TSubCategory[];
};

type TSubCategory = {
  id: string;
  value: string;
};

type TConfirmModal = {
  isDeleteSubCategory: boolean;
  subCategoryId?: string;
};

export type TSubCategoryColumn = TSubCategory & {
  showEditForm: Dispatch<SetStateAction<TSubCategory | undefined>>;
};

interface ICategoryFormProps {
  initialData: TCategory | null;
  createCategory: (data: TFormValue) => void;
  updateCategory: (data: TFormValue) => void;
  deleteCategory: () => void;
  createSubCategory: (data: TFormValue) => void;
  updateSubCategory: (options: {
    subCategoryId: string;
    data: TFormValue;
  }) => void;
  deleteSubCategory: (subCategoryId: string) => void;
}

export default function CategoryForm({
  initialData,
  createCategory,
  updateCategory,
  deleteCategory,
  createSubCategory,
  updateSubCategory,
  deleteSubCategory,
}: ICategoryFormProps) {
  const [confirmModal, setConfirmModal] = useState<TConfirmModal | null>(null);
  const [editForm, setEditForm] = useState<TSubCategory | undefined>(undefined);

  const title = initialData ? 'Edit Category' : 'Create Category';
  const description = initialData
    ? 'Make changes to this category'
    : 'Add a new category';
  const action = initialData ? 'Save Changes' : 'Create';

  const form = useForm<TFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      value: '',
    },
  });

  const onSubmit = async (data: TFormValue) => {
    if (initialData) {
      updateCategory(data);
    } else {
      createCategory(data);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={confirmModal !== null}
        onClose={() => setConfirmModal(null)}
        onConfirm={
          confirmModal?.subCategoryId
            ? () => deleteSubCategory(confirmModal.subCategoryId as string)
            : () => deleteCategory()
        }
      />
      <Modal
        title={
          editForm?.value !== '' ? 'Edit Sub-Category' : 'Create Sub-Category'
        }
        description={
          editForm?.value !== ''
            ? 'Make changes to this sub-category'
            : 'Add a new sub-category'
        }
        isOpen={editForm !== undefined}
        onClose={() => setEditForm(undefined)}
      >
        <SubCategoryForm
          initialData={editForm as TSubCategory}
          updateSubCategory={updateSubCategory}
          createSubCategory={createSubCategory}
          resetEditForm={() => setEditForm(undefined)}
        />
      </Modal>
      <div className='flex items-center justify-between'>
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            variant='destructive'
            onClick={() => setConfirmModal({ isDeleteSubCategory: false })}
          >
            <Trash className='mr-2 h-4 w-4' />
            Delete Category
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
          <div className='mb-5 gap-8 md:grid md:grid-cols-3'>
            <FormField
              control={form.control}
              name='value'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value</FormLabel>
                  <FormControl>
                    <Input placeholder='Category' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {initialData && (
            <>
              <p className='mb-3 flex w-full items-center'>
                <FormLabel>
                  Sub-Categories ({initialData.subCategories.length})
                </FormLabel>
                <Button
                  className='ml-5'
                  onClick={(e) => {
                    e.preventDefault();
                    setEditForm({
                      id: '',
                      value: '',
                    });
                  }}
                >
                  <Plus className='mr-2 h-4 w-4' />
                  Add New
                </Button>
              </p>
              <DataTable
                columns={Columns}
                data={initialData?.subCategories?.map((item) => ({
                  ...item,
                  showEditForm: () => setEditForm(item),
                  showConfirmModal: () =>
                    setConfirmModal({
                      isDeleteSubCategory: true,
                      subCategoryId: item.id,
                    }),
                }))}
                isSearchEnabled={false}
              />
            </>
          )}
          <Button className='ml-auto' type='submit'>
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
}
