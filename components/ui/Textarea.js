export function Textarea({ error, className = '', ...props }) {
  return (
    <div className="w-full">
      <textarea
        className={`block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 dark:bg-gray-800 dark:text-white min-h-[100px] ${
          error
            ? 'ring-red-300 focus:ring-red-500 dark:ring-red-500/50'
            : 'ring-gray-300 placeholder:text-gray-400 focus:ring-blue-600 dark:ring-gray-700 dark:placeholder:text-gray-500'
        } ${className}`}
        {...props}
      />
      {error && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>}
    </div>
  );
}
