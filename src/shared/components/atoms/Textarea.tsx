import React from 'react';

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  maxLength?: number;
  showCharacterCount?: boolean;
}

export function Textarea({
  label,
  error,
  helperText,
  maxLength,
  showCharacterCount = false,
  className = '',
  id,
  ...props
}: TextareaProps) {
  const textareaId =
    id || `textarea-${Math.random().toString(36).substr(2, 9)}`;
  const currentLength = props.value?.toString().length || 0;

  const baseClasses =
    'block w-full rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none';
  const stateClasses = error
    ? 'border-red-300 text-red-900 placeholder-red-300'
    : 'border-gray-300 text-gray-900 placeholder-gray-500 hover:border-gray-400';

  const textareaClasses = `${baseClasses} ${stateClasses} ${className}`;

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={textareaId}
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          {label}
        </label>
      )}

      <textarea
        id={textareaId}
        className={textareaClasses}
        maxLength={maxLength}
        {...props}
      />

      <div className="flex justify-between items-center mt-1">
        {error && <p className="text-sm text-red-600">{error}</p>}

        {helperText && !error && (
          <p className="text-sm text-gray-500">{helperText}</p>
        )}

        {showCharacterCount && maxLength && (
          <span
            className={`text-sm ${currentLength > maxLength * 0.9 ? 'text-orange-600' : 'text-gray-500'}`}
          >
            {currentLength}/{maxLength}
          </span>
        )}
      </div>
    </div>
  );
}
