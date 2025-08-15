/**
 * Claims Utility Functions
 * Helper functions for managing and validating custom claims
 */

/**
 * Get role permissions mapping
 * @param {string} role - User role
 * @returns {Array} - Array of permissions for the role
 */
export const getRolePermissions = (role) => {
  const permissions = {
    student: [
      'VIEW_COURSES',
      'VIEW_PROGRESS', 
      'UPDATE_PROFILE',
      'VIEW_ASSIGNMENTS',
      'SUBMIT_ASSIGNMENTS'
    ],
    instructor: [
      'VIEW_COURSES',
      'CREATE_COURSES',
      'EDIT_COURSES',
      'VIEW_STUDENTS',
      'VIEW_ANALYTICS',
      'GRADE_ASSIGNMENTS',
      'MANAGE_ASSIGNMENTS'
    ],
    parent: [
      'VIEW_CHILDREN_PROGRESS',
      'VIEW_COURSES',
      'UPDATE_PROFILE',
      'VIEW_REPORTS'
    ],
    franchise_admin: [
      'VIEW_COURSES',
      'CREATE_COURSES',
      'EDIT_COURSES',
      'MANAGE_USERS',
      'VIEW_ANALYTICS',
      'MANAGE_FRANCHISE',
      'VIEW_REPORTS',
      'MANAGE_INSTRUCTORS'
    ],
    super_admin: [
      'VIEW_COURSES',
      'CREATE_COURSES',
      'EDIT_COURSES',
      'DELETE_COURSES',
      'MANAGE_USERS',
      'VIEW_ANALYTICS',
      'MANAGE_FRANCHISES',
      'SYSTEM_SETTINGS',
      'VIEW_ALL_DATA',
      'MANAGE_SYSTEM'
    ]
  };
  
  return permissions[role] || [];
};

/**
 * Get role access level
 * @param {string} role - User role
 * @returns {number} - Access level (higher = more access)
 */
export const getRoleAccessLevel = (role) => {
  const accessLevels = {
    student: 1,
    parent: 2,
    instructor: 3,
    franchise_admin: 4,
    super_admin: 5
  };
  
  return accessLevels[role] || 0;
};

/**
 * Check if user has specific permission
 * @param {object} claims - User claims object
 * @param {string} permission - Permission to check
 * @returns {boolean} - Whether user has permission
 */
export const hasPermission = (claims, permission) => {
  if (!claims || !claims.permissions) {
    return false;
  }
  
  return claims.permissions.includes(permission);
};

/**
 * Check if user has any of the specified permissions
 * @param {object} claims - User claims object
 * @param {Array} permissions - Array of permissions to check
 * @returns {boolean} - Whether user has any of the permissions
 */
export const hasAnyPermission = (claims, permissions) => {
  if (!claims || !claims.permissions) {
    return false;
  }
  
  return permissions.some(permission => claims.permissions.includes(permission));
};

/**
 * Check if user has all of the specified permissions
 * @param {object} claims - User claims object
 * @param {Array} permissions - Array of permissions to check
 * @returns {boolean} - Whether user has all permissions
 */
export const hasAllPermissions = (claims, permissions) => {
  if (!claims || !claims.permissions) {
    return false;
  }
  
  return permissions.every(permission => claims.permissions.includes(permission));
};

/**
 * Check if user can access a specific route
 * @param {object} claims - User claims object
 * @param {string} route - Route to check access for
 * @returns {boolean} - Whether user can access the route
 */
export const canAccessRoute = (claims, route) => {
  if (!claims) {
    return false;
  }

  const routePermissions = {
    '/dashboard': ['VIEW_COURSES'],
    '/courses': ['VIEW_COURSES'],
    '/users': ['VIEW_USERS'],
    '/analytics': ['VIEW_ANALYTICS'],
    '/settings': ['VIEW_SETTINGS'],
    '/franchises': ['MANAGE_FRANCHISES'],
    '/admin': ['SYSTEM_SETTINGS']
  };

  const requiredPermissions = routePermissions[route];
  if (!requiredPermissions) {
    return true; // No specific permissions required
  }

  return hasAnyPermission(claims, requiredPermissions);
};

/**
 * Validate claims structure
 * @param {object} claims - Claims object to validate
 * @returns {object} - Validation result with isValid and errors
 */
export const validateClaims = (claims) => {
  const errors = [];
  
  if (!claims) {
    errors.push('Claims object is required');
    return { isValid: false, errors };
  }
  
  if (!claims.role) {
    errors.push('Role is required');
  } else if (!['student', 'instructor', 'parent', 'franchise_admin', 'super_admin'].includes(claims.role)) {
    errors.push('Invalid role specified');
  }
  
  if (claims.permissions && !Array.isArray(claims.permissions)) {
    errors.push('Permissions must be an array');
  }
  
  if (claims.isActive !== undefined && typeof claims.isActive !== 'boolean') {
    errors.push('isActive must be a boolean');
  }
  
  if (claims.accessLevel !== undefined && typeof claims.accessLevel !== 'number') {
    errors.push('accessLevel must be a number');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Create default claims for a role
 * @param {string} role - User role
 * @param {object} additionalClaims - Additional claims to include
 * @returns {object} - Default claims object
 */
export const createDefaultClaims = (role, additionalClaims = {}) => {
  const baseClaims = {
    role,
    permissions: getRolePermissions(role),
    accessLevel: getRoleAccessLevel(role),
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  return {
    ...baseClaims,
    ...additionalClaims
  };
};

/**
 * Merge claims with updates
 * @param {object} existingClaims - Existing claims
 * @param {object} updates - Claims updates
 * @returns {object} - Merged claims object
 */
export const mergeClaims = (existingClaims, updates) => {
  return {
    ...existingClaims,
    ...updates,
    updatedAt: new Date().toISOString()
  };
};

/**
 * Check if claims need refresh
 * @param {object} claims - Current claims
 * @param {number} maxAge - Maximum age in milliseconds (default: 1 hour)
 * @returns {boolean} - Whether claims need refresh
 */
export const claimsNeedRefresh = (claims, maxAge = 60 * 60 * 1000) => {
  if (!claims || !claims.updatedAt) {
    return true;
  }
  
  const lastUpdate = new Date(claims.updatedAt).getTime();
  const now = Date.now();
  
  return (now - lastUpdate) > maxAge;
};

export default {
  getRolePermissions,
  getRoleAccessLevel,
  hasPermission,
  hasAnyPermission,
  hasAllPermissions,
  canAccessRoute,
  validateClaims,
  createDefaultClaims,
  mergeClaims,
  claimsNeedRefresh
};
