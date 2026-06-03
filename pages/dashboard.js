import { useEffect, useState } from 'react';
import Head from 'next/head';

export default function Dashboard() {
  const [notices, setNotices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchNotices() {
      try {
        setIsLoading(true);
        const res = await fetch('/api/notices');
        if (!res.ok) throw new Error('Failed to fetch notices');
        const data = await res.json();
        setNotices(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchNotices();
  }, []);

  const getPriorityBadge = (priority) => {
    if (priority === 'URGENT') {
      return (
        <span className="inline-flex items-center rounded-full bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10 dark:bg-red-400/10 dark:text-red-400 dark:ring-red-400/20">
          Urgent
        </span>
      );
    }
    return (
      <span className="inline-flex items-center rounded-full bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10 dark:bg-gray-400/10 dark:text-gray-400 dark:ring-gray-400/20">
        Normal
      </span>
    );
  };

  const getCategoryBadge = (category) => {
    const colors = {
      EXAM: 'bg-purple-50 text-purple-700 ring-purple-600/10 dark:bg-purple-400/10 dark:text-purple-400 dark:ring-purple-400/20',
      EVENT: 'bg-blue-50 text-blue-700 ring-blue-600/10 dark:bg-blue-400/10 dark:text-blue-400 dark:ring-blue-400/20',
      GENERAL: 'bg-green-50 text-green-700 ring-green-600/10 dark:bg-green-400/10 dark:text-green-400 dark:ring-green-400/20',
    };
    const style = colors[category] || colors.GENERAL;
    
    return (
      <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${style}`}>
        {category}
      </span>
    );
  };

  return (
    <>
      <Head>
        <title>Dashboard | Notice Board</title>
      </Head>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-2xl font-bold leading-6 text-gray-900 dark:text-white">Notice Board</h1>
            <p className="mt-2 text-sm text-gray-700 dark:text-gray-400">
              A list of all published notices across the organization.
            </p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <button
              type="button"
              className="block rounded-md bg-blue-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors"
            >
              Add Notice
            </button>
          </div>
        </div>

        <div className="mt-8">
          {isLoading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="animate-pulse flex flex-col rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 h-64">
                  <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/4 mb-4"></div>
                  <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-3/4 mb-4"></div>
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-5/6"></div>
                  </div>
                  <div className="mt-auto flex gap-2">
                    <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-16"></div>
                    <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-16"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="rounded-md bg-red-50 dark:bg-red-900/20 p-4">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800 dark:text-red-400">Error loading notices</h3>
                  <div className="mt-2 text-sm text-red-700 dark:text-red-300">
                    <p>{error}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : notices.length === 0 ? (
            <div className="text-center rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-700 p-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <h3 className="mt-2 text-sm font-semibold text-gray-900 dark:text-white">No notices</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Get started by creating a new notice.</p>
              <div className="mt-6">
                <button
                  type="button"
                  className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors"
                >
                  <svg className="-ml-0.5 mr-1.5 h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                  </svg>
                  New Notice
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {notices.map((notice) => (
                <div
                  key={notice.id}
                  className="flex flex-col rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm transition-all hover:shadow-md hover:border-blue-300 dark:hover:border-blue-900 overflow-hidden group"
                >
                  <div className="p-6 flex flex-col h-full">
                    <div className="flex items-center gap-x-2 text-xs mb-3">
                      <time dateTime={notice.publishDate} className="text-gray-500 dark:text-gray-400">
                        {new Date(notice.publishDate).toLocaleDateString(undefined, {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </time>
                    </div>
                    <div className="flex items-start justify-between gap-x-4">
                      <h3 className="text-lg font-semibold leading-6 text-gray-900 dark:text-white line-clamp-2">
                        {notice.title}
                      </h3>
                    </div>
                    <p className="mt-4 text-sm leading-6 text-gray-600 dark:text-gray-400 line-clamp-4 flex-grow">
                      {notice.body}
                    </p>
                    <div className="mt-6 flex items-center gap-x-2 border-t border-gray-100 dark:border-gray-800 pt-4">
                      {getPriorityBadge(notice.priority)}
                      {getCategoryBadge(notice.category)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
