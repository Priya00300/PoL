import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-6 bg-white border-t">
      <div className="container mx-auto px-4 text-center text-text-secondary text-sm">
        <p>© {currentYear} Blockchain Logistics Security Platform. All rights reserved.</p>
        <p className="mt-1 text-xs">Academic Research Project</p>
      </div>
    </footer>
  );
};

export default Footer;