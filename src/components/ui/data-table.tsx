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
}

const formSchema = z.object({
  value: z.string(),
});

type SearchFormValue = z.infer<typeof formSchema>;

function DataTable<TData, TValue>({
  columns,
  data,
  searchData,
}: DataTableProps<TData, TValue>) {
  const [filtering, setFiltering] = React.useState('');
  const [sorting, setSorting] = React.useState<SortingState>([]);

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

  const form = useForm<SearchFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      value: '',
    },
  });

  const onSearch = async (searchValue: SearchFormValue) => {
    const value = searchValue?.value ?? '';
    if (Boolean(searchData)) {
      searchData?.(value);
    } else {
      setFiltering(value);
    }
  };

  return (
    <div>
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
      <div className='rounded-md border'>
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
      <div className='flex items-center justify-end space-x-2 py-4'>
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
    </div>
  );
}

export { DataTable };
