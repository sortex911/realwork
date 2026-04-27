import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import Home from './pages/Home';
import About from './pages/About';
import Portfolio from './pages/Portfolio';
import News from './pages/News';
import Contact from './pages/Contact';
import ScrollToTop from './components/ScrollToTop';

import AuthTest from './pages/AuthTest';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <CustomCursor />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/news" element={<News />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/authtest" element={<AuthTest />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
