import Header from './Header';
import { Geist, Geist_Mono } from 'next/font/google';
import Head from 'next/head';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function Layout({ children }) {
  return (
    <div className={`${geistSans.variable} ${geistMono.variable} min-h-screen font-sans bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-100 flex flex-col`}>
      <Head>
        <title>Next.js App</title>
        <meta name="description" content="A Next.js application setup with Prisma and Tailwind" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Header />
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 flex flex-col">
        {children}
      </main>
      <footer className="w-full border-t border-gray-200 py-6 text-center text-sm text-gray-500 dark:border-gray-800 dark:text-gray-400">
        &copy; {new Date().getFullYear()} Next.js App. All rights reserved.
      </footer>
    </div>
  );
}
