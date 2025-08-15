import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Card, CardContent, Alert, CircularProgress } from '@mui/material';
import { useAuth } from '../../hooks/useAuth';
import { claimsService } from '../../services/claimsService';
import toast from 'react-hot-toast';

const ClaimsTest = () => {
  const { user } = useAuth();
  const [currentClaims, setCurrentClaims] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get current user's claims on component mount
  useEffect(() => {
    if (user?.uid) {
      getCurrentUserClaims();
    }
  }, [user]);

  const getCurrentUserClaims = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const claims = await claimsService.getCurrentUserClaims();
      setCurrentClaims(claims);
      console.log('✅ ClaimsTest: Current claims retrieved:', claims);
    } catch (error) {
      console.error('❌ ClaimsTest: Failed to get claims:', error);
      setError(error.message);
      toast.error('Failed to get claims');
    } finally {
      setLoading(false);
    }
  };

  const testHealthCheck = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await claimsService.healthCheck();
      console.log('✅ ClaimsTest: Health check passed:', result);
      toast.success('Health check passed!');
    } catch (error) {
      console.error('❌ ClaimsTest: Health check failed:', error);
      setError(error.message);
      toast.error('Health check failed');
    } finally {
      setLoading(false);
    }
  };

  const testSetClaims = async () => {
    if (!user?.uid) {
      toast.error('No user logged in');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const testClaims = {
        role: 'instructor',
        franchiseId: 'test_franchise_123',
        permissions: ['VIEW_COURSES', 'CREATE_COURSES'],
        isActive: true,
        lastLoginAt: new Date().toISOString(),
        userType: 'instructor',
        accessLevel: 3
      };
      
      const result = await claimsService.setUserClaims(user.uid, testClaims);
      console.log('✅ ClaimsTest: Test claims set:', result);
      toast.success('Test claims set successfully!');
      
      // Refresh claims display
      await getCurrentUserClaims();
    } catch (error) {
      console.error('❌ ClaimsTest: Failed to set test claims:', error);
      setError(error.message);
      toast.error('Failed to set test claims');
    } finally {
      setLoading(false);
    }
  };

  const testUpdateClaims = async () => {
    if (!user?.uid) {
      toast.error('No user logged in');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const updatedClaims = {
        role: 'instructor',
        franchiseId: 'updated_franchise_456',
        permissions: ['VIEW_COURSES', 'CREATE_COURSES', 'EDIT_COURSES'],
        isActive: true,
        lastLoginAt: new Date().toISOString(),
        userType: 'instructor',
        accessLevel: 3
      };
      
      const result = await claimsService.updateUserClaims(user.uid, updatedClaims);
      console.log('✅ ClaimsTest: Claims updated:', result);
      toast.success('Claims updated successfully!');
      
      // Refresh claims display
      await getCurrentUserClaims();
    } catch (error) {
      console.error('❌ ClaimsTest: Failed to update claims:', error);
      setError(error.message);
      toast.error('Failed to update claims');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="info">
          Please log in to test the claims system
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, maxWidth: 800 }}>
      <Typography variant="h4" gutterBottom>
        🔐 Custom Claims Test
      </Typography>
      
      <Typography variant="body1" sx={{ mb: 3 }}>
        This component tests the custom claims system. Use the buttons below to test various claims operations.
      </Typography>

      {/* Test Controls */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Test Controls
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button 
              variant="contained" 
              onClick={testHealthCheck}
              disabled={loading}
            >
              Health Check
            </Button>
            
            <Button 
              variant="contained" 
              onClick={getCurrentUserClaims}
              disabled={loading}
            >
              Get Current Claims
            </Button>
            
            <Button 
              variant="contained" 
              onClick={testSetClaims}
              disabled={loading}
              color="secondary"
            >
              Set Test Claims
            </Button>
            
            <Button 
              variant="contained" 
              onClick={testUpdateClaims}
              disabled={loading}
              color="warning"
            >
              Update Claims
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Loading State */}
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
          <CircularProgress />
        </Box>
      )}

      {/* Error Display */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Current Claims Display */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Current Claims
          </Typography>
          
          {currentClaims ? (
            <Box sx={{ fontFamily: 'monospace', fontSize: '0.9rem' }}>
              <pre>{JSON.stringify(currentClaims, null, 2)}</pre>
            </Box>
          ) : (
            <Typography variant="body2" color="text.secondary">
              No claims loaded. Click "Get Current Claims" to load them.
            </Typography>
          )}
        </CardContent>
      </Card>

      {/* User Info */}
      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Current User Info
          </Typography>
          
          <Box sx={{ fontFamily: 'monospace', fontSize: '0.9rem' }}>
            <pre>{JSON.stringify({
              uid: user.uid,
              email: user.email,
              role: user.role,
              isActive: user.isActive
            }, null, 2)}</pre>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ClaimsTest;
