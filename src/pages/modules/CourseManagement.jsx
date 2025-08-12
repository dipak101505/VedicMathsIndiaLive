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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  Download as DownloadIcon,
  Refresh as RefreshIcon,
  School as SchoolIcon,
} from '@mui/icons-material';
import { useAuth } from '../../hooks/useAuth';
import { usePermissions } from '../../hooks/usePermissions';
import { useStore } from '../../hooks/useStore';
import { PageContainer, SectionHeader, FormContainer, FormRow } from '../../styles/components';
import { Loading, Card as CommonCard, Table, Modal, Input, Button as CommonButton } from '../../components/common';

const CourseManagement = () => {
  const { user } = useAuth();
  const { isSuperAdmin, isAdmin, isInstructor } = usePermissions();
  const { courses, loading, error } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    instructorId: '',
    price: '',
    duration: '',
    status: 'active',
  });

  useEffect(() => {
    if (isSuperAdmin || isAdmin || isInstructor) {
      fetchCourses();
    }
  }, [isSuperAdmin, isAdmin, isInstructor]);

  const fetchCourses = async () => {
    await courses.fetchCourses();
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleFilterChange = (filterType, value) => {
    if (filterType === 'category') {
      setCategoryFilter(value);
    } else if (filterType === 'status') {
      setStatusFilter(value);
    }
  };

  const handleCreateCourse = async () => {
    try {
      const result = await courses.createCourse(formData);
      if (result.success) {
        setIsCreateModalOpen(false);
        resetFormData();
        fetchCourses();
      }
    } catch (error) {
      console.error('Error creating course:', error);
    }
  };

  const handleEditCourse = async () => {
    try {
      const result = await courses.updateCourse(editingCourse.id, formData);
      if (result.success) {
        setIsEditModalOpen(false);
        setEditingCourse(null);
        resetFormData();
        fetchCourses();
      }
    } catch (error) {
      console.error('Error updating course:', error);
    }
  };

  const handleDeleteCourse = async () => {
    try {
      const result = await courses.deleteCourse(editingCourse.id);
      if (result.success) {
        setIsDeleteModalOpen(false);
        setEditingCourse(null);
        fetchCourses();
      }
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  const handleEditClick = (course) => {
    setEditingCourse(course);
    setFormData({
      title: course.title || '',
      description: course.description || '',
      category: course.category || '',
      instructorId: course.instructorId || '',
      price: course.price || '',
      duration: course.duration || '',
      status: course.status || 'active',
    });
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (course) => {
    setEditingCourse(course);
    setIsDeleteModalOpen(true);
  };

  const resetFormData = () => {
    setFormData({
      title: '',
      description: '',
      category: '',
      instructorId: '',
      price: '',
      duration: '',
      status: 'active',
    });
  };

  const filteredCourses = courses.courses.filter(course => {
    const matchesSearch = course.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || course.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || course.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const tableColumns = [
    {
      id: 'title',
      label: 'Course',
      render: (course) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar sx={{ width: 40, height: 40, bgcolor: 'primary.main' }}>
            <SchoolIcon />
          </Avatar>
          <Box>
            <Typography variant="body1" fontWeight="medium">
              {course.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {course.description?.substring(0, 50)}...
            </Typography>
          </Box>
        </Box>
      ),
    },
    {
      id: 'category',
      label: 'Category',
      render: (course) => (
        <Chip
          label={course.category}
          color="primary"
          size="small"
          variant="outlined"
        />
      ),
    },
    {
      id: 'instructor',
      label: 'Instructor',
      render: (course) => course.instructorId || 'N/A',
    },
    {
      id: 'price',
      label: 'Price',
      render: (course) => `₹${course.price || 0}`,
    },
    {
      id: 'duration',
      label: 'Duration',
      render: (course) => `${course.duration || 0} hours`,
    },
    {
      id: 'status',
      label: 'Status',
      render: (course) => (
        <Chip
          label={course.status}
          color={course.status === 'active' ? 'success' : 'default'}
          size="small"
        />
      ),
    },
    {
      id: 'actions',
      label: 'Actions',
      render: (course) => (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton size="small" color="primary" onClick={() => handleEditClick(course)}>
            <EditIcon />
          </IconButton>
          <IconButton size="small" color="error" onClick={() => handleDeleteClick(course)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  if (!isSuperAdmin && !isAdmin && !isInstructor) {
    return (
      <PageContainer>
        <Typography variant="h4" color="error">
          Access Denied: Insufficient privileges
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
            Course Management
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage courses and curriculum
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            onClick={() => {/* TODO: Export courses */}}
          >
            Export
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setIsCreateModalOpen(true)}
          >
            Create Course
          </Button>
        </Box>
      </SectionHeader>

      {/* Filters and Search */}
      <CommonCard sx={{ mb: 4 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              placeholder="Search courses..."
              value={searchQuery}
              onChange={handleSearch}
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
              }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={categoryFilter}
                label="Category"
                onChange={(e) => handleFilterChange('category', e.target.value)}
              >
                <MenuItem value="all">All Categories</MenuItem>
                <MenuItem value="mathematics">Mathematics</MenuItem>
                <MenuItem value="science">Science</MenuItem>
                <MenuItem value="language">Language</MenuItem>
                <MenuItem value="arts">Arts</MenuItem>
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
                <MenuItem value="draft">Draft</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<RefreshIcon />}
              onClick={fetchCourses}
            >
              Refresh
            </Button>
          </Grid>
        </Grid>
      </CommonCard>

      {/* Courses Table */}
      <CommonCard>
        <Table
          data={filteredCourses}
          columns={tableColumns}
          loading={loading}
          selectable
          onSelectionChange={setSelectedCourses}
          pagination
        />
      </CommonCard>

      {/* Create Course Modal */}
      <Modal
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create New Course"
        maxWidth="md"
      >
        <FormContainer>
          <FormRow>
            <Input
              label="Course Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
            <Input
              label="Category"
              select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              options={[
                { value: 'mathematics', label: 'Mathematics' },
                { value: 'science', label: 'Science' },
                { value: 'language', label: 'Language' },
                { value: 'arts', label: 'Arts' },
              ]}
              required
            />
          </FormRow>
          <FormRow>
            <Input
              label="Description"
              multiline
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              fullWidth
            />
          </FormRow>
          <FormRow>
            <Input
              label="Price (₹)"
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            />
            <Input
              label="Duration (hours)"
              type="number"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            />
          </FormRow>
          <FormRow>
            <Input
              label="Status"
              select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              options={[
                { value: 'active', label: 'Active' },
                { value: 'inactive', label: 'Inactive' },
                { value: 'draft', label: 'Draft' },
              ]}
              required
            />
            <Input
              label="Instructor ID"
              value={formData.instructorId}
              onChange={(e) => setFormData({ ...formData, instructorId: e.target.value })}
            />
          </FormRow>
        </FormContainer>
        <DialogActions>
          <Button onClick={() => setIsCreateModalOpen(false)}>Cancel</Button>
          <Button onClick={handleCreateCourse} variant="contained">
            Create Course
          </Button>
        </DialogActions>
      </Modal>

      {/* Edit Course Modal */}
      <Modal
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Course"
        maxWidth="md"
      >
        <FormContainer>
          <FormRow>
            <Input
              label="Course Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
            <Input
              label="Category"
              select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              options={[
                { value: 'mathematics', label: 'Mathematics' },
                { value: 'science', label: 'Science' },
                { value: 'language', label: 'Language' },
                { value: 'arts', label: 'Arts' },
              ]}
              required
            />
          </FormRow>
          <FormRow>
            <Input
              label="Description"
              multiline
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              fullWidth
            />
          </FormRow>
          <FormRow>
            <Input
              label="Price (₹)"
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            />
            <Input
              label="Duration (hours)"
              type="number"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            />
          </FormRow>
          <FormRow>
            <Input
              label="Status"
              select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              options={[
                { value: 'active', label: 'Active' },
                { value: 'inactive', label: 'Inactive' },
                { value: 'draft', label: 'Draft' },
              ]}
              required
            />
            <Input
              label="Instructor ID"
              value={formData.instructorId}
              onChange={(e) => setFormData({ ...formData, instructorId: e.target.value })}
            />
          </FormRow>
        </FormContainer>
        <DialogActions>
          <Button onClick={() => setIsEditModalOpen(false)}>Cancel</Button>
          <Button onClick={handleEditCourse} variant="contained">
            Update Course
          </Button>
        </DialogActions>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Course"
        maxWidth="sm"
      >
        <Box sx={{ p: 3 }}>
          <Typography variant="body1" gutterBottom>
            Are you sure you want to delete this course?
          </Typography>
          <Typography variant="body2" color="text.secondary">
            This action cannot be undone. The course will be permanently removed from the system.
          </Typography>
        </Box>
        <DialogActions>
          <Button onClick={() => setIsDeleteModalOpen(false)}>Cancel</Button>
          <Button onClick={handleDeleteCourse} variant="contained" color="error">
            Delete Course
          </Button>
        </DialogActions>
      </Modal>
    </PageContainer>
  );
};

export default CourseManagement;
