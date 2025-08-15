import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';

export const useCourseSearch = (courses = [], options = {}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFilters, setSearchFilters] = useState({
    category: 'all',
    status: 'all',
    priceRange: 'all',
    difficulty: 'all',
    duration: 'all',
    language: 'all',
    format: 'all',
    minRating: 0,
    minStudents: 0,
    hasCertificate: false,
    hasQuizzes: false,
    hasProjects: false,
    hasSupport: false,
    ...options.defaultFilters
  });
  
  const [sortBy, setSortBy] = useState(options.defaultSort || 'relevance');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [searchHistory, setSearchHistory] = useLocalStorage('courseSearchHistory', []);
  const [recentSearches, setRecentSearches] = useLocalStorage('recentSearches', []);
  
  // Debounce search query
  const debounceTimeoutRef = useRef(null);
  const [debouncedQuery, setDebouncedQuery] = useState('');
  
  // Update debounced query after delay
  useEffect(() => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
    
    debounceTimeoutRef.current = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, options.debounceDelay || 300);
    
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [searchQuery, options.debounceDelay]);
  
  // Filter courses based on search query and filters
  const filteredCourses = useMemo(() => {
    if (!courses || courses.length === 0) return [];
    
    return courses.filter(course => {
      // Search query matching
      const query = debouncedQuery.toLowerCase().trim();
      if (query) {
        const matchesTitle = course.title?.toLowerCase().includes(query);
        const matchesDescription = course.description?.toLowerCase().includes(query);
        const matchesInstructor = course.instructor?.toLowerCase().includes(query);
        const matchesSubject = course.subject?.toLowerCase().includes(query);
        
        if (!matchesTitle && !matchesDescription && !matchesInstructor && !matchesSubject) {
          return false;
        }
      }
      
      // Category filter
      if (searchFilters.category !== 'all' && course.category !== searchFilters.category) {
        return false;
      }
      
      // Status filter
      if (searchFilters.status !== 'all' && course.status !== searchFilters.status) {
        return false;
      }
      
      // Price range filter
      if (searchFilters.priceRange !== 'all') {
        const coursePrice = course.price || 0;
        switch (searchFilters.priceRange) {
          case 'free':
            if (coursePrice !== 0) return false;
            break;
          case 'paid':
            if (coursePrice === 0) return false;
            break;
          case 'under-25':
            if (coursePrice >= 25) return false;
            break;
          case '25-50':
            if (coursePrice < 25 || coursePrice >= 50) return false;
            break;
          case '50-100':
            if (coursePrice < 50 || coursePrice >= 100) return false;
            break;
          case 'over-100':
            if (coursePrice < 100) return false;
            break;
        }
      }
      
      // Difficulty filter
      if (searchFilters.difficulty !== 'all' && course.difficulty !== searchFilters.difficulty) {
        return false;
      }
      
      // Duration filter
      if (searchFilters.duration !== 'all') {
        const courseDuration = course.duration || 0;
        switch (searchFilters.duration) {
          case 'short':
            if (courseDuration > 5) return false;
            break;
          case 'medium':
            if (courseDuration <= 5 || courseDuration > 20) return false;
            break;
          case 'long':
            if (courseDuration <= 20) return false;
            break;
          case 'flexible':
            if (courseDuration !== 0) return false;
            break;
        }
      }
      
      // Language filter
      if (searchFilters.language !== 'all' && course.language !== searchFilters.language) {
        return false;
      }
      
      // Format filter
      if (searchFilters.format !== 'all' && course.format !== searchFilters.format) {
        return false;
      }
      
      // Rating filter
      if (searchFilters.minRating > 0) {
        const courseRating = course.rating || 0;
        if (courseRating < searchFilters.minRating) return false;
      }
      
      // Student count filter
      if (searchFilters.minStudents > 0) {
        const courseStudents = course.studentCount || 0;
        if (courseStudents < searchFilters.minStudents) return false;
      }
      
      // Feature filters
      if (searchFilters.hasCertificate && !course.features?.includes('certificate')) {
        return false;
      }
      if (searchFilters.hasQuizzes && !course.features?.includes('quizzes')) {
        return false;
      }
      if (searchFilters.hasProjects && !course.features?.includes('projects')) {
        return false;
      }
      if (searchFilters.hasSupport && !course.features?.includes('support')) {
        return false;
      }
      
      return true;
    });
  }, [courses, debouncedQuery, searchFilters]);
  
  // Sort filtered courses
  const sortedCourses = useMemo(() => {
    if (!filteredCourses || filteredCourses.length === 0) return [];
    
    const sorted = [...filteredCourses];
    
    switch (sortBy) {
      case 'title':
        sorted.sort((a, b) => a.title?.localeCompare(b.title) || 0);
        break;
      case 'title-desc':
        sorted.sort((a, b) => b.title?.localeCompare(a.title) || 0);
        break;
      case 'newest':
        sorted.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
        break;
      case 'oldest':
        sorted.sort((a, b) => new Date(a.createdAt || 0) - new Date(b.createdAt || 0));
        break;
      case 'rating':
        sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'students':
        sorted.sort((a, b) => (b.studentCount || 0) - (a.studentCount || 0));
        break;
      case 'price-low':
        sorted.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case 'price-high':
        sorted.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case 'duration':
        sorted.sort((a, b) => (a.duration || 0) - (b.duration || 0));
        break;
      case 'relevance':
      default:
        // Keep original order for relevance
        break;
    }
    
    return sorted;
  }, [filteredCourses, sortBy]);
  
  // Handle search query change
  const handleSearch = useCallback((query) => {
    setSearchQuery(query);
    
    // Add to search history if query is not empty
    if (query.trim()) {
      const trimmedQuery = query.trim();
      setSearchHistory(prev => {
        const filtered = prev.filter(item => item !== trimmedQuery);
        return [trimmedQuery, ...filtered].slice(0, 10); // Keep last 10 searches
      });
    }
  }, [setSearchHistory]);
  
  // Handle filter change
  const handleFilterChange = useCallback((filterType, value) => {
    setSearchFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  }, []);
  
  // Handle multiple filter changes
  const handleFiltersChange = useCallback((newFilters) => {
    setSearchFilters(prev => ({
      ...prev,
      ...newFilters
    }));
  }, []);
  
  // Clear all filters
  const clearFilters = useCallback(() => {
    setSearchFilters({
      category: 'all',
      status: 'all',
      priceRange: 'all',
      difficulty: 'all',
      duration: 'all',
      language: 'all',
      format: 'all',
      minRating: 0,
      minStudents: 0,
      hasCertificate: false,
      hasQuizzes: false,
      hasProjects: false,
      hasSupport: false
    });
  }, []);
  
  // Clear specific filter
  const clearFilter = useCallback((filterType) => {
    setSearchFilters(prev => ({
      ...prev,
      [filterType]: 'all'
    }));
  }, []);
  
  // Reset search
  const resetSearch = useCallback(() => {
    setSearchQuery('');
    clearFilters();
    setSortBy('relevance');
  }, [clearFilters]);
  
  // Toggle advanced filters
  const toggleAdvanced = useCallback(() => {
    setShowAdvanced(prev => !prev);
  }, []);
  
  // Get search suggestions
  const getSearchSuggestions = useCallback((query) => {
    if (!query.trim()) return [];
    
    const suggestions = [];
    const lowerQuery = query.toLowerCase();
    
    // Add category suggestions
    const categories = ['mathematics', 'physics', 'chemistry', 'biology', 'computer-science', 'english', 'history', 'geography'];
    categories.forEach(category => {
      if (category.includes(lowerQuery)) {
        suggestions.push({ type: 'category', value: category, label: `Category: ${category}` });
      }
    });
    
    // Add difficulty suggestions
    const difficulties = ['beginner', 'intermediate', 'advanced', 'expert'];
    difficulties.forEach(difficulty => {
      if (difficulty.includes(lowerQuery)) {
        suggestions.push({ type: 'difficulty', value: difficulty, label: `Difficulty: ${difficulty}` });
      }
    });
    
    // Add price suggestions
    if (lowerQuery.includes('free')) {
      suggestions.push({ type: 'price', value: 'free', label: 'Free courses' });
    }
    if (lowerQuery.includes('paid')) {
      suggestions.push({ type: 'price', value: 'paid', label: 'Paid courses' });
    }
    
    return suggestions.slice(0, 5); // Limit to 5 suggestions
  }, []);
  
  // Get active filter count
  const activeFilterCount = useMemo(() => {
    return Object.values(searchFilters).filter(filter => 
      filter && filter !== 'all' && filter !== '' && filter !== 0 && filter !== false
    ).length;
  }, [searchFilters]);
  
  // Check if any filters are active
  const hasActiveFilters = activeFilterCount > 0;
  
  // Get search statistics
  const searchStats = useMemo(() => {
    return {
      totalCourses: courses?.length || 0,
      filteredCourses: filteredCourses?.length || 0,
      activeFilters: activeFilterCount,
      searchQuery: debouncedQuery,
      sortBy
    };
  }, [courses, filteredCourses, activeFilterCount, debouncedQuery, sortBy]);
  
  return {
    // Search state
    searchQuery,
    debouncedQuery,
    searchFilters,
    sortBy,
    showAdvanced,
    
    // Results
    filteredCourses: sortedCourses,
    searchStats,
    
    // Actions
    handleSearch,
    handleFilterChange,
    handleFiltersChange,
    clearFilters,
    clearFilter,
    resetSearch,
    toggleAdvanced,
    setSortBy,
    
    // Utilities
    hasActiveFilters,
    activeFilterCount,
    getSearchSuggestions,
    searchHistory,
    recentSearches,
    
    // Computed values
    isEmpty: sortedCourses.length === 0,
    hasResults: sortedCourses.length > 0,
    resultCount: sortedCourses.length
  };
};

export default useCourseSearch;
