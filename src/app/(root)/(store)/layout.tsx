'use client';

import { Footer, Header } from './components';

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className='bg-black py-2 text-center text-white drop-shadow-lg'>
        Free shipping for orders over 1,000,000 đ
      </div>
      <div className='sticky left-0 right-0 top-0 z-50'>
        <Header />
      </div>
      <main>{children}</main>
      <Footer />
    </>
  );
}
