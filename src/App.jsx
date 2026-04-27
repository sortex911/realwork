import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import ScrollToTop from './components/ScrollToTop';

import Home from './pages/Home';
import About from './pages/About';
import Portfolio from './pages/Portfolio';
import News from './pages/News';
import Contact from './pages/Contact';

import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <AuthProvider>
      <Router basename="/realwork">
        <ScrollToTop />
        <CustomCursor />

        <Routes>
          {/*
           * ── Hidden admin routes ──────────────────────────────────
           * These routes are completely invisible in the public UI.
           * Navbar and Footer are intentionally excluded here.
           */}
          <Route
            path="/control-panel-9x7k2-hidden"
            element={<AdminLogin />}
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/*
           * ── Public site ─────────────────────────────────────────
           * All public routes share Navbar + Footer.
           */}
          <Route
            path="*"
            element={
              <>
                <Navbar />
                <main>
                  <Routes>
                    <Route path="/"          element={<Home />} />
                    <Route path="/about"     element={<About />} />
                    <Route path="/portfolio" element={<Portfolio />} />
                    <Route path="/news"      element={<News />} />
                    <Route path="/contact"   element={<Contact />} />
                  </Routes>
                </main>
                <Footer />
              </>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
