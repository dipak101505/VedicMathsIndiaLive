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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  ListItemAvatar,
  Badge,
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
import { useNavigate, useLocation } from 'react-router-dom';
import { usePermissions } from '../../hooks/usePermissions';
import { useAuthStore } from '../../store/authStore';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuthStore();
  const { isAdmin, isSuperAdmin, isInstructor, isStudent, isParent } = usePermissions();
  const [expandedLearners, setExpandedLearners] = useState(true);
  const [demoRole, setDemoRole] = useState(null);
  const [accountMenuAnchor, setAccountMenuAnchor] = useState(null);
  const [notificationModalOpen, setNotificationModalOpen] = useState(false);

  // Helper function to check if a menu item is currently active
  const isActiveRoute = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    
    // Handle different URL patterns
    const currentPath = location.pathname;
    
    // Map sidebar paths to actual URL patterns
    const pathMappings = {
      '/courses': ['/courses', '/student/classes'],
      '/my-courses': ['/my-courses', '/student/my-courses', '/course'],
      '/activity': ['/activity', '/student/activity'],
      '/fees': ['/fees', '/student/fees'],
      '/chats': ['/chats', '/student/chats'],
      '/notifications': ['/notifications', '/student/notifications'],
    };
    
    // Check if current path matches any of the mapped paths
    const mappedPaths = pathMappings[path] || [path];
    const isActive = mappedPaths.some(mappedPath => 
      currentPath === mappedPath || currentPath.startsWith(mappedPath + '/')
    );
    
    // For debugging
    console.log(`🔍 Route check: ${path} vs ${currentPath} = ${isActive}`);
    console.log(`🔍 Mapped paths: ${mappedPaths.join(', ')}`);
    
    return isActive;
  };

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

  // Mock notifications data
  const mockNotifications = [
    {
      id: 1,
      title: 'New Course Available',
      message: 'Advanced Vedic Mathematics course is now available for enrollment.',
      time: '2 hours ago',
      type: 'course',
      read: false,
    },
    {
      id: 2,
      title: 'Payment Received',
      message: 'Your payment of ₹2,500 has been received successfully.',
      time: '1 day ago',
      type: 'payment',
      read: true,
    },
    {
      id: 3,
      title: 'Session Reminder',
      message: 'You have a scheduled session tomorrow at 10:00 AM.',
      time: '2 days ago',
      type: 'reminder',
      read: true,
    },
    {
      id: 4,
      title: 'Assignment Due',
      message: 'Your mathematics assignment is due in 3 days.',
      time: '3 days ago',
      type: 'assignment',
      read: false,
    },
  ];

  const unreadCount = mockNotifications.filter(notification => !notification.read).length;

  // Role-based menu items
  const getMenuItems = () => {
    // Demo role takes precedence for testing
    if (demoRole === 'parent' || isParent) {
      return [
        { text: 'Dashboard', icon: <DashboardIcon />, path: '/parent-dashboard' },
        { text: 'Children Progress', icon: <BarChartIcon />, path: '/children-progress' },
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

    if (demoRole === 'admin' || isAdmin) {
      return [
        { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
        { text: 'Get started', icon: <RocketIcon />, path: '/get-started' },
        { text: 'Course Management', icon: <FolderIcon />, path: '/course-management' },
        { text: 'All Courses', icon: <SchoolIcon />, path: '/courses' },
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
    
    if (demoRole === 'instructor' || isInstructor) {
      return [
        { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
        { text: 'Course Management', icon: <FolderIcon />, path: '/course-management' },
        { text: 'My Courses', icon: <SchoolIcon />, path: '/courses' },
        { text: 'Calendar', icon: <CalendarIcon />, path: '/calendar' },
        { text: 'Payouts', icon: <MoneyIcon />, path: '/payouts' },
        { text: 'Working Hours', icon: <WorkingHoursIcon />, path: '/working-hours' },
        { text: 'Leaves', icon: <LeavesIcon />, path: '/leaves' },
        { text: 'Session conflicts', icon: <SessionConflictsIcon />, path: '/session-conflicts' },
        { text: 'Chats', icon: <ChatIcon />, path: '/chats' },
        { text: 'Notifications', icon: <NotificationsIcon />, path: '/notifications' },
      ];
    }


    
    if (demoRole === 'student' || isStudent) {
      return [
        { text: 'My Courses', icon: <BookIcon />, path: '/my-courses' },
        { text: 'All Courses', icon: <SchoolIcon />, path: '/courses' },
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

  const handleNotificationClick = () => {
    setNotificationModalOpen(true);
  };

  const handleNotificationModalClose = () => {
    setNotificationModalOpen(false);
  };

  const renderMenuItem = (item, index) => {
    // Special handling for notification items
    if (item.text === 'Notifications') {
      return (
        <ListItem key={item.text} disablePadding>
          <ListItemButton 
            onClick={handleNotificationClick}
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
              <Badge badgeContent={unreadCount} color="error">
                {item.icon}
              </Badge>
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
    }

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
                backgroundColor: expandedLearners ? 'rgba(255,255,255,0.1)' : 'transparent',
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
                    fontWeight: expandedLearners ? 600 : 500,
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
                      backgroundColor: isActiveRoute(learner.path) ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.05)',
                      '&:hover': {
                        backgroundColor: isActiveRoute(learner.path) ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.15)',
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
                          fontWeight: isActiveRoute(learner.path) ? 600 : 500,
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

    // Handle active routes with special styling
    if (isActiveRoute(item.path)) {
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
            backgroundColor: isActiveRoute(item.path) ? 'rgba(255,255,255,0.15)' : 'transparent',
            '&:hover': {
              backgroundColor: isActiveRoute(item.path) ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.1)',
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
                fontWeight: isActiveRoute(item.path) ? 600 : 500,
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
              borderRadius: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mr: 1,
              overflow: 'hidden',
            }}
          >
            <img
              src="https://vedicmathsindia.org/wp-content/uploads/2018/06/cropped-C_Users_Riju-Pramanik_AppData_Local_Packages_Microsoft.SkypeApp_kzf8qxf38zg5c_LocalState_8c3fc180-bbe9-41d7-ac56-a944a5fc4067-32x32.png"
              alt="Vedic Maths India"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </Box>
          <Box>
            <Typography variant="subtitle1" sx={{ color: 'white', fontWeight: 'bold', lineHeight: 1.2 }}>
              Vedic Maths India
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

      {/* Notification Modal */}
      <Dialog
        open={notificationModalOpen}
        onClose={handleNotificationModalClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            backgroundColor: '#1a1a2e',
            color: 'white',
            border: '1px solid rgba(255,255,255,0.2)',
          },
        }}
      >
        <DialogTitle sx={{ 
          borderBottom: '1px solid rgba(255,255,255,0.2)',
          pb: 2,
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}>
          <NotificationsIcon sx={{ color: 'primary.main' }} />
          Notifications
          {unreadCount > 0 && (
            <Badge 
              badgeContent={unreadCount} 
              color="error" 
              sx={{ ml: 1 }}
            />
          )}
        </DialogTitle>
        
        <DialogContent sx={{ pt: 2, pb: 1 }}>
          {mockNotifications.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <NotificationsIcon sx={{ fontSize: 48, color: 'rgba(255,255,255,0.3)', mb: 2 }} />
              <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                No notifications yet
              </Typography>
            </Box>
          ) : (
            <List sx={{ p: 0 }}>
              {mockNotifications.map((notification) => (
                <ListItem 
                  key={notification.id} 
                  sx={{ 
                    px: 0, 
                    py: 1,
                    borderBottom: '1px solid rgba(255,255,255,0.1)',
                    '&:last-child': { borderBottom: 'none' }
                  }}
                >
                  <ListItemAvatar>
                    <Avatar 
                      sx={{ 
                        width: 40, 
                        height: 40, 
                        bgcolor: notification.read ? 'rgba(255,255,255,0.1)' : 'primary.main',
                        color: notification.read ? 'rgba(255,255,255,0.7)' : 'white'
                      }}
                    >
                      {notification.type === 'course' && <SchoolIcon />}
                      {notification.type === 'payment' && <MoneyIcon />}
                      {notification.type === 'reminder' && <CalendarIcon />}
                      {notification.type === 'assignment' && <BookIcon />}
                    </Avatar>
                  </ListItemAvatar>
                  
                  <ListItemText
                    primary={
                      <Typography 
                        variant="subtitle2" 
                        sx={{ 
                          fontWeight: notification.read ? 400 : 600,
                          color: notification.read ? 'rgba(255,255,255,0.8)' : 'white'
                        }}
                      >
                        {notification.title}
                      </Typography>
                    }
                    secondary={
                      <Box>
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            color: 'rgba(255,255,255,0.7)',
                            mb: 0.5
                          }}
                        >
                          {notification.message}
                        </Typography>
                        <Typography 
                          variant="caption" 
                          sx={{ 
                            color: 'rgba(255,255,255,0.5)',
                            fontSize: '0.75rem'
                          }}
                        >
                          {notification.time}
                        </Typography>
                      </Box>
                    }
                  />
                  
                  {!notification.read && (
                    <Box 
                      sx={{ 
                        width: 8, 
                        height: 8, 
                        borderRadius: '50%', 
                        bgcolor: 'primary.main',
                        ml: 1
                      }} 
                    />
                  )}
                </ListItem>
              ))}
            </List>
          )}
        </DialogContent>
        
        <DialogActions sx={{ 
          borderTop: '1px solid rgba(255,255,255,0.2)',
          pt: 2,
          px: 3,
          pb: 2
        }}>
          <Button 
            onClick={handleNotificationModalClose}
            variant="outlined"
            sx={{ 
              color: 'white',
              borderColor: 'rgba(255,255,255,0.3)',
              '&:hover': {
                borderColor: 'rgba(255,255,255,0.5)',
                backgroundColor: 'rgba(255,255,255,0.05)',
              }
            }}
          >
            Close
          </Button>
          <Button 
            variant="contained"
            sx={{ 
              bgcolor: 'primary.main',
              color: 'white',
              '&:hover': {
                bgcolor: 'primary.dark',
              }
            }}
          >
            Mark All as Read
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Sidebar;
