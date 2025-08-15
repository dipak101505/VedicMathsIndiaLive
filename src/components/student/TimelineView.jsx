import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Avatar,
  Divider,
  Button
} from '@mui/material';

const TimelineView = ({ pastSessions }) => {
  return (
    <Box>
      {/* Greeting and Input Field */}
      <Paper sx={{ p: 3, mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Avatar sx={{ bgcolor: 'black', width: 48, height: 48, fontSize: '1.2rem' }}>
          O
        </Avatar>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'black', mb: 1 }}>
            Hello!
          </Typography>
          <Box
            sx={{
              p: 2,
              bgcolor: 'rgba(0,0,0,0.05)',
              borderRadius: 1,
              border: '1px solid rgba(0,0,0,0.1)',
              cursor: 'text'
            }}
          >
            <Typography variant="body2" sx={{ color: 'rgba(0,0,0,0.6)' }}>
              Share something
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* Session Timeline Cards */}
      {pastSessions.map((session, index) => (
        <Paper key={session.id} sx={{ p: 3, mb: 3 }}>
          {/* Session Title and Instructor */}
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'black', mb: 1 }}>
            {session.title}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Avatar sx={{ bgcolor: 'black', width: 32, height: 32, fontSize: '0.9rem' }}>
              {session.instructor.charAt(0)}
            </Avatar>
            <Typography variant="body1" sx={{ color: 'black' }}>
              {session.instructor}
            </Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Session Details */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1,
                color: 'rgba(0,0,0,0.6)'
              }}>
                <Box sx={{ 
                  width: 16, 
                  height: 16, 
                  bgcolor: 'rgba(0,0,0,0.6)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Box sx={{ 
                    width: 8, 
                    height: 8, 
                    bgcolor: 'white',
                    borderRadius: '50%'
                  }} />
                </Box>
                <Typography variant="body2" sx={{ color: 'rgba(0,0,0,0.6)' }}>
                  Session
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ color: 'rgba(0,0,0,0.6)' }}>
                {session.date} • {session.time}
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(0,0,0,0.6)' }}>
                {session.duration}
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(0,0,0,0.6)' }}>
                {session.participants} Present
              </Typography>
            </Box>
            
            {/* View Recording Button */}
            <Button
              variant="outlined"
              sx={{
                textTransform: 'none',
                color: 'black',
                borderColor: 'rgba(0,0,0,0.3)',
                bgcolor: 'rgba(0,0,0,0.05)',
                '&:hover': {
                  borderColor: 'black',
                  bgcolor: 'rgba(0,0,0,0.1)'
                }
              }}
            >
              View Recording
            </Button>
          </Box>
        </Paper>
      ))}

      {/* Load More Button */}
      <Box sx={{ textAlign: 'center', mt: 3 }}>
        <Button
          variant="outlined"
          sx={{
            textTransform: 'none',
            color: 'black',
            borderColor: 'rgba(0,0,0,0.3)',
            px: 4,
            py: 1.5,
            '&:hover': {
              borderColor: 'black',
              bgcolor: 'rgba(0,0,0,0.05)'
            }
          }}
        >
          Load More
        </Button>
      </Box>
    </Box>
  );
};

export default TimelineView;
