import React from 'react';
import { TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

function CustomDatePicker({ label, value, onChange, error, helperText, yearOnly }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={label}
        value={value}
        onChange={onChange}
        views={yearOnly ? ['year'] : undefined} // Set views to only 'year' if yearOnly is true
        error={error}  // Pass error prop to DatePicker
        helperText={helperText}  // Pass helperText prop to DatePicker
        renderInput={(props) => <TextField {...props} error={error} helperText={helperText} />} // Render input with error and helper text
      />
    </LocalizationProvider>
  );
}

export default CustomDatePicker;
