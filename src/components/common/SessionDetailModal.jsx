import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Avatar,
  Chip,
  Divider,
  IconButton,
  Button,
  Grid,
  Modal
} from '@mui/material';
import {
  PlayArrow as PlayIcon,
  CheckCircle as CheckCircleIcon,
  Close as CloseIcon,
  MoreVert as MoreVertIcon,
  CreditCard as CreditCardIcon,
  People as PeopleIcon,
  Chat as ChatIcon
} from '@mui/icons-material';

const SessionDetailModal = ({ 
  open, 
  onClose, 
  session, 
  course 
}) => {
  if (!session || !course) return null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="session-detail-modal"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2
      }}
    >
      <Paper
        sx={{
          width: '100%',
          maxWidth: 600,
          maxHeight: '90vh',
          overflow: 'auto',
          p: 3,
          position: 'relative'
        }}
      >
        {/* Close Button */}
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 16,
            top: 16,
            color: 'text.secondary'
          }}
        >
          <CloseIcon />
        </IconButton>

        {/* Modal Header */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'text.primary', mb: 1 }}>
            {course.title}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {course.category}
          </Typography>
        </Box>

        <Box>
                  {/* Session Info and Action Buttons in Same Row */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <Box sx={{ 
            bgcolor: 'black', 
            color: 'white', 
            p: 1, 
            borderRadius: 1,
            textAlign: 'center',
            minWidth: 60
          }}>
            <Typography variant="caption" sx={{ display: 'block' }}>
              {session.date.split(' ')[0]}
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              {session.date.split(' ')[1]}
            </Typography>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1, color: 'black' }}>
              {session.title}
            </Typography>
            <Typography variant="body2" sx={{ mb: 1, color: 'black' }}>
              HOSTED BY {session.instructor}
            </Typography>
            <Typography variant="body2" sx={{ mb: 1, color: 'black' }}>
              {session.day}, {session.time} - {session.duration}
            </Typography>
            <Chip 
              icon={<CheckCircleIcon />}
              label="Completed" 
              color="success" 
              size="small"
            />
          </Box>
          {/* Action Buttons on the right side */}
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <Button
              variant="outlined"
              startIcon={<PlayIcon />}
              sx={{ 
                textTransform: 'none',
                color: 'black',
                borderColor: 'black',
                '&:hover': {
                  borderColor: 'black',
                  backgroundColor: 'rgba(0,0,0,0.04)'
                }
              }}
            >
              Play Recording
            </Button>
            <IconButton sx={{ color: 'black' }}>
              <MoreVertIcon />
            </IconButton>
          </Box>
        </Box>

          {/* Session Metrics */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {/* Credits Consumed */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <CreditCardIcon sx={{ color: 'black' }} />
              <Box>
                <Typography variant="caption" sx={{ display: 'block', color: 'black' }}>
                  CREDITS CONSUMED
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'black' }}>
                  2 credits
                </Typography>
              </Box>
            </Box>

            {/* Attendance */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <PeopleIcon sx={{ color: 'black' }} />
              <Box>
                <Typography variant="caption" sx={{ display: 'block', color: 'black' }}>
                  ATTENDANCE
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'black' }}>
                  57m • 95%
                </Typography>
              </Box>
            </Box>

            {/* Instructor Feedback */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <ChatIcon sx={{ color: 'black' }} />
              <Box>
                <Typography variant="caption" sx={{ display: 'block', color: 'black' }}>
                  INSTRUCTOR FEEDBACK
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'black' }}>
                  Comments
                </Typography>
                <Typography variant="body2" sx={{ color: 'black' }}>
                Very good discussion
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 'medium', mb: 1, color: 'black' }}>
                Topics covered
              </Typography>
              <Typography variant="body2" sx={{ color: 'black' }}>
                newton 3rd law
              </Typography>
              </Box>
            </Box>
          </Box>

        </Box>
      </Paper>
    </Modal>
  );
};

export default SessionDetailModal;
