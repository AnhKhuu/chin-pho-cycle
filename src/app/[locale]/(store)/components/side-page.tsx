import { I18nTermsHome, bigShouldersDisplay } from '@/utils/constant';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function SidePage() {
  const t = useTranslations('Home');

  const sidePageList = [
    {
      title: t(I18nTermsHome.EVENT).toUpperCase(),
      url: '/',
      imageUrl: '/images/event.png',
    },
    {
      title: t(I18nTermsHome.STORE).toUpperCase(),
      url: '/',
      imageUrl: '/images/store.png',
    },
    {
      title: t(I18nTermsHome.COMMUNITY).toUpperCase(),
      url: '/',
      imageUrl: '/images/community.png',
    },
  ];

  return (
    <div className='mx-6 my-16 grid h-[528px] grid-cols-3 gap-4'>
      {sidePageList.map((page, index) => (
        <Link
          href={page.url}
          key={index}
          className='group relative col-span-1 overflow-hidden'
        >
          <Image
            src={page.imageUrl}
            alt={page.title}
            fill
            className='object-cover object-center duration-300 group-hover:scale-110 group-hover:brightness-75'
          />
          <Image
            src={'/images/gray-background.png'}
            alt={page.title}
            width={323}
            height={120}
            className='absolute bottom-0 left-0'
          />
          <p
            className={`absolute bottom-6 left-5 text-6xl font-light text-white ${bigShouldersDisplay.className}`}
          >
            {page.title}
          </p>
        </Link>
      ))}
    </div>
  );
}
