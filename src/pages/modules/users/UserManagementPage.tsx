import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  IconButton,
  Tooltip,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import { usePermissions } from '../../../hooks/usePermissions';
import { useUsers } from '../../../hooks/useUsers';
import { UserRole } from '../../../types/auth.types';
import { UserTableData } from '../../../types/user.types';
import Button from '../../../components/common/Button';
import Card from '../../../components/common/Card';

const UserManagementPage: React.FC = () => {
  const { canPerformAction } = usePermissions();
  const {
    users,
    loading,
    error,
    pagination,
    searchTerm,
    filters,
    fetchUsers,
    setSearchTerm,
    setFilters,
    setPage,
    setLimit,
    clearError,
  } = useUsers();

  const [roleFilter, setRoleFilter] = useState<UserRole | ''>('');

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Handle search
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    
    // Update filters with search term
    const newFilters = { ...filters, search: value };
    setFilters(newFilters);
    
    // Fetch users with new filters
    fetchUsers({ filters: newFilters, page: 1, limit: pagination.limit });
  };

  // Handle role filter change
  const handleRoleFilterChange = (event: any) => {
    const value = event.target.value;
    setRoleFilter(value);
    
    // Update filters with role
    const newFilters = { ...filters, role: value || undefined };
    setFilters(newFilters);
    
    // Fetch users with new filters
    fetchUsers({ filters: newFilters, page: 1, limit: pagination.limit });
  };

  // Handle page change
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage + 1); // MUI uses 0-based indexing, we use 1-based
    fetchUsers({ 
      filters, 
      page: newPage + 1, 
      limit: pagination.limit 
    });
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newLimit = parseInt(event.target.value, 10);
    setLimit(newLimit);
    fetchUsers({ 
      filters, 
      page: 1, 
      limit: newLimit 
    });
  };

  // Get role color for chips
  const getRoleColor = (role: UserRole) => {
    const colors: Record<UserRole, 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'> = {
      super_admin: 'error',
      franchise_admin: 'warning',
      instructor: 'primary',
      student: 'success',
      parent: 'info',
    };
    return colors[role] || 'default';
  };

  // Handle add user
  const handleAddUser = () => {
    console.log('Add user clicked');
    // TODO: Implement add user modal/form
  };

  // Handle edit user
  const handleEditUser = (user: UserTableData) => {
    console.log('Edit user clicked:', user);
    // TODO: Implement edit user modal/form
  };

  // Handle delete user
  const handleDeleteUser = (user: UserTableData) => {
    console.log('Delete user clicked:', user);
    // TODO: Implement delete user confirmation
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          User Management
        </Typography>
        {canPerformAction('users', 'create') && (
          <Button
            variant="primary"
            startIcon={<AddIcon />}
            onClick={handleAddUser}
          >
            Add User
          </Button>
        )}
      </Box>

      <Card title="User List" subtitle="Manage system users">
        {/* Error Alert */}
        {error && (
          <Alert 
            severity="error" 
            sx={{ mb: 2 }}
            onClose={clearError}
          >
            {error}
          </Alert>
        )}

        {/* Filters */}
        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <TextField
            label="Search Users"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />,
            }}
            sx={{ minWidth: 300 }}
            placeholder="Search by name or email..."
          />
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Role</InputLabel>
            <Select
              value={roleFilter}
              label="Role"
              onChange={handleRoleFilterChange}
            >
              <MenuItem value="">All Roles</MenuItem>
              <MenuItem value="super_admin">Super Admin</MenuItem>
              <MenuItem value="franchise_admin">Franchise Admin</MenuItem>
              <MenuItem value="instructor">Instructor</MenuItem>
              <MenuItem value="student">Student</MenuItem>
              <MenuItem value="parent">Parent</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Loading State */}
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <CircularProgress />
          </Box>
        )}

        {/* Users Table */}
        {!loading && (
          <>
            <TableContainer component={Paper} variant="outlined">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Created</TableCell>
                    <TableCell>Last Login</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                        <Typography variant="body2" color="text.secondary">
                          No users found
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          {user.firstName} {user.lastName}
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Chip
                            label={user.role.replace('_', ' ')}
                            color={getRoleColor(user.role)}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={user.isActive ? 'Active' : 'Inactive'}
                            color={user.isActive ? 'success' : 'default'}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>{user.createdAt.toLocaleDateString()}</TableCell>
                        <TableCell>
                          {user.lastLoginAt ? user.lastLoginAt.toLocaleDateString() : 'Never'}
                        </TableCell>
                        <TableCell align="center">
                          <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                            {canPerformAction('users', 'update') && (
                              <Tooltip title="Edit User">
                                <IconButton 
                                  size="small" 
                                  color="primary"
                                  onClick={() => handleEditUser(user)}
                                >
                                  <EditIcon />
                                </IconButton>
                              </Tooltip>
                            )}
                            {canPerformAction('users', 'delete') && (
                              <Tooltip title="Delete User">
                                <IconButton 
                                  size="small" 
                                  color="error"
                                  onClick={() => handleDeleteUser(user)}
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </Tooltip>
                            )}
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Pagination */}
            {users.length > 0 && (
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={pagination.total}
                rowsPerPage={pagination.limit}
                page={pagination.page - 1} // Convert to 0-based for MUI
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            )}
          </>
        )}
      </Card>
    </Box>
  );
};

export default UserManagementPage;
