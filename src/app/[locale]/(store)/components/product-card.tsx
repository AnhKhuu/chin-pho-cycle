/* eslint-disable complexity */
import { I18nTermsProductCard, QueryParam, Routes } from '@/utils/constant';
import { capitalizeFirstLetter, formatPrice } from '@/utils/fn';
import { TVariantItem } from '@/utils/types';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

type TProductInfo = {
  typeId: number;
  categoryId: number;
  brand: string;
  name: string;
  variantLength: number;
  price: number;
};

export default function ProductCard({
  product,
  productInfo,
  isLatest = false,
}: {
  product: TVariantItem;
  productInfo?: TProductInfo;
  isLatest?: boolean;
}) {
  const locale = useLocale();
  const t = useTranslations('ProductCard');
  const sizes = product.stocks.filter((size) => size.quantity > 0);

  return (
    <Link
      href={`${Routes.PRODUCT}/${product.id}?${QueryParam.TYPES}=${
        productInfo?.typeId ?? product.product.typeId
      }&${QueryParam.CATEGORY}=${
        productInfo?.categoryId ?? product.product.categoryId
      }`}
      className='group mb-4'
    >
      <div className='relative'>
        {isLatest && (
          <div className='absolute right-0 top-0 bg-primary px-3 py-1 font-semibold text-white'>
            {t(I18nTermsProductCard.NEW).toUpperCase()}!
          </div>
        )}
        {sizes.length <= 0 && (
          <div className='absolute right-0 top-0 bg-red-600 px-3 py-1 font-semibold text-white'>
            {t(I18nTermsProductCard.SOLD_OUT).toUpperCase()}!
          </div>
        )}
        {product.images[0] && (
          <Image
            src={product.images[0]}
            alt='product'
            width={354}
            height={500}
            sizes='(max-width: 768px), 50vw, 25vw'
            className={`h-52 w-full object-cover object-center ${
              product.images[1] ? 'group-hover:hidden' : ''
            }  sm:h-80 lg:h-80 xl:h-96`}
          />
        )}
        {product.images[1] && (
          <Image
            src={product.images[1]}
            alt='product'
            width={354}
            height={500}
            sizes='(max-width: 768px), 50vw, 25vw'
            className={
              'hidden h-52 w-full object-cover object-center group-hover:block sm:h-80 lg:h-80 xl:h-96'
            }
          />
        )}
        <div className='absolute bottom-0 right-0 ml-auto flex bg-white py-1 text-xs font-light transition duration-300 ease-in-out group-hover:opacity-100 xl:left-0 xl:opacity-0'>
          {product.stocks.map((size, index) => (
            <p
              className={`mx-2 ${
                size.quantity <= 0 ? 'text-gray-400 line-through' : ''
              }`}
              key={index}
            >
              {size.size}
            </p>
          ))}
        </div>
      </div>
      <p className='my-4 text-sm font-bold lg:text-base'>
        {productInfo?.brand ?? product.product.brand[`name_${locale}`]}
      </p>
      <p className='text-sm font-bold lg:text-base'>
        {productInfo?.name ?? product.product[`name_${locale}`]}
      </p>
      <p className='text-sm font-normal lg:text-base'>
        {product[`name_${locale}`]} -{' '}
        {(productInfo?.variantLength ?? product.product.variants.length) > 1
          ? `${
              productInfo?.variantLength ?? product.product.variants.length
            } ${capitalizeFirstLetter(t(I18nTermsProductCard.COLORS))}`
          : `${
              productInfo?.variantLength ?? product.product.variants.length
            } ${capitalizeFirstLetter(t(I18nTermsProductCard.COLOR))}`}
      </p>
      <p className='text-sm font-normal lg:text-base'>
        {formatPrice(productInfo?.price ?? product.product.price).toString()}{' '}
        VND
      </p>
    </Link>
  );
}
