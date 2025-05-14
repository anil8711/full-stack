import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosConfig';
import { AuthContext } from '../context/AuthContext';

const Logout = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      try {
        await axiosInstance.get('/api/auth/logout'); // call to your backend logout
        logout(); // update context and localStorage
        navigate('/login'); // redirect to login page
      } catch (error) {
        console.error('Logout failed:', error);
      }
    };

    performLogout();
  }, [logout, navigate]);

  return (
    <div className="flex justify-center items-center h-screen">
      <p className="text-xl font-semibold">Logging out...</p>
    </div>
  );
};

export default Logout;
