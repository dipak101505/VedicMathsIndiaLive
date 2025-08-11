import React from 'react';
import { Box, Container, Paper } from '@mui/material';
import LoginForm from '../../components/forms/LoginForm';

const LoginPage: React.FC = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'background.default',
        py: 4,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={3}
          sx={{
            borderRadius: 3,
            overflow: 'hidden',
          }}
        >
          <LoginForm />
        </Paper>
      </Container>
    </Box>
  );
};

export default LoginPage;
