import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: '關於我們', path: '/about' },
    { label: '服務項目', path: '/services' },
    { label: '證書查詢', path: '/certificates' },
    { label: '教育訓練', path: '/education' },
    { label: '文件下載', path: '/downloads' },
    { label: '最新消息', path: '/news' },
    { label: '聯絡我們', path: '/contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center max-w-7xl py-3">
        {/* Logo Area */}
        <Link to="/" className="flex items-center gap-3 cursor-pointer shrink-0">
          <div className="h-14 w-14 bg-gray-200 rounded-lg border border-gray-300"></div>
          <div className="flex flex-col">
            <span className="text-magpie-primary font-bold text-xl leading-tight tracking-wide">藍鵲驗證</span>
            <span className="text-magpie-primary text-xs leading-none tracking-widest font-medium">MagpieCert</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path));
            return (
              <Link
                key={link.label}
                to={link.path}
                className={`font-bold text-base tracking-wide transition-colors border-b-2 pb-1 ${isActive ? 'text-magpie-primary border-magpie-primary' : 'text-magpie-dark hover:text-magpie-primary border-transparent hover:border-magpie-primary'}`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-magpie-primary hover:text-magpie-dark transition"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-xl py-4 px-6 flex flex-col space-y-4 border-t border-gray-100">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.label}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`font-bold border-b border-gray-100 pb-3 block ${isActive ? 'text-magpie-primary' : 'text-magpie-dark hover:text-magpie-primary'}`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
