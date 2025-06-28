// Token utility functions
const TOKEN_KEY = 'token';
const USER_KEY = 'user';

// Check if token is expired
export const isTokenExpired = (token) => {
  if (!token) return true;
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Date.now() / 1000;
    return payload.exp < currentTime;
  } catch (error) {
    console.error('Error parsing token:', error);
    return true;
  }
};

// Get stored token
export const getStoredToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

// Store tokens
export const storeTokens = (token, user = null) => {
  localStorage.setItem(TOKEN_KEY, token);
  if (user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }
};

// Clear all tokens and user data
export const clearTokens = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

// Get stored user
export const getStoredUser = () => {
  const user = localStorage.getItem(USER_KEY);
  return user ? JSON.parse(user) : null;
};

// Check if user is authenticated (token exists AND is not expired)
export const isAuthenticated = () => {
  const token = getStoredToken();
  return token && !isTokenExpired(token);
}; 