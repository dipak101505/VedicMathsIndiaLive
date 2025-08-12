import React from 'react';
import { Box, Button, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';

const ActionsContainer = styled(Box)(({ theme, align = 'right' }) => ({
  display: 'flex',
  justifyContent: align === 'center' ? 'center' : align === 'left' ? 'flex-start' : 'flex-end',
  alignItems: 'center',
  gap: theme.spacing(2),
  paddingTop: theme.spacing(3),
  borderTop: `1px solid ${theme.palette.divider}`,
  marginTop: theme.spacing(3),
}));

const FormActions = ({
  children,
  align = 'right',
  showDivider = true,
  sx = {},
  ...props
}) => {
  return (
    <ActionsContainer align={align} sx={sx} {...props}>
      {children}
    </ActionsContainer>
  );
};

export default FormActions;
