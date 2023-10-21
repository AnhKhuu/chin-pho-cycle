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
import { AdminRoutes, PrivateApi } from '@/utils/constant';
import { zodResolver } from '@hookform/resolvers/zod';
import { Brand } from '@prisma/client';
import axios from 'axios';
import { Trash } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import * as z from 'zod';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Brand name must be at least 2 characters',
  }),
  description: z.string(),
  imageUrl: z.string(),
});

type TBrandFormValues = z.infer<typeof formSchema>;

interface IBrandFormProps {
  initialData: Brand | null;
}

export function BrandForm({ initialData }: IBrandFormProps) {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? 'Edit Brand' : 'Create Brand';
  const description = initialData
    ? 'Make changes to this brand'
    : 'Add a new brand';
  const toastMessage = initialData ? 'Brand updated!' : 'Brand created!';
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
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`${PrivateApi.BRANDS}/${params.id}`, data);
      } else {
        await axios.post(`${PrivateApi.BRANDS}`, data);
      }
      router.refresh();
      router.push(`${AdminRoutes.BRAND}`);
      toast.success(toastMessage);
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`${PrivateApi.BRANDS}/${params.id}`);
      router.refresh();
      router.push(`${AdminRoutes.BRAND}`);
      toast.success('Brand deleted');
    } catch (error) {
      toast.error('Make sure you removed all products of this brand!');
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className='flex items-center justify-between'>
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant='destructive'
            onClick={() => setOpen(true)}
          >
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
                    disabled={loading}
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
                    <Input
                      disabled={loading}
                      placeholder='Brand Name'
                      {...field}
                    />
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
                      disabled={loading}
                      placeholder='Brand description here.'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className='ml-auto' type='submit'>
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
}
