// AuthContext.js
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = (token) => {
    // Store the token in a secure location (e.g., localStorage)
    localStorage.setItem('token', token);
    setIsLoggedIn(true);
  };

  const logout = () => {
    // Clear the token from the secure location
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  const verifyToken = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        // Make a request to the backend verify endpoint
        const response = await fetch('/api/verify-user/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        });
        if (response.ok) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error(error);
      setIsLoggedIn(false);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, verifyToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
export const useAuth = () => useContext(AuthContext);