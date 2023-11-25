'use client';

import { Button, Skeleton } from '@/components';
import { I18nTermsHome, QueryKeys, QueryParam, Routes } from '@/utils/constant';
import { capitalizeFirstLetter, parseSearchParams } from '@/utils/fn';
import { categoryCards } from '@/utils/mockData';
import {
  TBrandItem,
  TCategoryCardItem,
  TCollectionItem,
  TVariantItem,
} from '@/utils/types';
import axios from 'axios';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { useQueries } from 'react-query';
import 'swiper/css';
import 'swiper/css/scrollbar';
import { Pagination, Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { ProductCard } from './components';
import ProductCardSkeleton from './components/product-card-skeleton';

export default function Page() {
  const { offset, limit, column, order } = parseSearchParams({
    searchParams: {
      page: '1',
      perPage: '8',
    },
  });
  const [brands, collections, products] = useQueries([
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
      queryKey: [QueryKeys.PRODUCTS, 'homepage'],
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

  console.log({ products });

  return (
    <>
      <Banner
        collections={collections.data?.data}
        isLoading={collections.isLoading}
      />
      <LatestProducts
        products={products.data?.data.variants}
        isLoading={products.isLoading}
      />
      <BrandGallery brands={brands.data?.data} isLoading={brands.isLoading} />
      <CategoryGallery isLoading={brands.isLoading} />
      <VideoPlayer
        url='https://file.hstatic.net/200000556385/file/_1__facebook_1993dc9260f5490096316d4220eb8a1e.mp4'
        isLoading={brands.isLoading}
      />
    </>
  );
}

function Banner({
  collections,
  isLoading,
}: {
  collections: TCollectionItem[];
  isLoading: boolean;
}) {
  const locale = useLocale();
  const t = useTranslations('Home');

  return (
    <>
      <Swiper
        pagination={true}
        modules={[Pagination]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
      >
        {collections?.map((collection) => (
          <SwiperSlide key={collection.id}>
            <Link
              href={`${Routes.SEARCH}?collection=${collection.id}`}
              className='relative block h-[70vh] w-full lg:h-screen'
            >
              <Image
                src={collection.imageUrl}
                alt={collection[`name_${locale}`]}
                fill
                sizes='100vw'
                style={{ objectFit: 'cover' }}
              />
              <div className='absolute bottom-6 left-6'>
                <h1 className='mb-3 text-3xl font-bold text-white'>
                  {capitalizeFirstLetter(collection[`name_${locale}`])}
                </h1>
                <p className='mb-6 max-w-screen-md text-sm text-white lg:text-xl'>
                  {collection[`description_${locale}`]}
                </p>
                <p className='cursor-pointer font-light text-white underline'>
                  {capitalizeFirstLetter(t(I18nTermsHome.EXPLORE_COLLECTION))}{' '}
                  &gt;&gt;
                </p>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
      {isLoading && <Skeleton className='h-screen w-screen' />}
    </>
  );
}

function LatestProducts({
  products,
  isLoading,
}: {
  products: TVariantItem[];
  isLoading: boolean;
}) {
  const t = useTranslations('Home');

  return (
    <div className='m-6 lg:my-12'>
      <h1 className='pb-5 text-base font-semibold lg:text-xl'>
        {capitalizeFirstLetter(t(I18nTermsHome.LATEST_PRODUCTS))}
      </h1>
      {products && (
        <div>
          <div className='grid grid-cols-2 gap-4 lg:grid-cols-4'>
            {products?.map((product) => (
              <ProductCard product={product} key={product.id} />
            ))}
          </div>
          <div className='flex justify-center'>
            <Link href={Routes.SEARCH}>
              <Button className='text-white'>
                {capitalizeFirstLetter(t(I18nTermsHome.VIEW_MORE))}
              </Button>
            </Link>
          </div>
        </div>
      )}

      <div className='grid grid-cols-2 gap-4 lg:grid-cols-4'>
        {isLoading &&
          Array(8)
            .fill(0)
            .map((_, index) => <ProductCardSkeleton key={index} />)}
      </div>
    </div>
  );
}

function BrandGallery({
  brands,
  isLoading,
}: {
  brands: TBrandItem[];
  isLoading: boolean;
}) {
  return (
    <>
      <div className='mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mb-12'>
        {brands?.map((brand) => <BrandCard brand={brand} key={brand.id} />)}
      </div>
      <div className='mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mb-12'>
        {isLoading &&
          Array(8)
            .fill(0)
            .map((_, index) => (
              <Skeleton key={index} className='h-36 w-full sm:h-80 lg:h-96' />
            ))}
      </div>
    </>
  );
}

function BrandCard({ brand }: { brand: TBrandItem }) {
  const locale = useLocale();
  return (
    <Link
      href={`${Routes.SEARCH}?${QueryParam.BRANDS}=${brand.id}`}
      className='group relative block h-36 w-full sm:h-80 lg:h-96'
    >
      <Image
        src={brand.imageUrl}
        alt={brand[`name_${locale}`]}
        fill
        style={{
          objectFit: 'cover',
          objectPosition: 'center',
        }}
      />
      <div className='h-full w-full transition duration-300 ease-in-out group-hover:bg-slate-300 group-hover:opacity-30'></div>
      <p className='absolute bottom-6 left-6 text-xl font-bold text-white transition duration-300 ease-in-out group-hover:underline group-hover:opacity-100 xl:opacity-0'>
        {capitalizeFirstLetter(brand[`name_${locale}`])}
      </p>
    </Link>
  );
}

function CategoryGallery({ isLoading }: { isLoading: boolean }) {
  const t = useTranslations('Home');

  return (
    <div className='category-slide mb-6 lg:mb-12'>
      <h1 className='pb-6 text-xl font-semibold lg:pb-8'>
        {capitalizeFirstLetter(t(I18nTermsHome.CATEGORIES))}
      </h1>
      <Swiper
        slidesPerView={1.3}
        spaceBetween={10}
        scrollbar={true}
        modules={[Scrollbar]}
        className='mySwiper'
        breakpoints={{
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
      >
        {!isLoading &&
          categoryCards.map((category) => (
            <SwiperSlide key={category.id}>
              <CategoryCard category={category} />
            </SwiperSlide>
          ))}
        {isLoading &&
          Array(3)
            .fill(0)
            .map((_, index) => (
              <SwiperSlide key={index}>
                <Skeleton className='h-96 w-full lg:h-[450px] xl:h-[600px]' />
              </SwiperSlide>
            ))}
      </Swiper>
    </div>
  );
}

function CategoryCard({ category }: { category: TCategoryCardItem }) {
  const t = useTranslations('Home');

  return (
    <Link
      href={'/'}
      className='relative block h-96 w-full lg:h-[450px] xl:h-[600px]'
    >
      <Image
        src={category.imageUrl}
        alt='test'
        fill
        style={{
          objectFit: 'cover',
          objectPosition: 'center',
        }}
      />
      <div className='absolute bottom-28 left-0 flex w-full flex-col items-center'>
        <p className='text-xl font-bold text-white'>{category.title}</p>
        <Button className='bg-white text-black hover:bg-grey_1'>
          {capitalizeFirstLetter(t(I18nTermsHome.SHOP_NOW))}
        </Button>
      </div>
    </Link>
  );
}

function VideoPlayer({
  url,
  youtubeId,
  isLoading,
}: {
  url?: string;
  youtubeId?: string;
  isLoading: boolean;
}) {
  const [hasWindow, setHasWindow] = useState(false);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setHasWindow(true);
    }
  }, []);
  return (
    <>
      {hasWindow && url && !isLoading && (
        <ReactPlayer
          url={url}
          width='100%'
          height='100%'
          playing={true}
          muted={true}
        />
      )}
      {isLoading && <Skeleton className='h-screen w-screen' />}
      {hasWindow && youtubeId && (
        <div
          className='video'
          style={{
            position: 'relative',
            paddingBottom: '56.25%' /* 16:9 */,
            paddingTop: 25,
            height: 0,
          }}
        >
          <iframe
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
            }}
            src={`https://www.youtube.com/embed/${youtubeId}`}
          />
        </div>
      )}
    </>
  );
}
