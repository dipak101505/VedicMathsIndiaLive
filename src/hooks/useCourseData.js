import { useState, useEffect, useCallback, useMemo } from 'react';
import { useStore } from './useStore';
import { useAuth } from './useAuth';

export const useCourseData = (role, options = {}) => {
  const { user } = useAuth();
  const { courses } = useStore();
  const [courseData, setCourseData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: options.limit || 20,
    total: 0,
    hasMore: true
  });
  
  // Memoized filter options
  const filterOptions = useMemo(() => ({
    status: options.status || 'all',
    category: options.category || 'all',
    difficulty: options.difficulty || 'all',
    priceRange: options.priceRange || 'all',
    ...options.filters
  }), [options.status, options.category, options.difficulty, options.priceRange, options.filters]);
  
  const fetchCourses = useCallback(async (page = 1, filters = filterOptions) => {
    try {
      setLoading(true);
      setError(null);
      
      let data;
      let total = 0;
      
      switch (role) {
        case 'instructor':
          if (user?.uid) {
            data = await courses.fetchInstructorCourses(user.uid, {
              page,
              limit: pagination.limit,
              ...filters
            });
            total = data.total || data.length;
          } else {
            data = [];
          }
          break;
          
        case 'admin':
          data = await courses.fetchAllCourses({
            page,
            limit: pagination.limit,
            ...filters
          });
          total = data.total || data.length;
          break;
          
        case 'student':
          if (user?.uid) {
            data = await courses.fetchEnrolledCourses(user.uid, {
              page,
              limit: pagination.limit,
              ...filters
            });
            total = data.total || data.length;
          } else {
            data = [];
          }
          break;
          
        case 'parent':
          if (user?.uid) {
            // Fetch courses for children
            data = await courses.fetchParentCourses(user.uid, {
              page,
              limit: pagination.limit,
              ...filters
            });
            total = data.total || data.length;
          } else {
            data = [];
          }
          break;
          
        default:
          // Public course catalog
          data = await courses.fetchPublicCourses({
            page,
            limit: pagination.limit,
            ...filters
          });
          total = data.total || data.length;
          break;
      }
      
      setCourseData(data);
      setPagination(prev => ({
        ...prev,
        page,
        total,
        hasMore: page * pagination.limit < total
      }));
      
    } catch (err) {
      setError(err.message || 'Failed to fetch courses');
      console.error('Error fetching courses:', err);
    } finally {
      setLoading(false);
    }
  }, [role, user?.uid, courses, pagination.limit, filterOptions]);
  
  // Initial data fetch
  useEffect(() => {
    if (user || role === 'public') {
      fetchCourses(1, filterOptions);
    }
  }, [fetchCourses, user, role, filterOptions]);
  
  // Refresh courses
  const refreshCourses = useCallback(() => {
    fetchCourses(1, filterOptions);
  }, [fetchCourses, filterOptions]);
  
  // Load more courses (pagination)
  const loadMore = useCallback(() => {
    if (pagination.hasMore && !loading) {
      fetchCourses(pagination.page + 1, filterOptions);
    }
  }, [fetchCourses, pagination.page, pagination.hasMore, loading, filterOptions]);
  
  // Update filters and refetch
  const updateFilters = useCallback((newFilters) => {
    const updatedFilters = { ...filterOptions, ...newFilters };
    fetchCourses(1, updatedFilters);
  }, [fetchCourses, filterOptions]);
  
  // Search courses
  const searchCourses = useCallback((searchQuery) => {
    if (searchQuery.trim()) {
      const searchFilters = {
        ...filterOptions,
        search: searchQuery.trim()
      };
      fetchCourses(1, searchFilters);
    } else {
      fetchCourses(1, filterOptions);
    }
  }, [fetchCourses, filterOptions]);
  
  // Get course by ID
  const getCourseById = useCallback(async (courseId) => {
    try {
      setLoading(true);
      const course = await courses.getCourse(courseId);
      return course;
    } catch (err) {
      setError(err.message || 'Failed to fetch course');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [courses]);
  
  // Create new course (for instructors/admins)
  const createCourse = useCallback(async (courseData) => {
    try {
      setLoading(true);
      const result = await courses.createCourse(courseData);
      
      if (result.success) {
        // Refresh the course list
        await refreshCourses();
        return result;
      } else {
        throw new Error(result.message || 'Failed to create course');
      }
    } catch (err) {
      setError(err.message || 'Failed to create course');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [courses, refreshCourses]);
  
  // Update course (for instructors/admins)
  const updateCourse = useCallback(async (courseId, updates) => {
    try {
      setLoading(true);
      const result = await courses.updateCourse(courseId, updates);
      
      if (result.success) {
        // Update local data
        setCourseData(prev => 
          prev.map(course => 
            course.id === courseId ? { ...course, ...updates } : course
          )
        );
        return result;
      } else {
        throw new Error(result.message || 'Failed to update course');
      }
    } catch (err) {
      setError(err.message || 'Failed to update course');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [courses]);
  
  // Delete course (for instructors/admins)
  const deleteCourse = useCallback(async (courseId) => {
    try {
      setLoading(true);
      const result = await courses.deleteCourse(courseId);
      
      if (result.success) {
        // Remove from local data
        setCourseData(prev => prev.filter(course => course.id !== courseId));
        return result;
      } else {
        throw new Error(result.message || 'Failed to delete course');
      }
    } catch (err) {
      setError(err.message || 'Failed to delete course');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [courses]);
  
  // Enroll in course (for students)
  const enrollInCourse = useCallback(async (courseId) => {
    if (role !== 'student') {
      throw new Error('Only students can enroll in courses');
    }
    
    try {
      setLoading(true);
      const result = await courses.enrollInCourse(user.uid, courseId);
      
      if (result.success) {
        // Refresh the course list
        await refreshCourses();
        return result;
      } else {
        throw new Error(result.message || 'Failed to enroll in course');
      }
    } catch (err) {
      setError(err.message || 'Failed to enroll in course');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [role, user?.uid, courses, refreshCourses]);
  
  // Get course statistics
  const getCourseStats = useCallback(async () => {
    try {
      const stats = await courses.getCourseStats(role, user?.uid);
      return stats;
    } catch (err) {
      console.error('Error fetching course stats:', err);
      return null;
    }
  }, [courses, role, user?.uid]);
  
  return {
    // Data
    courses: courseData,
    loading,
    error,
    pagination,
    
    // Actions
    fetchCourses,
    refreshCourses,
    loadMore,
    updateFilters,
    searchCourses,
    getCourseById,
    createCourse,
    updateCourse,
    deleteCourse,
    enrollInCourse,
    getCourseStats,
    
    // Utilities
    hasData: courseData.length > 0,
    isEmpty: !loading && courseData.length === 0,
    canLoadMore: pagination.hasMore && !loading,
    totalCourses: pagination.total
  };
};

export default useCourseData;
