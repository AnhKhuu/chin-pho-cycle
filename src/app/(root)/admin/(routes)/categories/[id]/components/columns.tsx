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

type SubCategory = {
  id: string;
  value: string;
};

export type SubCategoryColumn = SubCategory & {
  showEditForm: () => void;
  showConfirmModal: () => void;
};

export const Columns: ColumnDef<SubCategoryColumn>[] = [
  {
    id: 'order',
    header: () => {
      return <div>Order</div>;
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
            Sub Categories
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
  data: SubCategory;
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
          onClick={() => navigator.clipboard.writeText(data.id)}
        >
          Copy sub category ID
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => showEditForm()}>
          Edit sub category
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => showConfirmModal()}>
          Delete sub category
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}