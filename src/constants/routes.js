// Application Routes Constants
// This file centralizes all route definitions for better maintainability

export const ROUTES = {
  // Public Routes
  LOGIN: '/login',
  REGISTER: '/register',
  LOGOUT: '/logout',
  
  // Dashboard Routes
  DASHBOARD: '/dashboard',
  HOME: '/',
  
  // Student Routes
  STUDENT_COURSES: '/course',
  COURSE_DETAIL: '/course/:courseId',
  COURSE_DISCOVERY: '/course-discovery',
  STUDENT_ALL_COURSES: '/courses',
  STUDENT_ACTIVITY: '/activity',
  STUDENT_FEES: '/fees',
  STUDENT_CHATS: '/chats',
  STUDENT_NOTIFICATIONS: '/notifications',
  
  // Parent Routes
  PARENT_DASHBOARD: '/parent-dashboard',
  CHILDREN_PROGRESS: '/children-progress',
  PARENT_FEES: '/fees',
  PARENT_LEARNERS: '/my-learners',
  PARENT_LEARNER_DETAIL: '/learner/:learnerId',
  PARENT_NOTIFICATIONS: '/notifications',
  
  // Instructor Routes
  INSTRUCTOR_COURSE_MANAGEMENT: '/course-management',
  INSTRUCTOR_COURSES: '/courses',
  TEACHER_COURSES: '/teacher/courses',
  TEACHER_COURSE_DETAIL: '/teacher/courses/:courseId',
  INSTRUCTOR_CALENDAR: '/calendar',
  INSTRUCTOR_PAYOUTS: '/payouts',
  INSTRUCTOR_WORKING_HOURS: '/working-hours',
  INSTRUCTOR_LEAVES: '/leaves',
  INSTRUCTOR_SESSION_CONFLICTS: '/session-conflicts',
  INSTRUCTOR_CHATS: '/chats',
  INSTRUCTOR_NOTIFICATIONS: '/notifications',
  
  // Admin Routes
  ADMIN_GET_STARTED: '/get-started',
  ADMIN_DASHBOARD: '/dashboard',
  ADMIN_COURSE_MANAGEMENT: '/course-management',
  ADMIN_ALL_COURSES: '/courses',
  ADMIN_CONSULTATIONS: '/consultations',
  ADMIN_ONE_ON_ONE_COURSES: '/one-on-one-courses',
  ADMIN_GROUP_COURSES: '/group-courses',
  ADMIN_RECORDED_COURSES: '/recorded-courses',
  ADMIN_INSTRUCTORS: '/instructors',
  ADMIN_LEARNERS: '/learners',
  ADMIN_CHATS: '/chats',
  ADMIN_STORE: '/store',
  ADMIN_ANALYTICS: '/analytics',
  ADMIN_FINANCE: '/finance',
  ADMIN_SETTINGS: '/settings',
  ADMIN_NOTIFICATIONS: '/notifications',
  
  // Common Routes
  ACCOUNT: '/account',
};

