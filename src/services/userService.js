// User service for managing user operations
import { lambdaService } from './lambdaService';
import { firestoreService } from './firebase';
import toast from 'react-hot-toast';

export const userService = {
  // Get all users with optional filters
  async getUsers(params = {}) {
    try {
      const result = await lambdaService.getUsers(params);
      return result;
    } catch (error) {
      console.error('Error fetching users:', error);
      return { success: false, error: error.message };
    }
  },

  // Get user by ID
  async getUser(userId) {
    try {
      const result = await lambdaService.getUser(userId);
      return result;
    } catch (error) {
      console.error('Error fetching user:', error);
      return { success: false, error: error.message };
    }
  },

  // Create new user
  async createUser(userData) {
    try {
      const result = await lambdaService.createUser(userData);
      if (result.success) {
        toast.success('User created successfully');
      }
      return result;
    } catch (error) {
      console.error('Error creating user:', error);
      toast.error('Failed to create user');
      return { success: false, error: error.message };
    }
  },

  // Update user
  async updateUser(userId, updates) {
    try {
      const result = await lambdaService.updateUser(userId, updates);
      if (result.success) {
        toast.success('User updated successfully');
      }
      return result;
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error('Failed to update user');
      return { success: false, error: error.message };
    }
  },

  // Delete user
  async deleteUser(userId) {
    try {
      const result = await lambdaService.deleteUser(userId);
      if (result.success) {
        toast.success('User deleted successfully');
      }
      return result;
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Failed to delete user');
      return { success: false, error: error.message };
    }
  },

  // Update user profile in Firestore
  async updateProfile(userId, profileData) {
    try {
      const result = await firestoreService.updateUser(userId, profileData);
      if (result.success) {
        toast.success('Profile updated successfully');
      }
      return result;
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
      return { success: false, error: error.message };
    }
  },

  // Get user profile from Firestore
  async getProfile(userId) {
    try {
      const result = await firestoreService.getUser(userId);
      return result;
    } catch (error) {
      console.error('Error fetching profile:', error);
      return { success: false, error: error.message };
    }
  },

  // Search users
  async searchUsers(query, filters = {}) {
    try {
      const searchParams = {
        search: query,
        ...filters,
      };
      const result = await lambdaService.getUsers(searchParams);
      return result;
    } catch (error) {
      console.error('Error searching users:', error);
      return { success: false, error: error.message };
    }
  },

  // Get users by role
  async getUsersByRole(role, params = {}) {
    try {
      const roleParams = {
        role,
        ...params,
      };
      const result = await lambdaService.getUsers(roleParams);
      return result;
    } catch (error) {
      console.error('Error fetching users by role:', error);
      return { success: false, error: error.message };
    }
  },

  // Get users by franchise
  async getUsersByFranchise(franchiseId, params = {}) {
    try {
      const franchiseParams = {
        franchiseId,
        ...params,
      };
      const result = await lambdaService.getUsers(franchiseParams);
      return result;
    } catch (error) {
      console.error('Error fetching users by franchise:', error);
      return { success: false, error: error.message };
    }
  },

  // Bulk operations
  async bulkUpdateUsers(userIds, updates) {
    try {
      const promises = userIds.map(userId => this.updateUser(userId, updates));
      const results = await Promise.allSettled(promises);
      
      const successful = results.filter(result => result.status === 'fulfilled' && result.value.success);
      const failed = results.filter(result => result.status === 'rejected' || !result.value.success);
      
      if (successful.length > 0) {
        toast.success(`Successfully updated ${successful.length} users`);
      }
      
      if (failed.length > 0) {
        toast.error(`Failed to update ${failed.length} users`);
      }
      
      return {
        success: true,
        successful: successful.length,
        failed: failed.length,
        results,
      };
    } catch (error) {
      console.error('Error in bulk update:', error);
      toast.error('Bulk update failed');
      return { success: false, error: error.message };
    }
  },

  async bulkDeleteUsers(userIds) {
    try {
      const promises = userIds.map(userId => this.deleteUser(userId));
      const results = await Promise.allSettled(promises);
      
      const successful = results.filter(result => result.status === 'fulfilled' && result.value.success);
      const failed = results.filter(result => result.status === 'rejected' || !result.value.success);
      
      if (successful.length > 0) {
        toast.success(`Successfully deleted ${successful.length} users`);
      }
      
      if (failed.length > 0) {
        toast.error(`Failed to delete ${failed.length} users`);
      }
      
      return {
        success: true,
        successful: successful.length,
        failed: failed.length,
        results,
      };
    } catch (error) {
      console.error('Error in bulk delete:', error);
      toast.error('Bulk delete failed');
      return { success: false, error: error.message };
    }
  },

  // Export users
  async exportUsers(format = 'csv', filters = {}) {
    try {
      const exportParams = {
        export: format,
        ...filters,
      };
      const result = await lambdaService.getUsers(exportParams);
      return result;
    } catch (error) {
      console.error('Error exporting users:', error);
      toast.error('Failed to export users');
      return { success: false, error: error.message };
    }
  },
};
