import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Paper,
  Avatar,
  Chip,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Grid,
  Button
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  CheckCircle as CheckCircleIcon
} from '@mui/icons-material';
import SessionDetailModal from '../../../components/common/SessionDetailModal';
import CreditsHistoryModal from '../../../components/student/CreditsHistoryModal';
import TimelineView from '../../../components/student/TimelineView';
import ContentView from '../../../components/student/ContentView';

const InstructorCourseDetailPage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedSession, setSelectedSession] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [creditsHistoryOpen, setCreditsHistoryOpen] = useState(false);

  // Mock course data - this should match the data from InstructorCourses
  const courseData = {
    1: {
      id: 1,
      title: 'Subscription 1:1 Algebra',
      category: 'Mathematics',
      instructor: 'James Anderson',
      admin: 'Michael Thompson'
    },
    2: {
      id: 2,
      title: 'Advanced Mathematics',
      category: 'Mathematics',
      instructor: 'Dr. Emily Carter',
      admin: 'Michael Thompson'
    },
    3: {
      id: 3,
      title: 'Physics for Engineers',
      category: 'Physics',
      instructor: 'Dr. Sarah Wilson',
      admin: 'Michael Thompson'
    }
  };

  const course = courseData[courseId] || {
    id: courseId,
    title: 'Course Not Found',
    category: 'Unknown',
    instructor: 'Unknown',
    admin: 'Unknown'
  };

  // Mock session data - this should match the specific course
  const getCourseSessions = (courseId) => {
    const sessionsData = {
      1: [ // Algebra course
        {
          id: 1,
          date: 'Aug 12',
          day: 'Tue',
          time: '11:20 am',
          duration: '100m',
          participants: 1,
          title: 'Linear Equations & Inequalities',
          instructor: 'James Anderson',
          status: 'completed'
        },
        {
          id: 2,
          date: 'Aug 13',
          day: 'Wed',
          time: '11:20 am',
          duration: '60m',
          participants: 1,
          title: 'Quadratic Functions',
          instructor: 'James Anderson',
          status: 'completed'
        },
        {
          id: 3,
          date: 'Aug 14',
          day: 'Thu',
          time: '11:20 am',
          duration: '80m',
          participants: 1,
          title: 'Polynomial Operations',
          instructor: 'James Anderson',
          status: 'completed'
        }
      ],
      2: [ // Advanced Mathematics course
        {
          id: 1,
          date: 'Aug 12',
          day: 'Tue',
          time: '11:20 am',
          duration: '100m',
          participants: 1,
          title: 'Calculus Fundamentals',
          instructor: 'Dr. Emily Carter',
          status: 'completed'
        },
        {
          id: 2,
          date: 'Aug 13',
          day: 'Wed',
          time: '11:20 am',
          duration: '60m',
          participants: 1,
          title: 'Integration Techniques',
          instructor: 'Dr. Emily Carter',
          status: 'completed'
        },
        {
          id: 3,
          date: 'Aug 14',
          day: 'Thu',
          time: '11:20 am',
          duration: '80m',
          participants: 1,
          title: 'Differential Equations',
          instructor: 'Dr. Emily Carter',
          status: 'completed'
        }
      ],
      3: [ // Physics course
        {
          id: 1,
          date: 'Aug 12',
          day: 'Tue',
          time: '11:20 am',
          duration: '100m',
          participants: 1,
          title: 'Work & Energy Case Studies',
          instructor: 'Dr. Sarah Wilson',
          status: 'completed'
        },
        {
          id: 2,
          date: 'Aug 13',
          day: 'Wed',
          time: '11:20 am',
          duration: '60m',
          participants: 1,
          title: 'Impulse & Collisions',
          instructor: 'Dr. Sarah Wilson',
          status: 'completed'
        },
        {
          id: 3,
          date: 'Aug 14',
          day: 'Thu',
          time: '11:20 am',
          duration: '80m',
          participants: 1,
          title: 'Equilibrium & Stability',
          instructor: 'Dr. Sarah Wilson',
          status: 'completed'
        }
      ]
    };
    
    return sessionsData[courseId] || [];
  };

  const pastSessions = getCourseSessions(courseId);

  // Mock credits data - this should match the specific course
  const getCourseCredits = (courseId) => {
    const creditsData = {
      1: { // Algebra course
        remaining: 6,
        consumed: 4,
        total: 10,
        history: [
          {
            id: 1,
            action: 'Credits added by James Anderson',
            description: 'Assigned 10 credits based on payment',
            date: '15 Aug 25 • 11:20 AM',
            change: '+10'
          },
          {
            id: 2,
            action: 'Session by James Anderson',
            description: '',
            date: '14 Aug 25 • 11:20 AM',
            change: '-1'
          }
        ]
      },
      2: { // Advanced Mathematics course
        remaining: 8,
        consumed: 2,
        total: 10,
        history: [
          {
            id: 1,
            action: 'Credits added by Dr. Emily Carter',
            description: 'Assigned 10 credits based on payment',
            date: '15 Aug 25 • 11:20 AM',
            change: '+10'
          },
          {
            id: 2,
            action: 'Session by Dr. Emily Carter',
            description: '',
            date: '14 Aug 25 • 11:20 AM',
            change: '-1'
          }
        ]
      },
      3: { // Physics course
        remaining: 4,
        consumed: 6,
        total: 10,
        history: [
          {
            id: 1,
            action: 'Credits added by Dr. Sarah Wilson',
            description: 'Assigned 10 credits based on payment',
            date: '15 Aug 25 • 11:20 AM',
            change: '+10'
          },
          {
            id: 2,
            action: 'Session by Dr. Sarah Wilson',
            description: '',
            date: '14 Aug 25 • 11:20 AM',
            change: '-1'
          }
        ]
      }
    };
    
    return creditsData[courseId] || {
      remaining: 0,
      consumed: 0,
      total: 0,
      history: []
    };
  };

  const credits = getCourseCredits(courseId);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleBackClick = () => {
    navigate('/teacher/courses');
  };

  const handleSessionClick = (session) => {
    setSelectedSession(session);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedSession(null);
  };

  const handleOpenCreditsHistory = () => {
    setCreditsHistoryOpen(true);
  };

  const handleCloseCreditsHistory = () => {
    setCreditsHistoryOpen(false);
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <IconButton onClick={handleBackClick} sx={{ mr: 2 }}>
            <ArrowBackIcon />
          </IconButton>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
              {course.title}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {course.category}
            </Typography>
          </Box>
        </Box>

        {/* Tabs */}
        <Tabs value={selectedTab} onChange={handleTabChange}>
          <Tab 
            label="Home" 
            sx={{ 
              fontWeight: 'bold',
              '&.Mui-selected': {
                color: 'primary.main'
              }
            }}
          />
          <Tab 
            label="Timeline" 
            sx={{ 
              fontWeight: 'bold',
              '&.Mui-selected': {
                color: 'primary.main'
              }
            }}
          />
          <Tab 
            label="Content" 
            sx={{ 
              fontWeight: 'bold',
              '&.Mui-selected': {
                color: 'primary.main'
              }
            }}
          />
        </Tabs>
      </Box>

      {/* Main Content */}
      <Box sx={{ display: 'flex', flex: 1, p: 3, gap: 3 }}>
        {/* Left Panel - Course Content */}
        <Box sx={{ flex: 1 }}>
          {selectedTab === 0 && (
            <Box>
              {/* No Upcoming Session */}
              <Paper sx={{ p: 3, mb: 3, textAlign: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'text.primary', mb: 1 }}>
                  No Upcoming Session
                </Typography>
              </Paper>

              {/* Past Sessions */}
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'text.primary', mb: 2 }}>
                August 2025
              </Typography>

              <List sx={{ width: '100%' }}>
                {pastSessions.map((session, index) => (
                  <React.Fragment key={session.id}>
                    <ListItem 
                      sx={{ 
                        px: 0, 
                        py: 2,
                        cursor: 'pointer',
                        '&:hover': {
                          backgroundColor: 'action.hover',
                          borderRadius: 1
                        }
                      }}
                      onClick={() => handleSessionClick(session)}
                    >
                      <ListItemAvatar>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                          <Typography variant="caption" color="text.secondary">
                            {session.date.split(' ')[0]}
                          </Typography>
                          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                            {session.date.split(' ')[1]}
                          </Typography>
                        </Box>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                              {session.title}
                            </Typography>
                          </Box>
                        }
                        secondary={
                          <Box>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                              HOSTED BY {session.instructor}
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 2, mb: 1 }}>
                              <Typography variant="body2" color="text.secondary">
                                {session.day}, {session.time}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {session.duration}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {session.participants}
                              </Typography>
                            </Box>
                            <Chip 
                              icon={<CheckCircleIcon />}
                              label="Completed" 
                              color="success" 
                              size="small"
                            />
                          </Box>
                        }
                      />
                    </ListItem>
                    {index < pastSessions.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>

              <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mt: 2 }}>
                There are no upcoming sessions
              </Typography>
            </Box>
          )}

          {selectedTab === 1 && (
            <TimelineView pastSessions={pastSessions} />
          )}

          {selectedTab === 2 && (
            <ContentView />
          )}
        </Box>

        {/* Right Panel - Supplementary Information */}
        <Box sx={{ width: 350 }}>
          {/* Session Credits */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Session Credits
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  cursor: 'pointer', 
                  textDecoration: 'underline',
                  color: 'black'
                }}
                onClick={handleOpenCreditsHistory}
              >
                View History
              </Typography>
            </Box>

            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={4}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                    {credits.remaining}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Remaining
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'text.secondary' }}>
                    {credits.consumed}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Consumed
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                    {credits.total}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total
                  </Typography>
                </Box>
              </Grid>
            </Grid>

            <Divider sx={{ my: 2 }} />

            {credits.history.map((item) => (
              <Box key={item.id} sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ fontWeight: 'medium', mb: 0.5 }}>
                  {item.action}
                </Typography>
                {item.description && (
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                    {item.description}
                  </Typography>
                )}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="caption" color="text.secondary">
                    {item.date}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      fontWeight: 'bold',
                      color: item.change.startsWith('+') ? 'success.main' : 'error.main'
                    }}
                  >
                    {item.change}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Paper>

          {/* Instructor */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Instructor
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar sx={{ bgcolor: 'primary.main', width: 40, height: 40 }}>
                J
              </Avatar>
              <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                {course.instructor}
              </Typography>
            </Box>
          </Paper>

          {/* Admin */}
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Admin
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar sx={{ bgcolor: 'secondary.main', width: 40, height: 40 }}>
                M
              </Avatar>
              <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                {course.admin}
              </Typography>
            </Box>
          </Paper>
        </Box>
      </Box>

      {/* Session Detail Modal */}
      <SessionDetailModal
        open={modalOpen}
        onClose={handleCloseModal}
        session={selectedSession}
        course={course}
      />

      {/* Credits History Modal */}
      <CreditsHistoryModal
        open={creditsHistoryOpen}
        onClose={handleCloseCreditsHistory}
        credits={credits}
      />
    </Box>
  );
};

export default InstructorCourseDetailPage;
