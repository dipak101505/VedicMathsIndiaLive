// Hooks Exports
// This file provides clean imports for all hooks

// Existing hooks
export { useAuth } from './useAuth';
export { usePermissions } from './usePermissions';
export { useStore, useUsers, useApp, useCourses, useLoading, useErrors } from './useStore';
export { useLocalStorage, useMultiLocalStorage } from './useLocalStorage';

// New custom hooks for course management (will be created in Phase 5)
export { default as useCourseData } from './useCourseData';
export { default as useCourseSearch } from './useCourseSearch';
export { default as useCourseFiltering } from './useCourseFiltering';
export { default as useCalendar } from './useCalendar';
