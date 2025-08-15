// Module Pages Export
// This file exports components from the new role-based structure

// Role-specific modules
export { default as UserManagement } from './admin/UserManagement';
export { default as StudentCourseView } from './student/StudentCourseView';

// Common modules
export { default as ChatsPage } from './common/ChatsPage';
export { default as FeesPage } from './common/FeesPage';

// Legacy modules (will be replaced in Phase 4-6)
export { default as CourseManagement } from './CourseManagement';
export { default as CourseDetailPage } from './student/CourseDetailPage';

// Note: CourseManagement and CourseDetailPage will be replaced by role-specific versions
// in the upcoming phases of the migration
