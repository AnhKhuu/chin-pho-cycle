import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { IProductItem } from '../../utils/types';

export default function ProductCard({ product }: { product: IProductItem }) {
  return (
    <Link href={'/'} className='group mb-4'>
      <div className='relative'>
        <Image
          src={product.imageUrl}
          alt='test'
          width={354}
          height={500}
          sizes='(max-width: 768px), 50vw, 25vw'
          style={{
            width: '100%',
            height: 'auto',
          }}
        />
        <div className='absolute bottom-0 right-0 flex bg-white opacity-0 transition duration-300 ease-in-out group-hover:opacity-100'>
          {product.sizes.map((size, index) => (
            <p className='mx-2' key={index}>
              {size}
            </p>
          ))}
        </div>
      </div>
      <p className='mt-4'>{product.productName}</p>
      <p className='mb-1'>
        {product.color} - {product.colors.length} Colors
      </p>
      <p className='text-sm'>{product.price} đ</p>
    </Link>
  );
}
