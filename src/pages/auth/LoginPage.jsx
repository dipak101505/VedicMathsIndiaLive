import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Typography,
  Container,
  Link,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from '@mui/material';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/common/Button';
import toast from 'react-hot-toast';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [componentError, setComponentError] = useState(null);
  
  // Forgot password state
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetEmailError, setResetEmailError] = useState('');
  const [resetLoading, setResetLoading] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = location.state?.from?.pathname || '/dashboard';
  
  // Log component initialization
  useEffect(() => {
    console.log('🔐 LoginPage component mounted');
    console.log('📍 Current location:', location.pathname);
    console.log('🎯 Redirect target:', from);
    
    // Check if auth hook is working
    console.log('🔑 Auth hook state:', { loading, error });
    
    return () => {
      console.log('🔐 LoginPage component unmounting');
    };
  }, [location.pathname, from, loading, error]);
  
  const handleChange = (e) => {
    try {
      const { name, value } = e.target;
      console.log('📝 Form field change:', { name, value });
      
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
      
      // Clear error when user starts typing
      if (errors[name]) {
        setErrors(prev => ({
          ...prev,
          [name]: ''
        }));
      }
    } catch (error) {
      console.error('❌ Error in handleChange:', error);
      setComponentError('Form field change error');
    }
  };
  
  const validateForm = () => {
    try {
      console.log('✅ Validating form data:', formData);
      const newErrors = {};
      
      if (!formData.email) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email is invalid';
      }
      
      if (!formData.password) {
        newErrors.password = 'Password is required';
      }
      
      console.log('🔍 Validation errors:', newErrors);
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    } catch (error) {
      console.error('❌ Error in validateForm:', error);
      setComponentError('Form validation error');
      return false;
    }
  };
  
  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      console.log('🚀 Form submission started');
      
      if (!validateForm()) {
        console.log('❌ Form validation failed');
        return;
      }
      
      console.log('🔐 Attempting login with:', { email: formData.email, password: '***' });
      const result = await login(formData.email, formData.password);
      
      if (result.success) {
        console.log('✅ Login successful, navigating to:', from);
        navigate(from, { replace: true });
      } else {
        console.log('❌ Login failed:', result.error);
      }
    } catch (error) {
      console.error('❌ Error in handleSubmit:', error);
      setComponentError('Form submission error');
    }
  };

  // Test Firebase auth functionality
  const testFirebaseAuth = async () => {
    try {
      console.log('🧪 Testing Firebase auth functionality...');
      
      const { auth } = await import('../../services/firebase');
      console.log('✅ Auth import successful:', auth);
      
      if (!auth) {
        throw new Error('Auth instance is null');
      }
      
      // Test if auth has the required methods
      if (typeof auth.onAuthStateChanged !== 'function') {
        throw new Error('Auth instance missing onAuthStateChanged method');
      }
      
      console.log('✅ Firebase auth test passed');
      return true;
      
    } catch (error) {
      console.error('❌ Firebase auth test failed:', error);
      return false;
    }
  };

  // Forgot password functions
  const handleForgotPasswordOpen = () => {
    setResetEmail(formData.email || ''); // Pre-fill with login email if available
    setResetEmailError('');
    setResetSuccess(false);
    setForgotPasswordOpen(true);
    
    // Test Firebase auth when opening the dialog
    testFirebaseAuth();
  };

  const handleForgotPasswordClose = () => {
    setForgotPasswordOpen(false);
    setResetEmail('');
    setResetEmailError('');
    setResetSuccess(false);
  };

  const validateResetEmail = () => {
    if (!resetEmail.trim()) {
      setResetEmailError('Email is required');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(resetEmail.trim())) {
      setResetEmailError('Please enter a valid email address');
      return false;
    }
    setResetEmailError('');
    return true;
  };

  // Check if user exists in Firebase
  const checkUserExists = async (email) => {
    try {
      console.log('🔍 Checking if user exists in Firebase:', email);
      
      const { auth } = await import('../../services/firebase');
      const { fetchSignInMethodsForEmail } = await import('firebase/auth');
      
      const methods = await fetchSignInMethodsForEmail(auth, email);
      console.log('🔍 Sign-in methods for email:', methods);
      
      if (methods.length > 0) {
        console.log('✅ User exists in Firebase with methods:', methods);
        return true;
      } else {
        console.log('❌ User does not exist in Firebase');
        return false;
      }
      
    } catch (error) {
      console.error('❌ Error checking user existence:', error);
      return false;
    }
  };

  const handlePasswordReset = async () => {
    try {
      if (!validateResetEmail()) {
        return;
      }

      setResetLoading(true);
      console.log('🔐 Attempting password reset for:', resetEmail);

      // First check if user exists
      const userExists = await checkUserExists(resetEmail.trim());
      if (!userExists) {
        setResetEmailError('No account found with this email address');
        toast.error('No account found with this email address');
        setResetLoading(false);
        return;
      }

      // Import Firebase auth service for password reset
      const { auth } = await import('../../services/firebase');
      const { sendPasswordResetEmail } = await import('firebase/auth');

      console.log('📧 Firebase auth imported successfully');
      console.log('📧 Auth instance:', auth);
      console.log('📧 Reset email:', resetEmail.trim());

      // Check if auth is properly initialized
      if (!auth) {
        throw new Error('Firebase auth not initialized');
      }

      // Send password reset email with additional error handling
      console.log('📧 About to send password reset email...');
      
      try {
        const result = await sendPasswordResetEmail(auth, resetEmail.trim());
        console.log('📧 Password reset email result:', result);
        console.log('📧 Result type:', typeof result);
        console.log('📧 Result keys:', result ? Object.keys(result) : 'No keys');
      } catch (sendError) {
        console.error('❌ Error in sendPasswordResetEmail:', sendError);
        throw sendError;
      }
      
      console.log('✅ Password reset email sent successfully');
      setResetSuccess(true);
      toast.success('Password reset email sent! Check your inbox.');
      
      // Auto-close after 3 seconds
      setTimeout(() => {
        handleForgotPasswordClose();
      }, 3000);
      
    } catch (error) {
      console.error('❌ Password reset error:', error);
      console.error('❌ Error details:', {
        code: error.code,
        message: error.message,
        stack: error.stack,
        name: error.name
      });
      
      let errorMessage = 'Failed to send password reset email';
      
      // Handle specific Firebase auth errors
      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = 'No account found with this email address';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Too many requests. Please try again later.';
          break;
        case 'auth/network-request-failed':
          errorMessage = 'Network error. Please check your internet connection.';
          break;
        case 'auth/operation-not-allowed':
          errorMessage = 'Password reset is not enabled for this project.';
          break;
        case 'auth/unauthorized-continue-uri':
          errorMessage = 'Unauthorized continue URI. Please contact support.';
          break;
        default:
          errorMessage = error.message || 'An unexpected error occurred';
      }
      
      setResetEmailError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setResetLoading(false);
    }
  };

  // If there's a component error, show it
  if (componentError) {
    console.error('❌ LoginPage component error:', componentError);
    return (
      <Container component="main" maxWidth="xs">
        <Box sx={{ marginTop: 8, textAlign: 'center' }}>
          <Alert severity="error">
            Component Error: {componentError}
          </Alert>
        </Box>
      </Container>
    );
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Card sx={{ width: '100%' }}>
          <CardContent sx={{ p: 4 }}>
            <Typography component="h1" variant="h5" align="center" gutterBottom>
              Sign In
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 3 }}>
              Welcome to Vedic Maths India
            </Typography>
            
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                type="email"
                autoComplete="email"
                autoFocus
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
              />
              
              {/* Forgot Password Link */}
              <Box sx={{ textAlign: 'right', mt: 1 }}>
                <Link
                  component="button"
                  variant="body2"
                  onClick={handleForgotPasswordOpen}
                  sx={{ cursor: 'pointer' }}
                >
                  Forgot password?
                </Link>
              </Box>
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                loading={loading}
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Box sx={{ textAlign: 'center' }}>
                <Link component={RouterLink} to="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Forgot Password Dialog */}
      <Dialog 
        open={forgotPasswordOpen} 
        onClose={handleForgotPasswordClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Reset Password
        </DialogTitle>
        <DialogContent>
          {resetSuccess ? (
            <DialogContentText>
              ✅ Password reset email sent successfully! 
              Please check your email inbox and follow the instructions to reset your password.
            </DialogContentText>
          ) : (
            <>
              <DialogContentText sx={{ mb: 2 }}>
                Enter your email address and we'll send you a link to reset your password.
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="reset-email"
                label="Email Address"
                type="email"
                fullWidth
                variant="outlined"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                error={!!resetEmailError}
                helperText={resetEmailError}
                disabled={resetLoading}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          {!resetSuccess && (
            <>
              <Button onClick={handleForgotPasswordClose} disabled={resetLoading}>
                Cancel
              </Button>
              <Button 
                onClick={handlePasswordReset} 
                variant="contained"
                loading={resetLoading}
                disabled={!resetEmail.trim() || resetLoading}
              >
                Send Reset Email
              </Button>
            </>
          )}
          {resetSuccess && (
            <Button onClick={handleForgotPasswordClose} variant="contained">
              Close
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default LoginPage;
