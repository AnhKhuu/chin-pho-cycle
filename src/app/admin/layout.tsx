'use client';

import { Button } from '@/components/ui/button';
import { useOrganizationList } from '@clerk/nextjs';
import Link from 'next/link';

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

  if (adminOrganization) {
    return <main className='p-10'>{children}</main>;
  }

  return (
    <div>
      <p className='mb-4'>Back off, you are not admin</p>
      <Link href='/store'>
        <Button>Back to Store</Button>
      </Link>
    </div>
  );
}
