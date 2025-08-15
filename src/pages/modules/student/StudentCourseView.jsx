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
  LinearProgress,
  Avatar
} from '@mui/material';
import { 
  ViewList as ListIcon,
  ViewModule as GridIcon,
  FilterList as FilterIcon,
  Search as SearchIcon,
  Refresh as RefreshIcon,
  School as SchoolIcon,
  TrendingUp as TrendingUpIcon,
  Star as StarIcon,
  Schedule as ScheduleIcon,
  Person as PersonIcon
} from '@mui/icons-material';
import { usePermissions } from '../../../hooks/usePermissions';
import { useCourseData } from '../../../hooks/useCourseData';
import { useCourseSearch } from '../../../hooks/useCourseSearch';
import { useCourseFiltering } from '../../../hooks/useCourseFiltering';
import CourseList from '../../../components/courses/CourseList';
import CourseSearch from '../../../components/courses/CourseSearch';
import CourseFilters from '../../../components/courses/CourseFilters';
import Loading from '../../../components/common/Loading';

const StudentCourseView = () => {
  const { isStudent } = usePermissions();
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [enrollmentDialog, setEnrollmentDialog] = useState({ open: false, course: null });
  
  // Course data hook for enrolled courses
  const {
    courses: enrolledCourses,
    loading: enrolledLoading,
    error: enrolledError,
    pagination: enrolledPagination,
    refreshCourses: refreshEnrolled,
    loadMore: loadMoreEnrolled,
    enrollInCourse
  } = useCourseData('student', { limit: 20 });
  
  // Course data hook for available courses
  const {
    courses: availableCourses,
    loading: availableLoading,
    error: availableError,
    pagination: availablePagination,
    refreshCourses: refreshAvailable,
    loadMore: loadMoreAvailable
  } = useCourseData('public', { limit: 20 });
  
  // Search hook for available courses
  const {
    searchQuery,
    searchFilters,
    handleSearch,
    handleFilterChange,
    clearFilters,
    resetSearch,
    searchStats
  } = useCourseSearch(availableCourses, {
    defaultFilters: { status: 'active' }
  });
  
  // Filtering hook
  const {
    filters,
    activePreset,
    filterPresets,
    updateFilter,
    applyPreset,
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
  
  // Handle course enrollment
  const handleEnrollCourse = useCallback(async (course) => {
    try {
      await enrollInCourse(course.id);
      setEnrollmentDialog({ open: false, course: null });
      // Refresh both course lists
      await refreshEnrolled();
      await refreshAvailable();
    } catch (error) {
      console.error('Failed to enroll in course:', error);
    }
  }, [enrollInCourse, refreshEnrolled, refreshAvailable]);
  
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
  
  // Handle load more for enrolled courses
  const handleLoadMoreEnrolled = useCallback(() => {
    loadMoreEnrolled();
  }, [loadMoreEnrolled]);
  
  // Handle load more for available courses
  const handleLoadMoreAvailable = useCallback(() => {
    loadMoreAvailable();
  }, [loadMoreAvailable]);
  
  // Check permissions
  if (!isStudent) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">
          Access denied. This page is only available for students.
        </Alert>
      </Box>
    );
  }
  
  if (enrolledLoading && !enrolledCourses.length) {
    return <Loading />;
  }
  
  // Calculate statistics
  const stats = {
    enrolled: enrolledCourses.length,
    completed: enrolledCourses.filter(c => c.progress === 100).length,
    inProgress: enrolledCourses.filter(c => c.progress > 0 && c.progress < 100).length,
    notStarted: enrolledCourses.filter(c => c.progress === 0).length,
    totalProgress: enrolledCourses.length > 0 
      ? Math.round(enrolledCourses.reduce((sum, c) => sum + (c.progress || 0), 0) / enrolledCourses.length)
      : 0
  };
  
  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          My Learning
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Discover new courses, track your progress, and continue learning
        </Typography>
      </Box>
      
      {/* Progress Overview */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h4" color="primary">
              {stats.enrolled}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Enrolled Courses
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h4" color="success.main">
              {stats.completed}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Completed
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h4" color="warning.main">
              {stats.inProgress}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              In Progress
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h4" color="info.main">
              {stats.totalProgress}%
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Overall Progress
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
              variant="outlined"
              startIcon={<SchoolIcon />}
              onClick={() => {/* Navigate to learning path */}}
            >
              Learning Paths
            </Button>
            
            <Button
              variant="outlined"
              startIcon={<TrendingUpIcon />}
              onClick={() => {/* Navigate to achievements */}}
            >
              Achievements
            </Button>
            
            <Button
              variant="outlined"
              startIcon={<ScheduleIcon />}
              onClick={() => {/* Navigate to schedule */}}
            >
              My Schedule
            </Button>
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
              <IconButton onClick={() => { refreshEnrolled(); refreshAvailable(); }}>
                <RefreshIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Paper>
      
      {/* Main Content with Tabs */}
      <Paper sx={{ mb: 3 }}>
        <Tabs value={selectedTab} onChange={handleTabChange} sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tab label={`My Courses (${enrolledCourses.length})`} />
          <Tab label="Discover Courses" />
        </Tabs>
        
        {/* Tab Content */}
        <Box sx={{ p: 3 }}>
          {/* Tab 1: My Courses */}
          {selectedTab === 0 && (
            <Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="h6" gutterBottom>
                  My Enrolled Courses
                </Typography>
                {enrolledCourses.length === 0 && (
                  <Alert severity="info">
                    You haven't enrolled in any courses yet. Start exploring courses in the Discover tab!
                  </Alert>
                )}
              </Box>
              
              {enrolledCourses.length > 0 && (
                <CourseList
                  courses={enrolledCourses}
                  loading={enrolledLoading}
                  error={enrolledError}
                  role="student"
                  onCourseClick={handleCourseClick}
                  viewMode={viewMode}
                  emptyMessage="No enrolled courses"
                  emptySubMessage="Start exploring courses to begin your learning journey"
                />
              )}
              
              {/* Load More Button for Enrolled */}
              {enrolledPagination.hasMore && (
                <Box sx={{ textAlign: 'center', mt: 3 }}>
                  <Button
                    variant="outlined"
                    onClick={handleLoadMoreEnrolled}
                    disabled={enrolledLoading}
                  >
                    Load More Courses
                  </Button>
                </Box>
              )}
            </Box>
          )}
          
          {/* Tab 2: Discover Courses */}
          {selectedTab === 1 && (
            <Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Discover New Courses
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Explore courses from top instructors and find your next learning opportunity
                </Typography>
              </Box>
              
              {/* Search Bar */}
              <Paper sx={{ p: 2, mb: 2 }}>
                <CourseSearch
                  value={searchQuery}
                  onChange={handleSearch}
                  onSearch={handleSearchSubmit}
                  placeholder="Search for courses..."
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
              
              {/* Available Courses List */}
              <CourseList
                courses={availableCourses}
                loading={availableLoading}
                error={availableError}
                role="student"
                onCourseClick={handleCourseClick}
                viewMode={viewMode}
                emptyMessage="No courses found"
                emptySubMessage="Try adjusting your search criteria or filters"
              />
              
              {/* Load More Button for Available */}
              {availablePagination.hasMore && (
                <Box sx={{ textAlign: 'center', mt: 3 }}>
                  <Button
                    variant="outlined"
                    onClick={handleLoadMoreAvailable}
                    disabled={availableLoading}
                  >
                    Load More Courses
                  </Button>
                </Box>
              )}
            </Box>
          )}
        </Box>
      </Paper>
      
      {/* Filters Sidebar */}
      <Collapse in={showFilters}>
        <Paper sx={{ p: 2, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Advanced Filters
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <CourseFilters
                filters={filters}
                onFilterChange={handleFilterUpdate}
                onClearFilters={clearFilters}
                showAdvanced={false}
                onToggleAdvanced={() => {}}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              {/* Filter Presets */}
              <Box>
                <Typography variant="subtitle2" gutterBottom>
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
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Collapse>
      
      {/* Enrollment Confirmation Dialog */}
      <Dialog
        open={enrollmentDialog.open}
        onClose={() => setEnrollmentDialog({ open: false, course: null })}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Enroll in Course</DialogTitle>
        <DialogContent>
          {enrollmentDialog.course && (
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Avatar sx={{ bgcolor: 'primary.main' }}>
                  <SchoolIcon />
                </Avatar>
                <Box>
                  <Typography variant="h6">{enrollmentDialog.course.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    by {enrollmentDialog.course.instructor}
                  </Typography>
                </Box>
              </Box>
              
              <Typography variant="body2" sx={{ mb: 2 }}>
                {enrollmentDialog.course.description}
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <Chip
                  label={enrollmentDialog.course.difficulty}
                  color="primary"
                  variant="outlined"
                  size="small"
                />
                <Chip
                  label={enrollmentDialog.course.duration}
                  color="secondary"
                  variant="outlined"
                  size="small"
                />
                <Chip
                  label={enrollmentDialog.course.price === 0 ? 'Free' : `$${enrollmentDialog.course.price}`}
                  color="success"
                  variant="outlined"
                  size="small"
                />
              </Box>
              
              <Typography variant="body2" color="text.secondary">
                Are you sure you want to enroll in this course?
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEnrollmentDialog({ open: false, course: null })}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => handleEnrollCourse(enrollmentDialog.course)}
            disabled={!enrollmentDialog.course}
          >
            Enroll Now
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default StudentCourseView;
