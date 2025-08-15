import React from 'react';
import { Box, Typography, Grid, Alert } from '@mui/material';
import CourseCard from './CourseCard';
import Loading from '../common/Loading';

const CourseList = ({ 
  courses, 
  loading, 
  error,
  role, 
  onCourseClick, 
  onCourseEdit,
  onCourseDelete,
  viewMode = 'grid', // 'grid' or 'list'
  emptyMessage = 'No courses found',
  emptySubMessage = 'Get started by creating your first course'
}) => {
  if (loading) {
    return <Loading />;
  }
  
  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        Error loading courses: {error}
      </Alert>
    );
  }
  
  if (!courses?.length) {
    return (
      <Box sx={{ 
        textAlign: 'center', 
        py: 6,
        px: 2,
        backgroundColor: 'background.paper',
        borderRadius: 2,
        border: '1px dashed',
        borderColor: 'divider'
      }}>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          {emptyMessage}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {emptySubMessage}
        </Typography>
      </Box>
    );
  }
  
  const renderGrid = () => (
    <Grid container spacing={3}>
      {courses.map(course => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={course.id}>
          <CourseCard
            course={course}
            role={role}
            onCourseClick={onCourseClick}
            onCourseEdit={onCourseEdit}
            onCourseDelete={onCourseDelete}
            compact={false}
          />
        </Grid>
      ))}
    </Grid>
  );
  
  const renderList = () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {courses.map(course => (
        <CourseCard
          key={course.id}
          course={course}
          role={role}
          onCourseClick={onCourseClick}
          onCourseEdit={onCourseEdit}
          onCourseDelete={onCourseDelete}
          compact={true}
        />
      ))}
    </Box>
  );
  
  return (
    <Box>
      {viewMode === 'grid' ? renderGrid() : renderList()}
      
      {courses.length > 0 && (
        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Showing {courses.length} course{courses.length !== 1 ? 's' : ''}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default CourseList;
