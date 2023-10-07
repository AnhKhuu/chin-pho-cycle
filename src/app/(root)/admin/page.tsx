import prismadb from '@/lib/prismadb';

export default async function Page() {
  // Get all products
  const products = await prismadb.product.findMany();

  return (
    <>
      <h2>Welcome to Admin!</h2>
      <b>Products</b>
      {!products && <p>You do not have any products.</p>}
      {products.map((product) => (
        <p key={product.id}>{JSON.stringify(product)}</p>
      ))}
    </>
  );
}
