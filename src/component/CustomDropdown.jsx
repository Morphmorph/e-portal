// CustomDropdown.js
import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

function CustomDropdown({ label, options, value, onChange, ...rest }) {
  const handleChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <FormControl fullWidth variant="outlined">
      <InputLabel>{label}</InputLabel>
      <Select label={label} value={value} onChange={handleChange} {...rest}>
        {options.map((option, index) => (
          <MenuItem key={index} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default CustomDropdown;
