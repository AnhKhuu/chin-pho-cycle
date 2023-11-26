import { Button, Skeleton } from '@/components';
import { I18nTermsHome } from '@/utils/constant';
import { TCollectionItem } from '@/utils/types';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

export function Banner({
  collections,
  isLoading,
}: {
  collections: TCollectionItem[];
  isLoading: boolean;
}) {
  const locale = useLocale();
  const t = useTranslations('Home');

  return (
    <>
      {collections?.map((collection) => (
        <div
          className='relative block h-[70vh] w-full lg:h-screen'
          key={collection.id}
        >
          <Image
            src={collection.imageUrl}
            alt={collection[`name_${locale}`]}
            fill
            sizes='100vw'
            style={{ objectFit: 'cover' }}
          />
          <div className='absolute bottom-10 left-10 right-10 grid grid-cols-2'>
            <div>
              <Image
                src={'/images/MAAP.png'}
                alt={'MAAP'}
                sizes='100vw'
                width={241}
                height={63}
                className='mb-4'
              />
              <p className='col-span-1 max-w-screen-md text-sm font-light text-white lg:text-base'>
                {collection[`description_${locale}`]}
              </p>
            </div>
            <div className='col-span-1 flex items-end justify-end'>
              <Link href={'/'}>
                <Button variant={'secondary'}>
                  {t(I18nTermsHome.EXPLORE_COLLECTION)}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      ))}
      {isLoading && <Skeleton className='h-screen w-screen' />}
    </>
  );
}
