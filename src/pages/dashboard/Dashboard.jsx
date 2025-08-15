import React, { useState } from 'react';
import { Box, Typography, CircularProgress, Button, ButtonGroup, Alert } from '@mui/material';
import { useAuth } from '../../hooks/useAuth';
import { usePermissions } from '../../hooks/usePermissions';
import AdminDashboard from './AdminDashboard';
import StudentDashboard from './StudentDashboard';
import InstructorDashboard from './InstructorDashboard';

const Dashboard = () => {
  const [demoRole, setDemoRole] = useState(() => {
    // Initialize from localStorage if available
    try {
      return localStorage.getItem('demoRole');
    } catch {
      return null;
    }
  });
  
  const { user, loading } = useAuth();
  const { isAdmin, isStudent, isInstructor, userRole } = usePermissions();

  // Show loading state while authentication is being determined
  if (loading) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h4">Loading Dashboard...</Typography>
        <CircularProgress />
      </Box>
    );
  }

  // Show error state if no user is found
  if (!user) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" color="error">Authentication Error</Typography>
        <Typography>Unable to load user data. Please try logging in again.</Typography>
      </Box>
    );
  }

  // Demo role switcher for testing
  const handleRoleSwitch = (role) => {
    console.log('🔧 Dashboard: Switching to demo role:', role);
    setDemoRole(role);
    
    // Store in localStorage for the Sidebar to access
    try {
      if (role) {
        localStorage.setItem('demoRole', role);
        console.log('🔧 Dashboard: Saved role to localStorage:', role);
      } else {
        localStorage.removeItem('demoRole');
        console.log('🔧 Dashboard: Removed role from localStorage');
      }
    } catch (error) {
      console.warn('⚠️ Dashboard: Could not save demo role to localStorage:', error);
    }
    
    // Dispatch custom event to notify Sidebar of role change
    const event = new CustomEvent('demoRoleChanged', { detail: { role } });
    window.dispatchEvent(event);
    console.log('🔧 Dashboard: Dispatched demoRoleChanged event with role:', role);
    
    // In a real app, you would update the user's role in the backend
    console.log(`✅ Dashboard: Successfully switched to demo role: ${role}`);
  };

  // Determine which role to display (demo role takes precedence for testing)
  const effectiveRole = demoRole || userRole;
  const isDemoAdmin = demoRole === 'admin';
  const isDemoStudent = demoRole === 'student';
  const isDemoInstructor = demoRole === 'instructor';
  const isDemoParent = demoRole === 'parent';

  return (
    <Box sx={{ p: 3 }}>
      {/* Demo Role Switcher */}
      <Alert severity="info" sx={{ mb: 3 }}>
        <Typography variant="body2" gutterBottom>
          <strong>Demo Mode:</strong> Use the role switcher below to test different sidebar layouts.
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          Current effective role: <strong>{effectiveRole || 'unknown'}</strong>
        </Typography>
        <ButtonGroup variant="outlined" size="small">
          <Button 
            onClick={() => handleRoleSwitch('student')}
            variant={isDemoStudent ? 'contained' : 'outlined'}
          >
            Student
          </Button>
          <Button 
            onClick={() => handleRoleSwitch('parent')}
            variant={isDemoParent ? 'contained' : 'outlined'}
          >
            Parent
          </Button>
          <Button 
            onClick={() => handleRoleSwitch('instructor')}
            variant={isDemoInstructor ? 'contained' : 'outlined'}
          >
            Instructor
          </Button>
          <Button 
            onClick={() => handleRoleSwitch('admin')}
            variant={isDemoAdmin ? 'contained' : 'outlined'}
          >
            Admin
          </Button>
          <Button 
            onClick={() => handleRoleSwitch(null)}
            variant={demoRole === null ? 'contained' : 'outlined'}
          >
            Real Role
          </Button>
        </ButtonGroup>
      </Alert>

      {/* Render role-specific dashboard */}
      {isDemoAdmin || (isAdmin && !demoRole) ? (
        <Box>
          <Typography variant="h4">Admin Dashboard</Typography>
          <Typography variant="h6" color="primary" sx={{ mt: 2, mb: 1 }}>
            Welcome to the Admin Portal
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Manage the entire Bright Future Academy platform, from courses to business operations.
          </Typography>
          
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Platform Overview:
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Box sx={{ 
                p: 2, 
                border: '1px solid', 
                borderColor: 'divider', 
                borderRadius: 2,
                minWidth: 200
              }}>
                <Typography variant="subtitle1" fontWeight="bold">Courses</Typography>
                <Typography variant="body2" color="text.secondary">1:1, Group, and Recorded courses</Typography>
              </Box>
              <Box sx={{ 
                p: 2, 
                border: '1px solid', 
                borderColor: 'divider', 
                borderRadius: 2,
                minWidth: 200
              }}>
                <Typography variant="subtitle1" fontWeight="bold">People</Typography>
                <Typography variant="body2" color="text.secondary">Instructors and Learners management</Typography>
              </Box>
              <Box sx={{ 
                p: 2, 
                border: '1px solid', 
                borderColor: 'divider', 
                borderRadius: 2,
                minWidth: 200
              }}>
                <Typography variant="subtitle1" fontWeight="bold">Business</Typography>
                <Typography variant="body2" color="text.secondary">Store, Analytics, and Finance</Typography>
              </Box>
              <Box sx={{ 
                p: 2, 
                border: '1px solid', 
                borderColor: 'divider', 
                borderRadius: 2,
                minWidth: 200
              }}>
                <Typography variant="subtitle1" fontWeight="bold">System</Typography>
                <Typography variant="body2" color="text.secondary">Settings and Notifications</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      ) : isDemoStudent || (isStudent && !demoRole) ? (
        <StudentDashboard />
      ) : isDemoInstructor || (isInstructor && !demoRole) ? (
        <InstructorDashboard />
      ) : isDemoParent ? (
        <Box>
          <Typography variant="h4">Parent Dashboard</Typography>
          <Typography variant="h6" color="primary" sx={{ mt: 2, mb: 1 }}>
            Welcome to the Parent Portal
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Manage your children's education and track their progress at Bright Future Academy.
          </Typography>
          
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Your Learners:
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Box sx={{ 
                p: 2, 
                border: '1px solid', 
                borderColor: 'divider', 
                borderRadius: 2,
                minWidth: 200
              }}>
                <Typography variant="subtitle1" fontWeight="bold">Liam Smith</Typography>
                <Typography variant="body2" color="text.secondary">Grade 8</Typography>
                <Typography variant="body2" color="text.secondary">Progress: 75%</Typography>
              </Box>
              <Box sx={{ 
                p: 2, 
                border: '1px solid', 
                borderColor: 'divider', 
                borderRadius: 2,
                minWidth: 200
              }}>
                <Typography variant="subtitle1" fontWeight="bold">Emma Williams</Typography>
                <Typography variant="body2" color="text.secondary">Grade 6</Typography>
                <Typography variant="body2" color="text.secondary">Progress: 90%</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      ) : (
        // Fallback for other roles or unknown roles
        <Box>
          <Typography variant="h4">Welcome, {user?.displayName || 'User'}!</Typography>
          <Typography>Your role ({effectiveRole || 'unknown'}) doesn't have a specific dashboard yet.</Typography>
          <Typography variant="body2" sx={{ mt: 2 }}>
            Use the role switcher above to test different dashboard layouts.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Dashboard;
