import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Avatar,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  Paper,
} from '@mui/material';
import {
  PlayArrow as PlayIcon,
  VideoLibrary as VideoLibraryIcon,
  Download as DownloadIcon,
  People as PeopleIcon,
  AccessTime as TimeIcon,
  CalendarToday as CalendarIcon,
  School as SchoolIcon,
} from '@mui/icons-material';

const SessionsTab = ({ course }) => {
  const [sessions, setSessions] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 7, 1)); // August 2025
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 7, 12)); // Aug 12, 2025
  const [selectedSession, setSelectedSession] = useState(null);

  // Mock sessions data - replace with API call
  useEffect(() => {
    const mockSessions = [
      {
        id: 1,
        title: 'Review of Newton\'s Laws',
        instructor: 'Dr. Emily Carter',
        date: 'Aug 8',
        day: 'Fri',
        time: '11:09 pm',
        duration: '56m',
        attendees: 2,
        status: 'completed',
        hasRecording: true,
        recordingUrl: '/recording/session-1',
        materials: ['slides.pdf', 'notes.docx'],
        month: 7, // August (0-indexed)
        day: 8,
        year: 2025,
      },
      {
        id: 2,
        title: 'Forces & Motion Discussion',
        instructor: 'Dr. Emily Carter',
        date: 'Aug 9',
        day: 'Sat',
        time: '11:09 pm',
        duration: '80m',
        attendees: 2,
        status: 'completed',
        hasRecording: true,
        recordingUrl: '/recording/session-2',
        materials: ['worksheet.pdf', 'homework.pdf'],
        month: 7,
        day: 9,
        year: 2025,
      },
      {
        id: 3,
        title: 'Quick Recap: Energy Principles',
        instructor: 'Dr. Emily Carter',
        date: 'Aug 10',
        day: 'Sun',
        time: '11:09 pm',
        duration: '20m',
        attendees: 2,
        status: 'completed',
        hasRecording: true,
        recordingUrl: '/recording/session-3',
        materials: ['summary.pdf'],
        month: 7,
        day: 10,
        year: 2025,
      },
      {
        id: 4,
        title: 'Advanced Kinematics Breakdown',
        instructor: 'Dr. Emily Carter',
        date: 'Aug 11',
        day: 'Mon',
        time: '11:09 pm',
        duration: '100m',
        attendees: 2,
        status: 'completed',
        hasRecording: true,
        recordingUrl: '/recording/session-4',
        materials: ['kinematics.pdf', 'examples.pdf'],
        month: 7,
        day: 11,
        year: 2025,
      },
      {
        id: 5,
        title: 'Intro to Work & Power',
        instructor: 'Dr. Emily Carter',
        date: 'Aug 12',
        day: 'Tue',
        time: '11:10 pm - 12:10 am',
        duration: '60m',
        attendees: 2,
        status: 'upcoming',
        hasRecording: false,
        materials: ['prep-material.pdf'],
        month: 7,
        day: 12,
        year: 2025,
      },
      {
        id: 6,
        title: 'Understanding Circular Motion',
        instructor: 'Dr. Emily Carter',
        date: 'Aug 13',
        day: 'Wed',
        time: '11:09 pm - 12:09 am',
        duration: '60m',
        attendees: 2,
        status: 'upcoming',
        hasRecording: false,
        materials: ['circular-motion.pdf'],
        month: 7,
        day: 13,
        year: 2025,
      },
      // Add some sessions for September 2025 to demonstrate month navigation
      {
        id: 7,
        title: 'Fluid Mechanics Introduction',
        instructor: 'Dr. Emily Carter',
        date: 'Sep 5',
        day: 'Fri',
        time: '10:00 pm - 11:00 pm',
        duration: '60m',
        attendees: 0,
        status: 'upcoming',
        hasRecording: false,
        materials: ['fluid-mechanics.pdf'],
        month: 8, // September (0-indexed)
        day: 5,
        year: 2025,
      },
      {
        id: 8,
        title: 'Wave Motion Fundamentals',
        instructor: 'Dr. Emily Carter',
        date: 'Sep 12',
        day: 'Fri',
        time: '10:00 pm - 11:00 pm',
        duration: '60m',
        attendees: 0,
        status: 'upcoming',
        hasRecording: false,
        materials: ['wave-motion.pdf'],
        month: 8,
        day: 12,
        year: 2025,
      },
      // Add some sessions for July 2025 to demonstrate month navigation
      {
        id: 9,
        title: 'Classical Mechanics Review',
        instructor: 'Dr. Emily Carter',
        date: 'Jul 25',
        day: 'Fri',
        time: '11:00 pm - 12:00 am',
        duration: '60m',
        attendees: 2,
        status: 'completed',
        hasRecording: true,
        materials: ['classical-mechanics.pdf'],
        month: 6, // July (0-indexed)
        day: 25,
        year: 2025,
      },
      {
        id: 10,
        title: 'Quantum Physics Basics',
        instructor: 'Dr. Emily Carter',
        date: 'Jul 30',
        day: 'Wed',
        time: '10:30 pm - 11:30 pm',
        duration: '60m',
        attendees: 2,
        status: 'completed',
        hasRecording: true,
        materials: ['quantum-physics.pdf'],
        month: 6,
        day: 30,
        year: 2025,
      }
    ];

    setSessions(mockSessions);
  }, [course]);

  // Calendar navigation functions
  const handlePrevMonth = () => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev.getFullYear(), prev.getMonth() - 1, 1);
      // Reset selected date if it's not in the new month
      if (selectedDate.getMonth() !== newMonth.getMonth() || selectedDate.getFullYear() !== newMonth.getFullYear()) {
        setSelectedDate(new Date(newMonth.getFullYear(), newMonth.getMonth(), 1));
      }
      return newMonth;
    });
  };

  const handleNextMonth = () => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev.getFullYear(), prev.getMonth() + 1, 1);
      // Reset selected date if it's not in the new month
      if (selectedDate.getMonth() !== newMonth.getMonth() || selectedDate.getFullYear() !== newMonth.getFullYear()) {
        setSelectedDate(new Date(newMonth.getFullYear(), newMonth.getMonth(), 1));
      }
      return newMonth;
    });
  };

  // Get calendar data for current month
  const getCalendarData = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const firstDayOfMonth = firstDay.getDay(); // 0 for Sunday, 1 for Monday, etc.
    
    // Get session dates for current month
    const sessionDates = sessions
      .filter(session => session.month === month && session.year === year)
      .map(session => session.day);

    return {
      month: currentMonth.toLocaleString('default', { month: 'long' }),
      year: year,
      monthIndex: month,
      daysInMonth: daysInMonth,
      firstDayOfMonth: firstDayOfMonth,
      sessionDates: sessionDates,
      selectedDate: selectedDate.getDate(),
    };
  };

  const calendarData = getCalendarData();

  const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'success';
      case 'upcoming': return 'primary';
      case 'live': return 'warning';
      default: return 'default';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed': return 'Completed';
      case 'upcoming': return 'Upcoming';
      case 'live': return 'Live Now';
      default: return status;
    }
  };

  const handleDateSelect = (date) => {
    setSelectedDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), date));
  };

  const goToToday = () => {
    const today = new Date();
    setCurrentMonth(new Date(today.getFullYear(), today.getMonth(), 1));
    setSelectedDate(today);
  };

  const handleJoinSession = async (sessionId) => {
    try {
      console.log('Joining session:', sessionId);
      // TODO: Implement live session joining
    } catch (error) {
      console.error('Failed to join session:', error);
    }
  };

  const handleViewRecording = async (sessionId) => {
    try {
      console.log('Viewing recording for session:', sessionId);
      // TODO: Implement recording playback
    } catch (error) {
      console.error('Failed to load recording:', error);
    }
  };

  return (
    <Box>
      <Grid container spacing={4}>
        {/* Left Column - Calendar View */}
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 3, height: 'fit-content' }}>
            <CardContent sx={{ p: 3 }}>
                             <Typography variant="h6" component="h2" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                 {sessions.filter(session => 
                   session.month === currentMonth.getMonth() && 
                   session.year === currentMonth.getFullYear()
                 ).length} Sessions
               </Typography>
              
                             {/* Calendar */}
               <Box sx={{ mb: 3 }}>
                 {/* Month Navigation */}
                 <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                   <Button
                     onClick={handlePrevMonth}
                     sx={{
                       minWidth: 32,
                       height: 32,
                       borderRadius: '50%',
                       p: 0,
                       '&:hover': {
                         backgroundColor: 'rgba(0,0,0,0.1)',
                       }
                     }}
                   >
                     ←
                   </Button>
                   <Typography variant="h6" component="h3" sx={{ fontWeight: 600, textAlign: 'center' }}>
                     {calendarData.month} {calendarData.year}
                   </Typography>
                   <Button
                     onClick={handleNextMonth}
                     sx={{
                       minWidth: 32,
                       height: 32,
                       borderRadius: '50%',
                       p: 0,
                       '&:hover': {
                         backgroundColor: 'rgba(0,0,0,0.1)',
                       }
                     }}
                   >
                     →
                   </Button>
                 </Box>
                 
                 {/* Today Button */}
                 <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                   <Button
                     onClick={goToToday}
                     variant="outlined"
                     size="small"
                     sx={{
                       borderRadius: 2,
                       textTransform: 'none',
                       fontSize: '0.75rem',
                       py: 0.5,
                       px: 2,
                     }}
                   >
                     Today
                   </Button>
                 </Box>
                
                {/* Week Days Header */}
                <Grid container sx={{ mb: 1 }}>
                  {weekDays.map((day, index) => (
                    <Grid item xs={1.7} key={index}>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          textAlign: 'center', 
                          fontWeight: 600, 
                          color: 'text.secondary',
                          fontSize: '0.875rem'
                        }}
                      >
                        {day}
                      </Typography>
                    </Grid>
                  ))}
                </Grid>

                {/* Calendar Grid */}
                <Grid container spacing={0.5}>
                  {/* Empty cells for days before month starts */}
                  {Array.from({ length: calendarData.firstDayOfMonth }, (_, index) => (
                    <Grid item xs={1.7} key={`empty-${index}`}>
                      <Box sx={{ height: 40 }} />
                    </Grid>
                  ))}
                  
                  {/* Month days */}
                  {Array.from({ length: calendarData.daysInMonth }, (_, index) => {
                    const day = index + 1;
                    const hasSession = calendarData.sessionDates.includes(day);
                    const isSelected = day === calendarData.selectedDate;
                    
                    return (
                      <Grid item xs={1.7} key={day}>
                        <Box
                          onClick={() => handleDateSelect(day)}
                          sx={{
                            height: 40,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '50%',
                            cursor: 'pointer',
                            backgroundColor: hasSession ? 'rgba(0,0,0,0.1)' : 'transparent',
                            border: isSelected ? '2px solid #000' : 'none',
                            '&:hover': {
                              backgroundColor: hasSession ? 'rgba(0,0,0,0.15)' : 'rgba(0,0,0,0.05)',
                            },
                            transition: 'all 0.2s ease',
                          }}
                        >
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              fontWeight: hasSession ? 600 : 400,
                              color: hasSession ? 'text.primary' : 'text.secondary',
                            }}
                          >
                            {day}
                          </Typography>
                        </Box>
                      </Grid>
                    );
                  })}
                </Grid>
                
                {/* Timezone */}
                <Typography 
                  variant="caption" 
                  color="text.secondary" 
                  sx={{ 
                    display: 'block', 
                    textAlign: 'center', 
                    mt: 2,
                    fontSize: '0.75rem'
                  }}
                >
                  (GMT +05:30) Asia/Kolkata
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Right Column - Session List */}
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" component="h2" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                {calendarData.month}
              </Typography>
              
                             {/* Sessions List */}
               <List sx={{ p: 0 }}>
                 {sessions
                   .filter(session => 
                     session.month === currentMonth.getMonth() && 
                     session.year === currentMonth.getFullYear()
                   )
                   .map((session, index) => (
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
                          fontSize: '0.75rem',
                          fontWeight: 600,
                        }}>
                          {session.date.split(' ')[1]}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography variant="body1" fontWeight="600" gutterBottom>
                            {session.title}
                          </Typography>
                        }
                        secondary={
                          <Box>
                            <Typography variant="caption" color="text.secondary" display="block" sx={{ 
                              fontWeight: 500,
                              textTransform: 'uppercase',
                              letterSpacing: '0.5px',
                              mb: 0.5,
                              fontSize: '0.75rem'
                            }}>
                              HOSTED BY {session.instructor.toUpperCase()}
                            </Typography>
                            
                            {/* Session Details */}
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1, flexWrap: 'wrap' }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <TimeIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                                <Typography variant="caption" color="text.secondary">
                                  {session.time}
                                </Typography>
                              </Box>
                              <Typography variant="caption" color="text.secondary">
                                {session.duration}
                              </Typography>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <PeopleIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                                <Typography variant="caption" color="text.secondary">
                                  {session.attendees}
                                </Typography>
                              </Box>
                            </Box>
                            
                            {/* Status */}
                            <Chip
                              label={getStatusText(session.status)}
                              color={getStatusColor(session.status)}
                              size="small"
                              sx={{ 
                                fontWeight: 600,
                                fontSize: '0.7rem',
                                height: 20
                              }}
                            />
                          </Box>
                        }
                      />
                    </ListItem>
                                         {index < sessions.filter(session => 
                       session.month === currentMonth.getMonth() && 
                       session.year === currentMonth.getFullYear()
                     ).length - 1 && (
                       <Divider variant="inset" component="li" sx={{ mx: 3 }} />
                     )}
                   </React.Fragment>
                 ))}
               </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SessionsTab;
