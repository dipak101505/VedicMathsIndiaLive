import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  Button,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  LinearProgress,
  IconButton,
} from '@mui/material';
import {
  School as SchoolIcon,
  People as PeopleIcon,
  Assignment as AssignmentIcon,
  TrendingUp as TrendingUpIcon,
  Add as AddIcon,
  Visibility as ViewIcon,
  Edit as EditIcon,
  Message as MessageIcon,
} from '@mui/icons-material';
import { useAuth } from '../../hooks/useAuth';
import { usePermissions } from '../../hooks/usePermissions';
import { useStore } from '../../hooks/useStore';
import { PageContainer, SectionHeader, StatsCard, DashboardGrid } from '../../styles/components';
import { Loading, Card as CommonCard, Badge } from '../../components/common';

const InstructorDashboard = () => {
  const { user } = useAuth();
  const { isInstructor } = usePermissions();
  const { courses } = useStore();
  const [instructorStats, setInstructorStats] = useState({
    totalCourses: 0,
    totalStudents: 0,
    activeStudents: 0,
    averageProgress: 0,
  });
  const [recentCourses, setRecentCourses] = useState([]);
  const [pendingAssignments, setPendingAssignments] = useState([]);

  useEffect(() => {
    if (isInstructor) {
      fetchInstructorData();
    }
  }, [isInstructor]);

  const fetchInstructorData = async () => {
    // TODO: Implement API calls to fetch instructor-specific data
    // For now, using mock data
    setInstructorStats({
      totalCourses: 8,
      totalStudents: 156,
      activeStudents: 142,
      averageProgress: 78,
    });

    setRecentCourses([
      {
        id: 1,
        title: 'Advanced Mathematics',
        students: 45,
        progress: 85,
        lastActivity: new Date(Date.now() - 3600000),
      },
      {
        id: 2,
        title: 'Basic Algebra',
        students: 32,
        progress: 72,
        lastActivity: new Date(Date.now() - 7200000),
      },
      {
        id: 3,
        title: 'Geometry Fundamentals',
        students: 28,
        progress: 91,
        lastActivity: new Date(Date.now() - 10800000),
      },
    ]);

    setPendingAssignments([
      {
        id: 1,
        course: 'Advanced Mathematics',
        student: 'John Doe',
        assignment: 'Chapter 5 Quiz',
        submittedAt: new Date(Date.now() - 1800000),
        status: 'pending',
      },
      {
        id: 2,
        course: 'Basic Algebra',
        student: 'Jane Smith',
        assignment: 'Homework Set 3',
        submittedAt: new Date(Date.now() - 5400000),
        status: 'pending',
      },
    ]);
  };

  if (!isInstructor) {
    return (
      <PageContainer>
        <Typography variant="h4" color="error">
          Access Denied: Instructor privileges required
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
            Welcome back, {user?.displayName || 'Instructor'}!
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage your courses and track student progress
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => {/* TODO: Navigate to create course */}}
          >
            Create Course
          </Button>
          <Button
            variant="outlined"
            startIcon={<AssignmentIcon />}
            onClick={() => {/* TODO: Navigate to create assignment */}}
          >
            New Assignment
          </Button>
        </Box>
      </SectionHeader>

      {/* Statistics Cards */}
      <DashboardGrid>
        <StatsCard color="primary">
          <Typography variant="h3" component="div" gutterBottom>
            {instructorStats.totalCourses}
          </Typography>
          <Typography variant="h6" component="div">
            My Courses
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Active courses
          </Typography>
        </StatsCard>

        <StatsCard color="secondary">
          <Typography variant="h3" component="div" gutterBottom>
            {instructorStats.totalStudents}
          </Typography>
          <Typography variant="h6" component="div">
            Total Students
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Enrolled across all courses
          </Typography>
        </StatsCard>

        <StatsCard color="success">
          <Typography variant="h3" component="div" gutterBottom>
            {instructorStats.activeStudents}
          </Typography>
          <Typography variant="h6" component="div">
            Active Students
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            This month
          </Typography>
        </StatsCard>

        <StatsCard color="warning">
          <Typography variant="h3" component="div" gutterBottom>
            {instructorStats.averageProgress}%
          </Typography>
          <Typography variant="h6" component="div">
            Avg. Progress
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Across all courses
          </Typography>
        </StatsCard>
      </DashboardGrid>

      {/* Quick Actions */}
      <CommonCard
        title="Quick Actions"
        subtitle="Common instructor tasks"
        sx={{ mb: 4 }}
      >
        <Grid container spacing={2}>
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
              startIcon={<PeopleIcon />}
              onClick={() => {/* TODO: Navigate to student management */}}
              sx={{ height: 80 }}
            >
              View Students
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<AssignmentIcon />}
              onClick={() => {/* TODO: Navigate to assignments */}}
              sx={{ height: 80 }}
            >
              Grade Assignments
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<MessageIcon />}
              onClick={() => {/* TODO: Navigate to messages */}}
              sx={{ height: 80 }}
            >
              Send Messages
            </Button>
          </Grid>
        </Grid>
      </CommonCard>

      {/* Recent Courses */}
      <CommonCard
        title="Recent Courses"
        subtitle="Your latest course activities"
        sx={{ mb: 4 }}
      >
        <List>
          {recentCourses.map((course, index) => (
            <React.Fragment key={course.id}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'primary.main' }}>
                    <SchoolIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="h6">
                        {course.title}
                      </Typography>
                      <Chip
                        label={`${course.students} students`}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                    </Box>
                  }
                  secondary={
                    <Box sx={{ mt: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                          Progress: {course.progress}%
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Last activity: {course.lastActivity.toLocaleString()}
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={course.progress}
                        sx={{ height: 8, borderRadius: 4 }}
                      />
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
              {index < recentCourses.length - 1 && <Divider variant="inset" component="li" />}
            </React.Fragment>
          ))}
        </List>
      </CommonCard>

      {/* Pending Assignments */}
      <CommonCard
        title="Pending Assignments"
        subtitle="Assignments waiting for grading"
        actions={
          <Button
            variant="outlined"
            startIcon={<AssignmentIcon />}
            onClick={() => {/* TODO: Navigate to all assignments */}}
          >
            View All
          </Button>
        }
      >
        {pendingAssignments.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="body1" color="text.secondary">
              No pending assignments to grade
            </Typography>
          </Box>
        ) : (
          <List>
            {pendingAssignments.map((assignment, index) => (
              <React.Fragment key={assignment.id}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: 'warning.main' }}>
                      <AssignmentIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="body1">
                          {assignment.assignment}
                        </Typography>
                        <Badge
                          variant="outlined"
                          color="warning"
                          size="small"
                        >
                          Pending
                        </Badge>
                      </Box>
                    }
                    secondary={
                      <Box sx={{ mt: 0.5 }}>
                        <Typography variant="body2" color="text.secondary">
                          Course: {assignment.course}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Student: {assignment.student}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Submitted: {assignment.submittedAt.toLocaleString()}
                        </Typography>
                      </Box>
                    }
                  />
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      size="small"
                      variant="contained"
                      onClick={() => {/* TODO: Navigate to grade assignment */}}
                    >
                      Grade
                    </Button>
                    <IconButton size="small" color="primary">
                      <ViewIcon />
                    </IconButton>
                  </Box>
                </ListItem>
                {index < pendingAssignments.length - 1 && <Divider variant="inset" component="li" />}
              </React.Fragment>
            ))}
          </List>
        )}
      </CommonCard>
    </PageContainer>
  );
};

export default InstructorDashboard;
