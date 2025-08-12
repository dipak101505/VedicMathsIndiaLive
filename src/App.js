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
import StudentCourses from './pages/modules/StudentCourses';

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
                  <Route path="/my-courses" element={<StudentCourses />} />
                  <Route path="/courses" element={<Dashboard />} />
                  <Route path="/activity" element={<Dashboard />} />
                  <Route path="/fees" element={<Dashboard />} />
                  <Route path="/chats" element={<Dashboard />} />
                  <Route path="/notifications" element={<Dashboard />} />
                  
                  {/* Parent Routes */}
                  <Route path="/my-learners" element={<Dashboard />} />
                  <Route path="/learner/:learnerId" element={<Dashboard />} />
                  
                  {/* Instructor Routes */}
                  <Route path="/courses" element={<Dashboard />} />
                  <Route path="/calendar" element={<Dashboard />} />
                  <Route path="/payouts" element={<Dashboard />} />
                  <Route path="/working-hours" element={<Dashboard />} />
                  <Route path="/leaves" element={<Dashboard />} />
                  <Route path="/session-conflicts" element={<Dashboard />} />
                  <Route path="/chats" element={<Dashboard />} />
                  <Route path="/notifications" element={<Dashboard />} />
                  
                  {/* Admin Routes */}
                  <Route path="/get-started" element={<Dashboard />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/consultations" element={<Dashboard />} />
                  <Route path="/one-on-one-courses" element={<Dashboard />} />
                  <Route path="/group-courses" element={<Dashboard />} />
                  <Route path="/recorded-courses" element={<Dashboard />} />
                  <Route path="/instructors" element={<Dashboard />} />
                  <Route path="/learners" element={<Dashboard />} />
                  <Route path="/chats" element={<Dashboard />} />
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
