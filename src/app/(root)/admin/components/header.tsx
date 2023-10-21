import { AdminRoutes } from '@/utils/constant';
import { cn } from '@/utils/fn';
import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Header() {
  const pathname = usePathname();

  const routes = [
    {
      href: AdminRoutes.BRAND,
      label: 'Brands',
      active: pathname.startsWith(AdminRoutes.BRAND),
    },
    {
      href: AdminRoutes.CATEGORY,
      label: 'Categories',
      active: pathname.startsWith(AdminRoutes.CATEGORY),
    },
  ];

  return (
    <header className='flex items-center border-b px-6'>
      <nav className='flex items-center'>
        {routes.map((route) => (
          <div key={route.href} className={cn('')}>
            <Link
              href={route.href}
              className={cn(
                'flex h-16 items-center border-b-2 border-white px-4 text-sm font-medium text-muted-foreground transition duration-100 ease-in-out',
                route.active
                  ? 'border-b-2 border-black text-black'
                  : 'hover:border-b-2 hover:border-black hover:text-black'
              )}
            >
              {route.label}
            </Link>
          </div>
        ))}
      </nav>
      <div className='ml-auto flex items-center space-x-4'>
        <UserButton afterSignOutUrl='/' />
      </div>
    </header>
  );
}
