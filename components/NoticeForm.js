import { useState } from 'react';
import { Input } from './ui/Input';
import { Textarea } from './ui/Textarea';
import { Select } from './ui/Select';
import { Button } from './ui/Button';
import { Label } from './ui/Label';

const CATEGORY_OPTIONS = [
  { label: 'General', value: 'GENERAL' },
  { label: 'Event', value: 'EVENT' },
  { label: 'Exam', value: 'EXAM' },
];

const PRIORITY_OPTIONS = [
  { label: 'Normal', value: 'NORMAL' },
  { label: 'Urgent', value: 'URGENT' },
];

export default function NoticeForm({ initialData, onSubmit, isLoading = false }) {
  const isEditMode = Boolean(initialData);

  // Use YYYY-MM-DD for date input type
  const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    const d = new Date(dateString);
    return isNaN(d) ? '' : d.toISOString().split('T')[0];
  };

  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    body: initialData?.body || '',
    category: initialData?.category || '',
    priority: initialData?.priority || 'NORMAL',
    publishDate: formatDateForInput(initialData?.publishDate) || formatDateForInput(new Date()),
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.body.trim()) newErrors.body = 'Body is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.priority) newErrors.priority = 'Priority is required';
    if (!formData.publishDate) newErrors.publishDate = 'Publish date is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Pass ISO string for the date
      onSubmit({
        ...formData,
        publishDate: new Date(formData.publishDate).toISOString()
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for the field when typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-xl shadow-sm ring-1 ring-gray-900/5 dark:ring-white/10 max-w-2xl w-full mx-auto">
      <div>
        <h2 className="text-xl font-semibold leading-7 text-gray-900 dark:text-white">
          {isEditMode ? 'Edit Notice' : 'Create New Notice'}
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-400">
          Fill out the fields below to {isEditMode ? 'update the' : 'publish a new'} notice.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6 border-t border-gray-900/10 dark:border-white/10 pt-6">
        <div className="sm:col-span-6 space-y-2">
          <Label htmlFor="title" required>Title</Label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            error={errors.title}
            placeholder="E.g. Final Exam Schedule 2026"
          />
        </div>

        <div className="sm:col-span-6 space-y-2">
          <Label htmlFor="body" required>Body</Label>
          <Textarea
            id="body"
            name="body"
            value={formData.body}
            onChange={handleChange}
            error={errors.body}
            placeholder="Write the details of the notice here..."
            rows={5}
          />
        </div>

        <div className="sm:col-span-3 space-y-2">
          <Label htmlFor="category" required>Category</Label>
          <Select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            options={CATEGORY_OPTIONS}
            error={errors.category}
          />
        </div>

        <div className="sm:col-span-3 space-y-2">
          <Label htmlFor="priority" required>Priority</Label>
          <Select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            options={PRIORITY_OPTIONS}
            error={errors.priority}
          />
        </div>

        <div className="sm:col-span-3 space-y-2">
          <Label htmlFor="publishDate" required>Publish Date</Label>
          <Input
            id="publishDate"
            name="publishDate"
            type="date"
            value={formData.publishDate}
            onChange={handleChange}
            error={errors.publishDate}
          />
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-4 border-t border-gray-900/10 dark:border-white/10 pt-6">
        <Button variant="secondary" type="button" onClick={() => window.history.back()} disabled={isLoading}>
          Cancel
        </Button>
        <Button variant="primary" type="submit" isLoading={isLoading}>
          {isEditMode ? 'Save Changes' : 'Publish Notice'}
        </Button>
      </div>
    </form>
  );
}
