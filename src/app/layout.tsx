import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from '@/components/common/Providers';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import ChatWidgetWrapper from '@/components/common/ChatWidgetWrapper';
import '@/app/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'NextCart – Modern E-Commerce Demo',
  description: 'NextCart is a modern e-commerce demo built with Next.js 15, Redux Toolkit and Tailwind CSS. Features include product filtering, cart, favorites, dark mode, animations, and responsive design.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/favicon/android-chrome-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="512x512"
          href="/favicon/android-chrome-512x512.png"
        />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="icon" href="/favicon/favicon.ico" />
      </head>
      <body className={inter.className}>
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
            <ChatWidgetWrapper />
          </div>
        </Providers>
      </body>
    </html>
  );
}
