import React from 'react';
import { Box, Container, Paper } from '@mui/material';
import RegistrationForm from '../../components/forms/RegistrationForm';

const RegisterPage: React.FC = () => {
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
      <Container maxWidth="md">
        <Paper
          elevation={3}
          sx={{
            borderRadius: 3,
            overflow: 'hidden',
          }}
        >
          <RegistrationForm />
        </Paper>
      </Container>
    </Box>
  );
};

export default RegisterPage;
