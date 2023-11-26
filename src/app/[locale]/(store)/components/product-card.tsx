import { I18nTermsProductCard, QueryParam, Routes } from '@/utils/constant';
import { capitalizeFirstLetter } from '@/utils/fn';
import { TVariantItem } from '@/utils/types';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function ProductCard({
  product,
  isLatest,
}: {
  product: TVariantItem;
  isLatest: boolean;
}) {
  const locale = useLocale();
  const t = useTranslations('ProductCard');
  const sizes = product.stocks.filter((size) => size.quantity > 0);

  return (
    <Link
      href={`${Routes.PRODUCT}/${product.id}?${QueryParam.TYPES}=${product.product.typeId}&${QueryParam.BRANDS}=${product.product.brandId}`}
      className='group mb-4'
    >
      <div className='relative'>
        {isLatest && (
          <div className='absolute right-0 top-0 bg-primary px-3 py-1 font-semibold text-white'>
            NEW!
          </div>
        )}
        <Image
          src={product.images[0]}
          alt='test'
          width={354}
          height={500}
          sizes='(max-width: 768px), 50vw, 25vw'
          className='h-52 w-full object-cover object-center group-hover:hidden sm:h-80 lg:h-80 xl:h-96'
        />
        <Image
          src={product.images[1]}
          alt='test'
          width={354}
          height={500}
          sizes='(max-width: 768px), 50vw, 25vw'
          className={
            'hidden h-52 w-full object-cover object-center group-hover:block sm:h-80 lg:h-80 xl:h-96'
          }
        />
        <div className='absolute bottom-0 right-0 ml-auto flex bg-white font-light transition duration-300 ease-in-out group-hover:opacity-100 xl:left-0 xl:opacity-0'>
          {sizes.map((size, index) => (
            <p className='mx-2' key={index}>
              {size.size}
            </p>
          ))}
        </div>
      </div>
      <p className='my-4 text-sm font-bold lg:text-base'>
        {product.product.brand[`name_${locale}`]}
      </p>
      <p className='text-sm font-bold lg:text-base'>
        {product.product[`name_${locale}`]}
      </p>
      <p className='text-sm font-normal lg:text-base'>
        {product[`name_${locale}`]} -{' '}
        {product.product.variants.length > 1
          ? `${product.product.variants.length} ${capitalizeFirstLetter(
              t(I18nTermsProductCard.COLORS)
            )}`
          : `${product.product.variants.length} ${capitalizeFirstLetter(
              t(I18nTermsProductCard.COLOR)
            )}`}
      </p>
      <p className='text-sm font-normal lg:text-base'>
        {product.product.price.toString()} VND
      </p>
    </Link>
  );
}
