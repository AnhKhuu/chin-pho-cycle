import { Button, Skeleton } from '@/components';
import { I18nTermsHome } from '@/utils/constant';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';

export function VideoPlayer({
  url,
  youtubeId,
  isLoading,
}: {
  url?: string;
  youtubeId?: string;
  isLoading: boolean;
}) {
  const t = useTranslations('Home');
  const [hasWindow, setHasWindow] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setHasWindow(true);
    }
  }, []);
  return (
    <div className='grid grid-cols-5'>
      <div className='col-span-3'>
        {hasWindow && url && !isLoading && (
          <ReactPlayer
            url={url}
            width='100%'
            height='100%'
            playing={true}
            muted={true}
          />
        )}
        {isLoading && <Skeleton className='h-full w-full' />}
        {hasWindow && youtubeId && (
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
              src={`https://www.youtube.com/embed/${youtubeId}`}
            />
          </div>
        )}
      </div>
      <div className='col-span-2 flex flex-col justify-end bg-blue_1 px-11 py-16 text-white'>
        <div>
          <p className={'mb-3 text-6xl font-light'}>BIKE FIT</p>
          <p className='mb-12 font-normal'>
            Idmatch Smart Bike simulator is designed to meet the needs of any
            cycling discipline thanks to its wide range of motion, easily
            interchangeable attachments and adjustable cranks.
          </p>
          <div className='flex items-center'>
            <Button variant={'outline'} className='mr-12'>
              {t(I18nTermsHome.SIGN_UP_FOR_BIKE_FIT)}
            </Button>
            <Link
              href={'/'}
              className='font-normal hover:underline hover:underline-offset-4'
            >
              {t(I18nTermsHome.FIND_OUT_MORE)} &gt;&gt;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
