import React from 'react';
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
        views={yearOnly ? ['year'] : undefined}
        error={!!error}
        helperText={helperText}
        slotProps={{ 
          textField: {
            helperText: error ? helperText : "", // Show helperText only if there's an error
            error: !!error, // Convert error to boolean
          },
        }}
      />
    </LocalizationProvider>
  );
}

export default CustomDatePicker;
