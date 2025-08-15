# 🔐 Adding Custom Claims to Firebase JWT - Implementation Outline

## 📋 Overview
This document outlines the complete implementation of custom claims in Firebase JWT tokens for the Vedic Maths India platform, enabling role-based access control and enhanced security.

---

## 🏗️ **Phase 1: Backend Infrastructure Setup**

### **1.1 Firebase Admin SDK Configuration**
- **File**: `functions/index.js` (Cloud Functions)
- **Purpose**: Initialize Firebase Admin SDK for server-side operations
- **Implementation**:
  ```javascript
  const admin = require('firebase-admin');
  admin.initializeApp();
  ```

### **1.2 Cloud Function Creation**
- **File**: `functions/index.js`
- **Purpose**: Create HTTP callable function to set custom claims
- **Function**: `setUserClaims(uid, claims)`
- **Security**: Verify authentication and authorization

---

## 🎯 **Phase 2: Custom Claims Structure Design**

### **2.1 Claims Schema Definition**
```json
{
  "role": "instructor|student|admin|parent|franchise_admin",
  "franchiseId": "string",
  "permissions": ["VIEW_COURSES", "CREATE_COURSES", "MANAGE_USERS"],
  "isActive": "boolean",
  "lastLoginAt": "ISO_timestamp",
  "userType": "string",
  "accessLevel": "number"
}
```

### **2.2 Role-Permission Mapping**
- **Student**: Basic course access, progress tracking
- **Instructor**: Course management, student progress
- **Parent**: Child progress monitoring
- **Franchise Admin**: Franchise-level management
- **Super Admin**: System-wide access

---

## 🔧 **Phase 3: Frontend Integration**

### **3.1 AuthProvider Enhancement**
- **File**: `src/components/providers/AuthProvider.jsx`
- **Changes**:
  - Call Cloud Function to set claims after user data fetch
  - Handle claims update errors gracefully
  - No token refresh needed (tokens remain valid)

### **3.2 useAuth Hook Updates**
- **File**: `src/hooks/useAuth.js`
- **Changes**:
  - Extract claims from JWT token
  - Update user state with claims data
  - Handle claims updates when user data changes

### **3.3 Claims Management Service**
- **File**: `src/services/claimsService.js`
- **Purpose**: Centralized claims management
- **Functions**:
  - `setUserClaims(uid, claims)`
  - `updateUserClaims(uid, claims)`
  - `getClaimsFromToken()`

---

## 🔄 **Phase 4: Authentication Flow Updates**

### **4.1 Login Process Enhancement**
```
1. Firebase Authentication
2. Fetch User Data from DynamoDB
3. Set Custom Claims via Cloud Function
4. Force Token Refresh
5. Update Local State with Claims
6. Navigate to Dashboard
```

### **4.2 Claims Update Strategy**
- **Automatic**: On app initialization
- **Manual**: When user data changes
- **No periodic refresh needed**: Tokens remain valid indefinitely

---

## 🛡️ **Phase 5: Security & Validation**

### **5.1 Claims Verification**
- **Server-side**: Verify claims in Cloud Functions
- **Client-side**: Validate claims before operations
- **Middleware**: Route protection based on claims

### **5.2 Access Control Implementation**
- **File**: `src/hooks/usePermissions.js`
- **Enhancement**: Use JWT claims instead of local state
- **Benefits**: Tamper-proof, immediate access

---

## 📱 **Phase 6: User Interface Updates**

### **6.1 Role Display**
- **Component**: User profile, navigation
- **Source**: JWT claims instead of local state
- **Real-time**: Updates immediately after claims change

### **6.2 Permission-based UI**
- **Dynamic Rendering**: Show/hide elements based on claims
- **Route Protection**: Prevent unauthorized access
- **Error Handling**: Graceful fallbacks for missing permissions

---

## 🧪 **Phase 7: Testing & Validation**

### **7.1 Unit Tests**
- **Claims Service**: Test claims setting and retrieval
- **Permission Hooks**: Test role-based access
- **Auth Flow**: Test complete authentication process

### **7.2 Integration Tests**
- **Cloud Functions**: Test claims setting
- **Frontend-Backend**: Test claims synchronization
- **Claims Updates**: Test claims modification process

---

## 🚀 **Phase 8: Deployment & Monitoring**

### **8.1 Cloud Functions Deployment**
- **Environment**: Production Firebase project
- **Monitoring**: Function execution logs
- **Error Tracking**: Claims setting failures

