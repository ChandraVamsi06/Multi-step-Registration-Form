import React from 'react';
import { cn } from '../../lib/utils';

const Button = React.forwardRef(({ className, variant = 'primary', ...props }, ref) => {
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-sm",
    outline: "border-2 border-gray-300 text-gray-700 hover:bg-gray-50",
    ghost: "text-gray-500 hover:text-gray-700 hover:bg-gray-100",
  };

  return (
    <button
      ref={ref}
      className={cn(
        "px-4 py-2 rounded-md font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        className
      )}
      {...props}
    />
  );
});

Button.displayName = "Button";
export default Button;