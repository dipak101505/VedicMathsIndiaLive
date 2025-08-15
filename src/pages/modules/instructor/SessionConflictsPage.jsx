import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import WarningIcon from '@mui/icons-material/Warning';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import ScheduleIcon from '@mui/icons-material/Schedule';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';

const SessionConflictsPage = () => {
  const [conflicts, setConflicts] = useState([
    {
      id: 1,
      courseName: 'Subscription 1:1 Algebra',
      courseType: 'Mathematics',
      date: '15 Aug 25',
      time: '05:57 PM',
      conflictType: 'instructor_unavailable',
      conflictMessage: 'Instructor unavailable',
      severity: 'high'
    },
    {
      id: 2,
      courseName: 'Subscription 1:1 Algebra',
      courseType: 'Mathematics',
      date: '15 Aug 25',
      time: '06:09 PM',
      conflictType: 'instructor_unavailable',
      conflictMessage: 'Instructor unavailable',
      severity: 'high'
    }
  ]);

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedConflict, setSelectedConflict] = useState(null);

  // Handle menu open
  const handleMenuOpen = (event, conflict) => {
    setAnchorEl(event.currentTarget);
    setSelectedConflict(conflict);
  };

  // Handle menu close
  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedConflict(null);
  };

  // Handle menu actions
  const handleMenuAction = (action) => {
    if (selectedConflict) {
      switch (action) {
        case 'edit':
          console.log('Edit conflict:', selectedConflict.id);
          break;
        case 'delete':
          console.log('Delete conflict:', selectedConflict.id);
          break;
        case 'refresh':
          console.log('Refresh conflict:', selectedConflict.id);
          break;
        default:
          break;
      }
    }
    handleMenuClose();
  };

  // Get conflict severity color
  const getConflictColor = (severity) => {
    switch (severity) {
      case 'high':
        return 'error';
      case 'medium':
        return 'warning';
      case 'low':
        return 'info';
      default:
        return 'default';
    }
  };

  // Get conflict icon
  const getConflictIcon = (conflictType) => {
    switch (conflictType) {
      case 'instructor_unavailable':
        return <WarningIcon sx={{ fontSize: 18, color: 'error.main' }} />;
      case 'room_conflict':
        return <WarningIcon sx={{ fontSize: 18, color: 'warning.main' }} />;
      case 'time_conflict':
        return <WarningIcon sx={{ fontSize: 18, color: 'info.main' }} />;
      default:
        return <WarningIcon sx={{ fontSize: 18, color: 'error.main' }} />;
    }
  };

  return (
    <Box sx={{ p: 2, maxWidth: 1200, mx: 'auto' }}>
      {/* Header */}
      <Typography variant="h4" component="h1" sx={{ mb: 3, fontWeight: 600, color: 'text.primary' }}>
        Session Conflicts
      </Typography>

      {/* Conflicts Table */}
      <Card elevation={2}>
        <CardContent sx={{ py: 2, px: 3 }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: 'grey.50' }}>
                  <TableCell sx={{ fontWeight: 600, color: 'text.primary', py: 2, width: '35%' }}>
                    Course
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: 'text.primary', py: 2, width: '20%' }}>
                    Date
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: 'text.primary', py: 2, width: '20%' }}>
                    Time
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: 'text.primary', py: 2, width: '20%' }}>
                    Conflict
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: 'text.primary', py: 2, width: '5%' }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {conflicts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} sx={{ textAlign: 'center', py: 4, color: 'text.secondary' }}>
                      <Typography variant="body1">
                        No session conflicts found
                      </Typography>
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        All sessions are properly scheduled
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  conflicts.map((conflict) => (
                    <TableRow 
                      key={conflict.id} 
                      sx={{ 
                        '&:hover': { backgroundColor: 'grey.50' },
                        transition: 'background-color 0.2s ease-in-out'
                      }}
                    >
                      {/* Course Column */}
                      <TableCell sx={{ py: 1.5 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                          <Box sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            width: 32,
                            height: 32,
                            borderRadius: '50%',
                            backgroundColor: 'primary.50',
                            color: 'primary.main'
                          }}>
                            <LightbulbIcon sx={{ fontSize: 18 }} />
                          </Box>
                          <Box>
                            <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.primary' }}>
                              {conflict.courseName}
                            </Typography>
                            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                              {conflict.courseType}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>

                      {/* Date Column */}
                      <TableCell sx={{ py: 1.5 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <CalendarTodayIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                          <Typography variant="body2">
                            {conflict.date}
                          </Typography>
                        </Box>
                      </TableCell>

                      {/* Time Column */}
                      <TableCell sx={{ py: 1.5 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <ScheduleIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                          <Typography variant="body2">
                            {conflict.time}
                          </Typography>
                        </Box>
                      </TableCell>

                      {/* Conflict Column */}
                      <TableCell sx={{ py: 1.5 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {getConflictIcon(conflict.conflictType)}
                          <Typography variant="body2" sx={{ color: 'error.main' }}>
                            Instructor unavailable
                          </Typography>
                        </Box>
                      </TableCell>

                      {/* Actions Column */}
                      <TableCell sx={{ py: 1.5 }}>
                        <IconButton
                          size="small"
                          onClick={(e) => handleMenuOpen(e, conflict)}
                          sx={{ 
                            color: 'text.secondary',
                            '&:hover': {
                              backgroundColor: 'grey.100',
                            }
                          }}
                        >
                          <MoreVertIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={() => handleMenuAction('edit')}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit Session</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleMenuAction('refresh')}>
          <ListItemIcon>
            <RefreshIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Refresh Status</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleMenuAction('delete')} sx={{ color: 'error.main' }}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText>Delete Session</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default SessionConflictsPage;
