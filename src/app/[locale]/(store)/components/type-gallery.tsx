import { Skeleton } from '@/components';
import { I18nTermsHome, QueryParam, Routes } from '@/utils/constant';
import { capitalizeFirstLetter } from '@/utils/fn';
import { TCategoryItem, TTypeItem } from '@/utils/types';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import 'swiper/css';
import 'swiper/css/scrollbar';
import { Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export function TypeGallery({
  isLoading,
  categories,
}: {
  isLoading: boolean;
  categories: TCategoryItem[];
}) {
  const t = useTranslations('Home');

  return (
    <div className='category-slide mx-12 lg:my-16'>
      <h1 className='mb-6 text-xl font-semibold lg:mb-12'>
        {capitalizeFirstLetter(t(I18nTermsHome.CATEGORIES))}
      </h1>
      <Swiper
        slidesPerView={2.5}
        spaceBetween={10}
        scrollbar={true}
        modules={[Scrollbar]}
        className='mySwiper'
      >
        {!isLoading &&
          categories?.map((category) => (
            <div key={category.id}>
              {category?.types.map(
                (type) =>
                  type.isFeatured && (
                    <SwiperSlide key={type.id}>
                      <TypeCard type={type} categoryId={category.id} />
                    </SwiperSlide>
                  )
              )}
            </div>
          ))}
        {isLoading &&
          Array(3)
            .fill(0)
            .map((_, index) => (
              <SwiperSlide key={index}>
                <Skeleton className='h-96 w-full lg:h-[450px] xl:h-[600px]' />
              </SwiperSlide>
            ))}
      </Swiper>
    </div>
  );
}

function TypeCard({
  type,
  categoryId,
}: {
  type: TTypeItem;
  categoryId: number;
}) {
  const locale = useLocale();

  return (
    <Link
      href={`${Routes.SEARCH}?${QueryParam.CATEGORY}=${categoryId}&${QueryParam.TYPES}=${type.id}`}
      className='relative block h-96 w-full lg:h-[450px] xl:h-[600px]'
    >
      <Image
        src={type.images?.[0]}
        alt={type[`name_${locale}`].toUpperCase()}
        fill
        style={{
          objectFit: 'cover',
          objectPosition: 'center',
        }}
      />
      <div className='absolute bottom-16 left-9'>
        <p className={'text-6xl font-light text-white'}>
          {type[`name_${locale}`].toUpperCase()}
        </p>
      </div>
    </Link>
  );
}
