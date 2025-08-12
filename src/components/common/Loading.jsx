import React from 'react';
import { Box, CircularProgress, Typography, Skeleton } from '@mui/material';
import { styled } from '@mui/material/styles';

const LoadingContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(3),
}));

const Loading = ({ 
  size = 'medium', 
  message = 'Loading...', 
  variant = 'spinner',
  fullScreen = false,
  ...props 
}) => {
  const sizeMap = {
    small: 24,
    medium: 40,
    large: 60,
  };

  const spinnerSize = sizeMap[size] || sizeMap.medium;

  if (fullScreen) {
    return (
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          zIndex: 9999,
        }}
      >
        <LoadingContainer>
          <CircularProgress size={spinnerSize} />
          {message && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              {message}
            </Typography>
          )}
        </LoadingContainer>
      </Box>
    );
  }

  if (variant === 'skeleton') {
    return (
      <Box sx={{ p: 2 }}>
        <Skeleton variant="text" width="60%" height={32} sx={{ mb: 1 }} />
        <Skeleton variant="rectangular" width="100%" height={120} sx={{ mb: 1 }} />
        <Skeleton variant="text" width="40%" />
        <Skeleton variant="text" width="80%" />
      </Box>
    );
  }

  return (
    <LoadingContainer {...props}>
      <CircularProgress size={spinnerSize} />
      {message && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          {message}
        </Typography>
      )}
    </LoadingContainer>
  );
};

export default Loading;
