import React, { useState, useEffect } from 'react';
import { Box, Drawer, AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from './Sidebar';
import Header from './Header';

const drawerWidth = 240;

const MainLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  // Debug logging
  useEffect(() => {
    console.log('🏗️ MainLayout: Component mounted');
    console.log('🏗️ MainLayout: Using Outlet for children');
    
    return () => {
      console.log('🏗️ MainLayout: Component unmounting');
    };
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  try {
    const drawer = <Sidebar />;

    console.log('🏗️ MainLayout: Rendering with Outlet');

    return (
      <Box sx={{ display: 'flex' }}>
        {/* App Bar */}
        <AppBar
          position="fixed"
          sx={{
            width: { md: `calc(100% - ${drawerWidth}px)` },
            ml: { md: `${drawerWidth}px` },
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Header />
          </Toolbar>
        </AppBar>

        {/* Sidebar */}
        <Box
          component="nav"
          sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        >
          {/* Mobile drawer */}
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', md: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'box-sizing', width: drawerWidth },
            }}
          >
            {drawer}
          </Drawer>
          
          {/* Desktop drawer */}
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', md: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'box-sizing', width: drawerWidth },
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
            mt: '64px', // App bar height
          }}
        >
          <div style={{ background: 'lightblue', padding: '5px', margin: '5px' }}>
            MainLayout Active - Outlet should render children below
            <br />
            Using React Router Outlet for nested routes
          </div>
          <Outlet />
        </Box>
      </Box>
    );
  } catch (error) {
    console.error('❌ MainLayout: Error rendering component:', error);
    return (
      <Box sx={{ p: 3 }}>
        <div style={{ background: 'red', padding: '10px', margin: '10px' }}>
          MainLayout Error
        </div>
        <Typography variant="h4" color="error">MainLayout Error</Typography>
        <Typography>An error occurred while rendering the layout.</Typography>
        <Typography variant="body2">Error: {error.message}</Typography>
      </Box>
    );
  }
};

export default MainLayout;
