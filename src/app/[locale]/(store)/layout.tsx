'use client';

import { QueryClient, QueryClientProvider } from 'react-query';

import Footer from './components/footer';
import Header from './components/header';
import PreHeader from './components/pre-header';

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <PreHeader />
      <Header />
      <main>{children}</main>
      <Footer />
    </QueryClientProvider>
  );
}
