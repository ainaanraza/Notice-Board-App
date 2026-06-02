import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-gray-800 dark:bg-gray-950/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              App Logo
            </span>
          </Link>
        </div>
        <nav className="flex items-center space-x-6">
          <Link
            href="/"
            className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
          >
            About
          </Link>
          <Link
            href="/dashboard"
            className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-200"
          >
            Dashboard
          </Link>
        </nav>
      </div>
    </header>
  );
}
