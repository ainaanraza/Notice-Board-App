export function Label({ htmlFor, children, className = '', required }) {
  return (
    <label
      htmlFor={htmlFor}
      className={`block text-[0.875rem] font-medium leading-6 text-on-surface-variant mb-2 ${className}`}
    >
      {children}
      {required && <span className="text-tertiary ml-1">*</span>}
    </label>
  );
}
