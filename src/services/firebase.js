// Firebase configuration and services
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAeDmPHUdTBOis1MgLpeVkLSm-m4AK4f5c",
  authDomain: "vedic-maths-india-10e72.firebaseapp.com",
  projectId: "vedic-maths-india-10e72",
  storageBucket: "vedic-maths-india-10e72.firebasestorage.app",
  messagingSenderId: "353413686476",
  appId: "1:353413686476:web:0e1ed6d955f445ccd48e69",
  measurementId: "G-H6PB1GM2LR"
};

// Log configuration for debugging
console.log('Firebase Config Check:', {
  apiKey: firebaseConfig.apiKey ? '✅ Set' : '❌ Missing',
  authDomain: firebaseConfig.authDomain ? '✅ Set' : '❌ Missing',
  projectId: firebaseConfig.projectId ? '✅ Set' : '❌ Missing',
  storageBucket: firebaseConfig.storageBucket ? '✅ Set' : '❌ Missing',
  messagingSenderId: firebaseConfig.messagingSenderId ? '✅ Set' : '❌ Missing',
  appId: firebaseConfig.appId ? '✅ Set' : '❌ Missing',
  measurementId: firebaseConfig.measurementId ? '✅ Set' : '❌ Missing',
});

// Check if all required Firebase config values are present
const hasValidConfig = Object.values(firebaseConfig).every(value => value && value !== 'undefined');

if (!hasValidConfig) {
  console.error('❌ Firebase configuration is incomplete!');
  console.error('Missing configuration values:', Object.keys(firebaseConfig).filter(key => !firebaseConfig[key]));
  console.error('Current values:', firebaseConfig);
}

// Initialize Firebase only if config is valid
let app, auth, analytics;

try {
  if (hasValidConfig) {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    analytics = getAnalytics(app);
    console.log('✅ Firebase initialized successfully');
    console.log('✅ Firebase Auth initialized');
    console.log('✅ Analytics initialized');
    console.log('ℹ️ Note: Using DynamoDB for user data storage');
    
    // Debug auth instance
    console.log('🔍 Auth instance details:', {
      app: app ? 'Initialized' : 'Not initialized',
      auth: auth ? 'Initialized' : 'Not initialized',
      authApp: auth?.app ? 'Has app reference' : 'No app reference',
      authConfig: auth?.config ? 'Has config' : 'No config'
    });
  } else {
    console.warn('⚠️ Firebase not initialized due to missing configuration');
    // Create mock objects to prevent crashes
    auth = {
      currentUser: null,
      onAuthStateChanged: () => () => {},
      signInWithEmailAndPassword: () => Promise.reject(new Error('Firebase not configured')),
      createUserWithEmailAndPassword: () => Promise.reject(new Error('Firebase not configured')),
      signOut: () => Promise.reject(new Error('Firebase not configured')),
    };
  }
} catch (error) {
  console.error('❌ Error initializing Firebase:', error);
  // Create mock objects to prevent crashes
  auth = {
    currentUser: null,
    onAuthStateChanged: () => () => {},
    signInWithEmailAndPassword: () => Promise.reject(new Error('Firebase initialization failed')),
    createUserWithEmailAndPassword: () => Promise.reject(new Error('Firebase initialization failed')),
    signOut: () => Promise.reject(new Error('Firebase initialization failed')),
  };
}

// Export initialized services
export { auth, analytics };

// Authentication functions
export const firebaseAuth = {
  // Sign in with email and password
  signIn: async (email, password) => {
    try {
      if (!hasValidConfig) {
        throw new Error('Firebase not configured. Please check your configuration.');
      }
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return { success: true, user: userCredential.user };
    } catch (error) {
      console.error('❌ Firebase signIn error:', error);
      return { success: false, error: error.message };
    }
  },

  // Create user with email and password
  signUp: async (email, password, userData) => {
    try {
      if (!hasValidConfig) {
        throw new Error('Firebase not configured. Please check your configuration.');
      }
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Note: User data will be saved to DynamoDB, not Firestore
      console.log('✅ Firebase user created, user data should be saved to DynamoDB:', userData);
      
      return { success: true, user: userCredential.user };
    } catch (error) {
      console.error('❌ Firebase signUp error:', error);
      return { success: false, error: error.message };
    }
  },

  // Sign out
  signOut: async () => {
    try {
      if (!hasValidConfig) {
        throw new Error('Firebase not configured. Please check your configuration.');
      }
      await signOut(auth);
      return { success: true };
    } catch (error) {
      console.error('❌ Firebase signOut error:', error);
      return { success: false, error: error.message };
    }
  },

  // Get current user
  getCurrentUser: () => {
    return auth.currentUser;
  },

  // Listen to auth state changes
  onAuthStateChanged: (callback) => {
    return onAuthStateChanged(auth, callback);
  },
};

export default app;
