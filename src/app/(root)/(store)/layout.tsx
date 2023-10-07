'use client';

import { Footer, Header } from './components';

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='h-fit'>
      <div className='bg-black py-2 text-center text-white drop-shadow-lg'>
        Free shipping for orders over 1,000,000 đ
      </div>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
