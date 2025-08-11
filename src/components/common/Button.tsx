import React from 'react';
import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';

export interface ButtonProps extends Omit<MuiButtonProps, 'variant'> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
}

const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'medium', 
  children, 
  ...props 
}) => {
  const getMuiVariant = (): MuiButtonProps['variant'] => {
    switch (variant) {
      case 'outline':
        return 'outlined';
      case 'secondary':
        return 'contained';
      default:
        return 'contained';
    }
  };

  const getMuiSize = (): MuiButtonProps['size'] => {
    switch (size) {
      case 'small':
        return 'small';
      case 'large':
        return 'large';
      default:
        return 'medium';
    }
  };

  const getColor = (): MuiButtonProps['color'] => {
    switch (variant) {
      case 'secondary':
        return 'secondary';
      default:
        return 'primary';
    }
  };

  return (
    <MuiButton
      variant={getMuiVariant()}
      size={getMuiSize()}
      color={getColor()}
      {...props}
    >
      {children}
    </MuiButton>
  );
};

export default Button;
