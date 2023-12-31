import { Button } from '@/components/ui/button';
import Link from 'next/link';

const UnauthorizedPage = () => {
  return (
    <main className='p-10'>
      <div className='text-center'>
        <p className='mb-3 text-6xl font-bold'>Hold Up</p>
        <p className='mb-9 text-xl'>Sorry, admins only.</p>
        <Link href='/'>
          <Button>Back to Store</Button>
        </Link>
      </div>
    </main>
  );
};

export { UnauthorizedPage };
