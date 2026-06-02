import Link from 'next/link';
import { Geist, Geist_Mono } from 'next/font/google';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function Home() {
  return (
    <div className={`flex flex-col items-center justify-center py-20 ${geistSans.className}`}>
      <main className="flex flex-col items-center justify-center w-full flex-1 px-4 text-center sm:px-20">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl text-gray-900 dark:text-white">
          Welcome to your <br className="hidden sm:block" />
          <span className="text-blue-600 dark:text-blue-500">Next.js Application</span>
        </h1>

        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
          Get started by editing{' '}
          <code className={`rounded-md bg-gray-100 p-1 text-sm dark:bg-gray-800 ${geistMono.className}`}>
            pages/index.js
          </code>
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/dashboard"
            className="rounded-full bg-blue-600 px-8 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors"
          >
            Go to Dashboard
          </Link>
          <a
            href="https://nextjs.org/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-white px-8 py-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-900 dark:text-white dark:ring-gray-700 dark:hover:bg-gray-800 transition-colors"
          >
            Read the Docs
          </a>
        </div>
      </main>
    </div>
  );
}
