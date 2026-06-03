import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import NoticeForm from '../../components/NoticeForm';
import { toast } from 'react-hot-toast';

export default function EditNotice() {
  const router = useRouter();
  const { id } = router.query;
  
  const [initialData, setInitialData] = useState(null);
  const [isLoadingData, setIsLoadingData] = useState(true);
  
  const [isSubmitting, setIsSubmitting] = useState(false);

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
        toast.error(err.message || 'Failed to fetch notice');
        router.push('/dashboard');
      } finally {
        setIsLoadingData(false);
      }
    }
    
    fetchNotice();
  }, [id]);

  const handleSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/notices/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to update notice');
      }

      toast.success('Notice updated successfully');
      router.push('/dashboard');
    } catch (err) {
      toast.error(err.message || 'An unexpected error occurred');
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
