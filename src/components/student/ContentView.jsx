import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  InputAdornment,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  IconButton,
  Divider
} from '@mui/material';
import {
  Search as SearchIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  GraphicEq as PodcastIcon,
  CheckBox as CheckboxIcon,
  Link as LinkIcon,
  PlayCircle as VideoIcon
} from '@mui/icons-material';

const ContentView = () => {
  const [expandedSections, setExpandedSections] = useState({
    section1: true,
    section2: false,
    section3: false,
    recordings: false
  });

  const handleSectionToggle = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const contentSections = [
    {
      id: 'section1',
      title: 'Section 1',
      resourceCount: 3,
      resources: [
        {
          id: 1,
          title: 'Thermodynamics Basics Podcast',
          icon: <PodcastIcon sx={{ color: 'rgba(0,0,0,0.6)' }} />,
          type: 'podcast'
        },
        {
          id: 2,
          title: 'Earth and the galaxy 2',
          icon: <CheckboxIcon sx={{ color: 'rgba(0,0,0,0.6)' }} />,
          type: 'practice',
          details: '20m • 10 Marks • Practice Test'
        },
        {
          id: 3,
          title: 'Group courses and scheduling sessions',
          icon: <LinkIcon sx={{ color: 'rgba(0,0,0,0.6)' }} />,
          type: 'link'
        }
      ]
    },
    {
      id: 'section2',
      title: 'Section 2',
      resourceCount: 4,
      resources: [
        {
          id: 1,
          title: 'Advanced Concepts',
          icon: <VideoIcon sx={{ color: 'rgba(0,0,0,0.6)' }} />,
          type: 'video'
        },
        {
          id: 2,
          title: 'Problem Solving Workshop',
          icon: <CheckboxIcon sx={{ color: 'rgba(0,0,0,0.6)' }} />,
          type: 'workshop',
          details: '45m • 15 Marks • Interactive'
        }
      ]
    },
    {
      id: 'section3',
      title: 'Section 3',
      resourceCount: 4,
      resources: [
        {
          id: 1,
          title: 'Final Review',
          icon: <VideoIcon sx={{ color: 'rgba(0,0,0,0.6)' }} />,
          type: 'video'
        },
        {
          id: 2,
          title: 'Comprehensive Assessment',
          icon: <CheckboxIcon sx={{ color: 'rgba(0,0,0,0.6)' }} />,
          type: 'assessment',
          details: '60m • 25 Marks • Final Test'
        }
      ]
    },
    {
      id: 'recordings',
      title: 'Session Recordings',
      resourceCount: 3,
      resources: [
        {
          id: 1,
          title: 'Impulse & Collisions Recording',
          icon: <VideoIcon sx={{ color: 'rgba(0,0,0,0.6)' }} />,
          type: 'recording',
          details: '60m • Session Recording'
        },
        {
          id: 2,
          title: 'Work & Energy Case Studies',
          icon: <VideoIcon sx={{ color: 'rgba(0,0,0,0.6)' }} />,
          type: 'recording',
          details: '100m • Session Recording'
        }
      ]
    }
  ];

  return (
    <Box>
      {/* Header with Search */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'black' }}>
          Content
        </Typography>
        <TextField
          placeholder="Search content"
          size="small"
          sx={{
            width: 300,
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'rgba(0,0,0,0.3)',
              },
              '&:hover fieldset': {
                borderColor: 'rgba(0,0,0,0.5)',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'black',
              },
            },
            '& .MuiInputBase-input': {
              color: 'black',
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'rgba(0,0,0,0.6)' }} />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* Content Sections */}
      {contentSections.map((section) => (
        <Paper key={section.id} sx={{ mb: 2 }}>
          {/* Section Header */}
          <Box
            sx={{
              p: 3,
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              '&:hover': {
                bgcolor: 'rgba(0,0,0,0.02)'
              }
            }}
            onClick={() => handleSectionToggle(section.id)}
          >
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'black', mb: 0.5 }}>
                {section.title}
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(0,0,0,0.6)' }}>
                {section.resourceCount} Resources
              </Typography>
            </Box>
            <IconButton size="small">
              {expandedSections[section.id] ? (
                <ExpandLessIcon sx={{ color: 'black' }} />
              ) : (
                <ExpandMoreIcon sx={{ color: 'black' }} />
              )}
            </IconButton>
          </Box>

          {/* Section Content */}
          <Collapse in={expandedSections[section.id]}>
            <Divider />
            <List sx={{ py: 0 }}>
              {section.resources.map((resource, index) => (
                <ListItem
                  key={resource.id}
                  sx={{
                    px: 3,
                    py: 2,
                    cursor: 'pointer',
                    '&:hover': {
                      bgcolor: 'rgba(0,0,0,0.02)'
                    }
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    {resource.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant="body1" sx={{ color: 'black', fontWeight: 'medium' }}>
                        {resource.title}
                      </Typography>
                    }
                    secondary={
                      resource.details && (
                        <Typography variant="body2" sx={{ color: 'rgba(0,0,0,0.6)', mt: 0.5 }}>
                          {resource.details}
                        </Typography>
                      )
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Collapse>
        </Paper>
      ))}
    </Box>
  );
};

export default ContentView;
