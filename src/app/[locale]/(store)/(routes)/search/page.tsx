'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components';
import { products } from '@/utils/mockData';
import { MoveLeft, MoveRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { Pagination } from 'react-headless-pagination';

import { I18nTermsSearch } from '../../../../../utils/constant';
import { capitalizeFirstLetter } from '../../../../../utils/fn';
import ProductCard from '../../components/product-card';
import { FilterList } from './components/filter-list';

type TSort = {
  value: string;
  label: string;
};

export default function Page() {
  const t = useTranslations('Search');
  const [sortBy, setSortBy] = useState<TSort | undefined>({
    value: 'newest',
    label: capitalizeFirstLetter(t(I18nTermsSearch.NEWEST)),
  });
  const [page, setPage] = useState<number>(0);
  const searchParams = useSearchParams();

  const search = searchParams.get('name');

  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber);
  };

  const args = {
    totalPages: 1000,
    edgePageCount: 3,
    middlePagesSiblingCount: 1,
    truncableText: '...',
    truncableClassName: 'w-10 px-0.5 text-center',
  };

  const sortList = [
    {
      value: 'newest',
      label: capitalizeFirstLetter(t(I18nTermsSearch.NEWEST)),
    },
    {
      value: 'a-z',
      label: 'A-Z',
    },
    {
      value: 'z-a',
      label: 'Z-A',
    },
    {
      value: 'price:low-high',
      label: capitalizeFirstLetter(t(I18nTermsSearch.PRICE_LOW_TO_HIGH)),
    },
    {
      value: 'price:high-low',
      label: capitalizeFirstLetter(t(I18nTermsSearch.PRICE_HIGH_TO_LOW)),
    },
  ];

  const filters = [
    {
      filterType: capitalizeFirstLetter(t(I18nTermsSearch.TYPE)),
      fields: [
        {
          value: 'bikes',
          label: 'Bikes',
        },
        {
          value: 'shirt',
          label: 'Shirts',
        },
        {
          value: 'pants',
          label: 'Pants',
        },
      ],
    },
    {
      filterType: capitalizeFirstLetter(t(I18nTermsSearch.SIZE)),
      fields: [
        {
          value: 'S',
          label: 'S',
        },
        {
          value: 'M',
          label: 'M',
        },
        {
          value: 'L',
          label: 'L',
        },
      ],
    },
    {
      filterType: capitalizeFirstLetter(t(I18nTermsSearch.GENDER)),
      fields: [
        {
          value: 'male',
          label: 'Male',
        },
        {
          value: 'female',
          label: 'Female',
        },
        {
          value: 'unisex',
          label: 'Unisex',
        },
      ],
    },
    {
      filterType: capitalizeFirstLetter(t(I18nTermsSearch.BRAND)),
      fields: [
        {
          value: 'factor',
          label: 'Factor',
        },
        {
          value: 'sram',
          label: 'Sram',
        },
        {
          value: 'cervelo',
          label: 'Cervelo',
        },
      ],
    },
  ];

  return (
    <div className='my-10 grid grid-cols-4 gap-5 px-6'>
      <div className='col-span-1 pt-5'>
        <FilterList handleSubmit={() => {}} filterList={filters} />
      </div>
      <div className='col-span-3'>
        <div className='mb-5 flex items-center justify-between'>
          <p>
            {products.length}{' '}
            {capitalizeFirstLetter(t(I18nTermsSearch.RESULTS))}
          </p>
          <div>
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
        </div>
        <div className='grid grid-cols-3 gap-4'>
          {products.map((product) => (
            <div key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
        <div className='mt-10'>
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
        </div>
      </div>
    </div>
  );
}
