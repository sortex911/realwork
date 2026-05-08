import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MoreVertical, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import GooeyNav from './GooeyNav';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'News', href: '/news' },
    { label: 'Procedure', href: '/procedure' },
    { label: 'Contact', href: '/contact' },
  ];

  const activeIndex = navItems.findIndex(item => item.href === location.pathname);

  const handleNavItemClick = (item) => {
    navigate(item.href);
    setMenuOpen(false);
  };

  return (
    <header className="header">
      {/* Mobile 3-dot trigger on the left */}
      <button
        className="mobile-menu-trigger-left"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle Menu"
      >
        <MoreVertical size={28} />
      </button>

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
          <nav className="inline-menu">
            <GooeyNav
              items={navItems}
              initialActiveIndex={activeIndex !== -1 ? activeIndex : 0}
              onItemClick={handleNavItemClick}
              particleCount={12}
              animationTime={500}
            />
          </nav>
        </div>

        {/* Mobile Menu Drawer (Left Side) */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              key="mobile-drawer"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="mobile-menu-drawer-left"
            >
              <div className="mobile-menu-header">
                <button 
                  className="close-menu" 
                  onClick={(e) => {
                    e.stopPropagation();
                    setMenuOpen(false);
                  }}
                >
                  <X size={30} />
                </button>
              </div>
              <nav className="mobile-nav-links">
                {navItems.map((item, index) => (
                  <Link
                    key={index}
                    to={item.href}
                    className={`mobile-nav-link ${location.pathname === item.href ? 'active' : ''}`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Navbar;