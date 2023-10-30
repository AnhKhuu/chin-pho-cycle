'use client';

import { AdminRoutes, PrivateApi, QueryKeys } from '@/utils/constant';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useMutation, useQuery } from 'react-query';

import CollectionForm from './components/collection-form';

type TCollectionData = {
  name: string;
  description: string;
};

export default function Page({ params }: { params: { id: string } }) {
  const router = useRouter();

  const { data: collection } = useQuery(
    [QueryKeys.COLLECTION, params.id],
    async () => await axios.get(`${PrivateApi.COLLECTIONS}/${params.id}`)
  );

  const createCollection = useMutation(
    async (data: TCollectionData) =>
      await axios.post(PrivateApi.COLLECTIONS, data),
    {
      onSuccess: () => {
        toast.success('Collection created!');
        router.push(AdminRoutes.COLLECTIONS);
      },
      onError: () => {
        toast.error('Something went wrong');
      },
    }
  );

  const updateCollection = useMutation(
    async (data: TCollectionData) =>
      await axios.patch(`${PrivateApi.COLLECTIONS}/${params.id}`, data),
    {
      onSuccess: () => {
        toast.success('Collection updated!');
        router.push(AdminRoutes.COLLECTIONS);
      },
      onError: () => {
        toast.error('Something went wrong');
      },
    }
  );

  const deleteCollection = useMutation(
    async () => await axios.delete(`${PrivateApi.COLLECTIONS}/${params.id}`),
    {
      onSuccess: () => {
        toast.success('Collection deleted!');
        router.push(AdminRoutes.COLLECTIONS);
      },
      onError: () => {
        toast.error('Make sure you removed all products of this collection!');
      },
    }
  );

  const handleCreateCollection = (data: TCollectionData) => {
    createCollection.mutate(data);
  };

  const handleUpdateCollection = (data: TCollectionData) => {
    updateCollection.mutate(data);
  };

  const handleDeleteCollection = () => {
    deleteCollection.mutate();
  };

  return (
    <main className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        {collection && (
          <>
            <CollectionForm
              initialData={collection.data}
              createCollection={handleCreateCollection}
              updateCollection={handleUpdateCollection}
              deleteCollection={handleDeleteCollection}
            />
          </>
        )}
      </div>
    </main>
  );
}
