import { Button, Skeleton } from '@/components';
import { I18nTermsHome, QueryParam, Routes } from '@/utils/constant';
import { TBrandItem } from '@/utils/types';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

export function BrandGallery({
  brands,
  isLoading,
}: {
  brands: TBrandItem[];
  isLoading: boolean;
}) {
  const locale = useLocale();
  const t = useTranslations('Home');

  return (
    <>
      {brands?.map((brand) => (
        <div
          className='relative block h-[70vh] w-full lg:h-screen'
          key={brand.id}
        >
          <Image
            src={brand.images[0]}
            alt={brand[`name_${locale}`]}
            fill
            sizes='100vw'
            className='object-cover'
          />
          <div className='absolute bottom-0 left-0 right-0 grid grid-cols-3'>
            <div className='relative col-span-1'>
              <Image
                src={'/images/gray-background-lg.png'}
                alt={'layout'}
                width={552}
                height={205}
                className='absolute bottom-0 left-0 z-0'
              />
              <div className='absolute bottom-10 left-10 z-10 w-5/6'>
                {brand.logos.length > 0 && (
                  <Image
                    src={brand.logos[0]}
                    alt={brand[`name_${locale}`]}
                    sizes='100vw'
                    width={241}
                    height={63}
                    className='mb-4 h-16 w-auto'
                  />
                )}
                <p className='max-w-screen-md text-sm font-light text-white lg:text-base'>
                  {brand[`description_${locale}`]}
                </p>
              </div>
            </div>
            <div className='col-span-1'></div>
            <div className='col-span-1 mb-10 mr-10 flex items-end justify-end'>
              <Link href={`${Routes.SEARCH}?${QueryParam.BRANDS}=${brand.id}`}>
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
