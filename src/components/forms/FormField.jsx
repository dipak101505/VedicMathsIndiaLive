import React from 'react';
import { Box, FormControl, FormHelperText, InputLabel } from '@mui/material';
import Input from '../common/Input';

const FormField = ({
  name,
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
  type = 'text',
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
  sx = {},
  ...props
}) => {
  const handleChange = (e) => {
    if (onChange) {
      onChange(e);
    }
  };

  const hasError = !!error;

  return (
    <FormControl
      fullWidth={fullWidth}
      error={hasError}
      required={required}
      disabled={disabled}
      sx={sx}
    >
      <Input
        name={name}
        label={label}
        value={value}
        onChange={handleChange}
        error={hasError}
        helperText={hasError ? error : helperText}
        required={required}
        disabled={disabled}
        fullWidth={fullWidth}
        size={size}
        variant={variant}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        autoFocus={autoFocus}
        multiline={multiline}
        rows={rows}
        maxRows={maxRows}
        minRows={minRows}
        select={select}
        options={options}
        startAdornment={startAdornment}
        endAdornment={endAdornment}
        inputProps={inputProps}
        {...props}
      />
    </FormControl>
  );
};

export default FormField;
