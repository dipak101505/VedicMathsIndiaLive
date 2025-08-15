import React, { useState, useEffect } from 'react';
// FeesPage - Common fees and payment interface for all user roles
// This component provides shared payment functionality that can be used
// by instructors, students, admins, and parents with role-specific views
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
  Paper,
  Chip,
  Avatar,
  Skeleton,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Divider,
} from '@mui/material';
import {
  Book as BookIcon,
  VideoCall as VideoCallIcon,
  ColorLens as ColorLensIcon,
  CheckCircle as CheckCircleIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { useAuth } from '../../../hooks';

const FeesPage = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [feesData, setFeesData] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Mock data structure - replace with actual API call
  const mockFeesData = {
    coursesEnrolled: 3,
    feesPending: 0,
    courses: [
      {
        id: 1,
        name: 'Advanced Mathematics',
        category: 'Mathematics',
        image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=300&fit=crop',
        status: 'No dues',
        pendingPayment: 0,
        icon: <BookIcon />,
        iconColor: '#FFD700',
        invoices: [
          {
            id: 1,
            invoiceDate: '07 Aug 2025',
            note: 'Invoice for Installment 3',
            dueDate: '22 Aug 2025',
            status: 'No dues',
            amount: 300,
          },
          {
            id: 2,
            invoiceDate: '30 Jul 2025',
            note: 'Invoice for Installment 2',
            dueDate: '14 Aug 2025',
            status: 'No dues',
            amount: 200,
          },
          {
            id: 3,
            invoiceDate: '28 Jul 2025',
            note: 'Invoice for Installment 1',
            dueDate: '12 Aug 2025',
            status: 'No dues',
            amount: 500,
          },
        ],
      },
      {
        id: 2,
        name: 'Subscription 1:1 Algebra',
        category: 'Mathematics',
        image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop',
        status: 'No dues',
        pendingPayment: 0,
        icon: <VideoCallIcon />,
        iconColor: '#4CAF50',
        invoices: [
          {
            id: 1,
            invoiceDate: '15 Aug 2025',
            note: 'Monthly Subscription',
            dueDate: '30 Aug 2025',
            status: 'No dues',
            amount: 150,
          },
        ],
      },
      {
        id: 3,
        name: 'Physics for Engineers',
        category: 'Physics',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
        status: 'No dues',
        pendingPayment: 0,
        icon: <ColorLensIcon />,
        iconColor: '#FF5722',
        invoices: [
          {
            id: 1,
            invoiceDate: '20 Aug 2025',
            note: 'Course Fee',
            dueDate: '05 Sep 2025',
            status: 'No dues',
            amount: 400,
          },
        ],
      },
    ],
  };

  useEffect(() => {
    // Simulate API call
    const fetchFeesData = async () => {
      try {
        setLoading(true);
        // Replace this with actual API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setFeesData(mockFeesData);
      } catch (err) {
        setError('Failed to load fees data. Please try again.');
        console.error('Error fetching fees data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeesData();
  }, []);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'no dues':
        return 'success';
      case 'pending':
        return 'warning';
      case 'overdue':
        return 'error';
      default:
        return 'default';
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const handleCourseClick = (course) => {
    setSelectedCourse(course);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedCourse(null);
  };

  const getTotalPendingInvoices = (course) => {
    return course.invoices.filter(invoice => invoice.status === 'Pending').length;
  };

  const getTotalPendingAmount = (course) => {
    return course.invoices
      .filter(invoice => invoice.status === 'Pending')
      .reduce((total, invoice) => total + invoice.amount, 0);
  };

  if (loading) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          Fees
        </Typography>
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Skeleton variant="rectangular" height={120} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Skeleton variant="rectangular" height={120} />
          </Grid>
        </Grid>
        <Skeleton variant="rectangular" height={400} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          Fees
        </Typography>
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Page Title */}
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold', color: 'text.primary' }}>
        Fees
      </Typography>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card 
            elevation={2}
            sx={{ 
              height: '100%',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
            }}
          >
            <CardContent sx={{ textAlign: 'center', py: 3 }}>
              <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
                {feesData.coursesEnrolled}
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9 }}>
                Courses Enrolled
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card 
            elevation={2}
            sx={{ 
              height: '100%',
              background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
              color: 'white',
            }}
          >
            <CardContent sx={{ textAlign: 'center', py: 3 }}>
              <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
                {formatCurrency(feesData.feesPending)}
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9 }}>
                Fees Pending
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Course Details Table */}
      <Card elevation={2}>
        <CardContent sx={{ p: 0 }}>
          <TableContainer component={Paper} elevation={0}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: 'grey.50' }}>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Course</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Pending Payment</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {feesData.courses.map((course) => (
                  <TableRow 
                    key={course.id} 
                    sx={{ 
                      '&:hover': { backgroundColor: 'grey.50' },
                      cursor: 'pointer',
                    }}
                    onClick={() => handleCourseClick(course)}
                  >
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar
                          sx={{
                            width: 56,
                            height: 56,
                            backgroundColor: course.iconColor,
                            color: 'white',
                          }}
                        >
                          {course.icon}
                        </Avatar>
                        <Box>
                          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                            {course.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {course.category}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        icon={<CheckCircleIcon />}
                        label={course.status}
                        color={getStatusColor(course.status)}
                        variant="outlined"
                        sx={{ fontWeight: 'bold' }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'success.main' }}>
                        {formatCurrency(course.pendingPayment)}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Additional Information */}
      {feesData.feesPending === 0 && (
        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Alert severity="success" sx={{ maxWidth: 600, mx: 'auto' }}>
            <Typography variant="body1">
              Great! You have no outstanding fees. All your enrolled courses are fully paid.
            </Typography>
          </Alert>
        </Box>
      )}

      {/* Course Details Modal */}
      <Dialog
        open={modalOpen}
        onClose={handleCloseModal}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            maxHeight: '90vh',
          },
        }}
      >
        {selectedCourse && (
          <>
            <DialogTitle sx={{ pb: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                    {selectedCourse.name}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {selectedCourse.category}
                  </Typography>
                </Box>
                <IconButton
                  onClick={handleCloseModal}
                  sx={{ color: 'text.secondary' }}
                >
                  <CloseIcon />
                </IconButton>
              </Box>
            </DialogTitle>
            
            <DialogContent sx={{ pt: 0 }}>
              {/* Summary Cards */}
              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={6}>
                  <Card sx={{ backgroundColor: 'grey.50', border: '1px solid', borderColor: 'grey.200' }}>
                    <CardContent sx={{ textAlign: 'center', py: 2 }}>
                      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                        {getTotalPendingInvoices(selectedCourse)}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Pending Invoices
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={6}>
                  <Card sx={{ backgroundColor: 'grey.50', border: '1px solid', borderColor: 'grey.200' }}>
                    <CardContent sx={{ textAlign: 'center', py: 2 }}>
                      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1, color: 'error.main' }}>
                        {formatCurrency(getTotalPendingAmount(selectedCourse))}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Pending Payment
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>

              <Divider sx={{ mb: 3 }} />

              {/* Invoices Table */}
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                Invoice Details
              </Typography>
              <TableContainer component={Paper} elevation={0}>
                <Table>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: 'grey.50' }}>
                      <TableCell sx={{ fontWeight: 'bold' }}>Invoice date</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Note</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Due date</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Amount</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedCourse.invoices.map((invoice) => (
                      <TableRow key={invoice.id} sx={{ '&:hover': { backgroundColor: 'grey.50' } }}>
                        <TableCell>{invoice.invoiceDate}</TableCell>
                        <TableCell>{invoice.note}</TableCell>
                        <TableCell>{invoice.dueDate}</TableCell>
                        <TableCell>
                          <Chip
                            icon={<CheckCircleIcon />}
                            label={invoice.status}
                            color={getStatusColor(invoice.status)}
                            variant="outlined"
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                            {formatCurrency(invoice.amount)}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </DialogContent>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default FeesPage;
