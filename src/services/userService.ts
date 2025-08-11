// User service for user-related operations
import { lambdaService } from './lambdaService';
import { User, UserCreateData, UserUpdateData, UserFilters, UserTableData } from '../types/user.types';
import { PaginatedResponse } from '../types/common.types';

export class UserService {
  // Get all users with optional filtering
  async getUsers(filters?: UserFilters, page = 1, limit = 10): Promise<PaginatedResponse<UserTableData>> {
    try {
      const params: any = { page, limit };
      
      if (filters?.role) params.role = filters.role;
      if (filters?.franchiseId) params.franchiseId = filters.franchiseId;
      if (filters?.isActive !== undefined) params.isActive = filters.isActive;
      if (filters?.search) params.search = filters.search;
      if (filters?.dateRange) {
        params.fromDate = filters.dateRange.from.toISOString();
        params.toDate = filters.dateRange.to.toISOString();
      }

      const response = await lambdaService.getUsers(params);
      return response;
    } catch (error) {
      console.error('Failed to fetch users:', error);
      throw error;
    }
  }

  // Get user by ID
  async getUserById(userId: string): Promise<User | null> {
    try {
      // TODO: Implement get user by ID API call
      // For now, return mock data
      return null;
    } catch (error) {
      console.error('Failed to fetch user:', error);
      throw error;
    }
  }

  // Create new user
  async createUser(userData: UserCreateData): Promise<UserTableData> {
    try {
      const response = await lambdaService.createUser(userData);
      if (response.success && response.data) {
        return response.data;
      }
      throw new Error(response.error || 'Failed to create user');
    } catch (error) {
      console.error('Failed to create user:', error);
      throw error;
    }
  }

  // Update existing user
  async updateUser(userId: string, userData: UserUpdateData): Promise<UserTableData> {
    try {
      const response = await lambdaService.updateUser(userId, userData);
      if (response.success && response.data) {
        return response.data;
      }
      throw new Error(response.error || 'Failed to update user');
    } catch (error) {
      console.error('Failed to update user:', error);
      throw error;
    }
  }

  // Delete user
  async deleteUser(userId: string): Promise<boolean> {
    try {
      const response = await lambdaService.deleteUser(userId);
      if (response.success) {
        return true;
      }
      throw new Error(response.error || 'Failed to delete user');
    } catch (error) {
      console.error('Failed to delete user:', error);
      throw error;
    }
  }

  // Get user statistics
  async getUserStats(): Promise<any> {
    try {
      // TODO: Implement get user statistics API call
      return {
        totalUsers: 0,
        activeUsers: 0,
        usersByRole: {},
        newUsersThisMonth: 0,
        usersByFranchise: {},
      };
    } catch (error) {
      console.error('Failed to fetch user statistics:', error);
      throw error;
    }
  }

  // Search users
  async searchUsers(query: string, filters?: UserFilters): Promise<UserTableData[]> {
    try {
      const searchFilters: UserFilters = {
        ...filters,
        search: query,
      };
      
      const response = await this.getUsers(searchFilters);
      if (response.success && response.data) {
        return response.data;
      }
      return [];
    } catch (error) {
      console.error('Failed to search users:', error);
      return [];
    }
  }
}

export const userService = new UserService();
export default userService;
