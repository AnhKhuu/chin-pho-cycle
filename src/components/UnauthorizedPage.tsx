import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function UnauthorizedPage() {
  return (
    <main className='p-10'>
      <div className='text-center'>
        <p className='mb-3 text-6xl font-bold'>Hold Up</p>
        <p className='mb-9 text-xl'>Sorry, admins only.</p>
        <Link href='/store'>
          <Button>Back to Store</Button>
        </Link>
      </div>
    </main>
  );
}
