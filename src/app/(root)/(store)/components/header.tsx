import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
  Form,
  FormControl,
  FormField,
  FormItem,
  Input,
} from '@/components';
import { PublicApi, QueryKeys, Routes } from '@/utils/constant';
import { capitalizeFirstLetter } from '@/utils/fn';
import { products } from '@/utils/mockData';
import { TBrandItem, TCategoryItem, TProductItem } from '@/utils/types';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQueries } from 'react-query';
import { z } from 'zod';

import {
  CategoryMenu,
  CategoryTitle,
  CategoryWrapper,
  SubCategoryItem,
  SubCategoryTitle,
} from './category';

export default function Header({}: React.HtmlHTMLAttributes<HTMLElement>) {
  const [bike, men, women, brand] = useQueries([
    {
      queryKey: [QueryKeys.CATEGORY, 'bike'],
      queryFn: async () => await axios.get(`${PublicApi.CATEGORIES}?name=bike`),
    },
    {
      queryKey: [QueryKeys.CATEGORY, 'men'],
      queryFn: async () => await axios.get(`${PublicApi.CATEGORIES}?name=men`),
    },
    {
      queryKey: [QueryKeys.CATEGORY, 'women'],
      queryFn: async () =>
        await axios.get(`${PublicApi.CATEGORIES}?name=women`),
    },
    {
      queryKey: [QueryKeys.BRANDS],
      queryFn: async () => await axios.get(`${PublicApi.BRANDS}`),
    },
  ]);

  return (
    <header className='sticky left-0 right-0 top-0 z-50'>
      <nav className='relative flex w-full items-center justify-between bg-white px-6'>
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
        <Categories
          categoryList={{
            bike: bike.data?.data,
            men: men.data?.data,
            women: women.data?.data,
            brand: brand.data?.data,
          }}
        />
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

const pages = [
  { label: 'Events', link: '/events' },
  { label: 'Bike Fit', link: '/bike-fit' },
];

interface ICategoriesProps {
  categoryList: {
    bike: TCategoryItem;
    men: TCategoryItem;
    women: TCategoryItem;
    brand: TBrandItem[];
  };
}

function Categories({ categoryList }: ICategoriesProps) {
  return (
    <div className='flex self-stretch'>
      <CategoryItem category={categoryList.bike} title={'bike'} />
      <CategoryItem category={categoryList.men} title={'men'} />
      <CategoryItem category={categoryList.women} title={'women'} />
      <Brands brandList={categoryList.brand} title={'brand'} />
      {pages.map(({ label, link }, index) => (
        <Link
          href={link}
          className='flex h-16 items-center border-b-2 border-white px-6 text-sm transition duration-100 ease-in-out hover:border-black'
          key={index}
        >
          {label}
        </Link>
      ))}
    </div>
  );
}

function CategoryItem({
  title,
  category,
}: {
  title: string;
  category: TCategoryItem;
}) {
  return (
    <CategoryWrapper>
      <CategoryTitle>{capitalizeFirstLetter(title)}</CategoryTitle>
      <CategoryMenu>
        <div className='grid w-3/5 grid-cols-3 gap-4 py-10 pl-10'>
          <div>
            <SubCategoryTitle>Featured</SubCategoryTitle>
            <SubCategoryItem url={`${Routes.SEARCH}?category=${category?.id}`}>
              New Arrivals
            </SubCategoryItem>
          </div>
          <div>
            <SubCategoryTitle>Products</SubCategoryTitle>
            {category?.subCategories?.map(({ id, value }) => (
              <SubCategoryItem
                url={`${Routes.SEARCH}?category=${title}&subCategory=${id}`}
                key={id}
              >
                {capitalizeFirstLetter(value)}
              </SubCategoryItem>
            ))}
          </div>
          <div>
            <SubCategoryTitle>Collections</SubCategoryTitle>
            <SubCategoryItem
              url={`${Routes.SEARCH}?category=${title}&collection=MAAP`}
            >
              New Arrivals
            </SubCategoryItem>
          </div>
        </div>
        <div className='grid w-2/5 grid-cols-2 gap-4 py-10 pr-10'>
          <ProductImage product={products[0]} />
          <ProductImage product={products[0]} />
        </div>
      </CategoryMenu>
    </CategoryWrapper>
  );
}

function Brands({
  title,
  brandList,
}: {
  title: string;
  brandList: TBrandItem[];
}) {
  return (
    <CategoryWrapper>
      <CategoryTitle>{capitalizeFirstLetter(title)}</CategoryTitle>
      <CategoryMenu>
        <div className='grid w-3/5 grid-cols-3 gap-4 py-10 pl-10'>
          <div>
            <SubCategoryTitle>Brands</SubCategoryTitle>
            {brandList?.map(({ id, name }) => (
              <SubCategoryItem url={`${Routes.SEARCH}?brand=${name}`} key={id}>
                {capitalizeFirstLetter(name)}
              </SubCategoryItem>
            ))}
          </div>
        </div>
        <div className='grid w-2/5 grid-cols-2 gap-4 py-10 pr-10'>
          <ProductImage product={products[0]} />
          <ProductImage product={products[0]} />
        </div>
      </CategoryMenu>
    </CategoryWrapper>
  );
}

function ProductImage({ product }: { product: TProductItem }) {
  return (
    <Link href={'/'} className='mb-4'>
      <div className='relative'>
        <Image
          src={product.imageUrl}
          alt='test'
          width={500}
          height={510}
          sizes='(max-width: 768px), 50vw, 25vw'
          className='h-64 w-full object-cover object-center'
        />
        <div className='absolute bottom-0 right-0 flex w-full bg-white pl-2 transition duration-300 ease-in-out'>
          {product.productName}
        </div>
      </div>
    </Link>
  );
}

function SearchBar() {
  const { push } = useRouter();

  const formSchema = z.object({
    productName: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: '',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    push(`${Routes.SEARCH}?name=${values.productName}`);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='productName'
          render={({ field }) => (
            <FormItem>
              <FormControl>
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
                    {...field}
                  />
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

function LanguageOptions() {
  const [language, setLanguage] = useState('uk');
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='ml-6'>
        {language === 'uk' ? <UKFlag /> : <VNFlag />}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuRadioGroup value={language} onValueChange={setLanguage}>
          <DropdownMenuRadioItem
            value='uk'
            className='flex cursor-pointer items-center'
          >
            <UKFlag />
            <p className='ml-3'>English</p>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            value='vn'
            className='flex cursor-pointer items-center'
          >
            <VNFlag />
            <p className='ml-3'>Vietnamese</p>
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
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

function UKFlag() {
  return (
    <svg
      width='40'
      height='30'
      viewBox='0 0 40 30'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g clipPath='url(#clip0_108_262)'>
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

function VNFlag() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='40'
      height='30'
      viewBox='0 0 40 30'
      fill='none'
    >
      <path d='M15.3626 0H0V30H40V0H15.3626Z' fill='#D80027' />
      <path
        d='M20 6L22.1247 12.8753H29L23.4376 17.1245L25.5624 24L20 19.7507L14.4376 24L16.5624 17.1245L11 12.8753H17.8753L20 6Z'
        fill='#FFDA44'
      />
    </svg>
  );
}
