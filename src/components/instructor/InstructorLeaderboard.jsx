import React from 'react';
import { LeaderboardTab } from '../courses/LeaderboardTab';
import { usePermissions } from '../../hooks/usePermissions';
import { Box, Alert, Typography } from '@mui/material';
import { School as SchoolIcon } from '@mui/icons-material';

const InstructorLeaderboard = ({ courseId, ...props }) => {
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
    canViewAnalytics: true,
    showStudentDetails: true,
    enableGrading: true,
    showProgressInsights: true
  };
  
  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <SchoolIcon color="primary" />
        <Typography variant="h6" component="h3">
          Course Leaderboard - Instructor View
        </Typography>
      </Box>
      
      <LeaderboardTab 
        courseId={courseId}
        {...instructorProps}
      />
    </Box>
  );
};

export default InstructorLeaderboard;
