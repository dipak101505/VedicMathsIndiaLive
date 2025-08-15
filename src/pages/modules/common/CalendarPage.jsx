import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  ButtonGroup,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Divider,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Tooltip,
} from '@mui/material';
import {
  Today as TodayIcon,
  NavigateBefore as NavigateBeforeIcon,
  NavigateNext as NavigateNextIcon,
  ViewModule as MonthIcon,
  ViewWeek as WeekIcon,
  ViewDay as DayIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Event as EventIcon,
  Schedule as ScheduleIcon,
  LocationOn as LocationIcon,
  Person as PersonIcon,
  VideoCall as VideoCallIcon,
  School as SchoolIcon,
} from '@mui/icons-material';
import { useCalendar } from '../../../hooks/useCalendar';
import { useAuth } from '../../../hooks/useAuth';
import { usePermissions } from '../../../hooks/usePermissions';

const CalendarPage = () => {
  const { user } = useAuth();
  const { isInstructor, isStudent, isAdmin } = usePermissions();
  
  const {
    currentDate,
    selectedDate,
    viewMode,
    events,
    calendarGrid,
    preferences,
    loading,
    error,
    setCurrentDate,
    setSelectedDate,
    setViewMode,
    setPreferences,
    addEvent,
    updateEvent,
    deleteEvent,
    goToPreviousPeriod,
    goToNextPeriod,
    goToToday,
    canGoPrevious,
    canGoNext,
  } = useCalendar({
    defaultView: 'month',
    defaultPreferences: {
      workingHours: {
        start: '09:00',
        end: '17:00'
      },
      weekStart: 1, // Monday
      showWeekends: true,
      showTodayHighlight: true,
      defaultEventDuration: 60,
    }
  });
  
  // Add some mock events for testing
  useEffect(() => {
    // Add mock events if no events exist
    if (events.length === 0 && addEvent) {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      const mockEvents = [
        {
          id: '1',
          title: 'Math Class',
          description: 'Advanced Algebra Session',
          start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 9, 0),
          end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 10, 0),
          type: 'class',
          location: 'Room 101',
          createdBy: user?.uid || 'mock',
          createdAt: new Date().toISOString(),
        },
        {
          id: '2',
          title: 'Student Consultation',
          description: 'One-on-one session with student',
          start: new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 14, 0),
          end: new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 15, 0),
          type: 'consultation',
          location: 'Virtual Meeting',
          createdBy: user?.uid || 'mock',
          createdAt: new Date().toISOString(),
        },
      ];
      
      // Add mock events to the calendar
      mockEvents.forEach(event => {
        addEvent(event);
      });
    }
  }, [events.length, addEvent, user?.uid]);

  // Event management state
  const [eventDialogOpen, setEventDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [eventForm, setEventForm] = useState({
    title: '',
    description: '',
    startDate: '',
    startTime: '',
    endTime: '',
    type: 'class',
    location: '',
    attendees: [],
    isRecurring: false,
    recurrencePattern: 'weekly',
  });

  // Event types for different user roles
  const eventTypes = isInstructor ? [
    { value: 'class', label: 'Class Session', icon: <SchoolIcon />, color: 'primary' },
    { value: 'consultation', label: 'Consultation', icon: <VideoCallIcon />, color: 'secondary' },
    { value: 'meeting', label: 'Meeting', icon: <PersonIcon />, color: 'info' },
    { value: 'office_hours', label: 'Office Hours', icon: <ScheduleIcon />, color: 'success' },
  ] : [
    { value: 'class', label: 'Class Session', icon: <SchoolIcon />, color: 'primary' },
    { value: 'study_group', label: 'Study Group', icon: <PersonIcon />, color: 'secondary' },
    { value: 'exam', label: 'Exam', icon: <EventIcon />, color: 'warning' },
    { value: 'assignment', label: 'Assignment Due', icon: <ScheduleIcon />, color: 'error' },
  ];

  // Handle event form changes
  const handleEventFormChange = (field, value) => {
    setEventForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Open event dialog for creating new event
  const handleCreateEvent = (date = null) => {
    const targetDate = date || selectedDate || currentDate;
    setEventForm({
      title: '',
      description: '',
      startDate: targetDate.toISOString().split('T')[0],
      startTime: '09:00',
      endTime: '10:00',
      type: 'class',
      location: '',
      attendees: [],
      isRecurring: false,
      recurrencePattern: 'weekly',
    });
    setEditingEvent(null);
    setEventDialogOpen(true);
  };

  // Open event dialog for editing existing event
  const handleEditEvent = (event) => {
    const startDate = new Date(event.start);
    setEditingEvent(event);
    setEventForm({
      title: event.title,
      description: event.description || '',
      startDate: startDate.toISOString().split('T')[0],
      startTime: startDate.toTimeString().slice(0, 5),
      endTime: event.end ? new Date(event.end).toTimeString().slice(0, 5) : '10:00',
      type: event.type,
      location: event.location || '',
      attendees: event.attendees || [],
      isRecurring: event.isRecurring || false,
      recurrencePattern: event.recurrencePattern || 'weekly',
    });
    setEventDialogOpen(true);
  };

  // Save event (create or update)
  const handleSaveEvent = async () => {
    try {
      const startDateTime = new Date(`${eventForm.startDate}T${eventForm.startTime}`);
      const endDateTime = new Date(`${eventForm.startDate}T${eventForm.endTime}`);
      
      const eventData = {
        title: eventForm.title,
        description: eventForm.description,
        start: startDateTime,
        end: endDateTime,
        type: eventForm.type,
        location: eventForm.location,
        attendees: eventForm.attendees,
        createdBy: user.uid,
        createdAt: new Date().toISOString(),
      };

      if (editingEvent) {
        await updateEvent(editingEvent.id, eventData);
      } else {
        await addEvent(eventData);
      }

      setEventDialogOpen(false);
      setEventForm({
        title: '',
        description: '',
        startDate: '',
        startTime: '',
        endTime: '',
        type: 'class',
        location: '',
        attendees: [],
        isRecurring: false,
        recurrencePattern: 'weekly',
      });
      setEditingEvent(null);
    } catch (error) {
      console.error('Error saving event:', error);
    }
  };

  // Delete event
  const handleDeleteEvent = async (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await deleteEvent(eventId);
      } catch (error) {
        console.error('Error deleting event:', error);
      }
    }
  };

  // Render calendar cell
  const renderCalendarCell = (dayData) => {
    const { date, isCurrentMonth, isToday, isSelected, events } = dayData;
    const dayEvents = events;
    
    return (
      <Box
        key={date.toISOString()}
        onClick={() => setSelectedDate(date)}
        sx={{
          minHeight: 80,
          p: 1,
          border: '1px solid',
          borderColor: 'divider',
          backgroundColor: isSelected ? 'action.selected' : 'background.paper',
          cursor: 'pointer',
          '&:hover': {
            backgroundColor: 'action.hover',
          },
          position: 'relative',
        }}
      >
        <Typography
          variant="body2"
          sx={{
            fontWeight: isToday ? 'bold' : 'normal',
            color: isToday ? 'primary.main' : isCurrentMonth ? 'text.primary' : 'text.disabled',
            mb: 1,
          }}
        >
          {date.getDate()}
        </Typography>
        
        {/* Events for this day */}
        {dayEvents.slice(0, 3).map((event, index) => (
          <Box
            key={event.id}
            sx={{
              mb: 0.5,
              p: 0.5,
              borderRadius: 1,
              backgroundColor: `${eventTypes.find(t => t.value === event.type)?.color || 'default'}.light`,
              border: `1px solid ${eventTypes.find(t => t.value === event.type)?.color || 'default'}.main`,
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: `${eventTypes.find(t => t.value === event.type)?.color || 'default'}.main`,
                color: 'white',
              },
            }}
            onClick={(e) => {
              e.stopPropagation();
              handleEditEvent(event);
            }}
          >
            <Typography
              variant="caption"
              sx={{
                fontSize: '0.6rem',
                fontWeight: 500,
                display: 'block',
                lineHeight: 1.1,
              }}
            >
              {new Date(event.start).toLocaleTimeString('en-US', { 
                hour: 'numeric', 
                minute: '2-digit',
                hour12: true 
              })}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                fontSize: '0.65rem',
                fontWeight: 600,
                display: 'block',
                lineHeight: 1.1,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {event.title}
            </Typography>
          </Box>
        ))}
        
        {dayEvents.length > 3 && (
          <Typography variant="caption" color="text.secondary">
            +{dayEvents.length - 3} more
          </Typography>
        )}
      </Box>
    );
  };

  // Render month view
  const renderMonthView = () => {
    const grid = calendarGrid;
    
    return (
      <Box>
        <Grid container spacing={0}>
          {/* Week day headers */}
          <Grid container item>
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
              <Grid item xs key={day}>
                <Box sx={{ p: 1, textAlign: 'center', fontWeight: 'bold' }}>
                  <Typography variant="body2">{day}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
          
          {/* Calendar grid */}
          {grid.map((week, weekIndex) => (
            <Grid container item key={weekIndex}>
              {week.map((dayData) => (
                <Grid item xs key={dayData.date.toISOString()}>
                  {renderCalendarCell(dayData)}
                </Grid>
              ))}
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  };

  // Render week view
  const renderWeekView = () => {
    const grid = calendarGrid;
    
    return (
      <Box>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Week of {currentDate.toLocaleDateString()}
        </Typography>
        
        <Box sx={{ overflowX: 'auto' }}>
          <Grid container spacing={0} sx={{ minWidth: 800 }}>
            {/* Time column header */}
            <Grid item xs={1}>
              <Box sx={{ 
                height: 60, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                borderBottom: '1px solid',
                borderColor: 'divider',
                backgroundColor: 'background.paper'
              }}>
                <Typography variant="body2" fontWeight="bold">
                  Time
                </Typography>
              </Box>
            </Grid>
            
            {/* Week day headers */}
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, dayIndex) => (
              <Grid item xs key={dayIndex}>
                <Box sx={{ 
                  height: 60,
                  p: 1, 
                  textAlign: 'center', 
                  fontWeight: 'bold', 
                  borderBottom: '1px solid', 
                  borderColor: 'divider',
                  backgroundColor: 'background.paper',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  <Typography variant="body2">{day}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {grid[dayIndex]?.date ? grid[dayIndex].date.getDate() : ''}
                  </Typography>
                </Box>
              </Grid>
            ))}
            
            {/* Time slots for each day - 24 hours */}
            {Array.from({ length: 24 }, (_, hourIndex) => {
              const hour = hourIndex;
              const time = new Date();
              time.setHours(hour, 0, 0, 0);
              
              // Different styling for different time periods
              const isWorkingHours = hour >= 9 && hour < 17;
              const isNightHours = hour >= 22 || hour < 6;
              const isEarlyMorning = hour >= 6 && hour < 9;
              const isEvening = hour >= 17 && hour < 22;
              
              let timeSlotStyle = {
                backgroundColor: 'background.paper',
                borderColor: 'divider'
              };
              
              if (isWorkingHours) {
                timeSlotStyle.backgroundColor = 'primary.50';
                timeSlotStyle.borderColor = 'primary.200';
              } else if (isNightHours) {
                timeSlotStyle.backgroundColor = 'grey.100';
                timeSlotStyle.borderColor = 'grey.300';
              } else if (isEarlyMorning) {
                timeSlotStyle.backgroundColor = 'warning.50';
                timeSlotStyle.borderColor = 'warning.200';
              } else if (isEvening) {
                timeSlotStyle.backgroundColor = 'info.50';
                timeSlotStyle.borderColor = 'info.200';
              }
              
              return (
                <Grid container item key={hour} sx={{ minHeight: 60 }}>
                  {/* Time label */}
                  <Grid item xs={1}>
                    <Box sx={{ 
                      height: 60,
                      p: 1,
                      borderRight: '1px solid',
                      borderColor: 'divider',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: timeSlotStyle.backgroundColor,
                      borderColor: timeSlotStyle.borderColor
                    }}>
                      <Typography 
                        variant="caption" 
                        color={isWorkingHours ? 'primary.main' : 'text.secondary'}
                        sx={{ fontWeight: isWorkingHours ? 600 : 400 }}
                      >
                        {time.toLocaleTimeString('en-US', { 
                          hour: 'numeric', 
                          minute: '2-digit',
                          hour12: true 
                        })}
                      </Typography>
                    </Box>
                  </Grid>
                  
                  {/* Events for each day at this time */}
                  {grid.map((dayData, dayIndex) => {
                    const dayEvents = dayData.events || [];
                    const hourEvents = dayEvents.filter(event => {
                      const eventStart = new Date(event.start);
                      return eventStart.getHours() === hour;
                    });
                    
                    return (
                      <Grid item xs key={dayIndex}>
                        <Box sx={{ 
                          height: 60,
                          p: 0.5,
                          border: '1px solid',
                          borderColor: timeSlotStyle.borderColor,
                          backgroundColor: timeSlotStyle.backgroundColor,
                          position: 'relative',
                          '&:hover': {
                            backgroundColor: 'action.hover',
                          },
                        }}>
                          {/* Events in this time slot */}
                          {hourEvents.map((event, eventIndex) => (
                            <Box
                              key={event.id}
                              sx={{
                                mb: 0.5,
                                p: 0.5,
                                borderRadius: 1,
                                backgroundColor: `${eventTypes.find(t => t.value === event.type)?.color || 'default'}.light`,
                                border: `1px solid ${eventTypes.find(t => t.value === event.type)?.color || 'default'}.main`,
                                cursor: 'pointer',
                                fontSize: '0.7rem',
                                '&:hover': {
                                  backgroundColor: `${eventTypes.find(t => t.value === event.type)?.color || 'default'}.main`,
                                  color: 'white',
                                },
                              }}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEditEvent(event);
                              }}
                            >
                              <Typography
                                variant="caption"
                                sx={{
                                  fontSize: '0.65rem',
                                  fontWeight: 600,
                                  display: 'block',
                                  lineHeight: 1.1,
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  whiteSpace: 'nowrap',
                                }}
                              >
                                {event.title}
                              </Typography>
                              {event.location && (
                                <Typography
                                  variant="caption"
                                  sx={{
                                    fontSize: '0.6rem',
                                    color: 'text.secondary',
                                    display: 'block',
                                    lineHeight: 1.1,
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                  }}
                                >
                                  📍 {event.location}
                                </Typography>
                              )}
                            </Box>
                          ))}
                          
                          {/* Add event button for this time slot */}
                          <IconButton
                            size="small"
                            onClick={() => {
                              const eventDate = new Date(dayData.date);
                              eventDate.setHours(hour, 0, 0, 0);
                              handleCreateEvent(eventDate);
                            }}
                            sx={{
                              position: 'absolute',
                              top: 2,
                              right: 2,
                              width: 20,
                              height: 20,
                              opacity: 0.7,
                              '&:hover': {
                                opacity: 1,
                              },
                            }}
                          >
                            <AddIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </Grid>
                    );
                  })}
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Box>
    );
  };

  // Render day view
  const renderDayView = () => {
    const grid = calendarGrid;
    const dayData = grid;
    
    if (!dayData || !dayData.date) {
      return (
        <Typography variant="body2" color="text.secondary">
          No day data available
        </Typography>
      );
    }
    
    const dayEvents = dayData.events || [];
    
    return (
      <Box>
        <Typography variant="h6" sx={{ mb: 2 }}>
          {dayData.date.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </Typography>
        
        <Grid container spacing={2}>
          {/* Left side - 24-hour time slots */}
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent sx={{ p: 0 }}>
                <Box sx={{ maxHeight: 800, overflowY: 'auto' }}>
                  {/* 24-hour time slots */}
                  {Array.from({ length: 24 }, (_, hourIndex) => {
                    const hour = hourIndex;
                    const time = new Date();
                    time.setHours(hour, 0, 0, 0);
                    
                    // Different styling for different time periods
                    const isWorkingHours = hour >= 9 && hour < 17;
                    const isNightHours = hour >= 22 || hour < 6;
                    const isEarlyMorning = hour >= 6 && hour < 9;
                    const isEvening = hour >= 17 && hour < 22;
                    
                    let timeSlotStyle = {
                      backgroundColor: 'background.paper',
                      borderColor: 'divider'
                    };
                    
                    if (isWorkingHours) {
                      timeSlotStyle.backgroundColor = 'primary.50';
                      timeSlotStyle.borderColor = 'primary.200';
                    } else if (isNightHours) {
                      timeSlotStyle.backgroundColor = 'grey.100';
                      timeSlotStyle.borderColor = 'grey.300';
                    } else if (isEarlyMorning) {
                      timeSlotStyle.backgroundColor = 'warning.50';
                      timeSlotStyle.borderColor = 'warning.200';
                    } else if (isEvening) {
                      timeSlotStyle.backgroundColor = 'info.50';
                      timeSlotStyle.borderColor = 'info.200';
                    }
                    
                    // Get events for this specific hour
                    const hourEvents = dayEvents.filter(event => {
                      const eventStart = new Date(event.start);
                      return eventStart.getHours() === hour;
                    });
                    
                    return (
                      <Box
                        key={hour}
                        sx={{
                          display: 'flex',
                          borderBottom: '1px solid',
                          borderColor: timeSlotStyle.borderColor,
                          minHeight: 60,
                          backgroundColor: timeSlotStyle.backgroundColor,
                          '&:hover': {
                            backgroundColor: 'action.hover',
                          },
                        }}
                      >
                        {/* Time label */}
                        <Box sx={{ 
                          width: 80, 
                          p: 1, 
                          borderRight: '1px solid', 
                          borderColor: timeSlotStyle.borderColor,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: timeSlotStyle.backgroundColor,
                        }}>
                          <Typography 
                            variant="body2" 
                            color={isWorkingHours ? 'primary.main' : 'text.secondary'}
                            sx={{ fontWeight: isWorkingHours ? 600 : 400 }}
                          >
                            {time.toLocaleTimeString('en-US', { 
                              hour: 'numeric', 
                              minute: '2-digit',
                              hour12: true 
                            })}
                          </Typography>
                        </Box>
                        
                        {/* Events in this time slot */}
                        <Box sx={{ flex: 1, p: 1, position: 'relative' }}>
                          {hourEvents.map((event, eventIndex) => (
                            <Box
                              key={event.id}
                              sx={{
                                mb: 0.5,
                                p: 0.5,
                                borderRadius: 1,
                                backgroundColor: `${eventTypes.find(t => t.value === event.type)?.color || 'default'}.light`,
                                border: `1px solid ${eventTypes.find(t => t.value === event.type)?.color || 'default'}.main`,
                                cursor: 'pointer',
                                '&:hover': {
                                  backgroundColor: `${eventTypes.find(t => t.value === event.type)?.color || 'default'}.main`,
                                  color: 'white',
                                },
                              }}
                              onClick={() => handleEditEvent(event)}
                            >
                              <Typography
                                variant="body2"
                                sx={{
                                  fontSize: '0.75rem',
                                  fontWeight: 600,
                                  display: 'block',
                                  lineHeight: 1.2,
                                }}
                              >
                                {event.title}
                              </Typography>
                              {event.description && (
                                <Typography
                                  variant="caption"
                                  sx={{
                                    fontSize: '0.7rem',
                                    color: 'text.secondary',
                                    display: 'block',
                                    lineHeight: 1.2,
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                  }}
                                >
                                  {event.description}
                                </Typography>
                              )}
                              {event.location && (
                                <Typography
                                  variant="caption"
                                  sx={{
                                    fontSize: '0.65rem',
                                    color: 'text.secondary',
                                    display: 'block',
                                    lineHeight: 1.2,
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                  }}
                                >
                                  📍 {event.location}
                                </Typography>
                              )}
                            </Box>
                          ))}
                          
                          {/* Add event button for this time slot */}
                          <IconButton
                            size="small"
                            onClick={() => {
                              const eventDate = new Date(dayData.date);
                              eventDate.setHours(hour, 0, 0, 0);
                              handleCreateEvent(eventDate);
                            }}
                            sx={{
                              position: 'absolute',
                              top: 4,
                              right: 4,
                              width: 24,
                              height: 24,
                              opacity: 0.7,
                              '&:hover': {
                                opacity: 1,
                              },
                            }}
                          >
                            <AddIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </Box>
                    );
                  })}
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          {/* Right side - Day summary */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Day Summary
                </Typography>
                
                {dayEvents.length === 0 ? (
                  <Typography variant="body2" color="text.secondary">
                    No events scheduled for this day
                  </Typography>
                ) : (
                  <List dense>
                    {dayEvents.map((event, index) => (
                      <ListItem key={event.id} sx={{ px: 0 }}>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          {eventTypes.find(t => t.value === event.type)?.icon || <EventIcon />}
                        </ListItemIcon>
                        <ListItemText
                          primary={event.title}
                          secondary={
                            <Box>
                              <Typography variant="caption" display="block">
                                {new Date(event.start).toLocaleTimeString('en-US', { 
                                  hour: 'numeric', 
                                  minute: '2-digit',
                                  hour12: true 
                                })} - {new Date(event.end).toLocaleTimeString('en-US', { 
                                  hour: 'numeric', 
                                  minute: '2-digit',
                                  hour12: true 
                                })}
                              </Typography>
                              {event.location && (
                                <Typography variant="caption" display="block" color="text.secondary">
                                  📍 {event.location}
                                </Typography>
                              )}
                            </Box>
                          }
                        />
                        <IconButton
                          size="small"
                          onClick={() => handleEditEvent(event)}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </ListItem>
                    ))}
                  </List>
                )}
                
                <Button
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={() => handleCreateEvent(dayData.date)}
                  fullWidth
                  sx={{ mt: 2 }}
                >
                  Add Event
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    );
  };

  // Render current view
  const renderCurrentView = () => {
    switch (viewMode) {
      case 'month':
        return renderMonthView();
      case 'week':
        return renderWeekView();
      case 'day':
        return renderDayView();
      default:
        return renderMonthView();
    }
  };

  if (loading) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h6">Loading calendar...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Calendar
        </Typography>
        
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleCreateEvent()}
        >
          Add Event
        </Button>
      </Box>

      {/* Calendar Controls */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
            {/* Navigation */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton onClick={goToPreviousPeriod} disabled={!canGoPrevious}>
                <NavigateBeforeIcon />
              </IconButton>
              
              <Button
                variant="outlined"
                startIcon={<TodayIcon />}
                onClick={goToToday}
              >
                Today
              </Button>
              
              <IconButton onClick={goToNextPeriod} disabled={!canGoNext}>
                <NavigateNextIcon />
              </IconButton>
            </Box>

            {/* Current date display */}
            <Typography variant="h6">
              {currentDate.toLocaleDateString('en-US', { 
                month: 'long', 
                year: 'numeric' 
              })}
            </Typography>

            {/* View mode selector */}
            <ButtonGroup variant="outlined" size="small">
              <Button
                onClick={() => setViewMode('month')}
                variant={viewMode === 'month' ? 'contained' : 'outlined'}
                startIcon={<MonthIcon />}
              >
                Month
              </Button>
              <Button
                onClick={() => setViewMode('week')}
                variant={viewMode === 'week' ? 'contained' : 'outlined'}
                startIcon={<WeekIcon />}
              >
                Week
              </Button>
              <Button
                onClick={() => setViewMode('day')}
                variant={viewMode === 'day' ? 'contained' : 'outlined'}
                startIcon={<DayIcon />}
              >
                Day
              </Button>
            </ButtonGroup>
          </Box>
        </CardContent>
      </Card>

      {/* Calendar Content */}
      <Card>
        <CardContent sx={{ p: 0 }}>
          {renderCurrentView()}
        </CardContent>
      </Card>

      {/* Event Dialog */}
      <Dialog 
        open={eventDialogOpen} 
        onClose={() => setEventDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {editingEvent ? 'Edit Event' : 'Create New Event'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Event Title"
                  value={eventForm.title}
                  onChange={(e) => handleEventFormChange('title', e.target.value)}
                  required
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  value={eventForm.description}
                  onChange={(e) => handleEventFormChange('description', e.target.value)}
                  multiline
                  rows={3}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Start Date"
                  type="date"
                  value={eventForm.startDate}
                  onChange={(e) => handleEventFormChange('startDate', e.target.value)}
                  required
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Start Time"
                  type="time"
                  value={eventForm.startTime}
                  onChange={(e) => handleEventFormChange('startTime', e.target.value)}
                  required
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="End Time"
                  type="time"
                  value={eventForm.endTime}
                  onChange={(e) => handleEventFormChange('endTime', e.target.value)}
                  required
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Event Type</InputLabel>
                  <Select
                    value={eventForm.type}
                    onChange={(e) => handleEventFormChange('type', e.target.value)}
                    label="Event Type"
                  >
                    {eventTypes.map((type) => (
                      <MenuItem key={type.value} value={type.value}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {type.icon}
                          {type.label}
                        </Box>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Location"
                  value={eventForm.location}
                  onChange={(e) => handleEventFormChange('location', e.target.value)}
                  placeholder="Physical location or virtual meeting link"
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          {editingEvent && (
            <Button
              color="error"
              onClick={() => handleDeleteEvent(editingEvent.id)}
            >
              Delete
            </Button>
          )}
          <Button onClick={() => setEventDialogOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSaveEvent} variant="contained">
            {editingEvent ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CalendarPage;
