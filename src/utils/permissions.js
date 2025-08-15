import { USER_ROLES } from './constants';

// Permission definitions for different user roles
export const PERMISSIONS = {
  // User Management
  VIEW_USERS: [USER_ROLES.SUPER_ADMIN, USER_ROLES.FRANCHISE_ADMIN, USER_ROLES.INSTRUCTOR],
  CREATE_USERS: [USER_ROLES.SUPER_ADMIN, USER_ROLES.FRANCHISE_ADMIN],
  EDIT_USERS: [USER_ROLES.SUPER_ADMIN, USER_ROLES.FRANCHISE_ADMIN, USER_ROLES.INSTRUCTOR],
  DELETE_USERS: [USER_ROLES.SUPER_ADMIN, USER_ROLES.FRANCHISE_ADMIN],
  
  // Course Management
  VIEW_COURSES: [USER_ROLES.SUPER_ADMIN, USER_ROLES.FRANCHISE_ADMIN, USER_ROLES.INSTRUCTOR, USER_ROLES.STUDENT, USER_ROLES.PARENT],
  CREATE_COURSES: [USER_ROLES.SUPER_ADMIN, USER_ROLES.FRANCHISE_ADMIN, USER_ROLES.INSTRUCTOR],
  EDIT_COURSES: [USER_ROLES.SUPER_ADMIN, USER_ROLES.FRANCHISE_ADMIN, USER_ROLES.INSTRUCTOR],
  DELETE_COURSES: [USER_ROLES.SUPER_ADMIN, USER_ROLES.FRANCHISE_ADMIN],
  
  // Analytics
  VIEW_ANALYTICS: [USER_ROLES.SUPER_ADMIN, USER_ROLES.FRANCHISE_ADMIN, USER_ROLES.INSTRUCTOR],
  EXPORT_ANALYTICS: [USER_ROLES.SUPER_ADMIN, USER_ROLES.FRANCHISE_ADMIN],
  
  // System Settings
  VIEW_SETTINGS: [USER_ROLES.SUPER_ADMIN, USER_ROLES.FRANCHISE_ADMIN],
  EDIT_SETTINGS: [USER_ROLES.SUPER_ADMIN],
  
  // Franchise Management
  MANAGE_FRANCHISES: [USER_ROLES.SUPER_ADMIN],
  VIEW_FRANCHISE_DATA: [USER_ROLES.SUPER_ADMIN, USER_ROLES.FRANCHISE_ADMIN],
};

// Check if user has permission for a specific action
export const hasPermission = (userRole, permission) => {
  if (!userRole || !permission) return false;
  
  const allowedRoles = PERMISSIONS[permission];
  return allowedRoles && allowedRoles.includes(userRole);
};

// Check if user has any of the specified permissions
export const hasAnyPermission = (userRole, permissions) => {
  return permissions.some(permission => hasPermission(userRole, permission));
};

// Check if user has all of the specified permissions
export const hasAllPermissions = (userRole, permissions) => {
  return permissions.every(permission => hasPermission(userRole, permission));
};

// Get all permissions for a specific role
export const getRolePermissions = (userRole) => {
  const rolePermissions = [];
  
  Object.entries(PERMISSIONS).forEach(([permission, roles]) => {
    if (roles.includes(userRole)) {
      rolePermissions.push(permission);
    }
  });
  
  return rolePermissions;
};

// Check if user can access a specific route
export const canAccessRoute = (userRole, route) => {
  const routePermissions = {
    '/users': 'VIEW_USERS',
    '/courses': 'VIEW_COURSES',
    '/teacher/courses': 'VIEW_COURSES',
    '/teacher/courses/:courseId': 'VIEW_COURSES',
    '/analytics': 'VIEW_ANALYTICS',
    '/settings': 'VIEW_SETTINGS',
  };
  
  const requiredPermission = routePermissions[route];
  return !requiredPermission || hasPermission(userRole, requiredPermission);
};
