import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Dashboard from './components/Dashboard/Dashboard';
import { isAuthenticated, clearTokens } from './utils/tokenUtils';

function SignupPage() {
  const navigate = useNavigate();
  if (isAuthenticated()) return <Navigate to="/blog" replace />;
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(120deg, #3a1c71 0%, #d76d77 50%, #ffaf7b 100%)' }}>
      <p style={{ textAlign: 'center', marginBottom: 0, color: '#fff', fontSize: '1.1rem', marginTop: 0 }}>
        Already have an account?{' '}
        <span
          style={{ color: '#ffaf7b', fontWeight: 600, cursor: 'pointer', textDecoration: 'underline' }}
          onClick={() => navigate('/login')}
        >
          Please Login
        </span>
      </p>
      <div style={{ borderRadius: 28, boxShadow: '0 4px 32px rgba(80, 60, 120, 0.12)', padding: '44px 36px', display: 'flex', flexDirection: 'column', minWidth: 350, maxWidth: 400, width: '100%', marginTop: 16 }}>
        <Signup onSignup={() => navigate('/blog')} />
      </div>
    </div>
  );
}

function LoginPage() {
  const navigate = useNavigate();
  if (isAuthenticated()) return <Navigate to="/blog" replace />;
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(120deg, #3a1c71 0%, #d76d77 50%, #ffaf7b 100%)' }}>
      <p style={{ textAlign: 'center', marginBottom: 0, color: '#fff', fontSize: '1.1rem', marginTop: 0 }}>
        Don&apos;t have an account?{' '}
        <span
          style={{ color: '#ffaf7b', fontWeight: 600, cursor: 'pointer', textDecoration: 'underline' }}
          onClick={() => navigate('/signup')}
        >
          Sign up
        </span>
      </p>
      <div style={{ borderRadius: 28, boxShadow: '0 4px 32px rgba(80, 60, 120, 0.12)', padding: '44px 36px', display: 'flex', flexDirection: 'column', minWidth: 350, maxWidth: 400, width: '100%', marginTop: 16 }}>
        <Login />
      </div>
    </div>
  );
}

function App() {
  const location = useLocation();
  useEffect(() => {
    const handleUnload = () => {
      clearTokens();
    };
    window.addEventListener('beforeunload', handleUnload);
    return () => {
      window.removeEventListener('beforeunload', handleUnload);
    };
  }, []);

  // Always redirect to /signup on first load unless already on /login or /signup
  if (location.pathname === '/') {
    return <Navigate to="/signup" replace />;
  }

  return (
    <Routes>
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/blog" element={isAuthenticated() ? <Dashboard /> : <Navigate to="/signup" replace />} />
      <Route path="*" element={<Navigate to="/signup" replace />} />
    </Routes>
  );
}

export default function AppWithRouter() {
  return (
    <Router>
      <App />
    </Router>
  );
}
