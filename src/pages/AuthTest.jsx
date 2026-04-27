import React, { useState } from 'react';
import { signup, login, saveData, logout } from '../authService';
import { auth } from '../firebase';

const AuthTest = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    setLoading(true);
    try {
      await signup(email, password);
      setMessage("Signup Successful!");
    } catch (error) {
      setMessage("Error: " + error.message);
    }
    setLoading(false);
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      await login(email, password);
      setMessage("Login Successful!");
    } catch (error) {
      setMessage("Error: " + error.message);
    }
    setLoading(false);
  };

  const handleSaveData = async () => {
    setLoading(true);
    try {
      const doc = await saveData("Abhishek");
      if (doc) {
        setMessage("Data Saved! ID: " + doc.id);
      }
    } catch (error) {
      setMessage("Error: " + error.message);
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '100px 20px', maxWidth: '400px', margin: '0 auto', color: '#fff' }}>
      <h2 style={{ marginBottom: '20px', color: '#4ade80' }}>Firebase Test</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: '10px', background: '#222', border: '1px solid #444', color: '#fff', borderRadius: '5px' }}
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: '10px', background: '#222', border: '1px solid #444', color: '#fff', borderRadius: '5px' }}
        />
        
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            onClick={handleSignup} 
            disabled={loading}
            style={{ flex: 1, padding: '10px', background: '#4ade80', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Signup
          </button>
          <button 
            onClick={handleLogin} 
            disabled={loading}
            style={{ flex: 1, padding: '10px', background: '#3b82f6', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', color: '#fff' }}
          >
            Login
          </button>
        </div>

        <button 
          onClick={handleSaveData} 
          disabled={loading}
          style={{ padding: '10px', background: '#f59e0b', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Test Database (Save Data)
        </button>

        {auth.currentUser && (
          <button 
            onClick={() => { logout(); setMessage("Logged out"); }}
            style={{ padding: '10px', background: '#ef4444', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Logout
          </button>
        )}

        {message && (
          <div style={{ marginTop: '20px', padding: '10px', background: '#333', borderRadius: '5px', fontSize: '14px' }}>
            {message}
          </div>
        )}

        {auth.currentUser && (
          <div style={{ marginTop: '10px', fontSize: '12px', color: '#888' }}>
            Logged in as: {auth.currentUser.email}
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthTest;
