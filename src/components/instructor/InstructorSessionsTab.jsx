import React from 'react';
import { SessionsTab } from '../courses/SessionsTab';
import { usePermissions } from '../../hooks/usePermissions';
import { Box, Alert, Typography, Button } from '@mui/material';
import { Add as AddIcon, Schedule as ScheduleIcon } from '@mui/icons-material';

const InstructorSessionsTab = ({ courseId, ...props }) => {
  const { isInstructor } = usePermissions();
  
  if (!isInstructor) {
    return (
      <Box sx={{ p: 2 }}>
        <Alert severity="error">
          Access Denied: Instructor privileges required
        </Alert>
      </Box>
    );
  }
  
  // Instructor-specific props and functionality
  const instructorProps = {
    ...props,
    role: 'instructor',
    showInstructorActions: true,
    canEdit: true,
    canScheduleSessions: true,
    canCancelSessions: true,
    canViewStudentAttendance: true,
    showSessionAnalytics: true,
    enableSessionManagement: true
  };
  
  const handleScheduleSession = () => {
    // TODO: Implement schedule session functionality
    console.log('Schedule session for course:', courseId);
  };
  
  const handleViewAttendance = () => {
    // TODO: Implement view attendance functionality
    console.log('View attendance for course:', courseId);
  };
  
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" component="h3">
          Course Sessions - Instructor View
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            size="small"
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={handleScheduleSession}
          >
            Schedule Session
          </Button>
          <Button
            size="small"
            variant="outlined"
            startIcon={<ScheduleIcon />}
            onClick={handleViewAttendance}
          >
            View Attendance
          </Button>
        </Box>
      </Box>
      
      <SessionsTab 
        courseId={courseId}
        {...instructorProps}
      />
    </Box>
  );
};

export default InstructorSessionsTab;
