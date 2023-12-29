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
import {
  CATEGORY,
  I18nTermsHeader,
  PublicApi,
  QueryKeys,
  QueryParam,
  Routes,
} from '@/utils/constant';
import { capitalizeFirstLetter } from '@/utils/fn';
import { TBrandItem, TCategoryItem, TProductItem } from '@/utils/types';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { ShoppingCart } from 'lucide-react';
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
  const [brands, categories] = useQueries([
    {
      queryKey: [QueryKeys.BRANDS],
      queryFn: async () =>
        await axios.get(`${process.env.BASE_URL}/${PublicApi.BRANDS}`),
    },
    {
      queryKey: [QueryKeys.CATEGORIES],
      queryFn: async () =>
        await axios.get(`${process.env.BASE_URL}/${PublicApi.CATEGORIES}`),
    },
  ]);

  return (
    <header className='sticky left-0 right-0 top-0 z-10'>
      <DesktopHeader
        brands={brands.data?.data}
        categories={categories.data?.data}
      />
      {/* <MobileHeader
        brands={brands.data?.data}
        categories={categories.data?.data}
      /> */}
    </header>
  );
}

function DesktopHeader({
  brands,
  categories,
}: {
  brands: TBrandItem[];
  categories: TCategoryItem[];
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
      className={`relative hidden w-full items-center justify-between bg-white px-12 xl:flex ${
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
      <Categories categories={categories} brands={brands} />
      <div className='flex items-center'>
        <DesktopSearchBar />
        <LanguageOptions />
        <ShoppingCart className='mx-6 cursor-pointer text-muted-foreground hover:text-black' />
        <AuthButton />
      </div>
    </nav>
  );
}

// function MobileHeader({
//   brands,
//   categories,
// }: {
//   brands: TBrandItem[];
//   categories: TCategoryItem[];
// }) {
//   const [isShowMenu, setShowMenu] = useState(false);
//   const [isShowSearchBox, setShowSearchBox] = useState(false);
//   const [isShowShadow, setShowShadow] = useState(false);

//   useEffect(() => {
//     const scrollHandler = () => {
//       window.scrollY > 10 ? setShowShadow(true) : setShowShadow(false);
//     };
//     window.addEventListener('scroll', scrollHandler);
//     return () => window.removeEventListener('scroll', scrollHandler);
//   }, [isShowShadow]);

//   return (
//     <nav
//       className={`relative flex w-full items-center justify-between bg-white px-2 py-4 xl:hidden ${
//         isShowShadow ? 'shadow-md' : ''
//       }`}
//     >
//       <div className='flex items-center'>
//         <Menu
//           className='h-8 w-8 pr-2 text-muted-foreground'
//           onClick={() => setShowMenu((prev) => !prev)}
//         />
//         <div
//           className={`fixed inset-0 top-24 z-10 h-full w-screen ${
//             isShowMenu ? '' : 'invisible'
//           }`}
//         >
//           <div
//             className={`absolute -top-24 left-0 h-full w-full overflow-y-scroll bg-white transition-all duration-300 ease-out ${
//               isShowMenu ? '' : '-translate-x-full'
//             }`}
//           >
//             <div className='mx-7 mt-4 flex items-center justify-between'>
//               <X className='text-white' />
//               <Link href={Routes.HOME}>
//                 <Image
//                   src='/images/logo.webp'
//                   width={90}
//                   height={50}
//                   sizes='(max-width: 992) 80vw, 90px'
//                   style={{ width: '100%', height: 'auto' }}
//                   alt='logo'
//                 />
//               </Link>
//               <X
//                 className='text-muted-foreground'
//                 onClick={() => setShowMenu((prev) => !prev)}
//               />
//             </div>
//             <div className='mx-7 flex items-center'>
//               <LanguageOptions />
//             </div>
//             {/* <MobileMenu
//               brands={brands}
//               collections={collections}
//               categories={categories}
//             /> */}
//           </div>
//         </div>
//         <svg
//           xmlns='http://www.w3.org/2000/svg'
//           className='h-6 w-6 text-muted-foreground'
//           fill='none'
//           viewBox='0 0 24 24'
//           stroke='currentColor'
//           onClick={() => setShowSearchBox((prev) => !prev)}
//         >
//           <path
//             strokeLinecap='round'
//             strokeLinejoin='round'
//             strokeWidth={2}
//             d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
//           />
//         </svg>
//         <div
//           className={`absolute left-0 right-0 top-14 flex h-fit flex-1 items-center justify-between bg-white_1 px-4 ${
//             isShowSearchBox ? '' : 'invisible'
//           }`}
//         >
//           <MobileSearchBar />
//           <X
//             className='text-muted-foreground'
//             onClick={() => setShowSearchBox((prev) => !prev)}
//           />
//         </div>
//       </div>
//       <Link href={Routes.HOME}>
//         <Image
//           src='/images/logo.webp'
//           width={90}
//           height={50}
//           sizes='(max-width: 992) 80vw, 90px'
//           style={{ width: '100%', height: 'auto' }}
//           alt='logo'
//         />
//       </Link>
//       <div className='flex items-center'>
//         <ShoppingCart className='mx-2 text-muted-foreground hover:text-black' />
//         <AuthButton />
//       </div>
//     </nav>
//   );
// }

// function MobileMenu({
//   brands,
//   collections,
//   categories,
// }: {
//   brands: TBrandItem[];
//   collections: TCollectionItem[];
//   categories: TCategoryItem[];
// }) {
//   const locale = useLocale();
//   const t = useTranslations('Header');
//   return (
//     <Accordion type='single' collapsible className='px-7'>
//       <>
//         {categories?.map((category) => (
//           <AccordionItem value={category[`name_${locale}`]} key={category.id}>
//             <AccordionTrigger className='underline-offset-4'>
//               {category[`name_${locale}`]}
//             </AccordionTrigger>
//             <AccordionContent className='pl-4'>
//               <Accordion type='single' collapsible>
//                 <FeaturedAccordion />
//                 <TypeAccordion category={category} />
//                 <CollectionAccordion collections={collections} />
//               </Accordion>
//             </AccordionContent>
//           </AccordionItem>
//         ))}
//         <AccordionItem value={'brands'}>
//           <AccordionTrigger className='underline-offset-4'>
//             {capitalizeFirstLetter(t(I18nTermsHeader.BRAND))}
//           </AccordionTrigger>
//           {brands?.map((brand) => (
//             <AccordionContent key={brand.id} className='pb-4 pl-4'>
//               <Link href={`${Routes.SEARCH}?${QueryParam.BRANDS}=${brand.id}`}>
//                 {capitalizeFirstLetter(brand[`name_${locale}`])}
//               </Link>
//             </AccordionContent>
//           ))}
//         </AccordionItem>
//         <Link
//           href={'/events'}
//           className='block w-full border-b py-4 font-medium'
//         >
//           {capitalizeFirstLetter(t(I18nTermsHeader.COMMUNITY))}
//         </Link>
//         <Link
//           href={'/bike-fit'}
//           className='block w-full border-b py-4 font-medium'
//         >
//           {capitalizeFirstLetter(t(I18nTermsHeader.BIKE_FIT))}
//         </Link>
//       </>
//     </Accordion>
//   );
// }

// function FeaturedAccordion() {
//   const t = useTranslations('Header');

//   return (
//     <AccordionItem value={'featured'}>
//       <AccordionTrigger className='pt-0 underline-offset-4'>
//         {capitalizeFirstLetter(t(I18nTermsHeader.FEATURED))}
//       </AccordionTrigger>
//       <AccordionContent className='pb-4 pl-4'>
//         {capitalizeFirstLetter(t(I18nTermsHeader.NEW_ARRIVAL))}
//       </AccordionContent>
//     </AccordionItem>
//   );
// }

// function TypeAccordion({ category }: { category: TCategoryItem }) {
//   const locale = useLocale();
//   const t = useTranslations('Header');

//   return (
//     <AccordionItem value={'product'}>
//       <AccordionTrigger className='underline-offset-4'>
//         {capitalizeFirstLetter(t(I18nTermsHeader.PRODUCTS))}
//       </AccordionTrigger>
//       {category.types?.map((type) => (
//         <AccordionContent key={type.id} className='pb-4 pl-4'>
//           <Link
//             href={`${Routes.SEARCH}?${QueryParam.CATEGORY}=${category.id}&${QueryParam.TYPES}=${type.id}`}
//           >
//             {capitalizeFirstLetter(type[`name_${locale}`])}
//           </Link>
//         </AccordionContent>
//       ))}
//     </AccordionItem>
//   );
// }

// function CollectionAccordion({
//   collections,
// }: {
//   collections: TCollectionItem[];
// }) {
//   const locale = useLocale();
//   const t = useTranslations('Header');

//   return (
//     <AccordionItem value={'collection'}>
//       <AccordionTrigger className='underline-offset-4'>
//         {capitalizeFirstLetter(t(I18nTermsHeader.COLLECTIONS))}
//       </AccordionTrigger>
//       {collections?.map((collection) => (
//         <AccordionContent key={collection.id} className='pb-4 pl-4'>
//           <Link href={`${Routes.SEARCH}?collection=${collection.id}`}>
//             {capitalizeFirstLetter(collection[`name_${locale}`])}
//           </Link>
//         </AccordionContent>
//       ))}
//     </AccordionItem>
//   );
// }

interface ICategoriesProps {
  categories: TCategoryItem[];
  brands: TBrandItem[];
}

function Categories({ categories, brands }: ICategoriesProps) {
  const t = useTranslations('Header');
  const categoryList: { value: string; title: string }[] = [
    { title: t(I18nTermsHeader.BIKES), value: CATEGORY.BIKES },
    { title: t(I18nTermsHeader.MEN), value: CATEGORY.MEN },
    { title: t(I18nTermsHeader.WOMEN), value: CATEGORY.WOMEN },
    { title: t(I18nTermsHeader.ACCESSORIES), value: CATEGORY.ACCESSORIES },
  ];

  return (
    <div className='flex self-stretch'>
      {categoryList.map(({ title, value }) => (
        <CategoryItem
          key={value}
          category={categories?.find(
            (cat) => cat.name_en.toLowerCase() === value
          )}
          title={title}
          categoryName={value}
          bikeAccessoryCategory={categories?.find(
            (cat) => cat.name_en.toLowerCase() === CATEGORY.BIKE_ACCESSORIES
          )}
          personalAccessoryCategory={categories?.find(
            (cat) => cat.name_en.toLowerCase() === CATEGORY.PERSONAL_ACCESSORIES
          )}
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
  categoryName,
  bikeAccessoryCategory,
  personalAccessoryCategory,
}: {
  title: string;
  category?: TCategoryItem;
  bikeAccessoryCategory?: TCategoryItem;
  personalAccessoryCategory?: TCategoryItem;
  categoryName: string;
}) {
  return (
    <CategoryWrapper>
      <CategoryTitle>{title}</CategoryTitle>
      <CategoryMenu>
        {renderCategoryByName({
          categoryName,
          category,
          bikeAccessoryCategory,
          personalAccessoryCategory,
        })}
      </CategoryMenu>
    </CategoryWrapper>
  );
}

function renderCategoryByName({
  categoryName,
  category,
  bikeAccessoryCategory,
  personalAccessoryCategory,
}: {
  categoryName: string;
  category?: TCategoryItem;
  bikeAccessoryCategory?: TCategoryItem;
  personalAccessoryCategory?: TCategoryItem;
}) {
  switch (categoryName.toLowerCase()) {
    case CATEGORY.BIKES:
      return <BikeCategory category={category} />;
    case CATEGORY.MEN:
      return <GenderCategory category={category} />;
    case CATEGORY.WOMEN:
      return <GenderCategory category={category} />;
    case CATEGORY.ACCESSORIES:
      return (
        <AccessoryCategory
          bikeAccessoryCategory={bikeAccessoryCategory as TCategoryItem}
          personalAccessoryCategory={personalAccessoryCategory as TCategoryItem}
        />
      );
  }
}

function BikeCategory({ category }: { category?: TCategoryItem }) {
  const t = useTranslations('Header');
  const locale = useLocale();

  return (
    <>
      <div className='grid w-3/5 grid-cols-1 gap-4 py-10 pl-10'>
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
      </div>
      <div className='grid w-2/5 grid-cols-2 gap-4 py-10 pr-10'>
        {category?.products
          .slice(0, 2)
          .map((product) => (
            <ProductImage product={product} key={product.id} />
          ))}
      </div>
    </>
  );
}

function GenderCategory({ category }: { category?: TCategoryItem }) {
  const t = useTranslations('Header');
  const locale = useLocale();
  return (
    <>
      {category && (
        <div className='grid w-3/5 grid-cols-3 gap-4 py-10 pl-10'>
          <div>
            <TypeTitle>
              {capitalizeFirstLetter(t(I18nTermsHeader.FEATURED))}
            </TypeTitle>
            <TypeItem
              url={`${Routes.SEARCH}?${QueryParam.CATEGORY}=${category?.id}`}
            >
              {capitalizeFirstLetter(t(I18nTermsHeader.NEW_ARRIVAL))}
            </TypeItem>
            <TypeItem
              url={`${Routes.SEARCH}?${QueryParam.CATEGORY}=${category?.id}`}
            >
              {capitalizeFirstLetter(t(I18nTermsHeader.BUNDLE))}
            </TypeItem>
            <TypeItem
              url={`${Routes.SEARCH}?${QueryParam.CATEGORY}=${category?.id}`}
            >
              {t(I18nTermsHeader.CLEARANCE_SAVE)}
            </TypeItem>
          </div>
          {category?.types?.length > 0 && (
            <div>
              <TypeTitle>
                {capitalizeFirstLetter(t(I18nTermsHeader.PRODUCTS))}
              </TypeTitle>
              {category?.types.map((type) => (
                <TypeItem
                  url={`${Routes.SEARCH}?${QueryParam.CATEGORY}=${category?.id}&${QueryParam.TYPES}=${type.id}`}
                  key={type.id}
                >
                  {capitalizeFirstLetter(type[`name_${locale}`])}
                </TypeItem>
              ))}
            </div>
          )}

          {category.featuredCollections.length > 0 && (
            <div>
              <TypeTitle>
                {capitalizeFirstLetter(t(I18nTermsHeader.COLLECTIONS))}
              </TypeTitle>
              {category.featuredCollections.map((collection) => (
                <TypeItem
                  url={`${Routes.SEARCH}?${QueryParam.COLLECTION}=${collection.id}`}
                  key={collection.id}
                >
                  {capitalizeFirstLetter(collection[`name_${locale}`])}
                </TypeItem>
              ))}
            </div>
          )}
        </div>
      )}
      <div className='grid w-2/5 grid-cols-2 gap-4 py-10 pr-10'>
        {category?.products
          .slice(0, 2)
          .map((product) => (
            <ProductImage product={product} key={product.id} />
          ))}
      </div>
    </>
  );
}

function AccessoryCategory({
  bikeAccessoryCategory,
  personalAccessoryCategory,
}: {
  bikeAccessoryCategory?: TCategoryItem;
  personalAccessoryCategory?: TCategoryItem;
}) {
  const t = useTranslations('Header');
  const locale = useLocale();

  return (
    <>
      <div className='grid w-3/5 grid-cols-3 gap-4 py-10 pl-10'>
        {bikeAccessoryCategory && bikeAccessoryCategory.types.length > 0 && (
          <div className='grid-cols-1'>
            <TypeTitle>
              {capitalizeFirstLetter(t(I18nTermsHeader.BIKE_ACCESSORIES))}
            </TypeTitle>
            {bikeAccessoryCategory.types.map((type) => (
              <TypeItem
                url={`${Routes.SEARCH}?${QueryParam.CATEGORY}=${bikeAccessoryCategory.id}&${QueryParam.TYPES}=${type.id}`}
                key={type.id}
              >
                {capitalizeFirstLetter(type[`name_${locale}`])}
              </TypeItem>
            ))}
          </div>
        )}
        {personalAccessoryCategory &&
          personalAccessoryCategory.types.length > 0 && (
            <div className='grid-cols-1'>
              <TypeTitle>
                {capitalizeFirstLetter(t(I18nTermsHeader.PERSONAL_ACCESSORIES))}
              </TypeTitle>
              {personalAccessoryCategory.types.map((type) => (
                <TypeItem
                  url={`${Routes.SEARCH}?${QueryParam.CATEGORY}=${personalAccessoryCategory.id}&${QueryParam.TYPES}=${type.id}`}
                  key={type.id}
                >
                  {capitalizeFirstLetter(type[`name_${locale}`])}
                </TypeItem>
              ))}
            </div>
          )}
        <div className='grid-cols-1'></div>
      </div>
      <div className='grid w-2/5 grid-cols-2 gap-4 py-10 pr-10'>
        {bikeAccessoryCategory?.products
          .slice(0, 1)
          .map((product) => (
            <ProductImage product={product} key={product.id} />
          ))}
        {personalAccessoryCategory?.products
          .slice(0, 1)
          .map((product) => (
            <ProductImage product={product} key={product.id} />
          ))}
      </div>
    </>
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
          {brands?.map(
            (brand) =>
              brand.isFeatured && <BrandImage brand={brand} key={brand.id} />
          )}
        </div>
      </CategoryMenu>
    </CategoryWrapper>
  );
}

function ProductImage({ product }: { product: TProductItem }) {
  const locale = useLocale();
  return (
    <Link
      href={`${Routes.PRODUCT}/${product.id}?${QueryParam.TYPES}=${product.typeId}&${QueryParam.BRANDS}=${product.brandId}`}
      className='mb-4'
    >
      <div className='relative' key={product.id}>
        <Image
          src={product.variants[0].images[0]}
          alt='test'
          width={500}
          height={510}
          sizes='(max-width: 768px), 50vw, 25vw'
          className='h-64 w-full object-cover object-center'
        />
        <div className='absolute bottom-0 right-0 flex w-full bg-white pl-2 transition duration-300 ease-in-out'>
          {capitalizeFirstLetter(product[`name_${locale}`])}
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
          src={brand?.images[0]}
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
// function MobileSearchBar() {
//   const { push } = useRouter();
//   const t = useTranslations('Header');

//   const formSchema = z.object({
//     productName: z.string(),
//   });

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       productName: '',
//     },
//   });

//   const onSubmit = (values: z.infer<typeof formSchema>) => {
//     push(`${Routes.SEARCH}?${QueryParam.NAME}=${values.productName}`);
//   };
//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-8'>
//         <FormField
//           control={form.control}
//           name='productName'
//           render={({ field }) => (
//             <FormItem>
//               <FormControl className='lg:hidden'>
//                 <Input
//                   type='text'
//                   placeholder={t(I18nTermsHeader.SEARCH)}
//                   className='w-full rounded-none border-none bg-white_1 px-0 lg:hidden'
//                   {...field}
//                 />
//               </FormControl>
//             </FormItem>
//           )}
//         />
//       </form>
//     </Form>
//   );
// }

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
          <Button className='rounded-md px-4'>Sign In</Button>
        </SignInButton>
      </SignedOut>
    </span>
  );
}

function UKFlag() {
  return (
    <Image
      alt='vn'
      src={'/images/uk.png'}
      width={24}
      height={24}
      sizes='100vw'
    />
  );
}

function VNFlag() {
  return (
    <Image
      alt='vn'
      src={'/images/vn.png'}
      width={24}
      height={24}
      sizes='100vw'
    />
  );
}
