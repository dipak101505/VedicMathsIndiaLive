// User management types

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  franchiseId?: string;
  isActive: boolean;
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserFilters {
  role?: UserRole;
  franchiseId?: string;
  isActive?: boolean;
  search?: string;
  dateRange?: {
    from: Date;
    to: Date;
  };
}

export interface UserTableData {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  franchiseName?: string;
  isActive: boolean;
  lastLoginAt?: Date;
  createdAt: Date;
}

export interface UserCreateData {
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  franchiseId?: string;
  phone?: string;
  address?: Address;
}

export interface UserUpdateData {
  firstName?: string;
  lastName?: string;
  role?: UserRole;
  franchiseId?: string;
  phone?: string;
  address?: Address;
  isActive?: boolean;
}

export interface UserStats {
  totalUsers: number;
  activeUsers: number;
  usersByRole: Record<UserRole, number>;
  newUsersThisMonth: number;
  usersByFranchise: Record<string, number>;
}

// Import types from auth types
import { UserRole } from './auth.types';
import { Address } from './common.types';
