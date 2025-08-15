import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Import pages
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ProtectedRoute from './components/layout/ProtectedRoute';
import MainLayout from './components/layout/MainLayout';
import Dashboard from './pages/dashboard/Dashboard';
import StudentCourses from './pages/modules/student/StudentCourses';
import CourseDetailPage from './pages/modules/student/CourseDetailPage';
import FeesPage from './pages/modules/common/FeesPage';
import ChatsPage from './pages/modules/common/ChatsPage';
import CalendarPage from './pages/modules/common/CalendarPage';
import PayoutsPage from './pages/modules/common/PayoutsPage';

// Import new course management pages
import InstructorCourseManagement from './pages/modules/instructor/InstructorCourseManagement';
import InstructorCourses from './pages/modules/instructor/InstructorCourses';
import InstructorCourseDetailPage from './pages/modules/instructor/InstructorCourseDetailPage';
import AdminCourseManagement from './pages/modules/admin/AdminCourseManagement';
import StudentCourseView from './pages/modules/student/StudentCourseView';
import ParentDashboard from './pages/modules/parent/ParentDashboard';
import WorkingHoursPage from './pages/modules/instructor/WorkingHoursPage';
import LeavesPage from './pages/modules/instructor/LeavesPage';
import SessionConflictsPage from './pages/modules/instructor/SessionConflictsPage';
import ParentFeesPage from './pages/modules/parent/ParentFeesPage';
import LearnerProfilePage from './pages/modules/parent/LearnerProfilePage';

// Import providers
import AuthProvider from './components/providers/AuthProvider';

// Import theme
import theme from './styles/theme';
import GlobalStyles from './styles/globalStyles';

// Logout component that clears demo role and redirects
const LogoutPage = () => {
  useEffect(() => {
    // Clear demo role from localStorage
    try {
      localStorage.removeItem('demoRole');
      console.log('🔧 Logout: Cleared demo role from localStorage');
    } catch (error) {
      console.warn('⚠️ Logout: Could not clear demo role:', error);
    }
  }, []);

  return <Navigate to="/login" replace />;
};

function App() {
  // Log app initialization
  useEffect(() => {
    console.log('🚀 App component mounted');
    console.log('🌍 Environment:', process.env.NODE_ENV);
    console.log('✅ Firebase configuration is hardcoded and should work');
    
    return () => {
      console.log('🚀 App component unmounting');
    };
  }, []);

  console.log('🚀 App: Rendering with routes');

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles />
      <AuthProvider>
        <Router>
          <div className="App">
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/logout" element={<LogoutPage />} />
              
              {/* Protected Routes */}
              <Route path="/" element={<ProtectedRoute />}>
                <Route element={<MainLayout />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/" element={<Dashboard />} />
                  
                  {/* Student Routes */}
                  <Route path="/course" element={<StudentCourses />} />
                  <Route path="/course/:courseId" element={<CourseDetailPage />} />
                  <Route path="/courses" element={<StudentCourseView />} />
                  <Route path="/course-discovery" element={<StudentCourseView />} />
                  <Route path="/activity" element={<Dashboard />} />
                  <Route path="/fees" element={<FeesPage />} />
                  <Route path="/chats" element={<ChatsPage />} />
                  <Route path="/notifications" element={<Dashboard />} />
                  
                  {/* Parent Routes */}
                  <Route path="/fees" element={<FeesPage />} />
                  <Route path="/my-learners" element={<Dashboard />} />
                  <Route path="/learner/:learnerId" element={<LearnerProfilePage />} />
                  <Route path="/parent-dashboard" element={<ParentDashboard />} />
                  <Route path="/children-progress" element={<ParentDashboard />} />
                  <Route path="/parent-fees" element={<ParentFeesPage />} />
                  <Route path="/chats" element={<ChatsPage />} />
                  
                  {/* Instructor Routes */}
                  <Route path="/teacher" element={<Navigate to="/teacher/courses" replace />} />
                  <Route path="/teacher/courses/:courseId" element={<InstructorCourseDetailPage />} />
                  <Route path="/teacher/courses" element={<InstructorCourses />} />
                  <Route path="/course-management" element={<InstructorCourseManagement />} />
                  <Route path="/calendar" element={<CalendarPage />} />
                  <Route path="/payouts" element={<PayoutsPage />} />
                  <Route path="/working-hours" element={<WorkingHoursPage />} />
                  <Route path="/leaves" element={<LeavesPage />} />
                  <Route path="/session-conflicts" element={<SessionConflictsPage />} />
                  <Route path="/chats" element={<ChatsPage />} />
                  <Route path="/notifications" element={<Dashboard />} />
                  
                  {/* Admin Routes */}
                  <Route path="/get-started" element={<Dashboard />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/course-management" element={<AdminCourseManagement />} />
                  <Route path="/courses" element={<AdminCourseManagement />} />
                  <Route path="/consultations" element={<Dashboard />} />
                  <Route path="/one-on-one-courses" element={<Dashboard />} />
                  <Route path="/group-courses" element={<Dashboard />} />
                  <Route path="/recorded-courses" element={<Dashboard />} />
                  <Route path="/instructors" element={<Dashboard />} />
                  <Route path="/learners" element={<Dashboard />} />
                  <Route path="/chats" element={<ChatsPage />} />
                  <Route path="/store" element={<Dashboard />} />
                  <Route path="/analytics" element={<Dashboard />} />
                  <Route path="/finance" element={<Dashboard />} />
                  <Route path="/settings" element={<Dashboard />} />
                  <Route path="/notifications" element={<Dashboard />} />
                  
                  {/* Common Routes */}
                  <Route path="/account" element={<Dashboard />} />
                </Route>
              </Route>
            </Routes>
            
            {/* Toast notifications */}
            <Toaster 
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#363636',
                  color: '#fff',
                },
              }}
            />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
