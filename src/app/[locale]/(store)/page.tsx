'use client';

import { PublicApi, QueryKeys } from '@/utils/constant';
import { parseSearchParams } from '@/utils/fn';
import axios from 'axios';
import { useQueries } from 'react-query';
import 'swiper/css';
import 'swiper/css/scrollbar';

import { BrandGallery } from './components/brand-gallery';
import Commitment from './components/commitment';
import { LatestProduct } from './components/latest-product';
import SidePage from './components/side-page';
import { SliderCategoryGallery } from './components/slider-category-gallery';
import { StaticCategoryGallery } from './components/static-category-gallery';
import { VideoPlayer } from './components/video-player';

export default function Page() {
  const { offset, limit, column, order } = parseSearchParams({
    searchParams: {
      page: '1',
      perPage: '8',
    },
  });
  const [brands, products, categories] = useQueries([
    {
      queryKey: [QueryKeys.BRANDS],
      queryFn: async () =>
        await axios.get(`${process.env.BASE_URL}/${PublicApi.BRANDS}`),
    },
    {
      queryKey: [QueryKeys.PRODUCTS],
      queryFn: async () =>
        await axios.post(`${process.env.BASE_URL}/${PublicApi.PRODUCTS}`, {
          offset,
          limit,
          column,
          order,
        }),
    },
    {
      queryKey: [QueryKeys.CATEGORIES],
      queryFn: async () =>
        await axios.get(`${process.env.BASE_URL}/categories`),
    },
  ]);

  return (
    <>
      {/* <Banner
        collections={collections.data?.data}
        isLoading={collections.isLoading}
      /> */}
      <LatestProduct
        products={products.data?.data.variants}
        isLoading={products.isLoading}
      />
      <StaticCategoryGallery categories={categories.data?.data}/>
      <BrandGallery brands={brands.data?.data} isLoading={brands.isLoading} />
      <SliderCategoryGallery
        isLoading={brands.isLoading}
        categories={categories.data?.data}
      />
      <VideoPlayer
        url='https://file.hstatic.net/200000556385/file/_1__facebook_1993dc9260f5490096316d4220eb8a1e.mp4'
        isLoading={brands.isLoading}
      />
      <SidePage />
      <Commitment />
    </>
  );
}
