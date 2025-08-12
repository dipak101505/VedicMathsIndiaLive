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

  // Component lifecycle management
  useEffect(() => {
    return () => {
      // Cleanup on unmount
    };
  }, []);

  // Initialize authentication listener
  useEffect(() => {
    if (isInitializedRef.current) {
      return;
    }

    try {
      isInitializedRef.current = true;

      const unsubscribe = firebaseAuth.onAuthStateChanged(async (firebaseUser) => {
        if (firebaseUser) {
          try {
            // Check if user data already exists in DynamoDB
            const existingUser = await dynamoDBUserService.getUser(firebaseUser.uid);
            
            if (existingUser.success && existingUser.user) {
              setUser(existingUser.user);
              
              // Set auth token for Lambda service
              try {
                const token = await firebaseUser.getIdToken();
                lambdaService.setAuthToken(token);
              } catch (tokenError) {
                console.warn('⚠️ AuthProvider: Failed to get auth token:', tokenError);
              }
              
              toast.success('Welcome back!');
            } else {
              // Create new user profile
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
              
              setUser(userData);
              
              // Set auth token for Lambda service
              try {
                const token = await firebaseUser.getIdToken();
                lambdaService.setAuthToken(token);
              } catch (tokenError) {
                console.warn('⚠️ AuthProvider: Failed to get auth token:', tokenError);
              }
              
              toast.success('Welcome back!');
              
            }
          } catch (error) {
            console.error('❌ AuthProvider: Error setting up user profile:', error);
            setError('Failed to load user data');
          }
        } else {
          setUser(null);
          lambdaService.setAuthToken(null);
        }
      });

      // Store the unsubscribe function
      authListenerRef.current = unsubscribe;

      // Also check current auth state immediately
      try {
        const currentUser = firebaseAuth.getCurrentUser();
        if (currentUser) {
          // The onAuthStateChanged callback should handle this
        }
      } catch (error) {
        console.warn('⚠️ AuthProvider: Error checking current user:', error);
      }

      return () => {
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

  return (
    <>
      {children}
    </>
  );
};

export default AuthProvider;
