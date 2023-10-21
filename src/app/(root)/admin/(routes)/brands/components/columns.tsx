'use client';

import { Button } from '@/components';
import { ColumnDef } from '@tanstack/react-table';
import { MoveDown, MoveUp } from 'lucide-react';

import { CellAction } from './cell-action';

export type TBrandColumn = {
  id: string;
  name: string;
};

export const columns: ColumnDef<TBrandColumn>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Name
          {column.getIsSorted() === 'asc' ? (
            <MoveDown className='ml-2 h-4 w-4' />
          ) : (
            <MoveUp className='ml-2 h-4 w-4' />
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
