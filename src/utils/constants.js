// Application Constants
export const APP_NAME = 'Vedic Maths India';
export const APP_VERSION = '1.0.0';

// User Roles
export const USER_ROLES = {
  SUPER_ADMIN: 'super_admin',
  FRANCHISE_ADMIN: 'franchise_admin',
  INSTRUCTOR: 'instructor',
  STUDENT: 'student',
  PARENT: 'parent',
};

// API Endpoints (Lambda Function URLs)
export const API_ENDPOINTS = {
  BASE_URL: process.env.REACT_APP_API_BASE_URL || 'https://[function-id].lambda-url.[region].on.aws',
  USERS: '/users',
  COURSES: '/courses',
  ENROLLMENTS: '/enrollments',
  ANALYTICS: '/analytics',
  AUTH: '/auth',
};

// Route Paths
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  USERS: '/users',
  COURSES: '/courses',
  ANALYTICS: '/analytics',
  SETTINGS: '/settings',
};

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_DATA: 'user_data',
  THEME: 'theme_preference',
};

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
};

// File Upload
export const FILE_UPLOAD = {
  MAX_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'],
};

// Date Formats
export const DATE_FORMATS = {
  DISPLAY: 'MMM dd, yyyy',
  API: 'yyyy-MM-dd',
  DATETIME: 'MMM dd, yyyy HH:mm',
};
