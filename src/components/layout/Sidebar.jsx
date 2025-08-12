import React, { useState, useEffect } from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  Avatar,
  Collapse,
  Menu,
  MenuItem,
  ListItemSecondaryAction,
  IconButton,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  School as SchoolIcon,
  VideoLibrary as VideoIcon,
  Analytics as AnalyticsIcon,
  Settings as SettingsIcon,
  Notifications as NotificationsIcon,
  Book as BookIcon,
  Folder as FolderIcon,
  BarChart as BarChartIcon,
  AttachMoney as MoneyIcon,
  Chat as ChatIcon,
  AccountCircle as AccountIcon,
  ChevronRight as ChevronRightIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Logout as LogoutIcon,
  Person as PersonIcon,
  CalendarMonth as CalendarIcon,
  Schedule as WorkingHoursIcon,
  BeachAccess as LeavesIcon,
  Warning as SessionConflictsIcon,
  RocketLaunch as RocketIcon,
  Group as OneOnOneIcon,
  Groups as GroupCoursesIcon,
  Videocam as VideoCameraIcon,
  Store as StoreIcon,
  AccountBalance as BankIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { usePermissions } from '../../hooks/usePermissions';
import { useAuthStore } from '../../store/authStore';

const Sidebar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const { isAdmin, isSuperAdmin, isInstructor, isStudent, isParent } = usePermissions();
  const [expandedLearners, setExpandedLearners] = useState(true);
  const [demoRole, setDemoRole] = useState(null);
  const [accountMenuAnchor, setAccountMenuAnchor] = useState(null);

  // Get demo role from localStorage and listen for changes
  useEffect(() => {
    const getDemoRole = () => {
      try {
        return localStorage.getItem('demoRole');
      } catch {
        return null;
      }
    };

    // Set initial demo role
    setDemoRole(getDemoRole());
    console.log('🔧 Sidebar: Initial demo role set to:', getDemoRole());

    // Listen for storage changes
    const handleStorageChange = (e) => {
      if (e.key === 'demoRole') {
        console.log('🔧 Sidebar: Storage change detected, new role:', e.newValue);
        setDemoRole(e.newValue);
      }
    };

    // Listen for custom event when role changes
    const handleRoleChange = () => {
      const newRole = getDemoRole();
      console.log('🔧 Sidebar: Custom event received, new role:', newRole);
      setDemoRole(newRole);
    };

    // Add event listeners
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('demoRoleChanged', handleRoleChange);

    // Cleanup
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('demoRoleChanged', handleRoleChange);
    };
  }, []);

  // Debug logging for role changes
  useEffect(() => {
    console.log('🔧 Sidebar: Demo role state changed to:', demoRole);
    console.log('🔧 Sidebar: Menu items will be:', getMenuItems().map(item => item.text));
  }, [demoRole]);

  // Mock data for parent's learners
  const mockLearners = [
    { id: 1, name: 'Liam Smith', initial: 'L', path: '/learner/liam-smith' },
    { id: 2, name: 'Emma Williams', initial: 'E', path: '/learner/emma-williams' },
  ];

  // Role-based menu items
  const getMenuItems = () => {
    // Demo role takes precedence for testing
    if (demoRole === 'parent' || isParent) {
      return [
        { text: 'Fees', icon: <MoneyIcon />, path: '/fees' },
        { 
          text: 'My Learners', 
          icon: <PeopleIcon />, 
          path: '/my-learners',
          hasSubItems: true,
          subItems: mockLearners
        },
        { text: 'Notifications', icon: <NotificationsIcon />, path: '/notifications' },
      ];
    }

    if (demoRole === 'instructor' || isInstructor) {
      return [
        { text: 'Courses', icon: <FolderIcon />, path: '/courses' },
        { text: 'Calendar', icon: <CalendarIcon />, path: '/calendar' },
        { text: 'Payouts', icon: <MoneyIcon />, path: '/payouts' },
        { text: 'Working Hours', icon: <WorkingHoursIcon />, path: '/working-hours' },
        { text: 'Leaves', icon: <LeavesIcon />, path: '/leaves' },
        { text: 'Session conflicts', icon: <SessionConflictsIcon />, path: '/session-conflicts' },
        { text: 'Chats', icon: <ChatIcon />, path: '/chats' },
        { text: 'Notifications', icon: <NotificationsIcon />, path: '/notifications' },
      ];
    }

    if (demoRole === 'admin' || isAdmin) {
      return [
        { text: 'Get started', icon: <RocketIcon />, path: '/get-started', isHighlighted: true },
        { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
        { text: 'Consultations', icon: <VideoIcon />, path: '/consultations' },
        { text: '1:1 courses', icon: <OneOnOneIcon />, path: '/one-on-one-courses' },
        { text: 'Group courses', icon: <GroupCoursesIcon />, path: '/group-courses' },
        { text: 'Recorded courses', icon: <VideoCameraIcon />, path: '/recorded-courses' },
        { text: 'Instructors', icon: <SchoolIcon />, path: '/instructors' },
        { text: 'Learners', icon: <PeopleIcon />, path: '/learners' },
        { text: 'Chats', icon: <ChatIcon />, path: '/chats' },
        { text: 'Store', icon: <StoreIcon />, path: '/store' },
        { text: 'Analytics', icon: <AnalyticsIcon />, path: '/analytics' },
        { text: 'Finance', icon: <BankIcon />, path: '/finance' },
        { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
        { text: 'Notifications', icon: <NotificationsIcon />, path: '/notifications' },
      ];
    }
    
    if (demoRole === 'student' || isStudent) {
      return [
        { text: 'My Courses', icon: <BookIcon />, path: '/my-courses' },
        { text: 'All Courses', icon: <FolderIcon />, path: '/courses' },
        { text: 'Activity', icon: <BarChartIcon />, path: '/activity' },
        { text: 'Fees', icon: <MoneyIcon />, path: '/fees' },
        { text: 'Chats', icon: <ChatIcon />, path: '/chats' },
        { text: 'Notifications', icon: <NotificationsIcon />, path: '/notifications' },
      ];
    }

    

    // Default/fallback menu items
    return [
      { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
      { text: 'Courses', icon: <SchoolIcon />, path: '/courses' },
      { text: 'Notifications', icon: <NotificationsIcon />, path: '/notifications' },
    ];
  };

  const menuItems = getMenuItems();

  const handleLearnersToggle = () => {
    setExpandedLearners(!expandedLearners);
  };

  const handleAccountClick = (event) => {
    setAccountMenuAnchor(event.currentTarget);
  };

  const handleAccountMenuClose = () => {
    setAccountMenuAnchor(null);
  };

  const handleLogout = () => {
    handleAccountMenuClose();
    logout();
    navigate('/login');
  };

  const renderMenuItem = (item, index) => {
    if (item.hasSubItems) {
      return (
        <React.Fragment key={item.text}>
          <ListItem disablePadding>
            <ListItemButton 
              onClick={handleLearnersToggle}
              sx={{
                mx: 1,
                mb: 0.5,
                borderRadius: 1,
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)',
                },
              }}
            >
              <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text} 
                sx={{ 
                  color: 'white',
                  '& .MuiTypography-root': {
                    fontWeight: 500,
                  }
                }}
              />
              {expandedLearners ? <ExpandLessIcon sx={{ color: 'white' }} /> : <ExpandMoreIcon sx={{ color: 'white' }} />}
            </ListItemButton>
          </ListItem>
          
          <Collapse in={expandedLearners} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {item.subItems.map((learner) => (
                <ListItem key={learner.id} disablePadding>
                  <ListItemButton 
                    onClick={() => navigate(learner.path)}
                    sx={{
                      ml: 3,
                      mr: 1,
                      mb: 0.5,
                      borderRadius: 1,
                      backgroundColor: 'rgba(255,255,255,0.05)',
                      '&:hover': {
                        backgroundColor: 'rgba(255,255,255,0.15)',
                      },
                    }}
                  >
                    <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
                      <Avatar sx={{ width: 24, height: 24, bgcolor: 'white', color: 'primary.main', fontSize: '0.875rem' }}>
                        {learner.initial}
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText 
                      primary={learner.name} 
                      sx={{ 
                        color: 'white',
                        '& .MuiTypography-root': {
                          fontWeight: 500,
                        }
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Collapse>
        </React.Fragment>
      );
    }

    // Handle highlighted items (like "Get started")
    if (item.isHighlighted) {
      return (
        <ListItem key={item.text} disablePadding>
          <ListItemButton 
            onClick={() => navigate(item.path)}
            sx={{
              mx: 1,
              mb: 0.5,
              borderRadius: 1,
              backgroundColor: 'rgba(255,255,255,0.15)',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.2)',
              },
            }}
          >
            <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText 
              primary={item.text} 
              sx={{ 
                color: 'white',
                '& .MuiTypography-root': {
                  fontWeight: 600,
                }
              }}
            />
          </ListItemButton>
        </ListItem>
      );
    }

    return (
      <ListItem key={item.text} disablePadding>
        <ListItemButton 
          onClick={() => navigate(item.path)}
          sx={{
            mx: 1,
            mb: 0.5,
            borderRadius: 1,
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,0.1)',
            },
          }}
        >
          <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
            {item.icon}
          </ListItemIcon>
          <ListItemText 
            primary={item.text} 
            sx={{ 
              color: 'white',
              '& .MuiTypography-root': {
                fontWeight: 500,
              }
            }}
          />
        </ListItemButton>
      </ListItem>
    );
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Branding Section */}
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              backgroundColor: '#8B4513',
              borderRadius: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mr: 1,
              border: '2px solid white',
            }}
          >
            <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
              A
            </Typography>
          </Box>
          <Box>
            <Typography variant="subtitle1" sx={{ color: 'white', fontWeight: 'bold', lineHeight: 1.2 }}>
              Vedic Maths
            </Typography>
            <Typography variant="subtitle2" sx={{ color: 'white', lineHeight: 1.2 }}>
              India
            </Typography>
          </Box>
        </Box>
        
        {/* Demo Role Indicator */}
        {demoRole && (
          <Box sx={{ mt: 1 }}>
            <Typography 
              variant="caption" 
              sx={{ 
                color: 'rgba(255,255,255,0.7)', 
                backgroundColor: 'rgba(255,255,255,0.1)',
                px: 1,
                py: 0.5,
                borderRadius: 1,
                fontSize: '0.7rem',
              }}
            >
              Demo: {demoRole}
            </Typography>
          </Box>
        )}
      </Box>

      <Divider sx={{ backgroundColor: 'rgba(255,255,255,0.2)' }} />

      {/* Navigation Menu */}
      <List sx={{ flexGrow: 1, pt: 1 }}>
        {menuItems.map((item) => renderMenuItem(item))}
      </List>

      {/* Account Section */}
      <Box sx={{ p: 2, borderTop: '1px solid rgba(255,255,255,0.2)' }}>
        <ListItemButton
          onClick={handleAccountClick}
          sx={{
            borderRadius: 1,
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,0.1)',
            },
          }}
        >
          <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
            <Avatar sx={{ width: 24, height: 24, bgcolor: 'white', color: 'primary.main' }}>
              {user?.displayName?.charAt(0) || 'S'}
            </Avatar>
          </ListItemIcon>
          <ListItemText 
            primary="Account" 
            sx={{ 
              color: 'white',
              '& .MuiTypography-root': {
                fontWeight: 500,
              }
            }}
          />
          <ChevronRightIcon sx={{ color: 'white' }} />
        </ListItemButton>

        {/* Account Menu */}
        <Menu
          anchorEl={accountMenuAnchor}
          open={Boolean(accountMenuAnchor)}
          onClose={handleAccountMenuClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          PaperProps={{
            sx: {
              mt: 1,
              minWidth: 200,
              backgroundColor: '#1a1a2e',
              color: 'white',
              border: '1px solid rgba(255,255,255,0.2)',
              '& .MuiMenuItem-root': {
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)',
                },
              },
            },
          }}
        >
          <MenuItem onClick={() => { handleAccountMenuClose(); navigate('/account'); }}>
            <ListItemIcon>
              <PersonIcon sx={{ color: 'white' }} />
            </ListItemIcon>
            Profile
          </MenuItem>
          <MenuItem onClick={() => { handleAccountMenuClose(); navigate('/settings'); }}>
            <ListItemIcon>
              <SettingsIcon sx={{ color: 'white' }} />
            </ListItemIcon>
            Settings
          </MenuItem>
          <Divider sx={{ backgroundColor: 'rgba(255,255,255,0.2)', my: 1 }} />
          <MenuItem onClick={handleLogout} sx={{ color: '#ff6b6b' }}>
            <ListItemIcon>
              <LogoutIcon sx={{ color: '#ff6b6b' }} />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default Sidebar;
