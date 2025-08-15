import { useState, useCallback, useMemo, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';

export const useCourseFiltering = (initialFilters = {}, options = {}) => {
  const [filters, setFilters] = useState(initialFilters);
  const [filterPresets, setFilterPresets] = useLocalStorage('courseFilterPresets', {
    'my-courses': {
      name: 'My Courses',
      filters: { status: 'active', category: 'all' },
      description: 'Show only active courses'
    },
    'free-courses': {
      name: 'Free Courses',
      filters: { priceRange: 'free', status: 'active' },
      description: 'Show only free active courses'
    },
    'popular-courses': {
      name: 'Popular Courses',
      filters: { minStudents: 100, status: 'active' },
      description: 'Show courses with 100+ students'
    },
    'new-courses': {
      name: 'New Courses',
      filters: { status: 'active', sortBy: 'newest' },
      description: 'Show newest active courses'
    }
  });
  
  const [activePreset, setActivePreset] = useState(null);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [filterHistory, setFilterHistory] = useLocalStorage('filterHistory', []);
  
  // Default filter structure
  const defaultFilters = {
    category: 'all',
    status: 'all',
    difficulty: 'all',
    priceRange: 'all',
    duration: 'all',
    language: 'all',
    format: 'all',
    minRating: 0,
    minStudents: 0,
    hasCertificate: false,
    hasQuizzes: false,
    hasProjects: false,
    hasSupport: false,
    sortBy: 'relevance',
    ...initialFilters
  };
  
  // Initialize filters with defaults
  useEffect(() => {
    setFilters(prev => ({
      ...defaultFilters,
      ...prev
    }));
  }, []);
  
  // Update a single filter
  const updateFilter = useCallback((filterType, value) => {
    setFilters(prev => {
      const newFilters = {
        ...prev,
        [filterType]: value
      };
      
      // Add to filter history
      setFilterHistory(prevHistory => {
        const newEntry = {
          timestamp: Date.now(),
          filters: newFilters,
          description: `Updated ${filterType} to ${value}`
        };
        return [newEntry, ...prevHistory.slice(0, 9)]; // Keep last 10 entries
      });
      
      return newFilters;
    });
    
    // Clear active preset when manually changing filters
    if (activePreset) {
      setActivePreset(null);
    }
  }, [activePreset, setFilterHistory]);
  
  // Update multiple filters at once
  const updateFilters = useCallback((newFilters) => {
    setFilters(prev => {
      const updatedFilters = {
        ...prev,
        ...newFilters
      };
      
      // Add to filter history
      setFilterHistory(prevHistory => {
        const newEntry = {
          timestamp: Date.now(),
          filters: updatedFilters,
          description: `Updated multiple filters`
        };
        return [newEntry, ...prevHistory.slice(0, 9)];
      });
      
      return updatedFilters;
    });
    
    // Clear active preset when manually changing filters
    if (activePreset) {
      setActivePreset(null);
    }
  }, [activePreset, setFilterHistory]);
  
  // Apply a filter preset
  const applyPreset = useCallback((presetKey) => {
    const preset = filterPresets[presetKey];
    if (preset) {
      setFilters(preset.filters);
      setActivePreset(presetKey);
      
      // Add to filter history
      setFilterHistory(prevHistory => {
        const newEntry = {
          timestamp: Date.now(),
          filters: preset.filters,
          description: `Applied preset: ${preset.name}`
        };
        return [newEntry, ...prevHistory.slice(0, 9)];
      });
    }
  }, [filterPresets, setFilterHistory]);
  
  // Create a new filter preset
  const createPreset = useCallback((key, name, description) => {
    const newPreset = {
      name,
      filters: { ...filters },
      description
    };
    
    setFilterPresets(prev => ({
      ...prev,
      [key]: newPreset
    }));
    
    return newPreset;
  }, [filters, setFilterPresets]);
  
  // Update an existing preset
  const updatePreset = useCallback((presetKey, updates) => {
    setFilterPresets(prev => ({
      ...prev,
      [presetKey]: {
        ...prev[presetKey],
        ...updates
      }
    }));
  }, [setFilterPresets]);
  
  // Delete a preset
  const deletePreset = useCallback((presetKey) => {
    setFilterPresets(prev => {
      const newPresets = { ...prev };
      delete newPresets[presetKey];
      return newPresets;
    });
    
    // Clear active preset if it was deleted
    if (activePreset === presetKey) {
      setActivePreset(null);
    }
  }, [activePreset, setFilterPresets]);
  
  // Clear all filters
  const clearFilters = useCallback(() => {
    setFilters(defaultFilters);
    setActivePreset(null);
    
    // Add to filter history
    setFilterHistory(prevHistory => {
      const newEntry = {
        timestamp: Date.now(),
        filters: defaultFilters,
        description: 'Cleared all filters'
      };
      return [newEntry, ...prevHistory.slice(0, 9)];
    });
  }, [defaultFilters, setFilterHistory]);
  
  // Reset filters to initial state
  const resetFilters = useCallback(() => {
    setFilters(initialFilters);
    setActivePreset(null);
    
    // Add to filter history
    setFilterHistory(prevHistory => {
      const newEntry = {
        timestamp: Date.now(),
        filters: initialFilters,
        description: 'Reset to initial filters'
      };
      return [newEntry, ...prevHistory.slice(0, 9)];
      });
  }, [initialFilters, setFilterHistory]);
  
  // Toggle advanced filters
  const toggleAdvanced = useCallback(() => {
    setShowAdvanced(prev => !prev);
  }, []);
  
  // Get filter summary
  const getFilterSummary = useCallback(() => {
    const activeFilters = Object.entries(filters).filter(([key, value]) => {
      if (key === 'sortBy') return false; // Don't count sort as a filter
      return value && value !== 'all' && value !== '' && value !== 0 && value !== false;
    });
    
    return {
      count: activeFilters.length,
      filters: activeFilters.map(([key, value]) => ({ key, value })),
      description: activeFilters.length === 0 ? 'No filters applied' : 
        activeFilters.map(([key, value]) => `${key}: ${value}`).join(', ')
    };
  }, [filters]);
  
  // Check if filters are at default values
  const isDefaultFilters = useMemo(() => {
    return Object.keys(defaultFilters).every(key => 
      filters[key] === defaultFilters[key]
    );
  }, [filters, defaultFilters]);
  
  // Get available filter options based on current data
  const getFilterOptions = useCallback((courses = []) => {
    const options = {
      categories: [...new Set(courses.map(c => c.category).filter(Boolean))],
      difficulties: [...new Set(courses.map(c => c.difficulty).filter(Boolean))],
      languages: [...new Set(courses.map(c => c.language).filter(Boolean))],
      formats: [...new Set(courses.map(c => c.format).filter(Boolean))],
      priceRanges: courses.length > 0 ? [
        'free',
        'paid',
        'under-25',
        '25-50',
        '50-100',
        'over-100'
      ] : [],
      durations: courses.length > 0 ? [
        'short',
        'medium',
        'long',
        'flexible'
      ] : []
    };
    
    return options;
  }, []);
  
  // Export filters for sharing
  const exportFilters = useCallback(() => {
    const filterData = {
      filters,
      preset: activePreset,
      timestamp: Date.now(),
      version: '1.0'
    };
    
    const blob = new Blob([JSON.stringify(filterData, null, 2)], {
      type: 'application/json'
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `course-filters-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [filters, activePreset]);
  
  // Import filters from file
  const importFilters = useCallback(async (file) => {
    try {
      const text = await file.text();
      const filterData = JSON.parse(text);
      
      if (filterData.filters && filterData.version === '1.0') {
        setFilters(filterData.filters);
        if (filterData.preset) {
          setActivePreset(filterData.preset);
        }
        
        // Add to filter history
        setFilterHistory(prevHistory => {
          const newEntry = {
            timestamp: Date.now(),
            filters: filterData.filters,
            description: `Imported filters from ${file.name}`
          };
          return [newEntry, ...prevHistory.slice(0, 9)];
        });
        
        return { success: true };
      } else {
        throw new Error('Invalid filter file format');
      }
    } catch (error) {
      console.error('Error importing filters:', error);
      return { success: false, error: error.message };
    }
  }, [setFilterHistory]);
  
  return {
    // Filter state
    filters,
    activePreset,
    showAdvanced,
    filterPresets,
    filterHistory,
    
    // Actions
    updateFilter,
    updateFilters,
    applyPreset,
    createPreset,
    updatePreset,
    deletePreset,
    clearFilters,
    resetFilters,
    toggleAdvanced,
    exportFilters,
    importFilters,
    
    // Utilities
    getFilterSummary,
    getFilterOptions,
    isDefaultFilters,
    
    // Computed values
    hasActiveFilters: getFilterSummary().count > 0,
    activeFilterCount: getFilterSummary().count,
    filterDescription: getFilterSummary().description
  };
};

export default useCourseFiltering;
