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

type FormValue = z.infer<typeof formSchema>;

type SubCategory = {
  id: string;
  value: string;
};

type Category = {
  id: string;
  value: string;
  subCategories: SubCategory[];
};

type ConfirmModal = {
  isDeleteSubcategory: boolean;
  subCategoryId?: string;
};

export type SubCategoryColumn = SubCategory & {
  showEditForm: Dispatch<SetStateAction<SubCategory | undefined>>;
};

interface ICategoryFormProps {
  initialData: Category | null;
  createCategory: (data: FormValue) => void;
  updateCategory: (data: FormValue) => void;
  deleteCategory: () => void;
  createSubCategory: (data: FormValue) => void;
  updateSubCategory: (options: {
    subCategoryId: string;
    data: FormValue;
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
  const [confirmModal, setConfirmModal] = useState<ConfirmModal | null>(null);
  const [editForm, setEditForm] = useState<SubCategory | undefined>(undefined);

  const title = initialData ? 'Edit Category' : 'Create Category';
  const description = initialData
    ? 'Make changes to this category'
    : 'Add a new category';
  const action = initialData ? 'Save Changes' : 'Create';

  const form = useForm<FormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      value: '',
    },
  });

  const onSubmit = async (data: FormValue) => {
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
          editForm?.value !== '' ? 'Edit Sub Category' : 'Create Sub Category'
        }
        description={
          editForm?.value !== ''
            ? 'Make changes to this sub category'
            : 'Add a new sub category'
        }
        isOpen={editForm !== undefined}
        onClose={() => setEditForm(undefined)}
      >
        <SubCategoryForm
          initialData={editForm as SubCategory}
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
            onClick={() => setConfirmModal({ isDeleteSubcategory: false })}
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
                  Sub Categories ({initialData.subCategories.length})
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
                data={initialData?.subCategories.map((item) => ({
                  ...item,
                  showEditForm: () => setEditForm(item),
                  showConfirmModal: () =>
                    setConfirmModal({
                      isDeleteSubcategory: true,
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
