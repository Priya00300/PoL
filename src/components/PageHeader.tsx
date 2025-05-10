import React from 'react';

interface PageHeaderProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, description, icon }) => {
  return (
    <div className="mb-8">
      <div className="flex items-center mb-2">
        {icon && <span className="mr-3 text-primary">{icon}</span>}
        <h1 className="text-2xl font-bold text-text-primary">{title}</h1>
      </div>
      {description && (
        <p className="text-text-secondary">{description}</p>
      )}
      <div className="h-1 w-20 bg-primary mt-3"></div>
    </div>
  );
};

export default PageHeader;