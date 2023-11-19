import { I18nTermsProductDetails, QueryParam, Routes } from '@/utils/constant';
import { capitalizeFirstLetter } from '@/utils/fn';
import { TVariantItem } from '@/utils/types';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useCallback, useState } from 'react';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperClass } from 'swiper/types';

import ProductCard from '../../../../components/product-card';
import ProductCardSkeleton from '../../../../components/product-card-skeleton';

export default function RelatedProducts({
  products,
  typeIds,
  brandIds,
  isLoading,
}: {
  products: TVariantItem[];
  typeIds?: string[];
  brandIds?: string[];
  isLoading: boolean;
}) {
  const t = useTranslations('ProductDetails');
  const [swiperRef, setSwiperRef] = useState<SwiperClass>();

  const handlePrevious = useCallback(() => {
    swiperRef?.slidePrev();
  }, [swiperRef]);

  const handleNext = useCallback(() => {
    swiperRef?.slideNext();
  }, [swiperRef]);

  return (
    <div className='relative'>
      <div className='mx-6 flex items-center justify-between py-6 lg:mx-8'>
        <h1 className='text-xl font-semibold'>
          {capitalizeFirstLetter(t(I18nTermsProductDetails.YOU_MAY_ALSO_LIKE))}
        </h1>
        {!isLoading && (
          <Link
            className='font-light hover:cursor-pointer hover:underline hover:underline-offset-4'
            href={`${Routes.SEARCH}?${QueryParam.TYPES}=${typeIds?.[0]}&${QueryParam.BRANDS}=${brandIds?.[0]}`}
          >
            {capitalizeFirstLetter(t(I18nTermsProductDetails.VIEW_MORE))}
          </Link>
        )}
      </div>
      {products?.length > 4 && (
        <ChevronLeft
          onClick={handlePrevious}
          className='absolute left-0 top-1/2 cursor-pointer'
        />
      )}
      <div className='mx-8'>
        <Swiper
          onSwiper={setSwiperRef}
          spaceBetween={10}
          slidesPerView={2}
          breakpoints={{
            768: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
            1280: {
              slidesPerView: 4,
              spaceBetween: 16,
            },
          }}
        >
          {products?.map((product) => (
            <SwiperSlide key={product.id}>
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
          {isLoading &&
            Array(4)
              .fill(0)
              .map((_, index) => (
                <SwiperSlide key={index}>
                  <ProductCardSkeleton />
                </SwiperSlide>
              ))}
        </Swiper>
      </div>
      {products?.length > 4 && !isLoading && (
        <ChevronRight
          onClick={handleNext}
          className='absolute right-0 top-1/2 cursor-pointer'
        />
      )}
    </div>
  );
}
