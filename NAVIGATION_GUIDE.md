# Navigation Guide

## Overview

This document provides a comprehensive guide to the navigation system implemented in Phase 7 of the migration. The navigation system includes role-based routing, breadcrumbs, and centralized route management.

## Table of Contents

1. [Route Structure](#route-structure)
2. [Role-Based Access](#role-based-access)
3. [Navigation Components](#navigation-components)
4. [Navigation Service](#navigation-service)
5. [Breadcrumbs](#breadcrumbs)
6. [Usage Examples](#usage-examples)
7. [Best Practices](#best-practices)

## Route Structure

### Public Routes
- `/login` - User authentication
- `/register` - User registration
- `/logout` - User logout

### Protected Routes

#### Student Routes
- `/my-courses` - View enrolled courses
- `/course-discovery` - Discover and enroll in new courses
- `/courses` - Browse all available courses
- `/course/:courseId` - View specific course details
- `/activity` - View learning activity
- `/fees` - View and manage fees
- `/chats` - Access chat functionality
- `/notifications` - View notifications

#### Parent Routes
- `/parent-dashboard` - Main parent dashboard
- `/children-progress` - Monitor children's learning progress
- `/fees` - View and manage fees
- `/my-learners` - Manage children accounts
- `/learner/:learnerId` - View specific child details
- `/notifications` - View notifications

#### Instructor Routes
- `/course-management` - Main course management interface
- `/courses` - View instructor's courses
- `/calendar` - View teaching schedule
- `/payouts` - View earnings and payments
- `/working-hours` - Track teaching hours
- `/leaves` - Manage leave requests
- `/session-conflicts` - Handle scheduling conflicts
- `/chats` - Access chat functionality
- `/notifications` - View notifications

#### Admin Routes
- `/get-started` - Admin onboarding
- `/dashboard` - Admin dashboard
- `/course-management` - Platform course oversight
- `/courses` - View all platform courses
- `/consultations` - Manage consultations
- `/one-on-one-courses` - Manage 1:1 courses
- `/group-courses` - Manage group courses
- `/recorded-courses` - Manage recorded content
- `/instructors` - Manage instructor accounts
- `/learners` - Manage learner accounts
- `/chats` - Access chat functionality
- `/store` - Manage platform store
- `/analytics` - View platform analytics
- `/finance` - Manage platform finances
- `/settings` - Platform settings
- `/notifications` - View notifications

## Role-Based Access

### Access Control
Each route is protected by role-based access control. Users can only access routes appropriate for their role:

```javascript
import { hasRouteAccess } from '../constants/routes';

// Check if user can access a route
const canAccess = hasRouteAccess('/course-management', 'instructor');
```

### Role Route Mapping
```javascript
import { getRoutesForRole } from '../constants/routes';

// Get all routes available for a specific role
const instructorRoutes = getRoutesForRole('instructor');
```

## Navigation Components

### MainLayout
The main layout component that provides the overall structure:
- Sidebar navigation
- Main content area
- Breadcrumbs (when applicable)

### Sidebar
Role-specific navigation menu that automatically adjusts based on user permissions:
- Dynamic menu generation
- Role-based menu items
- Highlighted important routes

### Breadcrumbs
Automatic breadcrumb generation with navigation:
- Shows current page hierarchy
- Clickable navigation
- Back button functionality

## Navigation Service

### Overview
The `NavigationService` provides programmatic navigation capabilities and route utilities.

### Initialization
```javascript
import navigationService from '../services/navigationService';
import { useNavigate, useLocation } from 'react-router-dom';

const navigate = useNavigate();
const location = useLocation();

// Initialize the service
navigationService.init(navigate, location);
```

### Navigation Methods
```javascript
// Navigate to a route
navigationService.navigate('/course-management');

// Navigate with replacement (no back button)
navigationService.navigateReplace('/dashboard');

// Go back
navigationService.goBack();

// Go forward
navigationService.goForward();
```

### Route Utilities
```javascript
// Get current route information
const currentRoute = navigationService.getCurrentRoute(location);

// Generate breadcrumbs
const breadcrumbs = navigationService.generateBreadcrumbs(location, userRole);

// Check route access
const canAccess = navigationService.canAccessRoute('/admin/courses', userRole);

// Get accessible routes for a role
const accessibleRoutes = navigationService.getAccessibleRoutes('instructor');
```

## Breadcrumbs

### Automatic Generation
Breadcrumbs are automatically generated based on the current route and user role:

```javascript
import Breadcrumbs from '../components/layout/Breadcrumbs';

// Basic usage
<Breadcrumbs />

// Custom configuration
<Breadcrumbs 
  showBackButton={true}
  maxItems={5}
  customBreadcrumbs={customBreadcrumbs}
/>
```

### Custom Breadcrumbs
You can provide custom breadcrumbs when needed:

```javascript
const customBreadcrumbs = [
  { label: 'Home', path: '/', icon: 'HomeIcon' },
  { label: 'Courses', path: '/courses', icon: 'SchoolIcon' },
  { label: 'Course Details', path: '/course/123', icon: 'InfoIcon' }
];

<Breadcrumbs customBreadcrumbs={customBreadcrumbs} />
```

## Usage Examples

### Basic Navigation
```javascript
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants/routes';

const navigate = useNavigate();

// Navigate to course management
const handleCourseManagement = () => {
  navigate(ROUTES.INSTRUCTOR_COURSE_MANAGEMENT);
};

// Navigate with state
const handleCourseClick = (course) => {
  navigate(ROUTES.COURSE_DETAIL.replace(':courseId', course.id), {
    state: { course }
  });
};
```

### Route Protection
```javascript
import { hasRouteAccess } from '../constants/routes';

const ProtectedComponent = ({ route, userRole, children }) => {
  if (!hasRouteAccess(route, userRole)) {
    return <AccessDenied />;
  }
  
  return children;
};
```

### Dynamic Navigation
```javascript
import navigationService from '../services/navigationService';

const handleDynamicNavigation = (targetRoute) => {
  if (navigationService.canAccessRoute(targetRoute, userRole)) {
    navigationService.navigate(targetRoute);
  } else {
    // Handle access denied
    showAccessDeniedMessage();
  }
};
```

## Best Practices

### 1. Use Route Constants
Always use the centralized route constants instead of hardcoded strings:

```javascript
// ✅ Good
import { ROUTES } from '../constants/routes';
navigate(ROUTES.INSTRUCTOR_COURSE_MANAGEMENT);

// ❌ Bad
navigate('/course-management');
```

### 2. Check Route Access
Always verify route access before navigation:

```javascript
// ✅ Good
if (hasRouteAccess(route, userRole)) {
  navigate(route);
}

// ❌ Bad
navigate(route); // No access check
```

### 3. Use Navigation Service
For complex navigation logic, use the NavigationService:

```javascript
// ✅ Good
navigationService.navigate(route, { state: data });

// ❌ Bad
navigate(route, { state: data }); // Direct navigation
```

### 4. Provide Meaningful Breadcrumbs
When creating custom breadcrumbs, ensure they provide clear navigation context:

```javascript
// ✅ Good
const breadcrumbs = [
  { label: 'Courses', path: '/courses' },
  { label: 'Mathematics', path: '/courses/math' },
  { label: 'Algebra Basics', path: '/courses/math/algebra' }
];

// ❌ Bad
const breadcrumbs = [
  { label: 'Page 1', path: '/page1' },
  { label: 'Page 2', path: '/page2' }
];
```

### 5. Handle Navigation Errors
Always handle navigation errors gracefully:

```javascript
try {
  navigationService.navigate(route);
} catch (error) {
  console.error('Navigation failed:', error);
  // Show user-friendly error message
  showErrorMessage('Unable to navigate to the requested page');
}
```

## Troubleshooting

### Common Issues

1. **Route Not Found**
   - Verify the route exists in `constants/routes.js`
   - Check if the route is included in the user's role
   - Ensure the route is properly configured in `App.js`

2. **Access Denied**
   - Verify user role permissions
   - Check if the route requires authentication
   - Ensure proper role-based access control

3. **Breadcrumbs Not Showing**
   - Check if breadcrumbs are enabled in MainLayout
   - Verify route metadata exists
   - Check for navigation service initialization

4. **Navigation Service Not Working**
   - Ensure the service is properly initialized
   - Check if history and location are provided
   - Verify service import and usage

### Debug Tips

1. **Enable Route Logging**
   ```javascript
   console.log('Current route:', location.pathname);
   console.log('User role:', userRole);
   console.log('Accessible routes:', getRoutesForRole(userRole));
   ```

2. **Check Route Metadata**
   ```javascript
   const metadata = getRouteMetadata(route);
   console.log('Route metadata:', metadata);
   ```

3. **Verify Navigation Service**
   ```javascript
   console.log('Navigation service initialized:', !!navigationService.history);
   ```

## Conclusion

The navigation system provides a robust, role-based routing solution with automatic breadcrumbs and centralized route management. By following the best practices outlined in this guide, developers can create consistent and maintainable navigation throughout the application.

For additional support or questions, refer to the main migration documentation or contact the development team.
