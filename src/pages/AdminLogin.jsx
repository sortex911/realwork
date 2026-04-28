import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  getDocs,
  getDoc,
  query,
  orderBy
} from "firebase/firestore";
import { auth, db } from '../firebase';
import { useAuth } from '../context/AuthContext';

const AdminLogin = () => {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const [busy, setBusy]         = useState(false);
  const [showPw, setShowPw]     = useState(false);

  // Already authenticated → skip login
  useEffect(() => {
    if (!loading) {
      if (user && isAdmin)  navigate('/dashboard', { replace: true });
      else if (user && !isAdmin) navigate('/', { replace: true });
    }
  }, [user, isAdmin, loading, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setBusy(true);

    try {
      const cred = await signInWithEmailAndPassword(auth, email.trim(), password);
      const uid = cred.user.uid;

      // Fetch role from Firestore
      const snap = await getDoc(doc(db, 'users', uid));
      const role = snap.exists() ? snap.data().role : null;

      if (role === 'admin') {
        navigate('/dashboard', { replace: true });
      } else {
        // Log them out immediately — not an admin
        await auth.signOut();
        setError('Access denied. You do not have admin privileges.');
      }
    } catch (err) {
      const msg =
        err.code === 'auth/invalid-credential' ||
        err.code === 'auth/user-not-found'     ||
        err.code === 'auth/wrong-password'
          ? 'Invalid email or password.'
          : err.code === 'auth/too-many-requests'
          ? 'Too many attempts. Please wait a moment and try again.'
          : 'Sign-in failed. Please try again.';
      setError(msg);
    } finally {
      setBusy(false);
    }
  };

  if (loading) {
    return (
      <div className="auth-loading-screen">
        <div className="auth-spinner" />
      </div>
    );
  }

  return (
    <div className="admin-login-page">
      {/* Animated background blobs */}
      <div className="login-bg-blob login-bg-blob--1" />
      <div className="login-bg-blob login-bg-blob--2" />

      <div className="admin-login-card">
        {/* Header */}
        <div className="admin-login-header">
          <div className="admin-logo">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25
                   2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25
                   2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
          </div>
          <h1>Secure Access</h1>
          <p>Green Realm Landscape — Admin Portal</p>
        </div>

        {/* Form */}
        <form className="admin-login-form" onSubmit={handleLogin} autoComplete="on">
          <div className="admin-form-group">
            <label htmlFor="al-email">Email address</label>
            <div className="input-icon-wrap">
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
              </svg>
              <input
                id="al-email"
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                autoComplete="username"
              />
            </div>
          </div>

          <div className="admin-form-group">
            <label htmlFor="al-password">Password</label>
            <div className="input-icon-wrap">
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
              </svg>
              <input
                id="al-password"
                type={showPw ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                className="pw-toggle"
                onClick={() => setShowPw(v => !v)}
                tabIndex={-1}
                aria-label={showPw ? 'Hide password' : 'Show password'}
              >
                {showPw ? (
                  <svg viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd"/>
                    <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z"/>
                  </svg>
                ) : (
                  <svg viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                  </svg>
                )}
              </button>
            </div>
          </div>

          {error && (
            <div className="admin-error" role="alert">
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
              </svg>
              {error}
            </div>
          )}

          <button type="submit" className="admin-login-btn" disabled={busy}>
            {busy ? (
              <>
                <span className="btn-spinner" />
                Verifying…
              </>
            ) : 'Sign In'}
          </button>
        </form>

        <p className="login-footer-note">
          Restricted access. Unauthorized entry is prohibited.
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
