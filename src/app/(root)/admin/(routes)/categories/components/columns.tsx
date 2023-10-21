'use client';

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components';
import { AdminRoutes } from '@/utils/constant';
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal, MoveDown, MoveUp } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';

export type TCategoryColumn = {
  id: string;
  value: string;
};

export const columns: ColumnDef<TCategoryColumn>[] = [
  {
    id: 'no',
    header: () => {
      return <div>No.</div>;
    },
    cell: ({ row }) => <p>{row.index + 1}</p>,
  },
  {
    accessorKey: 'value',
    header: ({ column }) => {
      return (
        <div className='flex justify-start'>
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Value
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
      return <div className='px-4'>{row.original.value}</div>;
    },
  },
  {
    id: 'actions',
    header: () => {
      return <div>Actions</div>;
    },
    cell: ({ row }) => <CellAction id={row.original.id} />,
  },
];

function CellAction({ id }: { id: string }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='h-8 w-8 p-0'>
          <MoreHorizontal className='h-4 w-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem
          className='cursor-pointer'
          onClick={() => {
            toast.success('Category ID copied to clipboard!');
            navigator.clipboard.writeText(id);
          }}
        >
          Copy ID
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href={`${AdminRoutes.CATEGORIES}/${id}`}>Edit</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
