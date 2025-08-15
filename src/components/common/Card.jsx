import React from 'react';
import { Paper, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Paper)(({ theme, variant = 'default' }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.spacing(2),
  boxShadow: variant === 'elevated' 
    ? theme.shadows[8] 
    : variant === 'outlined'
    ? 'none'
    : theme.shadows[1],
  border: variant === 'outlined' ? `1px solid ${theme.palette.divider}` : 'none',
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    boxShadow: variant === 'elevated' 
      ? theme.shadows[12] 
      : theme.shadows[4],
    transform: 'translateY(-2px)',
  },
}));

const Card = ({ 
  children, 
  variant = 'default',
  sx = {},
  ...props 
}) => {
  return (
    <StyledCard variant={variant} sx={sx} {...props}>
      <Box>
        {children}
      </Box>
    </StyledCard>
  );
};

export default Card;