### **8.2 Frontend Deployment**
- **Build Process**: Include claims service
- **Environment Variables**: Cloud Functions URLs
- **Feature Flags**: Enable/disable claims system
- **Token Validation**: Ensure proper JWT validation

---

## 📊 **Phase 9: Performance Optimization**

### **9.1 Caching Strategy**
- **Claims Cache**: Store claims in memory
- **Token Validation**: Verify token integrity
- **API Calls**: Reduce DynamoDB queries

### **9.2 Monitoring & Analytics**
- **Claims Usage**: Track which claims are used
- **Performance Metrics**: Measure authentication speed
- **Error Rates**: Monitor claims setting failures

---

## 🔍 **Phase 10: Maintenance & Updates**

### **10.1 Claims Versioning**
- **Schema Updates**: Handle claims structure changes
- **Backward Compatibility**: Support old claims format
- **Migration Strategy**: Update existing user claims

### **10.2 Regular Audits**
- **Claims Review**: Periodic permission review
- **Security Assessment**: Validate claims security
- **Performance Review**: Optimize claims system

---

## 📁 **File Structure After Implementation**

```
src/
├── services/
│   ├── claimsService.js          # NEW: Claims management
│   ├── firebase.js               # UPDATED: Claims extraction
│   └── dynamoDBService.js        # UPDATED: Claims integration
├── hooks/
│   ├── useAuth.js                # UPDATED: Claims handling
│   └── usePermissions.js         # UPDATED: JWT claims usage
├── components/
│   └── providers/
│       └── AuthProvider.jsx      # UPDATED: Claims setting
└── utils/
    └── claimsUtils.js            # NEW: Claims utilities

functions/
└── index.js                      # NEW: Cloud Functions for claims
```

---

## ⏱️ **Implementation Timeline**

- **Week 1-2**: Backend setup and Cloud Functions
- **Week 3-4**: Frontend integration and claims service
- **Week 5-6**: Testing and validation
- **Week 7**: Deployment and monitoring
- **Week 8**: Performance optimization and documentation

---

## 🎯 **Success Metrics**

- **Authentication Speed**: 50% reduction in login time
- **API Calls**: 70% reduction in DynamoDB queries
- **Security**: 100% tamper-proof role verification
- **User Experience**: Immediate role-based UI updates

---

## 🔧 **Technical Implementation Details**

### **Cloud Function Example**
```javascript
// functions/index.js
exports.setUserClaims = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
  }
  
  const { uid, claims } = data;
  
  try {
    await admin.auth().setCustomUserClaims(uid, claims);
    return { success: true };
  } catch (error) {
    throw new functions.https.HttpsError('internal', error.message);
  }
});
```

### **Claims Service Example**
```javascript
// src/services/claimsService.js
export const claimsService = {
  async setUserClaims(uid, claims) {
    try {
      const result = await httpsCallable(functions, 'setUserClaims')({ uid, claims });
      return result.data;
    } catch (error) {
      console.error('Failed to set user claims:', error);
      throw error;
    }
  },
  
  async updateUserClaims(uid, claims) {
    try {
      const result = await httpsCallable(functions, 'setUserClaims')({ uid, claims });
      return result.data;
    } catch (error) {
      console.error('Failed to update user claims:', error);
      throw error;
    }
  },
  
  getClaimsFromToken(token) {
    try {
      const decoded = jwt_decode(token);
      return {
        role: decoded.role,
        franchiseId: decoded.franchiseId,
        permissions: decoded.permissions || [],
        isActive: decoded.isActive
      };
    } catch (error) {
      console.error('Failed to decode token:', error);
      return null;
    }
  }
};
```

---

## 🚨 **Security Considerations**

### **Claims Validation**
- Always verify claims server-side
- Implement rate limiting for claims updates
- Log all claims modifications for audit

### **Token Security**
- Use HTTPS for all communications
- Implement proper token expiration
- Monitor for suspicious claims patterns

---

## 📚 **Additional Resources**

- [Firebase Admin SDK Documentation](https://firebase.google.com/docs/admin)
- [Custom Claims Best Practices](https://firebase.google.com/docs/auth/admin/custom-claims)
- [JWT Token Security](https://jwt.io/introduction)
- [Cloud Functions Security](https://firebase.google.com/docs/functions/security)

---

## 📝 **Next Steps**

1. **Review and approve** this implementation plan
2. **Set up development environment** for Cloud Functions
3. **Create development branch** for claims implementation
4. **Begin Phase 1** implementation
5. **Schedule regular review meetings** for progress updates

---

*This document should be updated as implementation progresses and new requirements are identified.*
