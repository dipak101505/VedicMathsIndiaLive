import React from 'react';
import { 
  Box, 
  Breadcrumbs as MuiBreadcrumbs, 
  Link, 
  Typography, 
  IconButton,
  Tooltip
} from '@mui/material';
import { 
  Home as HomeIcon,
  NavigateNext as NavigateNextIcon,
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { usePermissions } from '../../hooks/usePermissions';
import navigationService from '../../services/navigationService';

const Breadcrumbs = ({ 
  customBreadcrumbs = null,
  showBackButton = true,
  maxItems = 5,
  className,
  sx 
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userRole } = usePermissions();
  
  // Generate breadcrumbs using the navigation service
  const breadcrumbs = customBreadcrumbs || 
    navigationService.generateBreadcrumbs(location, userRole);
  
  // Handle breadcrumb click
  const handleBreadcrumbClick = (path, event) => {
    event.preventDefault();
    navigate(path);
  };
  
  // Handle back button click
  const handleBackClick = () => {
    if (breadcrumbs.length > 1) {
      const previousPath = breadcrumbs[breadcrumbs.length - 2].path;
      navigate(previousPath);
    } else {
      navigate('/');
    }
  };
  
  // Don't render if no breadcrumbs
  if (!breadcrumbs || breadcrumbs.length === 0) {
    return null;
  }
  
  // Limit breadcrumbs to maxItems
  const visibleBreadcrumbs = breadcrumbs.slice(-maxItems);
  
  return (
    <Box 
      className={className}
      sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 1, 
        mb: 2,
        ...sx 
      }}
    >
      {/* Back Button */}
      {showBackButton && breadcrumbs.length > 1 && (
        <Tooltip title="Go back">
          <IconButton
            size="small"
            onClick={handleBackClick}
            sx={{ 
              mr: 1,
              '&:hover': {
                backgroundColor: 'action.hover',
              }
            }}
          >
            <ArrowBackIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      )}
      
      {/* Breadcrumbs */}
      <MuiBreadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        maxItems={maxItems}
        itemsBeforeCollapse={1}
        itemsAfterCollapse={2}
        sx={{
          '& .MuiBreadcrumbs-separator': {
            color: 'text.secondary',
          }
        }}
      >
        {visibleBreadcrumbs.map((breadcrumb, index) => {
          const isLast = index === visibleBreadcrumbs.length - 1;
          const isFirst = index === 0;
          
          if (isLast) {
            // Current page - show as text
            return (
              <Typography
                key={breadcrumb.path}
                color="text.primary"
                variant="body2"
                sx={{
                  fontWeight: 500,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                }}
              >
                {isFirst && <HomeIcon fontSize="small" />}
                {breadcrumb.label}
              </Typography>
            );
          }
          
          // Clickable breadcrumb
          return (
            <Link
              key={breadcrumb.path}
              color="inherit"
              href={breadcrumb.path}
              onClick={(event) => handleBreadcrumbClick(breadcrumb.path, event)}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': {
                  color: 'primary.main',
                  textDecoration: 'underline',
                },
                cursor: 'pointer',
              }}
            >
              {isFirst && <HomeIcon fontSize="small" />}
              {breadcrumb.label}
            </Link>
          );
        })}
      </MuiBreadcrumbs>
      
      {/* Current Page Title */}
      {breadcrumbs.length > 0 && (
        <Typography
          variant="h6"
          color="text.primary"
          sx={{ 
            ml: 'auto',
            fontWeight: 600,
            display: { xs: 'none', sm: 'block' }
          }}
        >
          {breadcrumbs[breadcrumbs.length - 1].label}
        </Typography>
      )}
    </Box>
  );
};

export default Breadcrumbs;
