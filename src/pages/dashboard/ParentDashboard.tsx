import React from 'react';
import {
  Box,
  Grid,
  Typography,
  Paper,
} from '@mui/material';
import {
  People,
  VideoLibrary,
  TrendingUp,
  Notifications,
} from '@mui/icons-material';
import Card from '../../components/common/Card';

const ParentDashboard: React.FC = () => {
  const stats = [
    {
      title: 'Children',
      value: '2',
      icon: <People color="primary" />,
    },
    {
      title: 'Active Courses',
      value: '8',
      icon: <VideoLibrary color="secondary" />,
    },
    {
      title: 'Average Progress',
      value: '82%',
      icon: <TrendingUp color="success" />,
    },
    {
      title: 'Notifications',
      value: '5',
      icon: <Notifications color="warning" />,
    },
  ];

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Parent Dashboard
      </Typography>
      
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Welcome back! Here's an overview of your children's learning progress.
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
              <Typography variant="body2" color="text.secondary">
                {stat.title}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Recent Activity */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card title="Children's Progress" subtitle="Latest learning updates">
            <Box>
              <Typography variant="body2" color="text.secondary">
                No recent progress updates to display.
              </Typography>
            </Box>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card title="Upcoming Events" subtitle="Important dates and sessions">
            <Box>
              <Typography variant="body2" color="text.secondary">
                No upcoming events scheduled.
              </Typography>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ParentDashboard;
