import React from 'react';

const Input = ({ 
  label, 
  error, 
  className = '', 
  containerClassName = '',
  ...props 
}) => {
  return (
    <div className={`flex flex-col gap-1.5 ${containerClassName}`}>
      {label && (
        <label className="text-sm font-medium text-text">
          {label}
        </label>
      )}
      <input
        className={`
          w-full px-4 py-2.5 rounded-lg border-2 
          ${error ? 'border-red-500' : 'border-border'} 
          bg-background text-text
          focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary
          transition-all duration-200
          placeholder:text-text-light/50
          ${className}
        `}
        {...props}
      />
      {error && (
        <span className="text-sm text-red-500">{error}</span>
      )}
    </div>
  );
};

export default Input;
