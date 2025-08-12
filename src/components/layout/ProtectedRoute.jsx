import React, { useEffect } from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

const ProtectedRoute = () => {
  const { isAuthenticated, loading, user } = useAuthStore();
  const location = useLocation();

  // Debug logging
  useEffect(() => {
    console.log('🛡️ ProtectedRoute Debug:', {
      isAuthenticated,
      loading,
      hasUser: !!user,
      userRole: user?.role,
      location: location.pathname,
      userKeys: user ? Object.keys(user) : []
    });
  });

  if (loading) {
    console.log('⏳ ProtectedRoute: Showing loading state');
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        <div>Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    console.log('❌ ProtectedRoute: User not authenticated, redirecting to login');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  console.log('✅ ProtectedRoute: User authenticated, rendering Outlet');
  return (
    <div>
      <div style={{ background: 'yellow', padding: '5px', margin: '5px' }}>
        ProtectedRoute Active - Outlet should render children below
      </div>
      <Outlet />
    </div>
  );
};

export default ProtectedRoute;
