import React from 'react';
import { Box, Drawer } from '@mui/material';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Breadcrumbs from './Breadcrumbs';

const drawerWidth = 240;

const MainLayout = () => {
  const location = useLocation();
  
  try {
    const drawer = <Sidebar />;

    return (
      <Box sx={{ display: 'flex' }}>
        {/* Sidebar */}
        <Box
          component="nav"
          sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        >
          {/* Mobile drawer */}
          <Drawer
            variant="temporary"
            open={false}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', md: 'none' },
              '& .MuiDrawer-paper': { 
                boxSizing: 'box-sizing', 
                width: drawerWidth,
                backgroundColor: '#1a1a2e', // Dark blue/charcoal background
                border: 'none',
              },
            }}
          >
            {drawer}
          </Drawer>
          
          {/* Desktop drawer */}
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', md: 'block' },
              '& .MuiDrawer-paper': { 
                boxSizing: 'box-sizing', 
                width: drawerWidth,
                backgroundColor: '#1a1a2e', // Dark blue/charcoal background
                border: 'none',
                boxShadow: '2px 0 8px rgba(0,0,0,0.3)',
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>

        {/* Main content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { md: `calc(100% - ${drawerWidth}px)` },
            minHeight: '100vh',
            backgroundColor: '#f5f5f5', // Light background for content area
          }}
        >
          {/* Breadcrumbs - only show on non-dashboard pages */}
          {location.pathname !== '/dashboard' && location.pathname !== '/' && (
            <Breadcrumbs />
          )}
          <Outlet />
        </Box>
      </Box>
    );
  } catch (error) {
    console.error('❌ MainLayout: Error rendering component:', error);
    return (
      <Box sx={{ p: 3 }}>
        <div style={{ color: 'red', fontSize: '1.5rem', fontWeight: 'bold' }}>
          MainLayout Error
        </div>
        <div>An error occurred while rendering the layout.</div>
        <div style={{ fontSize: '0.875rem' }}>Error: {error.message}</div>
      </Box>
    );
  }
};

export default MainLayout;
