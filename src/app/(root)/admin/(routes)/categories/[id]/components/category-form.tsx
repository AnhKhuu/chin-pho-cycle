'use client';

import {
  AlertModal,
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Heading,
  Input,
  Separator,
} from '@/components';
import { zodResolver } from '@hookform/resolvers/zod';
import { Category } from '@prisma/client';
import { Trash } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
  value: z.string().nonempty(),
});

type CategoryFormValues = z.infer<typeof formSchema>;

interface ICategoryFormProps {
  initialData: Category | null;
  createCategory: (data: CategoryFormValues) => void;
  updateCategory: (data: CategoryFormValues) => void;
  deleteCategory: () => void;
}
export default function CategoryForm({
  initialData,
  createCategory,
  updateCategory,
  deleteCategory,
}: ICategoryFormProps) {
  const [open, setOpen] = useState(false);

  const title = initialData ? 'Edit Category' : 'Create Category';
  const description = initialData
    ? 'Make changes to this category'
    : 'Add a new category';
  const action = initialData ? 'Save Changes' : 'Create';

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      value: '',
    },
  });

  const onSubmit = async (data: CategoryFormValues) => {
    if (initialData) {
      console.log({ data });
      updateCategory(data);
    } else {
      createCategory(data);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={deleteCategory}
      />
      <div className='flex items-center justify-between'>
        <Heading title={title} description={description} />
        {initialData && (
          <Button variant='destructive' onClick={() => setOpen(true)}>
            <Trash className='mr-2 h-4 w-4' />
            Delete Category
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='w-full space-y-8'
        >
          <div className='gap-8 md:grid md:grid-cols-3'>
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
          <Button className='ml-auto' type='submit'>
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
}
