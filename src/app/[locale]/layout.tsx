import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'vi' }];
}

export const metadata: Metadata = {
  title: 'Chin Pho Cycle',
  description: 'Official website of Chin Pho Cycle',
};

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: any;
}) {
  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    console.log('failed');
  }

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
          <NextIntlClientProvider locale={locale} messages={messages}>
            <Toaster />
            {children}
          </NextIntlClientProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
