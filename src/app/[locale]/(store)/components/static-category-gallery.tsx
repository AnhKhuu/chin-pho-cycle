'use client';

import { I18nTermsHome, bigShouldersDisplay } from '@/utils/constant';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export function StaticCategoryGallery() {
  const t = useTranslations('Home');
  return (
    <div
      className={`mb-16 grid grid-cols-2 gap-4 px-6 ${bigShouldersDisplay.className} text-6xl font-light text-white`}
    >
      <Link href={'/'} className='group relative col-span-1 h-[569px]'>
        <p className='absolute bottom-6 left-4 z-10'>
          {t(I18nTermsHome.MEN).toUpperCase()}
        </p>
        <Image
          src={'/images/men-category.png'}
          alt='men'
          fill
          sizes='100vw'
          className='object-cover object-center transition-transform duration-300 group-hover:opacity-0'
        />
        <Image
          src={'/images/men-category-2.png'}
          alt='men'
          fill
          sizes='100vw'
          className={
            'absolute bottom-0 left-0 right-0 top-0 object-cover object-center opacity-0 transition-transform duration-300 group-hover:opacity-100'
          }
        />
      </Link>
      <Link href={'/'} className='group relative col-span-1 h-[569px]'>
        <p className='absolute bottom-6 left-4 z-10'>
          {t(I18nTermsHome.WOMEN).toUpperCase()}
        </p>
        <Image
          src={'/images/women-category.png'}
          alt='men'
          fill
          sizes='100vw'
          className='object-cover object-center group-hover:hidden'
        />
        <Image
          src={'/images/women-category-2.png'}
          alt='men'
          fill
          sizes='100vw'
          className={'hidden object-cover object-center group-hover:block'}
        />
      </Link>
    </div>
  );
}
