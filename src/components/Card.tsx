import React from 'react';

interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ title, children, className = '' }) => {
  return (
    <div className={`bg-white rounded shadow-sm border border-gray-100 ${className}`}>
      {title && (
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-text-primary">{title}</h2>
        </div>
      )}
      <div className="p-6">{children}</div>
    </div>
  );
};

export default Card;