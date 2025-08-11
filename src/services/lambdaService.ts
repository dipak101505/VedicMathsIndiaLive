// AWS Lambda service for backend API calls
// TODO: Replace with actual Lambda endpoints

import { PaginatedResponse } from '../types/common.types';
import { UserTableData } from '../types/user.types';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://api.vedicmathsindia.com';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

class LambdaService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseUrl}${endpoint}`;
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  // User management
  async getUsers(params?: { page?: number; limit?: number; role?: string }): Promise<PaginatedResponse<UserTableData>> {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.role) queryParams.append('role', params.role);

    // Mock response for now - replace with actual API call
    return {
      success: true,
      data: [],
      pagination: {
        page: params?.page || 1,
        limit: params?.limit || 10,
        total: 0,
      },
    };
  }

  async createUser(userData: any): Promise<ApiResponse<UserTableData>> {
    return this.request<UserTableData>('/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async updateUser(userId: string, userData: any): Promise<ApiResponse<UserTableData>> {
    return this.request<UserTableData>(`/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  async deleteUser(userId: string) {
    return this.request(`/users/${userId}`, {
      method: 'DELETE',
    });
  }

  // Course management
  async getCourses(params?: { page?: number; limit?: number; instructorId?: string }) {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.instructorId) queryParams.append('instructorId', params.instructorId);

    return this.request(`/courses?${queryParams.toString()}`);
  }

  async createCourse(courseData: any) {
    return this.request('/courses', {
      method: 'POST',
      body: JSON.stringify(courseData),
    });
  }

  async updateCourse(courseId: string, courseData: any) {
    return this.request(`/courses/${courseId}`, {
      method: 'PUT',
      body: JSON.stringify(courseData),
    });
  }

  async deleteCourse(courseId: string) {
    return this.request(`/courses/${courseId}`, {
      method: 'DELETE',
    });
  }

  // Analytics
  async getAnalytics(params?: { type: string; dateRange?: string }) {
    const queryParams = new URLSearchParams();
    if (params?.type) queryParams.append('type', params.type);
    if (params?.dateRange) queryParams.append('dateRange', params.dateRange);

    return this.request(`/analytics?${queryParams.toString()}`);
  }
}

export const lambdaService = new LambdaService(API_BASE_URL);
export default lambdaService;
