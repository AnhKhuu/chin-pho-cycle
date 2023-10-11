'use client';

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Label,
} from '@/components/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Brand name must be at least 2 characters',
  }),
});

export default function Page() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    // TODO
  };

  return (
    <>
      <h1>Brands</h1>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant='outline'>
            <Plus className='me-2'></Plus>New Brand
          </Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>New Brand</DialogTitle>
            <DialogDescription>Add a new brand to your store</DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <section className='mb-6'>
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem className='mb-4'>
                      <div className='grid grid-cols-4 items-center gap-4'>
                        <FormLabel htmlFor='name' className='text-right'>
                          <Label>Name</Label>
                        </FormLabel>
                        <FormControl className='col-span-3'>
                          <Input {...field} id='name' placeholder='New Brand' />
                        </FormControl>
                      </div>
                      <FormMessage className='text-xs' />
                    </FormItem>
                  )}
                />
              </section>

              <DialogFooter>
                <Button type='submit'>Save Changes</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
