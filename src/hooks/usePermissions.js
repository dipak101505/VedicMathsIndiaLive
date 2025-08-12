import { useMemo, useCallback } from 'react';
import { useAuthStore } from '../store/authStore';
import { hasPermission, hasAnyPermission, hasAllPermissions, getRolePermissions, canAccessRoute } from '../utils/permissions';

export const usePermissions = () => {
  const { user } = useAuthStore();
  
  const userRole = user?.role;
  
  // Debug logging
  console.log('🔐 usePermissions Debug:', {
    hasUser: !!user,
    userRole,
    userRoleType: typeof userRole,
    userKeys: user ? Object.keys(user) : [],
    userRoleValue: user?.role
  });
  
  // Memoized permission checks
  const permissions = useMemo(() => {
    if (!userRole) {
      console.log('⚠️ usePermissions: No userRole found, returning empty permissions');
      return {};
    }
    
    console.log('✅ usePermissions: Calculating permissions for role:', userRole);
    return {
      // User Management
      canViewUsers: hasPermission(userRole, 'VIEW_USERS'),
      canCreateUsers: hasPermission(userRole, 'CREATE_USERS'),
      canEditUsers: hasPermission(userRole, 'EDIT_USERS'),
      canDeleteUsers: hasPermission(userRole, 'DELETE_USERS'),
      
      // Course Management
      canViewCourses: hasPermission(userRole, 'VIEW_COURSES'),
      canCreateCourses: hasPermission(userRole, 'CREATE_COURSES'),
      canEditCourses: hasPermission(userRole, 'EDIT_COURSES'),
      canDeleteCourses: hasPermission(userRole, 'DELETE_COURSES'),
      
      // Analytics
      canViewAnalytics: hasPermission(userRole, 'VIEW_ANALYTICS'),
      canExportAnalytics: hasPermission(userRole, 'EXPORT_ANALYTICS'),
      
      // System Settings
      canViewSettings: hasPermission(userRole, 'VIEW_SETTINGS'),
      canEditSettings: hasPermission(userRole, 'EDIT_SETTINGS'),
      
      // Franchise Management
      canManageFranchises: hasPermission(userRole, 'MANAGE_FRANCHISES'),
      canViewFranchiseData: hasPermission(userRole, 'VIEW_FRANCHISE_DATA'),
    };
  }, [userRole]);
  
  // Check if user has permission for specific action
  const checkPermission = useCallback((permission) => {
    return hasPermission(userRole, permission);
  }, [userRole]);
  
  // Check if user has any of the specified permissions
  const checkAnyPermission = useCallback((permissionList) => {
    return hasAnyPermission(userRole, permissionList);
  }, [userRole]);
  
  // Check if user has all of the specified permissions
  const checkAllPermissions = useCallback((permissionList) => {
    return hasAllPermissions(userRole, permissionList);
  }, [userRole]);
  
  // Check if user can access a specific route
  const canAccess = useCallback((route) => {
    return canAccessRoute(userRole, route);
  }, [userRole]);
  
  // Get all permissions for current user role
  const userPermissions = useMemo(() => {
    return getRolePermissions(userRole);
  }, [userRole]);
  
  // Check if user is admin (super admin or franchise admin)
  const isAdmin = useMemo(() => {
    return userRole === 'super_admin' || userRole === 'franchise_admin';
  }, [userRole]);
  
  // Check if user is super admin
  const isSuperAdmin = useMemo(() => {
    return userRole === 'super_admin';
  }, [userRole]);
  
  // Check if user is instructor
  const isInstructor = useMemo(() => {
    return userRole === 'instructor';
  }, [userRole]);
  
  // Check if user is student
  const isStudent = useMemo(() => {
    return userRole === 'student';
  }, [userRole]);
  
  // Check if user is parent
  const isParent = useMemo(() => {
    return userRole === 'parent';
  }, [userRole]);
  
  return {
    // Permission checks
    ...permissions,
    checkPermission,
    checkAnyPermission,
    checkAllPermissions,
    canAccess,
    
    // User role checks
    userRole,
    isAdmin,
    isSuperAdmin,
    isInstructor,
    isStudent,
    isParent,
    
    // All permissions for current role
    userPermissions,
    
    // Helper methods
    hasRole: (role) => userRole === role,
    hasAnyRole: (roles) => roles.includes(userRole),
  };
};
