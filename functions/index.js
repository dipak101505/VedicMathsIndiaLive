const functions = require('firebase-functions');
const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
admin.initializeApp();

/**
 * Set custom claims for a user
 * This function allows authenticated users to set custom claims for themselves or other users
 * (with proper authorization)
 */
exports.setUserClaims = functions.https.onCall(async (data, context) => {
  // Verify the request is authenticated
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
  }

  const { uid, claims } = data;
  const requestingUser = context.auth.uid;

  // Log the request for audit purposes
  console.log('setUserClaims called:', {
    requestingUser,
    targetUser: uid,
    claims,
    timestamp: new Date().toISOString()
  });

  try {
    // Basic validation
    if (!uid || !claims) {
      throw new functions.https.HttpsError('invalid-argument', 'UID and claims are required');
    }

    // Validate claims structure
    if (!claims.role || !['student', 'instructor', 'parent', 'franchise_admin', 'super_admin'].includes(claims.role)) {
      throw new functions.https.HttpsError('invalid-argument', 'Invalid role specified');
    }

    // Check if requesting user has permission to set claims
    // For now, allow users to set their own claims
    // In production, you might want to add role-based checks here
    if (requestingUser !== uid) {
      // Check if requesting user is admin
      const requestingUserRecord = await admin.auth().getUser(requestingUser);
      const requestingUserClaims = requestingUserRecord.customClaims || {};
      
      if (requestingUserClaims.role !== 'super_admin' && requestingUserClaims.role !== 'franchise_admin') {
        throw new functions.https.HttpsError('permission-denied', 'Only admins can set claims for other users');
      }
    }

    // Set the custom claims
    await admin.auth().setCustomUserClaims(uid, {
      ...claims,
      updatedAt: new Date().toISOString(),
      updatedBy: requestingUser
    });

    console.log('Custom claims set successfully for user:', uid);

    // Return success response
    return {
      success: true,
      message: 'Custom claims set successfully',
      timestamp: new Date().toISOString()
    };

  } catch (error) {
    console.error('Error setting custom claims:', error);
    
    // Return appropriate error
    if (error instanceof functions.https.HttpsError) {
      throw error;
    }
    
    throw new functions.https.HttpsError('internal', 'Failed to set custom claims: ' + error.message);
  }
});

/**
 * Get custom claims for a user
 * This function allows users to retrieve their own claims or admins to get other users' claims
 */
exports.getUserClaims = functions.https.onCall(async (data, context) => {
  // Verify the request is authenticated
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
  }

  const { uid } = data;
  const requestingUser = context.auth.uid;

  try {
    // If no UID provided, return requesting user's claims
    const targetUid = uid || requestingUser;

    // Check permissions
    if (targetUid !== requestingUser) {
      const requestingUserRecord = await admin.auth().getUser(requestingUser);
      const requestingUserClaims = requestingUserRecord.customClaims || {};
      
      if (requestingUserClaims.role !== 'super_admin' && requestingUserClaims.role !== 'franchise_admin') {
        throw new functions.https.HttpsError('permission-denied', 'Only admins can view other users\' claims');
      }
    }

    // Get user record and claims
    const userRecord = await admin.auth().getUser(targetUid);
    const customClaims = userRecord.customClaims || {};

    return {
      success: true,
      claims: customClaims,
      uid: targetUid
    };

  } catch (error) {
    console.error('Error getting user claims:', error);
    
    if (error instanceof functions.https.HttpsError) {
      throw error;
    }
    
    throw new functions.https.HttpsError('internal', 'Failed to get user claims: ' + error.message);
  }
});

/**
 * Update user claims (alias for setUserClaims for clarity)
 */
exports.updateUserClaims = functions.https.onCall(async (data, context) => {
  // This is an alias for setUserClaims
  return exports.setUserClaims(data, context);
});

/**
 * Remove custom claims from a user
 * This function allows admins to remove custom claims
 */
exports.removeUserClaims = functions.https.onCall(async (data, context) => {
  // Verify the request is authenticated
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
  }

  const { uid } = data;
  const requestingUser = context.auth.uid;

  try {
    // Check if requesting user is admin
    const requestingUserRecord = await admin.auth().getUser(requestingUser);
    const requestingUserClaims = requestingUserRecord.customClaims || {};
    
    if (requestingUserClaims.role !== 'super_admin') {
      throw new functions.https.HttpsError('permission-denied', 'Only super admins can remove custom claims');
    }

    // Remove custom claims by setting them to null
    await admin.auth().setCustomUserClaims(uid, null);

    console.log('Custom claims removed successfully for user:', uid);

    return {
      success: true,
      message: 'Custom claims removed successfully',
      timestamp: new Date().toISOString()
    };

  } catch (error) {
    console.error('Error removing custom claims:', error);
    
    if (error instanceof functions.https.HttpsError) {
      throw error;
    }
    
    throw new functions.https.HttpsError('internal', 'Failed to remove custom claims: ' + error.message);
  }
});

/**
 * Health check function for monitoring
 */
exports.healthCheck = functions.https.onCall(async (data, context) => {
  return {
    success: true,
    message: 'Claims management functions are running',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  };
});
