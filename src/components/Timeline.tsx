import React from 'react';
import { CheckCircle, XCircle, Circle } from 'lucide-react';

export interface TimelineItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  location: string;
  status: 'completed' | 'failed' | 'pending';
  verified: boolean;
}

interface TimelineProps {
  items: TimelineItem[];
}

const Timeline: React.FC<TimelineProps> = ({ items }) => {
  if (items.length === 0) {
    return (
      <div className="p-6 text-center text-text-secondary bg-gray-50 rounded">
        No timeline data available
      </div>
    );
  }

  return (
    <div className="relative">
      {items.map((item, index) => (
        <div key={item.id} className="flex mb-6 relative">
          {/* Vertical line that connects timeline items */}
          {index < items.length - 1 && (
            <div className="absolute top-6 left-4 w-px bg-gray-200 h-full"></div>
          )}
          
          {/* Status icon */}
          <div className="mr-4 z-10">
            {item.status === 'completed' ? (
              <CheckCircle size={28} className="text-success" />
            ) : item.status === 'failed' ? (
              <XCircle size={28} className="text-error" />
            ) : (
              <Circle size={28} className="text-gray-300" />
            )}
          </div>
          
          {/* Content */}
          <div className="flex-grow">
            <div className="flex justify-between items-start">
              <h3 className="font-medium text-text-primary">{item.title}</h3>
              <span className="text-xs text-text-secondary bg-gray-100 px-2 py-1 rounded">
                {item.timestamp}
              </span>
            </div>
            
            <p className="text-sm text-text-secondary mt-1">{item.description}</p>
            
            <div className="flex flex-wrap gap-x-4 mt-2 text-xs">
              <span className="flex items-center text-text-secondary">
                <span className="font-medium mr-1">Location:</span>
                {item.location}
              </span>
              <span className={`flex items-center ${
                item.verified ? 'text-success' : 'text-error'
              }`}>
                <span className="font-medium mr-1">Verified:</span>
                {item.verified ? 'Yes' : 'No'}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timeline;