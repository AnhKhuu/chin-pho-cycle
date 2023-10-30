'use client';

import { QueryClient, QueryClientProvider } from 'react-query';

import { Footer, Header, PreHeader } from './components';
import { useTranslations } from 'next-intl';

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations('PreHeader')
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
