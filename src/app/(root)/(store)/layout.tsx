'use client';

import { Footer, Header, PreHeader } from './components';

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PreHeader msg={'Free shipping for orders over 1,000,000 đ'} />
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
