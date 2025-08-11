import React from 'react';
import {
  Box,
  Grid,
  Typography,
  Paper,
} from '@mui/material';
import {
  People,
  School,
  VideoLibrary,
  TrendingUp,
} from '@mui/icons-material';
import Card from '../../components/common/Card';

const AdminDashboard: React.FC = () => {
  const stats = [
    {
      title: 'Total Users',
      value: '1,234',
      icon: <People color="primary" />,
      change: '+12%',
      changeType: 'positive' as const,
    },
    {
      title: 'Active Courses',
      value: '45',
      icon: <VideoLibrary color="secondary" />,
      change: '+5%',
      changeType: 'positive' as const,
    },
    {
      title: 'Franchises',
      value: '23',
      icon: <School color="success" />,
      change: '+2%',
      changeType: 'positive' as const,
    },
    {
      title: 'Revenue',
      value: '₹2.5M',
      icon: <TrendingUp color="info" />,
      change: '+18%',
      changeType: 'positive' as const,
    },
  ];

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Admin Dashboard
      </Typography>
      
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Welcome back! Here's an overview of your system.
      </Typography>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat) => (
          <Grid item xs={12} sm={6} md={3} key={stat.title}>
            <Paper
              sx={{
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
              }}
            >
              <Box sx={{ mb: 2, color: 'primary.main' }}>
                {stat.icon}
              </Box>
              <Typography variant="h4" component="div" gutterBottom>
                {stat.value}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {stat.title}
              </Typography>
              <Typography
                variant="caption"
                color={stat.changeType === 'positive' ? 'success.main' : 'error.main'}
              >
                {stat.change} from last month
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Recent Activity */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card title="Recent Users" subtitle="Latest user registrations">
            <Box>
              <Typography variant="body2" color="text.secondary">
                No recent activity to display.
              </Typography>
            </Box>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card title="System Status" subtitle="Current system health">
            <Box>
              <Typography variant="body2" color="success.main" gutterBottom>
                ✅ All systems operational
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Last updated: {new Date().toLocaleString()}
              </Typography>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashboard;
