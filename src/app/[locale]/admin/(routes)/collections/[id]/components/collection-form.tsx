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
import { Trash } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Collection name must be at least 2 characters',
  }),
  description: z.string(),
  imageUrl: z.string(),
});

type TCollectionFormValues = z.infer<typeof formSchema>;

type TCollection = {
  id: string;
  name: string;
  description: string;
};

interface ICollectionFormProps {
  initialData: TCollection | null;
  createCollection: (data: TCollectionFormValues) => void;
  updateCollection: (data: TCollectionFormValues) => void;
  deleteCollection: () => void;
}

export default function CollectionForm({
  initialData,
  createCollection,
  updateCollection,
  deleteCollection,
}: ICollectionFormProps) {
  const [isOpenModal, setOpenModal] = useState(false);
  const title = initialData ? 'Edit Collection' : 'Create Collection';
  const description = initialData
    ? 'Make changes to this collection'
    : 'Add a new collection';
  const action = initialData ? 'Save Changes' : 'Create';

  const form = useForm<TCollectionFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: '',
      description: '',
      imageUrl: '',
    },
  });

  const onSubmit = async (data: TCollectionFormValues) => {
    if (initialData) {
      updateCollection(data);
    } else {
      createCollection(data);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={isOpenModal}
        onClose={() => setOpenModal(false)}
        onConfirm={deleteCollection}
      />
      <div className='flex items-center justify-between'>
        <Heading title={title} description={description} />
        {initialData && (
          <Button variant='destructive' onClick={() => setOpenModal(true)}>
            <Trash className='mr-2 h-4 w-4' />
            Delete Collection
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
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
          <div className='my-5 gap-8 md:grid md:grid-cols-3'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder='Collection Name' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='mb-5 gap-8 md:grid md:grid-cols-2'>
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Collection description here.'
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
