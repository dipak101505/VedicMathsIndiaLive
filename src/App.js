import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Import pages
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ProtectedRoute from './components/layout/ProtectedRoute';
import MainLayout from './components/layout/MainLayout';
import Dashboard from './pages/dashboard/Dashboard';

// Import providers
import AuthProvider from './components/providers/AuthProvider';

// Import theme
import theme from './styles/theme';
import GlobalStyles from './styles/globalStyles';

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
              
              {/* Protected Routes */}
              <Route path="/" element={<ProtectedRoute />}>
                <Route element={<MainLayout />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/" element={<Dashboard />} />
                  {/* Add more routes as we build them */}
                  {/* <Route path="/courses" element={<Courses />} /> */}
                  {/* <Route path="/users" element={<Users />} /> */}
                  {/* <Route path="/analytics" element={<Analytics />} /> */}
                  {/* <Route path="/settings" element={<Settings />} /> */}
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
