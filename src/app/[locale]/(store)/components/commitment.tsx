import { I18nTermsHome, bigShouldersDisplay } from '@/utils/constant';
import { useTranslations } from 'next-intl';
import React from 'react';

export default function Commitment() {
  const t = useTranslations('Home');
  const commitmentList: TCommitment[] = [
    {
      imageUrl: '',
      title: t(I18nTermsHome.FREE_SHIPPING),
      description: t(I18nTermsHome.FREE_SHIPPING_DESC),
    },
    {
      imageUrl: '',
      title: t(I18nTermsHome.FREE_RETURN),
      description: t(I18nTermsHome.FREE_RETURN_DESC),
    },
    {
      imageUrl: '',
      title: t(I18nTermsHome.CRASH_REPLACEMENT),
      description: t(I18nTermsHome.FREE_SHIPPING_DESC),
    },
  ];
  return (
    <div className='grid grid-cols-3 gap-4 bg-blue_1 px-6 py-16'>
      {commitmentList.map((commitment, index) => (
        <CommitmentCard commitment={commitment} key={index} />
      ))}
    </div>
  );
}

type TCommitment = {
  imageUrl: string;
  title: string;
  description: string;
};

function CommitmentCard({ commitment }: { commitment: TCommitment }) {
  return (
    <div className='col-span-1'>
      <div className='mb-6 h-40 w-40 rounded bg-white'></div>
      <p
        className={`text-5xl font-light text-white ${bigShouldersDisplay.className}`}
      >
        {commitment.title}
      </p>
      <p className='font-normal text-white'>{commitment.description}</p>
    </div>
  );
}
