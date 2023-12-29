'use client';

import {
  Button,
  Dialog,
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
import { capitalizeFirstLetter, formatPrice } from '@/utils/fn';
import { TStockItem, TVariantItem } from '@/utils/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Ruler, X } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const LIMIT_QUANTITY = 5;

export default function ProductPicker({ data }: { data: TVariantItem }) {
  const t = useTranslations('ProductDetails');
  const locale = useLocale();
  const [isShowSizeGuide, setShowSizeGuide] = useState(false);
  const sizes = data?.stocks.filter((size) => size.quantity > 0);
  const FormSchema = z.object({
    size: z.string(),
  });
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      size: sizes[0].size,
    },
  });

  const onSubmit = (product: z.infer<typeof FormSchema>) => {
    console.log({ product });
  };

  useEffect(() => {
    if (document) {
      document.body.style.overflow = isShowSizeGuide ? 'hidden' : 'auto';
    }
  }, [isShowSizeGuide]);

  return (
    <Dialog open={isShowSizeGuide} onOpenChange={setShowSizeGuide}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='mb-12 grid w-full grid-cols-5 gap-4'>
            {data?.product.variants.map((color) => (
              <Link
                key={color.id}
                href={`${Routes.PRODUCT}/${color.id}`}
                className='group relative'
              >
                <Image
                  src={color.images[0]}
                  alt='test'
                  width={94}
                  height={127}
                  sizes='100vw'
                  className='h-32 w-full object-cover object-center'
                />
                <div
                  className={`absolute left-0 top-0 h-32 w-full bg-grey_2 ${
                    data.id === color.id
                      ? 'opacity-70'
                      : 'opacity-0 group-hover:opacity-70'
                  }`}
                ></div>
              </Link>
            ))}
          </div>
          <p className='mb-6 text-xl font-semibold'>
            <span className='mr-2 font-normal'>VND</span>
            {formatPrice(data?.product.price)}
          </p>
          <FormField
            control={form.control}
            name='size'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    className='grid w-full grid-cols-6 gap-0'
                  >
                    {sizes?.map((size) => (
                      <FormItem
                        className='group col-span-1 border border-black'
                        key={size.id}
                      >
                        <FormControl>
                          <RadioGroupItem
                            value={size.size}
                            className='peer/radio hidden'
                          />
                        </FormControl>
                        <FormLabel
                          className={`flex items-center justify-center bg-white py-4 font-light group-hover:cursor-pointer ${
                            field.value === size.size
                              ? 'bg-primary text-white'
                              : 'hover:bg-primary hover:text-white'
                          }`}
                          style={{
                            marginTop: 0,
                          }}
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
          <div className='mt-3 flex items-center justify-between'>
            <div
              className='flex items-center'
              onClick={() => setShowSizeGuide(true)}
            >
              <p className='mr-2 text-sm underline underline-offset-4 hover:cursor-pointer'>
                {t(I18nTermsProductDetails.SIZE_GUIDE)}
              </p>
              <Ruler />
            </div>
            {calculateProdQuantity(data.stocks) <= 0 && (
              <p>{t(I18nTermsProductDetails.OUT_OF_STOCK)}</p>
            )}
            {calculateProdQuantity(data.stocks) > LIMIT_QUANTITY && (
              <p>{t(I18nTermsProductDetails.IN_STOCK)}</p>
            )}
            {calculateProdQuantity(data.stocks) > 0 &&
              calculateProdQuantity(data.stocks) <= LIMIT_QUANTITY && (
                <p>
                  {locale === 'en' &&
                    `Only ${calculateProdQuantity(data.stocks)} lefts`}
                  {locale === 'vi' &&
                    `Chỉ còn ${calculateProdQuantity(data.stocks)} sản phẩm`}
                </p>
              )}
          </div>
          <Button type='submit' className='text-bold my-10 w-full text-white'>
            {capitalizeFirstLetter(t(I18nTermsProductDetails.ADD_TO_CART))}
          </Button>
        </form>
      </Form>
      {isShowSizeGuide && <SizeGuide onClose={() => setShowSizeGuide(false)} />}
    </Dialog>
  );
}

function calculateProdQuantity(stocks: TStockItem[]): number {
  let total = 0;
  stocks.forEach((item) => (total += item.quantity));
  return total;
}

function SizeGuide({ onClose }: { onClose: () => void }) {
  return (
    <div className='fixed bottom-0 left-0 right-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-gray-400 bg-opacity-50'>
      <div className='text-blue_2 flex items-center text-lg'>
        <div className='relative z-50'>
          <Image
            src={'/images/size-guide.png'}
            alt={'size guide'}
            width={1347}
            height={555}
            sizes='100vw'
          />
          <X
            className='hover: absolute right-1 top-2 h-12 w-12 cursor-pointer'
            onClick={() => onClose()}
          />
        </div>
      </div>
    </div>
  );
}
