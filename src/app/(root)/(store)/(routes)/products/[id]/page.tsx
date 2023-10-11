export default function Page({ params }: { params: { id: string[] } }) {
  const { id } = params;
  return (
    <>
      <p>Product: {id}</p>
      <article className='grid grid-cols-3'>
        <div className='col-span-2 grid grid-cols-2 gap-2'>
          {[...Array(7)].map((x, i) => (
            <div key={i} className='h-96 bg-red-300'>
              img
            </div>
          ))}
        </div>
        <section className='bg-blue-300 p-6'>
          <h1>Product Name</h1>
          <p>TBD</p>
        </section>
      </article>
    </>
  );
}
