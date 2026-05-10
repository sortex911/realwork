import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MoreVertical, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import GooeyNav from './GooeyNav';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

  // Close menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleNavItemClick = (item) => {
    navigate(item.href);
    setMobileMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="logo-container">
        <Link to="/">
          <video autoPlay muted loop playsInline className="logo-video">
            <source src="assets/logo/pre-comp-3.mov" type="video/quicktime" />
            <source src="assets/logo/pre-comp-3.mp4" type="video/mp4" />
          </video>
        </Link>
      </div>

      <div className="nav-controls">
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
    </header>
  );
};


export default Navbar;