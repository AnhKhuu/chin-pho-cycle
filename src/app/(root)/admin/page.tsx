// import prismadb from '@/lib/prismadb';
import Link from 'next/link';

export default async function Page() {
  // Get all products
  // const products = await prismadb.product.findMany();

  return (
    <>
      <h2>Welcome to Admin!</h2>
      <ul>
        <li>
          <Link href={'/admin/brands'}>Brands</Link>
        </li>
        <li>
          <Link href={'/admin/categories'}>Categories</Link>
        </li>
      </ul>

      {/* <b>Products</b>
      {!products && <p>You do not have any products.</p>}
      {products.map((product) => (
        <p key={product.id}>{JSON.stringify(product)}</p>
      ))} */}
    </>
  );
}
