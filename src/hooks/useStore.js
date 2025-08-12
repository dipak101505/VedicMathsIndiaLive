import { useAuthStore } from '../store/authStore';
import { useUserStore } from '../store/userStore';
import { useAppStore } from '../store/appStore';
import { useCourseStore } from '../store/courseStore';

// Combined store hook for easy access to all stores
export const useStore = () => {
  const auth = useAuthStore();
  const users = useUserStore();
  const app = useAppStore();
  const courses = useCourseStore();

  return {
    auth,
    users,
    app,
    courses,
  };
};

// Individual store hooks for specific use cases
export const useAuth = useAuthStore;
export const useUsers = useUserStore;
export const useApp = useAppStore;
export const useCourses = useCourseStore;

// Utility hook for checking if any store is loading
export const useLoading = () => {
  const auth = useAuthStore();
  const users = useUserStore();
  const app = useAppStore();
  const courses = useCourseStore();

  return {
    isLoading: auth.loading || users.loading || app.loading || courses.loading,
    authLoading: auth.loading,
    usersLoading: users.loading,
    appLoading: app.loading,
    coursesLoading: courses.loading,
  };
};

// Utility hook for checking if any store has errors
export const useErrors = () => {
  const auth = useAuthStore();
  const users = useUserStore();
  const app = useAppStore();
  const courses = useCourseStore();

  return {
    hasErrors: !!(auth.error || users.error || app.error || courses.error),
    errors: {
      auth: auth.error,
      users: users.error,
      app: app.error,
      courses: courses.error,
    },
    clearAllErrors: () => {
      auth.clearError();
      users.clearError();
      courses.clearError();
    },
  };
};
