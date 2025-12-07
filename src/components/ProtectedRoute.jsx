import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { apiCalls } from '../services/api';

const ProtectedRoute = ({ children, requiredRole = null }) => {
  const { user, loading, logout } = useContext(AuthContext);
  const [tokenValid, setTokenValid] = useState(null);

  useEffect(() => {
    const checkToken = async () => {
      if (!user) {
        setTokenValid(false);
        return;
      }

      try {
        await apiCalls.verifyToken();
        setTokenValid(true);
      } catch (err) {
        // Token invalid, logout user
        logout();
        setTokenValid(false);
      }
    };

    checkToken();
  }, [user, logout]);

  if (loading || tokenValid === null) {
    return <div className="loading">Verifying access...</div>;
  }

  if (!tokenValid || !user) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
