import React, { useState } from 'react';
import { signup } from '../../api/api';
import './Signup.css';

export default function Signup({ onSignup }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!profileImage) {
      setError('Profile image is required');
      return;
    }
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    formData.append('profileImage', profileImage);
    const data = await signup(formData);
    if (data.message && data.message.toLowerCase().includes('success')) {
      if (onSignup) onSignup();
    } else {
      setError(data.message || 'Signup failed');
    }
  };

  return (
    <form className="signup-form" style={{ margin: 0 }} onSubmit={handleSubmit} encType="multipart/form-data">
      <h2 className="signup-title">Sign Up</h2>
      <input className="signup-input" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
      <input className="signup-input" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required minLength={8} />
      <input className="signup-input" type="file" accept="image/png, image/jpeg" onChange={e => setProfileImage(e.target.files[0])} required />
      <button className="signup-btn" type="submit">Sign Up</button>
      {error && <div className="signup-error">{error}</div>}
    </form>
  );
}