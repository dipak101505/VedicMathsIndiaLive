import React from 'react';
import { Box, Typography } from '@mui/material';

const CoursesTab = ({ learner }) => {
  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
        Course
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {learner.courses.map((course) => (
          <Box
            key={course.id}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 3,
              p: 2,
              border: '1px solid',
              borderColor: 'grey.200',
              borderRadius: 1,
              backgroundColor: 'white',
              '&:hover': {
                backgroundColor: 'grey.50',
                borderColor: 'grey.300',
                transition: 'all 0.2s ease-in-out'
              }
            }}
          >
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              width: 60,
              height: 60,
              borderRadius: 1,
              backgroundColor: 'grey.100',
              fontSize: '32px',
              flexShrink: 0
            }}>
              {course.thumbnail}
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary', mb: 0.5 }}>
                {course.name}
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                {course.type}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default CoursesTab;
