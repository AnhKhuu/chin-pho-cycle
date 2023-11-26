import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
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
import {
  I18nTermsHeader,
  QueryKeys,
  QueryParam,
  Routes,
} from '@/utils/constant';
import { capitalizeFirstLetter, parseSearchParams } from '@/utils/fn';
import {
  TBrandItem,
  TCategoryItem,
  TCollectionItem,
  TVariantItem,
} from '@/utils/types';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { zodResolver } from '@hookform/resolvers/zod';
import { AccordionContent } from '@radix-ui/react-accordion';
import axios from 'axios';
import { Menu, ShoppingCart, X } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next-intl/client';
import Link from 'next-intl/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQueries } from 'react-query';
import { z } from 'zod';

import {
  CategoryMenu,
  CategoryTitle,
  CategoryWrapper,
  TypeItem,
  TypeTitle,
} from './category';

export default function Header({}: React.HtmlHTMLAttributes<HTMLElement>) {
  const { offset, limit, column, order } = parseSearchParams({
    searchParams: {
      page: '1',
      perPage: '2',
    },
  });

  const [brands, collections, categories, products] = useQueries([
    {
      queryKey: [QueryKeys.BRANDS],
      queryFn: async () => await axios.get(`${process.env.BASE_URL}/brands`),
    },
    {
      queryKey: [QueryKeys.COLLECTIONS],
      queryFn: async () =>
        await axios.get(`${process.env.BASE_URL}/collections`),
    },
    {
      queryKey: [QueryKeys.CATEGORIES],
      queryFn: async () =>
        await axios.get(`${process.env.BASE_URL}/categories`),
    },
    {
      queryKey: [QueryKeys.PRODUCTS, 'header'],
      queryFn: async () =>
        await axios.post(`${process.env.BASE_URL}/variants/search`, {
          offset,
          limit,
          column,
          order,
          typeIds: [],
          brandIds: [],
          genders: [],
        }),
    },
  ]);

  return (
    <header className='sticky left-0 right-0 top-0 z-50'>
      <DesktopHeader
        brands={brands.data?.data}
        collections={collections.data?.data}
        categories={categories.data?.data}
        products={products.data?.data.variants}
      />
      <MobileHeader
        brands={brands.data?.data}
        collections={collections.data?.data}
        categories={categories.data?.data}
      />
    </header>
  );
}

function DesktopHeader({
  brands,
  collections,
  categories,
  products,
}: {
  brands: TBrandItem[];
  collections: TCollectionItem[];
  categories: TCategoryItem[];
  products: TVariantItem[];
}) {
  const [isShowShadow, setShowShadow] = useState(false);
  useEffect(() => {
    const scrollHandler = () => {
      window.scrollY > 10 ? setShowShadow(true) : setShowShadow(false);
    };
    window.addEventListener('scroll', scrollHandler);
    return () => window.removeEventListener('scroll', scrollHandler);
  }, [isShowShadow]);

  return (
    <nav
      className={`relative hidden w-full items-center justify-between bg-white px-6 xl:flex ${
        isShowShadow ? 'shadow-md' : ''
      }`}
    >
      <Link href={Routes.HOME}>
        <Image
          src='/images/CPC.png'
          width={127}
          height={51}
          sizes='100vw'
          alt='logo'
        />
      </Link>
      <Categories
        categories={categories}
        brands={brands}
        collections={collections}
        products={products}
      />
      <div className='flex items-center'>
        <DesktopSearchBar />
        <LanguageOptions />
        <ShoppingCart className='mx-6 cursor-pointer text-muted-foreground hover:text-black' />
        <AuthButton />
      </div>
    </nav>
  );
}

