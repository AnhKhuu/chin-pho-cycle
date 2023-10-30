import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@/components';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  value: z.string().nonempty(),
});

type TSubCategory = {
  id: string;
  value: string;
};

type TFormValue = z.infer<typeof formSchema>;

interface ISubCategoryFormProps {
  initialData: TSubCategory;
  updateSubCategory: (options: {
    subCategoryId: string;
    data: TFormValue;
  }) => void;
  createSubCategory: (data: TFormValue) => void;
  resetEditForm: () => void;
}

export default function SubCategoryForm({
  initialData,
  updateSubCategory,
  createSubCategory,
  resetEditForm,
}: ISubCategoryFormProps) {
  const form = useForm<TFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      value: '',
    },
  });

  const onSubmit = async (data: TFormValue) => {
    if (initialData?.value !== '') {
      updateSubCategory({ subCategoryId: initialData.id, data });
    } else {
      createSubCategory(data);
    }
    resetEditForm();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
        <div className='mb-5'>
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
          Save Changes
        </Button>
      </form>
    </Form>
  );
}
