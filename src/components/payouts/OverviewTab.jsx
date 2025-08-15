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

const OverviewTab = ({ payoutsData }) => {
  return (
    <Box>
      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={2}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="primary.main" sx={{ fontWeight: 600, mb: 1 }}>
                {payoutsData.totalSessions}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Sessions
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={2}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="success.main" sx={{ fontWeight: 600, mb: 1 }}>
                ${payoutsData.totalPayouts.toLocaleString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Payouts
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={2}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="warning.main" sx={{ fontWeight: 600, mb: 1 }}>
                {payoutsData.pendingPayouts}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Pending Payouts
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={2}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="info.main" sx={{ fontWeight: 600, mb: 1 }}>
                {payoutsData.completedPayouts}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Completed Payouts
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts Section */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Card elevation={2}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Sessions by Month
              </Typography>
              <Box sx={{ height: 200, display: 'flex', alignItems: 'end', gap: 1 }}>
                {payoutsData.sessionsByMonth.map((month, index) => (
                  <Box
                    key={month.month}
                    sx={{
                      flex: 1,
                      height: `${(month.sessions / Math.max(...payoutsData.sessionsByMonth.map(m => m.sessions))) * 100}%`,
                      backgroundColor: 'primary.main',
                      borderRadius: '4px 4px 0 0',
                      minHeight: 20,
                    }}
                  />
                ))}
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                {payoutsData.sessionsByMonth.map((month) => (
                  <Typography key={month.month} variant="caption" color="text.secondary">
                    {month.month}
                  </Typography>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card elevation={2}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Payouts by Month
              </Typography>
              <Box sx={{ height: 200, display: 'flex', alignItems: 'end', gap: 1 }}>
                {payoutsData.payoutsByMonth.map((month, index) => (
                  <Box
                    key={month.month}
                    sx={{
                      flex: 1,
                      height: `${(month.payouts / Math.max(...payoutsData.payoutsByMonth.map(m => m.payouts))) * 100}%`,
                      backgroundColor: 'success.main',
                      borderRadius: '4px 4px 0 0',
                      minHeight: 20,
                    }}
                  />
                ))}
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                {payoutsData.payoutsByMonth.map((month) => (
                  <Typography key={month.month} variant="caption" color="text.secondary">
                    {month.month}
                  </Typography>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Tables Section */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card elevation={2}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Recent Sessions
              </Typography>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow sx={{ backgroundColor: 'grey.50' }}>
                      <TableCell sx={{ fontWeight: 600, color: 'text.primary' }}>Session</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: 'text.primary' }}>Course</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: 'text.primary' }}>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {payoutsData.recentSessions.map((session) => (
                      <TableRow key={session.id} sx={{ '&:hover': { backgroundColor: 'grey.50' } }}>
                        <TableCell>
                          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                              {session.date}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {session.duration}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {session.courseName}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={session.status}
                            size="small"
                            color={session.status === 'completed' ? 'success' : 'warning'}
                            sx={{ fontSize: '0.7rem' }}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card elevation={2}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Recent Payouts
              </Typography>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow sx={{ backgroundColor: 'grey.50' }}>
                      <TableCell sx={{ fontWeight: 600, color: 'text.primary' }}>Date</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: 'text.primary' }}>Amount</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: 'text.primary' }}>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {payoutsData.recentPayouts.map((payout) => (
                      <TableRow key={payout.id} sx={{ '&:hover': { backgroundColor: 'grey.50' } }}>
                        <TableCell>
                          <Typography variant="body2">
                            {payout.date}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            ${payout.amount.toLocaleString()}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={payout.status}
                            size="small"
                            color={payout.status === 'completed' ? 'success' : 'warning'}
                            sx={{ fontSize: '0.7rem' }}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OverviewTab;
