const API_BASE = process.env.REACT_APP_API_URL || '/api';

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
  let data;
  try {
    data = await res.json();
  } catch (e) {
    data = { message: 'Invalid server response', error: e.message };
  }
  return data;
};

// Add more API functions for blogs, etc. 