import { Facebook, MoveUp, Youtube } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const pages = [
  {
    link: '',
    label: 'Shipping',
  },
  {
    link: '',
    label: 'Returns',
  },
  {
    link: '',
    label: 'Crash Replacement',
  },
  {
    link: '',
    label: 'Partners',
  },
  {
    link: '',
    label: 'FAQ',
  },
];

export default function Footer() {
  return (
    <div className='relative bg-black px-44 py-24'>
      <div className='grid grid-cols-2 gap-24 text-white'>
        <div>
          <h1 className='text-2xl font-extrabold'>Chin Pho Cycle Vietnam</h1>
          <p className='mb-20 max-w-xs'>
            933 Hoang Sa St., Ward 11, Dist. 3, Ho Chi Minh City
          </p>
          <Link href='tel: 0905188344' className='mb-6 block text-sm underline'>
            0905188344
          </Link>
          <Link
            href='mailto:chinphocyclevietnam@gmail.com'
            className='block text-sm underline'
          >
            chinphocyclevietnam@gmail.com
          </Link>
        </div>
        <div>
          <div className='grid grid-cols-3 gap-4'>
            <div className='mb-7'>
              {pages.map((page, index) => (
                <Link
                  href={page.link}
                  key={index}
                  className='mb-5 block text-xs font-light'
                >
                  {page.label}
                </Link>
              ))}
            </div>
            <div>
              <Link href={'/'} className='mb-5 flex items-center text-xs'>
                <Facebook />
                <span className='ml-2 font-light'>Facebook</span>
              </Link>
              <Link href={'/'} className='flex items-center text-xs'>
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
    </div>
  );
}
