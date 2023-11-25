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
import { I18nTermsProductDetails, Routes } from '@/utils/constant';
import { capitalizeFirstLetter } from '@/utils/fn';
import { TVariantItem } from '@/utils/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export default function ProductPicker({ data }: { data: TVariantItem }) {
  const t = useTranslations('ProductDetails');
  const sizes = data?.stocks.filter((size) => size.quantity > 0);
  const FormSchema = z.object({
    size: z.enum(sizes, {
      required_error: 'You need to select a product size.',
    }),
  });
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = (product: z.infer<typeof FormSchema>) => {
    console.log({ product });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className='my-2 grid w-full grid-cols-5 gap-4'>
          {data?.product.variants.map((color) => (
            <Link
              key={color.id}
              href={`${Routes.PRODUCT}/${color.id}`}
              className='group relative'
            >
              <Image
                src={color.images[0]}
                alt='test'
                width={354}
                height={500}
                sizes='(max-width: 768px), 50vw, 25vw'
                className='h-20 w-full object-cover object-center'
              />
              <div
                className={`absolute left-0 top-0 h-20 w-full bg-grey_2 ${
                  data.id === color.id
                    ? 'opacity-70'
                    : 'opacity-0 group-hover:opacity-70'
                }`}
              ></div>
            </Link>
          ))}
        </div>
        <p className='mt-2 text-xl'>{data?.product.price} đ</p>
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
                  {sizes?.map((size) => (
                    <FormItem className='group col-span-1' key={size.id}>
                      <FormControl>
                        <RadioGroupItem
                          value={size.size}
                          className='peer/radio hidden'
                        />
                      </FormControl>
                      <FormLabel
                        className={`flex items-center justify-center bg-white_1 py-2 font-normal group-hover:cursor-pointer ${
                          field.value === size.size
                            ? 'bg-grey_1'
                            : 'hover:bg-grey_1'
                        }`}
                      >
                        {size.size}
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
          {capitalizeFirstLetter(t(I18nTermsProductDetails.BUY_NOW))}
        </Button>
        <Button variant='secondary' type='submit' className='mt-4 w-full'>
          {capitalizeFirstLetter(t(I18nTermsProductDetails.ADD_TO_CART))}
        </Button>
      </form>
    </Form>
  );
}
