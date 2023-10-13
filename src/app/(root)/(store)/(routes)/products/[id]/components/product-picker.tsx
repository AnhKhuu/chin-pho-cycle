import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  RadioGroup,
  RadioGroupItem,
} from '@/components';
import { RouteTypes } from '@/utils/constant';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const FormSchema = z.object({
  size: z.enum(['S', 'M', 'L'], {
    required_error: 'You need to select a product size.',
  }),
});

type ColorItem = {
  imageUrl: string;
  productId: string;
};

interface IProductPickerProps {
  colorList: ColorItem[];
  id: string;
  sizeList: string[];
}

export default function ProductPicker({
  colorList,
  id,
  sizeList,
}: IProductPickerProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log({ data });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className='my-2 grid w-full grid-cols-5 gap-4'>
          {colorList.map((color) => (
            <Link
              key={color.productId}
              href={`${RouteTypes.PRODUCT_PAGE}/${color.productId}`}
              className='group relative'
            >
              <Image
                src={color.imageUrl}
                alt='test'
                width={354}
                height={500}
                sizes='(max-width: 768px), 50vw, 25vw'
                className='h-20 w-full object-cover object-center'
              />
              <div
                className={`absolute left-0 top-0 h-20 w-full bg-grey_2 ${
                  id === color.productId
                    ? 'opacity-70'
                    : 'opacity-0 group-hover:opacity-70'
                }`}
              ></div>
            </Link>
          ))}
        </div>
        <p className='mt-2 text-xl'>100,000,000 đ</p>
        <FormField
          control={form.control}
          name='size'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  className='grid w-full grid-cols-5 gap-4'
                >
                  {sizeList.map((size) => (
                    <FormItem className='group col-span-1' key={size}>
                      <FormControl>
                        <RadioGroupItem
                          value={size}
                          className='peer/radio hidden'
                        />
                      </FormControl>
                      <FormLabel
                        className={`flex items-center justify-center bg-white_1 py-2 font-normal group-hover:cursor-pointer ${
                          field.value === size ? 'bg-grey_1' : 'hover:bg-grey_1'
                        }`}
                      >
                        {size}
                      </FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' className='text-bold mt-10 w-full text-white'>
          Buy Now
        </Button>
        <Button variant='secondary' type='submit' className='mt-4 w-full'>
          Add to Cart
        </Button>
      </form>
    </Form>
  );
}
