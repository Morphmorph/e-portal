import React, { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function Dropdown({ options, label, value, onChange, }) {
  const [selected, setSelected] = useState(false);

  const handleChange = (event) => {
    onChange(event.target.value);
    setSelected(true); // Set selected to true when an item is selected
};

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: { md: '500px' },
        mx: 2,
        marginBottom: '10px',
      }}
    >
      <FormControl fullWidth>
            <InputLabel>{label}</InputLabel>
            <Select
                value={value || ''}
                onChange={handleChange}
                label={label}
            >
                {options.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    </Box>
  );
}

export default Dropdown;
