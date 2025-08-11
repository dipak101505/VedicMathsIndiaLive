import React from 'react';
import {
  Box,
  Grid,
  Typography,
  Paper,
} from '@mui/material';
import {
  VideoLibrary,
  People,
  Assignment,
  TrendingUp,
} from '@mui/icons-material';
import Card from '../../components/common/Card';

const InstructorDashboard: React.FC = () => {
  const stats = [
    {
      title: 'My Courses',
      value: '8',
      icon: <VideoLibrary color="primary" />,
    },
    {
      title: 'Total Students',
      value: '156',
      icon: <People color="secondary" />,
    },
    {
      title: 'Pending Assignments',
      value: '23',
      icon: <Assignment color="warning" />,
    },
    {
      title: 'Student Progress',
      value: '87%',
      icon: <TrendingUp color="success" />,
    },
  ];

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Instructor Dashboard
      </Typography>
      
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Welcome back! Here's an overview of your teaching activities.
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
          <Card title="Recent Submissions" subtitle="Latest student assignments">
            <Box>
              <Typography variant="body2" color="text.secondary">
                No recent submissions to display.
              </Typography>
            </Box>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card title="Upcoming Sessions" subtitle="Scheduled classes">
            <Box>
              <Typography variant="body2" color="text.secondary">
                No upcoming sessions scheduled.
              </Typography>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default InstructorDashboard;
