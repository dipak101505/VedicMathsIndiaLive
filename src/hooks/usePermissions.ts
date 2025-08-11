import { useAuth } from './useAuth';
import {
  hasPermission,
  hasAnyPermission,
  hasAllPermissions,
  canAccessModule,
  canPerformAction,
  Permission,
} from '../utils/permissions';

export const usePermissions = () => {
  const { user } = useAuth();
  const userRole = user?.role || 'student';

  return {
    // Check if user has a specific permission
    hasPermission: (permission: Permission) => hasPermission(userRole, permission),
    
    // Check if user has any of the specified permissions
    hasAnyPermission: (permissions: Permission[]) => hasAnyPermission(userRole, permissions),
    
    // Check if user has all of the specified permissions
    hasAllPermissions: (permissions: Permission[]) => hasAllPermissions(userRole, permissions),
    
    // Check if user can access a specific module
    canAccessModule: (module: string) => canAccessModule(userRole, module),
    
    // Check if user can perform a specific action on a resource
    canPerformAction: (
      resource: string, 
      action: 'read' | 'create' | 'update' | 'delete'
    ) => canPerformAction(userRole, resource, action),
    
    // Get user role
    userRole,
    
    // Check if user is admin
    isAdmin: userRole === 'super_admin',
    
    // Check if user is franchise admin
    isFranchiseAdmin: userRole === 'franchise_admin',
    
    // Check if user is instructor
    isInstructor: userRole === 'instructor',
    
    // Check if user is student
    isStudent: userRole === 'student',
    
    // Check if user is parent
    isParent: userRole === 'parent',
  };
};
