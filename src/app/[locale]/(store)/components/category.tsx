import Link from 'next/link';
import { ReactNode } from 'react';

function CategoryWrapper({ children }: { children: ReactNode }) {
  return <div className='group/nav'>{children}</div>;
}

function CategoryTitle({ children }: { children: ReactNode }) {
  return (
    <div className='peer/nav flex h-16 cursor-pointer items-center border-b-2 border-white px-6 text-sm transition duration-100 ease-in-out group-hover/nav:border-black'>
      {children}
    </div>
  );
}

function CategoryMenu({ children }: { children: ReactNode }) {
  return (
    <div className='peer/menu invisible absolute left-0 top-16 h-min w-screen bg-white_2 hover:visible peer-hover/nav:visible'>
      <div className='flex text-sm'>{children}</div>
    </div>
  );
}

function SubCategoryTitle({ children }: { children: ReactNode }) {
  return (
    <p className='mb-2 font-semibold underline underline-offset-4'>
      {children}
    </p>
  );
}

function SubCategoryItem({
  children,
  url,
}: {
  children: ReactNode;
  url: string;
}) {
  return (
    <Link
      href={url}
      className='mb-1 block indent-4 underline-offset-4 hover:underline'
    >
      {children}
    </Link>
  );
}

export {
  CategoryWrapper,
  CategoryTitle,
  CategoryMenu,
  SubCategoryTitle,
  SubCategoryItem,
};
