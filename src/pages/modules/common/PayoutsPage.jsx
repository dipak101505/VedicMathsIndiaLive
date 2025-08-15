import React, { useState } from 'react';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Button,
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import DownloadIcon from '@mui/icons-material/Download';
import RefreshIcon from '@mui/icons-material/Refresh';
import OverviewTab from '../../../components/payouts/OverviewTab';
import CourseTab from '../../../components/payouts/CourseTab';
import PayoutsTab from '../../../components/payouts/PayoutsTab';

const PayoutsPage = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [loading, setLoading] = useState(false);

  // Mock data - replace with actual API calls
  const [payoutsData] = useState({
    summary: {
      coursesAssigned: 12,
      allSessions: 156,
      duration: '89h 32m',
      totalEarnings: 2840.50,
    },
    coursePayouts: [
      {
        id: 1,
        courseName: 'Advanced Mathematics',
        courseType: 'group',
        learners: [
          { name: 'John Smith', isPrimary: true },
          { name: 'Emma Wilson', isPrimary: false },
          { name: 'Michael Brown', isPrimary: false },
        ],
        admin: 'Dr. Sarah Johnson',
        payoutPerCredit: 45,
      },
      {
        id: 2,
        courseName: 'Physics Fundamentals',
        courseType: '1:1',
        learners: [
          { name: 'Alice Davis', isPrimary: true },
        ],
        admin: 'Prof. Robert Chen',
        payoutPerCredit: 60,
      },
      {
        id: 3,
        courseName: 'Chemistry Lab',
        courseType: 'group',
        learners: [
          { name: 'David Miller', isPrimary: true },
          { name: 'Lisa Garcia', isPrimary: false },
        ],
        admin: 'Dr. Maria Rodriguez',
        payoutPerCredit: 50,
      },
    ],
    sessions: [
      {
        id: 1,
        date: '15 Aug',
        time: '6:09 PM',
        duration: '3m',
        courseType: 'Subscription 1:1',
        courseName: 'Algebra, Mat...',
        payoutStatus: 'feedback_pending',
      },
      {
        id: 2,
        date: '15 Aug',
        time: '5:57 PM',
        duration: '',
        courseType: 'Subscription 1:1',
        courseName: 'Algebra, Mat...',
        payoutStatus: 'feedback_pending',
      },
      {
        id: 3,
        date: '14 Aug',
        time: '11:20 AM',
        duration: '80m',
        participants: 1,
        circles: 1,
        status: 'completed',
        courseType: 'Subscription 1:1',
        courseName: 'Algebra, Mat...',
        payoutStatus: 'no_payout_set',
      },
      {
        id: 4,
        date: '14 Aug',
        time: '11:20 AM',
        duration: '80m',
        participants: 1,
        courseType: 'PAYG 1:1',
        courseName: 'Chemistry, Chemistry',
        payoutStatus: 'feedback_pending',
      },
      {
        id: 5,
        date: '13 Aug',
        time: '11:20 AM',
        duration: '60m',
        participants: 1,
        circles: 2,
        status: 'completed',
        courseType: 'Subscription 1:1',
        courseName: 'Algebra, Mat...',
        payoutStatus: 'no_payout_set',
      },
      {
        id: 6,
        date: '13 Aug',
        time: '11:20 AM',
        duration: '80m',
        participants: 1,
        courseType: 'PAYG 1:1',
        courseName: 'Chemistry, Chemistry',
        payoutStatus: 'feedback_pending',
      },
      {
        id: 7,
        date: '12 Aug',
        time: '11:20 AM',
        duration: '100m',
        participants: 1,
        circles: 1,
        status: 'completed',
        courseType: 'Subscription 1:1',
        courseName: 'Algebra, Mat...',
        payoutStatus: 'no_payout_set',
      },
      {
        id: 8,
        date: '12 Aug',
        time: '11:20 AM',
        duration: '80m',
        participants: 1,
        courseType: 'PAYG 1:1',
        courseName: 'Chemistry, Chemistry',
        payoutStatus: 'feedback_pending',
      },
    ],
    // Data for OverviewTab
    totalSessions: 156,
    totalPayouts: 2840.50,
    pendingPayouts: 3,
    completedPayouts: 12,
    sessionsByMonth: [
      { month: 'Jan', sessions: 45 },
      { month: 'Feb', sessions: 52 },
      { month: 'Mar', sessions: 38 },
      { month: 'Apr', sessions: 61 },
      { month: 'May', sessions: 49 },
      { month: 'Jun', sessions: 67 },
    ],
    payoutsByMonth: [
      { month: 'Jan', payouts: 1200 },
      { month: 'Feb', payouts: 1350 },
      { month: 'Mar', payouts: 980 },
      { month: 'Apr', payouts: 1650 },
      { month: 'May', payouts: 1420 },
      { month: 'Jun', payouts: 1890 },
    ],
    recentSessions: [
      { id: 1, date: '15 Aug', duration: '3m', courseName: 'Algebra', status: 'completed' },
      { id: 2, date: '14 Aug', duration: '80m', courseName: 'Chemistry', status: 'completed' },
      { id: 3, date: '13 Aug', duration: '60m', courseName: 'Algebra', status: 'completed' },
      { id: 4, date: '12 Aug', duration: '100m', courseName: 'Algebra', status: 'completed' },
    ],
    recentPayouts: [
      { id: 1, date: '15 Aug', amount: 150, status: 'completed' },
      { id: 2, date: '14 Aug', amount: 200, status: 'completed' },
      { id: 3, date: '13 Aug', amount: 180, status: 'completed' },
      { id: 4, date: '12 Aug', amount: 250, status: 'completed' },
    ],
  });

  // Tab change handler
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  // Mock function to refresh data
  const handleRefresh = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  // Mock function to export data
  const handleExport = () => {
    // Implement export functionality
    console.log('Exporting payouts data...');
  };

  if (loading) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h6">Loading payouts data...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Page Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Payouts
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<FilterListIcon />}
            onClick={() => {/* Implement filters */}}
          >
            Filters
          </Button>
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            onClick={handleExport}
          >
            Export
          </Button>
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={handleRefresh}
          >
            Refresh
          </Button>
        </Box>
      </Box>

      {/* Navigation Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={selectedTab} onChange={handleTabChange}>
          <Tab label="Overview" />
          <Tab label="Course" />
          <Tab 
            label="Payouts" 
            sx={{ 
              '&.Mui-selected': { 
                color: 'success.main',
                borderBottom: '2px solid',
                borderColor: 'success.main'
              }
            }}
          />
        </Tabs>
      </Box>

      {/* Tab Content */}
      {selectedTab === 0 && <OverviewTab payoutsData={payoutsData} />}
      {selectedTab === 1 && <CourseTab payoutsData={payoutsData} />}
      {selectedTab === 2 && <PayoutsTab payoutsData={payoutsData} />}
    </Box>
  );
};

export default PayoutsPage;

