'use client';

import { useTranslations } from 'next-intl';
import { QueryClient, QueryClientProvider } from 'react-query';

import Footer from './components/footer';
import Header from './components/header';
import PreHeader from './components/pre-header';

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations('PreHeader');
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <PreHeader msg={t('title')} />
      <Header />
      <main>{children}</main>
      <Footer />
    </QueryClientProvider>
  );
}
