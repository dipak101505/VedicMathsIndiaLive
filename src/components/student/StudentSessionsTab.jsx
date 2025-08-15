import React from 'react';
import { SessionsTab } from '../courses/SessionsTab';
import { usePermissions } from '../../hooks/usePermissions';
import { Box, Alert, Typography } from '@mui/material';
import { Schedule as ScheduleIcon } from '@mui/icons-material';

const StudentSessionsTab = ({ courseId, ...props }) => {
  const { isStudent } = usePermissions();
  
  if (!isStudent) {
    return (
      <Box sx={{ p: 2 }}>
        <Alert severity="error">
          Access Denied: Student privileges required
        </Alert>
      </Box>
    );
  }
  
  // Student-specific props and functionality
  const studentProps = {
    ...props,
    role: 'student',
    showInstructorActions: false,
    canEdit: false,
    canScheduleSessions: false,
    canCancelSessions: false,
    canViewStudentAttendance: false,
    showSessionAnalytics: false,
    enableSessionManagement: false,
    showUpcomingSessions: true,
    enableSessionJoining: true,
    showSessionHistory: true,
    showAttendanceTracking: true
  };
  
  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <ScheduleIcon color="primary" />
        <Typography variant="h6" component="h3">
          Course Sessions - Student View
        </Typography>
      </Box>
      
      <SessionsTab 
        courseId={courseId}
        {...studentProps}
      />
    </Box>
  );
};

export default StudentSessionsTab;
