'use client';

import { PublicApi, QueryKeys } from '@/utils/constant';
import { parseSearchParams } from '@/utils/fn';
import axios from 'axios';
import { useQueries } from 'react-query';
import 'swiper/css';
import 'swiper/css/scrollbar';

import { BrandGallery } from './components/brand-gallery';
import { CategoryGallery } from './components/category-gallery';
import Commitment from './components/commitment';
import { HighlightGallery } from './components/highlight-gallery';
import { LatestProduct } from './components/latest-product';
import SidePage from './components/side-page';
import { TypeGallery } from './components/type-gallery';
import { VideoPlayer } from './components/video-player';

export default function Page() {
  const { offset, limit, column, order } = parseSearchParams({
    searchParams: {
      page: '1',
      perPage: '8',
    },
  });
  const [highlights, brands, products, categories] = useQueries([
    {
      queryKey: [QueryKeys.HIGHLIGHTS],
      queryFn: async () =>
        await axios.get(`${process.env.BASE_URL}/${PublicApi.HIGHLIGHTS}`),
    },
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
      <HighlightGallery
        highlights={highlights.data?.data}
        isLoading={highlights.isLoading}
      ></HighlightGallery>
      <LatestProduct
        products={products.data?.data.variants}
        isLoading={products.isLoading}
      />
      <CategoryGallery categories={categories.data?.data} />
      <BrandGallery brands={brands.data?.data} isLoading={brands.isLoading} />
      <TypeGallery
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
