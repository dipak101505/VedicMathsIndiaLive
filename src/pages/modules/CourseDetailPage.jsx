import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Avatar,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  TextField,
  Chip,
  IconButton,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Videocam as VideoCameraIcon,
  CalendarToday as CalendarIcon,
  AccessTime as TimeIcon,
  Person as PersonIcon,
  Send as SendIcon,
  PlayArrow as PlayIcon,
} from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import SessionsTab from '../../components/course/SessionsTab';
import ContentTab from '../../components/course/ContentTab';
import LeaderboardTab from '../../components/course/LeaderboardTab';

const CourseDetailPage = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState(0);
  const [shareText, setShareText] = useState('');
  
  // Get userData from the logged-in user
  const userData = {
    userName: user?.firstName || user?.email?.split('@')[0]
  };

  // Mock course data
  const course = {
    id: courseId || '1',
    title: 'Physics for Engineers',
    subject: 'Physics',
    instructor: 'Dr. Emily Carter',
    sessions: [
      {
        id: 1,
        title: 'Review of Newton\'s Laws',
        instructor: 'Dr. Emily Carter',
        type: 'Session',
        date: '07 Aug 25',
        time: '08:16 PM',
        duration: '56 minutes',
        attendees: 2,
        status: 'completed',
        hasRecording: true,
      },
      {
        id: 2,
        title: 'Forces & Motion Discussion',
        instructor: 'Dr. Emily Carter',
        type: 'Session',
        date: '08 Aug 25',
        time: '08:16 PM',
        duration: '80 minutes',
        attendees: 2,
        status: 'completed',
        hasRecording: true,
      },
      {
        id: 3,
        title: 'Quick Recap: Energy Principles',
        instructor: 'Dr. Emily Carter',
        type: 'Session',
        date: '09 Aug 25',
        time: '08:16 PM',
        duration: '45 minutes',
        attendees: 2,
        status: 'completed',
        hasRecording: true,
      },
    ],
    upcomingSessions: [
      {
        id: 1,
        title: 'Momentum & Impulse Deep Dive',
        instructor: 'DR. EMILY CARTER',
        date: 'Aug 13',
        time: 'Wed, 8:16 pm - 9:16 pm',
        type: 'Live Session',
      },
      {
        id: 2,
        title: 'Projectile Motion Analysis',
        instructor: 'DR. EMILY CARTER',
        date: 'Aug 14',
        time: 'Thu, 8:16 pm - 9:16 pm',
        type: 'Live Session',
      },
    ],
    instructors: [
      {
        id: 1,
        name: 'James Anderson',
        avatar: 'J',
        role: 'Lead Instructor',
      },
      {
        id: 2,
        name: 'Sophia Rodriguez',
        avatar: 'S',
        role: 'Assistant Instructor',
      },
    ],
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleShare = () => {
    if (shareText.trim()) {
      console.log('Sharing:', shareText);
      setShareText('');
    }
  };

  const handleBack = () => {
    navigate('/my-courses');
  };

  const handleViewRecording = (sessionId) => {
    console.log('Viewing recording for session:', sessionId);
    // Navigate to video player or recording viewer
  };

  // Render tab content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 0: // Timeline
        return (
          <Grid container spacing={4}>
            {/* Left Column - Course Timeline/Content */}
            <Grid item xs={12} lg={8}>
              {/* Hello Section */}
              <Card sx={{ mb: 3, borderRadius: 3 }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <Avatar sx={{ bgcolor: 'primary.main', width: 48, height: 48 }}>
                      {user?.displayName?.charAt(0) || 'O'}
                    </Avatar>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Hello {userData.userName}!
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <TextField
                      fullWidth
                      placeholder="Share something..."
                      value={shareText}
                      onChange={(e) => setShareText(e.target.value)}
                      variant="outlined"
                      size="small"
                      sx={{ 
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                        }
                      }}
                    />
                    <IconButton 
                      onClick={handleShare}
                      disabled={!shareText.trim()}
                      sx={{ 
                        bgcolor: 'primary.main', 
                        color: 'white',
                        '&:hover': { bgcolor: 'primary.dark' },
                        '&:disabled': { bgcolor: 'grey.300' }
                      }}
                    >
                      <SendIcon />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>

              {/* Course Sessions */}
              <Box>
                <Typography variant="h6" component="h2" gutterBottom sx={{ mb: 3, fontWeight: 600 }}>
                  Recent Sessions
                </Typography>
                
                {course.sessions.map((session, index) => (
                  <Card key={session.id} sx={{ mb: 2, borderRadius: 3, border: '1px solid #e0e0e0' }}>
                    <CardContent sx={{ p: 3 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <Box sx={{ flexGrow: 1 }}>
                          <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
                            {session.title}
                          </Typography>
                          
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                            <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32, fontSize: '0.875rem' }}>
                              {session.instructor.charAt(0)}
                            </Avatar>
                            <Typography variant="body2" color="text.secondary">
                              {session.instructor}
                            </Typography>
                          </Box>

                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, flexWrap: 'wrap' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <VideoCameraIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                              <Typography variant="caption" color="text.secondary">
                                {session.type}
                              </Typography>
                            </Box>
                            <Typography variant="caption" color="text.secondary">
                              {session.date}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {session.time}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {session.duration}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {session.attendees} Present
                            </Typography>
                          </Box>
                        </Box>

                        {session.hasRecording && (
                          <Button
                            variant="outlined"
                            size="small"
                            onClick={() => handleViewRecording(session.id)}
                            sx={{ 
                              borderRadius: 2,
                              textTransform: 'none',
                              fontWeight: 600,
                              minWidth: 120,
                            }}
                          >
                            View Recording
                          </Button>
                        )}
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </Grid>

            {/* Right Column - Upcoming Sessions & Instructors */}
            <Grid item xs={12} lg={4}>
              {/* Upcoming Sessions */}
              <Card sx={{ mb: 3, borderRadius: 3 }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 1, 
                    mb: 3 
                  }}>
                    <CalendarIcon sx={{ color: 'primary.main' }} />
                    <Typography variant="h6" component="h2" sx={{ fontWeight: 600 }}>
                      Upcoming Sessions
                    </Typography>
                  </Box>
                  
                  {/* Session Tabs */}
                  <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
                    <Tabs 
                      value={0} 
                      sx={{
                        minHeight: 40,
                        '& .MuiTab-root': {
                          minHeight: 40,
                          fontSize: '0.875rem',
                          fontWeight: 600,
                          textTransform: 'none',
                        }
                      }}
                    >
                      <Tab label={`Upcoming (${course.upcomingSessions.length})`} />
                      <Tab label="Past" />
                    </Tabs>
                  </Box>

                  {/* Sessions List */}
                  <List sx={{ p: 0 }}>
                    {course.upcomingSessions.map((session, index) => (
                      <React.Fragment key={session.id}>
                        <ListItem sx={{ 
                          px: 0, 
                          py: 1.5,
                          borderRadius: 2,
                          '&:hover': {
                            backgroundColor: 'rgba(0,0,0,0.02)',
                            transition: 'background-color 0.2s ease',
                          }
                        }}>
                          <ListItemAvatar>
                            <Avatar sx={{ 
                              bgcolor: 'primary.main', 
                              width: 32, 
                              height: 32,
                              fontSize: '0.75rem',
                            }}>
                              {session.date.split(' ')[1]}
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={
                              <Typography variant="body2" fontWeight="600" gutterBottom>
                                {session.courseTitle}
                              </Typography>
                            }
                            secondary={
                              <Box>
                                <Typography variant="caption" color="text.secondary" display="block" sx={{ 
                                  fontWeight: 500,
                                  textTransform: 'uppercase',
                                  letterSpacing: '0.5px',
                                  mb: 0.5,
                                }}>
                                  {session.instructor}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  {session.time}
                                </Typography>
                              </Box>
                            }
                          />
                        </ListItem>
                        {index < course.upcomingSessions.length - 1 && (
                          <Divider variant="inset" component="li" sx={{ mx: 3 }} />
                        )}
                      </React.Fragment>
                    ))}
                  </List>

                  {/* See All Button */}
                  <Box sx={{ mt: 2, textAlign: 'center' }}>
                    <Button 
                      variant="outlined" 
                      size="small" 
                      fullWidth
                      startIcon={<CalendarIcon />}
                      sx={{ 
                        borderRadius: 2,
                        textTransform: 'none',
                        fontWeight: 600,
                      }}
                    >
                      See all
                    </Button>
                  </Box>
                </CardContent>
              </Card>

              {/* Instructors Section */}
              <Card sx={{ borderRadius: 3 }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
                    Instructors
                  </Typography>
                  
                  <List sx={{ p: 0 }}>
                    {course.instructors.map((instructor, index) => (
                      <React.Fragment key={instructor.id}>
                        <ListItem sx={{ px: 0, py: 1.5 }}>
                          <ListItemAvatar>
                            <Avatar sx={{ 
                              bgcolor: 'primary.main', 
                              width: 40, 
                              height: 40,
                              fontSize: '1rem',
                              fontWeight: 600,
                            }}>
                              {instructor.avatar}
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={
                              <Typography variant="body2" fontWeight="600">
                                {instructor.name}
                              </Typography>
                            }
                            secondary={
                              <Typography variant="caption" color="text.secondary">
                                {instructor.role}
                              </Typography>
                            }
                          />
                        </ListItem>
                        {index < course.instructors.length - 1 && (
                          <Divider variant="inset" component="li" sx={{ mx: 3 }} />
                        )}
                      </React.Fragment>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        );
      
      case 1: // Sessions
        return <SessionsTab course={course} />;
      
      case 2: // Content
        return <ContentTab course={course} />;
      
      case 3: // Leaderboard
        return <LeaderboardTab course={course} />;
      
      case 4: // Settings
        return (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h5" color="text.secondary" gutterBottom>
              Course Settings
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Course configuration options coming soon...
            </Typography>
          </Box>
        );
      
      default:
        return null;
    }
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      {/* Header Section */}
      <Box sx={{ mb: 4 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={handleBack}
          sx={{ mb: 2, textTransform: 'none' }}
        >
          Back to My Courses
        </Button>
        
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
          {course.title}
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
          {course.subject}
        </Typography>

        {/* Course Navigation Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs 
            value={activeTab} 
            onChange={handleTabChange}
            sx={{
              '& .MuiTab-root': {
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 500,
                minHeight: 48,
              }
            }}
          >
            <Tab label="Timeline" />
            <Tab label="Sessions" />
            <Tab label="Content" />
            <Tab label="Leaderboard" />
            <Tab label="Settings" />
          </Tabs>
        </Box>
      </Box>

      {/* Main Content */}
      {renderTabContent()}
    </Box>
  );
};

export default CourseDetailPage;
