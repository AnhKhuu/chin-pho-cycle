'use client';

import {
  AlertModal,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components';
import { AdminRoutes, PrivateApi } from '@/utils/constant';
import axios from 'axios';
import { MoreHorizontal } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';

import { TBrandColumn } from './columns';

interface ICellActionProps {
  data: TBrandColumn;
}

export const CellAction: React.FC<ICellActionProps> = ({ data }) => {
  const router = useRouter();

  const [openModal, setOpenModal] = useState(false);

  const deleteBrand = useMutation(
    async () => await axios.delete(`${PrivateApi.BRANDS}/${data.id}`),
    {
      onSuccess: () => {
        toast.success('Brand deleted!');
        router.push(AdminRoutes.BRANDS);
      },
      onError: () => {
        toast.error('Make sure you removed all products of this brand!');
      },
    }
  );

  const onDelete = async () => {
    deleteBrand.mutate();
  };

  return (
    <>
      <AlertModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        onConfirm={onDelete}
      />
      <div className='flex justify-center'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Open menu</span>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuItem
              className='cursor-pointer'
              onClick={() => {
                navigator.clipboard.writeText(data.id);
                toast.success('Brand ID copied to clipboard!');
              }}
            >
              Copy ID
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => router.push(`${AdminRoutes.BRANDS}/${data.id}`)}
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setOpenModal(true)}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
};
