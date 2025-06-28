const API_BASE = '/api';

export const signup = async (formData) => {
  const res = await fetch(`${API_BASE}/auth/signup`, {
    method: 'POST',
    body: formData
  });
  return res.json();
};

export const login = async (email, password) => {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  return res.json();
};

// Add more API functions for blogs, etc. 