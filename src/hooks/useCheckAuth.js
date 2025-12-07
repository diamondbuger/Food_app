import { useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { apiCalls } from '../services/api';

export const useCheckAuth = () => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();

  // Check token on route change
  useEffect(() => {
    const verifyToken = async () => {
      if (!user) return;

      try {
        await apiCalls.verifyToken();
      } catch (err) {
        console.log('Token verification failed');
        logout();
      }
    };

    verifyToken();
  }, [location.pathname, user, logout]);

  // Check token periodically
  useEffect(() => {
    if (!user) return;

    const interval = setInterval(async () => {
      try {
        await apiCalls.verifyToken();
      } catch (err) {
        console.log('Periodic token check failed');
        logout();
      }
    }, 5000); // Check every 5 seconds

    return () => clearInterval(interval);
  }, [user, logout]);
};
