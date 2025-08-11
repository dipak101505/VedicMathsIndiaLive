import React, { useState } from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Dashboard,
  People,
  School,
  VideoLibrary,
  Analytics,
  Settings,
  Menu as MenuIcon,
  ChevronLeft,
} from '@mui/icons-material';
import { useAuth } from '../../hooks/useAuth';
import { UserRole } from '../../types/auth.types';

const drawerWidth = 240;

interface SidebarProps {
  open?: boolean;
  onToggle?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open = true, onToggle }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { user } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const getMenuItems = (role: UserRole) => {
    const baseItems = [
      { text: 'Dashboard', icon: <Dashboard />, path: '/dashboard' },
    ];

    switch (role) {
      case 'super_admin':
        return [
          ...baseItems,
          { text: 'Users', icon: <People />, path: '/users' },
          { text: 'Franchises', icon: <School />, path: '/franchises' },
          { text: 'Courses', icon: <VideoLibrary />, path: '/courses' },
          { text: 'Analytics', icon: <Analytics />, path: '/analytics' },
          { text: 'Settings', icon: <Settings />, path: '/settings' },
        ];
      case 'franchise_admin':
        return [
          ...baseItems,
          { text: 'Users', icon: <People />, path: '/users' },
          { text: 'Courses', icon: <VideoLibrary />, path: '/courses' },
          { text: 'Analytics', icon: <Analytics />, path: '/analytics' },
          { text: 'Settings', icon: <Settings />, path: '/settings' },
        ];
      case 'instructor':
        return [
          ...baseItems,
          { text: 'My Courses', icon: <VideoLibrary />, path: '/my-courses' },
          { text: 'Students', icon: <People />, path: '/students' },
          { text: 'Analytics', icon: <Analytics />, path: '/analytics' },
        ];
      case 'student':
        return [
          ...baseItems,
          { text: 'My Courses', icon: <VideoLibrary />, path: '/my-courses' },
          { text: 'Progress', icon: <Analytics />, path: '/progress' },
        ];
      case 'parent':
        return [
          ...baseItems,
          { text: 'Children', icon: <People />, path: '/children' },
          { text: 'Progress', icon: <Analytics />, path: '/progress' },
        ];
      default:
        return baseItems;
    }
  };

  const menuItems = user ? getMenuItems(user.role) : getMenuItems('student');

  const drawerContent = (
    <Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 2,
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Typography variant="h6" noWrap component="div">
          Vedic Maths India
        </Typography>
        {isMobile && (
          <ListItemButton onClick={handleDrawerToggle}>
            <ChevronLeft />
          </ListItemButton>
        )}
      </Box>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  if (isMobile) {
    return (
      <>
        <Box
          component="button"
          onClick={handleDrawerToggle}
          sx={{
            position: 'fixed',
            top: 16,
            left: 16,
            zIndex: theme.zIndex.drawer + 1,
            backgroundColor: 'primary.main',
            color: 'white',
            border: 'none',
            borderRadius: 1,
            p: 1,
            cursor: 'pointer',
          }}
        >
          <MenuIcon />
        </Box>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawerContent}
        </Drawer>
      </>
    );
  }

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
    >
      {drawerContent}
    </Drawer>
  );
};

export default Sidebar;
