import React from 'react';
import { ContentTab } from '../courses/ContentTab';
import { usePermissions } from '../../hooks/usePermissions';
import { Box, Alert, Typography } from '@mui/material';
import { Book as BookIcon } from '@mui/icons-material';

const StudentContentTab = ({ courseId, ...props }) => {
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
    canAddContent: false,
    canDeleteContent: false,
    canReorderContent: false,
    showContentAnalytics: false,
    enableContentManagement: false,
    showProgressTracking: true,
    enableContentDownload: true,
    showCompletionStatus: true
  };
  
  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <BookIcon color="primary" />
        <Typography variant="h6" component="h3">
          Course Content - Student View
        </Typography>
      </Box>
      
      <ContentTab 
        courseId={courseId}
        {...studentProps}
      />
    </Box>
  );
};

export default StudentContentTab;
