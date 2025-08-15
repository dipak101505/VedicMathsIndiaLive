import React, { useState } from 'react';
import {
  Box,
  Typography,
  FormControl,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  TextField,
  IconButton,
  Card,
  CardContent,
  Grid,
  Button,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const WorkingHoursPage = () => {
  const [timezone, setTimezone] = useState('Asia/Kolkata');
  const [workingHours, setWorkingHours] = useState({
    sunday: { enabled: true, startTime: '09:00', endTime: '17:00' },
    monday: { enabled: true, startTime: '09:00', endTime: '17:00' },
    tuesday: { enabled: true, startTime: '09:00', endTime: '17:00' },
    wednesday: { enabled: true, startTime: '09:00', endTime: '17:00' },
    thursday: { enabled: true, startTime: '09:00', endTime: '17:00' },
    friday: { enabled: true, startTime: '09:00', endTime: '17:00' },
    saturday: { enabled: true, startTime: '09:00', endTime: '17:00' },
  });

  // Timezone options
  const timezones = [
    { value: 'Asia/Kolkata', label: '(GMT +05:30) Asia/Kolkata' },
    { value: 'America/New_York', label: '(GMT -05:00) America/New_York' },
    { value: 'Europe/London', label: '(GMT +00:00) Europe/London' },
    { value: 'Asia/Tokyo', label: '(GMT +09:00) Asia/Tokyo' },
    { value: 'Australia/Sydney', label: '(GMT +10:00) Australia/Sydney' },
  ];

  // Generate time options for dropdowns (15-minute intervals)
  const generateTimeOptions = () => {
    const times = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        const displayTime = new Date(`2000-01-01T${time}:00`).toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        });
        times.push({ value: time, label: displayTime });
      }
    }
    return times;
  };

  const timeOptions = generateTimeOptions();

  // Handle day toggle
  const handleDayToggle = (day) => {
    setWorkingHours(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        enabled: !prev[day].enabled
      }
    }));
  };

  // Handle time change
  const handleTimeChange = (day, field, value) => {
    setWorkingHours(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value
      }
    }));
  };

  // Handle delete day
  const handleDeleteDay = (day) => {
    setWorkingHours(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        enabled: false,
        startTime: '09:00',
        endTime: '17:00'
      }
    }));
  };

  // Handle add time slot (placeholder for future implementation)
  const handleAddTimeSlot = (day) => {
    console.log(`Adding time slot for ${day}`);
    // This could be implemented to add multiple time slots per day
  };

  // Format time for display
  const formatTimeForDisplay = (time) => {
    const [hours, minutes] = time.split(':');
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes));
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  // Save working hours
  const handleSave = () => {
    console.log('Saving working hours:', { timezone, workingHours });
    // Implement save functionality
  };

  // Reset to defaults
  const handleReset = () => {
    setWorkingHours({
      sunday: { enabled: true, startTime: '09:00', endTime: '17:00' },
      monday: { enabled: true, startTime: '09:00', endTime: '17:00' },
      tuesday: { enabled: true, startTime: '09:00', endTime: '17:00' },
      wednesday: { enabled: true, startTime: '09:00', endTime: '17:00' },
      thursday: { enabled: true, startTime: '09:00', endTime: '17:00' },
      friday: { enabled: true, startTime: '09:00', endTime: '17:00' },
      saturday: { enabled: true, startTime: '09:00', endTime: '17:00' },
    });
    setTimezone('Asia/Kolkata');
  };

  const days = [
    { key: 'sunday', label: 'SUNDAY' },
    { key: 'monday', label: 'MONDAY' },
    { key: 'tuesday', label: 'TUESDAY' },
    { key: 'wednesday', label: 'WEDNESDAY' },
    { key: 'thursday', label: 'THURSDAY' },
    { key: 'friday', label: 'FRIDAY' },
    { key: 'saturday', label: 'SATURDAY' },
  ];

  return (
    <Box sx={{ p: 2, maxWidth: 900, mx: 'auto' }}>
      {/* Header */}
      <Typography variant="h4" component="h1" sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}>
        Working Hours
      </Typography>

      {/* Timezone Selection */}
      <Card elevation={2} sx={{ mb: 3 }}>
        <CardContent sx={{ py: 2, px: 3 }}>
          <Typography variant="h6" sx={{ mb: 1.5, fontWeight: 600, color: 'text.primary' }}>
            Select your timezone
          </Typography>
          <FormControl sx={{ minWidth: 280 }}>
            <Select
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              displayEmpty
              size="small"
            >
              {timezones.map((tz) => (
                <MenuItem key={tz.value} value={tz.value}>
                  {tz.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </CardContent>
      </Card>

      {/* Daily Working Hours */}
      <Card elevation={2}>
        <CardContent sx={{ py: 2, px: 3 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}>
            Daily Schedule
          </Typography>
          
          {days.map((day, index) => (
            <Box
              key={day.key}
              sx={{
                p: 1.5,
                mb: index === days.length - 1 ? 0 : 1,
                border: '1px solid',
                borderColor: 'grey.200',
                borderRadius: 1,
                backgroundColor: 'background.paper',
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                '&:hover': {
                  backgroundColor: 'grey.50',
                  borderColor: 'grey.300',
                },
                transition: 'all 0.2s ease-in-out',
              }}
            >
              {/* Day Checkbox */}
              <FormControlLabel
                control={
                  <Checkbox
                    checked={workingHours[day.key].enabled}
                    onChange={() => handleDayToggle(day.key)}
                    color="primary"
                    size="small"
                  />
                }
                label={
                  <Typography variant="body2" sx={{ fontWeight: 600, textTransform: 'uppercase', fontSize: '0.875rem' }}>
                    {day.label}
                  </Typography>
                }
                sx={{ minWidth: 100, m: 0 }}
              />

              {/* Time Range */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1 }}>
                <FormControl size="small" sx={{ minWidth: 110 }}>
                  <Select
                    value={workingHours[day.key].startTime}
                    onChange={(e) => handleTimeChange(day.key, 'startTime', e.target.value)}
                    disabled={!workingHours[day.key].enabled}
                    startAdornment={<AccessTimeIcon sx={{ mr: 0.5, fontSize: 16, color: 'text.secondary' }} />}
                    sx={{
                      '& .MuiSelect-select': {
                        py: 0.75,
                        px: 1,
                        fontSize: '0.875rem',
                      }
                    }}
                  >
                    {timeOptions.map((time) => (
                      <MenuItem key={time.value} value={time.value} sx={{ fontSize: '0.875rem' }}>
                        {time.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <Typography variant="body2" sx={{ mx: 0.5, color: 'text.secondary', fontWeight: 500 }}>
                  -
                </Typography>

                <FormControl size="small" sx={{ minWidth: 110 }}>
                  <Select
                    value={workingHours[day.key].endTime}
                    onChange={(e) => handleTimeChange(day.key, 'endTime', e.target.value)}
                    disabled={!workingHours[day.key].enabled}
                    startAdornment={<AccessTimeIcon sx={{ mr: 0.5, fontSize: 16, color: 'text.secondary' }} />}
                    sx={{
                      '& .MuiSelect-select': {
                        py: 0.75,
                        px: 1,
                        fontSize: '0.875rem',
                      }
                    }}
                  >
                    {timeOptions.map((time) => (
                      <MenuItem key={time.value} value={time.value} sx={{ fontSize: '0.875rem' }}>
                        {time.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              {/* Action Buttons */}
              <Box sx={{ display: 'flex', gap: 0.5 }}>
                <IconButton
                  size="small"
                  onClick={() => handleDeleteDay(day.key)}
                  disabled={!workingHours[day.key].enabled}
                  sx={{ 
                    color: 'error.main',
                    width: 32,
                    height: 32,
                    '&:hover': {
                      backgroundColor: 'error.50',
                    }
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => handleAddTimeSlot(day.key)}
                  disabled={!workingHours[day.key].enabled}
                  sx={{ 
                    color: 'primary.main',
                    width: 32,
                    height: 32,
                    '&:hover': {
                      backgroundColor: 'primary.50',
                    }
                  }}
                >
                  <AddIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>
          ))}
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <Box sx={{ display: 'flex', gap: 2, mt: 3, justifyContent: 'flex-end' }}>
        <Button
          variant="outlined"
          onClick={handleReset}
          size="medium"
          sx={{ minWidth: 100, px: 3 }}
        >
          Reset
        </Button>
        <Button
          variant="contained"
          onClick={handleSave}
          size="medium"
          sx={{ minWidth: 100, px: 3 }}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default WorkingHoursPage;
