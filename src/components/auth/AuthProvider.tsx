import React, { useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { authService } from '../../services/firebase';

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { checkAuth } = useAuth();

  useEffect(() => {
    // Set up Firebase auth state listener
    const unsubscribe = authService.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        // User is signed in, check our auth state
        checkAuth();
      } else {
        // User is signed out, clear our auth state
        checkAuth();
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [checkAuth]);

  return <>{children}</>;
};

export default AuthProvider;
