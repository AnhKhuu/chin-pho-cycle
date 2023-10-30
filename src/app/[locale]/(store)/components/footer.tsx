import { I18nTermsFooter } from '@/utils/constant';
import { capitalizeFirstLetter } from '@/utils/fn';
import { Facebook, MoveUp, Youtube } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import React from 'react';

export default function Footer() {
  const t = useTranslations('Footer');
  return (
    <footer className='relative bg-black px-44 py-24'>
      <div className='grid grid-cols-2 gap-24 text-white'>
        <div>
          <h1 className='text-2xl font-extrabold'>Chin Pho Cycle Vietnam</h1>
          <p className='mb-20 max-w-xs'>
            {capitalizeFirstLetter(t(I18nTermsFooter.COMPANY_ADDRESS))}
          </p>
          <Link
            href='tel: 0905188344'
            className='mb-6 block text-sm underline-offset-4 hover:underline'
          >
            0905188344
          </Link>
          <Link
            href='mailto:chinphocyclevietnam@gmail.com'
            className='block text-sm underline-offset-4 hover:underline'
          >
            chinphocyclevietnam@gmail.com
          </Link>
        </div>
        <div>
          <div className='grid grid-cols-3 gap-4'>
            <div className='mb-7'>
              <Link
                href={'/'}
                className='mb-5 block text-xs font-light underline-offset-4 hover:underline'
              >
                {capitalizeFirstLetter(t(I18nTermsFooter.SHIPPING))}
              </Link>
              <Link
                href={'/'}
                className='mb-5 block text-xs font-light underline-offset-4 hover:underline'
              >
                {capitalizeFirstLetter(t(I18nTermsFooter.RETURNS))}
              </Link>
              <Link
                href={'/'}
                className='mb-5 block text-xs font-light underline-offset-4 hover:underline'
              >
                {capitalizeFirstLetter(t(I18nTermsFooter.CRASH_REPLACEMENT))}
              </Link>
              <Link
                href={'/'}
                className='mb-5 block text-xs font-light underline-offset-4 hover:underline'
              >
                {capitalizeFirstLetter(t(I18nTermsFooter.PARTNERS))}
              </Link>
            </div>
            <div>
              <Link
                href={'/'}
                className='mb-5 flex items-center text-xs underline-offset-4 hover:underline'
              >
                <Facebook />
                <span className='ml-2 font-light'>Facebook</span>
              </Link>
              <Link
                href={'/'}
                className='flex items-center text-xs underline-offset-4 hover:underline'
              >
                <Youtube />
                <span className='ml-2 font-light'>Youtube</span>
              </Link>
            </div>
            <div className='flex justify-end'>
              <div
                className='flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white'
                onClick={() => {
                  window.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                  });
                }}
              >
                <MoveUp className='text-black' />
              </div>
            </div>
          </div>
          <p className='text-xs font-light'>
            © 2023 Chin Pho Cycle Vietnam. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
