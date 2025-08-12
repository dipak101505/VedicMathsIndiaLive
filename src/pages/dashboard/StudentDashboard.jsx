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
  Card,
  CardContent,
} from '@mui/material';
import {
  School as SchoolIcon,
  Assignment as AssignmentIcon,
  TrendingUp as TrendingUpIcon,
  Schedule as ScheduleIcon,
  PlayArrow as PlayIcon,
  Book as BookIcon,
  CheckCircle as CheckIcon,
  Warning as WarningIcon,
} from '@mui/icons-material';
import { useAuth } from '../../hooks/useAuth';
import { usePermissions } from '../../hooks/usePermissions';
import { useStore } from '../../hooks/useStore';
import { PageContainer, SectionHeader, StatsCard, DashboardGrid } from '../../styles/components';
import { Loading, Card as CommonCard, Badge } from '../../components/common';

const StudentDashboard = () => {
  const { user } = useAuth();
  const { isStudent } = usePermissions();
  const { courses } = useStore();
  const [studentStats, setStudentStats] = useState({
    enrolledCourses: 0,
    completedCourses: 0,
    totalAssignments: 0,
    averageGrade: 0,
  });
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [upcomingAssignments, setUpcomingAssignments] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);

  // Debug logging
  useEffect(() => {
    console.log('🎓 StudentDashboard: Component mounted');
    console.log('🎓 StudentDashboard: User:', user ? { uid: user.uid, email: user.email, role: user.role } : null);
    console.log('🎓 StudentDashboard: isStudent:', isStudent);
    
    return () => {
      console.log('🎓 StudentDashboard: Component unmounting');
    };
  }, [user, isStudent]);

  useEffect(() => {
    if (isStudent) {
      fetchStudentData();
    }
  }, [isStudent]);

  const fetchStudentData = async () => {
    // TODO: Implement API calls to fetch student-specific data
    // For now, using mock data
    setStudentStats({
      enrolledCourses: 4,
      completedCourses: 1,
      totalAssignments: 12,
      averageGrade: 85,
    });

    setEnrolledCourses([
      {
        id: 1,
        title: 'Advanced Mathematics',
        instructor: 'Dr. Smith',
        progress: 75,
        nextLesson: 'Chapter 8: Calculus',
        dueDate: new Date(Date.now() + 86400000), // 1 day from now
        status: 'active',
      },
      {
        id: 2,
        title: 'Basic Algebra',
        instructor: 'Prof. Johnson',
        progress: 90,
        nextLesson: 'Final Exam',
        dueDate: new Date(Date.now() + 604800000), // 1 week from now
        status: 'active',
      },
      {
        id: 3,
        title: 'Geometry Fundamentals',
        instructor: 'Dr. Williams',
        progress: 100,
        nextLesson: 'Course Completed',
        dueDate: null,
        status: 'completed',
      },
    ]);

    setUpcomingAssignments([
      {
        id: 1,
        course: 'Advanced Mathematics',
        title: 'Chapter 7 Quiz',
        dueDate: new Date(Date.now() + 172800000), // 2 days from now
        type: 'quiz',
        status: 'pending',
      },
      {
        id: 2,
        course: 'Basic Algebra',
        title: 'Final Project',
        dueDate: new Date(Date.now() + 604800000), // 1 week from now
        type: 'project',
        status: 'in_progress',
      },
    ]);

    setRecentActivity([
      {
        id: 1,
        type: 'lesson_completed',
        message: 'Completed Chapter 6: Trigonometry',
        course: 'Advanced Mathematics',
        timestamp: new Date(Date.now() - 3600000),
      },
      {
        id: 2,
        type: 'assignment_submitted',
        message: 'Submitted Chapter 5 Quiz',
        course: 'Basic Algebra',
        timestamp: new Date(Date.now() - 7200000),
      },
      {
        id: 3,
        type: 'grade_received',
        message: 'Received A- on Geometry Final',
        course: 'Geometry Fundamentals',
        timestamp: new Date(Date.now() - 86400000),
      },
    ]);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'primary';
      case 'completed':
        return 'success';
      case 'pending':
        return 'warning';
      default:
        return 'default';
    }
  };

  const getAssignmentIcon = (type) => {
    switch (type) {
      case 'quiz':
        return <AssignmentIcon />;
      case 'project':
        return <BookIcon />;
      case 'exam':
        return <WarningIcon />;
      default:
        return <AssignmentIcon />;
    }
  };

  if (!isStudent) {
    return (
      <PageContainer>
        <Typography variant="h4" color="error">
          Access Denied: Student privileges required
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
            Welcome back, {user?.displayName || 'Student'}!
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Track your progress and continue learning
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            startIcon={<BookIcon />}
            onClick={() => {/* TODO: Navigate to course catalog */}}
          >
            Browse Courses
          </Button>
          <Button
            variant="outlined"
            startIcon={<ScheduleIcon />}
            onClick={() => {/* TODO: Navigate to schedule */}}
          >
            View Schedule
          </Button>
        </Box>
      </SectionHeader>

      {/* Statistics Cards */}
      <DashboardGrid>
        <StatsCard color="primary">
          <Typography variant="h3" component="div" gutterBottom>
            {studentStats.enrolledCourses}
          </Typography>
          <Typography variant="h6" component="div">
            Enrolled Courses
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Currently active
          </Typography>
        </StatsCard>

        <StatsCard color="success">
          <Typography variant="h3" component="div" gutterBottom>
            {studentStats.completedCourses}
          </Typography>
          <Typography variant="h6" component="div">
            Completed Courses
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Certificates earned
          </Typography>
        </StatsCard>

        <StatsCard color="secondary">
          <Typography variant="h3" component="div" gutterBottom>
            {studentStats.totalAssignments}
          </Typography>
          <Typography variant="h6" component="div">
            Total Assignments
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            This semester
          </Typography>
        </StatsCard>

        <StatsCard color="warning">
          <Typography variant="h3" component="div" gutterBottom>
            {studentStats.averageGrade}%
          </Typography>
          <Typography variant="h6" component="div">
            Average Grade
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Across all courses
          </Typography>
        </StatsCard>
      </DashboardGrid>

      {/* Enrolled Courses */}
      <CommonCard
        title="My Courses"
        subtitle="Your enrolled courses and progress"
        sx={{ mb: 4 }}
      >
        <Grid container spacing={3}>
          {enrolledCourses.map((course) => (
            <Grid item xs={12} md={6} lg={4} key={course.id}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                      <SchoolIcon />
                    </Avatar>
                    <Box>
                      <Typography variant="h6" component="h3">
                        {course.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {course.instructor}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">Progress</Typography>
                      <Typography variant="body2" fontWeight="bold">
                        {course.progress}%
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={course.progress}
                      sx={{ height: 8, borderRadius: 4 }}
                    />
                  </Box>

                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Next Lesson:
                    </Typography>
                    <Typography variant="body1" fontWeight="medium">
                      {course.nextLesson}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Chip
                      label={course.status}
                      color={getStatusColor(course.status)}
                      size="small"
                    />
                    <Button
                      size="small"
                      variant="contained"
                      startIcon={<PlayIcon />}
                      onClick={() => {/* TODO: Navigate to course */}}
                    >
                      Continue
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </CommonCard>

      {/* Upcoming Assignments */}
      <CommonCard
        title="Upcoming Assignments"
        subtitle="Deadlines and tasks to complete"
        sx={{ mb: 4 }}
      >
        {upcomingAssignments.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="body1" color="text.secondary">
              No upcoming assignments
            </Typography>
          </Box>
        ) : (
          <List>
            {upcomingAssignments.map((assignment, index) => (
              <React.Fragment key={assignment.id}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: 'warning.main' }}>
                      {getAssignmentIcon(assignment.type)}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="body1">
                          {assignment.title}
                        </Typography>
                        <Badge
                          variant="outlined"
                          color={assignment.status === 'pending' ? 'warning' : 'info'}
                          size="small"
                        >
                          {assignment.status.replace('_', ' ')}
                        </Badge>
                      </Box>
                    }
                    secondary={
                      <Box sx={{ mt: 0.5 }}>
                        <Typography variant="body2" color="text.secondary">
                          Course: {assignment.course}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Due: {assignment.dueDate.toLocaleDateString()}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {assignment.dueDate.toLocaleTimeString()}
                        </Typography>
                      </Box>
                    }
                  />
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      size="small"
                      variant="contained"
                      onClick={() => {/* TODO: Navigate to assignment */}}
                    >
                      {assignment.status === 'pending' ? 'Start' : 'Continue'}
                    </Button>
                  </Box>
                </ListItem>
                {index < upcomingAssignments.length - 1 && <Divider variant="inset" component="li" />}
              </React.Fragment>
            ))}
          </List>
        )}
      </CommonCard>

      {/* Recent Activity */}
      <CommonCard
        title="Recent Activity"
        subtitle="Your latest learning activities"
      >
        <List>
          {recentActivity.map((activity, index) => (
            <React.Fragment key={activity.id}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'success.main' }}>
                    <CheckIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant="body1">
                      {activity.message}
                    </Typography>
                  }
                  secondary={
                    <Box sx={{ mt: 0.5 }}>
                      <Typography variant="body2" color="text.secondary">
                        Course: {activity.course}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {activity.timestamp.toLocaleString()}
                      </Typography>
                    </Box>
                  }
                />
              </ListItem>
              {index < recentActivity.length - 1 && <Divider variant="inset" component="li" />}
            </React.Fragment>
          ))}
        </List>
      </CommonCard>
    </PageContainer>
  );
};

export default StudentDashboard;
