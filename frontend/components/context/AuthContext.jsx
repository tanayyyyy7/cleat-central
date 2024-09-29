import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
  };

  const logout = async () => {
    try {
      const response = await fetch('/api/user/logout', {
        method: 'POST',
        credentials: 'include',
      });
      if (response.ok) {
        setIsLoggedIn(false);
        setUser(null);
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const checkAuthStatus = async () => {
    try {
      const response = await fetch('/api/user/check-auth', { 
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        setIsLoggedIn(data.isAuthenticated);
        setUser(data.user);
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    } catch (error) {
      console.error('Auth check error:', error);
      setIsLoggedIn(false);
      setUser(null);
    }
  };

  const refreshTokens = async () => {
    try {
      const response = await fetch('/api/user/refresh-token', {
        method: 'POST',
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Token refresh failed');
      }
      console.log('Tokens refreshed successfully');
    } catch (error) {
      console.error('Token refresh error:', error);
      setIsLoggedIn(false);
      setUser(null);
    }
  };

  useEffect(() => {
    checkAuthStatus();

    if(isLoggedIn){
      //Every minute
      const authCheckInterval = setInterval(checkAuthStatus, 1 * 60 * 1000); // Check every 1 minute
    
      // every 45 secs
      const tokenRefreshInterval = setInterval(refreshTokens, 45 * 1000); // Refresh every 45 seconds

    return () => {
      clearInterval(authCheckInterval);
      clearInterval(tokenRefreshInterval);
    };
  }
  }, [isLoggedIn]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout, checkAuthStatus }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthProvider;