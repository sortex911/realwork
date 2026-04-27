import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const [headerStyle, setHeaderStyle] = useState({ mixBlendMode: 'difference', color: 'var(--color-white)' });

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isOpen) {
      setHeaderStyle({ mixBlendMode: 'normal', color: 'var(--color-text)' });
    } else {
      const timer = setTimeout(() => {
        // Only pages with light background should have normal blend mode
        const lightPages = ['/contact', '/news'];
        if (lightPages.includes(location.pathname)) {
          setHeaderStyle({ mixBlendMode: 'normal', color: 'var(--color-text)' });
        } else {
          setHeaderStyle({ mixBlendMode: 'difference', color: 'var(--color-white)' });
        }
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [isOpen, location.pathname]);

  // Handle immediate style change on route change
  useEffect(() => {
    const lightPages = ['/contact', '/news'];
    if (lightPages.includes(location.pathname)) {
      setHeaderStyle({ mixBlendMode: 'normal', color: 'var(--color-text)' });
    } else {
      setHeaderStyle({ mixBlendMode: 'difference', color: 'var(--color-white)' });
    }
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header className="header" style={headerStyle}>
        <Link to="/" className="logo" style={location.pathname === '/contact' || location.pathname === '/news' ? {color: 'var(--color-text)'} : {}}>LNDSCP.</Link>
        <div className={`menu-toggle ${isOpen ? 'active' : ''}`} onClick={toggleMenu}>
          <span style={(location.pathname === '/contact' || location.pathname === '/news') && !isOpen ? {backgroundColor: 'var(--color-text)'} : {}}></span>
          <span style={(location.pathname === '/contact' || location.pathname === '/news') && !isOpen ? {backgroundColor: 'var(--color-text)'} : {}}></span>
          <span style={(location.pathname === '/contact' || location.pathname === '/news') && !isOpen ? {backgroundColor: 'var(--color-text)'} : {}}></span>
        </div>
      </header>

      <nav className={`fullscreen-menu ${isOpen ? 'active' : ''}`}>
        <ul className="menu-links">
          <li><Link to="/" onClick={() => setIsOpen(false)}>Home</Link></li>
          <li><Link to="/about" onClick={() => setIsOpen(false)}>About</Link></li>
          <li><Link to="/portfolio" onClick={() => setIsOpen(false)}>Portfolio</Link></li>
          <li><Link to="/news" onClick={() => setIsOpen(false)}>News</Link></li>
          <li><Link to="/contact" onClick={() => setIsOpen(false)}>Contact</Link></li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
