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

        {/* Mobile Menu Drawer */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="mobile-menu-drawer"
            >
              <div className="mobile-menu-header">
                <button className="close-menu" onClick={() => setMenuOpen(false)}>
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

        <button
          className="menu-trigger"
          onClick={() => setMenuOpen(true)}
          aria-label="Open Menu"
          style={{ display: menuOpen ? 'none' : 'flex' }}
        >
          <Menu size={24} />
        </button>
      </div>
    </header>
  );
};

export default Navbar;
