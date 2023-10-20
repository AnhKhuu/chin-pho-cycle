'use client';

import { QueryClient, QueryClientProvider } from 'react-query';

import { Footer, Header, PreHeader } from './components';

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <PreHeader msg={'Free shipping for orders over 1,000,000 đ'} />
      <Header />
      <main>{children}</main>
      <Footer />
    </QueryClientProvider>
  );
}
