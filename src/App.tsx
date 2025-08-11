import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { store } from './store';
import { theme } from './styles/theme';
// import { AppGlobalStyles } from './styles/globalStyles';
import MainLayout from './components/layout/MainLayout';
import ProtectedRoute from './components/layout/ProtectedRoute';
import AuthProvider from './components/auth/AuthProvider';

// Import page components
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import AdminDashboard from './pages/dashboard/AdminDashboard';
import InstructorDashboard from './pages/dashboard/InstructorDashboard';
import StudentDashboard from './pages/dashboard/StudentDashboard';
import ParentDashboard from './pages/dashboard/ParentDashboard';

// Import page components
import UserManagementPage from './pages/modules/users/UserManagementPage';

// Placeholder components for other pages

const Courses = () => (
  <div>
    <h1>Courses</h1>
    <p>Course management page</p>
  </div>
);

const Analytics = () => (
  <div>
    <h1>Analytics</h1>
    <p>Analytics dashboard</p>
  </div>
);

const Settings = () => (
  <div>
    <h1>Settings</h1>
    <p>Application settings</p>
  </div>
);

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {/* <AppGlobalStyles /> */}
        <AuthProvider>
          <Router>
            <Routes>
              {/* Public routes */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              
              {/* Protected routes */}
              <Route path="/" element={
                <ProtectedRoute>
                  <MainLayout>
                    <StudentDashboard />
                  </MainLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <MainLayout>
                    <StudentDashboard />
                  </MainLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/admin-dashboard" element={
                <ProtectedRoute requiredRole="super_admin">
                  <MainLayout>
                    <AdminDashboard />
                  </MainLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/instructor-dashboard" element={
                <ProtectedRoute requiredRole="instructor">
                  <MainLayout>
                    <InstructorDashboard />
                  </MainLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/parent-dashboard" element={
                <ProtectedRoute requiredRole="parent">
                  <MainLayout>
                    <ParentDashboard />
                  </MainLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/users" element={
                <ProtectedRoute requiredPermissions={['users:read']}>
                  <MainLayout>
                    <UserManagementPage />
                  </MainLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/courses" element={
                <ProtectedRoute requiredPermissions={['courses:read']}>
                  <MainLayout>
                    <Courses />
                  </MainLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/analytics" element={
                <ProtectedRoute requiredPermissions={['analytics:read']}>
                  <MainLayout>
                    <Analytics />
                  </MainLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/settings" element={
                <ProtectedRoute requiredPermissions={['settings:read']}>
                  <MainLayout>
                    <Settings />
                  </MainLayout>
                </ProtectedRoute>
              } />
            </Routes>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
