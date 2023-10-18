'use client';

import { Button } from '@/components';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoveDown, MoveUp } from 'lucide-react';

import { CellAction } from './cell-action';

export type BrandColumn = {
  id: string;
  name: string;
  numberOfProducts: number;
};

export const columns: ColumnDef<BrandColumn>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Name
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },
  {
    accessorKey: 'numberOfProducts',
    header: ({ column }) => {
      return (
        <div className='flex justify-center'>
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Products
            {column.getIsSorted() === 'asc' ? (
              <MoveDown className='ml-2 h-4 w-4' />
            ) : (
              <MoveUp className='ml-2 h-4 w-4' />
            )}
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className='text-center'>{row.getValue('numberOfProducts')}</div>
      );
    },
  },
  {
    id: 'actions',
    header: () => {
      return <div className='text-center'>Actions</div>;
    },
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
