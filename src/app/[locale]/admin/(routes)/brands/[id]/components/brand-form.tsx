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
  ImageUpload,
  Input,
  Separator,
  Textarea,
} from '@/components';
import { zodResolver } from '@hookform/resolvers/zod';
import { Brand } from '@prisma/client';
import { Trash } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Brand name must be at least 2 characters',
  }),
  description: z.string(),
  imageUrl: z.string(),
});

export type TBrandFormValues = z.infer<typeof formSchema>;

interface IBrandFormProps {
  initialData: Brand | null;
  createBrand: (data: TBrandFormValues) => void;
  updateBrand: (data: TBrandFormValues) => void;
  deleteBrand: () => void;
}

export function BrandForm({
  initialData,
  createBrand,
  updateBrand,
  deleteBrand,
}: IBrandFormProps) {
  const [openModal, setOpenModal] = useState(false);

  const title = initialData ? 'Edit Brand' : 'Create Brand';
  const description = initialData
    ? 'Make changes to this brand'
    : 'Add a new brand';
  const action = initialData ? 'Save Changes' : 'Create';

  const form = useForm<TBrandFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: '',
      description: '',
      imageUrl: '',
    },
  });

  const onSubmit = async (data: TBrandFormValues) => {
    if (initialData) {
      updateBrand(data);
    } else {
      createBrand(data);
    }
  };

  const onDelete = async () => {
    deleteBrand();
  };

  return (
    <>
      <AlertModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        onConfirm={onDelete}
      />
      <div className='flex items-center justify-between'>
        <Heading title={title} description={description} />
        {initialData && (
          <Button variant='destructive' onClick={() => setOpenModal(true)}>
            <Trash className='mr-2 h-4 w-4' />
            Delete Brand
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='w-full space-y-8'
        >
          <FormField
            control={form.control}
            name='imageUrl'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Background Image</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange('')}
                  />
                </FormControl>
                <FormMessage className='text-xs' />
              </FormItem>
            )}
          />
          <div className='gap-8 md:grid md:grid-cols-3'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder='Brand Name' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='gap-8 md:grid md:grid-cols-2'>
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Brand description here.'
                      {...field}
                    />
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
