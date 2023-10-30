'use client';

import { Button, DataTable, Heading, Separator } from '@/components';
import { AdminRoutes, PublicApi, QueryKeys } from '@/utils/constant';
import axios from 'axios';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import toast from 'react-hot-toast';
import { useQuery } from 'react-query';

import { columns } from './components/columns';

export default function Page() {
  const { data, error } = useQuery(QueryKeys.COLLECTIONS, getCollections);

  async function getCollections() {
    return await axios.get(PublicApi.COLLECTIONS);
  }

  if (error) {
    toast.error('Something went wrong!');
  }

  return (
    <main className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <div className='flex items-center justify-between'>
          <Heading
            title={`Collections ${data ? `(${data.data.length})` : ''}`}
            description='Manage collections for your store'
          />
          <Link href={`${AdminRoutes.COLLECTIONS}/create`}>
            <Button>
              <Plus className='mr-2 h-4 w-4' />
              Add New
            </Button>
          </Link>
        </div>
        <Separator />
        {data && (
          <DataTable
            columns={columns}
            data={data?.data}
            sortingState={[{ id: 'name', desc: false }]}
          />
        )}
      </div>
    </main>
  );
}
