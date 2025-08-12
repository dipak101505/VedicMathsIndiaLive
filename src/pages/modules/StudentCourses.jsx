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
  Avatar,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  Paper,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Book as BookIcon,
  PlayArrow as PlayIcon,
  Assignment as AssignmentIcon,
  CheckCircle as CheckIcon,
  CalendarToday as CalendarIcon,
  Person as PersonIcon,
  AccessTime as TimeIcon,
  School as SchoolIcon,
  TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';
import { useAuth } from '../../hooks/useAuth';
import { usePermissions } from '../../hooks/usePermissions';
import { useNavigate } from 'react-router-dom';

const StudentCourses = () => {
  const { user } = useAuth();
  const { isStudent } = usePermissions();
  const navigate = useNavigate();
  const [scheduleTab, setScheduleTab] = React.useState(0);

  // Mock data for demonstration - matching the image layout
  const enrolledCourses = [
    {
      id: 1,
      title: 'Physics for Engineers',
      subject: 'Physics',
      thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=100&fit=crop',
      instructor: 'Dr. Emily Carter',
      progress: 65,
      totalLessons: 24,
      completedLessons: 16,
      nextLesson: 'Quantum Mechanics Basics',
      status: 'active',
      lastAccessed: '2 hours ago',
      difficulty: 'Intermediate',
    },
    {
      id: 2,
      title: 'Subscription 1:1 Algebra',
      subject: 'Mathematics',
      thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=150&h=100&fit=crop',
      instructor: 'Prof. Michael Chen',
      progress: 45,
      totalLessons: 18,
      completedLessons: 8,
      nextLesson: 'Linear Equations',
      status: 'active',
      lastAccessed: '1 day ago',
      difficulty: 'Beginner',
    },
    {
      id: 3,
      title: 'Advanced Mathematics',
      subject: 'Mathematics',
      thumbnail: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=150&h=100&fit=crop',
      instructor: 'Dr. Sarah Johnson',
      progress: 100,
      totalLessons: 20,
      completedLessons: 20,
      nextLesson: 'Course Completed',
      status: 'completed',
      lastAccessed: '3 days ago',
      difficulty: 'Advanced',
    },
  ];

  // Mock upcoming schedule data
  const upcomingSessions = [
    {
      id: 1,
      courseTitle: 'Physics for Engineers',
      instructor: 'DR. EMILY CARTER',
      date: 'Aug 12 (Tuesday)',
      time: '8:16 pm - 9:16 pm',
      type: 'Live Session',
      status: 'upcoming',
    },
    {
      id: 2,
      courseTitle: 'Physics for Engineers',
      instructor: 'DR. EMILY CARTER',
      date: 'Aug 13 (Wednesday)',
      time: '8:16 pm - 9:16 pm',
      type: 'Live Session',
      status: 'upcoming',
    },
    {
      id: 3,
      courseTitle: 'Physics for Engineers',
      instructor: 'DR. EMILY CARTER',
      date: 'Aug 14 (Thursday)',
      time: '8:16 pm - 9:16 pm',
      type: 'Live Session',
      status: 'upcoming',
    },
    {
      id: 4,
      courseTitle: 'Physics for Engineers',
      instructor: 'DR. EMILY CARTER',
      date: 'Aug 15 (Friday)',
      time: '8:16 pm - 9:16 pm',
      type: 'Live Session',
      status: 'upcoming',
    },
  ];

  const handleScheduleTabChange = (event, newValue) => {
    setScheduleTab(newValue);
  };

  const handleContinueLearning = (courseId) => {
    navigate(`/course/${courseId}`);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner': return 'success';
      case 'intermediate': return 'warning';
      case 'advanced': return 'error';
      default: return 'default';
    }
  };

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
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      {/* Enhanced Page Header */}
      <Box sx={{ 
        mb: 5, 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: 3,
        p: 4,
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          opacity: 0.3,
        }
      }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700, mb: 1 }}>
          My Learning Dashboard
        </Typography>
        <Typography variant="h6" sx={{ opacity: 0.9, fontWeight: 400 }}>
          Continue your journey with Vedic Mathematics and beyond
        </Typography>
        
        {/* Quick Stats */}
        <Box sx={{ 
          display: 'flex', 
          gap: 3, 
          mt: 3,
          flexWrap: 'wrap'
        }}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
              {enrolledCourses.length}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              Active Courses
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
              {enrolledCourses.filter(c => c.status === 'completed').length}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              Completed
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
              {upcomingSessions.length}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              Upcoming Sessions
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Two Column Layout */}
      <Grid container spacing={4}>
        {/* Left Column - Course Listings */}
        <Grid item xs={12} lg={8}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h5" component="h2" gutterBottom sx={{ 
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}>
              <SchoolIcon sx={{ color: 'primary.main' }} />
              Enrolled Courses
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Track your progress and continue learning
            </Typography>
          </Box>
          
          <Grid container spacing={3}>
            {enrolledCourses.map((course) => (
              <Grid item xs={12} md={6} key={course.id}>
                <Card 
                  sx={{ 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 3,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                    border: '1px solid rgba(0,0,0,0.06)',
                    '&:hover': {
                      boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
                      transform: 'translateY(-4px)',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    },
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                >
                  <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 2.5 }}>
                    {/* Course Header with Thumbnail */}
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2.5, position: 'relative' }}>
                      {/* Difficulty Badge - Top Right Corner */}
                      <Chip
                        label={course.difficulty}
                        size="small"
                        color={getDifficultyColor(course.difficulty)}
                        sx={{
                          position: 'absolute',
                          top: -10,
                          right: -10,
                          fontSize: '0.7rem',
                          fontWeight: 600,
                          zIndex: 1,
                        }}
                      />
                      
                      <Box sx={{ mr: 2, flexShrink: 0 }}>
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          style={{
                            width: 70,
                            height: 50,
                            borderRadius: 10,
                            objectFit: 'cover',
                          }}
                        />
                      </Box>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 600, lineHeight: 1.3, mb: 1 }}>
                          {course.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5, fontWeight: 500 }}>
                          {course.subject}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: 0.5 
                        }}>
                          <PersonIcon sx={{ fontSize: 14 }} />
                          {course.instructor}
                        </Typography>
                      </Box>

                    </Box>

                    {/* Progress Section */}
                    <Box sx={{ mb: 2.5 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                          Progress
                        </Typography>
                        <Typography variant="body2" fontWeight="bold" sx={{ color: 'primary.main' }}>
                          {course.progress}%
                        </Typography>
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={course.progress} 
                        sx={{ 
                          height: 8, 
                          borderRadius: 4,
                          backgroundColor: 'rgba(0,0,0,0.08)',
                          '& .MuiLinearProgress-bar': {
                            borderRadius: 4,
                            background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
                          }
                        }}
                      />
                      <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                        {course.completedLessons} of {course.totalLessons} lessons completed
                      </Typography>
                    </Box>

                    {/* Last Accessed */}
                    <Box sx={{ mb: 2.5 }}>
                      <Typography variant="caption" color="text.secondary" sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 0.5 
                      }}>
                        <TimeIcon sx={{ fontSize: 12 }} />
                        Last accessed: {course.lastAccessed}
                      </Typography>
                    </Box>

                    {/* Status and Actions */}
                    <Box sx={{ mt: 'auto' }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                        <Chip 
                          label={course.status === 'completed' ? 'Completed' : 'In Progress'}
                          color={course.status === 'completed' ? 'success' : 'primary'}
                          size="small"
                          sx={{ fontWeight: 600 }}
                        />
                        <Typography variant="caption" color="text.secondary" sx={{ 
                          textAlign: 'right',
                          maxWidth: '60%'
                        }}>
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
                          onClick={() => handleContinueLearning(course.id)}
                          sx={{ 
                            borderRadius: 2,
                            textTransform: 'none',
                            fontWeight: 600,
                            py: 0.75,
                          }}
                        >
                          {course.status === 'completed' ? 'Review Course' : 'Continue Learning'}
                        </Button>
                        <Button
                          variant="outlined"
                          startIcon={<AssignmentIcon />}
                          size="small"
                          fullWidth
                          sx={{ 
                            borderRadius: 2,
                            textTransform: 'none',
                            fontWeight: 600,
                            py: 0.75,
                          }}
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
            <Paper sx={{ 
              textAlign: 'center', 
              py: 8, 
              px: 4,
              borderRadius: 3,
              background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
            }}>
              <BookIcon sx={{ fontSize: 80, color: 'text.disabled', mb: 2 }} />
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No Courses Enrolled
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Start your Vedic Mathematics journey by enrolling in courses
              </Typography>
              <Button variant="contained" size="large" sx={{ borderRadius: 2, px: 4 }}>
                Browse Available Courses
              </Button>
            </Paper>
          )}
        </Grid>

        {/* Right Column - Upcoming Schedule */}
        <Grid item xs={12} lg={4}>
          <Card sx={{ 
            height: 'fit-content',
            borderRadius: 3,
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            border: '1px solid rgba(0,0,0,0.06)',
          }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1, 
                mb: 3 
              }}>
                <CalendarIcon sx={{ color: 'primary.main' }} />
                <Typography variant="h6" component="h2" sx={{ fontWeight: 600 }}>
                  Upcoming Schedule
                </Typography>
              </Box>
              
              {/* Schedule Tabs */}
              <Box sx={{ 
                borderBottom: 1, 
                borderColor: 'divider', 
                mb: 3,
                '& .MuiTab-root': {
                  minHeight: 40,
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  textTransform: 'none',
                }
              }}>
                <Tabs 
                  value={scheduleTab} 
                  onChange={handleScheduleTabChange}
                  sx={{ minHeight: 40 }}
                >
                  <Tab 
                    label={`Upcoming (${upcomingSessions.length})`} 
                  />
                  <Tab 
                    label="Past" 
                  />
                </Tabs>
              </Box>

              {/* Schedule List */}
              <List sx={{ p: 0 }}>
                {upcomingSessions.map((session, index) => (
                  <React.Fragment key={session.id}>
                    <ListItem sx={{ 
                      px: 0, 
                      py: 2,
                      borderRadius: 2,
                      '&:hover': {
                        backgroundColor: 'rgba(0,0,0,0.02)',
                        transition: 'background-color 0.2s ease',
                      }
                    }}>
                      <ListItemAvatar>
                        <Avatar sx={{ 
                          bgcolor: 'primary.main', 
                          width: 40, 
                          height: 40,
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        }}>
                          <CalendarIcon sx={{ fontSize: 18 }} />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Box>
                            <Typography variant="body2" fontWeight="600" gutterBottom sx={{ lineHeight: 1.3 }}>
                              {session.courseTitle}
                            </Typography>
                            <Typography variant="caption" color="text.secondary" display="block" sx={{ 
                              fontWeight: 500,
                              textTransform: 'uppercase',
                              letterSpacing: '0.5px',
                            }}>
                              {session.instructor}
                            </Typography>
                          </Box>
                        }
                        secondary={
                          <Box sx={{ mt: 1.5 }}>
                            <Typography variant="caption" color="text.secondary" display="block" sx={{ 
                              fontWeight: 500,
                              mb: 0.5,
                            }}>
                              {session.date}
                            </Typography>
                            <Box sx={{ 
                              display: 'flex', 
                              alignItems: 'center', 
                              gap: 0.5,
                              backgroundColor: 'rgba(0,0,0,0.04)',
                              px: 1.5,
                              py: 0.5,
                              borderRadius: 1,
                              display: 'inline-flex',
                            }}>
                              <TimeIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                              <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
                                {session.time}
                              </Typography>
                            </Box>
                          </Box>
                        }
                      />
                    </ListItem>
                    {index < upcomingSessions.length - 1 && (
                      <Divider variant="inset" component="li" sx={{ mx: 3 }} />
                    )}
                  </React.Fragment>
                ))}
              </List>

              {/* View All Button */}
              <Box sx={{ mt: 3, textAlign: 'center' }}>
                <Button 
                  variant="outlined" 
                  size="medium" 
                  fullWidth
                  sx={{ 
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 600,
                    py: 1.5,
                  }}
                >
                  View All Sessions
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default StudentCourses;
