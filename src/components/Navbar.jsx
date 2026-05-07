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

      <div className="nav-controls" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <AnimatePresence>
          {menuOpen && (
            <motion.nav 
              initial={{ opacity: 0, x: 20, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.95 }}
              className="inline-menu"
              style={{ position: 'relative' }}
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

        <button 
          className="menu-trigger"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'white',
            width: '45px',
            height: '45px',
            borderRadius: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            backdropFilter: 'blur(10px)',
            transition: 'all 0.3s ease',
            zIndex: 1000
          }}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  );
};

export default Navbar;
