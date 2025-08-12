import { create } from 'zustand';
import { lambdaService } from '../services/lambdaService';
import toast from 'react-hot-toast';

export const useCourseStore = create((set, get) => ({
  // State
  courses: [],
  selectedCourse: null,
  loading: false,
  error: null,
  
  // Filters and pagination
  filters: {
    search: '',
    category: '',
    instructor: '',
    status: 'all',
  },
  pagination: {
    page: 0,
    pageSize: 10,
    total: 0,
  },
  
  // Actions
  setCourses: (courses) => set({ courses }),
  setSelectedCourse: (course) => set({ selectedCourse: course }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  
  setFilters: (filters) => set((state) => ({
    filters: { ...state.filters, ...filters },
    pagination: { ...state.pagination, page: 0 }, // Reset to first page
  })),
  
  setPagination: (pagination) => set((state) => ({
    pagination: { ...state.pagination, ...pagination },
  })),
  
  // API Operations
  fetchCourses: async (params = {}) => {
    set({ loading: true, error: null });
    
    try {
      const state = get();
      const queryParams = {
        ...state.filters,
        page: state.pagination.page,
        pageSize: state.pagination.pageSize,
        ...params,
      };
      
      const result = await lambdaService.getCourses(queryParams);
      
      if (result.success) {
        set({
          courses: result.data.courses || result.data,
          pagination: {
            ...state.pagination,
            total: result.data.total || result.data.length,
          },
          loading: false,
        });
        return { success: true, data: result.data };
      } else {
        set({ error: result.error, loading: false });
        toast.error(result.error || 'Failed to fetch courses');
        return { success: false, error: result.error };
      }
    } catch (error) {
      const errorMessage = error.message || 'Failed to fetch courses';
      set({ error: errorMessage, loading: false });
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  },
  
  fetchCourse: async (courseId) => {
    set({ loading: true, error: null });
    
    try {
      const result = await lambdaService.getCourse(courseId);
      
      if (result.success) {
        set({ selectedCourse: result.data, loading: false });
        return { success: true, data: result.data };
      } else {
        set({ error: result.error, loading: false });
        toast.error(result.error || 'Failed to fetch course');
        return { success: false, error: result.error };
      }
    } catch (error) {
      const errorMessage = error.message || 'Failed to fetch course';
      set({ error: errorMessage, loading: false });
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  },
  
  createCourse: async (courseData) => {
    set({ loading: true, error: null });
    
    try {
      const result = await lambdaService.createCourse(courseData);
      
      if (result.success) {
        const state = get();
        set({
          courses: [result.data, ...state.courses],
          loading: false,
        });
        toast.success('Course created successfully');
        return { success: true, data: result.data };
      } else {
        set({ error: result.error, loading: false });
        toast.error(result.error || 'Failed to create course');
        return { success: false, error: result.error };
      }
    } catch (error) {
      const errorMessage = error.message || 'Failed to create course';
      set({ error: errorMessage, loading: false });
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  },
  
  updateCourse: async (courseId, updates) => {
    set({ loading: true, error: null });
    
    try {
      const result = await lambdaService.updateCourse(courseId, updates);
      
      if (result.success) {
        const state = get();
        set({
          courses: state.courses.map(course => 
            course.id === courseId ? { ...course, ...updates } : course
          ),
          selectedCourse: state.selectedCourse?.id === courseId 
            ? { ...state.selectedCourse, ...updates }
            : state.selectedCourse,
          loading: false,
        });
        toast.success('Course updated successfully');
        return { success: true, data: result.data };
      } else {
        set({ error: result.error, loading: false });
        toast.error(result.error || 'Failed to update course');
        return { success: false, error: result.error };
      }
    } catch (error) {
      const errorMessage = error.message || 'Failed to update course';
      set({ error: errorMessage, loading: false });
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  },
  
  deleteCourse: async (courseId) => {
    set({ loading: true, error: null });
    
    try {
      const result = await lambdaService.deleteCourse(courseId);
      
      if (result.success) {
        const state = get();
        set({
          courses: state.courses.filter(course => course.id !== courseId),
          selectedCourse: state.selectedCourse?.id === courseId ? null : state.selectedCourse,
          loading: false,
        });
        toast.success('Course deleted successfully');
        return { success: true };
      } else {
        set({ error: result.error, loading: false });
        toast.error(result.error || 'Failed to delete course');
        return { success: false, error: result.error };
      }
    } catch (error) {
      const errorMessage = error.message || 'Failed to delete course';
      set({ error: errorMessage, loading: false });
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  },
  
  // Utility methods
  getCourseById: (courseId) => {
    const state = get();
    return state.courses.find(course => course.id === courseId);
  },
  
  getCoursesByInstructor: (instructorId) => {
    const state = get();
    return state.courses.filter(course => course.instructorId === instructorId);
  },
  
  getCoursesByCategory: (category) => {
    const state = get();
    return state.courses.filter(course => course.category === category);
  },
  
  clearError: () => set({ error: null }),
}));
