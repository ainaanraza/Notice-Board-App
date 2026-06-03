import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Modal } from '../components/ui/Modal';
import { toast } from 'react-hot-toast';

export default function Dashboard() {
  const router = useRouter();
  const [notices, setNotices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [noticeToDelete, setNoticeToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchNotices = async () => {
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
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const confirmDelete = (notice) => {
    setNoticeToDelete(notice);
    setDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (!noticeToDelete) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/notices/${noticeToDelete.id}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to delete notice');
      }
      
      setDeleteModalOpen(false);
      setNoticeToDelete(null);
      toast.success('Notice deleted successfully');
      
      // Refresh list
      fetchNotices();
    } catch (err) {
      toast.error(err.message || 'An unexpected error occurred');
    } finally {
      setIsDeleting(false);
    }
  };

  const getPriorityBadge = (priority) => {
    if (priority === 'URGENT') {
      return (
        <span className="inline-flex items-center rounded-full bg-tertiary-container px-3 py-1 text-xs font-semibold text-on-surface tracking-wide">
          Urgent
        </span>
      );
    }
    return (
      <span className="inline-flex items-center rounded-full bg-secondary-container px-3 py-1 text-xs font-medium text-on-secondary-container">
        Normal
      </span>
    );
  };

  const getCategoryBadge = (category) => {
    return (
      <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium bg-surface-low text-on-surface-variant">
        {category}
      </span>
    );
  };

  return (
    <>
      <Head>
        <title>Dashboard | Notice Board</title>
      </Head>

      <Modal
        isOpen={deleteModalOpen}
        onClose={() => !isDeleting && setDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Delete Notice"
        message={`Are you sure you want to delete "${noticeToDelete?.title}"? This action cannot be undone.`}
        confirmText="Delete"
        isLoading={isDeleting}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-[1.5rem] font-medium leading-8 tracking-tight text-on-surface-variant">Notice Board</h1>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <Link
              href="/create"
              className="block rounded-xl bg-primary px-5 py-3 text-center text-sm font-semibold text-on-primary hover:bg-primary-container hover:text-on-primary-fixed transition-colors"
            >
              Add Notice
            </Link>
          </div>
        </div>

        <div className="mt-8">
          {isLoading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="animate-pulse flex flex-col rounded-2xl bg-surface-lowest p-6 h-[280px]">
                  <div className="flex items-center gap-x-2 mb-4">
                    <div className="h-3 bg-surface-highest rounded-full w-24"></div>
                  </div>
                  <div className="h-6 bg-surface-highest rounded-md w-3/4 mb-4"></div>
                  <div className="space-y-3 flex-grow mt-2">
                    <div className="h-3 bg-surface-highest rounded-full w-full"></div>
                    <div className="h-3 bg-surface-highest rounded-full w-full"></div>
                    <div className="h-3 bg-surface-highest rounded-full w-4/5"></div>
                  </div>
                  <div className="mt-8 flex gap-3">
                    <div className="h-6 bg-surface-highest rounded-full w-16"></div>
                    <div className="h-6 bg-surface-highest rounded-full w-20"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="rounded-xl border border-red-200 bg-red-50 dark:bg-red-900/10 dark:border-red-900/50 p-6 flex items-start gap-4">
              <svg className="h-6 w-6 text-red-600 dark:text-red-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div>
                <h3 className="text-sm font-medium text-red-800 dark:text-red-400">Error loading notices</h3>
                <div className="mt-2 text-sm text-red-700 dark:text-red-300/80">
                  <p>{error}</p>
                </div>
                <button 
                  onClick={fetchNotices}
                  className="mt-4 text-sm font-medium text-red-600 hover:text-red-500 dark:text-red-400 dark:hover:text-red-300"
                >
                  Try again
                </button>
              </div>
            </div>
          ) : notices.length === 0 ? (
            <div className="text-center rounded-2xl bg-surface-lowest py-20 px-6">
              <div className="mx-auto h-24 w-24 bg-surface-low rounded-full flex items-center justify-center mb-6">
                <svg className="h-10 w-10 text-outline-variant" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="mt-2 text-[1.5rem] font-medium text-on-surface tracking-tight">No notices published</h3>
              <p className="mt-4 text-[0.875rem] leading-7 text-on-surface-variant max-w-sm mx-auto">Get started by creating a new notice to share updates with the organization.</p>
              <div className="mt-8">
                <Link
                  href="/create"
                  className="inline-flex items-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-on-primary hover:bg-primary-container hover:text-on-primary-fixed transition-colors"
                >
                  <svg className="mr-2 -ml-1 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  Create New Notice
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {notices.map((notice) => (
                <div
                  key={notice.id}
                  className="flex flex-col rounded-2xl bg-surface-lowest transition-all hover:-translate-y-1 overflow-hidden group relative"
                >
                  <div className="absolute top-4 right-4 flex opacity-0 group-hover:opacity-100 transition-opacity gap-2">
                    <button
                      onClick={() => router.push(`/edit/${notice.id}`)}
                      className="p-2 bg-surface-lowest text-on-surface-variant hover:text-primary rounded-xl shadow-[0_12px_40px_rgba(44,52,53,0.06)] hover:bg-surface-low transition-colors"
                      title="Edit"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => confirmDelete(notice)}
                      className="p-2 bg-surface-lowest text-on-surface-variant hover:text-error rounded-xl shadow-[0_12px_40px_rgba(44,52,53,0.06)] hover:bg-surface-low transition-colors"
                      title="Delete"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>

                  <div className="p-8 flex flex-col h-full">
                    <div className="flex items-center gap-x-2 text-xs mb-4">
                      <time dateTime={notice.publishDate} className="text-on-surface-variant tracking-wide font-medium">
                        {new Date(notice.publishDate).toLocaleDateString(undefined, {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        }).toUpperCase()}
                      </time>
                    </div>
                    <div className="flex items-start justify-between gap-x-4 pr-12">
                      <h3 className="text-lg font-semibold leading-7 text-on-surface line-clamp-2">
                        {notice.title}
                      </h3>
                    </div>
                    <p className="mt-4 text-[0.875rem] leading-7 text-on-surface-variant line-clamp-4 flex-grow">
                      {notice.body}
                    </p>
                    <div className="mt-8 flex items-center gap-x-3">
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
