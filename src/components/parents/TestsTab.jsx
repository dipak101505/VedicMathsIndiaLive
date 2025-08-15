import React from 'react';
import { Box, Typography } from '@mui/material';

const TestsTab = ({ learner }) => {
  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
        Test Results
      </Typography>
      
      {/* Tests Table */}
      <Box sx={{ 
        border: '1px solid', 
        borderColor: 'grey.200', 
        borderRadius: 1, 
        overflow: 'hidden',
        backgroundColor: 'white'
      }}>
        {/* Table Header */}
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: '2fr 1fr 1fr',
          backgroundColor: 'grey.50',
          borderBottom: '1px solid',
          borderColor: 'grey.200'
        }}>
          <Box sx={{ p: 2, fontWeight: 600, color: 'text.primary', textAlign: 'left' }}>Test name</Box>
          <Box sx={{ p: 2, fontWeight: 600, color: 'text.primary', textAlign: 'center' }}>Start date</Box>
          <Box sx={{ p: 2, fontWeight: 600, color: 'text.primary', textAlign: 'right' }}>Marks</Box>
        </Box>

        {/* Table Rows */}
        {learner.tests.map((test) => (
          <Box 
            key={test.id}
            sx={{ 
              display: 'grid', 
              gridTemplateColumns: '2fr 1fr 1fr',
              borderBottom: '1px solid',
              borderColor: 'grey.100',
              '&:last-child': { borderBottom: 'none' },
              '&:hover': { backgroundColor: 'grey.50' }
            }}
          >
            {/* Test Name Column */}
            <Box sx={{ p: 2, textAlign: 'left' }}>
              <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.primary', mb: 0.5 }}>
                {test.testName}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {test.courseName}
              </Typography>
            </Box>

            {/* Start Date Column */}
            <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {test.date || '-'}
              </Typography>
            </Box>

            {/* Marks Column */}
            <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
              <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 500 }}>
                {test.score ? `${test.score}/10` : '-'}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default TestsTab;
