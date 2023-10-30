
import { TProductItem } from '@/utils/types';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCallback, useState } from 'react';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperClass } from 'swiper/types';
import ProductCard from '../../../../components/product-card';
import { useTranslations } from 'next-intl';
import { capitalizeFirstLetter } from '../../../../../../../utils/fn';
import { I18nTermsProductDetails } from '../../../../../../../utils/constant';

export default function RelativeProducts({
  productList,
}: {
  productList: TProductItem[];
}) {
  const t = useTranslations('ProductDetails')
  const [swiperRef, setSwiperRef] = useState<SwiperClass>();

  const handlePrevious = useCallback(() => {
    swiperRef?.slidePrev();
  }, [swiperRef]);

  const handleNext = useCallback(() => {
    swiperRef?.slideNext();
  }, [swiperRef]);
  return (
    <div className='relative'>
      <h1 className='mx-8 py-8 text-xl font-semibold'>{capitalizeFirstLetter(t(I18nTermsProductDetails.YOU_MAY_ALSO_LIKE))}</h1>
      <ChevronLeft
        onClick={handlePrevious}
        className='absolute left-0 top-1/2 cursor-pointer'
      />
      <div className='mx-8'>
        <Swiper onSwiper={setSwiperRef} spaceBetween={16} slidesPerView={4}>
          {productList.map((product) => (
            <SwiperSlide key={product.id}>
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <ChevronRight
        onClick={handleNext}
        className='absolute right-0 top-1/2 cursor-pointer'
      />
    </div>
  );
}
