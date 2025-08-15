import React from 'react';
import { Box, Typography, Chip } from '@mui/material';

const FeesTab = ({ learner }) => {
  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
        Fee Details
      </Typography>
      
      {/* Fees Table */}
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
          gridTemplateColumns: '2fr 1fr 1fr 1fr',
          backgroundColor: 'grey.50',
          borderBottom: '1px solid',
          borderColor: 'grey.200'
        }}>
          <Box sx={{ p: 2, fontWeight: 600, color: 'text.primary' }}>Course</Box>
          <Box sx={{ p: 2, fontWeight: 600, color: 'text.primary' }}>Status</Box>
          <Box sx={{ p: 2, fontWeight: 600, color: 'text.primary' }}>Due date</Box>
          <Box sx={{ p: 2, fontWeight: 600, color: 'text.primary' }}>Amount</Box>
        </Box>

        {/* Table Rows */}
        {learner.fees.map((fee) => (
          <Box 
            key={fee.id}
            sx={{ 
              display: 'grid', 
              gridTemplateColumns: '2fr 1fr 1fr 1fr',
              borderBottom: '1px solid',
              borderColor: 'grey.100',
              '&:last-child': { borderBottom: 'none' },
              '&:hover': { backgroundColor: 'grey.50' }
            }}
          >
            {/* Course Column */}
            <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                width: 40,
                height: 40,
                borderRadius: 1,
                backgroundColor: 'grey.100',
                fontSize: '20px'
              }}>
                {fee.courseName === 'Physics for Engineers' ? '📚' : '📐'}
              </Box>
              <Box>
                <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.primary' }}>
                  {fee.courseName}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {fee.courseName === 'Physics for Engineers' ? 'Physics' : 'Mathematics'}
                </Typography>
              </Box>
            </Box>

            {/* Status Column */}
            <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
              <Chip
                label={fee.status === 'paid' ? 'No dues' : 'Overdue'}
                size="small"
                color={fee.status === 'paid' ? 'success' : 'error'}
                sx={{ fontSize: '0.75rem' }}
              />
            </Box>

            {/* Due Date Column */}
            <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {fee.status === 'paid' ? '-' : fee.dueDate}
              </Typography>
            </Box>

            {/* Amount Column */}
            <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {fee.status === 'paid' ? '-' : `$${fee.amount.toLocaleString()}`}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default FeesTab;
