import { useToast } from '@/hooks/use-toast';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { toast } = useToast();

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

  //primary fn
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

  // Same fn but checks silently and updates state if gets Unauthorized 401
  const silentCheckAuthStatus = async () => {
    try {
      const response = await fetch('/api/user/check-auth', {
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        if (!data.isAuthenticated) {
          setIsLoggedIn(false);
          setUser(null);
        }
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An error occurred while checking authentication status. Please try again later.',
        variant: 'destructive',
        duration: 3000,
      });
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

    if (isLoggedIn) {
      //Every minute
      const authCheckInterval = setInterval(silentCheckAuthStatus, 1 * 60 * 1000);

      // every 45 secs
      const tokenRefreshInterval = setInterval(refreshTokens, 45 * 1000);

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