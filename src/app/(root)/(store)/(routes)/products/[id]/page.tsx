'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components';
import { products } from '@/utils/mockData';
import Image from 'next/image';
import { useState } from 'react';

import ProductPicker from './components/product-picker';
import RelativeProducts from './components/relative-products';

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
    <section className='sticky top-16 h-min py-6 pr-6'>
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
      <ProductPicker colorList={colors} id={id} sizeList={sizes} />
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
