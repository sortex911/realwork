import { lazy, Suspense } from 'react';
import { HashRouter as Router, Routes, Route, Outlet, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import LoadingSpinner from './components/LoadingSpinner';

// ─── Lazy-loaded pages (route-level code splitting) ──────────────────────────
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const News = lazy(() => import('./pages/News'));
const Procedure = lazy(() => import('./pages/Procedure'));
const Contact = lazy(() => import('./pages/Contact'));
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));

import SmoothScroll from './components/SmoothScroll';
import ContentProtection from './components/ContentProtection';
import FadeUp from './components/FadeUp';
import ClientLogos from './components/ClientLogos';
import OptimizedImage from './components/OptimizedImage';

// ─── Public layout wrapper (Navbar + Footer) ─────────────────────────────────
// Uses <Outlet /> so nested public routes render inside it automatically.
// Admin routes are declared OUTSIDE this layout so they never get Navbar/Footer.
import { useMediaQuery } from './lib/hooks';

const PublicLayout = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isAbout = location.pathname === '/about';
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      
      {(isHome || isAbout) && (
        <div style={{ marginTop: isMobile ? '20px' : '80px' }}>
          <ClientLogos />
        </div>
      )}

      {isHome && (
        <FadeUp>
          <div className="landscape-banner">
            <OptimizedImage
              src="assets/home-images/imgland.webp"
              alt="Landscape Architecture"
              className="full-width-img"
              noBg={true}
            />
            <div className="landscape-banner-overlay">
              <h2 className="landscape-banner-title">
                Let's Celebrate<br />Landscape
              </h2>
            </div>
          </div>
        </FadeUp>
      )}

      <Footer />
    </>
  );
};
import { domAnimation, LazyMotion } from 'framer-motion';

// ─── App ─────────────────────────────────────────────────────────────────────
function App() {
  return (
    <AuthProvider>
      <LazyMotion features={domAnimation}>
        <SmoothScroll>
          <Router>
            <ScrollToTop />
            <ContentProtection />

            <Suspense fallback={<LoadingSpinner />}>
              <Routes>

                {/* ── Public pages (share Navbar + Footer via PublicLayout) ── */}
                <Route element={<PublicLayout />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/portfolio" element={<Portfolio />} />
                  <Route path="/news" element={<News />} />
                  <Route path="/procedure" element={<Procedure />} />
                  <Route path="/contact" element={<Contact />} />
                </Route>

                {/* ── Admin login — two aliases, no layout wrapper ── */}
                <Route path="/admin" element={<AdminLogin />} />
                <Route path="/control-panel-9x7k2-hidden" element={<AdminLogin />} />

                {/* ── Protected dashboard ── */}
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />

              </Routes>
            </Suspense>
          </Router>
        </SmoothScroll>
      </LazyMotion>
    </AuthProvider>
  );
}

export default App;
