# New Folder Structure Documentation

## Overview
This document explains the new hybrid folder structure implemented for the VedicMathsIndia course management system.

## Directory Organization

### 📁 **pages/modules/**
- **`courses/`** - Role-agnostic course components that can be reused across different user roles
- **`instructor/`** - Instructor-specific course management and teaching features
- **`admin/`** - Administrative course management and system oversight
- **`student/`** - Student-specific course viewing and learning features
- **`parent/`** - Parent-specific features for monitoring children's education
- **`common/`** - Shared modules that can be used by multiple roles

### 📁 **components/**
- **`courses/`** - Reusable course UI components (CourseList, CourseCard, etc.)
- **`instructor/`** - Instructor-specific component wrappers
- **`student/`** - Student-specific component wrappers
- **`parent/`** - Parent-specific component wrappers
- **`admin/`** - Admin-specific components
- **`common/`** - Basic UI building blocks (Button, Card, Loading, etc.)
- **`forms/`** - Reusable form elements
- **`layout/`** - Layout and navigation components

### 📁 **hooks/**
- **Custom hooks** for shared business logic (useCourseData, useCourseSearch, etc.)
- **Existing hooks** for authentication, permissions, and state management

## Import Patterns

### **Role-Specific Components**
```jsx
// Import instructor-specific components
import { InstructorCourseManagement } from '../modules/instructor';
import { InstructorLeaderboard } from '../../components/instructor';

// Import student-specific components
import { StudentCourseView } from '../modules/student';
import { StudentLeaderboard } from '../../components/student';
```

### **Reusable Components**
```jsx
// Import reusable course components
import { CourseList, CourseCard } from '../modules/courses';
import { LeaderboardTab } from '../../components/courses';

// Import common UI components
import { Button, Card, Loading } from '../../components/common';
```

### **Custom Hooks**
```jsx
// Import custom hooks for shared logic
import { useCourseData, useCourseSearch } from '../../hooks';
```

## Development Guidelines

### **Adding New Components**
1. **Role-specific components** go in their respective role folders
2. **Reusable components** go in the `courses/` or `common/` folders
3. **Always update the index.js** file when adding new components

### **Component Naming**
- **Role-specific**: `InstructorCourseManagement`, `StudentProgress`
- **Reusable**: `CourseList`, `CourseCard`, `SearchBar`
- **Generic**: `Button`, `Card`, `Loading`

### **File Organization**
- Keep related functionality together
- Use index.js files for clean imports
- Follow the established naming conventions

## Migration Status

### **✅ Phase 1 Complete**
- New folder structure created
- Index files set up
- Foundation ready for component migration

### **✅ Phase 2 Complete**
- StudentCourses.jsx moved to student/StudentCourseView.jsx
- UserManagement.jsx moved to admin/UserManagement.jsx
- ChatsPage.jsx moved to common/ChatsPage.jsx
- FeesPage.jsx moved to common/FeesPage.jsx
- All index files updated with new import paths
- Import structure tested and verified

### **✅ Phase 3 Complete**
- Course components moved from course/ to courses/ folder
- Instructor role-specific wrappers created (InstructorLeaderboard, InstructorContentTab, InstructorSessionsTab)
- Student role-specific wrappers created (StudentLeaderboard, StudentContentTab, StudentSessionsTab)
- Admin role-specific wrapper created (AdminLeaderboard)
- All wrappers include proper permission checks and role-specific functionality
- Empty course/ directory removed

### **✅ Phase 4 Complete**
- CourseList component created with grid/list view modes and empty states
- CourseCard component created with role-specific actions and compact/detailed views
- CourseSearch component created with advanced filters and search suggestions
- CourseFilters component created with comprehensive filtering and sorting options
- All components are fully reusable and role-agnostic
- Components include proper error handling, loading states, and accessibility features

### **✅ Phase 5 Complete**
- useCourseData hook created for course data fetching and management
- useCourseSearch hook created for search functionality with debouncing and suggestions
- useCourseFiltering hook created for filter state management and presets
- useCalendar hook created for calendar operations and scheduling
- All hooks include proper error handling, loading states, and memoization
- Hooks provide role-specific functionality and shared business logic

### **✅ Phase 6 Complete**
- InstructorCourseManagement page created with comprehensive course management features
- AdminCourseManagement page created with oversight and analytics capabilities
- StudentCourseView page created with course discovery and enrollment functionality
- ParentDashboard page created with child progress monitoring and learning analytics
- All pages use the components and hooks created in previous phases
- Role-based access control and permission checking implemented

### **✅ Phase 7 Complete**
- Updated App.js with new course management routes for all user roles
- Enhanced Sidebar navigation with role-specific course management menu items
- Created centralized routes constants file for better maintainability
- Implemented NavigationService for programmatic navigation and route validation
- Added Breadcrumbs component with automatic generation and navigation
- Integrated breadcrumbs into MainLayout for better user navigation
- All new pages are now accessible through proper routing

### **🔄 Next Steps**
- **Phase 8**: Testing and validation
- **Phase 9**: Cleanup and documentation

## Benefits of New Structure

1. **Clear Role Separation** - Each role has dedicated folders
2. **Reusable Components** - Core functionality shared across roles
3. **Custom Hooks** - Business logic extracted and reusable
4. **Intuitive Organization** - Easy to find specific functionality
5. **Maintainable Code** - Changes isolated to specific areas
6. **Scalable Architecture** - Easy to add new roles or features

## Notes
- This structure is designed to balance reusability with maintainability
- Common components are kept simple and stateless
- Business logic is extracted into custom hooks
- Role-specific features are clearly separated
