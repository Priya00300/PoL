import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Database, Package, QrCode, Map, ClipboardCheck, Key, Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Home', path: '/', icon: <Database size={18} /> },
    { name: 'Create Package', path: '/create', icon: <Package size={18} /> },
    { name: 'Scan & Verify', path: '/scan', icon: <QrCode size={18} /> },
    { name: 'Track Logistics', path: '/track', icon: <Map size={18} /> },
    { name: 'Quality Check', path: '/quality', icon: <ClipboardCheck size={18} /> },
    { name: 'Manage Keys', path: '/keys', icon: <Key size={18} /> },
  ];

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <NavLink to="/" className="flex items-center space-x-2">
              <Database className="text-primary" size={24} />
              <span className="font-semibold text-lg text-primary">BlockLogistics</span>
            </NavLink>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-3 py-2 rounded text-sm font-medium ${
                    isActive
                      ? 'text-primary bg-accent'
                      : 'text-text-secondary hover:bg-gray-50'
                  }`
                }
              >
                <span className="mr-1.5">{item.icon}</span>
                {item.name}
              </NavLink>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-text-secondary hover:text-primary hover:bg-gray-100 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `flex items-center px-3 py-3 rounded text-sm font-medium ${
                    isActive
                      ? 'text-primary bg-accent'
                      : 'text-text-secondary hover:bg-gray-50'
                  }`
                }
              >
                <span className="mr-2">{item.icon}</span>
                {item.name}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;