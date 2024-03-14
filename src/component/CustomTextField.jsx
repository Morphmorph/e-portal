// CustomTextField.js
import React from 'react';
import TextField from '@mui/material/TextField';

function CustomTextField({ label, type, ...rest }) {
  const handleInputChange = (event) => {
    if (type === 'numeric') {
      // Remove non-numeric characters from input value
      event.target.value = event.target.value.replace(/\D/g, '');
    }
    // Forward the event to the onChange handler
    if (rest.onChange) {
      rest.onChange(event);
    }
  };

  return (
    <TextField
      label={label}
      variant="outlined"
      fullWidth
      type={type}
      onChange={handleInputChange}
      {...rest}
    />
  );
}

export default CustomTextField;
