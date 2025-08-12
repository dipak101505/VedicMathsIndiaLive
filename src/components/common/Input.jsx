import React from 'react';
import { TextField, FormControl, FormHelperText, InputLabel, Select, MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: theme.shape.borderRadius,
  },
}));

const StyledSelect = styled(Select)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
}));

const Input = ({
  type = 'text',
  label,
  value,
  onChange,
  error,
  helperText,
  required = false,
  disabled = false,
  fullWidth = true,
  size = 'medium',
  variant = 'outlined',
  placeholder,
  autoComplete,
  autoFocus = false,
  multiline = false,
  rows = 1,
  maxRows,
  minRows,
  select = false,
  options = [],
  startAdornment,
  endAdornment,
  inputProps = {},
  ...props
}) => {
  // Handle different input types
  if (select) {
    return (
      <FormControl 
        fullWidth={fullWidth} 
        error={!!error} 
        required={required}
        disabled={disabled}
        size={size}
        variant={variant}
      >
        <InputLabel>{label}</InputLabel>
        <StyledSelect
          value={value || ''}
          onChange={onChange}
          label={label}
          startAdornment={startAdornment}
          endAdornment={endAdornment}
          inputProps={inputProps}
          {...props}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </StyledSelect>
        {(error || helperText) && (
          <FormHelperText error={!!error}>
            {error || helperText}
          </FormHelperText>
        )}
      </FormControl>
    );
  }

  // Handle textarea
  if (multiline) {
    return (
      <StyledTextField
        type={type}
        label={label}
        value={value || ''}
        onChange={onChange}
        error={!!error}
        helperText={error || helperText}
        required={required}
        disabled={disabled}
        fullWidth={fullWidth}
        size={size}
        variant={variant}
        placeholder={placeholder}
        autoComplete={autoComplete}
        autoFocus={autoFocus}
        multiline
        rows={rows}
        maxRows={maxRows}
        minRows={minRows}
        startAdornment={startAdornment}
        endAdornment={endAdornment}
        inputProps={inputProps}
        {...props}
      />
    );
  }

  // Handle regular text input
  return (
    <StyledTextField
      type={type}
      label={label}
      value={value || ''}
      onChange={onChange}
      error={!!error}
      helperText={error || helperText}
      required={required}
      disabled={disabled}
      fullWidth={fullWidth}
      size={size}
      variant={variant}
      placeholder={placeholder}
      autoComplete={autoComplete}
      autoFocus={autoFocus}
      startAdornment={startAdornment}
      endAdornment={endAdornment}
      inputProps={inputProps}
      {...props}
    />
  );
};

export default Input;
