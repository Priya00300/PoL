import React from 'react';

interface DataDisplayProps {
  label: string;
  value: string | number | React.ReactNode;
  className?: string;
  monospace?: boolean;
}

const DataDisplay: React.FC<DataDisplayProps> = ({
  label,
  value,
  className = '',
  monospace = false,
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      <div className="text-sm font-medium text-text-secondary mb-1">{label}</div>
      <div className={`p-3 bg-gray-50 rounded border border-gray-200 break-words ${
        monospace ? 'font-mono text-xs' : 'text-sm'
      }`}>
        {value || <span className="text-gray-400">Not available</span>}
      </div>
    </div>
  );
};

export default DataDisplay;