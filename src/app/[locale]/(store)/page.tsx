'use client';

import { Button } from '@/components';
import { I18nTermsHome, PublicApi, QueryKeys, Routes } from '@/utils/constant';
import { categories, products } from '@/utils/mockData';
import { TBrandItem, TCollectionItem, TProductItem } from '@/utils/types';
import axios from 'axios';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { useQueries } from 'react-query';
import 'swiper/css';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { capitalizeFirstLetter } from '../../../utils/fn';
import { ProductCard } from './components';

export default function Page() {
  const [brand, collection] = useQueries([
    {
      queryKey: [QueryKeys.BRANDS],
      queryFn: async () => await axios.get(`${PublicApi.BRANDS}`),
    },
    {
      queryKey: [QueryKeys.COLLECTIONS],
      queryFn: async () => await axios.get(`${PublicApi.COLLECTIONS}`),
    },
  ]);
  return (
    <>
      <Banner collectionList={collection.data?.data} />
      <LatestProducts productList={products} />
      <BrandGallery brandList={brand.data?.data} />
      <CategoryGallery categoryList={categories} />
      <VideoPlayer url='https://file.hstatic.net/200000556385/file/_1__facebook_1993dc9260f5490096316d4220eb8a1e.mp4' />
    </>
  );
}

function Banner({ collectionList }: { collectionList: TCollectionItem[] }) {
  const t = useTranslations('Home');

  return (
    <Swiper pagination={true} modules={[Pagination]}>
      {collectionList?.map((item) => (
        <SwiperSlide key={item.id}>
          <Link
            href={`${Routes.SEARCH}?collection=${item.id}`}
            className='relative block h-screen w-full'
          >
            <Image
              src={item.imageUrl}
              alt={item.name}
              fill
              sizes='100vw'
              style={{ objectFit: 'cover' }}
            />
          </Link>
          <div className='absolute bottom-6 left-6'>
            <h1 className='mb-3 text-3xl font-bold text-white'>{item.name}</h1>
            <p className='mb-6 max-w-screen-md text-xl text-white'>
              {item.description}
            </p>
            <p className='cursor-pointer font-light text-white underline'>
              {capitalizeFirstLetter(t(I18nTermsHome.EXPLORE_COLLECTION))}{' '}
              &gt;&gt;
            </p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

function LatestProducts({ productList }: { productList: TProductItem[] }) {
  const t = useTranslations('Home');

  return (
    <div className='mx-6 my-12'>
      <h1 className='pb-8 text-xl font-semibold'>
        {capitalizeFirstLetter(t(I18nTermsHome.LATEST_PRODUCTS))}
      </h1>
      <div className='grid grid-cols-4 gap-4'>
        {productList.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
      <div className='flex justify-center'>
        <Link href={''}>
          <Button className='text-white'>
            {capitalizeFirstLetter(t(I18nTermsHome.VIEW_MORE))}
          </Button>
        </Link>
      </div>
    </div>
  );
}

function BrandGallery({ brandList }: { brandList: TBrandItem[] }) {
  return (
    <div className='mb-12 grid grid-cols-2 gap-4'>
      {brandList?.map((brand) => <BrandCard brand={brand} key={brand.id} />)}
    </div>
  );
}

function BrandCard({ brand }: { brand: TBrandItem }) {
  return (
    <Link
      href={`${Routes.SEARCH}?brand=${brand.id}`}
      className='group relative block h-96 w-full'
    >
      <Image
        src={brand.imageUrl}
        alt={brand.name}
        fill
        style={{
          objectFit: 'cover',
          objectPosition: 'center',
        }}
      />
      <div className='h-full w-full transition duration-300 ease-in-out group-hover:bg-slate-300 group-hover:opacity-30'></div>
      <p className='absolute bottom-6 left-6 text-xl font-bold text-white underline opacity-0 transition duration-300 ease-in-out group-hover:opacity-100'>
        {capitalizeFirstLetter(brand.name)}
      </p>
    </Link>
  );
}

interface ICategoryItem {
  id: string;
  imageUrl: string;
  title: string;
}

function CategoryGallery({ categoryList }: { categoryList: ICategoryItem[] }) {
  const t = useTranslations('Home');

  return (
    <div className='mb-12'>
      <h1 className='mx-6 pb-8 text-xl font-semibold'>
        {capitalizeFirstLetter(t(I18nTermsHome.CATEGORIES))}
      </h1>
      <div className='grid grid-cols-3 gap-4'>
        {categoryList.map((category) => (
          <CategoryCard category={category} key={category.id} />
        ))}
      </div>
    </div>
  );
}

function CategoryCard({ category }: { category: ICategoryItem }) {
  const t = useTranslations('Home');

  return (
    <Link href={'/'} className='relative block h-[600px] w-full'>
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

function VideoPlayer({ url, youtubeId }: { url?: string; youtubeId?: string }) {
  const [hasWindow, setHasWindow] = useState(false);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setHasWindow(true);
    }
  }, []);
  return (
    <>
      {hasWindow && url && (
        <ReactPlayer
          url={url}
          width='100%'
          height='100%'
          playing={true}
          muted={true}
        />
      )}
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
