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

type SubCategory = {
  id: string;
  value: string;
};

type FormValue = z.infer<typeof formSchema>;

interface ISubCategoryFormProps {
  initialData: SubCategory;
  updateSubCategory: (options: {
    subCategoryId: string;
    data: FormValue;
  }) => void;
  createSubCategory: (data: FormValue) => void;
  resetEditForm: () => void;
}

export default function SubCategoryForm({
  initialData,
  updateSubCategory,
  createSubCategory,
  resetEditForm,
}: ISubCategoryFormProps) {
  const form = useForm<FormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      value: '',
    },
  });

  const onSubmit = async (data: FormValue) => {
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
