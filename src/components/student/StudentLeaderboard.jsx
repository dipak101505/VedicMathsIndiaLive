import React from 'react';
import { LeaderboardTab } from '../courses/LeaderboardTab';
import { usePermissions } from '../../hooks/usePermissions';
import { Box, Alert, Typography } from '@mui/material';
import { Person as PersonIcon } from '@mui/icons-material';

const StudentLeaderboard = ({ courseId, ...props }) => {
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
    canViewAnalytics: false,
    showStudentDetails: true,
    enableGrading: false,
    showProgressInsights: true,
    showPersonalRanking: true,
    showPeerComparison: true
  };
  
  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <PersonIcon color="primary" />
        <Typography variant="h6" component="h3">
          Course Leaderboard - Student View
        </Typography>
      </Box>
      
      <LeaderboardTab 
        courseId={courseId}
        {...studentProps}
      />
    </Box>
  );
};

export default StudentLeaderboard;
