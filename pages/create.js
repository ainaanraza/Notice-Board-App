import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import NoticeForm from '../components/NoticeForm';
import { toast } from 'react-hot-toast';

export default function CreateNotice() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/notices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to create notice');
      }

      toast.success('Notice created successfully');
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
        <title>Create Notice | Notice Board</title>
      </Head>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 w-full">
        <NoticeForm onSubmit={handleSubmit} isLoading={isSubmitting} />
      </div>
    </>
  );
}
