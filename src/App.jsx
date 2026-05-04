import { HashRouter as Router, Routes, Route, Outlet, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

import Home from './pages/Home';
import About from './pages/About';
import Portfolio from './pages/Portfolio';
import News from './pages/News';
import Procedure from './pages/Procedure';
import Contact from './pages/Contact';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

import SmoothScroll from './components/SmoothScroll';
import ContentProtection from './components/ContentProtection';

// ─── Public layout wrapper (Navbar + Footer) ─────────────────────────────────
// Uses <Outlet /> so nested public routes render inside it automatically.
// Admin routes are declared OUTSIDE this layout so they never get Navbar/Footer.
const PublicLayout = () => (
  <>
    <Navbar />
    <main>
      <Outlet />
    </main>
    <Footer />
  </>
);

// ─── App ─────────────────────────────────────────────────────────────────────
function App() {
  return (
    <AuthProvider>
      <SmoothScroll>
        <Router>
          <ScrollToTop />
          <ContentProtection />
          

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
            {/* /admin  → easy shortcut shown in navbar                  */}
            {/* /control-panel-9x7k2-hidden → original hidden URL        */}
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
        </Router>
      </SmoothScroll>
    </AuthProvider>
  );
}

export default App;