// Role-based route access mapping
export const ROLE_ROUTES = {
  student: [
    ROUTES.STUDENT_COURSES,
    ROUTES.COURSE_DETAIL,
    ROUTES.COURSE_DISCOVERY,
    ROUTES.STUDENT_ALL_COURSES,
    ROUTES.STUDENT_ACTIVITY,
    ROUTES.STUDENT_FEES,
    ROUTES.STUDENT_CHATS,
    ROUTES.STUDENT_NOTIFICATIONS,
  ],
  parent: [
    ROUTES.PARENT_DASHBOARD,
    ROUTES.CHILDREN_PROGRESS,
    ROUTES.PARENT_FEES,
    ROUTES.PARENT_LEARNERS,
    ROUTES.PARENT_LEARNER_DETAIL,
    ROUTES.PARENT_NOTIFICATIONS,
  ],
  instructor: [
    ROUTES.INSTRUCTOR_COURSE_MANAGEMENT,
    ROUTES.INSTRUCTOR_COURSES,
    ROUTES.TEACHER_COURSES,
    ROUTES.TEACHER_COURSE_DETAIL,
    ROUTES.INSTRUCTOR_CALENDAR,
    ROUTES.INSTRUCTOR_PAYOUTS,
    ROUTES.INSTRUCTOR_WORKING_HOURS,
    ROUTES.INSTRUCTOR_LEAVES,
    ROUTES.INSTRUCTOR_SESSION_CONFLICTS,
    ROUTES.INSTRUCTOR_CHATS,
    ROUTES.INSTRUCTOR_NOTIFICATIONS,
  ],
  admin: [
    ROUTES.ADMIN_GET_STARTED,
    ROUTES.ADMIN_DASHBOARD,
    ROUTES.ADMIN_COURSE_MANAGEMENT,
    ROUTES.ADMIN_ALL_COURSES,
    ROUTES.ADMIN_CONSULTATIONS,
    ROUTES.ADMIN_ONE_ON_ONE_COURSES,
    ROUTES.ADMIN_GROUP_COURSES,
    ROUTES.ADMIN_RECORDED_COURSES,
    ROUTES.ADMIN_INSTRUCTORS,
    ROUTES.ADMIN_LEARNERS,
    ROUTES.ADMIN_CHATS,
    ROUTES.ADMIN_STORE,
    ROUTES.ADMIN_ANALYTICS,
    ROUTES.ADMIN_FINANCE,
    ROUTES.ADMIN_SETTINGS,
    ROUTES.ADMIN_NOTIFICATIONS,
  ],
  superAdmin: [
    ROUTES.ADMIN_GET_STARTED,
    ROUTES.ADMIN_DASHBOARD,
    ROUTES.ADMIN_COURSE_MANAGEMENT,
    ROUTES.ADMIN_ALL_COURSES,
    ROUTES.ADMIN_CONSULTATIONS,
    ROUTES.ADMIN_ONE_ON_ONE_COURSES,
    ROUTES.ADMIN_GROUP_COURSES,
    ROUTES.ADMIN_RECORDED_COURSES,
    ROUTES.ADMIN_INSTRUCTORS,
    ROUTES.ADMIN_LEARNERS,
    ROUTES.ADMIN_CHATS,
    ROUTES.ADMIN_STORE,
    ROUTES.ADMIN_ANALYTICS,
    ROUTES.ADMIN_FINANCE,
    ROUTES.ADMIN_SETTINGS,
    ROUTES.ADMIN_NOTIFICATIONS,
    // Additional super admin routes can be added here
  ],
};

// Route metadata for navigation
export const ROUTE_METADATA = {
  [ROUTES.STUDENT_COURSES]: {
    title: 'My Courses',
    description: 'View your enrolled courses and track progress',
    icon: 'BookIcon',
    requiresAuth: true,
    roles: ['student'],
  },
  [ROUTES.COURSE_DISCOVERY]: {
    title: 'Course Discovery',
    description: 'Explore and enroll in new courses',
    icon: 'FolderIcon',
    requiresAuth: true,
    roles: ['student'],
  },
  [ROUTES.INSTRUCTOR_COURSE_MANAGEMENT]: {
    title: 'Course Management',
    description: 'Manage your courses and content',
    icon: 'FolderIcon',
    requiresAuth: true,
    roles: ['instructor'],
  },
  [ROUTES.TEACHER_COURSES]: {
    title: 'My Teaching Courses',
    description: 'View and manage your teaching courses',
    icon: 'SchoolIcon',
    requiresAuth: true,
    roles: ['instructor'],
  },
  [ROUTES.TEACHER_COURSE_DETAIL]: {
    title: 'Course Details',
    description: 'View and manage specific course details',
    icon: 'SchoolIcon',
    requiresAuth: true,
    roles: ['instructor'],
  },
  [ROUTES.ADMIN_COURSE_MANAGEMENT]: {
    title: 'Course Management',
    description: 'Oversee all platform courses',
    icon: 'FolderIcon',
    requiresAuth: true,
    roles: ['admin', 'superAdmin'],
  },
  [ROUTES.PARENT_DASHBOARD]: {
    title: 'Parent Dashboard',
    description: 'Monitor your children\'s learning progress',
    icon: 'DashboardIcon',
    requiresAuth: true,
    roles: ['parent'],
  },
  [ROUTES.CHILDREN_PROGRESS]: {
    title: 'Children Progress',
    description: 'Track learning progress and achievements',
    icon: 'BarChartIcon',
    requiresAuth: true,
    roles: ['parent'],
  },
};

// Helper function to check if a user has access to a route
export const hasRouteAccess = (route, userRole) => {
  const allowedRoles = ROLE_ROUTES[userRole] || [];
  return allowedRoles.includes(route);
};

// Helper function to get route metadata
export const getRouteMetadata = (route) => {
  return ROUTE_METADATA[route] || null;
};

// Helper function to get all routes for a specific role
export const getRoutesForRole = (role) => {
  return ROLE_ROUTES[role] || [];
};

export default ROUTES;
