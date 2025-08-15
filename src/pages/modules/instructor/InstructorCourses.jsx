import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Chip,
  Paper,
  Divider,
  Button
} from '@mui/material';
import {
  Book as BookIcon,
  Schedule as ScheduleIcon,
  Person as PersonIcon,
  School as SchoolIcon
} from '@mui/icons-material';

const InstructorCourses = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState(0);

  const handleCourseClick = (courseId) => {
    navigate(`/teacher/courses/${courseId}`);
  };

  // Mock data for teaching courses
  const teachingCourses = [
    {
      id: 1,
      title: 'Subscription 1:1 Algebra',
      subject: 'Mathematics',
      image: 'https://eitfaridabad.com/wp-content/uploads/2024/05/EIT-blog-image-2.jpg',
      type: '1:1',
      progress: 75
    },
    {
      id: 2,
      title: 'Advanced Mathematics',
      subject: 'Mathematics',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdheZgujEnpERtY8p3eRYgtNtHe4NzYXYw9w&s',
      type: 'Group',
      progress: 60
    },
    {
      id: 3,
      title: 'Physics for Engineers',
      subject: 'Physics',
      image: 'https://cdn.mos.cms.futurecdn.net/v2/t:0,l:169,cw:662,ch:662,q:80,w:662/steVjWGx3vYPjMpJL2jVcV.jpg',
      type: '1:1',
      progress: 45
    }
  ];

  // Mock data for upcoming teaching sessions
  const upcomingSessions = [
    {
      id: 1,
      date: 'Aug 16',
      day: 'Sat',
      time: '11:20 am - 12:20 pm',
      course: 'Physics for Engineers',
      instructor: 'DR. EMILY CARTER'
    },
    {
      id: 2,
      date: 'Aug 17',
      day: 'Sun',
      time: '11:20 am - 12:20 pm',
      course: 'Physics for Engineers',
      instructor: 'DR. EMILY CARTER'
    },
    {
      id: 3,
      date: 'Aug 18',
      day: 'Mon',
      time: '11:20 am - 12:20 pm',
      course: 'Physics for Engineers',
      instructor: 'DR. EMILY CARTER'
    },
    {
      id: 4,
      date: 'Aug 19',
      day: 'Tue',
      time: '11:20 am - 12:20 pm',
      course: 'Physics for Engineers',
      instructor: 'DR. EMILY CARTER'
    }
  ];

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 3, p: 3 }}>
      {/* Welcome Image at Top */}
      <Box sx={{ 
        width: '100%', 
        height: 300, 
        borderRadius: 2, 
        overflow: 'hidden',
        position: 'relative',
        mb: 2
      }}>
        <img
          src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1200&h=300&fit=crop&crop=center"
          alt="Welcome to Vedic Maths India"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(45deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.1) 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Typography 
            variant="h3" 
            sx={{ 
              color: 'white', 
              fontWeight: 'bold',
              textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
              textAlign: 'center'
            }}
          >
            Welcome to Vedic Maths India
          </Typography>
        </Box>
      </Box>

      {/* Welcome Message and create course button*/}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', color: 'text.primary' }}>
          Vedic Maths India
        </Typography>
      </Box>

      {/* Main Content Area */}
      <Box sx={{ display: 'flex', gap: 3, flex: 1 }}>
        {/* Left Panel - Course Cards */}
        <Box sx={{ width: '35%', minWidth: 300 }}>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {teachingCourses.map((course) => (
              <Card 
                key={course.id} 
                onClick={() => handleCourseClick(course.id)}
                sx={{ 
                  cursor: 'pointer',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: 3
                  }
                }}
              >
                <CardMedia
                  component="img"
                  height="120"
                  image={course.image}
                  alt={course.title}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ p: 2 }}>
                  <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>
                    {course.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {course.subject}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Chip 
                      label={course.type} 
                      size="small" 
                      color="primary" 
                      variant="outlined"
                    />
                    <Typography variant="body2" color="text.secondary">
                      {course.progress}% Complete
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>

        {/* Right Panel - Session Details */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Paper sx={{ height: '100%', p: 3 }}>
           
            
            {/* Tabs */}
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
              <Tabs value={selectedTab} onChange={handleTabChange}>
                <Tab 
                  label={`Upcoming (${upcomingSessions.length})`} 
                  sx={{ 
                    fontWeight: 'bold',
                    '&.Mui-selected': {
                      color: 'primary.main'
                    }
                  }}
                />
                <Tab 
                  label="Past" 
                  sx={{ 
                    fontWeight: 'bold',
                    '&.Mui-selected': {
                      color: 'primary.main'
                    }
                  }}
                />
              </Tabs>
            </Box>

            {/* Session List */}
            {selectedTab === 0 && (
              <List sx={{ width: '100%' }}>
                {upcomingSessions.map((session, index) => (
                  <React.Fragment key={session.id}>
                    <ListItem 
                      sx={{ 
                        px: 0,
                        '&:hover': {
                          backgroundColor: 'action.hover',
                          borderRadius: 1
                        }
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: 'primary.main' }}>
                          <ScheduleIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                              {session.date}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {session.day}
                            </Typography>
                          </Box>
                        }
                        secondary={
                          <Box>
                            <Typography variant="body1" sx={{ fontWeight: 'medium', mb: 0.5 }}>
                              {session.course}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                              HOSTED BY {session.instructor}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {session.time}
                            </Typography>
                          </Box>
                        }
                      />
                    </ListItem>
                    {index < upcomingSessions.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            )}

            {selectedTab === 1 && (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="body1" color="text.secondary">
                  No past sessions to display
                </Typography>
              </Box>
            )}
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default InstructorCourses;
