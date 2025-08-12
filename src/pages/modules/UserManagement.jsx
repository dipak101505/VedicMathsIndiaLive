import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  Button,
  TextField,
  Chip,
  Avatar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  Download as DownloadIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import { useAuth } from '../../hooks/useAuth';
import { usePermissions } from '../../hooks/usePermissions';
import { useStore } from '../../hooks/useStore';
import { userService } from '../../services/userService';
import { PageContainer, SectionHeader, FormContainer, FormRow } from '../../styles/components';
import { Loading, Card as CommonCard, Table, Modal, Input, Button as CommonButton } from '../../components/common';

const UserManagement = () => {
  const { user } = useAuth();
  const { isSuperAdmin, isAdmin } = usePermissions();
  const { users, loading, error } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: 'student',
    franchiseId: '',
    phone: '',
    status: 'active',
  });

  useEffect(() => {
    if (isSuperAdmin || isAdmin) {
      fetchUsers();
    }
  }, [isSuperAdmin, isAdmin]);

  const fetchUsers = async () => {
    await users.fetchUsers();
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleFilterChange = (filterType, value) => {
    if (filterType === 'role') {
      setRoleFilter(value);
    } else if (filterType === 'status') {
      setStatusFilter(value);
    }
  };

  const handleCreateUser = async () => {
    try {
      const result = await userService.createUser(formData);
      if (result.success) {
        setIsCreateModalOpen(false);
        resetFormData();
        fetchUsers();
      }
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const handleEditUser = async () => {
    try {
      const result = await userService.updateUser(editingUser.id, formData);
      if (result.success) {
        setIsEditModalOpen(false);
        setEditingUser(null);
        resetFormData();
        fetchUsers();
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDeleteUser = async () => {
    try {
      const result = await userService.deleteUser(editingUser.id);
      if (result.success) {
        setIsDeleteModalOpen(false);
        setEditingUser(null);
        fetchUsers();
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleEditClick = (user) => {
    setEditingUser(user);
    setFormData({
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      email: user.email || '',
      role: user.role || 'student',
      franchiseId: user.franchiseId || '',
      phone: user.phone || '',
      status: user.status || 'active',
    });
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (user) => {
    setEditingUser(user);
    setIsDeleteModalOpen(true);
  };

  const resetFormData = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      role: 'student',
      franchiseId: '',
      phone: '',
      status: 'active',
    });
  };

  const filteredUsers = users.users.filter(user => {
    const matchesSearch = user.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.lastName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const tableColumns = [
    {
      id: 'name',
      label: 'Name',
      render: (user) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar sx={{ width: 40, height: 40 }}>
            {user.firstName?.[0]}{user.lastName?.[0]}
          </Avatar>
          <Box>
            <Typography variant="body1" fontWeight="medium">
              {user.firstName} {user.lastName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {user.email}
            </Typography>
          </Box>
        </Box>
      ),
    },
    {
      id: 'role',
      label: 'Role',
      render: (user) => (
        <Chip
          label={user.role}
          color={user.role === 'super_admin' ? 'error' : user.role === 'admin' ? 'warning' : 'primary'}
          size="small"
        />
      ),
    },
    {
      id: 'franchise',
      label: 'Franchise',
      render: (user) => user.franchiseId || 'N/A',
    },
    {
      id: 'status',
      label: 'Status',
      render: (user) => (
        <Chip
          label={user.status}
          color={user.status === 'active' ? 'success' : 'default'}
          size="small"
        />
      ),
    },
    {
      id: 'actions',
      label: 'Actions',
      render: (user) => (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton size="small" color="primary" onClick={() => handleEditClick(user)}>
            <EditIcon />
          </IconButton>
          <IconButton size="small" color="error" onClick={() => handleDeleteClick(user)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  if (!isSuperAdmin && !isAdmin) {
    return (
      <PageContainer>
        <Typography variant="h4" color="error">
          Access Denied: Admin privileges required
        </Typography>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      {/* Header */}
      <SectionHeader>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>
            User Management
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage users across the platform
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            onClick={() => {/* TODO: Export users */}}
          >
            Export
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setIsCreateModalOpen(true)}
          >
            Add User
          </Button>
        </Box>
      </SectionHeader>

      {/* Filters and Search */}
      <CommonCard sx={{ mb: 4 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              placeholder="Search users..."
              value={searchQuery}
              onChange={handleSearch}
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
              }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Role</InputLabel>
              <Select
                value={roleFilter}
                label="Role"
                onChange={(e) => handleFilterChange('role', e.target.value)}
              >
                <MenuItem value="all">All Roles</MenuItem>
                <MenuItem value="super_admin">Super Admin</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="instructor">Instructor</MenuItem>
                <MenuItem value="student">Student</MenuItem>
                <MenuItem value="parent">Parent</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={statusFilter}
                label="Status"
                onChange={(e) => handleFilterChange('status', e.target.value)}
              >
                <MenuItem value="all">All Status</MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
                <MenuItem value="suspended">Suspended</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<RefreshIcon />}
              onClick={fetchUsers}
            >
              Refresh
            </Button>
          </Grid>
        </Grid>
      </CommonCard>

      {/* Users Table */}
      <CommonCard>
        <Table
          data={filteredUsers}
          columns={tableColumns}
          loading={loading}
          selectable
          onSelectionChange={setSelectedUsers}
          pagination
        />
      </CommonCard>

      {/* Create User Modal */}
      <Modal
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create New User"
        maxWidth="md"
      >
        <FormContainer>
          <FormRow>
            <Input
              label="First Name"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              required
            />
            <Input
              label="Last Name"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              required
            />
          </FormRow>
          <FormRow>
            <Input
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
            <Input
              label="Phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </FormRow>
          <FormRow>
            <Input
              label="Role"
              select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              options={[
                { value: 'student', label: 'Student' },
                { value: 'instructor', label: 'Instructor' },
                { value: 'admin', label: 'Admin' },
                { value: 'parent', label: 'Parent' },
              ]}
              required
            />
            <Input
              label="Status"
              select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              options={[
                { value: 'active', label: 'Active' },
                { value: 'inactive', label: 'Inactive' },
                { value: 'suspended', label: 'Suspended' },
              ]}
              required
            />
          </FormRow>
          <FormRow>
            <Input
              label="Franchise ID"
              value={formData.franchiseId}
              onChange={(e) => setFormData({ ...formData, franchiseId: e.target.value })}
              fullWidth
            />
          </FormRow>
        </FormContainer>
        <DialogActions>
          <Button onClick={() => setIsCreateModalOpen(false)}>Cancel</Button>
          <Button onClick={handleCreateUser} variant="contained">
            Create User
          </Button>
        </DialogActions>
      </Modal>

      {/* Edit User Modal */}
      <Modal
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit User"
        maxWidth="md"
      >
        <FormContainer>
          <FormRow>
            <Input
              label="First Name"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              required
            />
            <Input
              label="Last Name"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              required
            />
          </FormRow>
          <FormRow>
            <Input
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
            <Input
              label="Phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </FormRow>
          <FormRow>
            <Input
              label="Role"
              select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              options={[
                { value: 'student', label: 'Student' },
                { value: 'instructor', label: 'Instructor' },
                { value: 'admin', label: 'Admin' },
                { value: 'parent', label: 'Parent' },
              ]}
              required
            />
            <Input
              label="Status"
              select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              options={[
                { value: 'active', label: 'Active' },
                { value: 'inactive', label: 'Inactive' },
                { value: 'suspended', label: 'Suspended' },
              ]}
              required
            />
          </FormRow>
          <FormRow>
            <Input
              label="Franchise ID"
              value={formData.franchiseId}
              onChange={(e) => setFormData({ ...formData, franchiseId: e.target.value })}
              fullWidth
            />
          </FormRow>
        </FormContainer>
        <DialogActions>
          <Button onClick={() => setIsEditModalOpen(false)}>Cancel</Button>
          <Button onClick={handleEditUser} variant="contained">
            Update User
          </Button>
        </DialogActions>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete User"
        maxWidth="sm"
      >
        <Box sx={{ p: 3 }}>
          <Typography variant="body1" gutterBottom>
            Are you sure you want to delete this user?
          </Typography>
          <Typography variant="body2" color="text.secondary">
            This action cannot be undone. The user will be permanently removed from the system.
          </Typography>
        </Box>
        <DialogActions>
          <Button onClick={() => setIsDeleteModalOpen(false)}>Cancel</Button>
          <Button onClick={handleDeleteUser} variant="contained" color="error">
            Delete User
          </Button>
        </DialogActions>
      </Modal>
    </PageContainer>
  );
};

export default UserManagement;
