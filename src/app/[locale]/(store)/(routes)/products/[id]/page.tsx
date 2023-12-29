'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Skeleton,
} from '@/components';
import {
  I18nTermsProductDetails,
  PublicApi,
  QueryKeys,
  QueryParam,
  Routes,
} from '@/utils/constant';
import { capitalizeFirstLetter } from '@/utils/fn';
import { TVariantItem } from '@/utils/types';
import axios from 'axios';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useQueries } from 'react-query';
import 'swiper/css';
import 'swiper/css/scrollbar';
import { Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import CollectionInfo from './components/collection-info';
import FeaturedProducts from './components/featured-products';
import OtherCollections from './components/other-collections';
import ProductPicker from './components/product-picker';

const MAX_WORDS = 100;

export default function Page({ params }: { params: { id: string[] } }) {
  const { id } = params;
  const t = useTranslations('ProductDetails');
  const locale = useLocale();

  const [product] = useQueries([
    {
      queryKey: [QueryKeys.PRODUCT, id],
      queryFn: async () =>
        await axios.get(`${process.env.BASE_URL}/${PublicApi.PRODUCT}/${id}`),
    },
  ]);

  return (
    <div className='mb-5'>
      <div className='bg-white_1 px-12 py-6 text-sm font-normal'>
        <div className='flex'>
          <Link
            href={Routes.HOME}
            className='hover:underline hover:underline-offset-4'
          >
            {t(I18nTermsProductDetails.HOME)}
          </Link>
          <span className='mx-1'>/</span>
          <Link
            className='hover:underline hover:underline-offset-4'
            href={`${Routes.SEARCH}?${QueryParam.CATEGORY}=${product.data?.data.product.categoryId}`}
          >
            {product.data?.data.product.category[`name_${locale}`]}
          </Link>
          <span className='mx-1'>/</span>
          <Link
            className='hover:underline hover:underline-offset-4'
            href={`${Routes.SEARCH}?${QueryParam.CATEGORY}=${product.data?.data.product.categoryId}&${QueryParam.TYPES}=${product.data?.data.product.typeId}`}
          >
            {product.data?.data.product.type[`name_${locale}`]}
          </Link>
        </div>
      </div>
      <article className='relative mb-24 grid md:grid-cols-2'>
        <ProductImages
          images={product.data?.data.images}
          isLoading={product.isLoading}
        />
        {!product.isLoading && <ProductInfo data={product.data?.data} />}
        {product.isLoading && <ProductInfoSkeleton />}
      </article>
      {product.data?.data.product.collections[0] && (
        <CollectionInfo
          collection={product.data?.data.product.collections[0]}
        />
      )}
      <FeaturedProducts
        products={product.data?.data.product.category.products}
        isLoading={product.isLoading}
        currentProductId={product.data?.data.id}
      />
      {product.data?.data.product.category.featuredCollections.length > 0 && (
        <OtherCollections
          collections={product.data?.data.product.category.featuredCollections}
          currentCollectionId={product.data?.data.product.collections[0].id}
          isLoading={false}
        />
      )}
    </div>
  );
}

function ProductImages({
  images,
  isLoading,
}: {
  images: string[];
  isLoading: boolean;
}) {
  return (
    <div className='col-span-1'>
      {images
        ?.slice(0, 2)
        .map((img, index) => (
          <Image
            src={img}
            alt='product'
            width={712}
            height={949}
            sizes='100vw'
            key={index}
            className='mb-4 h-[949px] w-full object-cover object-center'
          />
        ))}
      <div className='grid grid-cols-2 gap-4'>
        {images
          ?.slice(2)
          .map((img, index) => (
            <Image
              src={img}
              alt='product'
              width={348}
              height={463}
              sizes='100vw'
              key={index}
              className='h-[463px] w-full object-cover object-center'
            />
          ))}
      </div>
      {isLoading && (
        <div className='hidden md:grid md:grid-cols-1 xl:col-span-2 xl:grid-cols-2'>
          {Array(2)
            .fill(0)
            .map((_, index) => (
              <Skeleton key={index} className='h-[550px] w-full rounded-none' />
            ))}
        </div>
      )}
      <div className='md:hidden'>
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          scrollbar={true}
          modules={[Scrollbar]}
          className='mySwiper'
        >
          {images?.map((img, index) => (
            <SwiperSlide key={index}>
              <Image
                src={img}
                alt='test'
                width={354}
                height={500}
                sizes='(max-width: 768px), 50vw, 25vw'
                key={index}
                className='h-[430px] w-full object-cover object-center lg:h-[550px]'
              />
            </SwiperSlide>
          ))}
          {isLoading && (
            <SwiperSlide>
              <Skeleton className='h-[430px] w-full lg:h-[550px]' />
            </SwiperSlide>
          )}
        </Swiper>
      </div>
    </div>
  );
}

function ProductInfo({ data }: { data: TVariantItem }) {
  const [isFullText, setFullText] = useState(false);
  const locale = useLocale();
  const t = useTranslations('ProductDetails');

  return (
    <section className='sticky top-16 h-min py-20 pl-32 pr-12'>
      <Image
        src={data?.product.brand.logos[1]}
        alt={data?.product.brand[`name_${locale}`]}
        width={71}
        height={18}
        sizes='100vw'
        className='h-5 w-auto'
      />
      <div className='mb-6 mt-10 text-5xl'>
        <h1 className='mb-4'>
          {data?.product[`name_${locale}`].toUpperCase()}
        </h1>
        <h1>- {data?.[`name_${locale}`].toUpperCase()}</h1>
      </div>
      {!isFullText &&
        data?.product[`description_${locale}`].length > MAX_WORDS && (
          <div className='mb-4 font-light'>
            <span>
              {data?.product[`description_${locale}`].slice(0, MAX_WORDS)}...{' '}
              <button
                className='inline-block underline underline-offset-4'
                onClick={() => setFullText(true)}
              >
                {capitalizeFirstLetter(t(I18nTermsProductDetails.READ_MORE))}{' '}
                &gt;&gt;
              </button>
            </span>
          </div>
        )}
      {isFullText &&
        data?.product[`description_${locale}`].length > MAX_WORDS && (
          <div className='mb-4 font-light'>
            <span>
              {data?.product[`description_${locale}`]}{' '}
              <button
                className='inline-block underline underline-offset-4'
                onClick={() => setFullText(false)}
              >
                &lt;&lt;{' '}
                {capitalizeFirstLetter(t(I18nTermsProductDetails.READ_LESS))}
              </button>
            </span>
          </div>
        )}
      {data?.product[`description_${locale}`].length <= MAX_WORDS && (
        <div className='mb-4 font-light'>
          {data?.product[`description_${locale}`]}
        </div>
      )}
      <ProductPicker data={data} />
      <AdditionalInfo />
    </section>
  );
}

function ProductInfoSkeleton() {
  return (
    <section className='mx-6 mt-6 h-min md:mt-0 lg:pr-6'>
      <Skeleton className='mb-2 h-20 w-full' />
      <Skeleton className='mb-2 h-10 w-2/3' />
      <Skeleton className='h-10 w-1/3' />
    </section>
  );
}

function AdditionalInfo() {
  const t = useTranslations('ProductDetails');

  return (
    <Accordion type='multiple'>
      <AccordionItem value='details' className='underline-offset-4'>
        <AccordionTrigger className='text-xl font-normal'>
          {capitalizeFirstLetter(t(I18nTermsProductDetails.PRODUCT_DETAILS))}
        </AccordionTrigger>
        <AccordionContent>
          <div className='mb-6'>
            <div className='flex justify-between'>
              <p className='font-semibold'>Product Weight</p>
              <p className='font-normal'>125 G - 4.41 OZ</p>
            </div>
            <div className='flex justify-between'>
              <p className='font-semibold'>Main Fabric Content</p>
              <p className='font-normal'>100% POLYAMIDE</p>
            </div>
            <div className='flex justify-between'>
              <p className='font-semibold'>Main Fabric Weight</p>
              <p className='font-normal'>68G/M2</p>
            </div>
          </div>
          <div>Description here</div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value='care' className='underline-offset-4'>
        <AccordionTrigger className='text-xl font-normal'>
          {capitalizeFirstLetter(t(I18nTermsProductDetails.CARE))}
        </AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value='sizing' className='underline-offset-4'>
        <AccordionTrigger className='text-xl font-normal'>
          {capitalizeFirstLetter(t(I18nTermsProductDetails.SIZING_AND_FIT))}
        </AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value='shipping' className='underline-offset-4'>
        <AccordionTrigger className='text-xl font-normal'>
          {capitalizeFirstLetter(
            t(I18nTermsProductDetails.SHIPPING_RETURN_AND_WARRANTY)
          )}
        </AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
