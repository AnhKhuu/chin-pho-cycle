import { authMiddleware, redirectToSignIn } from '@clerk/nextjs';
import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your middleware
const intlMiddleware = createMiddleware({
  locales: ['en', 'vi'],
  defaultLocale: 'en',
});

export default authMiddleware({
  beforeAuth(req) {
    const url = req.nextUrl;
    const { pathname } = url;

    // Make sure API calls only come from in-app
    if (pathname.startsWith('/api/')) {
      if (
        !req.headers.get('referer')?.includes(process.env.APP_URL as string)
      ) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
      }
    }
    return intlMiddleware(req);
  },
  afterAuth(auth, req, _evt) {
    // Handle users who aren't authenticated
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }
  },
  publicRoutes: ['/', '/(.*)', '/vi', '/vi/(.*)', '/api/public/(.*)'],
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
