import React from 'react';
import { Box, CircularProgress, Typography, Fade } from '@mui/material';

const Loading = ({ 
  message = 'Loading...', 
  size = 'large',
  fullScreen = false,
  showMessage = true,
  className,
  sx 
}) => {
  const progressSize = size === 'small' ? 24 : size === 'medium' ? 40 : 60;
  
  const content = (
    <Box
      className={className}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        ...sx
      }}
    >
      <Fade in={true} style={{ transitionDelay: '200ms' }}>
        <CircularProgress 
          size={progressSize} 
          thickness={4}
          sx={{
            color: 'primary.main',
            '& .MuiCircularProgress-circle': {
              strokeLinecap: 'round',
            }
          }}
        />
      </Fade>
      
      {showMessage && (
        <Fade in={true} style={{ transitionDelay: '400ms' }}>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              textAlign: 'center',
              fontWeight: 500,
              letterSpacing: '0.5px'
            }}
          >
            {message}
          </Typography>
        </Fade>
      )}
    </Box>
  );
  
  if (fullScreen) {
    return (
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'background.default',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {content}
      </Box>
    );
  }
  
  return content;
};

export default Loading;
