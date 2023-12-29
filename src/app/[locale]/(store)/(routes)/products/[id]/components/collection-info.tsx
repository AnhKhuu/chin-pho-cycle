import { Button } from '@/components';
import { I18nTermsProductDetails, QueryParam, Routes } from '@/utils/constant';
import { capitalizeFirstLetter } from '@/utils/fn';
import { TCollectionItem } from '@/utils/types';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

export default function CollectionInfo({
  collection,
}: {
  collection: TCollectionItem;
}) {
  const locale = useLocale();
  const t = useTranslations('ProductDetails');
  return (
    <div className='mb-16'>
      <Image
        src={collection?.images[0]}
        alt='collection'
        width={1440}
        height={778}
        sizes='100vw'
        className='h-screen w-screen object-cover object-center'
      />
      <div className='grid w-screen grid-cols-2 gap-20 bg-primary px-12 py-16 text-white'>
        <div className='col-span-1'>
          <p className='mb-20 text-8xl font-normal'>
            {collection?.[`name_${locale}`]}
          </p>
          <Link
            href={`${Routes.SEARCH}?${QueryParam.COLLECTION}=${collection?.id}`}
          >
            <Button variant={'outline'}>
              {capitalizeFirstLetter(
                t(I18nTermsProductDetails.DISCOVER_COLLECTION)
              )}
            </Button>
          </Link>
        </div>
        <div>
          <p>{collection?.[`description_${locale}`]}</p>
        </div>
      </div>
    </div>
  );
}
