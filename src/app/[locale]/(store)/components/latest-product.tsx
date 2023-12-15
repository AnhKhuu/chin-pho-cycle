import { I18nTermsHome, Routes } from '@/utils/constant';
import { TVariantItem } from '@/utils/types';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

import ProductCard from './product-card';
import ProductCardSkeleton from './product-card-skeleton';

export function LatestProduct({
  products,
  isLoading,
}: {
  products: TVariantItem[];
  isLoading: boolean;
}) {
  const t = useTranslations('Home');

  return (
    <div className='m-6 lg:my-16 lg:mx-12'>
      <div className='mb-12 flex justify-between'>
        <h1 className='text-base font-semibold lg:text-xl'>
          {t(I18nTermsHome.LATEST_PRODUCTS)}
        </h1>
        <Link
          href={Routes.SEARCH}
          className='font-normal hover:underline hover:underline-offset-4'
        >
          {t(I18nTermsHome.VIEW_MORE)} &gt;&gt;
        </Link>
      </div>
      {products && (
        <div className='grid grid-cols-2 gap-4 lg:grid-cols-4'>
          {products?.map((product) => (
            <ProductCard product={product} key={product.id} isLatest={true} />
          ))}
        </div>
      )}

      <div className='grid grid-cols-2 gap-4 lg:grid-cols-4'>
        {isLoading &&
          Array(8)
            .fill(0)
            .map((_, index) => <ProductCardSkeleton key={index} />)}
      </div>
    </div>
  );
}
