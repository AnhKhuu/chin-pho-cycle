'use client';

import { AlertModal, Button } from '@/components';
import { PrivateApi } from '@/utils/constant';
import { cn, getPublicIdFromUrl } from '@/utils/fn';
import { UploadButton } from '@/utils/uploadthing';
import axios from 'axios';
import { Trash, ZoomIn } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
}

interface IUploadedImage {
  key: string;
  name: string;
  size: number;
  url: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onChange,
  onRemove,
  value,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<IUploadedImage[]>([]);

  const onDelete = async (url: string) => {
    // Remove URL from form
    onRemove(url);

    // need fileKey or extract from URL using regex
    // await utapi.deleteFiles()

    // Clean up on Cloudinary
    const publicId = getPublicIdFromUrl(url);
    if (publicId) {
      await axios.post(`${PrivateApi.DELETE_CLOUDINARY_IMAGE}?id=${publicId}`);
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
        endpoint='imageUploader'
        onClientUploadComplete={(res) => {
          console.log('Files: ', res);
          if (res) {
            setUploadedImages(
              [...res].map((object) => {
                return {
                  ...object,
                };
              })
            );
            onChange(res[0].url);
            toast.success('Image uploaded!');
            console.log(uploadedImages);
          }
        }}
        onUploadError={(error: Error) => {
          toast.error(`Upload failed! ${error.message}`);
        }}
      />
      {/* <CldUploadWidget onUpload={onUpload} uploadPreset='chin_pho_cycle'>
        {({ open }) => {
          const onClick = () => {
            open();
          };

          return (
            <Button
              type='button'
              disabled={disabled}
              variant='secondary'
              onClick={onClick}
            >
              <ImagePlus className='mr-2 h-4 w-4' />
              Upload Image
            </Button>
          );
        }}
      </CldUploadWidget> */}
    </div>
  );
};

export { ImageUpload };
