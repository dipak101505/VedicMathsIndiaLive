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
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const LeavesPage = () => {
  const [leaves, setLeaves] = useState([
    {
      id: 1,
      date: '15 Aug 2025',
      numberOfDays: 1,
      reason: 'fever',
      status: 'approved'
    }
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [newLeave, setNewLeave] = useState({
    date: '',
    numberOfDays: 1,
    reason: '',
    status: 'pending'
  });

  // Handle delete leave
  const handleDeleteLeave = (id) => {
    setLeaves(prev => prev.filter(leave => leave.id !== id));
  };

  // Handle add leave dialog
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNewLeave({
      date: '',
      numberOfDays: 1,
      reason: '',
      status: 'pending'
    });
  };

  // Handle input changes
  const handleInputChange = (field, value) => {
    setNewLeave(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle submit new leave
  const handleSubmitLeave = () => {
    if (newLeave.date && newLeave.reason) {
      const leaveToAdd = {
        ...newLeave,
        id: Date.now(),
        date: new Date(newLeave.date).toLocaleDateString('en-US', {
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        })
      };
      
      setLeaves(prev => [...prev, leaveToAdd]);
      handleCloseDialog();
    }
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'success';
      case 'pending':
        return 'warning';
      case 'rejected':
        return 'error';
      default:
        return 'default';
    }
  };

  // Get status label
  const getStatusLabel = (status) => {
    switch (status) {
      case 'approved':
        return 'Approved';
      case 'pending':
        return 'Pending';
      case 'rejected':
        return 'Rejected';
      default:
        return status;
    }
  };

  return (
    <Box sx={{ p: 2, maxWidth: 1000, mx: 'auto' }}>
      {/* Header */}
      <Typography variant="h4" component="h1" sx={{ mb: 3, fontWeight: 600, color: 'text.primary' }}>
        Leaves
      </Typography>

      {/* Leaves Table */}
      <Card elevation={2}>
        <CardContent sx={{ py: 2, px: 3 }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: 'grey.50' }}>
                  <TableCell sx={{ fontWeight: 600, color: 'text.primary', py: 2 }}>
                    Dates
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: 'text.primary', py: 2 }}>
                    Number of days
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: 'text.primary', py: 2 }}>
                    Reason
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: 'text.primary', py: 2 }}>
                    Status
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: 'text.primary', py: 2, width: 80 }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {leaves.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} sx={{ textAlign: 'center', py: 4, color: 'text.secondary' }}>
                      <Typography variant="body1">
                        No leave records found
                      </Typography>
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        Click "Add Leave" to create your first leave request
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  leaves.map((leave) => (
                    <TableRow 
                      key={leave.id} 
                      sx={{ 
                        '&:hover': { backgroundColor: 'grey.50' },
                        transition: 'background-color 0.2s ease-in-out'
                      }}
                    >
                      <TableCell sx={{ py: 1.5 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <CalendarTodayIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {leave.date}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ py: 1.5 }}>
                        <Typography variant="body2">
                          {leave.numberOfDays} day{leave.numberOfDays > 1 ? 's' : ''}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ py: 1.5 }}>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {leave.reason}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ py: 1.5 }}>
                        <Chip
                          label={getStatusLabel(leave.status)}
                          size="small"
                          color={getStatusColor(leave.status)}
                          sx={{ fontSize: '0.75rem', fontWeight: 500 }}
                        />
                      </TableCell>
                      <TableCell sx={{ py: 1.5 }}>
                        <IconButton
                          size="small"
                          onClick={() => handleDeleteLeave(leave.id)}
                          sx={{ 
                            color: 'error.main',
                            '&:hover': {
                              backgroundColor: 'error.50',
                            }
                          }}
                        >
                          <DeleteIcon fontSize="small" />
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

      {/* Add Leave Button */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={handleOpenDialog}
          sx={{ 
            px: 3,
            py: 1,
            borderColor: 'primary.main',
            color: 'primary.main',
            '&:hover': {
              borderColor: 'primary.dark',
              backgroundColor: 'primary.50',
            }
          }}
        >
          Add Leave
        </Button>
      </Box>

      {/* Add Leave Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ pb: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Add Leave Request
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Leave Date"
              type="date"
              value={newLeave.date}
              onChange={(e) => handleInputChange('date', e.target.value)}
              fullWidth
              InputLabelProps={{ shrink: true }}
              required
            />
            
            <TextField
              label="Number of Days"
              type="number"
              value={newLeave.numberOfDays}
              onChange={(e) => handleInputChange('numberOfDays', parseInt(e.target.value) || 1)}
              fullWidth
              inputProps={{ min: 1, max: 30 }}
              required
            />
            
            <TextField
              label="Reason"
              value={newLeave.reason}
              onChange={(e) => handleInputChange('reason', e.target.value)}
              fullWidth
              multiline
              rows={3}
              placeholder="Please provide a brief reason for your leave request..."
              required
            />
            
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={newLeave.status}
                onChange={(e) => handleInputChange('status', e.target.value)}
                label="Status"
              >
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="approved">Approved</MenuItem>
                <MenuItem value="rejected">Rejected</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleCloseDialog} variant="outlined">
            Cancel
          </Button>
          <Button 
            onClick={handleSubmitLeave} 
            variant="contained"
            disabled={!newLeave.date || !newLeave.reason}
          >
            Submit Leave Request
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default LeavesPage;
