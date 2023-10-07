import { Button, Input } from '@/components/ui';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { ProductCard } from '.';
import { products } from '../(routes)/mockData';

export function Header({}: React.HtmlHTMLAttributes<HTMLElement>) {
  return (
    <header className='relative w-full border-b bg-white'>
      <nav className='flex items-center justify-between px-6'>
        <Link href={'/'}>
          <Image
            src='/images/logo.webp'
            width={150}
            height={50}
            sizes='(max-width: 992) 80vw, 150px'
            style={{ width: '100%', height: 'auto' }}
            alt='logo'
          />
        </Link>
        <CategoriesList />
        <div className='flex items-center'>
          <SearchBar />
          <LanguageOptions />
          <ShoppingCart className='mx-6 cursor-pointer text-muted-foreground hover:text-black' />
          <AuthButton />
        </div>
      </nav>
    </header>
  );
}

const categories = [
  {
    title: 'Bikes',
    sessions: [
      {
        label: 'Featured',
        items: ['New Arrivals'],
      },
      {
        label: 'Products',
        items: [
          'Jerseys',
          'Longsleeve Jerseys',
          'Bib Shorts',
          'Long Bibs',
          'Gilets & Jackets',
        ],
      },
      {
        label: 'Collections',
        items: ['MAAP Spring/Summer'],
      },
    ],
  },
  {
    title: 'Men',
    sessions: [
      {
        label: 'Featured',
        items: ['New Arrivals'],
      },
      {
        label: 'Products',
        items: [
          'Jerseys',
          'Longsleeve Jerseys',
          'Bib Shorts',
          'Long Bibs',
          'Gilets & Jackets',
        ],
      },
      {
        label: 'Collections',
        items: ['MAAP Spring/Summer'],
      },
    ],
  },
  {
    title: 'Women',
    sessions: [
      {
        label: 'Featured',
        items: ['New Arrivals'],
      },
      {
        label: 'Products',
        items: [
          'Jerseys',
          'Longsleeve Jerseys',
          'Bib Shorts',
          'Long Bibs',
          'Gilets & Jackets',
        ],
      },
      {
        label: 'Collections',
        items: ['MAAP Spring/Summer'],
      },
    ],
  },
  {
    title: 'Brands',
    sessions: [
      {
        label: 'Premium Brands',
        items: ['Pas Normal Studios', 'Factor', 'MAAP'],
      },
    ],
  },
];

const pages = [
  { label: 'Events', link: '/events' },
  { label: 'Bike Fit', link: '/bike-fit' },
];

function CategoriesList() {
  return (
    <div className='flex self-stretch'>
      {categories.map(({ title, sessions }, index) => (
        <div key={index}>
          <div className='peer/brand flex h-16 cursor-pointer items-center px-6 text-sm underline-offset-4 transition duration-100 ease-in-out hover:underline'>
            {title}
          </div>
          <div className='invisible absolute left-0 top-16 h-auto w-screen bg-white_2 hover:visible peer-hover/brand:visible'>
            <div className='flex text-sm'>
              <div
                className={`grid w-3/5 gap-4 py-10 pl-10 grid-cols-${Object.keys(
                  sessions
                )?.length}`}
              >
                {sessions.map((session, sessionIndex) => (
                  <div key={sessionIndex}>
                    <p className='mb-2 font-semibold underline underline-offset-4'>
                      {session.label}
                    </p>
                    {session.items.map((item) => (
                      <Link
                        key={item}
                        href={'/'}
                        className='mb-1 block indent-4 underline-offset-4 hover:underline'
                      >
                        {item}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
              <div className='grid w-2/5 grid-cols-2 gap-4 py-10 pr-10'>
                <div className='h-[370px]'>
                  <ProductCard product={products[0]} />
                </div>
                <ProductCard product={products[0]} />
              </div>
            </div>
          </div>
        </div>
      ))}

      {pages.map(({ label, link }, index) => (
        <Link
          href={link}
          className='flex h-16 items-center px-6 text-sm underline-offset-4 transition duration-100 ease-in-out hover:underline'
          key={index}
        >
          {label}
        </Link>
      ))}
    </div>
  );
}

function SearchBar() {
  return (
    <div className='relative w-60'>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='absolute bottom-0 left-3 top-0 my-auto h-6 w-6 text-gray-500'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
        />
      </svg>
      <Input
        type='text'
        placeholder='Search'
        className='rounded-[100px] border-none bg-white_1 pl-12 pr-4'
      />
    </div>
  );
}

function LanguageOptions() {
  return (
    <svg
      width='40'
      height='30'
      viewBox='0 0 40 30'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className='ml-6'
    >
      <g clip-path='url(#clip0_108_262)'>
        <path d='M0 0H40V30H0V0Z' fill='#012169' />
        <path
          d='M4.6875 0L19.9375 11.3125L35.125 0H40V3.875L25 15.0625L40 26.1875V30H35L20 18.8125L5.0625 30H0V26.25L14.9375 15.125L0 4V0H4.6875Z'
          fill='white'
        />
        <path
          d='M26.5 17.5625L40 27.5V30L23.0625 17.5625H26.5ZM15 18.8125L15.375 21L3.375 30H0L15 18.8125ZM40 0V0.1875L24.4375 11.9375L24.5625 9.1875L36.875 0H40ZM0 0L14.9375 11H11.1875L0 2.625V0Z'
          fill='#C8102E'
        />
        <path
          d='M15.0625 0V30H25.0625V0H15.0625ZM0 10V20H40V10H0Z'
          fill='white'
        />
        <path
          d='M0 12.0625V18.0625H40V12.0625H0ZM17.0625 0V30H23.0625V0H17.0625Z'
          fill='#C8102E'
        />
      </g>
      <defs>
        <clipPath id='clip0_108_262'>
          <rect width='40' height='30' fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
}

function AuthButton() {
  return (
    <span className='ml-2'>
      <SignedIn>
        <UserButton afterSignOutUrl='/' />
      </SignedIn>
      <SignedOut>
        <SignInButton>
          <Button className='rounded-md'>Sign In</Button>
        </SignInButton>
      </SignedOut>
    </span>
  );
}
