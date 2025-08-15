import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from '@mui/material';

const PayoutsTab = ({ payoutsData }) => {
  return (
    <Card elevation={2}>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
          Session Payouts
        </Typography>
        
        {/* Summary Cards */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ backgroundColor: 'primary.50', border: '1px solid', borderColor: 'primary.200' }}>
              <CardContent sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="h4" color="primary.main" sx={{ fontWeight: 600 }}>
                  8
                </Typography>
                <Typography variant="body2" color="primary.main">
                  All Sessions
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ backgroundColor: 'success.50', border: '1px solid', borderColor: 'success.200' }}>
              <CardContent sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="h4" color="success.main" sx={{ fontWeight: 600 }}>
                  0
                </Typography>
                <Typography variant="body2" color="success.main">
                  All Payouts (USD 0)
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ backgroundColor: 'warning.50', border: '1px solid', borderColor: 'warning.200' }}>
              <CardContent sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="h4" color="warning.main" sx={{ fontWeight: 600 }}>
                  0
                </Typography>
                <Typography variant="body2" color="warning.main">
                  Payouts in Review (USD 0)
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ backgroundColor: 'info.50', border: '1px solid', borderColor: 'info.200' }}>
              <CardContent sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="h4" color="info.main" sx={{ fontWeight: 600 }}>
                  0
                </Typography>
                <Typography variant="body2" color="info.main">
                  Payouts Approved (USD 0)
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Sessions Table */}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: 'grey.50' }}>
                <TableCell sx={{ fontWeight: 600, color: 'text.primary' }}>Session Info</TableCell>
                <TableCell sx={{ fontWeight: 600, color: 'text.primary' }}>Course</TableCell>
                <TableCell sx={{ fontWeight: 600, color: 'text.primary' }}>Payouts</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {payoutsData.sessions.map((session) => (
                <TableRow key={session.id} sx={{ '&:hover': { backgroundColor: 'grey.50' } }}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {session.date} • {session.time}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {session.duration}
                        </Typography>
                        {session.participants && (
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
                            <Box sx={{ 
                              width: 16, 
                              height: 16, 
                              borderRadius: '50%', 
                              backgroundColor: 'grey.400',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}>
                              <Typography variant="caption" sx={{ fontSize: '0.6rem', color: 'white' }}>
                                {session.participants}
                              </Typography>
                            </Box>
                            {session.circles && Array.from({ length: session.circles }).map((_, index) => (
                              <Box
                                key={index}
                                sx={{
                                  width: 12,
                                  height: 12,
                                  borderRadius: '50%',
                                  backgroundColor: 'grey.300'
                                }}
                              />
                            ))}
                          </Box>
                        )}
                      </Box>
                      {session.status === 'completed' && (
                        <Chip
                          label="Completed"
                          size="small"
                          color="success"
                          sx={{ fontSize: '0.7rem' }}
                        />
                      )}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {session.courseType}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {session.courseName}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: session.payoutStatus === 'feedback_pending' ? 'purple.main' : 
                               session.payoutStatus === 'no_payout_set' ? 'text.secondary' : 'text.primary',
                        fontWeight: 500
                      }}
                    >
                      {session.payoutStatus === 'feedback_pending' ? 'Feedback Pending' :
                       session.payoutStatus === 'no_payout_set' ? 'No Payout Set' : '-'}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default PayoutsTab;
