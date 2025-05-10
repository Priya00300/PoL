import React from 'react';
import { AlertCircle, CheckCircle, Info, AlertTriangle, X } from 'lucide-react';

interface AlertProps {
  type: 'success' | 'error' | 'info' | 'warning';
  title?: string;
  message: string;
  onClose?: () => void;
}

const Alert: React.FC<AlertProps> = ({ type, title, message, onClose }) => {
  const baseClasses = 'flex items-start p-4 rounded mb-4';
  
  const typeClasses = {
    success: 'bg-green-50 text-success border border-green-200',
    error: 'bg-red-50 text-error border border-red-200',
    info: 'bg-blue-50 text-blue-700 border border-blue-200',
    warning: 'bg-yellow-50 text-warning border border-yellow-200',
  };
  
  const icons = {
    success: <CheckCircle size={20} />,
    error: <AlertCircle size={20} />,
    info: <Info size={20} />,
    warning: <AlertTriangle size={20} />,
  };

  return (
    <div className={`${baseClasses} ${typeClasses[type]}`}>
      <div className="flex-shrink-0 mr-3">
        {icons[type]}
      </div>
      <div className="flex-grow">
        {title && <h4 className="font-medium text-sm">{title}</h4>}
        <p className={`text-sm ${title ? 'mt-1' : ''}`}>{message}</p>
      </div>
      {onClose && (
        <button
          type="button"
          className="flex-shrink-0 ml-3 hover:opacity-70"
          onClick={onClose}
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
};

export default Alert;