'use client';

import { Button } from '@/components';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowDownAZ, ArrowUpAZ } from 'lucide-react';

import { CellAction } from './cell-action';

export type TBrandColumn = {
  id: string;
  name: string;
};

export const columns: ColumnDef<TBrandColumn>[] = [
  {
    id: 'no',
    header: () => {
      return <div>No.</div>;
    },
    cell: ({ row }) => <p>{row.index + 1}</p>,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Name
          {column.getIsSorted() !== 'asc' ? (
            <ArrowUpAZ className='ml-2 h-4 w-4' />
          ) : (
            <ArrowDownAZ className='ml-2 h-4 w-4' />
          )}
        </Button>
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
