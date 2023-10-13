'use client';

import { Button } from '@/components';
import { cn } from '@/utils/fn';
import { ImagePlus, Trash, ZoomIn } from 'lucide-react';
import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  disabled,
  onChange,
  onRemove,
  value,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  if (!isMounted) {
    return null;
  }

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
                  onClick={() => onRemove(url)}
                  variant='destructive'
                  size='sm'
                  className={cn('rounded-md')}
                >
                  <Trash className='h-4 w-4' />
                </Button>
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
      <CldUploadWidget onUpload={onUpload} uploadPreset='chin_pho_cycle'>
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
      </CldUploadWidget>
    </div>
  );
};

export { ImageUpload };
