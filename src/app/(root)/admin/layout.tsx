'use client';

import UnauthorizedPage from '@/components/unauthorized-page';
import { useUser } from '@clerk/nextjs';

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

  return <main className='p-10'>{children}</main>;
}
