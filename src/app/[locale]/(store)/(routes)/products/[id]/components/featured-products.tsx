import { I18nTermsProductDetails } from '@/utils/constant';
import { capitalizeFirstLetter } from '@/utils/fn';
import { TProductItem } from '@/utils/types';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useCallback, useState } from 'react';
import 'swiper/css';
import { Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperClass } from 'swiper/types';

import ProductCard from '../../../../components/product-card';
import ProductCardSkeleton from '../../../../components/product-card-skeleton';

export default function FeaturedProducts({
  products,
  isLoading,
  currentProductId,
}: {
  products: TProductItem[];
  isLoading: boolean;
  currentProductId: number;
}) {
  const t = useTranslations('ProductDetails');
  const [swiperRef, setSwiperRef] = useState<SwiperClass>();
  const locale = useLocale();

  const handlePrevious = useCallback(() => {
    swiperRef?.slidePrev();
  }, [swiperRef]);

  const handleNext = useCallback(() => {
    swiperRef?.slideNext();
  }, [swiperRef]);

  return (
    <div className='relative mb-16'>
      <div className='mx-6 flex items-center justify-between py-6 lg:mx-12'>
        <h1 className='text-xl font-semibold'>
          {capitalizeFirstLetter(t(I18nTermsProductDetails.FEATURED_PRODUCTS))}
        </h1>
      </div>
      <div
        onClick={handlePrevious}
        className='absolute left-8 top-1/2 z-10 flex h-9 w-9 cursor-pointer items-center justify-center bg-gray-300 bg-opacity-50 transition duration-150 hover:bg-opacity-90'
      >
        <ChevronLeft className='h-6 w-6 text-black' />
      </div>
      <div className='category-slide mx-12'>
        <Swiper
          onSwiper={setSwiperRef}
          spaceBetween={10}
          slidesPerView={4.5}
          scrollbar={true}
          modules={[Scrollbar]}
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
          {products?.map((product) => {
            return product.variants
              .filter((variant) => variant.id !== currentProductId)
              .map((variant) => (
                <SwiperSlide key={variant.id}>
                  <ProductCard
                    product={variant}
                    productInfo={{
                      brand: product.brand[`name_${locale}`],
                      categoryId: product.categoryId,
                      typeId: product.typeId,
                      name: product[`name_${locale}`],
                      variantLength: product.variants.length,
                      price: product.price,
                    }}
                  />
                </SwiperSlide>
              ));
          })}
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
      <div
        onClick={handleNext}
        className='absolute right-8 top-1/2 z-10 flex h-9 w-9 cursor-pointer items-center justify-center bg-gray-300 bg-opacity-50 transition duration-150 hover:bg-opacity-90'
      >
        <ChevronRight className='h-6 w-6 text-black' />
      </div>
    </div>
  );
}
