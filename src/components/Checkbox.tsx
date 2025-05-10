import React from 'react';
import { Check } from 'lucide-react';

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked,
  onChange,
  disabled = false,
}) => {
  return (
    <label className="flex items-center mb-2 cursor-pointer">
      <div className="relative flex items-center">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
          className="sr-only"
        />
        <div className={`w-5 h-5 border rounded flex items-center justify-center ${
          checked 
            ? 'bg-primary border-primary'
            : 'bg-white border-gray-300'
          } ${disabled ? 'opacity-50' : ''}`}
        >
          {checked && <Check size={14} className="text-white" />}
        </div>
      </div>
      <span className={`ml-2 text-sm ${disabled ? 'text-gray-400' : 'text-text-primary'}`}>
        {label}
      </span>
    </label>
  );
};

export default Checkbox;