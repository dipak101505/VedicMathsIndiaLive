import React from 'react';
import { Button as MuiButton, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledButton = styled(MuiButton)(({ theme, variant, size }) => ({
  borderRadius: theme.shape.borderRadius,
  textTransform: 'none',
  fontWeight: 600,
  
  // Variant-specific styles
  ...(variant === 'outlined' && {
    borderWidth: 2,
    '&:hover': {
      borderWidth: 2,
    },
  }),
  
  // Size-specific styles
  ...(size === 'small' && {
    padding: '6px 16px',
    fontSize: '0.875rem',
  }),
  
  ...(size === 'large' && {
    padding: '12px 32px',
    fontSize: '1.125rem',
  }),
}));

const Button = ({ 
  children, 
  variant = 'contained', 
  size = 'medium', 
  loading = false, 
  disabled, 
  startIcon, 
  endIcon,
  fullWidth = false,
  onClick,
  type = 'button',
  color = 'primary',
  ...props 
}) => {
  const isDisabled = disabled || loading;
  
  return (
    <StyledButton
      variant={variant}
      size={size}
      disabled={isDisabled}
      startIcon={loading ? <CircularProgress size={16} /> : startIcon}
      endIcon={endIcon}
      fullWidth={fullWidth}
      onClick={onClick}
      type={type}
      color={color}
      {...props}
    >
      {loading ? (children || 'Loading...') : children}
    </StyledButton>
  );
};

export default Button;
