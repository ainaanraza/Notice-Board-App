export function Button({ children, type = 'button', variant = 'primary', isLoading = false, className = '', disabled, ...props }) {
  const baseStyles = "inline-flex justify-center rounded-xl px-4 py-2.5 text-[0.875rem] font-semibold shadow-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-primary text-on-primary hover:bg-primary-container hover:text-on-primary-fixed",
    secondary: "bg-secondary-container text-on-secondary-container hover:bg-secondary transition-colors",
    danger: "bg-error text-on-error hover:bg-tertiary-container hover:text-tertiary transition-colors"
  };

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {isLoading ? (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : null}
      {children}
    </button>
  );
}
