import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Chip, 
  Button,
  IconButton,
  Avatar,
  LinearProgress,
  Tooltip
} from '@mui/material';
import { 
  Edit as EditIcon, 
  Delete as DeleteIcon, 
  Visibility as ViewIcon,
  School as SchoolIcon,
  Person as PersonIcon,
  Schedule as ScheduleIcon,
  TrendingUp as TrendingUpIcon
} from '@mui/icons-material';

const CourseCard = ({ 
  course, 
  role, 
  onCourseClick, 
  onCourseEdit, 
  onCourseDelete,
  compact = false
}) => {
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'success';
      case 'completed':
        return 'primary';
      case 'draft':
        return 'warning';
      case 'archived':
        return 'default';
      default:
        return 'info';
    }
  };
  
  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'beginner':
        return 'success';
      case 'intermediate':
        return 'warning';
      case 'advanced':
        return 'error';
      default:
        return 'default';
    }
  };
  
  const renderActions = () => {
    switch (role) {
      case 'instructor':
        return (
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Button
              size="small"
              variant="outlined"
              startIcon={<EditIcon />}
              onClick={() => onCourseEdit?.(course)}
            >
              Edit
            </Button>
            <IconButton
              size="small"
              color="error"
              onClick={() => onCourseDelete?.(course.id)}
              sx={{ ml: 'auto' }}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        );
      case 'admin':
        return (
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Button
              size="small"
              variant="outlined"
              startIcon={<ViewIcon />}
              onClick={() => onCourseClick?.(course)}
            >
              View
            </Button>
            <Button
              size="small"
              variant="outlined"
              startIcon={<EditIcon />}
              onClick={() => onCourseEdit?.(course)}
            >
              Edit
            </Button>
          </Box>
        );
      case 'student':
        return (
          <Button
            size="small"
            variant="contained"
            startIcon={<ViewIcon />}
            onClick={() => onCourseClick?.(course)}
            fullWidth
          >
            View Course
          </Button>
        );
      default:
        return (
          <Button
            size="small"
            variant="outlined"
            startIcon={<ViewIcon />}
            onClick={() => onCourseClick?.(course)}
            fullWidth
          >
            View Details
          </Button>
        );
    }
  };
  
  const renderCompactView = () => (
    <Card sx={{ 
      '&:hover': { 
        boxShadow: 3,
        transform: 'translateY(-2px)',
        transition: 'all 0.2s ease-in-out'
      }
    }}>
      <CardContent sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar sx={{ bgcolor: 'primary.main', width: 48, height: 48 }}>
            <SchoolIcon />
          </Avatar>
          
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
              <Typography variant="h6" component="h3" noWrap>
                {course.title}
              </Typography>
              <Chip 
                label={course.status} 
                color={getStatusColor(course.status)}
                size="small"
              />
            </Box>
            
            <Typography variant="body2" color="text.secondary" noWrap>
              {course.description}
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 2, mt: 1, flexWrap: 'wrap' }}>
              <Chip
                label={course.difficulty || 'Not specified'}
                color={getDifficultyColor(course.difficulty)}
                size="small"
                variant="outlined"
              />
              <Typography variant="caption" color="text.secondary">
                {course.duration || 'Flexible'} • {course.price ? `$${course.price}` : 'Free'}
              </Typography>
            </Box>
          </Box>
        </Box>
        
        {renderActions()}
      </CardContent>
    </Card>
  );
  
  const renderDetailedView = () => (
    <Card sx={{ 
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      '&:hover': { 
        boxShadow: 3,
        transform: 'translateY(-2px)',
        transition: 'all 0.2s ease-in-out'
      }
    }}>
      <CardContent sx={{ p: 3, flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <SchoolIcon color="primary" />
            <Typography variant="h6" component="h3" noWrap>
              {course.title}
            </Typography>
          </Box>
          <Chip 
            label={course.status} 
            color={getStatusColor(course.status)}
            size="small"
          />
        </Box>
        
        {/* Description */}
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flex: 1 }}>
          {course.description}
        </Typography>
        
        {/* Course Details */}
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', gap: 2, mb: 1, flexWrap: 'wrap' }}>
            <Chip
              label={course.difficulty || 'Not specified'}
              color={getDifficultyColor(course.difficulty)}
              size="small"
              variant="outlined"
            />
            <Chip
              label={course.subject || 'General'}
              color="primary"
              size="small"
              variant="outlined"
            />
          </Box>
          
          <Box sx={{ display: 'flex', gap: 3, mb: 2, flexWrap: 'wrap' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <PersonIcon fontSize="small" color="action" />
              <Typography variant="caption" color="text.secondary">
                {course.instructor || 'Instructor TBD'}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <ScheduleIcon fontSize="small" color="action" />
              <Typography variant="caption" color="text.secondary">
                {course.duration || 'Flexible'}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <TrendingUpIcon fontSize="small" color="action" />
              <Typography variant="caption" color="text.secondary">
                {course.price ? `$${course.price}` : 'Free'}
              </Typography>
            </Box>
          </Box>
        </Box>
        
        {/* Progress Section (for students) */}
        {role === 'student' && course.progress !== undefined && (
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="caption" color="text.secondary">
                Progress
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {course.progress}%
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={course.progress}
              sx={{ height: 6, borderRadius: 3 }}
            />
          </Box>
        )}
        
        {/* Student Count (for instructors/admins) */}
        {(role === 'instructor' || role === 'admin') && course.studentCount !== undefined && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="caption" color="text.secondary">
              {course.studentCount} student{course.studentCount !== 1 ? 's' : ''} enrolled
            </Typography>
          </Box>
        )}
        
        {/* Actions */}
        <Box sx={{ mt: 'auto' }}>
          {renderActions()}
        </Box>
      </CardContent>
    </Card>
  );
  
  return compact ? renderCompactView() : renderDetailedView();
};

export default CourseCard;
