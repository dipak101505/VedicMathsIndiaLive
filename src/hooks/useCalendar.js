import { useState, useCallback, useMemo, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';

export const useCalendar = (options = {}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [viewMode, setViewMode] = useState(options.defaultView || 'month');
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Calendar preferences
  const [preferences, setPreferences] = useLocalStorage('calendarPreferences', {
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    workingHours: {
      start: '09:00',
      end: '17:00'
    },
    weekStart: 1, // Monday
    showWeekends: true,
    showTodayHighlight: true,
    defaultEventDuration: 60, // minutes
    ...options.defaultPreferences
  });
  
  // Get calendar navigation helpers
  const getCalendarNavigation = useMemo(() => {
    const today = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    
    const goToToday = () => {
      setCurrentDate(today);
      setSelectedDate(today);
    };
    
    const goToPreviousPeriod = () => {
      switch (viewMode) {
        case 'month':
          setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
          break;
        case 'week':
          const prevWeek = new Date(currentDate);
          prevWeek.setDate(prevWeek.getDate() - 7);
          setCurrentDate(prevWeek);
          break;
        case 'day':
          const prevDay = new Date(currentDate);
          prevDay.setDate(prevDay.getDate() - 1);
          setCurrentDate(prevDay);
          break;
        case 'year':
          setCurrentDate(new Date(currentYear - 1, 0, 1));
          break;
      }
    };
    
    const goToNextPeriod = () => {
      switch (viewMode) {
        case 'month':
          setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
          break;
        case 'week':
          const nextWeek = new Date(currentDate);
          nextWeek.setDate(nextWeek.getDate() + 7);
          setCurrentDate(nextWeek);
          break;
        case 'day':
          const nextDay = new Date(currentDate);
          nextDay.setDate(nextDay.getDate() + 1);
          setCurrentDate(nextDay);
          break;
        case 'year':
          setCurrentDate(new Date(currentYear + 1, 0, 1));
          break;
      }
    };
    
    return {
      goToToday,
      goToPreviousPeriod,
      goToNextPeriod,
      canGoPrevious: true,
      canGoNext: true
    };
  }, [currentDate, viewMode]);
  
  // Get calendar grid data
  const getCalendarGrid = useMemo(() => {
    switch (viewMode) {
      case 'month':
        return getMonthGrid();
      case 'week':
        return getWeekGrid();
      case 'day':
        return getDayGrid();
      case 'year':
        return getYearGrid();
      default:
        return getMonthGrid();
    }
  }, [viewMode, currentDate, preferences]);
  
  // Month view grid
  const getMonthGrid = useCallback(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    
    // Adjust start date to include previous month's days
    const dayOfWeek = firstDay.getDay();
    const weekStart = preferences.weekStart;
    const daysToSubtract = (dayOfWeek - weekStart + 7) % 7;
    startDate.setDate(startDate.getDate() - daysToSubtract);
    
    const grid = [];
    const currentDateObj = new Date(startDate);
    
    while (currentDateObj <= lastDay || grid.length < 42) {
      const week = [];
      for (let i = 0; i < 7; i++) {
        const date = new Date(currentDateObj);
        const isCurrentMonth = date.getMonth() === month;
        const isToday = isSameDay(date, new Date());
        const isSelected = selectedDate && isSameDay(date, selectedDate);
        
        week.push({
          date,
          isCurrentMonth,
          isToday,
          isSelected,
          events: getEventsForDate(date)
        });
        
        currentDateObj.setDate(currentDateObj.getDate() + 1);
      }
      grid.push(week);
    }
    
    return grid;
  }, [currentDate, preferences, selectedDate, events]);
  
  // Week view grid
  const getWeekGrid = useCallback(() => {
    const weekStart = getWeekStart(currentDate, preferences.weekStart);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);
    
    const grid = [];
    const currentDateObj = new Date(weekStart);
    
    for (let day = 0; day < 7; day++) {
      const date = new Date(currentDateObj);
      const isToday = isSameDay(date, new Date());
      const isSelected = selectedDate && isSameDay(date, selectedDate);
      
      grid.push({
        date,
        isToday,
        isSelected,
        events: getEventsForDate(date),
        timeSlots: getTimeSlots(date)
      });
      
      currentDateObj.setDate(currentDateObj.getDate() + 1);
    }
    
    return grid;
  }, [currentDate, preferences, selectedDate, events]);
  
  // Day view grid
  const getDayGrid = useCallback(() => {
    const date = currentDate;
    const isToday = isSameDay(date, new Date());
    const isSelected = selectedDate && isSameDay(date, selectedDate);
    
    return {
      date,
      isToday,
      isSelected,
      events: getEventsForDate(date),
      timeSlots: getTimeSlots(date)
    };
  }, [currentDate, selectedDate, events]);
  
  // Year view grid
  const getYearGrid = useCallback(() => {
    const year = currentDate.getFullYear();
    const grid = [];
    
    for (let month = 0; month < 12; month++) {
      const monthDate = new Date(year, month, 1);
      const monthName = monthDate.toLocaleDateString('en-US', { month: 'short' });
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const firstDay = new Date(year, month, 1).getDay();
      
      grid.push({
        month,
        monthName,
        year,
        daysInMonth,
        firstDay,
        events: getEventsForMonth(year, month)
      });
    }
    
    return grid;
  }, [currentDate, events]);
  
  // Get time slots for day/week view
  const getTimeSlots = useCallback((date) => {
    const slots = [];
    const [startHour] = preferences.workingHours.start.split(':').map(Number);
    const [endHour] = preferences.workingHours.end.split(':').map(Number);
    
    for (let hour = startHour; hour < endHour; hour++) {
      const time = new Date(date);
      time.setHours(hour, 0, 0, 0);
      
      slots.push({
        time,
        hour,
        events: getEventsForTimeSlot(date, hour)
      });
    }
    
    return slots;
  }, [preferences, events]);
  
  // Event management
  const addEvent = useCallback((eventData) => {
    const newEvent = {
      id: Date.now().toString(),
      title: eventData.title,
      description: eventData.description || '',
      start: new Date(eventData.start),
      end: new Date(eventData.end),
      allDay: eventData.allDay || false,
      type: eventData.type || 'default',
      courseId: eventData.courseId,
      instructorId: eventData.instructorId,
      studentIds: eventData.studentIds || [],
      location: eventData.location || '',
      color: eventData.color || '#1976d2',
      ...eventData
    };
    
    setEvents(prev => [...prev, newEvent]);
    return newEvent;
  }, []);
  
  const updateEvent = useCallback((eventId, updates) => {
    setEvents(prev => 
      prev.map(event => 
        event.id === eventId ? { ...event, ...updates } : event
      )
    );
  }, []);
  
  const deleteEvent = useCallback((eventId) => {
    setEvents(prev => prev.filter(event => event.id !== eventId));
  }, []);
  
  const duplicateEvent = useCallback((eventId) => {
    const event = events.find(e => e.id === eventId);
    if (event) {
      const duplicatedEvent = {
        ...event,
        id: Date.now().toString(),
        title: `${event.title} (Copy)`,
        start: new Date(event.start.getTime() + 24 * 60 * 60 * 1000), // Next day
        end: new Date(event.end.getTime() + 24 * 60 * 60 * 1000)
      };
      
      setEvents(prev => [...prev, duplicatedEvent]);
      return duplicatedEvent;
    }
  }, [events]);
  
  // Event queries
  const getEventsForDate = useCallback((date) => {
    return events.filter(event => {
      if (event.allDay) {
        return isSameDay(event.start, date);
      }
      
      const eventStart = new Date(event.start);
      const eventEnd = new Date(event.end);
      const queryDate = new Date(date);
      
      return eventStart <= queryDate && eventEnd >= queryDate;
    });
  }, [events]);
  
  const getEventsForMonth = useCallback((year, month) => {
    return events.filter(event => {
      const eventDate = new Date(event.start);
      return eventDate.getFullYear() === year && eventDate.getMonth() === month;
    });
  }, [events]);
  
  const getEventsForTimeSlot = useCallback((date, hour) => {
    return events.filter(event => {
      if (event.allDay) return false;
      
      const eventStart = new Date(event.start);
      const eventEnd = new Date(event.end);
      const queryDate = new Date(date);
      queryDate.setHours(hour, 0, 0, 0);
      const nextHour = new Date(queryDate);
      nextHour.setHours(hour + 1, 0, 0, 0);
      
      return eventStart < nextHour && eventEnd > queryDate;
    });
  }, [events]);
  
  // Availability checking
  const checkAvailability = useCallback((start, end, excludeEventId = null) => {
    const conflictingEvents = events.filter(event => {
      if (event.id === excludeEventId) return false;
      
      const eventStart = new Date(event.start);
      const eventEnd = new Date(event.end);
      const queryStart = new Date(start);
      const queryEnd = new Date(end);
      
      return eventStart < queryEnd && eventEnd > queryStart;
    });
    
    return {
      available: conflictingEvents.length === 0,
      conflicts: conflictingEvents,
      conflictCount: conflictingEvents.length
    };
  }, [events]);
  
  // Working hours validation
  const isWithinWorkingHours = useCallback((time) => {
    const [startHour] = preferences.workingHours.start.split(':').map(Number);
    const [endHour] = preferences.workingHours.end.split(':').map(Number);
    const hour = time.getHours();
    
    return hour >= startHour && hour < endHour;
  }, [preferences]);
  
  // Utility functions
  const isSameDay = useCallback((date1, date2) => {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
  }, []);
  
  const getWeekStart = useCallback((date, weekStart) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : weekStart);
    return new Date(d.setDate(diff));
  }, []);
  
  // Export calendar data
  const exportCalendar = useCallback((format = 'json') => {
    const calendarData = {
      events,
      preferences,
      exportDate: new Date().toISOString(),
      version: '1.0'
    };
    
    if (format === 'json') {
      const blob = new Blob([JSON.stringify(calendarData, null, 2)], {
        type: 'application/json'
      });
      
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `calendar-${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);
    }
    
    return calendarData;
  }, [events, preferences]);
  
  // Import calendar data
  const importCalendar = useCallback(async (file) => {
    try {
      const text = await file.text();
      const calendarData = JSON.parse(text);
      
      if (calendarData.events && calendarData.version === '1.0') {
        setEvents(calendarData.events);
        if (calendarData.preferences) {
          setPreferences(prev => ({ ...prev, ...calendarData.preferences }));
        }
        return { success: true };
      } else {
        throw new Error('Invalid calendar file format');
      }
    } catch (error) {
      console.error('Error importing calendar:', error);
      return { success: false, error: error.message };
    }
  }, [setPreferences]);
  
  return {
    // Calendar state
    currentDate,
    selectedDate,
    viewMode,
    events,
    loading,
    error,
    preferences,
    
    // Navigation
    ...getCalendarNavigation,
    
    // Calendar data
    calendarGrid: getCalendarGrid,
    
    // Event management
    addEvent,
    updateEvent,
    deleteEvent,
    duplicateEvent,
    
    // Event queries
    getEventsForDate,
    getEventsForMonth,
    getEventsForTimeSlot,
    
    // Availability
    checkAvailability,
    isWithinWorkingHours,
    
    // Actions
    setCurrentDate,
    setSelectedDate,
    setViewMode,
    setPreferences,
    exportCalendar,
    importCalendar,
    
    // Utilities
    isSameDay,
    getWeekStart,
    
    // Computed values
    totalEvents: events.length,
    hasEvents: events.length > 0,
    currentMonth: currentDate.getMonth(),
    currentYear: currentDate.getFullYear()
  };
};

export default useCalendar;
