'use client';

import { Button } from '@/components/ui';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import 'swiper/css';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { IProductItem } from '../../utils/types';
import { ProductCard } from '../components';
import { brands, categories, images, products } from './mockData';

export default function Homepage() {
  return (
    <>
      <Banner imagesList={images} />
      <LatestProduct productsList={products} />
      <BrandGallery brandsList={brands} />
      <CategoryGallery categoriesList={categories} />
      <VideoPlayer url='https://file.hstatic.net/200000556385/file/_1__facebook_1993dc9260f5490096316d4220eb8a1e.mp4' />
    </>
  );
}

interface ImageItem {
  title: string;
  description: string;
  imageUrl: string;
  pageUrl: string;
  link: string;
}

function Banner({ imagesList }: { imagesList: ImageItem[] }) {
  return (
    <Swiper pagination={true} modules={[Pagination]} className='mySwiper'>
      {imagesList.map((item, index) => (
        <SwiperSlide key={index}>
          <Link href={item.pageUrl} className='relative block h-screen w-full'>
            <Image
              src={item.imageUrl}
              alt={item.title}
              fill
              sizes='100vw'
              style={{ objectFit: 'cover' }}
            />
          </Link>
          <div className='absolute bottom-6 left-6'>
            <h1 className='mb-3 text-3xl font-bold text-white'>{item.title}</h1>
            <p className='mb-6 max-w-screen-md text-xl text-white'>
              {item.description}
            </p>
            <p className='font-light text-white underline'>
              {item.link} &gt;&gt;
            </p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

function LatestProduct({ productsList }: { productsList: IProductItem[] }) {
  return (
    <div className='mx-6 my-12'>
      <h1 className='pb-8 text-xl font-semibold'>Latest Products</h1>
      <div className='grid grid-cols-4 gap-4'>
        {productsList.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
      <div className='flex justify-center'>
        <Link href={''}>
          <Button className='font-light text-white'>View More</Button>
        </Link>
      </div>
    </div>
  );
}

interface IBrandItem {
  id: string;
  brandName: string;
  imageUrl: string;
}

function BrandGallery({ brandsList }: { brandsList: IBrandItem[] }) {
  return (
    <div className='mb-12 grid grid-cols-2 gap-4'>
      {brandsList.map((brand) => (
        <BrandCard brand={brand} key={brand.id} />
      ))}
    </div>
  );
}

function BrandCard({ brand }: { brand: IBrandItem }) {
  return (
    <Link href={'/'} className='group relative block h-96 w-full'>
      <Image
        src={brand.imageUrl}
        alt='test'
        fill
        style={{
          objectFit: 'cover',
          objectPosition: 'center',
        }}
      />
      <p className='absolute bottom-6 left-6 text-xl font-bold text-white underline opacity-0 transition duration-300 ease-in-out group-hover:opacity-100'>
        {brand.brandName}
      </p>
    </Link>
  );
}

interface ICategoryItem {
  id: string;
  imageUrl: string;
  title: string;
}

function CategoryGallery({
  categoriesList,
}: {
  categoriesList: ICategoryItem[];
}) {
  return (
    <div className='mb-12'>
      <h1 className='mx-6 pb-8 text-xl font-semibold'>Categories</h1>
      <div className='grid grid-cols-3 gap-4'>
        {categoriesList.map((category) => (
          <CategoryCard category={category} key={category.id} />
        ))}
      </div>
    </div>
  );
}

function CategoryCard({ category }: { category: ICategoryItem }) {
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
          Shop Now
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
            frameBorder='0'
          />
        </div>
      )}
    </>
  );
}
