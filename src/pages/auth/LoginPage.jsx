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
import { useAuthStore } from '../../store/authStore';
import { getFirebaseErrorMessage, handleFirebaseError } from '../../utils/errorMessages';
import Button from '../../components/common/Button';
import toast from 'react-hot-toast';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [componentError, setComponentError] = useState(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  
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
  
  // Component lifecycle management
  useEffect(() => {
    return () => {
      // Cleanup on unmount
      setIsAuthenticating(false);
    };
  }, [loading, error]);

  const handleChange = (e) => {
    try {
      const { name, value } = e.target;
      
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
      const newErrors = {};
      
      // Email validation
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email is invalid';
      }
      // Password validation
      if (!formData.password) {
        newErrors.password = 'Password is required';
      }
      
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
      
      if (!validateForm()) {
        return;
      }
      
      console.log('🔐 LoginPage: Starting authentication process');
      setIsAuthenticating(true);
      
      // Add a timeout to prevent infinite loading
      const authTimeout = setTimeout(() => {
        if (isAuthenticating) {
          console.error('❌ Authentication timeout after 10 seconds');
          setComponentError('Authentication is taking longer than expected. Please try again.');
          toast.error('Authentication timeout. Please try again.');
          setIsAuthenticating(false);
        }
      }, 10000); // 10 second timeout
      
      const result = await login(formData.email, formData.password);
      console.log('🔐 LoginPage: Login result:', result);
      
      if (result.success) {
        console.log('🔐 LoginPage: Login successful, waiting for auth state update');
        // Wait for the authentication state to be properly set
        // This prevents the race condition where navigation happens before auth state is updated
        let attempts = 0;
        const maxAttempts = 50; // 5 seconds max wait time
        
        const checkAuthState = () => {
          attempts++;
          const { isAuthenticated, user } = useAuthStore.getState();
          
          console.log(`🔍 Auth state check attempt ${attempts}:`, { isAuthenticated, hasUser: !!user, userRole: user?.role });
          
          // Wait for user to have a real role (not 'loading')
          if (isAuthenticated && user && user.role !== 'loading') {
            clearTimeout(authTimeout);
            setIsAuthenticating(false);
            console.log('✅ Authentication state confirmed with role:', user.role, 'navigating to:', from);
            navigate(from, { replace: true });
          } else if (attempts < maxAttempts) {
            // Check again after a short delay
            setTimeout(checkAuthState, 50); // Reduced from 100ms to 50ms
          } else {
            // Timeout reached, show error and let user try again
            console.error('❌ Authentication state update timeout after', maxAttempts, 'attempts');
            clearTimeout(authTimeout);
            setComponentError('Login successful but authentication state update timed out. Please try logging in again.');
            toast.error('Authentication timeout. Please try again.');
            setIsAuthenticating(false);
          }
        };
        
        // Check auth state immediately since we're fetching user data in useAuth
        checkAuthState();
        
        // Fallback: If auth state checking takes too long, try direct navigation
        // This handles edge cases where the state update might be delayed
        setTimeout(() => {
          if (isAuthenticating) {
            const { isAuthenticated, user } = useAuthStore.getState();
            if (isAuthenticated && user && user.role !== 'loading') {
              console.log('🔄 Fallback: Direct navigation after role loaded:', user.role);
              clearTimeout(authTimeout);
              setIsAuthenticating(false);
              navigate(from, { replace: true });
            }
          }
        }, 3000); // 3 second fallback
      } else {
        console.log('🔐 LoginPage: Login failed:', result.error);
        clearTimeout(authTimeout);
        setIsAuthenticating(false);
      }
    } catch (error) {
      console.error('❌ Error in handleSubmit:', error);
      setComponentError('Form submission error');
      setIsAuthenticating(false);
    }
  };

  // Test Firebase auth functionality
  const testFirebaseAuth = async () => {
    try {
      const { auth } = await import('../../services/firebase');
      
      if (!auth) {
        throw new Error('Auth instance is null');
      }
      
      // Test if auth has the required methods
      if (typeof auth.onAuthStateChanged !== 'function') {
        throw new Error('Auth instance missing onAuthStateChanged method');
      }
      
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
      const { auth } = await import('../../services/firebase');
      const { fetchSignInMethodsForEmail } = await import('firebase/auth');
      
      const methods = await fetchSignInMethodsForEmail(auth, email);
      
      if (methods.length > 0) {
        return true;
      } else {
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

      // Check if auth is properly initialized
      if (!auth) {
        throw new Error('Firebase auth not initialized');
      }

      // Send password reset email with additional error handling
      
      try {
        const result = await sendPasswordResetEmail(auth, resetEmail.trim());
      } catch (sendError) {
        console.error('❌ Error in sendPasswordResetEmail:', sendError);
        throw sendError;
      }
      
      // If we get here, the email was sent successfully
      setResetSuccess(true);
      setResetEmailError('');
      
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
      
      // Use centralized error handling utility
      const errorMessage = handleFirebaseError(error, toast.error, 'Failed to send password reset email');
      setResetEmailError(errorMessage);
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
                <Typography
                  component="span"
                  variant="body2"
                  onClick={handleForgotPasswordOpen}
                  sx={{ 
                    cursor: 'pointer',
                    color: 'primary.main',
                    textDecoration: 'underline',
                    '&:hover': {
                      color: 'primary.dark'
                    }
                  }}
                >
                  Forgot password?
                </Typography>
              </Box>
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                loading={loading || isAuthenticating}
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              
              {/* Authentication Progress Indicator */}
              {isAuthenticating && (
                <Box sx={{ textAlign: 'center', mt: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    🔐 Setting up your session...
                  </Typography>
                </Box>
              )}
              
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
