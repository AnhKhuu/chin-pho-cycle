'use client';

import Header from '../components/header';

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className='p-10'>{children}</main>
    </>
  );
}
