import { ClerkProvider } from '@clerk/nextjs';
import { NextSSRPlugin } from '@uploadthing/react/next-ssr-plugin';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import { extractRouterConfig } from 'uploadthing/server';

import { ourFileRouter } from './api/uploadthing/core';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Chin Pho Cycle',
  description: 'Official website of Chin Pho Cycle',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: 'black',
        },
      }}
    >
      <html lang='en'>
        <body className={`${inter.className} h-fit overflow-x-hidden`}>
          <NextSSRPlugin
            /**
             * The `extractRouterConfig` will extract **only** the route configs
             * from the router to prevent additional information from being
             * leaked to the client. The data passed to the client is the same
             * as if you were to fetch `/api/uploadthing` directly.
             */
            routerConfig={extractRouterConfig(ourFileRouter)}
          />
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
