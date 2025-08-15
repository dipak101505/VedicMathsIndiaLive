import React, { useState, useCallback } from 'react';
import { 
  Box, 
  TextField, 
  InputAdornment, 
  IconButton, 
  Chip,
  Collapse,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Typography
} from '@mui/material';
import { 
  Search as SearchIcon, 
  Clear as ClearIcon,
  Tune as TuneIcon,
  Close as CloseIcon
} from '@mui/icons-material';

const CourseSearch = ({ 
  value = '',
  onChange,
  onSearch,
  placeholder = 'Search courses...',
  showAdvanced = false,
  onToggleAdvanced,
  filters = {},
  onFilterChange,
  onClearFilters,
  searchHistory = [],
  onHistoryItemClick,
  className,
  sx
}) => {
  const [localValue, setLocalValue] = useState(value);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const handleInputChange = useCallback((event) => {
    const newValue = event.target.value;
    setLocalValue(newValue);
    onChange?.(newValue);
    
    if (newValue.length > 0) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [onChange]);
  
  const handleClear = useCallback(() => {
    setLocalValue('');
    onChange?.('');
    setShowSuggestions(false);
  }, [onChange]);
  
  const handleSearch = useCallback(() => {
    onSearch?.(localValue);
    setShowSuggestions(false);
  }, [onSearch, localValue]);
  
  const handleKeyPress = useCallback((event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  }, [handleSearch]);
  
  const handleHistoryItemClick = useCallback((historyItem) => {
    setLocalValue(historyItem);
    onChange?.(historyItem);
    onHistoryItemClick?.(historyItem);
    setShowSuggestions(false);
  }, [onChange, onHistoryItemClick]);
  
  const handleFilterChange = useCallback((filterType, filterValue) => {
    onFilterChange?.(filterType, filterValue);
  }, [onFilterChange]);
  
  const hasActiveFilters = Object.values(filters).some(filter => 
    filter && filter !== 'all' && filter !== ''
  );
  
  return (
    <Box className={className} sx={sx}>
      {/* Main Search Input */}
      <Box sx={{ position: 'relative' }}>
        <TextField
          fullWidth
          value={localValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          variant="outlined"
          size="medium"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                {localValue && (
                  <IconButton
                    size="small"
                    onClick={handleClear}
                    edge="end"
                  >
                    <ClearIcon />
                  </IconButton>
                )}
                {onToggleAdvanced && (
                  <IconButton
                    size="small"
                    onClick={onToggleAdvanced}
                    color={showAdvanced ? 'primary' : 'default'}
                    edge="end"
                  >
                    <TuneIcon />
                  </IconButton>
                )}
              </InputAdornment>
            )
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
              backgroundColor: 'background.paper'
            }
          }}
        />
        
        {/* Search Suggestions */}
        <Collapse in={showSuggestions && (localValue.length > 0 || searchHistory.length > 0)}>
          <Box sx={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            zIndex: 1000,
            backgroundColor: 'background.paper',
            border: 1,
            borderColor: 'divider',
            borderRadius: 1,
            mt: 1,
            boxShadow: 3,
            maxHeight: 300,
            overflow: 'auto'
          }}>
            {/* Search History */}
            {searchHistory.length > 0 && (
              <Box sx={{ p: 1 }}>
                <Typography variant="caption" color="text.secondary" sx={{ px: 1, py: 0.5 }}>
                  Recent searches
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 0.5 }}>
                  {searchHistory.slice(0, 5).map((historyItem, index) => (
                    <Chip
                      key={index}
                      label={historyItem}
                      size="small"
                      variant="outlined"
                      onClick={() => handleHistoryItemClick(historyItem)}
                      sx={{ cursor: 'pointer' }}
                    />
                  ))}
                </Box>
              </Box>
            )}
            
            {/* Quick Search Suggestions */}
            {localValue.length > 0 && (
              <Box sx={{ p: 1, borderTop: searchHistory.length > 0 ? 1 : 0, borderColor: 'divider' }}>
                <Typography variant="caption" color="text.secondary" sx={{ px: 1, py: 0.5 }}>
                  Quick search
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 0.5 }}>
                  <Chip
                    label={`"${localValue}" in title`}
                    size="small"
                    variant="outlined"
                    onClick={() => handleSearch()}
                    sx={{ cursor: 'pointer' }}
                  />
                  <Chip
                    label={`"${localValue}" in description`}
                    size="small"
                    variant="outlined"
                    onClick={() => handleSearch()}
                    sx={{ cursor: 'pointer' }}
                  />
                </Box>
              </Box>
            )}
          </Box>
        </Collapse>
      </Box>
      
      {/* Advanced Filters */}
      <Collapse in={showAdvanced}>
        <Box sx={{ mt: 2, p: 2, backgroundColor: 'background.paper', borderRadius: 2, border: 1, borderColor: 'divider' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="subtitle2">Advanced Filters</Typography>
            <IconButton size="small" onClick={onToggleAdvanced}>
              <CloseIcon />
            </IconButton>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            {/* Category Filter */}
            <FormControl size="small" sx={{ minWidth: 120 }}>
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
              </Select>
            </FormControl>
            
            {/* Status Filter */}
            <FormControl size="small" sx={{ minWidth: 120 }}>
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
              </Select>
            </FormControl>
            
            {/* Price Filter */}
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Price</InputLabel>
              <Select
                value={filters.priceRange || 'all'}
                label="Price"
                onChange={(e) => handleFilterChange('priceRange', e.target.value)}
              >
                <MenuItem value="all">All Prices</MenuItem>
                <MenuItem value="free">Free</MenuItem>
                <MenuItem value="paid">Paid</MenuItem>
                <MenuItem value="under-50">Under $50</MenuItem>
                <MenuItem value="50-100">$50 - $100</MenuItem>
                <MenuItem value="over-100">Over $100</MenuItem>
              </Select>
            </FormControl>
            
            {/* Difficulty Filter */}
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Difficulty</InputLabel>
              <Select
                value={filters.difficulty || 'all'}
                label="Difficulty"
                onChange={(e) => handleFilterChange('difficulty', e.target.value)}
              >
                <MenuItem value="all">All Levels</MenuItem>
                <MenuItem value="beginner">Beginner</MenuItem>
                <MenuItem value="intermediate">Intermediate</MenuItem>
                <MenuItem value="advanced">Advanced</MenuItem>
              </Select>
            </FormControl>
          </Box>
          
          {/* Filter Actions */}
          <Box sx={{ display: 'flex', gap: 1, mt: 2, justifyContent: 'flex-end' }}>
            {hasActiveFilters && (
              <Button
                size="small"
                variant="outlined"
                onClick={onClearFilters}
              >
                Clear Filters
              </Button>
            )}
            <Button
              size="small"
              variant="contained"
              onClick={handleSearch}
            >
              Apply Filters
            </Button>
          </Box>
        </Box>
      </Collapse>
      
      {/* Active Filter Chips */}
      {hasActiveFilters && (
        <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {Object.entries(filters).map(([key, value]) => {
            if (value && value !== 'all' && value !== '') {
              return (
                <Chip
                  key={key}
                  label={`${key}: ${value}`}
                  size="small"
                  onDelete={() => handleFilterChange(key, 'all')}
                  variant="outlined"
                />
              );
            }
            return null;
          })}
        </Box>
      )}
    </Box>
  );
};

export default CourseSearch;
