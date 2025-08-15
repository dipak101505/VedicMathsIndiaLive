import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  InputAdornment,
  Button,
  IconButton,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  Paper,
} from '@mui/material';
import {
  Search as SearchIcon,
  Folder as FolderIcon,
  VideoLibrary as VideoIcon,
  Description as DocumentIcon,
  PictureAsPdf as PdfIcon,
  Image as ImageIcon,
  PlayArrow as PlayIcon,
  Download as DownloadIcon,
  Visibility as ViewIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
} from '@mui/icons-material';

const ContentTab = ({ course }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSections, setExpandedSections] = useState({});
  const [filteredContent, setFilteredContent] = useState([]);

  // Mock content data - replace with API call
  const [contentSections] = useState([
    {
      id: 1,
      title: 'Introduction to Physics',
      description: 'Fundamental concepts and principles',
      resourceCount: 2,
      resources: [
        {
          id: 1,
          title: 'Physics Fundamentals Overview',
          type: 'pdf',
          size: '2.4 MB',
          uploadedBy: 'Dr. Emily Carter',
          uploadDate: '2025-08-01',
          downloadCount: 45,
        },
        {
          id: 2,
          title: 'Course Syllabus and Schedule',
          type: 'document',
          size: '156 KB',
          uploadedBy: 'Dr. Emily Carter',
          uploadDate: '2025-08-01',
          downloadCount: 38,
        }
      ]
    },
    {
      id: 2,
      title: 'Mechanics and Motion',
      description: 'Newton\'s laws, forces, and kinematics',
      resourceCount: 5,
      resources: [
        {
          id: 3,
          title: 'Newton\'s Laws of Motion',
          type: 'pdf',
          size: '3.1 MB',
          uploadedBy: 'Dr. Emily Carter',
          uploadDate: '2025-08-03',
          downloadCount: 52,
        },
        {
          id: 4,
          title: 'Kinematics Equations',
          type: 'document',
          size: '892 KB',
          uploadedBy: 'Dr. Emily Carter',
          uploadDate: '2025-08-03',
          downloadCount: 41,
        },
        {
          id: 5,
          title: 'Force Diagrams and Free Body Diagrams',
          type: 'pdf',
          size: '1.8 MB',
          uploadedBy: 'Dr. Emily Carter',
          uploadDate: '2025-08-05',
          downloadCount: 39,
        },
        {
          id: 6,
          title: 'Work and Energy Problems',
          type: 'document',
          size: '1.2 MB',
          uploadedBy: 'Dr. Emily Carter',
          uploadDate: '2025-08-05',
          downloadCount: 36,
        },
        {
          id: 7,
          title: 'Momentum and Collisions',
          type: 'pdf',
          size: '2.7 MB',
          uploadedBy: 'Dr. Emily Carter',
          uploadDate: '2025-08-07',
          downloadCount: 33,
        }
      ]
    },
    {
      id: 3,
      title: 'Waves and Oscillations',
      description: 'Wave properties, sound, and light',
      resourceCount: 5,
      resources: [
        {
          id: 8,
          title: 'Wave Properties and Characteristics',
          type: 'pdf',
          size: '2.9 MB',
          uploadedBy: 'Dr. Emily Carter',
          uploadDate: '2025-08-08',
          downloadCount: 28,
        },
        {
          id: 9,
          title: 'Sound Wave Analysis',
          type: 'document',
          size: '1.5 MB',
          uploadedBy: 'Dr. Emily Carter',
          uploadDate: '2025-08-08',
          downloadCount: 25,
        },
        {
          id: 10,
          title: 'Light and Optics Fundamentals',
          type: 'pdf',
          size: '3.3 MB',
          uploadedBy: 'Dr. Emily Carter',
          uploadDate: '2025-08-10',
          downloadCount: 31,
        },
        {
          id: 11,
          title: 'Interference and Diffraction',
          type: 'document',
          size: '1.9 MB',
          uploadedBy: 'Dr. Emily Carter',
          uploadDate: '2025-08-10',
          downloadCount: 22,
        },
        {
          id: 12,
          title: 'Wave-Particle Duality',
          type: 'pdf',
          size: '2.1 MB',
          uploadedBy: 'Dr. Emily Carter',
          uploadDate: '2025-08-12',
          downloadCount: 19,
        }
      ]
    },
    {
      id: 4,
      title: 'Session Recordings',
      description: 'Video recordings of live sessions',
      resourceCount: 4,
      resources: [
        {
          id: 13,
          title: 'Review of Newton\'s Laws - Session Recording',
          type: 'video',
          size: '156 MB',
          uploadedBy: 'Dr. Emily Carter',
          uploadDate: '2025-08-08',
          duration: '56:23',
          viewCount: 67,
        },
        {
          id: 14,
          title: 'Forces & Motion Discussion - Session Recording',
          type: 'video',
          size: '234 MB',
          uploadedBy: 'Dr. Emily Carter',
          uploadDate: '2025-08-09',
          duration: '80:15',
          viewCount: 58,
        },
        {
          id: 15,
          title: 'Energy Principles Recap - Session Recording',
          type: 'video',
          size: '89 MB',
          uploadedBy: 'Dr. Emily Carter',
          uploadDate: '2025-08-10',
          duration: '20:42',
          viewCount: 45,
        },
        {
          id: 16,
          title: 'Advanced Kinematics - Session Recording',
          type: 'video',
          size: '312 MB',
          uploadedBy: 'Dr. Emily Carter',
          uploadDate: '2025-08-11',
          duration: '100:18',
          viewCount: 52,
        }
      ]
    }
  ]);

  // Filter content based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredContent(contentSections);
    } else {
      const filtered = contentSections.map(section => ({
        ...section,
        resources: section.resources.filter(resource =>
          resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          resource.description?.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(section => section.resources.length > 0);
      
      setFilteredContent(filtered);
    }
  }, [searchQuery, contentSections]);

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const getResourceIcon = (type) => {
    switch (type) {
      case 'pdf':
        return <PdfIcon sx={{ color: '#d32f2f' }} />;
      case 'document':
        return <DocumentIcon sx={{ color: '#1976d2' }} />;
      case 'video':
        return <VideoIcon sx={{ color: '#388e3c' }} />;
      case 'image':
        return <ImageIcon sx={{ color: '#f57c00' }} />;
      default:
        return <DocumentIcon sx={{ color: '#757575' }} />;
    }
  };

  const getResourceTypeLabel = (type) => {
    switch (type) {
      case 'pdf':
        return 'PDF';
      case 'document':
        return 'Document';
      case 'video':
        return 'Video';
      case 'image':
        return 'Image';
      default:
        return 'File';
    }
  };

  const handleDownload = (resource) => {
    console.log('Downloading resource:', resource.title);
    // TODO: Implement actual download functionality
  };

  const handleView = (resource) => {
    console.log('Viewing resource:', resource.title);
    // TODO: Implement actual view functionality
  };

  const handlePlay = (resource) => {
    console.log('Playing video:', resource.title);
    // TODO: Implement actual video playback
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
          Content
        </Typography>
        
        {/* Search Bar */}
        <TextField
          placeholder="Search content..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'text.secondary' }} />
              </InputAdornment>
            ),
          }}
          sx={{
            width: 300,
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
            }
          }}
          size="small"
        />
      </Box>

      {/* Content Sections */}
      <Grid container spacing={3}>
        {filteredContent.map((section) => (
          <Grid item xs={12} md={6} lg={4} key={section.id}>
            <Card 
              sx={{ 
                height: '100%',
                borderRadius: 3,
                '&:hover': {
                  boxShadow: 4,
                  transform: 'translateY(-2px)',
                  transition: 'all 0.2s ease-in-out',
                }
              }}
            >
              <CardContent sx={{ p: 3 }}>
                {/* Section Header */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
                      {section.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      {section.description}
                    </Typography>
                    <Chip 
                      label={`${section.resourceCount} Resources`}
                      color="primary"
                      size="small"
                      sx={{ fontWeight: 600 }}
                    />
                  </Box>
                  
                  <IconButton
                    onClick={() => toggleSection(section.id)}
                    sx={{ ml: 1 }}
                  >
                    {expandedSections[section.id] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </IconButton>
                </Box>

                {/* Resources List (when expanded) */}
                {expandedSections[section.id] && (
                  <Box sx={{ mt: 2 }}>
                    <Divider sx={{ mb: 2 }} />
                    <List sx={{ p: 0 }}>
                      {section.resources.map((resource, index) => (
                        <React.Fragment key={resource.id}>
                          <ListItem sx={{ px: 0, py: 1 }}>
                            <ListItemAvatar>
                              <Avatar sx={{ bgcolor: 'grey.100', width: 32, height: 32 }}>
                                {getResourceIcon(resource.type)}
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                              primary={
                                <Typography variant="body2" fontWeight="500" sx={{ mb: 0.5 }}>
                                  {resource.title}
                                </Typography>
                              }
                              secondary={
                                <Box>
                                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1, flexWrap: 'wrap' }}>
                                    <Chip 
                                      label={getResourceTypeLabel(resource.type)}
                                      size="small"
                                      variant="outlined"
                                      sx={{ fontSize: '0.7rem', height: 20 }}
                                    />
                                    <Typography variant="caption" color="text.secondary">
                                      {resource.size}
                                    </Typography>
                                    {resource.duration && (
                                      <Typography variant="caption" color="text.secondary">
                                        {resource.duration}
                                      </Typography>
                                    )}
                                  </Box>
                                  <Typography variant="caption" color="text.secondary" display="block">
                                    Uploaded by {resource.uploadedBy} on {resource.uploadDate}
                                  </Typography>
                                </Box>
                              }
                            />
                            
                            {/* Action Buttons */}
                            <Box sx={{ display: 'flex', gap: 0.5 }}>
                              {resource.type === 'video' ? (
                                <IconButton
                                  size="small"
                                  onClick={() => handlePlay(resource)}
                                  sx={{ color: 'primary.main' }}
                                >
                                  <PlayIcon />
                                </IconButton>
                              ) : (
                                <IconButton
                                  size="small"
                                  onClick={() => handleView(resource)}
                                  sx={{ color: 'primary.main' }}
                                >
                                  <ViewIcon />
                                </IconButton>
                              )}
                              <IconButton
                                size="small"
                                onClick={() => handleDownload(resource)}
                                sx={{ color: 'primary.main' }}
                              >
                                <DownloadIcon />
                              </IconButton>
                            </Box>
                          </ListItem>
                          {index < section.resources.length - 1 && (
                            <Divider variant="inset" component="li" sx={{ mx: 3 }} />
                          )}
                        </React.Fragment>
                      ))}
                    </List>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Empty State */}
      {filteredContent.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No content found
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Try adjusting your search terms or browse all content sections.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default ContentTab;
