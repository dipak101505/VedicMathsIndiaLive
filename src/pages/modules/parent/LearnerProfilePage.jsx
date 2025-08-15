import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Tabs,
  Tab,
  Button,
} from '@mui/material';
import {
  CalendarToday as CalendarIcon,
  Email as EmailIcon,
  School as SchoolIcon,
  AttachMoney as MoneyIcon,
  Schedule as ScheduleIcon,
  Quiz as QuizIcon,
  Diamond as DiamondIcon,
  Login as LoginIcon,
} from '@mui/icons-material';
import { useParams } from 'react-router-dom';

// Import tab components
import CoursesTab from '../../../components/parents/CoursesTab';
import FeesTab from '../../../components/parents/FeesTab';
import SessionsTab from '../../../components/parents/SessionsTab';
import TestsTab from '../../../components/parents/TestsTab';

const LearnerProfilePage = () => {
  const { learnerId } = useParams();
  const [selectedTab, setSelectedTab] = useState(0);

  // Mock learner data - in real app, fetch based on learnerId
  const [learner] = useState({
    id: learnerId || '1',
    name: 'Liam Smith',
    email: 'liamsmith@demo.wise.live',
    joinDate: '15 Aug 2025',
    points: 152,
    level: 5,
    levelTitle: 'Expert',
    courses: [
      {
        id: 1,
        name: 'Physics for Engineers',
        type: 'Physics',
        thumbnail: '📚',
        status: 'active',
        progress: 75
      },
      {
        id: 2,
        name: 'PAYG 1:1 Chemistry',
        type: 'Chemistry',
        thumbnail: '🧪',
        status: 'active',
        progress: 60
      },
      {
        id: 3,
        name: 'Advanced Mathematics',
        type: 'Mathematics',
        thumbnail: '📐',
        status: 'active',
        progress: 90
      }
    ],
    fees: [
      {
        id: 1,
        courseName: 'Physics for Engineers',
        amount: 1000,
        status: 'overdue',
        dueDate: '15 Aug 2025'
      },
      {
        id: 2,
        courseName: 'Advanced Mathematics',
        amount: 0,
        status: 'paid',
        dueDate: null
      }
    ],
    sessions: [
      {
        id: 1,
        courseName: 'PAYG 1:1 Chemistry',
        courseType: 'Chemistry',
        title: 'Entropy & Laws Thermodynamics',
        day: '14',
        time: '11:08 PM',
        duration: '80m',
        attended: true,
        attendedDuration: '40m',
        attendancePercentage: 50
      },
      {
        id: 2,
        courseName: 'Physics for Engineers',
        courseType: 'Physics',
        title: 'Advanced Kinematics Breakdown',
        day: '14',
        time: '11:08 PM',
        duration: '100m',
        attended: false,
        attendedDuration: null,
        attendancePercentage: null
      },
      {
        id: 3,
        courseName: 'PAYG 1:1 Chemistry',
        courseType: 'Chemistry',
        title: 'Heat Transfer Mechanisms',
        day: '13',
        time: '11:08 PM',
        duration: '80m',
        attended: true,
        attendedDuration: '56m',
        attendancePercentage: 70
      },
      {
        id: 4,
        courseName: 'PAYG 1:1 Chemistry',
        courseType: 'Chemistry',
        title: 'Fundamentals of Thermodynamics',
        day: '12',
        time: '11:08 PM',
        duration: '80m',
        attended: true,
        attendedDuration: '80m',
        attendancePercentage: 100
      },
      {
        id: 5,
        courseName: 'Physics for Engineers',
        courseType: 'Physics',
        title: 'Forces & Motion Discussion',
        day: '12',
        time: '11:08 PM',
        duration: '80m',
        attended: true,
        attendedDuration: '76m',
        attendancePercentage: 95
      },
      {
        id: 6,
        courseName: 'Physics for Engineers',
        courseType: 'Physics',
        title: 'Review of Newton\'s Laws',
        day: '11',
        time: '11:08 PM',
        duration: '56m',
        attended: false,
        attendedDuration: null,
        attendancePercentage: null
      }
    ],
    tests: [
      {
        id: 1,
        testName: 'Earth and the galaxy',
        courseName: 'PAYG 1:1 Chemistry',
        date: null,
        score: 5
      },
      {
        id: 2,
        testName: 'Forests and Animals',
        courseName: 'PAYG 1:1 Chemistry',
        date: null,
        score: null
      },
      {
        id: 3,
        testName: 'Galaxy Exploration Test 1',
        courseName: 'Advanced Mathematics',
        date: null,
        score: 5
      },
      {
        id: 4,
        testName: 'Galaxy Exploration Test 2',
        courseName: 'Physics for Engineers',
        date: null,
        score: 5
      },
      {
        id: 5,
        testName: 'Galaxy Exploration Test 3',
        courseName: 'Physics for Engineers',
        date: null,
        score: 5
      },
      {
        id: 6,
        testName: 'Earth and the galaxy',
        courseName: 'Physics for Engineers',
        date: null,
        score: 5
      },
      {
        id: 7,
        testName: 'Wildlife and Ecosystems',
        courseName: 'PAYG 1:1 Chemistry',
        date: null,
        score: 10
      },
      {
        id: 8,
        testName: 'Planet Exploration Test 1',
        courseName: 'Advanced Mathematics',
        date: null,
        score: 5
      },
      {
        id: 9,
        testName: 'Planet Exploration Test 2',
        courseName: 'Advanced Mathematics',
        date: null,
        score: 5
      }
    ]
  });

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Box sx={{ p: 3, maxWidth: 1400, mx: 'auto' }}>
      {/* Profile Header */}
      <Card elevation={2} sx={{ mb: 4 }}>
        <CardContent sx={{ py: 3, px: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 3 }}>
            <Avatar
              sx={{
                width: 80,
                height: 80,
                backgroundColor: 'primary.main',
                fontSize: '2rem',
                fontWeight: 600
              }}
            >
              {learner.name.charAt(0)}
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h3" component="h1" sx={{ fontWeight: 600, color: 'text.primary', mb: 1 }}>
                {learner.name}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CalendarIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                  <Typography variant="body1" color="text.secondary">
                    Joined on {learner.joinDate}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <EmailIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                  <Typography variant="body1" color="text.secondary">
                    {learner.email}
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Button
              variant="contained"
              color="primary"
              startIcon={<LoginIcon />}
              onClick={() => console.log('Login as', learner.name)}
              sx={{ px: 3 }}
            >
              Login as {learner.name}
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Main Content with Points Card */}
      <Box sx={{ display: 'flex', gap: 3 }}>
        {/* Left Content Area */}
        <Box sx={{ flex: 1 }}>
          {/* Navigation Tabs */}
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
            <Tabs value={selectedTab} onChange={handleTabChange}>
              <Tab 
                label="Courses" 
                icon={<SchoolIcon />} 
                iconPosition="start"
                sx={{ minHeight: 48 }}
              />
              <Tab 
                label="Fees" 
                icon={<MoneyIcon />} 
                iconPosition="start"
                sx={{ minHeight: 48 }}
              />
              <Tab 
                label="Sessions" 
                icon={<ScheduleIcon />} 
                iconPosition="start"
                sx={{ minHeight: 48 }}
              />
              <Tab 
                label="Tests" 
                icon={<QuizIcon />} 
                iconPosition="start"
                sx={{ minHeight: 48 }}
              />
            </Tabs>
          </Box>

          {/* Tab Content */}
          <Box>
            {selectedTab === 0 && <CoursesTab learner={learner} />}
            {selectedTab === 1 && <FeesTab learner={learner} />}
            {selectedTab === 2 && <SessionsTab learner={learner} />}
            {selectedTab === 3 && <TestsTab learner={learner} />}
          </Box>
        </Box>

        {/* Right Sidebar - Points Card */}
        <Box sx={{ width: 250, flexShrink: 0 }}>
          <Card elevation={3} sx={{ position: 'sticky', top: 24 }}>
            <CardContent sx={{ textAlign: 'center', py: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                <DiamondIcon sx={{ fontSize: 32, color: 'warning.main' }} />
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 600, color: 'text.primary', mb: 0.5 }}>
                {learner.points} Points
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Level {learner.level} - {learner.levelTitle}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default LearnerProfilePage;