function MobileHeader({
  brands,
  collections,
  categories,
}: {
  brands: TBrandItem[];
  collections: TCollectionItem[];
  categories: TCategoryItem[];
}) {
  const [isShowMenu, setShowMenu] = useState(false);
  const [isShowSearchBox, setShowSearchBox] = useState(false);
  const [isShowShadow, setShowShadow] = useState(false);

  useEffect(() => {
    const scrollHandler = () => {
      window.scrollY > 10 ? setShowShadow(true) : setShowShadow(false);
    };
    window.addEventListener('scroll', scrollHandler);
    return () => window.removeEventListener('scroll', scrollHandler);
  }, [isShowShadow]);

  return (
    <nav
      className={`relative flex w-full items-center justify-between bg-white px-2 py-4 xl:hidden ${
        isShowShadow ? 'shadow-md' : ''
      }`}
    >
      <div className='flex items-center'>
        <Menu
          className='h-8 w-8 pr-2 text-muted-foreground'
          onClick={() => setShowMenu((prev) => !prev)}
        />
        <div
          className={`fixed inset-0 top-24 z-10 h-full w-screen ${
            isShowMenu ? '' : 'invisible'
          }`}
        >
          <div
            className={`absolute -top-24 left-0 h-full w-full overflow-y-scroll bg-white transition-all duration-300 ease-out ${
              isShowMenu ? '' : '-translate-x-full'
            }`}
          >
            <div className='mx-7 mt-4 flex items-center justify-between'>
              <X className='text-white' />
              <Link href={Routes.HOME}>
                <Image
                  src='/images/logo.webp'
                  width={90}
                  height={50}
                  sizes='(max-width: 992) 80vw, 90px'
                  style={{ width: '100%', height: 'auto' }}
                  alt='logo'
                />
              </Link>
              <X
                className='text-muted-foreground'
                onClick={() => setShowMenu((prev) => !prev)}
              />
            </div>
            <div className='mx-7 flex items-center'>
              <LanguageOptions />
            </div>
            <MobileMenu
              brands={brands}
              collections={collections}
              categories={categories}
            />
          </div>
        </div>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-6 w-6 text-muted-foreground'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
          onClick={() => setShowSearchBox((prev) => !prev)}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
          />
        </svg>
        <div
          className={`absolute left-0 right-0 top-14 flex h-fit flex-1 items-center justify-between bg-white_1 px-4 ${
            isShowSearchBox ? '' : 'invisible'
          }`}
        >
          <MobileSearchBar />
          <X
            className='text-muted-foreground'
            onClick={() => setShowSearchBox((prev) => !prev)}
          />
        </div>
      </div>
      <Link href={Routes.HOME}>
        <Image
          src='/images/logo.webp'
          width={90}
          height={50}
          sizes='(max-width: 992) 80vw, 90px'
          style={{ width: '100%', height: 'auto' }}
          alt='logo'
        />
      </Link>
      <div className='flex items-center'>
        <ShoppingCart className='mx-2 text-muted-foreground hover:text-black' />
        <AuthButton />
      </div>
    </nav>
  );
}

function MobileMenu({
  brands,
  collections,
  categories,
}: {
  brands: TBrandItem[];
  collections: TCollectionItem[];
  categories: TCategoryItem[];
}) {
  const locale = useLocale();
  const t = useTranslations('Header');
  return (
    <Accordion type='single' collapsible className='px-7'>
      <>
        {categories?.map((category) => (
          <AccordionItem value={category[`name_${locale}`]} key={category.id}>
            <AccordionTrigger className='underline-offset-4'>
              {category[`name_${locale}`]}
            </AccordionTrigger>
            <AccordionContent className='pl-4'>
              <Accordion type='single' collapsible>
                <FeaturedAccordion />
                <TypeAccordion category={category} />
                <CollectionAccordion collections={collections} />
              </Accordion>
            </AccordionContent>
          </AccordionItem>
        ))}
        <AccordionItem value={'brands'}>
          <AccordionTrigger className='underline-offset-4'>
            {capitalizeFirstLetter(t(I18nTermsHeader.BRAND))}
          </AccordionTrigger>
          {brands?.map((brand) => (
            <AccordionContent key={brand.id} className='pb-4 pl-4'>
              <Link href={`${Routes.SEARCH}?${QueryParam.BRANDS}=${brand.id}`}>
                {capitalizeFirstLetter(brand[`name_${locale}`])}
              </Link>
            </AccordionContent>
          ))}
        </AccordionItem>
        <Link
          href={'/events'}
          className='block w-full border-b py-4 font-medium'
        >
          {capitalizeFirstLetter(t(I18nTermsHeader.COMMUNITY))}
        </Link>
        <Link
          href={'/bike-fit'}
          className='block w-full border-b py-4 font-medium'
        >
          {capitalizeFirstLetter(t(I18nTermsHeader.BIKE_FIT))}
        </Link>
      </>
    </Accordion>
  );
}

function FeaturedAccordion() {
  const t = useTranslations('Header');

  return (
    <AccordionItem value={'featured'}>
      <AccordionTrigger className='pt-0 underline-offset-4'>
        {capitalizeFirstLetter(t(I18nTermsHeader.FEATURED))}
      </AccordionTrigger>
      <AccordionContent className='pb-4 pl-4'>
        {capitalizeFirstLetter(t(I18nTermsHeader.NEW_ARRIVAL))}
      </AccordionContent>
    </AccordionItem>
  );
}

function TypeAccordion({ category }: { category: TCategoryItem }) {
  const locale = useLocale();
  const t = useTranslations('Header');

  return (
    <AccordionItem value={'product'}>
      <AccordionTrigger className='underline-offset-4'>
        {capitalizeFirstLetter(t(I18nTermsHeader.PRODUCTS))}
      </AccordionTrigger>
      {category.types?.map((type) => (
        <AccordionContent key={type.id} className='pb-4 pl-4'>
          <Link
            href={`${Routes.SEARCH}?${QueryParam.CATEGORY}=${category.id}&${QueryParam.TYPES}=${type.id}`}
          >
            {capitalizeFirstLetter(type[`name_${locale}`])}
          </Link>
        </AccordionContent>
      ))}
    </AccordionItem>
  );
}

