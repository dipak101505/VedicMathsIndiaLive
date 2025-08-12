import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  IconButton,
  Button,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
} from '@mui/material';
import {
  People as PeopleIcon,
  School as SchoolIcon,
  TrendingUp as TrendingUpIcon,
  Notifications as NotificationsIcon,
  Add as AddIcon,
  Visibility as ViewIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { useAuth } from '../../hooks/useAuth';
import { usePermissions } from '../../hooks/usePermissions';
import { useStore } from '../../hooks/useStore';
import { PageContainer, SectionHeader, StatsCard, DashboardGrid } from '../../styles/components';
import { Loading, Card as CommonCard, Badge } from '../../components/common';

const AdminDashboard = () => {
  const { user } = useAuth();
  const { isSuperAdmin, isAdmin } = usePermissions();
  const { users, courses, app } = useStore();
  const [recentActivity, setRecentActivity] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCourses: 0,
    activeUsers: 0,
    totalRevenue: 0,
  });

  // Debug logging
  useEffect(() => {
    console.log('👑 AdminDashboard: Component mounted');
    console.log('👑 AdminDashboard: User:', user ? { uid: user.uid, email: user.email, role: user.role } : null);
    console.log('👑 AdminDashboard: Permissions:', { isSuperAdmin, isAdmin });
    
    return () => {
      console.log('👑 AdminDashboard: Component unmounting');
    };
  }, [user, isSuperAdmin, isAdmin]);

  useEffect(() => {
    // Fetch dashboard data
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    // TODO: Implement API calls to fetch dashboard statistics
    // For now, using mock data
    setStats({
      totalUsers: 1250,
      totalCourses: 45,
      activeUsers: 890,
      totalRevenue: 125000,
    });

    setRecentActivity([
      {
        id: 1,
        type: 'user_created',
        message: 'New user John Doe registered',
        timestamp: new Date(),
        user: { name: 'John Doe', role: 'student' },
      },
      {
        id: 2,
        type: 'course_created',
        message: 'New course "Advanced Mathematics" created',
        timestamp: new Date(Date.now() - 3600000),
        user: { name: 'Dr. Smith', role: 'instructor' },
      },
      {
        id: 3,
        type: 'user_updated',
        message: 'User profile updated',
        timestamp: new Date(Date.now() - 7200000),
        user: { name: 'Jane Wilson', role: 'student' },
      },
    ]);
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'user_created':
        return <PeopleIcon color="success" />;
      case 'course_created':
        return <SchoolIcon color="primary" />;
      case 'user_updated':
        return <EditIcon color="info" />;
      default:
        return <NotificationsIcon color="default" />;
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'user_created':
        return 'success';
      case 'course_created':
        return 'primary';
      case 'user_updated':
        return 'info';
      default:
        return 'default';
    }
  };

  if (!isSuperAdmin && !isAdmin) {
    return (
      <PageContainer>
        <Typography variant="h4" color="error">
          Access Denied: Admin privileges required
        </Typography>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      {/* Welcome Section */}
      <SectionHeader>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>
            Welcome back, {user?.displayName || 'Admin'}!
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Here's what's happening with your platform today
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => {/* TODO: Navigate to create user */}}
          >
            Add User
          </Button>
          <Button
            variant="outlined"
            startIcon={<SchoolIcon />}
            onClick={() => {/* TODO: Navigate to create course */}}
          >
            Create Course
          </Button>
        </Box>
      </SectionHeader>

      {/* Statistics Cards */}
      <DashboardGrid>
        <StatsCard color="primary">
          <Typography variant="h3" component="div" gutterBottom>
            {stats.totalUsers.toLocaleString()}
          </Typography>
          <Typography variant="h6" component="div">
            Total Users
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Across all franchises
          </Typography>
        </StatsCard>

        <StatsCard color="secondary">
          <Typography variant="h3" component="div" gutterBottom>
            {stats.totalCourses}
          </Typography>
          <Typography variant="h6" component="div">
            Active Courses
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Available for enrollment
          </Typography>
        </StatsCard>

        <StatsCard color="success">
          <Typography variant="h3" component="div" gutterBottom>
            {stats.activeUsers.toLocaleString()}
          </Typography>
          <Typography variant="h6" component="div">
            Active Users
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            This month
          </Typography>
        </StatsCard>

        <StatsCard color="warning">
          <Typography variant="h3" component="div" gutterBottom>
            ₹{stats.totalRevenue.toLocaleString()}
          </Typography>
          <Typography variant="h6" component="div">
            Total Revenue
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            This quarter
          </Typography>
        </StatsCard>
      </DashboardGrid>

      {/* Quick Actions */}
      <CommonCard
        title="Quick Actions"
        subtitle="Common administrative tasks"
        sx={{ mb: 4 }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<PeopleIcon />}
              onClick={() => {/* TODO: Navigate to user management */}}
              sx={{ height: 80 }}
            >
              Manage Users
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<SchoolIcon />}
              onClick={() => {/* TODO: Navigate to course management */}}
              sx={{ height: 80 }}
            >
              Manage Courses
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<TrendingUpIcon />}
              onClick={() => {/* TODO: Navigate to analytics */}}
              sx={{ height: 80 }}
            >
              View Analytics
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<NotificationsIcon />}
              onClick={() => {/* TODO: Navigate to notifications */}}
              sx={{ height: 80 }}
            >
              System Alerts
            </Button>
          </Grid>
        </Grid>
      </CommonCard>

      {/* Recent Activity */}
      <CommonCard
        title="Recent Activity"
        subtitle="Latest platform activities"
        sx={{ mb: 4 }}
      >
        <List>
          {recentActivity.map((activity, index) => (
            <React.Fragment key={activity.id}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'grey.100' }}>
                    {getActivityIcon(activity.type)}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="body1">
                        {activity.message}
                      </Typography>
                      <Badge
                        variant="outlined"
                        color={getActivityColor(activity.type)}
                        size="small"
                      >
                        {activity.type.replace('_', ' ')}
                      </Badge>
                    </Box>
                  }
                  secondary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                      <Typography variant="body2" color="text.secondary">
                        by {activity.user.name} ({activity.user.role})
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {activity.timestamp.toLocaleString()}
                      </Typography>
                    </Box>
                  }
                />
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <IconButton size="small" color="primary">
                    <ViewIcon />
                  </IconButton>
                  <IconButton size="small" color="secondary">
                    <EditIcon />
                  </IconButton>
                </Box>
              </ListItem>
              {index < recentActivity.length - 1 && <Divider variant="inset" component="li" />}
            </React.Fragment>
          ))}
        </List>
      </CommonCard>

      {/* System Status */}
      <CommonCard
        title="System Status"
        subtitle="Platform health and performance"
      >
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Chip label="Online" color="success" size="small" />
              <Typography variant="body2">All services operational</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Chip label="Good" color="success" size="small" />
              <Typography variant="body2">Performance: 98.5%</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Chip label="Normal" color="info" size="small" />
              <Typography variant="body2">Uptime: 99.9%</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Recent System Events
            </Typography>
            <List dense>
              <ListItem>
                <ListItemText
                  primary="Database backup completed"
                  secondary="2 hours ago"
                />
                <Chip label="Info" color="info" size="small" />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Security scan completed"
                  secondary="6 hours ago"
                />
                <Chip label="Success" color="success" size="small" />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Cache cleared"
                  secondary="12 hours ago"
                />
                <Chip label="Warning" color="warning" size="small" />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </CommonCard>
    </PageContainer>
  );
};

export default AdminDashboard;
