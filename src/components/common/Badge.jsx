import React from 'react';
import { Chip, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledBadge = styled(Chip)(({ theme, variant = 'default', color = 'primary' }) => ({
  borderRadius: theme.spacing(1),
  fontWeight: 600,
  fontSize: '0.75rem',
  height: 'auto',
  padding: theme.spacing(0.5, 1),
  
  ...(variant === 'outlined' && {
    borderWidth: 2,
    backgroundColor: 'transparent',
  }),
  
  ...(variant === 'filled' && {
    color: theme.palette[color]?.contrastText || theme.palette.common.white,
    backgroundColor: theme.palette[color]?.main || theme.palette.primary.main,
  }),
  
  ...(variant === 'soft' && {
    backgroundColor: theme.palette[color]?.light || theme.palette.primary.light,
    color: theme.palette[color]?.dark || theme.palette.primary.dark,
    border: 'none',
  }),
}));

const Badge = ({ 
  label, 
  variant = 'default',
  color = 'primary',
  size = 'medium',
  icon,
  onClick,
  onDelete,
  sx = {},
  ...props 
}) => {
  const sizeProps = size === 'small' ? { height: 20, fontSize: '0.625rem' } : {};
  
  return (
    <StyledBadge
      label={label}
      variant={variant}
      color={color}
      icon={icon}
      onClick={onClick}
      onDelete={onDelete}
      sx={{ ...sizeProps, ...sx }}
      {...props}
    />
  );
};

export default Badge;
