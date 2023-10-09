export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex h-[calc(100dvh)] w-full items-center justify-center bg-[url('/images/factor-bike.webp')] bg-cover">
      {children}
    </main>
  );
}
