export default function PreHeader({ msg }: { msg: string }) {
  return (
    <div className='bg-black py-2 text-center text-white drop-shadow-lg'>
      {msg}
    </div>
  );
}
