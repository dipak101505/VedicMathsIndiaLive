/**
 * Firebase error code to user-friendly message mapping
 * Centralized error message handling for consistent user experience
 */

export const FIREBASE_ERROR_MESSAGES = {
  // Authentication errors
  'auth/invalid-credential': 'Invalid email or password. Please check your credentials and try again.',
  'auth/user-not-found': 'No account found with this email address. Please check your email or create a new account.',
  'auth/wrong-password': 'Incorrect password. Please try again.',
  'auth/invalid-email': 'Invalid email address. Please enter a valid email.',
  'auth/user-disabled': 'This account has been disabled. Please contact support.',
  'auth/too-many-requests': 'Too many failed login attempts. Please try again later.',
  'auth/network-request-failed': 'Network error. Please check your internet connection and try again.',
  'auth/operation-not-allowed': 'Email/password sign-in is not enabled. Please contact support.',
  
  // Registration errors
  'auth/weak-password': 'Password is too weak. Please choose a stronger password.',
  'auth/email-already-in-use': 'An account with this email already exists. Please use a different email or sign in.',
  
  // General auth errors
  'auth/requires-recent-login': 'Please log in again to complete this action.',
  'auth/account-exists-with-different-credential': 'An account already exists with the same email address but different sign-in credentials.',
  'auth/invalid-verification-code': 'Invalid verification code. Please check and try again.',
  'auth/invalid-verification-id': 'Invalid verification ID. Please request a new verification code.',
  'auth/quota-exceeded': 'Service temporarily unavailable. Please try again later.',
  'auth/credential-already-in-use': 'This credential is already associated with a different user account.',
  'auth/timeout': 'Request timed out. Please try again.',
  
  // Popup/redirect errors
  'auth/cancelled-popup-request': 'Sign-in was cancelled.',
  'auth/popup-closed-by-user': 'Sign-in popup was closed before completion.',
  'auth/popup-blocked': 'Sign-in popup was blocked by the browser. Please allow popups for this site.',
  
  // URI and domain errors
  'auth/unauthorized-continue-uri': 'Unauthorized continue URI. Please contact support.',
  'auth/invalid-continue-uri': 'Invalid continue URI. Please contact support.',
  'auth/unsupported-continue-uri': 'Unsupported continue URI. Please contact support.',
  'auth/invalid-dynamic-link-domain': 'Invalid dynamic link domain. Please contact support.',
  
  // Configuration errors
  'auth/argument-error': 'Invalid argument provided. Please check your input and try again.',
  'auth/invalid-persistence-type': 'Invalid persistence type. Please contact support.',
  'auth/unsupported-persistence-type': 'Unsupported persistence type. Please contact support.',
  'auth/invalid-tenant-id': 'Invalid tenant ID. Please contact support.',
  'auth/tenant-id-mismatch': 'Tenant ID mismatch. Please contact support.',
  'auth/invalid-oauth-provider': 'Invalid OAuth provider. Please contact support.',
  'auth/invalid-oauth-client-id': 'Invalid OAuth client ID. Please contact support.',
};

/**
 * Get user-friendly error message for Firebase error code
 * @param {string} errorCode - Firebase error code (e.g., 'auth/invalid-credential')
 * @param {string} fallbackMessage - Custom fallback message (optional)
 * @returns {string} User-friendly error message
 */
export const getFirebaseErrorMessage = (errorCode, fallbackMessage = null) => {
  if (!errorCode) {
    return fallbackMessage || 'An unexpected error occurred. Please try again.';
  }
  
  const userFriendlyMessage = FIREBASE_ERROR_MESSAGES[errorCode];
  
  if (userFriendlyMessage) {
    return userFriendlyMessage;
  }
  
  // If no specific mapping found, provide a generic message
  return fallbackMessage || 'An unexpected error occurred. Please try again.';
};

/**
 * Check if an error is a Firebase authentication error
 * @param {Error} error - Error object to check
 * @returns {boolean} True if it's a Firebase auth error
 */
export const isFirebaseAuthError = (error) => {
  return error && error.code && error.code.startsWith('auth/');
};

/**
 * Get error type for categorization
 * @param {string} errorCode - Firebase error code
 * @returns {string} Error type ('auth', 'network', 'validation', 'unknown')
 */
export const getErrorType = (errorCode) => {
  if (!errorCode) return 'unknown';
  
  if (errorCode.startsWith('auth/')) {
    if (errorCode.includes('network') || errorCode.includes('timeout')) {
      return 'network';
    }
    if (errorCode.includes('invalid') || errorCode.includes('wrong')) {
      return 'validation';
    }
    return 'auth';
  }
  
  return 'unknown';
};

/**
 * Get suggested action for error
 * @param {string} errorCode - Firebase error code
 * @returns {string} Suggested action for user
 */
export const getSuggestedAction = (errorCode) => {
  const suggestions = {
    'auth/invalid-credential': 'Check your email and password spelling',
    'auth/user-not-found': 'Verify your email address or create a new account',
    'auth/wrong-password': 'Try entering your password again',
    'auth/invalid-email': 'Enter a valid email address (e.g., user@example.com)',
    'auth/too-many-requests': 'Wait a few minutes before trying again',
    'auth/network-request-failed': 'Check your internet connection',
    'auth/weak-password': 'Use at least 6 characters with letters and numbers',
    'auth/email-already-in-use': 'Sign in with existing account or use different email',
  };
  
  return suggestions[errorCode] || 'Please try again or contact support if the problem persists.';
};

/**
 * Handle Firebase errors with toast notification
 * @param {Error} error - Error object from Firebase
 * @param {Function} toast - Toast function (e.g., toast.error)
 * @param {string} fallbackMessage - Custom fallback message
 * @returns {string} User-friendly error message
 */
export const handleFirebaseError = (error, toast, fallbackMessage = null) => {
  const errorMessage = getFirebaseErrorMessage(error.code, fallbackMessage);
  
  if (toast && typeof toast === 'function') {
    // For react-hot-toast, use toast.error for error messages
    toast.error(errorMessage);
  }
  
  return errorMessage;
};

/**
 * Check if error is retryable
 * @param {string} errorCode - Firebase error code
 * @returns {boolean} True if user should retry the action
 */
export const isRetryableError = (errorCode) => {
  const retryableErrors = [
    'auth/network-request-failed',
    'auth/timeout',
    'auth/quota-exceeded',
    'auth/too-many-requests'
  ];
  
  return retryableErrors.includes(errorCode);
};

/**
 * Get retry delay suggestion in milliseconds
 * @param {string} errorCode - Firebase error code
 * @returns {number} Suggested delay in milliseconds
 */
export const getRetryDelay = (errorCode) => {
  const delays = {
    'auth/too-many-requests': 60000, // 1 minute
    'auth/quota-exceeded': 300000,   // 5 minutes
    'auth/network-request-failed': 5000, // 5 seconds
    'auth/timeout': 10000,           // 10 seconds
  };
  
  return delays[errorCode] || 5000; // Default 5 seconds
};

export default {
  FIREBASE_ERROR_MESSAGES,
  getFirebaseErrorMessage,
  isFirebaseAuthError,
  getErrorType,
  getSuggestedAction,
  handleFirebaseError,
  isRetryableError,
  getRetryDelay,
};
