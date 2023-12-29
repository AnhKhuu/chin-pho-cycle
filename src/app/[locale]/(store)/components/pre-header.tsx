import { useTranslations } from 'next-intl';

export default function PreHeader() {
  const t = useTranslations('PreHeader');

  return (
    <div className='bg-primary py-2 text-center text-white drop-shadow-lg'>
      {t('title')}
    </div>
  );
}
