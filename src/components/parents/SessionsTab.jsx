import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';

const SessionsTab = ({ learner }) => {
  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
        Session Details
      </Typography>
      
      {/* Summary Statistics Cards */}
      <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
        <Card elevation={1} sx={{ flex: 1 }}>
          <CardContent sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h4" sx={{ fontWeight: 600, color: 'primary.main', mb: 0.5 }}>
              4/6
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Attended Sessions
            </Typography>
          </CardContent>
        </Card>
        
        <Card elevation={1} sx={{ flex: 1 }}>
          <CardContent sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h4" sx={{ fontWeight: 600, color: 'success.main', mb: 0.5 }}>
              53%
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Average Attendance
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Sessions Table */}
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
          <Box sx={{ p: 2, fontWeight: 600, color: 'text.primary' }}>Session</Box>
          <Box sx={{ p: 2, fontWeight: 600, color: 'text.primary' }}>Date & time</Box>
          <Box sx={{ p: 2, fontWeight: 600, color: 'text.primary' }}>Attendance</Box>
        </Box>

        {/* Table Rows */}
        {learner.sessions.map((session) => (
          <Box 
            key={session.id}
            sx={{ 
              display: 'grid', 
              gridTemplateColumns: '2fr 1fr 1fr',
              borderBottom: '1px solid',
              borderColor: 'grey.100',
              '&:last-child': { borderBottom: 'none' },
              '&:hover': { backgroundColor: 'grey.50' }
            }}
          >
            {/* Session Column */}
            <Box sx={{ p: 2, display: 'flex', alignItems: 'flex-start', gap: 2 }}>
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: 50,
                height: 60,
                borderRadius: 1,
                backgroundColor: 'primary.main',
                color: 'white',
                fontSize: '12px',
                fontWeight: 600,
                flexShrink: 0
              }}>
                <Box sx={{ fontSize: '10px', lineHeight: 1 }}>AUG</Box>
                <Box sx={{ fontSize: '18px', lineHeight: 1, fontWeight: 700 }}>
                  {session.day}
                </Box>
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography variant="body1" sx={{ fontWeight: 600, color: 'text.primary', mb: 0.5 }}>
                  {session.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {session.courseName}, {session.courseType}
                </Typography>
              </Box>
            </Box>

            {/* Date & Time Column */}
            <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {session.time} • {session.duration}
              </Typography>
            </Box>

            {/* Attendance Column */}
            <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {session.attended ? `${session.attendedDuration} • ${session.attendancePercentage}%` : '-'}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default SessionsTab;
