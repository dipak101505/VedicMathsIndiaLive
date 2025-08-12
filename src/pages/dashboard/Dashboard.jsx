import React, { useEffect } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { useAuth } from '../../hooks/useAuth';
import { usePermissions } from '../../hooks/usePermissions';
import AdminDashboard from './AdminDashboard';
import StudentDashboard from './StudentDashboard';

const Dashboard = () => {
  console.log('🏠 Dashboard: Component function called');
  
  // All hooks must be called at the top level, before any conditional logic
  const { user, loading } = useAuth();
  const { isAdmin, isStudent, userRole } = usePermissions();

  console.log('🏠 Dashboard: Hooks called, state:', { user: !!user, loading, isAdmin, isStudent, userRole });

  // Component lifecycle debugging
  useEffect(() => {
    console.log('🏠 Dashboard component mounted');
    console.log('🏠 Initial auth state:', { user: !!user, loading, isAdmin, isStudent, userRole });
    
    return () => {
      console.log('🏠 Dashboard component unmounting');
    };
  }, [user, loading, isAdmin, isStudent, userRole]);

  // Show loading state while authentication is being determined
  if (loading) {
    console.log('⏳ Dashboard: Showing loading state');
    return (
      <Box sx={{ p: 3 }}>
        <div style={{ background: 'orange', padding: '10px', margin: '10px' }}>
          🏠 Dashboard Loading State Active
        </div>
        <Typography variant="h4">Loading Dashboard...</Typography>
        <CircularProgress />
      </Box>
    );
  }

  // Show error state if no user is found
  if (!user) {
    console.log('❌ Dashboard: No user found, showing error state');
    return (
      <Box sx={{ p: 3 }}>
        <div style={{ background: 'red', padding: '10px', margin: '10px' }}>
          🏠 Dashboard Error State Active
        </div>
        <Typography variant="h4" color="error">Authentication Error</Typography>
        <Typography>Unable to load user data. Please try logging in again.</Typography>
        <Typography variant="body2">Debug: user={JSON.stringify(user)}, loading={loading}</Typography>
      </Box>
    );
  }

  // Render role-specific dashboard
  if (isAdmin) {
    console.log('👑 Dashboard: Rendering AdminDashboard for role:', userRole);
    return (
      <div>
        <div style={{ background: 'purple', padding: '10px', margin: '10px' }}>
          🏠 Dashboard Admin State Active
        </div>
        <AdminDashboard />
      </div>
    );
  }

  if (isStudent) {
    console.log('🎓 Dashboard: Rendering StudentDashboard for role:', userRole);
    return (
      <div>
        <div style={{ background: 'green', padding: '10px', margin: '10px' }}>
          🏠 Dashboard Student State Active
        </div>
        <StudentDashboard />
      </div>
    );
  }

  // Fallback for other roles or unknown roles
  console.log('⚠️ Dashboard: Rendering fallback for unknown role:', userRole);
  return (
    <Box sx={{ p: 3 }}>
      <div style={{ background: 'gray', padding: '10px', margin: '10px' }}>
        🏠 Dashboard Fallback State Active
      </div>
      <Typography variant="h4">Welcome, {user?.displayName || 'User'}!</Typography>
      <Typography>Your role ({userRole || 'unknown'}) doesn't have a specific dashboard yet.</Typography>
      <Typography variant="body2">Debug: role={userRole}, user.role={user?.role}, isAdmin={isAdmin}, isStudent={isStudent}</Typography>
    </Box>
  );
};

export default Dashboard;
