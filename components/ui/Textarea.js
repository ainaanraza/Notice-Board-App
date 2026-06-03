export function Textarea({ error, className = '', ...props }) {
  return (
    <div className="w-full">
      <textarea
        className={`block w-full rounded-xl border-0 py-3 px-4 text-on-surface shadow-none bg-surface-highest transition-colors focus:bg-surface-lowest focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 min-h-[120px] ${
          error
            ? 'ring-2 ring-inset ring-error focus:ring-error'
            : 'ring-0 focus:ring-primary'
        } ${className}`}
        {...props}
      />
      {error && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>}
    </div>
  );
}
