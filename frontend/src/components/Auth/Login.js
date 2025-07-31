import React, { useState } from 'react';
import { login } from '../../api/api';
import { storeTokens } from '../../utils/tokenUtils';
import './Signup.css';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const data = await login(email, password);
    if (data.token) {
      storeTokens(data.token, data.user);
      navigate('/blog');
    } else {
      setError(data.message || 'Login failed');
    }
  };

  return (
    <form className="signup-form" style={{ margin: 0 }} onSubmit={handleSubmit}>
      <h2 className="signup-title">Login</h2>
      <input className="signup-input" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
      <input className="signup-input" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
      <button className="signup-btn" type="submit">Login</button>
      {error && <div className="signup-error">{error}</div>}
    </form>
  );
} 