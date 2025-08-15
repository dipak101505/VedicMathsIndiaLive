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
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Divider
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
  Person as PersonIcon,
  ChildCare as ChildIcon,
  Assessment as AssessmentIcon,
  Notifications as NotificationsIcon
} from '@mui/icons-material';
import { usePermissions } from '../../../hooks/usePermissions';
import { useCourseData } from '../../../hooks/useCourseData';
import { useCourseSearch } from '../../../hooks/useCourseSearch';
import { useCourseFiltering } from '../../../hooks/useCourseFiltering';
import CourseList from '../../../components/courses/CourseList';
import CourseSearch from '../../../components/courses/CourseSearch';
import CourseFilters from '../../../components/courses/CourseFilters';
import Loading from '../../../components/common/Loading';

const ParentDashboard = () => {
  const { isParent } = usePermissions();
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedChild, setSelectedChild] = useState(null);
  const [showChildSelector, setShowChildSelector] = useState(false);
  
  // Mock children data - in real app, this would come from user context
  const children = [
    { id: 1, name: 'Alex Johnson', age: 12, grade: '7th Grade', avatar: 'A' },
    { id: 2, name: 'Sarah Johnson', age: 15, grade: '10th Grade', avatar: 'S' }
  ];
  
  // Course data hook for children's courses
  const {
    courses: childrenCourses,
    loading: childrenLoading,
    error: childrenError,
    pagination: childrenPagination,
    refreshCourses: refreshChildren,
    loadMore: loadMoreChildren
  } = useCourseData('parent', { limit: 20 });
  
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
  
  // Handle child selection
  const handleChildSelect = useCallback((child) => {
    setSelectedChild(child);
    setShowChildSelector(false);
  }, []);
  
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
  
  // Handle load more for children's courses
  const handleLoadMoreChildren = useCallback(() => {
    loadMoreChildren();
  }, [loadMoreChildren]);
  
  // Handle load more for available courses
  const handleLoadMoreAvailable = useCallback(() => {
    loadMoreAvailable();
  }, [loadMoreAvailable]);
  
  // Check permissions
  if (!isParent) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">
          Access denied. This page is only available for parents.
        </Alert>
      </Box>
    );
  }
  
  if (childrenLoading && !childrenCourses.length) {
    return <Loading />;
  }
  
  // Calculate statistics for selected child or all children
  const getChildStats = (childId = null) => {
    const courses = childId 
      ? childrenCourses.filter(c => c.studentId === childId)
      : childrenCourses;
    
    return {
      enrolled: courses.length,
      completed: courses.filter(c => c.progress === 100).length,
      inProgress: courses.filter(c => c.progress > 0 && c.progress < 100).length,
      notStarted: courses.filter(c => c.progress === 0).length,
      totalProgress: courses.length > 0 
        ? Math.round(courses.reduce((sum, c) => sum + (c.progress || 0), 0) / courses.length)
        : 0,
      totalHours: courses.reduce((sum, c) => sum + (c.completedHours || 0), 0),
      averageGrade: courses.length > 0 
        ? Math.round(courses.reduce((sum, c) => sum + (c.grade || 0), 0) / courses.length)
        : 0
    };
  };
  
  const stats = getChildStats(selectedChild?.id);
  
  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Parent Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Monitor your children's learning progress and discover new educational opportunities
        </Typography>
      </Box>
      
      {/* Child Selector */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <ChildIcon color="primary" />
            <Box>
              <Typography variant="h6">
                {selectedChild ? `${selectedChild.name}'s Learning` : 'Select a Child'}
              </Typography>
              {selectedChild && (
                <Typography variant="body2" color="text.secondary">
                  {selectedChild.grade} • Age {selectedChild.age}
                </Typography>
              )}
            </Box>
          </Box>
          
          <Button
            variant="outlined"
            onClick={() => setShowChildSelector(true)}
            startIcon={<PersonIcon />}
          >
            {selectedChild ? 'Change Child' : 'Select Child'}
          </Button>
        </Box>
      </Paper>
      
      {/* Progress Overview */}
      {selectedChild && (
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
                {stats.totalProgress}%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Overall Progress
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h4" color="info.main">
                {stats.averageGrade}%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Average Grade
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      )}
      
      {/* Action Bar */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          {/* Left side - Actions */}
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Button
              variant="outlined"
              startIcon={<AssessmentIcon />}
              onClick={() => {/* Navigate to detailed reports */}}
            >
              Detailed Reports
            </Button>
            
            <Button
              variant="outlined"
              startIcon={<NotificationsIcon />}
              onClick={() => {/* Navigate to notifications */}}
            >
              Notifications
            </Button>
            
            <Button
              variant="outlined"
              startIcon={<ScheduleIcon />}
              onClick={() => {/* Navigate to schedule */}}
            >
              Learning Schedule
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
              <IconButton onClick={() => { refreshChildren(); refreshAvailable(); }}>
                <RefreshIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Paper>
      
      {/* Main Content with Tabs */}
      <Paper sx={{ mb: 3 }}>
        <Tabs value={selectedTab} onChange={handleTabChange} sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tab label={`${selectedChild ? selectedChild.name + "'s" : 'Children\'s'} Courses (${childrenCourses.length})`} />
          <Tab label="Discover Courses" />
          <Tab label="Learning Analytics" />
        </Tabs>
        
        {/* Tab Content */}
        <Box sx={{ p: 3 }}>
          {/* Tab 1: Children's Courses */}
          {selectedTab === 0 && (
            <Box>
              {!selectedChild ? (
                <Alert severity="info" sx={{ mb: 2 }}>
                  Please select a child to view their course progress.
                </Alert>
              ) : (
                <>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="h6" gutterBottom>
                      {selectedChild.name}'s Enrolled Courses
                    </Typography>
                    {childrenCourses.length === 0 && (
                      <Alert severity="info">
                        {selectedChild.name} hasn't enrolled in any courses yet. Start exploring courses in the Discover tab!
                      </Alert>
                    )}
                  </Box>
                  
                  {childrenCourses.length > 0 && (
                    <CourseList
                      courses={childrenCourses}
                      loading={childrenLoading}
                      error={childrenError}
                      role="student"
                      onCourseClick={handleCourseClick}
                      viewMode={viewMode}
                      emptyMessage="No enrolled courses"
                      emptySubMessage="Start exploring courses to begin the learning journey"
                    />
                  )}
                  
                  {/* Load More Button for Children's Courses */}
                  {childrenPagination.hasMore && (
                    <Box sx={{ textAlign: 'center', mt: 3 }}>
                      <Button
                        variant="outlined"
                        onClick={handleLoadMoreChildren}
                        disabled={childrenLoading}
                      >
                        Load More Courses
                      </Button>
                    </Box>
                  )}
                </>
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
                  Explore courses that might be suitable for your children's learning journey
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
          
          {/* Tab 3: Learning Analytics */}
          {selectedTab === 2 && (
            <Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Learning Analytics
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Track your children's learning progress and achievements
                </Typography>
              </Box>
              
              {!selectedChild ? (
                <Alert severity="info">
                  Please select a child to view their learning analytics.
                </Alert>
              ) : (
                <Grid container spacing={3}>
                  {/* Progress Chart */}
                  <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2 }}>
                      <Typography variant="h6" gutterBottom>
                        Course Progress
                      </Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Box>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Typography variant="body2">Overall Progress</Typography>
                            <Typography variant="body2" color="primary">
                              {stats.totalProgress}%
                            </Typography>
                          </Box>
                          <LinearProgress
                            variant="determinate"
                            value={stats.totalProgress}
                            sx={{ height: 8, borderRadius: 4 }}
                          />
                        </Box>
                        
                        <Box>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Typography variant="body2">Completed Courses</Typography>
                            <Typography variant="body2" color="success.main">
                              {stats.completed} / {stats.enrolled}
                            </Typography>
                          </Box>
                          <LinearProgress
                            variant="determinate"
                            value={stats.enrolled > 0 ? (stats.completed / stats.enrolled) * 100 : 0}
                            sx={{ height: 8, borderRadius: 4 }}
                            color="success"
                          />
                        </Box>
                      </Box>
                    </Paper>
                  </Grid>
                  
                  {/* Learning Stats */}
                  <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2 }}>
                      <Typography variant="h6" gutterBottom>
                        Learning Statistics
                      </Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Typography variant="body2">Total Learning Hours</Typography>
                          <Typography variant="h6">{stats.totalHours}h</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Typography variant="body2">Average Grade</Typography>
                          <Typography variant="h6">{stats.averageGrade}%</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Typography variant="body2">Courses in Progress</Typography>
                          <Typography variant="h6">{stats.inProgress}</Typography>
                        </Box>
                      </Box>
                    </Paper>
                  </Grid>
                </Grid>
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
      
      {/* Child Selector Dialog */}
      <Dialog
        open={showChildSelector}
        onClose={() => setShowChildSelector(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Select a Child</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Choose which child's learning progress you'd like to view:
          </Typography>
          
          <List>
            {children.map((child, index) => (
              <React.Fragment key={child.id}>
                <ListItem
                  button
                  onClick={() => handleChildSelect(child)}
                  sx={{ borderRadius: 2, mb: 1 }}
                >
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                      {child.avatar}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={child.name}
                    secondary={`${child.grade} • Age ${child.age}`}
                  />
                  {selectedChild?.id === child.id && (
                    <Chip label="Selected" color="primary" size="small" />
                  )}
                </ListItem>
                {index < children.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowChildSelector(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ParentDashboard;
