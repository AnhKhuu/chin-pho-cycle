'use client';

import { Button, DataTable, Heading, Separator } from '@/components';
import { AdminRouteTypes, PublicApi, QueryKeys } from '@/utils/constant';
import axios from 'axios';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import toast from 'react-hot-toast';
import { useQuery } from 'react-query';

import { Columns } from './components/columns';

export default function Page() {
  const { data, error } = useQuery(QueryKeys.CATEGORIES, getCategories);

  async function getCategories() {
    return await axios.get(PublicApi.CATEGORIES);
  }

  if (error) {
    toast.error('Something went wrong!');
  }

  return (
    <main className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <div className='flex items-center justify-between'>
          <Heading
            title={`Categories ${data ? `(${data.data.length})` : ''}`}
            description='Manage categories for your store'
          />
          <Link href={`${AdminRouteTypes.CATEGORY}/create`}>
            <Button>
              <Plus className='mr-2 h-4 w-4' />
              Add New
            </Button>
          </Link>
        </div>
        <Separator />
        {data && <DataTable columns={Columns} data={data?.data} />}
      </div>
    </main>
  );
}
