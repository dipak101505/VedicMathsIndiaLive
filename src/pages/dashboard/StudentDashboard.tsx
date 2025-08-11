import React from 'react';
import {
  Box,
  Grid,
  Typography,
  Paper,
} from '@mui/material';
import {
  VideoLibrary,
  Assignment,
  TrendingUp,
  Schedule,
} from '@mui/icons-material';
import Card from '../../components/common/Card';

const StudentDashboard: React.FC = () => {
  const stats = [
    {
      title: 'Enrolled Courses',
      value: '5',
      icon: <VideoLibrary color="primary" />,
    },
    {
      title: 'Pending Assignments',
      value: '3',
      icon: <Assignment color="warning" />,
    },
    {
      title: 'Overall Progress',
      value: '78%',
      icon: <TrendingUp color="success" />,
    },
    {
      title: 'Next Session',
      value: '2h',
      icon: <Schedule color="info" />,
    },
  ];

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Student Dashboard
      </Typography>
      
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Welcome back! Here's your learning progress overview.
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
          <Card title="Recent Activities" subtitle="Your latest learning activities">
            <Box>
              <Typography variant="body2" color="text.secondary">
                No recent activities to display.
              </Typography>
            </Box>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card title="Upcoming Deadlines" subtitle="Assignment due dates">
            <Box>
              <Typography variant="body2" color="text.secondary">
                No upcoming deadlines.
              </Typography>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default StudentDashboard;
