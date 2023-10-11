'use client';

import UnauthorizedPage from '@/components/unauthorized-page';
import { UserButton, useUser } from '@clerk/nextjs';

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

  return (
    <>
      <header className='flex h-16 items-center bg-white px-4 shadow'>
        <UserButton afterSignOutUrl='/' />
      </header>
      <main className='p-10'>{children}</main>
    </>
  );
}
