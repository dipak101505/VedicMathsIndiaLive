// Permissions utility for role-based access control

import { UserRole } from '../types/auth.types';

// Define permission types
export type Permission = 
  | 'users:read'
  | 'users:create'
  | 'users:update'
  | 'users:delete'
  | 'courses:read'
  | 'courses:create'
  | 'courses:update'
  | 'courses:delete'
  | 'analytics:read'
  | 'analytics:write'
  | 'settings:read'
  | 'settings:write'
  | 'franchises:read'
  | 'franchises:create'
  | 'franchises:update'
  | 'franchises:delete';

// Define role permissions
const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  super_admin: [
    'users:read', 'users:create', 'users:update', 'users:delete',
    'courses:read', 'courses:create', 'courses:update', 'courses:delete',
    'analytics:read', 'analytics:write',
    'settings:read', 'settings:write',
    'franchises:read', 'franchises:create', 'franchises:update', 'franchises:delete',
  ],
  franchise_admin: [
    'users:read', 'users:create', 'users:update',
    'courses:read', 'courses:create', 'courses:update',
    'analytics:read',
    'settings:read', 'settings:write',
    'franchises:read',
  ],
  instructor: [
    'users:read',
    'courses:read', 'courses:create', 'courses:update',
    'analytics:read',
    'settings:read',
  ],
  student: [
    'courses:read',
    'analytics:read',
    'settings:read',
  ],
  parent: [
    'users:read',
    'courses:read',
    'analytics:read',
    'settings:read',
  ],
};

/**
 * Check if a user has a specific permission
 */
export const hasPermission = (role: UserRole, permission: Permission): boolean => {
  const permissions = ROLE_PERMISSIONS[role] || [];
  return permissions.includes(permission);
};

/**
 * Check if a user has any of the specified permissions
 */
export const hasAnyPermission = (role: UserRole, permissions: Permission[]): boolean => {
  return permissions.some(permission => hasPermission(role, permission));
};

/**
 * Check if a user has all of the specified permissions
 */
export const hasAllPermissions = (role: UserRole, permissions: Permission[]): boolean => {
  return permissions.every(permission => hasPermission(role, permission));
};

/**
 * Get all permissions for a role
 */
export const getRolePermissions = (role: UserRole): Permission[] => {
  return ROLE_PERMISSIONS[role] || [];
};

/**
 * Check if user can access a specific module
 */
export const canAccessModule = (role: UserRole, module: string): boolean => {
  const modulePermissions: Record<string, Permission[]> = {
    users: ['users:read'],
    courses: ['courses:read'],
    analytics: ['analytics:read'],
    settings: ['settings:read'],
    franchises: ['franchises:read'],
  };

  const requiredPermissions = modulePermissions[module] || [];
  return hasAnyPermission(role, requiredPermissions);
};

/**
 * Check if user can perform a specific action on a resource
 */
export const canPerformAction = (
  role: UserRole, 
  resource: string, 
  action: 'read' | 'create' | 'update' | 'delete'
): boolean => {
  const permission = `${resource}:${action}` as Permission;
  return hasPermission(role, permission);
};
