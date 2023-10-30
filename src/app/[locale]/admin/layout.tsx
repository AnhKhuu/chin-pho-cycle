'use client';

import { UnauthorizedPage } from '@/components';
import { useUser } from '@clerk/nextjs';
import { QueryClient, QueryClientProvider } from 'react-query';

import { Header } from './components/header';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoaded, user } = useUser();
  if (!isLoaded) {
    return <>Loading...</>;
  }

  const isAdmin = user?.publicMetadata?.isAdmin;
  if (!isAdmin) {
    return <UnauthorizedPage />;
  }

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      {children}
    </QueryClientProvider>
  );
}
