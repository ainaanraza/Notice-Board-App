import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import NoticeForm from '../../components/NoticeForm';

export default function EditNotice() {
  const router = useRouter();
  const { id } = router.query;
  
  const [initialData, setInitialData] = useState(null);
  const [isLoadingData, setIsLoadingData] = useState(true);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    async function fetchNotice() {
      try {
        setIsLoadingData(true);
        // Since we didn't build a GET /api/notices/[id] endpoint,
        // we can fetch all and find it, or build it.
        // For production, a GET /api/notices/[id] should exist. 
        // We'll fetch all and filter since it's an MVP, but ideally, we should add GET [id].
        const res = await fetch('/api/notices');
        if (!res.ok) throw new Error('Failed to fetch notice');
        
        const notices = await res.json();
        const notice = notices.find(n => n.id === id);
        
        if (!notice) {
          throw new Error('Notice not found');
        }
        
        setInitialData(notice);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoadingData(false);
      }
    }
    
    fetchNotice();
  }, [id]);

  const handleSubmit = async (data) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const res = await fetch(`/api/notices/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to update notice');
      }

      router.push('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Edit Notice | Notice Board</title>
      </Head>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 w-full">
        {error && (
          <div className="mb-6 rounded-md bg-red-50 dark:bg-red-900/20 p-4 max-w-2xl mx-auto">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800 dark:text-red-200">Error</h3>
                <div className="mt-2 text-sm text-red-700 dark:text-red-300">
                  <p>{error}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {isLoadingData ? (
          <div className="flex justify-center items-center h-64">
             <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        ) : initialData ? (
          <NoticeForm initialData={initialData} onSubmit={handleSubmit} isLoading={isSubmitting} />
        ) : null}
      </div>
    </>
  );
}