function CollectionAccordion({
  collections,
}: {
  collections: TCollectionItem[];
}) {
  const locale = useLocale();
  const t = useTranslations('Header');

  return (
    <AccordionItem value={'collection'}>
      <AccordionTrigger className='underline-offset-4'>
        {capitalizeFirstLetter(t(I18nTermsHeader.COLLECTIONS))}
      </AccordionTrigger>
      {collections?.map((collection) => (
        <AccordionContent key={collection.id} className='pb-4 pl-4'>
          <Link href={`${Routes.SEARCH}?collection=${collection.id}`}>
            {capitalizeFirstLetter(collection[`name_${locale}`])}
          </Link>
        </AccordionContent>
      ))}
    </AccordionItem>
  );
}

interface ICategoriesProps {
  categories: TCategoryItem[];
  brands: TBrandItem[];
  collections: TCollectionItem[];
  products: TVariantItem[];
}

function Categories({
  categories,
  collections,
  brands,
  products,
}: ICategoriesProps) {
  const locale = useLocale();
  const t = useTranslations('Header');

  return (
    <div className='flex self-stretch'>
      {categories?.map((category, index) => (
        <CategoryItem
          key={index}
          collections={collections}
          category={category}
          title={capitalizeFirstLetter(category[`name_${locale}`])}
          products={products}
        />
      ))}
      <Brands brands={brands} title={t(I18nTermsHeader.BRAND)} />
      <Link
        href={'/events'}
        className='flex h-16 items-center border-b-2 border-white text-sm transition duration-100 ease-in-out hover:border-black lg:px-4 xl:px-6'
      >
        {capitalizeFirstLetter(t(I18nTermsHeader.COMMUNITY))}
      </Link>
      <Link
        href={'/bike-fit'}
        className='flex h-16 items-center border-b-2 border-white text-sm transition duration-100 ease-in-out hover:border-black lg:px-4 xl:px-6'
      >
        {capitalizeFirstLetter(t(I18nTermsHeader.BIKE_FIT))}
      </Link>
    </div>
  );
}

function CategoryItem({
  title,
  category,
  collections,
  products,
}: {
  title: string;
  category: TCategoryItem;
  collections: TCollectionItem[];
  products: TVariantItem[];
}) {
  const locale = useLocale();
  const t = useTranslations('Header');
  return (
    <CategoryWrapper>
      <CategoryTitle>{capitalizeFirstLetter(title)}</CategoryTitle>
      <CategoryMenu>
        <div className='grid w-3/5 grid-cols-3 gap-4 py-10 pl-10'>
          <div>
            <TypeTitle>
              {capitalizeFirstLetter(t(I18nTermsHeader.FEATURED))}
            </TypeTitle>
            <TypeItem url={`${Routes.SEARCH}?category=${category?.id}`}>
              {capitalizeFirstLetter(t(I18nTermsHeader.NEW_ARRIVAL))}
            </TypeItem>
          </div>
          <div>
            <TypeTitle>
              {capitalizeFirstLetter(t(I18nTermsHeader.PRODUCTS))}
            </TypeTitle>
            {category?.types?.map((type) => (
              <TypeItem
                url={`${Routes.SEARCH}?${QueryParam.CATEGORY}=${category.id}&${QueryParam.TYPES}=${type.id}`}
                key={type.id}
              >
                {capitalizeFirstLetter(type[`name_${locale}`])}
              </TypeItem>
            ))}
          </div>
          <div>
            <TypeTitle>
              {capitalizeFirstLetter(t(I18nTermsHeader.COLLECTIONS))}
            </TypeTitle>
            {collections?.map((collection) => (
              <TypeItem
                url={`${Routes.SEARCH}?collection=${collection.id}`}
                key={collection.id}
              >
                {capitalizeFirstLetter(collection[`name_${locale}`])}
              </TypeItem>
            ))}
          </div>
        </div>
        <div className='grid w-2/5 grid-cols-2 gap-4 py-10 pr-10'>
          {products?.map((product) => (
            <ProductImage product={product} key={product.id} />
          ))}
        </div>
      </CategoryMenu>
    </CategoryWrapper>
  );
}

