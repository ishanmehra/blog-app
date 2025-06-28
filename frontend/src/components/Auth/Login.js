import React, { useState } from 'react';
import { login } from '../../api/api';
import { storeTokens } from '../../utils/tokenUtils';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const data = await login(email, password);
    if (data.token) {
      storeTokens(data.token, data.user);
      if (onLogin) onLogin();
    } else {
      setError(data.message || 'Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
      <button type="submit">Login</button>
      {error && <div style={{color: 'red'}}>{error}</div>}
    </form>
  );
} 