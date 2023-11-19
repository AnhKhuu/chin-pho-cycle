'use client';

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components';
import {
  I18nTermsSearch,
  PAGE_SIZE,
  QueryKeys,
  QueryParam,
  Routes,
} from '@/utils/constant';
import {
  calculatePages,
  capitalizeFirstLetter,
  parseSearchParams,
  prepareQueryString,
} from '@/utils/fn';
import {
  Gender,
  TFilterItem,
  TFilterType,
  TProductVariantFilters,
} from '@/utils/types';
import axios from 'axios';
import { MoveLeft, MoveRight, SlidersHorizontal, X } from 'lucide-react';
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

type TSort = {
  value: string;
  label: string;
};

export default function Page() {
  const locale = useLocale();
  const t = useTranslations('Search');
  const { push } = useRouter();

  //sort and pagination
  const [sortBy, setSortBy] = useState<TSort | undefined>({
    value: 'productId.desc',
    label: capitalizeFirstLetter(t(I18nTermsSearch.NEWEST)),
  });
  const [page, setPage] = useState<number>(0);

  //filter
  const searchParams = useSearchParams();
  const name = searchParams.get(QueryParam.NAME);
  const categoryId = searchParams.get(QueryParam.CATEGORY);
  const typeIds = searchParams.get(QueryParam.TYPES)?.split(',');
  const brandIds = searchParams.get(QueryParam.BRANDS)?.split(',');
  const genders = searchParams.get(QueryParam.GENDERS)?.split(',');

  const { offset, limit, column, order } = parseSearchParams({
    searchParams: {
      page: (page + 1).toString(),
      perPage: PAGE_SIZE.toString(),
      sort: sortBy?.value,
    },
  });

  const filterParams: TProductVariantFilters = useMemo(() => {
    return {
      offset,
      limit,
      column,
      order,
      name_en: locale === 'en' && name ? name : '',
      name_vi: locale === 'vi' && name ? name : '',
      genders: genders ? genders : [],
      typeIds: typeIds ? typeIds.map((typeId) => parseInt(typeId)) : [],
      brandIds: brandIds ? brandIds.map((brandId) => parseInt(brandId)) : [],
    };
  }, [typeIds, brandIds, offset, limit, column, order, name, locale, genders]);

  const [category, types, brands, productData] = useQueries([
    {
      queryKey: [QueryKeys.CATEGORY, categoryId],
      queryFn: async () =>
        await axios.get(`${process.env.BASE_URL}/categories/${categoryId}`),
    },
    {
      queryKey: [QueryKeys.TYPES],
      queryFn: async () => await axios.get(`${process.env.BASE_URL}/types`),
    },
    {
      queryKey: [QueryKeys.BRANDS],
      queryFn: async () => await axios.get(`${process.env.BASE_URL}/brands`),
    },
    {
      queryKey: [QueryKeys.PRODUCTS, filterParams],
      queryFn: async () =>
        await axios.post(
          `${process.env.BASE_URL}/variants/search`,
          filterParams
        ),
    },
  ]);

  const typeList = useMemo(() => {
    return (
      category.data?.data?.types.map((type) => ({
        value: type.id.toString(),
        label: capitalizeFirstLetter(type[`name_${locale}`]),
      })) ||
      types.data?.data?.types.map((type) => ({
        value: type.id.toString(),
        label: capitalizeFirstLetter(type[`name_${locale}`]),
      })) ||
      []
    );
  }, [category, types, locale]);

  const brandList = useMemo(() => {
    return (
      brands.data?.data.map((brand) => ({
        value: brand.id.toString(),
        label: capitalizeFirstLetter(brand[`name_${locale}`]),
      })) || []
    );
  }, [brands, locale]);

  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber);
  };

  const args = useMemo(() => {
    return {
      totalPages: calculatePages(productData.data?.data?.allVariants),
      edgePageCount: 3,
      middlePagesSiblingCount: 1,
      truncableText: '...',
      truncableClassName: 'w-10 px-0.5 text-center',
    };
  }, [productData]);

  const sortList = [
    {
      value: 'productId.desc',
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
      filterType: TFilterType.BRANDS,
      title: capitalizeFirstLetter(t(I18nTermsSearch.BRAND)),
      fields: brandList,
    },
  ];

  if (productData) {
    console.log({ productData });
  }

  const handleSubmit = (fields) => {
    const params = prepareQueryString(fields);
    push(`${Routes.SEARCH}?${params}`);
  };

  const initialFilters = useMemo(() => {
    return {
      types: typeIds ? typeIds : [],
      brands: brandIds ? brandIds : [],
      genders: genders ? genders : [],
    };
  }, [typeIds, brandIds, genders]);

  return (
    <div className='my-10 grid grid-cols-2 gap-5 px-6 lg:grid-cols-4'>
      <div className='col-span-1 hidden pt-5 lg:block'>
        <FilterList
          handleSubmit={handleSubmit}
          filterList={filters}
          initialFilters={initialFilters}
        />
      </div>
      <div className='col-span-2 lg:col-span-3'>
        <div className='mb-5 flex items-center justify-between'>
          <p>
            {productData.data?.data?.allVariants}{' '}
            {capitalizeFirstLetter(t(I18nTermsSearch.RESULTS))}
          </p>
          <div className='hidden lg:block'>
            <span>{capitalizeFirstLetter(t(I18nTermsSearch.SORT_BY))} </span>
            <DropdownMenu>
              <DropdownMenuTrigger className='text-gray-500 underline-offset-4 hover:underline'>
                {sortBy?.label}
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuRadioGroup
                  value={sortBy?.value}
                  onValueChange={(value: string) =>
                    setSortBy(sortList.find((sort) => sort.value === value))
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
            </DropdownMenu>
          </div>
          <FiltersPopup>
            <FilterList
              handleSubmit={handleSubmit}
              filterList={filters}
              initialFilters={initialFilters}
            />
          </FiltersPopup>
        </div>
        <div className='grid grid-cols-2 gap-4 sm:grid-cols-3'>
          {productData.data?.data.variants.map((product) => (
            <div key={product.id}>
              <ProductCard product={product} />
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
              <Pagination.PrevButton className='flex cursor-pointer items-center hover:text-gray-500'>
                <MoveLeft strokeWidth={1} />
                <p className='ml-2'>
                  {capitalizeFirstLetter(t(I18nTermsSearch.PREVIOUS))}
                </p>
              </Pagination.PrevButton>
              <nav className='flex flex-grow justify-center'>
                <ul className='flex items-center'>
                  <Pagination.PageButton
                    activeClassName='border-b-2 border-black'
                    inactiveClassName='text-gray-500 border-white hover:text-gray-500 border-b-2 hover:border-gray-300'
                    className='flex h-10 w-10 cursor-pointer items-center justify-center'
                  />
                </ul>
              </nav>
              <Pagination.NextButton className='flex cursor-pointer items-center hover:text-gray-500'>
                <p className='mr-2'>
                  {capitalizeFirstLetter(t(I18nTermsSearch.NEXT))}
                </p>
                <MoveRight strokeWidth={1} />
              </Pagination.NextButton>
            </Pagination>
          )}
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
