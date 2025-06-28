import React, { useState } from 'react';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Dashboard from './components/Dashboard/Dashboard';
import { isAuthenticated } from './utils/tokenUtils';

function App() {
  const [showLogin, setShowLogin] = useState(true);

  // Check if user is properly authenticated (token exists AND is not expired)
  if (isAuthenticated()) {
    return <Dashboard />;
  }

  return (
    <div style={{ maxWidth: 400, margin: '40px auto' }}>
      {showLogin ? (
        <>
          <Login onLogin={() => window.location.reload()} />
          <p>Don't have an account? <button onClick={() => setShowLogin(false)}>Sign up</button></p>
        </>
      ) : (
        <>
          <Signup onSignup={() => setShowLogin(true)} />
          <p>Already have an account? <button onClick={() => setShowLogin(true)}>Login</button></p>
        </>
      )}
    </div>
  );
}

export default App;
