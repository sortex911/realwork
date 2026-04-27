import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

/**
 * AuthContext — role-based access via Firestore users/{uid}
 *
 * Shape of users/{uid}:
 *   { email: string, role: "admin" | "viewer" | ... }
 *
 * To create the first admin:
 *   1. Firebase Console → Authentication → Add User
 *   2. Firestore → users collection → New document (ID = the user's UID)
 *      { email: "you@email.com", role: "admin" }
 */

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);       // Firebase Auth user
  const [role, setRole] = useState(null);        // Firestore role string
  const [loading, setLoading] = useState(true);  // true until both auth + role resolved

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        try {
          const snap = await getDoc(doc(db, 'users', firebaseUser.uid));
          setRole(snap.exists() ? (snap.data().role ?? null) : null);
        } catch {
          setRole(null);
        }
      } else {
        setUser(null);
        setRole(null);
      }
      setLoading(false);
    });
    return unsub;
  }, []);

  const isAdmin = role === 'admin';

  return (
    <AuthContext.Provider value={{ user, role, isAdmin, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
