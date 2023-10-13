import { cn } from '@/utils/fn';
import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const Header = () => {
  const pathname = usePathname();

  const routes = [
    {
      href: '/admin/brands',
      label: 'Brands',
      active: pathname.startsWith('/admin/brands'),
    },
  ];

  return (
    <header className='flex items-center border-b bg-white px-6'>
      <nav className='flex items-center'>
        {routes.map((route) => (
          <div key={route.href} className={cn('')}>
            <Link
              href={route.href}
              className={cn(
                'flex h-16 items-center border-b-2 border-white px-4 text-sm transition duration-100 ease-in-out hover:border-black',
                route.active ? 'font-bold' : ''
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
};
