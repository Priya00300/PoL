import React from 'react';

interface InputFieldProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  disabled?: boolean;
  className?: string;
  as?: 'input' | 'textarea';
  rows?: number;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder = '',
  required = false,
  error,
  disabled = false,
  className = '',
  as = 'input',
  rows = 3,
}) => {
  const inputClasses = `w-full px-3 py-2 bg-white border rounded focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-primary-light ${
    error ? 'border-error' : 'border-gray-300'
  } ${disabled ? 'bg-gray-100 text-gray-500' : ''}`;

  return (
    <div className={`mb-4 ${className}`}>
      <label className="block mb-1 text-sm font-medium text-text-primary">
        {label}
        {required && <span className="text-error ml-1">*</span>}
      </label>
      
      {as === 'textarea' ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          rows={rows}
          className={inputClasses}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className={inputClasses}
        />
      )}
      
      {error && <p className="mt-1 text-xs text-error">{error}</p>}
    </div>
  );
};

export default InputField;