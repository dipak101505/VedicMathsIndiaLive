import React from 'react';
import { Box, Paper, Typography, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledForm = styled('form')(({ theme }) => ({
  width: '100%',
}));

const FormContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius * 1.5,
}));

const FormHeader = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

const Form = ({
  title,
  subtitle,
  children,
  onSubmit,
  method = 'post',
  encType = 'application/x-www-form-urlencoded',
  className,
  sx = {},
  ...props
}) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    if (onSubmit) {
      onSubmit(event);
    }
  };

  return (
    <FormContainer className={className} sx={sx} elevation={1}>
      {(title || subtitle) && (
        <FormHeader>
          {title && (
            <Typography variant="h5" component="h2" gutterBottom>
              {title}
            </Typography>
          )}
          {subtitle && (
            <Typography variant="body1" color="text.secondary">
              {subtitle}
            </Typography>
          )}
          <Divider sx={{ mt: 2 }} />
        </FormHeader>
      )}
      
      <StyledForm
        onSubmit={handleSubmit}
        method={method}
        encType={encType}
        {...props}
      >
        {children}
      </StyledForm>
    </FormContainer>
  );
};

export default Form;
