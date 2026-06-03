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
    <form onSubmit={handleSubmit} className="space-y-8 bg-surface-lowest p-8 sm:p-10 rounded-2xl max-w-2xl w-full mx-auto">
      <div>
        <h2 className="text-[1.5rem] font-medium tracking-tight text-on-surface-variant">
          {isEditMode ? 'Edit Notice' : 'Create New Notice'}
        </h2>
        <p className="mt-2 text-[0.875rem] leading-[1.5] text-on-surface-variant">
          Fill out the fields below to {isEditMode ? 'update the' : 'publish a new'} notice.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 pt-2">
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

      <div className="mt-8 flex items-center justify-end gap-x-4 pt-6">
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
