import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Chip,
  Divider,
  Paper,
  Alert,
  AlertTitle,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  EmojiEvents as TrophyIcon,
  AccessTime as ClockIcon,
  Help as HelpIcon,
  TrendingUp as TrendingIcon,
  Star as StarIcon,
} from '@mui/icons-material';

const LeaderboardTab = ({ course }) => {
  const [lastUpdated, setLastUpdated] = useState(new Date('2025-08-12T23:10:00'));
  const [nextUpdate, setNextUpdate] = useState(new Date('2025-08-13T06:10:00'));
  const [showUpdateAlert, setShowUpdateAlert] = useState(true);

  // Mock leaderboard data - replace with API call
  const [leaderboardData] = useState({
    past7Days: [
      { id: 1, name: 'Bella', points: 24, rank: 1, avatar: 'B' },
      { id: 2, name: 'Oliver', points: 20, rank: 2, avatar: 'O' },
      { id: 3, name: 'Caroline', points: 19, rank: 3, avatar: 'C' },
      { id: 4, name: 'Miller', points: 10, rank: 4, avatar: 'M' },
      { id: 5, name: 'Jason', points: 0, rank: 5, avatar: 'J' },
      { id: 6, name: 'Chapman', points: 5, rank: 6, avatar: 'C' },
      { id: 7, name: 'Ryan', points: 5, rank: 7, avatar: 'R' },
      { id: 8, name: 'Ross', points: 5, rank: 8, avatar: 'R' },
      { id: 9, name: 'Joanne', points: 3, rank: 9, avatar: 'J' },
      { id: 10, name: 'Wilson', points: 1, rank: 10, avatar: 'W' },
    ],
    allTime: [
      { id: 1, name: 'Bella', points: 2451, rank: 1, avatar: 'B' },
      { id: 2, name: 'Oliver', points: 2001, rank: 2, avatar: 'O' },
      { id: 3, name: 'Caroline', points: 1916, rank: 3, avatar: 'C' },
      { id: 4, name: 'Miller', points: 1010, rank: 4, avatar: 'M' },
      { id: 5, name: 'Jason', points: 900, rank: 5, avatar: 'J' },
      { id: 6, name: 'Chapman', points: 126, rank: 6, avatar: 'C' },
      { id: 7, name: 'Ryan', points: 126, rank: 7, avatar: 'R' },
      { id: 8, name: 'Ross', points: 126, rank: 8, avatar: 'R' },
      { id: 9, name: 'Joanne', points: 98, rank: 9, avatar: 'J' },
      { id: 10, name: 'Wilson', points: 6, rank: 10, avatar: 'W' },
    ]
  });

  // Calculate time until next update
  const [timeUntilUpdate, setTimeUntilUpdate] = useState('');

  useEffect(() => {
    const calculateTimeUntilUpdate = () => {
      const now = new Date();
      const diff = nextUpdate - now;
      
      if (diff <= 0) {
        setTimeUntilUpdate('Updating now...');
        return;
      }
      
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      
      if (hours > 0) {
        setTimeUntilUpdate(`${hours} hours`);
      } else if (minutes > 0) {
        setTimeUntilUpdate(`${minutes} minutes`);
      } else {
        setTimeUntilUpdate('Less than a minute');
      }
    };

    calculateTimeUntilUpdate();
    const interval = setInterval(calculateTimeUntilUpdate, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [nextUpdate]);

  const getRankBadgeColor = (rank) => {
    switch (rank) {
      case 1:
        return 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)'; // Gold
      case 2:
        return 'linear-gradient(135deg, #C0C0C0 0%, #A9A9A9 100%)'; // Silver
      case 3:
        return 'linear-gradient(135deg, #CD7F32 0%, #B8860B 100%)'; // Bronze
      case 4:
        return 'linear-gradient(135deg, #4CAF50 0%, #45A049 100%)'; // Green
      case 5:
        return 'linear-gradient(135deg, #2196F3 0%, #1976D2 100%)'; // Blue
      default:
        return 'linear-gradient(135deg, #9E9E9E 0%, #757575 100%)'; // Grey
    }
  };

  const getRankBadgeIcon = (rank) => {
    switch (rank) {
      case 1:
        return <StarIcon sx={{ fontSize: 16, color: '#FFD700' }} />;
      case 2:
        return <StarIcon sx={{ fontSize: 16, color: '#C0C0C0' }} />;
      case 3:
        return <StarIcon sx={{ fontSize: 16, color: '#CD7F32' }} />;
      default:
        return <TrendingIcon sx={{ fontSize: 16, color: 'white' }} />;
    }
  };

  const formatLastUpdated = (date) => {
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }) + ', ' + date.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const handleHowPointsWork = () => {
    // TODO: Implement points explanation modal or navigation
    console.log('How do points work? clicked');
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Update Alert */}
      {showUpdateAlert && (
        <Alert 
          severity="info" 
          sx={{ mb: 3, borderRadius: 2 }}
          onClose={() => setShowUpdateAlert(false)}
          icon={<ClockIcon sx={{ color: 'purple' }} />}
        >
          <AlertTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <TrophyIcon sx={{ color: 'gold' }} />
            Leaderboard updating!
          </AlertTitle>
          Stay tuned! Leaderboard will be updated in next 12 hours!
        </Alert>
      )}

      {/* Last Updated Status */}
      <Box sx={{ mb: 4, p: 2, bgcolor: 'grey.50', borderRadius: 2, border: '1px solid #e0e0e0' }}>
        <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <ClockIcon sx={{ fontSize: 16 }} />
          Last updated: {formatLastUpdated(lastUpdated)}. Next update in {timeUntilUpdate}.
        </Typography>
      </Box>

      {/* Leaderboard Grid */}
      <Grid container spacing={4}>
        {/* Past 7 Days Leaderboard */}
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 3, height: 'fit-content' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" component="h2" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                Past 7 days
              </Typography>
              
              <List sx={{ p: 0 }}>
                {leaderboardData.past7Days.map((student, index) => (
                  <React.Fragment key={student.id}>
                    <ListItem sx={{ px: 0, py: 1.5 }}>
                      <ListItemAvatar>
                        <Avatar 
                          sx={{ 
                            width: 40, 
                            height: 40,
                            background: getRankBadgeColor(student.rank),
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative',
                          }}
                        >
                          {getRankBadgeIcon(student.rank)}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography variant="body1" fontWeight="600">
                            {student.name}
                          </Typography>
                        }
                        secondary={
                          <Typography variant="body2" color="text.secondary">
                            Rank {student.rank}
                          </Typography>
                        }
                      />
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {student.points > 0 ? (
                          <Chip
                            label={`+${student.points}`}
                            color="success"
                            size="small"
                            sx={{ fontWeight: 600 }}
                          />
                        ) : (
                          <Typography variant="body2" color="text.secondary">
                            No points
                          </Typography>
                        )}
                      </Box>
                    </ListItem>
                    {index < leaderboardData.past7Days.length - 1 && (
                      <Divider variant="inset" component="li" sx={{ mx: 3 }} />
                    )}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* All Time Leaderboard */}
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 3, height: 'fit-content' }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" component="h2" sx={{ fontWeight: 600 }}>
                  All time
                </Typography>
                <Tooltip title="Learn how points are calculated">
                  <Typography
                    variant="body2"
                    color="primary"
                    sx={{ 
                      cursor: 'pointer',
                      textDecoration: 'underline',
                      fontWeight: 500,
                      '&:hover': {
                        color: 'primary.dark',
                      }
                    }}
                    onClick={handleHowPointsWork}
                  >
                    How do points work?
                  </Typography>
                </Tooltip>
              </Box>
              
              <List sx={{ p: 0 }}>
                {leaderboardData.allTime.map((student, index) => (
                  <React.Fragment key={student.id}>
                    <ListItem sx={{ px: 0, py: 1.5 }}>
                      <ListItemAvatar>
                        <Avatar 
                          sx={{ 
                            width: 40, 
                            height: 40,
                            background: getRankBadgeColor(student.rank),
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative',
                          }}
                        >
                          {getRankBadgeIcon(student.rank)}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography variant="body1" fontWeight="600">
                            {student.name}
                          </Typography>
                        }
                        secondary={
                          <Typography variant="body2" color="text.secondary">
                            Rank {student.rank}
                          </Typography>
                        }
                      />
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="body1" fontWeight="600" color="primary">
                          {student.points.toLocaleString()}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          pts
                        </Typography>
                      </Box>
                    </ListItem>
                    {index < leaderboardData.allTime.length - 1 && (
                      <Divider variant="inset" component="li" sx={{ mx: 3 }} />
                    )}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Additional Info */}
      <Box sx={{ mt: 4, p: 3, bgcolor: 'grey.50', borderRadius: 2, border: '1px solid #e0e0e0' }}>
        <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
          <strong>Note:</strong> Points are awarded for completing assignments, participating in sessions, 
          and achieving milestones. Leaderboard updates every 12 hours.
        </Typography>
      </Box>
    </Box>
  );
};

export default LeaderboardTab;
