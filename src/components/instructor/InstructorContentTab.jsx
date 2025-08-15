import React from 'react';
import { ContentTab } from '../courses/ContentTab';
import { usePermissions } from '../../hooks/usePermissions';
import { Box, Alert, Typography, Button } from '@mui/material';
import { Add as AddIcon, Edit as EditIcon } from '@mui/icons-material';

const InstructorContentTab = ({ courseId, ...props }) => {
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
    canAddContent: true,
    canDeleteContent: true,
    canReorderContent: true,
    showContentAnalytics: true,
    enableContentManagement: true
  };
  
  const handleAddContent = () => {
    // TODO: Implement add content functionality
    console.log('Add content for course:', courseId);
  };
  
  const handleEditContent = () => {
    // TODO: Implement edit content functionality
    console.log('Edit content for course:', courseId);
  };
  
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" component="h3">
          Course Content - Instructor View
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            size="small"
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={handleAddContent}
          >
            Add Content
          </Button>
          <Button
            size="small"
            variant="outlined"
            startIcon={<EditIcon />}
            onClick={handleEditContent}
          >
            Edit Content
          </Button>
        </Box>
      </Box>
      
      <ContentTab 
        courseId={courseId}
        {...instructorProps}
      />
    </Box>
  );
};

export default InstructorContentTab;
