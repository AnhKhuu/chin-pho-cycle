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
  PAGE_SIZE,
  QueryKeys,
  QueryParam,
} from '@/utils/constant';
import { capitalizeFirstLetter, parseSearchParams } from '@/utils/fn';
import { TProductVariantFilters, TVariantItem } from '@/utils/types';
import axios from 'axios';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import { useQueries } from 'react-query';
import 'swiper/css';
import 'swiper/css/scrollbar';
import { Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import ProductPicker from './components/product-picker';
import RelatedProducts from './components/related-products';

const MAX_WORDS = 100;

export default function Page({ params }: { params: { id: string[] } }) {
  const { id } = params;
  const searchParams = useSearchParams();

  const typeIds = searchParams.get(QueryParam.TYPES)?.split(',');
  const brandIds = searchParams.get(QueryParam.BRANDS)?.split(',');

  console.log({ typeIds }, { brandIds });

  const { offset, limit, column, order } = parseSearchParams({
    searchParams: {
      page: '1',
      perPage: PAGE_SIZE.toString(),
    },
  });

  const filterParams: TProductVariantFilters = useMemo(() => {
    return {
      offset,
      limit,
      column,
      order,
      name_en: '',
      name_vi: '',
      genders: [],
      typeIds: typeIds ? typeIds.map((typeId) => parseInt(typeId)) : [],
      brandIds: brandIds ? brandIds.map((brandId) => parseInt(brandId)) : [],
    };
  }, [typeIds, brandIds, offset, limit, column, order]);

  const [product, relativeProducts] = useQueries([
    {
      queryKey: [QueryKeys.PRODUCT, id],
      queryFn: async () =>
        await axios.get(`${process.env.BASE_URL}/variants/${id}`),
    },
    {
      queryKey: [QueryKeys.PRODUCTS, filterParams],
      queryFn: async () =>
        await axios.post(
          `${process.env.BASE_URL}/variants/search`,
          filterParams
        ),
    },
  ]);

  return (
    <div className='mb-5 md:my-6 lg:my-10'>
      <article className='relative grid grid-cols-1 md:grid-cols-2 md:gap-10 xl:grid-cols-3'>
        <ProductImages
          images={product.data?.data.images}
          isLoading={product.isLoading}
        />
        {!product.isLoading && <ProductInfo data={product.data?.data} />}
        {product.isLoading && <ProductInfoSkeleton />}
      </article>
      <RelatedProducts
        products={relativeProducts.data?.data.variants}
        typeIds={typeIds}
        brandIds={brandIds}
        isLoading={relativeProducts.isLoading}
      />
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
    <>
      <div className='hidden md:grid md:grid-cols-1 xl:col-span-2 xl:grid-cols-2'>
        {images?.map((img, index) => (
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
    </>
  );
}

function ProductInfo({ data }: { data: TVariantItem }) {
  const [isFullText, setFullText] = useState(false);
  const locale = useLocale();
  const t = useTranslations('ProductDetails');

  return (
    <section className='sticky top-16 mx-6 mt-6 h-min md:mt-0 lg:pb-6 lg:pr-6'>
      <h1 className='mb-2 text-2xl'>
        {capitalizeFirstLetter(data?.product[`name_${locale}`])}
      </h1>
      {!isFullText &&
        data?.product[`description_${locale}`].length > MAX_WORDS && (
          <div className='mb-4 font-light'>
            <span>
              {data?.product[`description_${locale}`].slice(0, MAX_WORDS)}...
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
              {data?.product[`description_${locale}`]}
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
      {data?.product[`description_${locale}`].length < MAX_WORDS && (
        <div className='mb-4 font-light'>
          {data?.product[`description_${locale}`]}
        </div>
      )}
      <ProductPicker data={data} />
      <Accordion type='multiple'>
        <AccordionItem value='details' className='underline-offset-4'>
          <AccordionTrigger>
            {capitalizeFirstLetter(t(I18nTermsProductDetails.DETAILS))}
          </AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='free-shipping' className='underline-offset-4'>
          <AccordionTrigger>
            {capitalizeFirstLetter(
              t(I18nTermsProductDetails.FREE_SHIPPING_AND_RETURNS)
            )}
          </AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
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
