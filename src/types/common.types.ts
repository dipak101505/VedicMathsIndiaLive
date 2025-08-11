// Common types used throughout the application

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
  total?: number;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: PaginationParams;
}

export interface LoadingState {
  loading: boolean;
  error: string | null;
}

export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export type Status = 'active' | 'inactive' | 'pending' | 'completed' | 'cancelled';

export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}
