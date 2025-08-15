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
  Collapse
} from '@mui/material';
import { 
  Add as AddIcon,
  ViewList as ListIcon,
  ViewModule as GridIcon,
  FilterList as FilterIcon,
  Search as SearchIcon,
  Refresh as RefreshIcon,
  Download as DownloadIcon,
  Upload as UploadIcon
} from '@mui/icons-material';
import { usePermissions } from '../../../hooks/usePermissions';
import { useCourseData } from '../../../hooks/useCourseData';
import { useCourseSearch } from '../../../hooks/useCourseSearch';
import { useCourseFiltering } from '../../../hooks/useCourseFiltering';
import CourseList from '../../../components/courses/CourseList';
import CourseSearch from '../../../components/courses/CourseSearch';
import CourseFilters from '../../../components/courses/CourseFilters';
import Loading from '../../../components/common/Loading';

const InstructorCourseManagement = () => {
  const { isInstructor } = usePermissions();
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  
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
  } = useCourseData('instructor', { limit: 20 });
  
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
    defaultFilters: { status: 'active' }
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
    status: 'active',
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
      setShowCreateDialog(false);
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
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await deleteCourse(courseId);
        // Course list will be automatically updated
      } catch (error) {
        console.error('Failed to delete course:', error);
      }
    }
  }, [deleteCourse]);
  
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
  
  // Check permissions
  if (!isInstructor) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">
          Access denied. This page is only available for instructors.
        </Alert>
      </Box>
    );
  }
  
  if (loading && !courses.length) {
    return <Loading />;
  }
  
  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Course Management
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage your courses, create new content, and track student progress
        </Typography>
      </Box>
      
      {/* Stats Overview */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h4" color="primary">
              {courses.length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total Courses
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h4" color="success.main">
              {courses.filter(c => c.status === 'active').length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Active Courses
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h4" color="warning.main">
              {courses.filter(c => c.status === 'draft').length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Draft Courses
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h4" color="info.main">
              {courses.reduce((total, c) => total + (c.studentCount || 0), 0)}
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
              onClick={() => setShowCreateDialog(true)}
            >
              Create Course
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
              placeholder="Search your courses..."
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
            role="instructor"
            onCourseClick={handleCourseClick}
            onCourseEdit={handleEditCourse}
            onCourseDelete={handleDeleteCourse}
            viewMode={viewMode}
            emptyMessage="No courses found"
            emptySubMessage="Create your first course to get started"
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
      
      {/* Create Course Dialog */}
      <Dialog
        open={showCreateDialog}
        onClose={() => setShowCreateDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Create New Course</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary">
            Course creation form will be implemented here
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowCreateDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => handleCreateCourse({})}>
            Create Course
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default InstructorCourseManagement;
