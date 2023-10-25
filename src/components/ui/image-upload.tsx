'use client';

import { AlertModal, Button } from '@/components';
import { PrivateApi } from '@/utils/constant';
import { cn } from '@/utils/fn';
import { UploadButton } from '@/utils/uploadthing';
import axios from 'axios';
import { Trash, ZoomIn } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface ImageUploadProps {
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onChange,
  onRemove,
  value,
}) => {
  const [openModal, setOpenModal] = useState(false);

  const onDelete = async (url: string) => {
    onRemove(url);

    const key = url.split('https://utfs.io/f/')[1];
    const res = await axios.post(
      `${PrivateApi.DELETE_UPLOADTHING_IMAGE}?key=${key}`
    );
    if (res.status === 200) {
      toast.success('Image deleted!');
    } else {
      toast.error('Something went wrong');
    }
  };

  return (
    <div>
      <div className='mb-4 flex items-center gap-4'>
        {value.map((url) => (
          <div
            key={url}
            className='relative h-[300px] w-[300px] overflow-hidden rounded-md border'
          >
            <div className='absolute right-2 top-2 z-10'>
              <div className='flex flex-col space-y-2'>
                <Button
                  asChild
                  type='button'
                  variant='secondary'
                  size='sm'
                  className={cn('rounded-md')}
                >
                  <Link href={url} rel='noopener noreferrer' target='_blank'>
                    <ZoomIn className='h-4 w-4' />
                  </Link>
                </Button>
                <Button
                  type='button'
                  onClick={() => setOpenModal(true)}
                  variant='destructive'
                  size='sm'
                  className={cn('rounded-md')}
                >
                  <Trash className='h-4 w-4' />
                </Button>
                <AlertModal
                  isOpen={openModal}
                  onClose={() => setOpenModal(false)}
                  onConfirm={() => onDelete(url)}
                />
              </div>
            </div>
            <Image
              fill
              className='object-cover'
              alt='Image'
              priority={true}
              src={url}
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            />
          </div>
        ))}
      </div>
      <UploadButton
        className='w-max ut-button:bg-black ut-button:ring-0 ut-button:after:bg-gray-600 ut-button:ut-uploading:bg-gray-800'
        endpoint='productImages'
        onClientUploadComplete={(res) => {
          if (res) {
            console.log('Uploaded: ', res);
            onChange(res[0].url);
            toast.success('Image uploaded!');
          }
        }}
        onUploadError={(error: Error) => {
          toast.error(`Upload failed! ${error.message}`);
        }}
      />
    </div>
  );
};

export { ImageUpload };
