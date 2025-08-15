import { getFunctions, httpsCallable } from 'firebase/functions';
import { getAuth } from 'firebase/auth';

// Initialize Firebase Functions
const functions = getFunctions();

/**
 * Claims Management Service
 * Handles all custom claims operations through Cloud Functions
 */
export const claimsService = {
  /**
   * Set custom claims for a user
   * @param {string} uid - User ID
   * @param {object} claims - Claims object
   * @returns {Promise<object>} - Result from Cloud Function
   */
  async setUserClaims(uid, claims) {
    try {
      console.log('🔐 ClaimsService: Setting claims for user:', uid, claims);
      
      const setUserClaimsFunction = httpsCallable(functions, 'setUserClaims');
      const result = await setUserClaimsFunction({ uid, claims });
      
      console.log('✅ ClaimsService: Claims set successfully:', result.data);
      return result.data;
    } catch (error) {
      console.error('❌ ClaimsService: Failed to set claims:', error);
      throw error;
    }
  },

  /**
   * Update existing user claims
   * @param {string} uid - User ID
   * @param {object} claims - Updated claims object
   * @returns {Promise<object>} - Result from Cloud Function
   */
  async updateUserClaims(uid, claims) {
    try {
      console.log('🔐 ClaimsService: Updating claims for user:', uid, claims);
      
      const updateUserClaimsFunction = httpsCallable(functions, 'updateUserClaims');
      const result = await updateUserClaimsFunction({ uid, claims });
      
      console.log('✅ ClaimsService: Claims updated successfully:', result.data);
      return result.data;
    } catch (error) {
      console.error('❌ ClaimsService: Failed to update claims:', error);
      throw error;
    }
  },

  /**
   * Get custom claims for a user
   * @param {string} uid - User ID (optional, defaults to current user)
   * @returns {Promise<object>} - Claims data
   */
  async getUserClaims(uid = null) {
    try {
      console.log('🔐 ClaimsService: Getting claims for user:', uid || 'current user');
      
      const getUserClaimsFunction = httpsCallable(functions, 'getUserClaims');
      const result = await getUserClaimsFunction({ uid });
      
      console.log('✅ ClaimsService: Claims retrieved successfully:', result.data);
      return result.data;
    } catch (error) {
      console.error('❌ ClaimsService: Failed to get claims:', error);
      throw error;
    }
  },

  /**
   * Remove custom claims from a user (admin only)
   * @param {string} uid - User ID
   * @returns {Promise<object>} - Result from Cloud Function
   */
  async removeUserClaims(uid) {
    try {
      console.log('🔐 ClaimsService: Removing claims for user:', uid);
      
      const removeUserClaimsFunction = httpsCallable(functions, 'removeUserClaims');
      const result = await removeUserClaimsFunction({ uid });
      
      console.log('✅ ClaimsService: Claims removed successfully:', result.data);
      return result.data;
    } catch (error) {
      console.error('❌ ClaimsService: Failed to remove claims:', error);
      throw error;
    }
  },

  /**
   * Health check for claims functions
   * @returns {Promise<object>} - Health status
   */
  async healthCheck() {
    try {
      console.log('🔐 ClaimsService: Checking health status');
      
      const healthCheckFunction = httpsCallable(functions, 'healthCheck');
      const result = await healthCheckFunction();
      
      console.log('✅ ClaimsService: Health check passed:', result.data);
      return result.data;
    } catch (error) {
      console.error('❌ ClaimsService: Health check failed:', error);
      throw error;
    }
  },

  /**
   * Extract claims from JWT token
   * @param {string} token - Firebase ID token
   * @returns {object|null} - Decoded claims or null if invalid
   */
  getClaimsFromToken(token) {
    try {
      if (!token) {
        console.warn('⚠️ ClaimsService: No token provided for claims extraction');
        return null;
      }

      // Decode the JWT token (base64 decode the payload)
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      const decoded = JSON.parse(jsonPayload);
      
      // Extract custom claims
      const claims = {
        role: decoded.role || null,
        franchiseId: decoded.franchiseId || null,
        permissions: decoded.permissions || [],
        isActive: decoded.isActive !== undefined ? decoded.isActive : true,
        lastLoginAt: decoded.lastLoginAt || null,
        userType: decoded.userType || null,
        accessLevel: decoded.accessLevel || 0,
        updatedAt: decoded.updatedAt || null,
        updatedBy: decoded.updatedBy || null
      };

      console.log('✅ ClaimsService: Claims extracted from token:', claims);
      return claims;
    } catch (error) {
      console.error('❌ ClaimsService: Failed to decode token:', error);
      return null;
    }
  },

  /**
   * Get claims from current user's token
   * @returns {object|null} - Current user's claims or null
   */
  async getCurrentUserClaims() {
    try {
      const auth = getAuth();
      const currentUser = auth.currentUser;
      
      if (!currentUser) {
        console.warn('⚠️ ClaimsService: No current user found');
        return null;
      }

      const token = await currentUser.getIdToken();
      return this.getClaimsFromToken(token);
    } catch (error) {
      console.error('❌ ClaimsService: Failed to get current user claims:', error);
      return null;
    }
  },

  /**
   * Check if user has specific permission
   * @param {string} permission - Permission to check
   * @param {object} claims - User claims (optional, will fetch if not provided)
   * @returns {Promise<boolean>} - Whether user has permission
   */
  async hasPermission(permission, claims = null) {
    try {
      if (!claims) {
        claims = await this.getCurrentUserClaims();
      }

      if (!claims || !claims.permissions) {
        return false;
      }

      return claims.permissions.includes(permission);
    } catch (error) {
      console.error('❌ ClaimsService: Failed to check permission:', error);
      return false;
    }
  },

  /**
   * Check if user has specific role
   * @param {string} role - Role to check
   * @param {object} claims - User claims (optional, will fetch if not provided)
   * @returns {Promise<boolean>} - Whether user has role
   */
  async hasRole(role, claims = null) {
    try {
      if (!claims) {
        claims = await this.getCurrentUserClaims();
      }

      if (!claims) {
        return false;
      }

      return claims.role === role;
    } catch (error) {
      console.error('❌ ClaimsService: Failed to check role:', error);
      return false;
    }
  }
};

export default claimsService;
