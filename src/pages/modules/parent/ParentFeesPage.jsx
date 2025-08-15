import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
  Avatar,
} from '@mui/material';
import {
  Payment as PaymentIcon,
  Book as BookIcon,
  Person as PersonIcon,
} from '@mui/icons-material';

const ParentFeesPage = () => {
  const [fees, setFees] = useState([
    {
      id: 1,
      courseName: 'Custom 1:1 Literature',
      courseType: 'English',
      learner: 'Emma Williams',
      status: 'no_dues',
      pendingPayment: 0,
      thumbnail: '📚'
    },
    {
      id: 2,
      courseName: 'Advanced Mathematics',
      courseType: 'Mathematics',
      learner: 'Liam Smith',
      status: 'no_dues',
      pendingPayment: 0,
      thumbnail: '📐'
    },
    {
      id: 3,
      courseName: 'Physics for Engineers',
      courseType: 'Physics',
      learner: 'Emma Williams',
      status: 'no_dues',
      pendingPayment: 0,
      thumbnail: '🔬'
    },
    {
      id: 4,
      courseName: 'Advanced Mathematics',
      courseType: 'Mathematics',
      learner: 'Emma Williams',
      status: 'overdue',
      pendingPayment: 1000,
      thumbnail: '📐'
    },
    {
      id: 5,
      courseName: 'Physics for Engineers',
      courseType: 'Physics',
      learner: 'Liam Smith',
      status: 'overdue',
      pendingPayment: 1000,
      thumbnail: '🔬'
    }
  ]);

  // Calculate summary
  const summary = {
    totalLearners: 2,
    totalCourses: 5,
    totalPendingFees: fees.reduce((sum, fee) => sum + fee.pendingPayment, 0)
  };

  // Get status color and label
  const getStatusInfo = (status) => {
    switch (status) {
      case 'no_dues':
        return { color: 'success', label: 'No dues' };
      case 'overdue':
        return { color: 'error', label: 'Overdue' };
      case 'pending':
        return { color: 'warning', label: 'Pending' };
      default:
        return { color: 'default', label: status };
    }
  };

  // Handle payment
  const handlePayment = (fee) => {
    console.log('Processing payment for:', fee);
    // In a real app, you would redirect to payment gateway
  };

  return (
    <Box sx={{ p: 2, maxWidth: 1200, mx: 'auto' }}>
      {/* Header */}
      <Typography variant="h4" component="h1" sx={{ mb: 3, fontWeight: 600, color: 'text.primary' }}>
        Fees
      </Typography>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={4}>
          <Card elevation={2}>
            <CardContent sx={{ textAlign: 'center', py: 3 }}>
              <Typography variant="h3" color="primary.main" sx={{ fontWeight: 600, mb: 1 }}>
                {summary.totalLearners}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                My Learners
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card elevation={2}>
            <CardContent sx={{ textAlign: 'center', py: 3 }}>
              <Typography variant="h3" color="info.main" sx={{ fontWeight: 600, mb: 1 }}>
                {summary.totalCourses}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Courses Enrolled
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card elevation={2}>
            <CardContent sx={{ py: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ textAlign: 'left' }}>
                  <Typography variant="h3" color="warning.main" sx={{ fontWeight: 600, mb: 1 }}>
                    USD {summary.totalPendingFees.toLocaleString()}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Fees Pending
                  </Typography>
                </Box>
                {summary.totalPendingFees > 0 && (
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<PaymentIcon />}
                    onClick={() => console.log('Pay all dues')}
                    sx={{ fontSize: '0.875rem' }}
                  >
                    Pay Dues
                  </Button>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Fees Table */}
      <Card elevation={2}>
        <CardContent sx={{ py: 2, px: 3 }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: 'grey.50' }}>
                  <TableCell sx={{ fontWeight: 600, color: 'text.primary', py: 2, width: '40%' }}>
                    Course
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: 'text.primary', py: 2, width: '25%' }}>
                    Learner
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: 'text.primary', py: 2, width: '20%' }}>
                    Status
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: 'text.primary', py: 2, width: '15%' }}>
                    Pending Payment
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {fees.map((fee) => {
                  const statusInfo = getStatusInfo(fee.status);
                  return (
                    <TableRow 
                      key={fee.id} 
                      sx={{ 
                        '&:hover': { backgroundColor: 'grey.50' },
                        transition: 'background-color 0.2s ease-in-out'
                      }}
                    >
                      {/* Course Column */}
                      <TableCell sx={{ py: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Box sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            width: 48,
                            height: 48,
                            borderRadius: 1,
                            backgroundColor: 'grey.100',
                            fontSize: '24px'
                          }}>
                            {fee.thumbnail}
                          </Box>
                          <Box>
                            <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.primary' }}>
                              {fee.courseName}
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                              {fee.courseType}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>

                      {/* Learner Column */}
                      <TableCell sx={{ py: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                          <Avatar 
                            sx={{ 
                              width: 32, 
                              height: 32, 
                              backgroundColor: 'primary.main',
                              fontSize: '0.875rem',
                              fontWeight: 600
                            }}
                          >
                            {fee.learner.charAt(0)}
                          </Avatar>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {fee.learner}
                          </Typography>
                        </Box>
                      </TableCell>

                      {/* Status Column */}
                      <TableCell sx={{ py: 2 }}>
                        <Chip
                          label={statusInfo.label}
                          size="small"
                          color={statusInfo.color}
                          sx={{ 
                            fontSize: '0.75rem',
                            fontWeight: 500
                          }}
                        />
                      </TableCell>

                      {/* Pending Payment Column */}
                      <TableCell sx={{ py: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            ${fee.pendingPayment.toLocaleString()}
                          </Typography>
                          {fee.pendingPayment > 0 && (
                            <Button
                              size="small"
                              variant="contained"
                              color="primary"
                              onClick={() => handlePayment(fee)}
                              sx={{ 
                                fontSize: '0.75rem',
                                py: 0.5,
                                px: 1.5,
                                minWidth: 'auto'
                              }}
                            >
                              Pay now
                            </Button>
                          )}
                        </Box>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ParentFeesPage;
