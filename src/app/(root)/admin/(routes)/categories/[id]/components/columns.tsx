'use client';

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components';
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal, MoveDown, MoveUp } from 'lucide-react';
import toast from 'react-hot-toast';

type TSubCategory = {
  id: string;
  value: string;
};

export type TSubCategoryColumn = TSubCategory & {
  showEditForm: () => void;
  showConfirmModal: () => void;
};

export const columns: ColumnDef<TSubCategoryColumn>[] = [
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
            onClick={(e) => {
              e.preventDefault();
              column.toggleSorting(column.getIsSorted() === 'asc');
            }}
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
    cell: ({ row }) => (
      <CellAction
        data={row.original}
        showEditForm={row.original.showEditForm}
        showConfirmModal={row.original.showConfirmModal}
      />
    ),
  },
];

function CellAction({
  data,
  showEditForm,
  showConfirmModal,
}: {
  data: TSubCategory;
  showEditForm: () => void;
  showConfirmModal: () => void;
}) {
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
            toast.success('Sub-category ID copied to clipboard!');
            navigator.clipboard.writeText(data.id);
          }}
        >
          Copy ID
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => showEditForm()}>Edit</DropdownMenuItem>
        <DropdownMenuItem onClick={() => showConfirmModal()}>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
