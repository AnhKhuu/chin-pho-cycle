import { Button, Skeleton } from '@/components';
import { I18nTermsHome } from '@/utils/constant';
import { THighlightItem } from '@/utils/types';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';

export function HighlightGallery({
  highlights,
  isLoading,
}: {
  highlights: THighlightItem[];
  isLoading: boolean;
}) {
  const locale = useLocale();
  const t = useTranslations('Home');
  const [hasWindow, setHasWindow] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setHasWindow(true);
    }
  }, []);

  const isShowVideo = hasWindow && !isLoading;

  return (
    <>
      {highlights?.map((highlight) => (
        <div className='relative block w-screen lg:h-fit' key={highlight.id}>
          {highlight.bannerImages.length > 0 && (
            <Image
              src={highlight.bannerImages[0]}
              alt={highlight[`name_${locale}`]}
              width={1400}
              height={676}
              sizes='100vw'
              className='h-screen w-screen object-center'
            />
          )}
          {highlight.bannerVideos.length > 0 && isShowVideo && (
            <div className='aspect-video w-full'>
              <ReactPlayer
                url={highlight.bannerVideos[0]}
                width='100%'
                height='100%'
                playing={true}
                muted={true}
              />
            </div>
          )}
          {highlight.bannerVideoExternalUrl && isShowVideo && (
            <div
              className='video'
              style={{
                position: 'relative',
                paddingBottom: '56.25%' /* 16:9 */,
                paddingTop: 25,
                height: 0,
              }}
            >
              <iframe
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                }}
                src={highlight.bannerVideoExternalUrl}
              />
            </div>
          )}
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
                {highlight.titleImages.length > 0 && (
                  <Image
                    src={highlight.titleImages[0]}
                    alt={highlight[`name_${locale}`]}
                    sizes='100vw'
                    width={241}
                    height={63}
                    className='mb-4 h-16 w-auto'
                  />
                )}
                <p className='max-w-screen-md text-sm font-light text-white lg:text-base'>
                  {highlight[`description_${locale}`]}
                </p>
              </div>
            </div>
            <div className='col-span-1'></div>
            <div className='col-span-1 mb-10 mr-10 flex items-end justify-end'>
              <Link href={highlight.resourceUrl}>
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
