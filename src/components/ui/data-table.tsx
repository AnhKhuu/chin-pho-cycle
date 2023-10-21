'use client';

import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  Input,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchData?: (searchValue: string) => void;
  isSearchEnabled?: boolean;
  sortingState?: TSortingState[];
}

const ROWS_PER_PAGE = 8;

const formSchema = z.object({
  value: z.string(),
});

type TSearchFormValue = z.infer<typeof formSchema>;

type TSortingState = {
  id: string;
  desc: boolean;
};

function DataTable<TData, TValue>({
  columns,
  data,
  searchData,
  isSearchEnabled = true,
  sortingState = [],
}: DataTableProps<TData, TValue>) {
  const [filtering, setFiltering] = React.useState('');
  const [sorting, setSorting] = React.useState<SortingState>(sortingState);

  const [usingFilter, setUsingFilter] = React.useState('');

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onGlobalFilterChange: setFiltering,
    onSortingChange: setSorting,
    state: {
      globalFilter: filtering,
      sorting: sorting,
    },
  });

  const form = useForm<TSearchFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      value: '',
    },
  });

  const onSearch = async (searchValue: TSearchFormValue) => {
    const value = searchValue?.value ?? '';
    if (Boolean(searchData)) {
      searchData?.(value);
    } else {
      setFiltering(value);
    }
    setUsingFilter(value);
  };

  return (
    <div>
      {isSearchEnabled && (
        <>
          <div className='flex items-center py-4'>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSearch)}
                className='flex w-full items-end'
              >
                <div className='mr-4 w-1/4'>
                  <FormField
                    control={form.control}
                    name='value'
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder='Search' {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <Button type='submit'>Search</Button>
              </form>
            </Form>
          </div>
          {usingFilter && (
            <p className='my-2 text-sm'>
              Showing results for filter:{' '}
              <span className='font-bold'>{usingFilter}</span>
            </p>
          )}
        </>
      )}
      <div className='mb-4 rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {data.length > ROWS_PER_PAGE && (
        <div className='flex items-center justify-end space-x-2 pb-4'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}

export { DataTable };
