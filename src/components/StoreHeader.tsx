import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header({}: React.HtmlHTMLAttributes<HTMLElement>) {
  const pathname = usePathname();

  const routes = [
    {
      href: '/store/bikes',
      label: 'Bikes',
      active: pathname === '/store/bikes',
    },
    {
      href: '/store/gear',
      label: 'Gear',
      active: pathname === '/store/gear',
    },
    {
      href: '/store/apparel',
      label: 'Apparel',
      active: pathname === '/store/apparel',
    },
    {
      href: '/store/news',
      label: 'News',
      active: pathname === '/store/news',
    },
    {
      href: '/store/contact',
      label: 'Contact',
      active: pathname === '/store/contact',
    },
  ];

  return (
    <header className='border-b bg-white'>
      <nav className='flex h-20 items-center justify-center px-6'>
        <div className=''>
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                'me-7 text-sm tracking-wide hover:underline hover:underline-offset-4',
                route.active ? 'underline underline-offset-4' : ''
              )}
            >
              {route.label}
            </Link>
          ))}
        </div>
        <div className='flex flex-1 justify-center'>
          <a href='/'>
            <img className='h-8 w-auto' src='/images/logo.webp' alt='logo' />
          </a>
        </div>
        <div className='flex items-center border-l pl-5'>
          <ShoppingCart className='cursor-pointer text-muted-foreground hover:text-black' />
          <span className='ml-5'>
            <SignedIn>
              <UserButton afterSignOutUrl='/' />
            </SignedIn>
            <SignedOut>
              <SignInButton>
                <Button>Sign In</Button>
              </SignInButton>
            </SignedOut>
          </span>
        </div>
      </nav>
    </header>
  );
}
