import { authMiddleware } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your middleware
export default authMiddleware({
  afterAuth(_auth, req, _evt) {
    if (req.nextUrl.pathname === '/') {
      return NextResponse.redirect(new URL('/store', req.url));
    }
  },
  publicRoutes: ['/', '/store(.*)', '/admin'],
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
