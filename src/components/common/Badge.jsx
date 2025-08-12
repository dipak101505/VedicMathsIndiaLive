import React from 'react';
import { Box, Typography, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledBadge = styled(Box)(({ theme, variant, color, size }) => {
  const getColorStyles = () => {
    switch (color) {
      case 'success':
        return {
          backgroundColor: theme.palette.success.light,
          color: theme.palette.success.contrastText,
          borderColor: theme.palette.success.main,
        };
      case 'warning':
        return {
          backgroundColor: theme.palette.warning.light,
          color: theme.palette.warning.contrastText,
          borderColor: theme.palette.warning.main,
        };
      case 'error':
        return {
          backgroundColor: theme.palette.error.light,
          color: theme.palette.error.contrastText,
          borderColor: theme.palette.error.main,
        };
      case 'info':
        return {
          backgroundColor: theme.palette.info.light,
          color: theme.palette.info.contrastText,
          borderColor: theme.palette.info.main,
        };
      case 'primary':
        return {
          backgroundColor: theme.palette.primary.light,
          color: theme.palette.primary.contrastText,
          borderColor: theme.palette.primary.main,
        };
      case 'secondary':
        return {
          backgroundColor: theme.palette.secondary.light,
          color: theme.palette.secondary.contrastText,
          borderColor: theme.palette.secondary.main,
        };
      default:
        return {
          backgroundColor: theme.palette.grey[200],
          color: theme.palette.text.primary,
          borderColor: theme.palette.grey[400],
        };
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          padding: theme.spacing(0.5, 1),
          fontSize: '0.75rem',
          borderRadius: theme.shape.borderRadius * 0.5,
        };
      case 'large':
        return {
          padding: theme.spacing(1, 2),
          fontSize: '1rem',
          borderRadius: theme.shape.borderRadius,
        };
      default: // medium
        return {
          padding: theme.spacing(0.75, 1.5),
          fontSize: '0.875rem',
          borderRadius: theme.shape.borderRadius * 0.75,
        };
    }
  };

  const colorStyles = getColorStyles();
  const sizeStyles = getSizeStyles();

  return {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 600,
    border: variant === 'outlined' ? `1px solid ${colorStyles.borderColor}` : 'none',
    backgroundColor: variant === 'outlined' ? 'transparent' : colorStyles.backgroundColor,
    color: variant === 'outlined' ? colorStyles.borderColor : colorStyles.color,
    ...sizeStyles,
    transition: 'all 0.2s ease-in-out',
    
    '&:hover': {
      transform: 'translateY(-1px)',
      boxShadow: theme.shadows[2],
    },
  };
});

const Badge = ({
  children,
  variant = 'filled',
  color = 'default',
  size = 'medium',
  icon,
  onClick,
  clickable = false,
  className,
  ...props
}) => {
  if (variant === 'chip') {
    return (
      <Chip
        label={children}
        color={color === 'default' ? 'default' : color}
        size={size}
        icon={icon}
        onClick={onClick}
        clickable={clickable}
        className={className}
        {...props}
      />
    );
  }

  return (
    <StyledBadge
      variant={variant}
      color={color}
      size={size}
      onClick={onClick}
      className={className}
      sx={{
        cursor: clickable || onClick ? 'pointer' : 'default',
        ...props.sx,
      }}
      {...props}
    >
      {icon && <Box component="span" sx={{ mr: 0.5, display: 'flex' }}>{icon}</Box>}
      <Typography
        component="span"
        variant="inherit"
        sx={{ lineHeight: 1 }}
      >
        {children}
      </Typography>
    </StyledBadge>
  );
};

export default Badge;
