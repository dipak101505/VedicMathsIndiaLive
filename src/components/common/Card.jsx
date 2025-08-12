import React from 'react';
import { Card as MuiCard, CardContent, CardActions, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(MuiCard)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 1.5,
  boxShadow: theme.shadows[2],
  transition: 'box-shadow 0.3s ease-in-out, transform 0.2s ease-in-out',
  
  '&:hover': {
    boxShadow: theme.shadows[8],
    transform: 'translateY(-2px)',
  },
}));

const CardHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2, 3, 0, 3),
  borderBottom: `1px solid ${theme.palette.divider}`,
  marginBottom: theme.spacing(2),
}));

const Card = ({ 
  title, 
  subtitle, 
  actions, 
  children, 
  className, 
  elevation = 2,
  ...props 
}) => {
  return (
    <StyledCard className={className} elevation={elevation} {...props}>
      {(title || subtitle || actions) && (
        <CardHeader>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Box sx={{ flex: 1 }}>
              {title && (
                <Typography variant="h6" component="h3" gutterBottom>
                  {title}
                </Typography>
              )}
              {subtitle && (
                <Typography variant="body2" color="text.secondary">
                  {subtitle}
                </Typography>
              )}
            </Box>
            {actions && (
              <Box sx={{ ml: 2, display: 'flex', gap: 1 }}>
                {actions}
              </Box>
            )}
          </Box>
        </CardHeader>
      )}
      
      <CardContent sx={{ pt: 0 }}>
        {children}
      </CardContent>
    </StyledCard>
  );
};

export default Card;
