import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import GooeyNav from './GooeyNav';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAdmin } = useAuth();

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'News', href: '/news' },
    { label: 'Procedure', href: '/procedure' },
    { label: 'Contact', href: '/contact' },
  ];

  if (isAdmin) {
    navItems.push({ label: 'Dashboard', href: '/dashboard' });
  } else {
    navItems.push({ label: 'Admin', href: '/admin' });
  }

  const activeIndex = navItems.findIndex(item => item.href === location.pathname);

  const handleNavItemClick = (item) => {
    navigate(item.href);
    setMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="logo-container">
        <Link to="/">
          <video autoPlay muted loop playsInline className="logo-video">
            <source src="assets/video/logo.mp4" type="video/mp4" />
          </video>
        </Link>
      </div>

      <div className="nav-controls">
        {/* Desktop Menu */}
        <div className="desktop-nav">
          <AnimatePresence>
            {menuOpen && (
              <motion.nav 
                initial={{ opacity: 0, x: 20, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.95 }}
                className="inline-menu"
              >
                <GooeyNav
                  items={navItems}
                  initialActiveIndex={activeIndex !== -1 ? activeIndex : 0}
                  onItemClick={handleNavItemClick}
                  particleCount={12}
                  animationTime={500}
                />
              </motion.nav>
            )}
          </AnimatePresence>
        </div>

        <button 
          className="menu-trigger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Drawer - Moved outside nav-controls for better click handling */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mobile-menu-overlay"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="mobile-menu-drawer"
            >
              <div className="mobile-menu-header">
                <button className="close-menu" onClick={() => setMenuOpen(false)}>
                  <X size={32} />
                </button>
              </div>
              <nav className="mobile-nav-links">
                {navItems.map((item, index) => (
                  <button 
                    key={index} 
                    className={`mobile-nav-link ${location.pathname === item.href ? 'active' : ''}`}
                    onClick={() => handleNavItemClick(item)}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
