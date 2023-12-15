'use client';

import { Routes, bigShouldersDisplay } from '@/utils/constant';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { TCategoryItem } from '../../../../utils/types';

export function StaticCategoryGallery({
  categories,
}: {
  categories: TCategoryItem[];
}) {
  const t = useTranslations('Home');
  const locale = useLocale();
  console.log({ categories });

  return (
    <div
      className={`mb-16 grid grid-cols-2 gap-4 px-12 ${bigShouldersDisplay.className} text-6xl font-light text-white`}
    >
      {categories?.slice(0, 2).map((category) => (
        <Link
          href={`${Routes.SEARCH}/category=${category.id}`}
          className='group relative col-span-1 h-[569px]'
          key={category.id}
        >
          <p className='absolute bottom-6 left-4 z-10'>
            {category[`name_${locale}`].toUpperCase()}
          </p>
          <Image
            src={category.images[0]}
            alt={category[`name_${locale}`]}
            fill
            sizes='100vw'
            className='object-cover object-center transition-transform duration-300 group-hover:opacity-0'
          />
          <Image
            src={category.images[1]}
            alt={category[`name_${locale}`]}
            fill
            sizes='100vw'
            className={
              'absolute bottom-0 left-0 right-0 top-0 object-cover object-center opacity-0 transition-transform duration-300 group-hover:opacity-100'
            }
          />
        </Link>
      ))}
    </div>
  );
}
