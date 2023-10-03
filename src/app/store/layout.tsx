'use client';

import StoreHeader from '@/components/StoreHeader';

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <StoreHeader />
      <main className='p-10'>{children}</main>
    </>
  );
}
