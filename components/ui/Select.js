export function Select({ options, error, className = '', ...props }) {
  return (
    <div className="w-full">
      <select
        className={`block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 dark:bg-gray-800 dark:text-white ${
          error
            ? 'ring-red-300 focus:ring-red-500 dark:ring-red-500/50'
            : 'ring-gray-300 focus:ring-blue-600 dark:ring-gray-700'
        } ${className}`}
        {...props}
      >
        <option value="" disabled>Select an option</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>}
    </div>
  );
}
