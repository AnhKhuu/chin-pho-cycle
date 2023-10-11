'use client';

import { ProductCard } from '@/(root)/(store)/components';
import { filters, products } from '@/(root)/(store)/mockData';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui';
import { MoveLeft, MoveRight } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { Pagination } from 'react-headless-pagination';

import { FilterList } from './component/filter-list';

type Sort = {
  value: string;
  label: string;
};

const sortList = [
  {
    value: 'newest',
    label: 'Newest',
  },
  {
    value: 'a-z',
    label: 'A - Z',
  },
  {
    value: 'z-a',
    label: 'Z - A',
  },
  {
    value: 'price:low-high',
    label: 'Price: Low - High',
  },
  {
    value: 'price:high-low',
    label: 'Price: High - Low',
  },
];

export default function Page() {
  const [sortBy, setSortBy] = useState<Sort | undefined>({
    value: 'newest',
    label: 'Newest',
  });
  const [page, setPage] = useState<number>(0);
  const searchParams = useSearchParams();

  const search = searchParams.get('name');

  console.log({ search });

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

  return (
    <div className='my-10 grid grid-cols-4 gap-5 px-6'>
      <div className='col-span-1 pt-5'>
        <FilterList handleSubmit={() => {}} filterList={filters} />
      </div>
      <div className='col-span-3'>
        <div className='mb-5 flex items-center justify-between'>
          <p>{products.length} results</p>
          <div>
            <span>Sort By </span>
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
              <p className='ml-2'>Previous</p>
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
              <p className='mr-2'>Next</p>
              <MoveRight strokeWidth={1} />
            </Pagination.NextButton>
          </Pagination>
        </div>
      </div>
    </div>
  );
}
