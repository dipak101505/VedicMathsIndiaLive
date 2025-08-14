import { useCallback } from 'react';
import { useAuthStore } from '../store/authStore';
import { firebaseAuth } from '../services/firebase';
import { dynamoDBUserService } from '../services/dynamoDBService';
import { lambdaService } from '../services/lambdaService';
import toast from 'react-hot-toast';

export const useAuth = () => {
  const { 
    user, 
    isAuthenticated, 
    loading, 
    error, 
    setUser, 
    setLoading, 
    setError, 
    logout: storeLogout,
    clearError 
  } = useAuthStore();

  // Debug logging
  console.log('🔑 useAuth: Hook called, current state:', {
    hasUser: !!user,
    userRole: user?.role,
    isAuthenticated,
    loading,
    error
  });

  // Login function
  const login = useCallback(async (email, password) => {
    console.log('🔐 useAuth: Attempting login for:', email);
    setLoading(true);
    setError(null);
    
    try {
      const result = await firebaseAuth.signIn(email, password);
      
      if (result.success) {
        console.log('✅ useAuth: Login successful for:', email);
        
        // Set minimal user state immediately to show login success
        // AuthProvider will override this with full user data from DynamoDB
        const tempUser = {
          uid: result.user.uid,
          email: result.user.email,
          role: 'loading', // Temporary role until real data loads
          isActive: true
        };
        setUser(tempUser);
        
        // Manually trigger user data fetch since AuthProvider might not fire immediately
        try {
          console.log('🔐 useAuth: Manually fetching user data from DynamoDB');
          const existingUser = await dynamoDBUserService.getUser(result.user.uid);
          if (existingUser.success && existingUser.data) {
            console.log('✅ useAuth: User data fetched manually, setting real user:', existingUser.data.role);
            setUser(existingUser.data);
          } else {
            console.log('ℹ️ useAuth: No existing user data, keeping temporary user');
          }
        } catch (error) {
          console.warn('⚠️ useAuth: Manual user data fetch failed:', error);
        }
        
        toast.success('Login successful!');
        return { success: true };
      } else {
        console.error('❌ useAuth: Login failed for:', email, result.error);
        setError(result.error);
        toast.error(result.error);
        return { success: false, error: result.error };
      }
    } catch (error) {
      console.error('❌ useAuth: Login error for:', email, error);
      const errorMessage = error.message || 'Login failed';
      setError(errorMessage);
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError, setUser]);

  // Register function
  const register = useCallback(async (email, password, userData) => {
    console.log('🔐 useAuth: Attempting registration for:', email);
    setLoading(true);
    setError(null);
    
    try {
      const result = await firebaseAuth.signUp(email, password, userData);
      
      if (result.success) {
        console.log('✅ useAuth: Registration successful for:', email);
        
        // Save user data to DynamoDB
        console.log('💾 useAuth: Saving user data to DynamoDB:', userData);
        const saveResult = await dynamoDBUserService.saveUser(result.user.uid, userData);
        
        if (saveResult.success) {
          console.log('✅ useAuth: User data saved to DynamoDB successfully');
        } else {
          console.warn('⚠️ useAuth: Failed to save user data to DynamoDB:', saveResult.error);
          // Don't fail registration if DynamoDB save fails
        }
        
        // User will be set by the AuthProvider auth state listener
        toast.success('Registration successful!');
        return { success: true };
      } else {
        console.error('❌ useAuth: Registration failed for:', email, result.error);
        setError(result.error);
        toast.error(result.error);
        return { success: false, error: result.error };
      }
    } catch (error) {
      console.error('❌ useAuth: Registration error for:', email, error);
      const errorMessage = error.message || 'Registration failed';
      setError(errorMessage);
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError]);

  // Logout function
  const logout = useCallback(async () => {
    console.log('🔐 useAuth: Attempting logout for user:', user?.email);
    setLoading(true);
    
    try {
      const result = await firebaseAuth.signOut();
      
      if (result.success) {
        console.log('✅ useAuth: Logout successful');
        storeLogout();
        lambdaService.setAuthToken(null);
        toast.success('Logged out successfully');
        return { success: true };
      } else {
        console.error('❌ useAuth: Logout failed:', result.error);
        setError(result.error);
        toast.error(result.error);
        return { success: false, error: result.error };
      }
    } catch (error) {
      console.error('❌ useAuth: Logout error:', error);
      const errorMessage = error.message || 'Logout failed';
      setError(errorMessage);
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [storeLogout, setLoading, setError, user]);

  // Update user profile
  const updateProfile = useCallback(async (updates) => {
    if (!user?.uid) {
      console.error('❌ useAuth: Cannot update profile: No user logged in');
      return { success: false, error: 'No user logged in' };
    }
    
    console.log('🔐 useAuth: Updating profile for user:', user.email, updates);
    setLoading(true);
    
    try {
      // Update user data in DynamoDB
      const result = await dynamoDBUserService.updateUser(user.uid, updates);
      
      if (result.success) {
        // Update local user state
        const updatedUser = { ...user, ...result.data };
        setUser(updatedUser);
        console.log('✅ useAuth: Profile updated successfully in DynamoDB:', updatedUser);
        toast.success('Profile updated successfully');
        return { success: true };
      } else {
        throw new Error(result.error);
      }
      
    } catch (error) {
      console.error('❌ useAuth: Profile update error:', error);
      const errorMessage = error.message || 'Profile update failed';
      setError(errorMessage);
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [user, setUser, setLoading, setError]);

  return {
    user,
    isAuthenticated,
    loading,
    error,
    login,
    register,
    logout,
    updateProfile,
    clearError,
  };
};