function Brands({ title, brands }: { title: string; brands: TBrandItem[] }) {
  const locale = useLocale();
  const t = useTranslations('Header');

  return (
    <CategoryWrapper>
      <CategoryTitle>{capitalizeFirstLetter(title)}</CategoryTitle>
      <CategoryMenu>
        <div className='grid w-3/5 grid-cols-3 gap-4 py-10 pl-10'>
          <div>
            <TypeTitle>
              {capitalizeFirstLetter(t(I18nTermsHeader.BRAND))}
            </TypeTitle>
            {brands?.map((brand) => (
              <TypeItem
                url={`${Routes.SEARCH}?${QueryParam.BRANDS}=${brand.id}`}
                key={brand.id}
              >
                {capitalizeFirstLetter(brand[`name_${locale}`])}
              </TypeItem>
            ))}
          </div>
        </div>
        <div className='grid w-2/5 grid-cols-2 gap-4 py-10 pr-10'>
          {brands
            ?.slice(0, 2)
            .map((brand) => <BrandImage brand={brand} key={brand.id} />)}
        </div>
      </CategoryMenu>
    </CategoryWrapper>
  );
}

function ProductImage({ product }: { product: TVariantItem }) {
  const locale = useLocale();
  return (
    <Link
      href={`${Routes.PRODUCT}/${product.id}?${QueryParam.TYPES}=${product.product.typeId}&${QueryParam.BRANDS}=${product.product.brandId}`}
      className='mb-4'
    >
      <div className='relative'>
        <Image
          src={product?.images[0]}
          alt='test'
          width={500}
          height={510}
          sizes='(max-width: 768px), 50vw, 25vw'
          className='h-64 w-full object-cover object-center'
        />
        <div className='absolute bottom-0 right-0 flex w-full bg-white pl-2 transition duration-300 ease-in-out'>
          {capitalizeFirstLetter(product?.product[`name_${locale}`])}
        </div>
      </div>
    </Link>
  );
}

function BrandImage({ brand }: { brand: TBrandItem }) {
  const locale = useLocale();
  return (
    <Link
      href={`${Routes.SEARCH}?${QueryParam.BRANDS}=${brand.id}`}
      className='mb-4'
    >
      <div className='relative'>
        <Image
          src={brand?.imageUrl}
          alt='test'
          width={500}
          height={510}
          sizes='(max-width: 768px), 50vw, 25vw'
          className='h-64 w-full object-cover object-center'
        />
        <div className='absolute bottom-0 right-0 flex w-full bg-white pl-2 transition duration-300 ease-in-out'>
          {capitalizeFirstLetter(brand[`name_${locale}`])}
        </div>
      </div>
    </Link>
  );
}

function DesktopSearchBar() {
  const { push } = useRouter();
  const t = useTranslations('Header');

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
    push(`${Routes.SEARCH}?${QueryParam.NAME}=${values.productName}`);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='productName'
          render={({ field }) => (
            <FormItem>
              <FormControl className='hidden lg:block'>
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
                    placeholder={t(I18nTermsHeader.SEARCH)}
                    className='rounded-full border-none bg-white_1 pl-12 pr-4'
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
function MobileSearchBar() {
  const { push } = useRouter();
  const t = useTranslations('Header');

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
    push(`${Routes.SEARCH}?${QueryParam.NAME}=${values.productName}`);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-8'>
        <FormField
          control={form.control}
          name='productName'
          render={({ field }) => (
            <FormItem>
              <FormControl className='lg:hidden'>
                <Input
                  type='text'
                  placeholder={t(I18nTermsHeader.SEARCH)}
                  className='w-full rounded-none border-none bg-white_1 px-0 lg:hidden'
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

function LanguageOptions() {
  const t = useTranslations('Header');
  const locale = useLocale();
  const pathname = usePathname();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='ml-lg-6'>
        <div className='ml-6 hidden xl:block'>
          {locale === 'vi' ? <VNFlag /> : <UKFlag />}
        </div>
        <div className='xl:hidden'>
          {locale === 'vi' ? (
            <p className='text-muted-foreground'>
              {capitalizeFirstLetter(t(I18nTermsHeader.VIETNAMESE))}
            </p>
          ) : (
            <p className='text-muted-foreground'>
              {capitalizeFirstLetter(t(I18nTermsHeader.ENGLISH))}
            </p>
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuRadioGroup>
          <DropdownMenuRadioItem value={locale}>
            <Link href={pathname} locale='en'>
              <div className='flex cursor-pointer items-center'>
                <UKFlag />
                <p className='ml-3'>
                  {capitalizeFirstLetter(t(I18nTermsHeader.ENGLISH))}
                </p>
              </div>
            </Link>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            value='vi'
            className='flex cursor-pointer items-center'
          >
            <Link href={pathname} locale='vi'>
              <div className='flex cursor-pointer items-center'>
                <VNFlag />
                <p className='ml-3'>
                  {capitalizeFirstLetter(t(I18nTermsHeader.VIETNAMESE))}
                </p>
              </div>
            </Link>
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
