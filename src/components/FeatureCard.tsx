import React from 'react';
import { Link } from 'react-router-dom';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  to: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon, to }) => {
  return (
    <Link to={to} className="block">
      <div className="h-full bg-white rounded border border-gray-100 p-6 shadow-sm hover:border-primary hover:shadow-md transition-all">
        <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-accent text-primary">
          {icon}
        </div>
        <h3 className="text-lg font-semibold mb-2 text-text-primary">{title}</h3>
        <p className="text-text-secondary">{description}</p>
      </div>
    </Link>
  );
};

export default FeatureCard;