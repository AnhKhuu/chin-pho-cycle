'use client';

import UnauthorizedPage from '@/components/UnauthorizedPage';
import { useOrganizationList } from '@clerk/nextjs';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoaded, userMemberships } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  });

  if (!isLoaded) {
    return <>Loading...</>;
  }

  const adminOrganization = userMemberships.data?.find(
    (org) => org.organization.slug === 'admin'
  );

  if (!adminOrganization) {
    return <UnauthorizedPage />;
  }

  return <main className='p-10'>{children}</main>;
}
