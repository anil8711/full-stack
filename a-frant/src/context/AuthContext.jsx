import React, { createContext, useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosConfig';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const checkAuth = async () => {
    try {
      const res = await axiosInstance.get('/api/auth/check'); // Backend should verify token/cookie
      setUser(res.data.user);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      console.log('User authenticated:', res.data.user);
    } catch (error) {
      setUser(null);
      localStorage.removeItem('user');
      console.warn('User not authenticated');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    // Optionally, you can hit a logout endpoint
    // await axiosInstance.post('/api/auth/logout');
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, checkAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
