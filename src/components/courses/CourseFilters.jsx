import React from 'react';
import { 
  Box, 
  Typography, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem,
  Chip,
  Button,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Slider,
  FormControlLabel,
  Checkbox,
  Radio,
  RadioGroup
} from '@mui/material';
import { 
  FilterList as FilterIcon,
  Clear as ClearIcon,
  ExpandMore as ExpandMoreIcon
} from '@mui/icons-material';

const CourseFilters = ({ 
  filters = {},
  onFilterChange,
  onClearFilters,
  onApplyFilters,
  showAdvanced = false,
  onToggleAdvanced,
  className,
  sx
}) => {
  const handleFilterChange = (filterType, value) => {
    onFilterChange?.(filterType, value);
  };
  
  const handleClearFilters = () => {
    onClearFilters?.();
  };
  
  const handleApplyFilters = () => {
    onApplyFilters?.();
  };
  
  const hasActiveFilters = Object.values(filters).some(filter => 
    filter && filter !== 'all' && filter !== '' && filter !== 0
  );
  
  const getActiveFilterCount = () => {
    return Object.values(filters).filter(filter => 
      filter && filter !== 'all' && filter !== '' && filter !== 0
    ).length;
  };
  
  return (
    <Box className={className} sx={sx}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <FilterIcon color="primary" />
          <Typography variant="h6" component="h3">
            Filters
          </Typography>
          {hasActiveFilters && (
            <Chip
              label={getActiveFilterCount()}
              size="small"
              color="primary"
              variant="filled"
            />
          )}
        </Box>
        {hasActiveFilters && (
          <Button
            size="small"
            variant="outlined"
            startIcon={<ClearIcon />}
            onClick={handleClearFilters}
          >
            Clear All
          </Button>
        )}
      </Box>
      
      {/* Basic Filters */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {/* Category Filter */}
        <FormControl fullWidth size="small">
          <InputLabel>Category</InputLabel>
          <Select
            value={filters.category || 'all'}
            label="Category"
            onChange={(e) => handleFilterChange('category', e.target.value)}
          >
            <MenuItem value="all">All Categories</MenuItem>
            <MenuItem value="mathematics">Mathematics</MenuItem>
            <MenuItem value="physics">Physics</MenuItem>
            <MenuItem value="chemistry">Chemistry</MenuItem>
            <MenuItem value="biology">Biology</MenuItem>
            <MenuItem value="computer-science">Computer Science</MenuItem>
            <MenuItem value="english">English</MenuItem>
            <MenuItem value="history">History</MenuItem>
            <MenuItem value="geography">Geography</MenuItem>
            <MenuItem value="economics">Economics</MenuItem>
            <MenuItem value="psychology">Psychology</MenuItem>
          </Select>
        </FormControl>
        
        {/* Status Filter */}
        <FormControl fullWidth size="small">
          <InputLabel>Status</InputLabel>
          <Select
            value={filters.status || 'all'}
            label="Status"
            onChange={(e) => handleFilterChange('status', e.target.value)}
          >
            <MenuItem value="all">All Status</MenuItem>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="draft">Draft</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
            <MenuItem value="archived">Archived</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
          </Select>
        </FormControl>
        
        {/* Difficulty Filter */}
        <FormControl fullWidth size="small">
          <InputLabel>Difficulty Level</InputLabel>
          <Select
            value={filters.difficulty || 'all'}
            label="Difficulty Level"
            onChange={(e) => handleFilterChange('difficulty', e.target.value)}
          >
            <MenuItem value="all">All Levels</MenuItem>
            <MenuItem value="beginner">Beginner</MenuItem>
            <MenuItem value="intermediate">Intermediate</MenuItem>
            <MenuItem value="advanced">Advanced</MenuItem>
            <MenuItem value="expert">Expert</MenuItem>
          </Select>
        </FormControl>
        
        {/* Price Range Filter */}
        <FormControl fullWidth size="small">
          <InputLabel>Price Range</InputLabel>
          <Select
            value={filters.priceRange || 'all'}
            label="Price Range"
            onChange={(e) => handleFilterChange('priceRange', e.target.value)}
          >
            <MenuItem value="all">All Prices</MenuItem>
            <MenuItem value="free">Free</MenuItem>
            <MenuItem value="paid">Paid</MenuItem>
            <MenuItem value="under-25">Under $25</MenuItem>
            <MenuItem value="25-50">$25 - $50</MenuItem>
            <MenuItem value="50-100">$50 - $100</MenuItem>
            <MenuItem value="over-100">Over $100</MenuItem>
          </Select>
        </FormControl>
        
        {/* Duration Filter */}
        <FormControl fullWidth size="small">
          <InputLabel>Duration</InputLabel>
          <Select
            value={filters.duration || 'all'}
            label="Duration"
            onChange={(e) => handleFilterChange('duration', e.target.value)}
          >
            <MenuItem value="all">All Durations</MenuItem>
            <MenuItem value="short">Short (1-5 hours)</MenuItem>
            <MenuItem value="medium">Medium (5-20 hours)</MenuItem>
            <MenuItem value="long">Long (20+ hours)</MenuItem>
            <MenuItem value="flexible">Flexible</MenuItem>
          </Select>
        </FormControl>
      </Box>
      
      <Divider sx={{ my: 2 }} />
      
      {/* Advanced Filters */}
      <Accordion 
        expanded={showAdvanced}
        onChange={onToggleAdvanced}
        sx={{ 
          boxShadow: 'none',
          '&:before': { display: 'none' },
          border: 1,
          borderColor: 'divider',
          borderRadius: 1
        }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="subtitle2">Advanced Filters</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {/* Rating Filter */}
            <Box>
              <Typography variant="caption" color="text.secondary" gutterBottom>
                Minimum Rating
              </Typography>
              <Slider
                value={filters.minRating || 0}
                onChange={(_, value) => handleFilterChange('minRating', value)}
                min={0}
                max={5}
                step={0.5}
                marks={[
                  { value: 0, label: '0' },
                  { value: 2.5, label: '2.5' },
                  { value: 5, label: '5' }
                ]}
                valueLabelDisplay="auto"
                size="small"
              />
            </Box>
            
            {/* Student Count Filter */}
            <Box>
              <Typography variant="caption" color="text.secondary" gutterBottom>
                Minimum Students
              </Typography>
              <Slider
                value={filters.minStudents || 0}
                onChange={(_, value) => handleFilterChange('minStudents', value)}
                min={0}
                max={1000}
                step={10}
                marks={[
                  { value: 0, label: '0' },
                  { value: 250, label: '250' },
                  { value: 500, label: '500' },
                  { value: 1000, label: '1000+' }
                ]}
                valueLabelDisplay="auto"
                size="small"
              />
            </Box>
            
            {/* Language Filter */}
            <FormControl fullWidth size="small">
              <InputLabel>Language</InputLabel>
              <Select
                value={filters.language || 'all'}
                label="Language"
                onChange={(e) => handleFilterChange('language', e.target.value)}
              >
                <MenuItem value="all">All Languages</MenuItem>
                <MenuItem value="english">English</MenuItem>
                <MenuItem value="hindi">Hindi</MenuItem>
                <MenuItem value="spanish">Spanish</MenuItem>
                <MenuItem value="french">French</MenuItem>
                <MenuItem value="german">German</MenuItem>
                <MenuItem value="chinese">Chinese</MenuItem>
                <MenuItem value="japanese">Japanese</MenuItem>
              </Select>
            </FormControl>
            
            {/* Format Filter */}
            <Box>
              <Typography variant="caption" color="text.secondary" gutterBottom>
                Course Format
              </Typography>
              <RadioGroup
                value={filters.format || 'all'}
                onChange={(e) => handleFilterChange('format', e.target.value)}
              >
                <FormControlLabel value="all" control={<Radio size="small" />} label="All Formats" />
                <FormControlLabel value="video" control={<Radio size="small" />} label="Video-based" />
                <FormControlLabel value="interactive" control={<Radio size="small" />} label="Interactive" />
                <FormControlLabel value="text" control={<Radio size="small" />} label="Text-based" />
                <FormControlLabel value="mixed" control={<Radio size="small" />} label="Mixed Media" />
              </RadioGroup>
            </Box>
            
            {/* Features Filter */}
            <Box>
              <Typography variant="caption" color="text.secondary" gutterBottom>
                Course Features
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      checked={filters.hasCertificate || false}
                      onChange={(e) => handleFilterChange('hasCertificate', e.target.checked)}
                    />
                  }
                  label="Certificate of Completion"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      checked={filters.hasQuizzes || false}
                      onChange={(e) => handleFilterChange('hasQuizzes', e.target.checked)}
                    />
                  }
                  label="Quizzes & Assessments"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      checked={filters.hasProjects || false}
                      onChange={(e) => handleFilterChange('hasProjects', e.target.checked)}
                    />
                  }
                  label="Hands-on Projects"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      checked={filters.hasSupport || false}
                      onChange={(e) => handleFilterChange('hasSupport', e.target.checked)}
                    />
                  }
                  label="Instructor Support"
                />
              </Box>
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>
      
      {/* Sort Options */}
      <Divider sx={{ my: 2 }} />
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>
          Sort By
        </Typography>
        <FormControl fullWidth size="small">
          <InputLabel>Sort Order</InputLabel>
          <Select
            value={filters.sortBy || 'relevance'}
            label="Sort Order"
            onChange={(e) => handleFilterChange('sortBy', e.target.value)}
          >
            <MenuItem value="relevance">Relevance</MenuItem>
            <MenuItem value="title">Title (A-Z)</MenuItem>
            <MenuItem value="title-desc">Title (Z-A)</MenuItem>
            <MenuItem value="newest">Newest First</MenuItem>
            <MenuItem value="oldest">Oldest First</MenuItem>
            <MenuItem value="rating">Highest Rated</MenuItem>
            <MenuItem value="students">Most Popular</MenuItem>
            <MenuItem value="price-low">Price (Low to High)</MenuItem>
            <MenuItem value="price-high">Price (High to Low)</MenuItem>
            <MenuItem value="duration">Duration (Short to Long)</MenuItem>
          </Select>
        </FormControl>
      </Box>
      
      {/* Apply Filters Button */}
      {hasActiveFilters && (
        <Box sx={{ mt: 3 }}>
          <Button
            fullWidth
            variant="contained"
            onClick={handleApplyFilters}
            size="medium"
          >
            Apply Filters ({getActiveFilterCount()})
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default CourseFilters;
