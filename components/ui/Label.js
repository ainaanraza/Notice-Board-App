export function Label({ htmlFor, children, className = '', required }) {
  return (
    <label
      htmlFor={htmlFor}
      className={`block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100 ${className}`}
    >
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );
}
