import React from 'react';
import { LeaderboardTab } from '../courses/LeaderboardTab';
import { usePermissions } from '../../hooks/usePermissions';
import { Box, Alert, Typography, Button } from '@mui/material';
import { AdminPanelSettings as AdminIcon, Analytics as AnalyticsIcon } from '@mui/icons-material';

const AdminLeaderboard = ({ courseId, ...props }) => {
  const { isAdmin } = usePermissions();
  
  if (!isAdmin) {
    return (
      <Box sx={{ p: 2 }}>
        <Alert severity="error">
          Access Denied: Admin privileges required
        </Alert>
      </Box>
    );
  }
  
  // Admin-specific props and functionality
  const adminProps = {
    ...props,
    role: 'admin',
    showInstructorActions: true,
    canEdit: true,
    canViewAnalytics: true,
    showStudentDetails: true,
    enableGrading: true,
    showProgressInsights: true,
    canDelete: true,
    showSystemMetrics: true,
    enableDataExport: true
  };
  
  const handleViewAnalytics = () => {
    // TODO: Implement admin analytics view
    console.log('View admin analytics for course:', courseId);
  };
  
  const handleExportData = () => {
    // TODO: Implement data export functionality
    console.log('Export data for course:', courseId);
  };
  
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <AdminIcon color="primary" />
          <Typography variant="h6" component="h3">
            Course Leaderboard - Admin View
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            size="small"
            variant="outlined"
            startIcon={<AnalyticsIcon />}
            onClick={handleViewAnalytics}
          >
            View Analytics
          </Button>
          <Button
            size="small"
            variant="outlined"
            onClick={handleExportData}
          >
            Export Data
          </Button>
        </Box>
      </Box>
      
      <LeaderboardTab 
        courseId={courseId}
        {...adminProps}
      />
    </Box>
  );
};

export default AdminLeaderboard;
