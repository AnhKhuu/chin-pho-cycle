import { SignedIn, SignedOut } from '@clerk/nextjs';

export default function StorePage() {
  return (
    <>
      <p>Welcome to Store!</p>
      <SignedIn>
        <p>You are signed in!</p>
      </SignedIn>
      <SignedOut>You are not signed in.</SignedOut>
    </>
  );
}
