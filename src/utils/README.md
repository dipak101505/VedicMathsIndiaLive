# Error Message Utilities

This directory contains utility functions for handling Firebase authentication errors and providing user-friendly error messages.

## Files

- `errorMessages.js` - Firebase error code mapping and utility functions

## Usage

### Basic Error Message Mapping

```javascript
import { getFirebaseErrorMessage } from '../utils/errorMessages';

// Get user-friendly message for Firebase error
const errorMessage = getFirebaseErrorMessage('auth/invalid-credential');
// Returns: "Invalid email or password. Please check your credentials and try again."
```

### Error Handling with Toast

```javascript
import { handleFirebaseError } from '../utils/errorMessages';
import toast from 'react-hot-toast';

try {
  // Firebase operation
} catch (error) {
  const message = handleFirebaseError(error, toast.error, 'Custom fallback message');
  // Automatically shows toast and returns user-friendly message
}
```

### Error Type Classification

```javascript
import { getErrorType, isRetryableError } from '../utils/errorMessages';

const errorType = getErrorType('auth/network-request-failed');
// Returns: "network"

const canRetry = isRetryableError('auth/too-many-requests');
// Returns: true
```

### Retry Logic

```javascript
import { isRetryableError, getRetryDelay } from '../utils/errorMessages';

if (isRetryableError(error.code)) {
  const delay = getRetryDelay(error.code);
  setTimeout(() => {
    // Retry the operation
  }, delay);
}
```

## Available Functions

- `getFirebaseErrorMessage(errorCode, fallbackMessage)` - Convert Firebase error to user message
- `isFirebaseAuthError(error)` - Check if error is Firebase auth error
- `getErrorType(errorCode)` - Categorize error type
- `getSuggestedAction(errorCode)` - Get user action suggestions
- `handleFirebaseError(error, toast, fallbackMessage)` - Handle error with toast
- `isRetryableError(errorCode)` - Check if error allows retry
- `getRetryDelay(errorCode)` - Get suggested retry delay

## Error Categories

### Authentication Errors
- Invalid credentials
- User not found
- Wrong password
- Invalid email

### Network Errors
- Network request failed
- Timeout
- Too many requests

### Validation Errors
- Weak password
- Invalid email format
- Missing required fields

### System Errors
- Service unavailable
- Quota exceeded
- Configuration issues

## Best Practices

1. **Always use user-friendly messages** - Never show raw Firebase error codes to users
2. **Provide actionable guidance** - Tell users what they can do to fix the issue
3. **Use consistent messaging** - All Firebase errors should follow the same format
4. **Handle retryable errors** - Some errors (like network issues) can be retried
5. **Log technical details** - Keep raw error codes in console logs for debugging

## Example Implementation

```javascript
import { handleFirebaseError, isRetryableError } from '../utils/errorMessages';
import toast from 'react-hot-toast';

const handleLogin = async (email, password) => {
  try {
    const result = await firebaseAuth.signIn(email, password);
    if (result.success) {
      // Handle success
    }
  } catch (error) {
    const message = handleFirebaseError(error, toast.error, 'Login failed');
    
    if (isRetryableError(error.code)) {
      // Show retry button or auto-retry after delay
    }
  }
};
```
