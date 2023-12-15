'use client';

import { Button } from '@/components';
import {
  I18nTermsSearch,
  PAGE_SIZE,
  PublicApi,
  QueryKeys,
  QueryParam,
  Routes,
  bigShouldersDisplay,
} from '@/utils/constant';
import {
  calculatePages,
  capitalizeFirstLetter,
  parseSearchParams,
  prepareQueryString,
} from '@/utils/fn';
import {
  Gender,
  Size,
  TFilterItem,
  TFilterType,
  TProductVariantFilters,
  TSort,
} from '@/utils/types';
import axios from 'axios';
import { ChevronLeft, ChevronRight, SlidersHorizontal, X } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import { Pagination } from 'react-headless-pagination';
import { useQueries } from 'react-query';

import ProductCard from '../../components/product-card';
import ProductCardSkeleton from '../../components/product-card-skeleton';
import { FilterList } from './components/filter-list';

export default function Page() {
  const locale = useLocale();
  const t = useTranslations('Search');
  const router = useRouter();

  //sort and pagination
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [sortBy, setSortBy] = useState<TSort>({
    value: 'createdAt.desc',
    label: capitalizeFirstLetter(t(I18nTermsSearch.NEWEST)),
  });
  const [page, setPage] = useState<number>(0);

  const { offset, limit, column, order } = parseSearchParams({
    searchParams: {
      page: (page + 1).toString(),
      perPage: PAGE_SIZE.toString(),
      sort: sortBy?.value,
    },
  });

  //filter
  const searchParams = useSearchParams();
  const name = searchParams.get(QueryParam.NAME);
  const categoryId = searchParams.get(QueryParam.CATEGORY);
  const typeIds = searchParams.get(QueryParam.TYPES)?.split(',');
  const brandIds = searchParams.get(QueryParam.BRANDS)?.split(',');
  const genders = searchParams.get(QueryParam.GENDERS)?.split(',') as Gender[];
  const sizes = searchParams.get(QueryParam.SIZES)?.split(',') as Size[];
  const collectionIds = searchParams.get(QueryParam.COLLECTIONS)?.split(',');

  // eslint-disable-next-line complexity
  const filterParams: TProductVariantFilters = useMemo(() => {
    return {
      offset,
      limit,
      column: column as string,
      order: order as 'asc' | 'desc',
      name_en: locale === 'en' && name ? name : '',
      name_vi: locale === 'vi' && name ? name : '',
      genders: genders,
      sizes: sizes,
      typeIds: typeIds?.map((typeId) => parseInt(typeId)),
      brandIds: brandIds?.map((brandId) => parseInt(brandId)),
      collectionIds: collectionIds?.map((collectionId) =>
        parseInt(collectionId)
      ),
      categoryId: categoryId ? parseInt(categoryId) : undefined,
    };
  }, [
    offset,
    limit,
    column,
    order,
    locale,
    name,
    genders,
    sizes,
    typeIds,
    brandIds,
    collectionIds,
    categoryId,
  ]);

  const [category, types, brands, productData] = useQueries([
    {
      queryKey: [QueryKeys.CATEGORY, categoryId],
      queryFn: async () =>
        await axios.get(
          `${process.env.BASE_URL}/${PublicApi.CATEGORIES}/${categoryId}`
        ),
    },
    {
      queryKey: [QueryKeys.TYPES, typeIds],
      queryFn: async () =>
        await axios.get(`${process.env.BASE_URL}/${PublicApi.TYPES}`, {
          headers: {
            // Locale: 'en'
          },
        }),
    },
    {
      queryKey: [QueryKeys.BRANDS],
      queryFn: async () =>
        await axios.get(`${process.env.BASE_URL}/${PublicApi.BRANDS}`),
    },
    {
      queryKey: [QueryKeys.PRODUCTS, filterParams],
      queryFn: async () =>
        await axios.post(
          `${process.env.BASE_URL}/${PublicApi.PRODUCTS}`,
          filterParams
        ),
    },
  ]);

  const typeList = useMemo(() => {
    return (
      category.data?.data?.types.map((type) => {
        const total = type.products
          ?.map((product) => product?.variants?.length)
          .reduce((prev, next) => prev + next, 0);
        return {
          value: type.id.toString(),
          label: `${capitalizeFirstLetter(type[`name_${locale}`])} (${total})`,
        };
      }) ||
      types.data?.data?.map((type) => {
        const total = type.products
          ?.map((product) => product?.variants?.length)
          .reduce((prev, next) => prev + next, 0);
        return {
          value: type.id.toString(),
          label: `${capitalizeFirstLetter(type[`name_${locale}`])} ${
            total ? `(${total})` : '(0)'
          }`,
        };
      }) ||
      []
    );
  }, [category.data?.data?.types, locale, types.data?.data]);

  const brandList = useMemo(() => {
    return (
      category.data?.data?.featuredBrands.map((brand) => {
        const total = brand.products
          ?.map((product) => product?.variants?.length)
          .reduce((prev, next) => prev + next, 0);
        return {
          value: brand.id.toString(),
          label: `${capitalizeFirstLetter(brand[`name_${locale}`])} ${
            total ? `(${total})` : '(0)'
          }`,
        };
      }) ||
      brands.data?.data.map((brand) => {
        const total = brand.products
          ?.map((product) => product?.variants?.length)
          .reduce((prev, next) => prev + next, 0);
        return {
          value: brand.id.toString(),
          label: `${capitalizeFirstLetter(brand[`name_${locale}`])} ${
            total ? `(${total})` : '(0)'
          }`,
        };
      }) ||
      []
    );
  }, [brands.data?.data, category.data?.data?.featuredBrands, locale]);

  const filters: TFilterItem[] = [
    {
      filterType: TFilterType.TYPES,
      title: capitalizeFirstLetter(t(I18nTermsSearch.TYPE)),
      fields: typeList,
    },
    {
      filterType: TFilterType.GENDERS,
      title: capitalizeFirstLetter(t(I18nTermsSearch.GENDER)),
      fields: [
        {
          value: Gender.Male,
          label: capitalizeFirstLetter(t(I18nTermsSearch.MALE)),
        },
        {
          value: Gender.Female,
          label: capitalizeFirstLetter(t(I18nTermsSearch.FEMALE)),
        },
        {
          value: Gender.Unisex,
          label: capitalizeFirstLetter(t(I18nTermsSearch.UNISEX)),
        },
      ],
    },
    {
      filterType: TFilterType.SIZES,
      title: capitalizeFirstLetter(t(I18nTermsSearch.SIZE)),
      fields: Object.keys(Size).map((size) => ({
        label: size,
        value: Size[size],
      })),
    },
    {
      filterType: TFilterType.BRANDS,
      title: capitalizeFirstLetter(t(I18nTermsSearch.BRAND)),
      fields: brandList,
    },
  ];

  const initialFilters = useMemo(() => {
    return {
      types: typeIds ? typeIds : [],
      brands: brandIds ? brandIds : [],
      genders: genders ? genders : [],
      sizes: sizes ? sizes : [],
      sortBy: 'createdAt.desc',
    };
  }, [typeIds, brandIds, genders, sizes]);

  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber);
  };

  const args = useMemo(() => {
    return {
      totalPages: calculatePages(productData.data?.data?.totalVariants),
      edgePageCount: 3,
      middlePagesSiblingCount: 1,
      truncableText: '...',
      truncableClassName: 'w-10 px-0.5 text-center',
    };
  }, [productData]);

  const sorts = [
    {
      value: 'createdAt.desc',
      label: capitalizeFirstLetter(t(I18nTermsSearch.NEWEST)),
    },
    {
      value: 'name.asc',
      label: 'A-Z',
    },
    {
      value: 'name.desc',
      label: 'Z-A',
    },
    {
      value: 'price.asc',
      label: capitalizeFirstLetter(t(I18nTermsSearch.PRICE_LOW_TO_HIGH)),
    },
    {
      value: 'price.desc',
      label: capitalizeFirstLetter(t(I18nTermsSearch.PRICE_HIGH_TO_LOW)),
    },
  ];

  const handleSubmit = (fields) => {
    setPage(0);
    const params = prepareQueryString(fields);
    router.push(
      categoryId
        ? `${Routes.SEARCH}?${QueryParam.CATEGORY}=${categoryId}&${params}`
        : `${Routes.SEARCH}?${params}`
    );
  };

  return (
    <div>
      <div className='bg-white_1 px-12 py-6 text-sm font-normal'>
        <div className='flex'>
          <p>Home</p>
          <span className='mx-1'>/</span>
          <p>Men</p>
          <span className='mx-1'>/</span>
          <p>Gillet & Jacket </p>
        </div>
      </div>
      <div className='relative'>
        <Image
          src={'/images/search-page-banner.png'}
          alt={'banner'}
          width={1400}
          height={1080}
          sizes='100vw'
          className='w-screen object-cover'
        />
        <div
          className={`${bigShouldersDisplay.className} absolute bottom-12 left-12 text-6xl text-white`}
        >
          MENS GILLET & JACKET
        </div>
      </div>
      <div className='my-10 px-12'>
        <div className='mb-5 flex items-center justify-end'>
          <p>
            {productData.data?.data?.totalVariants || 0}{' '}
            {capitalizeFirstLetter(t(I18nTermsSearch.RESULTS))}
          </p>
          <FiltersPopup>
            <FilterList
              sortList={sorts}
              handleSubmit={handleSubmit}
              filterList={filters}
              initialFilters={initialFilters}
            />
          </FiltersPopup>
        </div>
        <div className='grid grid-cols-2 gap-5  lg:grid-cols-4'>
          <div className='col-span-1 hidden lg:block'>
            <div className='hidden lg:block'>
              <span>{capitalizeFirstLetter(t(I18nTermsSearch.SORT_BY))}: </span>
              {/* <DropdownMenu>
                <DropdownMenuTrigger className='text-gray-500 underline-offset-4 hover:underline'>
                  {sortBy?.label}
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuRadioGroup
                    value={sortBy?.value}
                    onValueChange={(value: string) =>
                      setSortBy(
                        sortList.find((sort) => sort.value === value) as TSort
                      )
                    }
                  >
                    {sortList.map(({ value, label }) => (
                      <DropdownMenuRadioItem
                        key={value}
                        value={value}
                        className={`cursor-pointer ${
                          sortBy?.value === value ? 'bg-accent' : ''
                        }`}
                      >
                        <p>{label}</p>
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu> */}
            </div>
            <FilterList
              sortList={sorts}
              handleSubmit={handleSubmit}
              filterList={filters}
              initialFilters={initialFilters}
            />
          </div>
          <div className='col-span-2 lg:col-span-3'>
            <div className='grid grid-cols-2 gap-4 sm:grid-cols-3'>
              {productData.data?.data.variants.map((product) => (
                <div key={product.id}>
                  <ProductCard product={product} isLatest={false} />
                </div>
              ))}
            </div>
            {productData.isLoading && (
              <div className='grid grid-cols-2 gap-4 sm:grid-cols-3'>
                {Array(27)
                  .fill(0)
                  .map((_, index) => (
                    <ProductCardSkeleton key={index} />
                  ))}
              </div>
            )}
            <div className='mt-10'>
              {args.totalPages > 1 && (
                <Pagination
                  {...args}
                  currentPage={page}
                  setCurrentPage={handlePageChange}
                  className='flex h-10 w-full select-none items-center text-sm'
                >
                  <nav className='flex flex-grow justify-center'>
                    <Pagination.PrevButton className='flex cursor-pointer items-center hover:text-gray-500'>
                      <ChevronLeft strokeWidth={1} />
                    </Pagination.PrevButton>
                    <ul className='flex items-center'>
                      <Pagination.PageButton
                        activeClassName='underline underline-offset-4'
                        inactiveClassName='text-gray-500 border-white hover:text-black hover:underline hover:underline-offset-4'
                        className='flex h-10 w-10 cursor-pointer items-center justify-center'
                      />
                    </ul>
                    <Pagination.NextButton className='flex cursor-pointer items-center text-gray-500 hover:text-black'>
                      <ChevronRight strokeWidth={1} />
                    </Pagination.NextButton>
                  </nav>
                </Pagination>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FiltersPopup({ children }: { children: React.ReactElement }) {
  const [isShowFilter, setShowFilter] = useState(false);

  return (
    <>
      <Button
        variant='secondary'
        className='lg:hidden'
        onClick={() => setShowFilter((prev) => !prev)}
      >
        Filters
        <SlidersHorizontal className='ml-4' />
      </Button>
      <div
        className={`fixed inset-0 top-24 z-50 h-full w-screen ${
          isShowFilter ? '' : 'invisible'
        }`}
      >
        <div
          className={`absolute -top-24 left-0 h-full w-full overflow-y-scroll bg-white transition-all duration-300 ease-out ${
            isShowFilter ? '' : '-translate-x-full'
          }`}
        >
          <div className='mx-7 mt-4 flex items-center justify-between'>
            <X className='text-white' />
            <Link href={'/'}>
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
              onClick={() => setShowFilter((prev) => !prev)}
            />
          </div>
          <div className='mx-7'>{children}</div>
        </div>
      </div>
    </>
  );
}
