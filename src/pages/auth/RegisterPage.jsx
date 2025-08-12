import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Typography,
  Container,
  Link,
  Grid,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/common/Button';
import toast from 'react-hot-toast';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student',
    phone: '',
  });
  
  const [errors, setErrors] = useState({});
  const [componentError, setComponentError] = useState(null);
  
  const { register, loading, error } = useAuth();
  const navigate = useNavigate();
  
  // Log component initialization
  useEffect(() => {
    console.log('🔐 RegisterPage component mounted');
    console.log('🔑 Auth hook state:', { loading, error });
    
    return () => {
      console.log('🔐 RegisterPage component unmounting');
    };
  }, [loading, error]);
  
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
      console.log('✅ Validating form data:', { ...formData, password: '***', confirmPassword: '***' });
      const newErrors = {};
      
      // First Name validation
      if (!formData.firstName.trim()) {
        newErrors.firstName = 'First name is required';
      } else if (formData.firstName.trim().length < 2) {
        newErrors.firstName = 'First name must be at least 2 characters';
      }
      
      // Last Name validation
      if (!formData.lastName.trim()) {
        newErrors.lastName = 'Last name is required';
      } else if (formData.lastName.trim().length < 2) {
        newErrors.lastName = 'Last name must be at least 2 characters';
      }
      
      // Email validation
      if (!formData.email) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email is invalid';
      }
      
      // Password validation
      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (formData.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
      } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
        newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
      }
      
      // Confirm Password validation
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
      
      // Phone validation (optional)
      if (formData.phone && !/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/\s/g, ''))) {
        newErrors.phone = 'Phone number is invalid';
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
      console.log('🚀 Registration form submission started');
      
      if (!validateForm()) {
        console.log('❌ Form validation failed');
        return;
      }
      
      // Prepare user data for registration
      const userData = {
        displayName: `${formData.firstName} ${formData.lastName}`,
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.toLowerCase().trim(),
        role: formData.role,
        phone: formData.phone.trim() || null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isActive: true,
        emailVerified: false,
        lastLoginAt: null,
        preferences: {
          notifications: true,
          theme: 'light',
          language: 'en'
        }
      };
      
      console.log('🔐 Attempting registration with:', { 
        email: userData.email, 
        password: '***',
        userData: { ...userData, email: userData.email }
      });
      
      const result = await register(formData.email, formData.password, userData);
      
      if (result.success) {
        console.log('✅ Registration successful, navigating to dashboard');
        toast.success('Registration successful! Welcome to Vedic Maths India.');
        navigate('/dashboard', { replace: true });
      } else {
        console.log('❌ Registration failed:', result.error);
        // Error will be displayed by the auth hook
      }
    } catch (error) {
      console.error('❌ Error in handleSubmit:', error);
      setComponentError('Form submission error: ' + error.message);
    }
  };

  // If there's a component error, show it
  if (componentError) {
    console.error('❌ RegisterPage component error:', componentError);
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
              Sign Up
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 3 }}>
              Create your account to get started with Vedic Maths India
            </Typography>
            
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    value={formData.firstName}
                    onChange={handleChange}
                    error={!!errors.firstName}
                    helperText={errors.firstName}
                    inputProps={{ maxLength: 50 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                    value={formData.lastName}
                    onChange={handleChange}
                    error={!!errors.lastName}
                    helperText={errors.lastName}
                    inputProps={{ maxLength: 50 }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={!!errors.email}
                    helperText={errors.email}
                    inputProps={{ maxLength: 100 }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    value={formData.password}
                    onChange={handleChange}
                    error={!!errors.password}
                    helperText={errors.password}
                    inputProps={{ minLength: 6, maxLength: 128 }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    id="confirmPassword"
                    autoComplete="new-password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword}
                    inputProps={{ minLength: 6, maxLength: 128 }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth required>
                    <InputLabel id="role-label">Role</InputLabel>
                    <Select
                      labelId="role-label"
                      id="role"
                      name="role"
                      value={formData.role}
                      label="Role"
                      onChange={handleChange}
                    >
                      <MenuItem value="student">Student</MenuItem>
                      <MenuItem value="instructor">Instructor</MenuItem>
                      <MenuItem value="parent">Parent</MenuItem>
                      <MenuItem value="franchise_admin">Franchise Admin</MenuItem>
                    </Select>
                    <FormHelperText>Select your role in the platform</FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="phone"
                    label="Phone Number (Optional)"
                    name="phone"
                    autoComplete="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    error={!!errors.phone}
                    helperText={errors.phone || 'Include country code if international'}
                    inputProps={{ maxLength: 20 }}
                  />
                </Grid>
              </Grid>
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                loading={loading}
                sx={{ mt: 3, mb: 2 }}
              >
                {loading ? 'Creating Account...' : 'Sign Up'}
              </Button>
              
              <Box sx={{ textAlign: 'center' }}>
                <Link component={RouterLink} to="/login" variant="body2">
                  {"Already have an account? Sign In"}
                </Link>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default RegisterPage;
