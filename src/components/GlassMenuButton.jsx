import React, { useState, useRef, useEffect } from 'react';
import { Menu, Home, User, Briefcase, Newspaper, Mail, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const GlassMenuButton = ({
  items = [
    { label: 'Home', icon: <Home className="w-4 h-4" />, href: '/' },
    { label: 'About', icon: <User className="w-4 h-4" />, href: '/about' },
    { label: 'Portfolio', icon: <Briefcase className="w-4 h-4" />, href: '/portfolio' },
    { label: 'News', icon: <Newspaper className="w-4 h-4" />, href: '/news' },
    { label: 'Contact', icon: <Mail className="w-4 h-4" />, href: '/contact' },
  ],
  buttonLabel = 'Menu',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <div className="relative inline-block" ref={menuRef}>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative px-6 py-3 rounded-2xl bg-white/40 backdrop-blur-xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="relative flex items-center gap-2 text-[#0f1a15]">
          {isOpen ? (
            <X className="w-5 h-5 transition-transform duration-300" />
          ) : (
            <Menu className="w-5 h-5 transition-transform duration-300" />
          )}
          <span className="font-medium">{buttonLabel}</span>
        </div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute top-full mt-3 right-0 w-56 rounded-2xl bg-white/60 backdrop-blur-2xl border border-white/20 shadow-2xl overflow-hidden z-50"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/5 pointer-events-none" />
            
            <div className="relative p-2">
              {items.map((item, index) => (
                <motion.button
                  key={item.label}
                  className="w-full"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ x: 4 }}
                >
                  <Link
                    to={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group w-full ${
                      location.pathname === item.href 
                        ? 'bg-[#2c5545] text-white' 
                        : 'text-[#0f1a15] hover:bg-black/5'
                    }`}
                  >
                    <div className={`flex items-center justify-center w-8 h-8 rounded-lg transition-colors duration-200 ${
                      location.pathname === item.href 
                        ? 'bg-white/20' 
                        : 'bg-black/5 group-hover:bg-black/10'
                    }`}>
                      {item.icon}
                    </div>
                    <span className="font-medium text-sm">{item.label}</span>
                  </Link>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GlassMenuButton;
