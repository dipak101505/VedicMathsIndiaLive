import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Alert,
  CircularProgress,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import { useAuth } from '../../hooks/useAuth';
import { usePermissions } from '../../hooks/usePermissions';
import { claimsService } from '../../services/claimsService';
import { validateClaims, createDefaultClaims } from '../../utils/claimsUtils';
import toast from 'react-hot-toast';

const ClaimsManagement = () => {
  const { user } = useAuth();
  const { isSuperAdmin, isAdmin, loading: permissionsLoading } = usePermissions();
  
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [claimsForm, setClaimsForm] = useState({
    role: 'student',
    franchiseId: '',
    permissions: [],
    isActive: true,
    userType: 'user',
    accessLevel: 1
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Check if user has permission to manage claims
  useEffect(() => {
    if (!isSuperAdmin && !isAdmin) {
      setError('You do not have permission to manage claims');
    }
  }, [isSuperAdmin, isAdmin]);

  // Load users (this would typically come from your user service)
  useEffect(() => {
    if (isSuperAdmin || isAdmin) {
      loadUsers();
    }
  }, [isSuperAdmin, isAdmin]);

  const loadUsers = async () => {
    // This would typically load users from your user service
    // For now, we'll use mock data
    setUsers([
      { uid: 'user1', email: 'student@example.com', role: 'student' },
      { uid: 'user2', email: 'instructor@example.com', role: 'instructor' },
      { uid: 'user3', email: 'admin@example.com', role: 'franchise_admin' }
    ]);
  };

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    // Load current claims for the user
    loadUserClaims(user.uid);
  };

  const loadUserClaims = async (uid) => {
    try {
      setLoading(true);
      const result = await claimsService.getUserClaims(uid);
      if (result.success && result.claims) {
        setClaimsForm({
          role: result.claims.role || 'student',
          franchiseId: result.claims.franchiseId || '',
          permissions: result.claims.permissions || [],
          isActive: result.claims.isActive !== false,
          userType: result.claims.userType || 'user',
          accessLevel: result.claims.accessLevel || 1
        });
      }
    } catch (error) {
      console.error('Failed to load user claims:', error);
      toast.error('Failed to load user claims');
    } finally {
      setLoading(false);
    }
  };

  const handleClaimsChange = (field, value) => {
    setClaimsForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleRoleChange = (role) => {
    const defaultClaims = createDefaultClaims(role);
    setClaimsForm(prev => ({
      ...prev,
      role,
      permissions: defaultClaims.permissions,
      accessLevel: defaultClaims.accessLevel
    }));
  };

  const handleSaveClaims = async () => {
    if (!selectedUser) {
      toast.error('Please select a user first');
      return;
    }

    // Validate claims
    const validation = validateClaims(claimsForm);
    if (!validation.isValid) {
      setError('Invalid claims: ' + validation.errors.join(', '));
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const result = await claimsService.setUserClaims(selectedUser.uid, claimsForm);
      
      if (result.success) {
        toast.success('Claims updated successfully');
        // Refresh user list
        loadUsers();
      } else {
        throw new Error(result.message || 'Failed to update claims');
      }
    } catch (error) {
      console.error('Failed to save claims:', error);
      setError(error.message);
      toast.error('Failed to save claims');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveClaims = async () => {
    if (!selectedUser) {
      toast.error('Please select a user first');
      return;
    }

    if (!window.confirm('Are you sure you want to remove all claims for this user?')) {
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const result = await claimsService.removeUserClaims(selectedUser.uid);
      
      if (result.success) {
        toast.success('Claims removed successfully');
        setClaimsForm({
          role: 'student',
          franchiseId: '',
          permissions: [],
          isActive: true,
          userType: 'user',
          accessLevel: 1
        });
        // Refresh user list
        loadUsers();
      } else {
        throw new Error(result.message || 'Failed to remove claims');
      }
    } catch (error) {
      console.error('Failed to remove claims:', error);
      setError(error.message);
      toast.error('Failed to remove claims');
    } finally {
      setLoading(false);
    }
  };

  if (permissionsLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!isSuperAdmin && !isAdmin) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">
          {error || 'You do not have permission to access this page'}
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        🔐 Claims Management
      </Typography>
      
      <Typography variant="body1" sx={{ mb: 3 }}>
        Manage custom claims for users. Claims define user roles, permissions, and access levels.
      </Typography>

      <Grid container spacing={3}>
        {/* User Selection */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Select User
              </Typography>
              
              <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Email</TableCell>
                      <TableCell>Current Role</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow 
                        key={user.uid}
                        onClick={() => handleUserSelect(user)}
                        sx={{ 
                          cursor: 'pointer',
                          backgroundColor: selectedUser?.uid === user.uid ? 'action.selected' : 'inherit'
                        }}
                      >
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Chip 
                            label={user.role} 
                            size="small" 
                            color="primary" 
                            variant="outlined"
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Claims Form */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {selectedUser ? `Claims for ${selectedUser.email}` : 'Select a user to manage claims'}
              </Typography>

              {selectedUser && (
                <Box sx={{ mt: 2 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth>
                        <InputLabel>Role</InputLabel>
                        <Select
                          value={claimsForm.role}
                          label="Role"
                          onChange={(e) => handleRoleChange(e.target.value)}
                        >
                          <MenuItem value="student">Student</MenuItem>
                          <MenuItem value="instructor">Instructor</MenuItem>
                          <MenuItem value="parent">Parent</MenuItem>
                          <MenuItem value="franchise_admin">Franchise Admin</MenuItem>
                          <MenuItem value="super_admin">Super Admin</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Franchise ID"
                        value={claimsForm.franchiseId}
                        onChange={(e) => handleClaimsChange('franchiseId', e.target.value)}
                        placeholder="Optional franchise identifier"
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Typography variant="subtitle2" gutterBottom>
                        Permissions (auto-generated based on role)
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {claimsForm.permissions.map((permission) => (
                          <Chip
                            key={permission}
                            label={permission}
                            size="small"
                            color="secondary"
                          />
                        ))}
                      </Box>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth>
                        <InputLabel>User Type</InputLabel>
                        <Select
                          value={claimsForm.userType}
                          label="User Type"
                          onChange={(e) => handleClaimsChange('userType', e.target.value)}
                        >
                          <MenuItem value="user">User</MenuItem>
                          <MenuItem value="instructor">Instructor</MenuItem>
                          <MenuItem value="admin">Admin</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Access Level"
                        type="number"
                        value={claimsForm.accessLevel}
                        onChange={(e) => handleClaimsChange('accessLevel', parseInt(e.target.value))}
                        inputProps={{ min: 1, max: 5 }}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                        <Button
                          variant="contained"
                          onClick={handleSaveClaims}
                          disabled={loading}
                        >
                          {loading ? <CircularProgress size={20} /> : 'Save Claims'}
                        </Button>
                        
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={handleRemoveClaims}
                          disabled={loading}
                        >
                          Remove Claims
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Error Display */}
      {error && (
        <Alert severity="error" sx={{ mt: 3 }}>
          {error}
        </Alert>
      )}
    </Box>
  );
};

export default ClaimsManagement;
