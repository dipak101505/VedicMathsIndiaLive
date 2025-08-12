import React, { useEffect, useRef } from 'react';
import { useAuthStore } from '../../store/authStore';
import { firebaseAuth } from '../../services/firebase';
import { dynamoDBUserService } from '../../services/dynamoDBService';
import { lambdaService } from '../../services/lambdaService';
import toast from 'react-hot-toast';

const AuthProvider = ({ children }) => {
  const { setUser, setLoading, setError } = useAuthStore();
  const authListenerRef = useRef(null);
  const isInitializedRef = useRef(false);

  // Debug when AuthProvider mounts
  useEffect(() => {
    console.log('🚀 AuthProvider: Component mounted');
    console.log('🚀 AuthProvider: Current auth store state:', useAuthStore.getState());
    
    return () => {
      console.log('🚀 AuthProvider: Component unmounting');
    };
  }, []);

  // Initialize authentication listener at app level
  useEffect(() => {
    // Prevent duplicate initialization
    if (isInitializedRef.current) {
      console.log('🔐 AuthProvider: Already initialized, skipping...');
      return;
    }

    console.log('🔐 AuthProvider: Initializing authentication listener...');
    isInitializedRef.current = true;
    
    try {
      // Check if firebaseAuth is available
      if (!firebaseAuth || !firebaseAuth.onAuthStateChanged) {
        console.error('❌ AuthProvider: firebaseAuth or onAuthStateChanged not available');
        return;
      }

      // Check if user is already authenticated in the store
      const currentStoreState = useAuthStore.getState();
      if (currentStoreState.user && currentStoreState.isAuthenticated) {
        console.log('🔐 AuthProvider: User already authenticated in store, skipping initialization');
        return;
      }

      const unsubscribe = firebaseAuth.onAuthStateChanged(async (firebaseUser) => {
        console.log('🔄 AuthProvider: Auth state changed:', firebaseUser ? 'User logged in' : 'No user');
        
        if (firebaseUser) {
          try {
            console.log('👤 AuthProvider: User authenticated:', firebaseUser.email);
            
            // Create basic user profile for now (simplified)
            const userData = {
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              displayName: firebaseUser.displayName || 'User',
              photoURL: firebaseUser.photoURL,
              role: 'student', // Default role
              firstName: 'User',
              lastName: 'User',
              isActive: true,
              emailVerified: firebaseUser.emailVerified,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              lastLoginAt: new Date().toISOString(),
              preferences: {
                notifications: true,
                theme: 'light',
                language: 'en'
              }
            };
            
            console.log('📝 AuthProvider: Created user profile:', userData);
            setUser(userData);
            console.log('✅ AuthProvider: User data set in store:', userData);
            
            // Set auth token for Lambda service
            try {
              const token = await firebaseUser.getIdToken();
              lambdaService.setAuthToken(token);
              console.log('🔑 AuthProvider: Auth token set for Lambda service');
            } catch (tokenError) {
              console.warn('⚠️ AuthProvider: Failed to get auth token:', tokenError);
            }
            
            toast.success('Welcome back!');
            
          } catch (error) {
            console.error('❌ AuthProvider: Error setting up user profile:', error);
            setError('Failed to load user data');
          }
        } else {
          console.log('👤 AuthProvider: No user authenticated, clearing user data');
          setUser(null);
          lambdaService.setAuthToken(null);
        }
      });

      // Store the unsubscribe function
      authListenerRef.current = unsubscribe;

      // Also check current auth state immediately
      console.log('🔐 AuthProvider: Checking current auth state...');
      try {
        const currentUser = firebaseAuth.getCurrentUser();
        if (currentUser) {
          console.log('🔐 AuthProvider: Current user found:', currentUser.email);
          // The onAuthStateChanged callback should handle this
        } else {
          console.log('🔐 AuthProvider: No current user found');
        }
      } catch (error) {
        console.warn('⚠️ AuthProvider: Error checking current user:', error);
      }

      return () => {
        console.log('🔐 AuthProvider: Cleaning up authentication listener');
        if (authListenerRef.current) {
          authListenerRef.current();
          authListenerRef.current = null;
        }
        isInitializedRef.current = false;
      };
    } catch (error) {
      console.error('❌ AuthProvider: Error setting up authentication listener:', error);
      setError('Failed to initialize authentication');
      isInitializedRef.current = false;
    }
  }, [setUser, setError]);

  console.log('🚀 AuthProvider: Rendering children');
  return (
    <>
      {/* Debug element to confirm AuthProvider is rendered */}
      <div style={{ 
        position: 'fixed', 
        top: 0, 
        right: 0, 
        background: 'red', 
        color: 'white', 
        padding: '2px 6px', 
        fontSize: '10px', 
        zIndex: 9999,
        display: 'block' // Make visible for debugging
      }}>
        AuthProvider Active
      </div>
      {children}
    </>
  );
};

export default AuthProvider;
