import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import { Box, CircularProgress } from '@mui/material';

const ProtectedRoute = () => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Show a clean loader while verifying cookies
  if (loading) {
    return (
      <Box
        sx={{
          minHeight: '80vh',
          bgcolor: '#0B0F1A',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CircularProgress sx={{ color: '#FFC107' }} />
      </Box>
    );
  }

  // If no user/valid cookie is found, redirect to signin
  if (!user) {
    return <Navigate to='/signin' state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;