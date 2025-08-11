// Authentication types

export type UserRole = 'super_admin' | 'franchise_admin' | 'instructor' | 'student' | 'parent';

export interface UserProfile {
  firstName: string;
  lastName: string;
  avatar?: string;
  phone?: string;
  address?: Address;
  dateOfBirth?: Date;
  gender?: 'male' | 'female' | 'other';
}

export interface User extends BaseEntity {
  email: string;
  role: UserRole;
  franchiseId?: string;
  profile: UserProfile;
  isEmailVerified: boolean;
  isActive: boolean;
  lastLoginAt?: Date;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  role: 'instructor' | 'student' | 'parent';
  franchiseId?: string;
}

export interface PasswordResetRequest {
  email: string;
}

export interface PasswordReset {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

// Import BaseEntity and Address from common types
import { BaseEntity, Address } from './common.types';
