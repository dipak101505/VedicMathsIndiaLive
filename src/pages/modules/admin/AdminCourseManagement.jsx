import React, { useState, useCallback } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Grid, 
  Paper, 
  Tabs, 
  Tab, 
  Chip,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Tooltip,
  Collapse,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination
} from '@mui/material';
import { 
  Add as AddIcon,
  ViewList as ListIcon,
  ViewModule as GridIcon,
  FilterList as FilterIcon,
  Search as SearchIcon,
  Refresh as RefreshIcon,
  Download as DownloadIcon,
  Upload as UploadIcon,
  Analytics as AnalyticsIcon,
  Settings as SettingsIcon,
  Block as BlockIcon,
  CheckCircle as ApproveIcon
} from '@mui/icons-material';
import { usePermissions } from '../../../hooks/usePermissions';
import { useCourseData } from '../../../hooks/useCourseData';
import { useCourseSearch } from '../../../hooks/useCourseSearch';
import { useCourseFiltering } from '../../../hooks/useCourseFiltering';
import CourseList from '../../../components/courses/CourseList';
import CourseSearch from '../../../components/courses/CourseSearch';
import CourseFilters from '../../../components/courses/CourseFilters';
import Loading from '../../../components/common/Loading';

const AdminCourseManagement = () => {
  const { isAdmin } = usePermissions();
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  
  // Course data hook
  const {
    courses,
    loading,
    error,
    pagination,
    refreshCourses,
    loadMore,
    createCourse,
    updateCourse,
    deleteCourse,
    getCourseStats
  } = useCourseData('admin', { limit: 50 });
  
  // Search hook
  const {
    searchQuery,
    searchFilters,
    handleSearch,
    handleFilterChange,
    clearFilters,
    resetSearch,
    searchStats
  } = useCourseSearch(courses, {
    defaultFilters: { status: 'all' }
  });
  
  // Filtering hook
  const {
    filters,
    activePreset,
    filterPresets,
    updateFilter,
    applyPreset,
    createPreset,
    exportFilters,
    importFilters
  } = useCourseFiltering({
    status: 'all',
    category: 'all'
  });
  
  // Handle tab change
  const handleTabChange = useCallback((event, newValue) => {
    setSelectedTab(newValue);
  }, []);
  
  // Handle view mode toggle
  const handleViewModeToggle = useCallback(() => {
    setViewMode(prev => prev === 'grid' ? 'list' : 'grid');
  }, []);
  
  // Handle filters toggle
  const handleFiltersToggle = useCallback(() => {
    setShowFilters(prev => !prev);
  }, []);
  
  // Handle course creation
  const handleCreateCourse = useCallback(async (courseData) => {
    try {
      await createCourse(courseData);
      // Refresh the course list
      await refreshCourses();
    } catch (error) {
      console.error('Failed to create course:', error);
    }
  }, [createCourse, refreshCourses]);
  
  // Handle course editing
  const handleEditCourse = useCallback(async (course) => {
    // Navigate to course edit page or open edit dialog
    console.log('Edit course:', course);
  }, []);
  
  // Handle course deletion
  const handleDeleteCourse = useCallback(async (courseId) => {
    if (window.confirm('Are you sure you want to delete this course? This action cannot be undone.')) {
      try {
        await deleteCourse(courseId);
        // Course list will be automatically updated
      } catch (error) {
        console.error('Failed to delete course:', error);
      }
    }
  }, [deleteCourse]);
  
  // Handle course approval
  const handleApproveCourse = useCallback(async (courseId) => {
    try {
      await updateCourse(courseId, { status: 'active' });
      // Course list will be automatically updated
    } catch (error) {
      console.error('Failed to approve course:', error);
    }
  }, [updateCourse]);
  
  // Handle course blocking
  const handleBlockCourse = useCallback(async (courseId) => {
    try {
      await updateCourse(courseId, { status: 'blocked' });
      // Course list will be automatically updated
    } catch (error) {
      console.error('Failed to block course:', error);
    }
  }, [updateCourse]);
  
  // Handle course click
  const handleCourseClick = useCallback((course) => {
    // Navigate to course detail page
    console.log('View course:', course);
  }, []);
  
  // Handle filter changes
  const handleFilterUpdate = useCallback((filterType, value) => {
    updateFilter(filterType, value);
    handleFilterChange(filterType, value);
  }, [updateFilter, handleFilterChange]);
  
  // Handle search
  const handleSearchSubmit = useCallback((query) => {
    handleSearch(query);
  }, [handleSearch]);
  
  // Handle load more
  const handleLoadMore = useCallback(() => {
    loadMore();
  }, [loadMore]);
  
  // Handle page change
  const handleChangePage = useCallback((event, newPage) => {
    setPage(newPage);
  }, []);
  
  // Handle rows per page change
  const handleChangeRowsPerPage = useCallback((event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }, []);
  
  // Check permissions
  if (!isAdmin) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">
          Access denied. This page is only available for administrators.
        </Alert>
      </Box>
    );
  }
  
  if (loading && !courses.length) {
    return <Loading />;
  }
  
  // Calculate statistics
  const stats = {
    total: courses.length,
    active: courses.filter(c => c.status === 'active').length,
    draft: courses.filter(c => c.status === 'draft').length,
    pending: courses.filter(c => c.status === 'pending').length,
    blocked: courses.filter(c => c.status === 'blocked').length,
    totalStudents: courses.reduce((total, c) => total + (c.studentCount || 0), 0),
    totalRevenue: courses.reduce((total, c) => total + (c.price || 0) * (c.studentCount || 0), 0)
  };
  
  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Admin Course Management
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Oversee all courses, manage instructors, and monitor platform performance
        </Typography>
      </Box>
      
      {/* Stats Overview */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h4" color="primary">
              {stats.total}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total Courses
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h4" color="success.main">
              {stats.active}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Active Courses
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h4" color="warning.main">
              {stats.pending}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Pending Review
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h4" color="info.main">
              {stats.totalStudents}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total Students
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      
      {/* Action Bar */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          {/* Left side - Actions */}
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => {/* Open create course dialog */}}
            >
              Create Course
            </Button>
            
            <Button
              variant="outlined"
              startIcon={<AnalyticsIcon />}
              onClick={() => setShowAnalytics(true)}
            >
              Analytics
            </Button>
            
            <Button
              variant="outlined"
              startIcon={<SettingsIcon />}
              onClick={() => {/* Open settings dialog */}}
            >
              Settings
            </Button>
            
            <Button
              variant="outlined"
              startIcon={<UploadIcon />}
              onClick={() => document.getElementById('import-courses').click()}
            >
              Import
            </Button>
            
            <Button
              variant="outlined"
              startIcon={<DownloadIcon />}
              onClick={() => exportFilters()}
            >
              Export
            </Button>
            
            <input
              id="import-courses"
              type="file"
              accept=".json"
              style={{ display: 'none' }}
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  importFilters(file);
                }
              }}
            />
          </Box>
          
          {/* Right side - Controls */}
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <Tooltip title="Toggle filters">
              <IconButton
                onClick={handleFiltersToggle}
                color={showFilters ? 'primary' : 'default'}
              >
                <FilterIcon />
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Toggle view mode">
              <IconButton onClick={handleViewModeToggle}>
                {viewMode === 'grid' ? <ListIcon /> : <GridIcon />}
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Refresh">
              <IconButton onClick={refreshCourses}>
                <RefreshIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Paper>
      
      {/* Main Content */}
      <Grid container spacing={3}>
        {/* Left Sidebar - Filters */}
        <Grid item xs={12} md={3}>
          <Collapse in={showFilters}>
            <Paper sx={{ p: 2, mb: 2 }}>
              <CourseFilters
                filters={filters}
                onFilterChange={handleFilterUpdate}
                onClearFilters={clearFilters}
                showAdvanced={true}
                onToggleAdvanced={() => {}}
              />
            </Paper>
          </Collapse>
          
          {/* Filter Presets */}
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Quick Filters
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {Object.entries(filterPresets).map(([key, preset]) => (
                <Button
                  key={key}
                  variant={activePreset === key ? 'contained' : 'outlined'}
                  size="small"
                  onClick={() => applyPreset(key)}
                  fullWidth
                  sx={{ justifyContent: 'flex-start' }}
                >
                  {preset.name}
                </Button>
              ))}
            </Box>
          </Paper>
        </Grid>
        
        {/* Right Side - Course List */}
        <Grid item xs={12} md={9}>
          {/* Search Bar */}
          <Paper sx={{ p: 2, mb: 2 }}>
            <CourseSearch
              value={searchQuery}
              onChange={handleSearch}
              onSearch={handleSearchSubmit}
              placeholder="Search all courses..."
              showAdvanced={false}
              filters={searchFilters}
              onFilterChange={handleFilterChange}
              onClearFilters={clearFilters}
            />
          </Paper>
          
          {/* Search Results Summary */}
          {searchStats.totalCourses > 0 && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Showing {searchStats.filteredCourses} of {searchStats.totalCourses} courses
                {searchStats.activeFilters > 0 && ` (${searchStats.activeFilters} filters applied)`}
              </Typography>
            </Box>
          )}
          
          {/* Course List */}
          <CourseList
            courses={courses}
            loading={loading}
            error={error}
            role="admin"
            onCourseClick={handleCourseClick}
            onCourseEdit={handleEditCourse}
            onCourseDelete={handleDeleteCourse}
            viewMode={viewMode}
            emptyMessage="No courses found"
            emptySubMessage="No courses match the current filters"
          />
          
          {/* Load More Button */}
          {pagination.hasMore && (
            <Box sx={{ textAlign: 'center', mt: 3 }}>
              <Button
                variant="outlined"
                onClick={handleLoadMore}
                disabled={loading}
              >
                Load More Courses
              </Button>
            </Box>
          )}
        </Grid>
      </Grid>
      
      {/* Analytics Dialog */}
      <Dialog
        open={showAnalytics}
        onClose={() => setShowAnalytics(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>Course Analytics</DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Course Status Distribution
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography>Active</Typography>
                    <Chip label={stats.active} color="success" size="small" />
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography>Draft</Typography>
                    <Chip label={stats.draft} color="warning" size="small" />
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography>Pending</Typography>
                    <Chip label={stats.pending} color="info" size="small" />
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography>Blocked</Typography>
                    <Chip label={stats.blocked} color="error" size="small" />
                  </Box>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Platform Statistics
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography>Total Students</Typography>
                    <Typography variant="h6">{stats.totalStudents}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography>Total Revenue</Typography>
                    <Typography variant="h6">${stats.totalRevenue}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography>Avg. Students/Course</Typography>
                    <Typography variant="h6">
                      {stats.total > 0 ? Math.round(stats.totalStudents / stats.total) : 0}
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowAnalytics(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminCourseManagement;
