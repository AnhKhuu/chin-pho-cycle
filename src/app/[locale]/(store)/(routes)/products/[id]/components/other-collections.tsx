import { I18nTermsProductDetails, QueryParam, Routes } from '@/utils/constant';
import { capitalizeFirstLetter, renderLimitText } from '@/utils/fn';
import { TCollectionItem } from '@/utils/types';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useState } from 'react';
import 'swiper/css';
import { Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperClass } from 'swiper/types';

import ProductCardSkeleton from '../../../../components/product-card-skeleton';

const MAX_WORDS = 170;

export default function OtherCollections({
  collections,
  isLoading,
  currentCollectionId,
}: {
  collections: TCollectionItem[];
  isLoading: boolean;
  currentCollectionId: number;
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
    <div className='relative mb-16'>
      <div className='mx-6 flex items-center justify-between py-6 lg:mx-12'>
        <h1 className='text-xl font-semibold'>
          {capitalizeFirstLetter(t(I18nTermsProductDetails.OTHER_COLLECTIONS))}
        </h1>
      </div>
      {collections?.filter(
        (collection) => collection.id !== currentCollectionId
      ).length > 3 && (
        <div
          onClick={handlePrevious}
          className='absolute left-8 top-1/2 z-10 flex h-9 w-9 cursor-pointer items-center justify-center bg-gray-300 bg-opacity-50 transition duration-150 hover:bg-opacity-90'
        >
          <ChevronLeft className='h-6 w-6 text-black' />
        </div>
      )}
      <div className='category-slide mx-12'>
        <Swiper
          onSwiper={setSwiperRef}
          spaceBetween={10}
          slidesPerView={3}
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
              slidesPerView: 3,
              spaceBetween: 16,
            },
          }}
        >
          {collections
            ?.filter((collection) => collection.id !== currentCollectionId)
            .map((collection) => (
              <SwiperSlide key={collection.id}>
                <CollectionCard collection={collection} />
              </SwiperSlide>
            ))}
          {isLoading &&
            Array(3)
              .fill(0)
              .map((_, index) => (
                <SwiperSlide key={index}>
                  <ProductCardSkeleton />
                </SwiperSlide>
              ))}
        </Swiper>
      </div>
      {collections?.filter(
        (collection) => collection.id !== currentCollectionId
      ).length > 3 && (
        <div
          onClick={handleNext}
          className='absolute right-8 top-1/2 z-10 flex h-9 w-9 cursor-pointer items-center justify-center bg-gray-300 bg-opacity-50 transition duration-150 hover:bg-opacity-90'
        >
          <ChevronRight className='h-6 w-6 text-black' />
        </div>
      )}
    </div>
  );
}

function CollectionCard({ collection }: { collection: TCollectionItem }) {
  const locale = useLocale();
  return (
    <Link
      href={`${Routes.SEARCH}?${QueryParam.COLLECTION}=${collection.id}`}
      className='group mb-4'
    >
      <div className='relative'>
        {collection.images[0] && (
          <Image
            src={collection.images[0]}
            alt='collection'
            width={354}
            height={528}
            sizes='100vw'
            className={'h-[528px] w-full object-cover object-center'}
          />
        )}
      </div>
      <p className='my-4 font-bold lg:text-2xl'>
        {collection?.[`name_${locale}`]}
      </p>
      <p className='font-normal lg:text-base'>
        {renderLimitText({
          text: collection?.[`description_${locale}`],
          maxWords: MAX_WORDS,
        })}
      </p>
    </Link>
  );
}
