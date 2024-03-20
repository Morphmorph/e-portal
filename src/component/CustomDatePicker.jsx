import React from 'react';
import { TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function CustomDatePicker({ label, value, onChange, error, helperText, yearOnly, ...rest }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={label}
        value={value}
        onChange={onChange}
        views={yearOnly ? ['year'] : undefined} // Set views to only 'year' if yearOnly is true
        renderInput={(params) => (
          <TextField
            {...params.inputProps}
            error={error} // Pass the error prop to TextField
            helperText={helperText} // Pass the helperText prop to TextField
            {...rest}
          />
        )}
      />
    </LocalizationProvider>
  );
}

export default CustomDatePicker;
