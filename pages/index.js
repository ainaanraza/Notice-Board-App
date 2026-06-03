import Link from 'next/link';
import Head from 'next/head';
import { Geist, Geist_Mono } from 'next/font/google';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

export default function Home() {
  return (
    <>
      <Head>
        <title>Notice Board | Centralize Your Updates</title>
      </Head>
      <div className={`min-h-[calc(100vh-4rem)] flex flex-col bg-background ${geistSans.className}`}>
        
        {/* Hero Section */}
        <div className="relative isolate pt-14">
          <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
            <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-br from-primary to-primary-container opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}></div>
          </div>
          
          <div className="py-24 sm:py-32 lg:pb-40">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-2xl text-center">
                <h1 className="text-[2.75rem] font-bold tracking-tight text-on-surface sm:text-6xl">
                  Centralize your organization's updates
                </h1>
                <p className="mt-6 text-[0.875rem] leading-[1.5] text-on-surface-variant max-w-xl mx-auto">
                  A modern, clean, and blazingly fast Notice Board. Categorize announcements, mark urgent items, and keep your entire team on the same page with ease.
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                  <Link
                    href="/dashboard"
                    className="rounded-full bg-primary px-8 py-3.5 text-[0.875rem] font-semibold text-on-primary shadow-[0_12px_40px_rgba(44,52,53,0.06)] hover:bg-primary-container hover:text-on-primary-fixed transition-all hover:-translate-y-1"
                  >
                    Go to Dashboard
                  </Link>
                  <Link href="/create" className="text-[0.875rem] font-semibold leading-6 text-on-surface hover:text-primary transition-colors">
                    Create a Notice <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
            <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-br from-primary to-primary-container opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}></div>
          </div>
        </div>

        {/* Feature Section */}
        <div className="py-24 sm:py-32 bg-surface-low mt-auto">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 className="text-[0.875rem] font-semibold leading-7 text-primary tracking-wide uppercase">Production Ready</h2>
              <p className="mt-2 text-[1.5rem] font-medium tracking-tight text-on-surface sm:text-4xl">
                Everything you need to communicate
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
              <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary-container shadow-[0_12px_40px_rgba(44,52,53,0.06)]">
                    <svg className="h-6 w-6 text-on-secondary-container" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                    </svg>
                  </div>
                  <dt className="text-lg font-semibold leading-7 text-on-surface">
                    Urgent Alerts
                  </dt>
                  <dd className="mt-1 flex flex-auto flex-col text-[0.875rem] leading-[1.5] text-on-surface-variant">
                    <p className="flex-auto">Mark critical notices as urgent. They'll automatically be pinned and highlighted in red.</p>
                  </dd>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-tertiary-container shadow-[0_12px_40px_rgba(44,52,53,0.06)]">
                    <svg className="h-6 w-6 text-tertiary" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
                    </svg>
                  </div>
                  <dt className="text-lg font-semibold leading-7 text-on-surface">
                    Categorization
                  </dt>
                  <dd className="mt-1 flex flex-auto flex-col text-[0.875rem] leading-[1.5] text-on-surface-variant">
                    <p className="flex-auto">Organize your updates into clear categories like Exams, Events, or General announcements.</p>
                  </dd>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-container shadow-[0_12px_40px_rgba(44,52,53,0.06)]">
                    <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <dt className="text-lg font-semibold leading-7 text-on-surface">
                    Future Publishing
                  </dt>
                  <dd className="mt-1 flex flex-auto flex-col text-[0.875rem] leading-[1.5] text-on-surface-variant">
                    <p className="flex-auto">Draft notices in advance and set precise publish dates to control when your audience sees them.</p>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
