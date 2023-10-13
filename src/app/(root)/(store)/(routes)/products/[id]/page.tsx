'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  RadioGroup,
  RadioGroupItem,
} from '@/components/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { z } from 'zod';

import { RouteTypes } from '../../../../utils/constant';
import { IProductItem } from '../../../../utils/types';
import { ProductCard } from '../../../components';
import { products } from '../../../mockData';

const images = Array(8).fill('/images/bike.jpg');
const colors = [
  {
    productId: '1',
    imageUrl: '/images/bike.jpg',
  },
  {
    productId: '2',
    imageUrl: '/images/bike.jpg',
  },
  {
    productId: '3',
    imageUrl: '/images/bike.jpg',
  },
];
const sizes = ['S', 'M', 'L'];
const description =
  'Wherever the ride takes you, pack the Alt_Road Legionnaires Cap. A lightweight 5-panel cap with removable neck protection to shelter you from the scorching sun. Moisture-wicking materials and strategically placed perforations provide breathability. Have you ever seen a Legionnaires Cap look so good?';

export default function Page({ params }: { params: { id: string[] } }) {
  const { id } = params;
  return (
    <div className='my-10'>
      <article className='relative grid grid-cols-3 gap-20'>
        <ProductImages imageList={images} />
        <ProductInfo id={id[0]} />
      </article>
      <RelativeProducts productList={products} />
    </div>
  );
}

function ProductImages({ imageList }: { imageList: string[] }) {
  return (
    <div className='col-span-2 grid grid-cols-2 gap-2'>
      {imageList.map((img, index) => (
        <Image
          src={img}
          alt='test'
          width={354}
          height={500}
          sizes='(max-width: 768px), 50vw, 25vw'
          key={index}
          className='h-[550px] w-full object-cover object-center'
        />
      ))}
    </div>
  );
}

function ProductInfo({ id }: { id: string }) {
  const [isFullText, setFullText] = useState(false);

  return (
    <section className='sticky top-16 h-screen py-6 pr-6'>
      <h1 className='mb-2 text-2xl'>Product Name</h1>
      {!isFullText && description.length > 130 && (
        <span className='mb-2 font-light'>
          {description.slice(0, 130)}...
          <button
            className='ml-2 inline-block underline underline-offset-4'
            onClick={() => setFullText(true)}
          >
            Read More &gt;&gt;
          </button>
        </span>
      )}
      {isFullText && description.length > 130 && (
        <span className='mb-2 font-light'>
          {description}
          <button
            className='ml-2 inline-block underline underline-offset-4'
            onClick={() => setFullText(false)}
          >
            &lt;&lt; Read Less
          </button>
        </span>
      )}
      {description.length < 130 && description}
      <ProductPicker colorList={colors} id={id} />
      <Accordion type='multiple'>
        <AccordionItem value='details' className='underline-offset-4'>
          <AccordionTrigger>Details</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='free-shipping' className='underline-offset-4'>
          <AccordionTrigger>Free Shipping & Returns</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
}

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
}

function ProductPicker({ colorList, id }: IProductPickerProps) {
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
                  {sizes.map((size) => (
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
        <Button
          type='submit'
          className='mt-4 w-full bg-white text-black hover:bg-grey_1'
        >
          Add to Cart
        </Button>
      </form>
    </Form>
  );
}

function RelativeProducts({ productList }: { productList: IProductItem[] }) {
  return (
    <div className='relative px-8'>
      <Swiper modules={[Navigation]} spaceBetween={16} slidesPerView={4}>
        <div className='px-8'>
          {productList.map((product) => (
            <SwiperSlide key={product.id}>
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </div>
        <SwiperButtons />
      </Swiper>
    </div>
  );
}

function SwiperButtons() {
  const swiper = useSwiper();
  return (
    <>
      <ChevronLeft
        onClick={() => swiper.slidePrev()}
        className='absolute left-0 top-1/2'
      />
      <ChevronRight
        onClick={() => swiper.slideNext()}
        className='absolute right-0 top-1/2'
      />
    </>
  );
}
