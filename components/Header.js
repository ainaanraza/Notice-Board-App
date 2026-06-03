import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-surface-highest bg-surface/70 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-[1.5rem] font-medium tracking-tight text-on-surface">
              Notice Board
            </span>
          </Link>
        </div>
        <nav className="flex items-center space-x-6">
          <Link
            href="/"
            className="text-[0.875rem] font-medium text-on-surface-variant transition-colors hover:text-primary"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="text-[0.875rem] font-medium text-on-surface-variant transition-colors hover:text-primary"
          >
            About
          </Link>
          <Link
            href="/dashboard"
            className="rounded-full bg-primary px-5 py-2.5 text-[0.875rem] font-medium text-on-primary transition-colors hover:bg-primary-container hover:text-on-primary-fixed"
          >
            Dashboard
          </Link>
        </nav>
      </div>
    </header>
  );
}
