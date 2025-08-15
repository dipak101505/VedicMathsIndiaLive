import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from '@mui/material';

const CourseTab = ({ payoutsData }) => {
  return (
    <Card elevation={2}>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
          Course Payouts
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: 'grey.50' }}>
                <TableCell sx={{ fontWeight: 600, color: 'text.primary' }}>Course</TableCell>
                <TableCell sx={{ fontWeight: 600, color: 'text.primary' }}>Learners</TableCell>
                <TableCell sx={{ fontWeight: 600, color: 'text.primary' }}>Admins</TableCell>
                <TableCell sx={{ fontWeight: 600, color: 'text.primary' }}>Payout per credit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {payoutsData.coursePayouts.map((course) => (
                <TableRow key={course.id} sx={{ '&:hover': { backgroundColor: 'grey.50' } }}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {course.courseName}
                      </Typography>
                      <Chip
                        label={course.courseType === 'group' ? 'Group course' : '1:1 course'}
                        size="small"
                        color={course.courseType === 'group' ? 'success' : 'info'}
                        sx={{ fontSize: '0.75rem' }}
                      />
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {course.learners.find(l => l.isPrimary)?.name}
                      </Typography>
                      {course.learners.length > 1 && (
                        <Typography variant="caption" color="text.secondary">
                          +{course.learners.length - 1}
                        </Typography>
                      )}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography variant="body2" color="text.secondary">
                        {course.admin || '-'}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        USD {course.payoutPerCredit.toLocaleString()}
                      </Typography>
                    </Box>
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

export default CourseTab;
