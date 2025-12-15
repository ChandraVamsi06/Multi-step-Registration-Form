import React from 'react';
import { cn } from '../../lib/utils';

// This component automatically shows the Label and Error Message
const Input = React.forwardRef(({ label, error, className, ...props }, ref) => {
  return (
    <div className="flex flex-col gap-1 mb-4">
      <label 
        htmlFor={props.id} 
        className="text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <input
        ref={ref}
        className={cn(
          "px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all",
          // If there is an error, turn the border RED
          error ? "border-red-500 focus:ring-red-500" : "border-gray-300",
          className
        )}
        // Accessibility: tells screen readers if the field is invalid
        aria-invalid={error ? "true" : "false"}
        {...props}
      />
      {error && (
        <span className="text-xs text-red-500 font-medium" role="alert">
          {error.message}
        </span>
      )}
    </div>
  );
});

Input.displayName = "Input";
export default Input;