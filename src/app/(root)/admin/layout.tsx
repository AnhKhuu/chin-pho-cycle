'use client';

import { UnauthorizedPage } from '@/components';
import { useUser } from '@clerk/nextjs';

import { Header } from './components/header';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const { isLoaded, user } = useUser();
  if (!isLoaded) {
    return <>Loading...</>;
  }

  const isAdmin = user?.publicMetadata?.isAdmin;
  if (!isAdmin) {
    return <UnauthorizedPage />;
  }

  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default AdminLayout;
