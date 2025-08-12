import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Button,
  LinearProgress,
} from '@mui/material';
import {
  Book as BookIcon,
  PlayArrow as PlayIcon,
  Assignment as AssignmentIcon,
  CheckCircle as CheckIcon,
} from '@mui/icons-material';
import { useAuth } from '../../hooks/useAuth';
import { usePermissions } from '../../hooks/usePermissions';

const StudentCourses = () => {
  const { user } = useAuth();
  const { isStudent } = usePermissions();

  // Mock data for demonstration
  const enrolledCourses = [
    {
      id: 1,
      title: 'Vedic Mathematics Fundamentals',
      instructor: 'Dr. Sharma',
      progress: 75,
      totalLessons: 20,
      completedLessons: 15,
      nextLesson: 'Multiplication Techniques',
      status: 'active',
    },
    {
      id: 2,
      title: 'Advanced Calculation Methods',
      instructor: 'Prof. Patel',
      progress: 45,
      totalLessons: 15,
      completedLessons: 7,
      nextLesson: 'Square Root Methods',
      status: 'active',
    },
    {
      id: 3,
      title: 'Mental Math Mastery',
      instructor: 'Ms. Gupta',
      progress: 100,
      totalLessons: 12,
      completedLessons: 12,
      nextLesson: 'Course Completed',
      status: 'completed',
    },
  ];

  if (!isStudent) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" color="error">
          Access Denied
        </Typography>
        <Typography>
          This page is only accessible to students.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Page Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          My Courses
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Continue your learning journey with Vedic Mathematics
        </Typography>
      </Box>

      {/* Course Grid */}
      <Grid container spacing={3}>
        {enrolledCourses.map((course) => (
          <Grid item xs={12} md={6} lg={4} key={course.id}>
            <Card 
              sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                '&:hover': {
                  boxShadow: 4,
                  transform: 'translateY(-2px)',
                  transition: 'all 0.2s ease-in-out',
                }
              }}
            >
              <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                {/* Course Header */}
                <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                  <BookIcon sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" component="h3" gutterBottom>
                      {course.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Instructor: {course.instructor}
                    </Typography>
                  </Box>
                </Box>

                {/* Progress Section */}
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      Progress
                    </Typography>
                    <Typography variant="body2" fontWeight="bold">
                      {course.progress}%
                    </Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={course.progress} 
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                    {course.completedLessons} of {course.totalLessons} lessons completed
                  </Typography>
                </Box>

                {/* Status and Actions */}
                <Box sx={{ mt: 'auto' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Chip 
                      label={course.status === 'completed' ? 'Completed' : 'In Progress'}
                      color={course.status === 'completed' ? 'success' : 'primary'}
                      size="small"
                    />
                    <Typography variant="caption" color="text.secondary">
                      Next: {course.nextLesson}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      variant="contained"
                      startIcon={<PlayIcon />}
                      size="small"
                      fullWidth
                      disabled={course.status === 'completed'}
                    >
                      Continue Learning
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<AssignmentIcon />}
                      size="small"
                      fullWidth
                    >
                      Assignments
                    </Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Empty State */}
      {enrolledCourses.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <BookIcon sx={{ fontSize: 80, color: 'text.disabled', mb: 2 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No Courses Enrolled
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Start your Vedic Mathematics journey by enrolling in courses
          </Typography>
          <Button variant="contained" size="large">
            Browse Available Courses
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default StudentCourses;
