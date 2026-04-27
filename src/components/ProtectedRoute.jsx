import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * ProtectedRoute — guards admin-only pages.
 *
 * Loading  → show full-screen spinner (avoids flash-redirect)
 * No user  → /control-panel-9x7k2-hidden (login)
 * Not admin → /
 * Admin    → render children
 */
const ProtectedRoute = ({ children }) => {
  const { user, isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <div className="auth-loading-screen">
        <div className="auth-spinner" />
        <span>Verifying access…</span>
      </div>
    );
  }

  if (!user) return <Navigate to="/control-panel-9x7k2-hidden" replace />;
  if (!isAdmin) return <Navigate to="/" replace />;
  return children;
};

export default ProtectedRoute;
