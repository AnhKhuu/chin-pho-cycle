import { ProductCard } from '@/(root)/(store)/components';
import { TProductItem } from '@/utils/types';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCallback, useState } from 'react';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperClass } from 'swiper/types';

export default function RelativeProducts({
  productList,
}: {
  productList: TProductItem[];
}) {
  const [swiperRef, setSwiperRef] = useState<SwiperClass>();

  const handlePrevious = useCallback(() => {
    swiperRef?.slidePrev();
  }, [swiperRef]);

  const handleNext = useCallback(() => {
    swiperRef?.slideNext();
  }, [swiperRef]);
  return (
    <div className='relative'>
      <h1 className='mx-8 py-8 text-xl font-semibold'>You May Also Like</h1>
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
