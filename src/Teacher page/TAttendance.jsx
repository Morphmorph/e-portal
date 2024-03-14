import React, { useState } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import TextField from "@mui/material/TextField";
import Dropdown from '../component/Dropdown';
import adduser from '../assets/adduser.webp';

function TAttendance({ onCancelClick }) {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const sy = [
    { value: '1', label: '2023-2024' },
    { value: '2', label: '2024-2025' },
  ];
  const gradelevel = [
    { value: '1', label: 'Kinder' },
    { value: '2', label: 'Grade 1' },
    { value: '3', label: 'Grade 2' },
    { value: '4', label: 'Grade 3' },
    { value: '5', label: 'Grade 4' },
    { value: '6', label: 'Grade 5' },
    { value: '7', label: 'Grade 6' },
  ];
  const sections = [
    { value: '1', label: 'Love' },
    { value: '2', label: 'Peace' },
    { value: '3', label: 'Faith' },
  ];
  const absent = [
    { value: '1', label: 'All' },
  ];
  const present = [
    { value: '1', label: 'All' },
  ];

  return (
    <div>
      <div className='flex justify-start items-center' style={{ top: '5px', right: '10px' }}>
        <CancelIcon
          sx={{
            position: 'absolute',
            top: '110px',
            right: '20px',
            color: '#F2B569',
            fontSize: 30,
            transition: 'color 0.3s, transform 0.3s',
            '&:hover': {
              color: 'red', // Change the color on hover
              transform: 'scale(1.1)', // Apply a scale effect on hover
            },
             cursor: 'pointer'
          }}
          onClick={onCancelClick}
        />
      </div>
      <div className='flex flex-col sm:flex-row justify-center sm:justify-start mt-8 md:mt-5 items-center ' style={{top: '0px', right: '30px'}}>
        <div className='justify-start items-start sm:justify-center sm:items-center'>
          <h1 className='text-2xl font-serif font-italian pl-2' style={{color: '#079440', fontSize: '50px'}}>ATTENDANCE</h1>
        </div>
        <div className="flex items-center">
          <TextField
            id="outlined-basic"
            variant="outlined"
            label={<span style={{ fontWeight: 'bold' }}>Search ID Number</span>}
            sx={{
              position: 'absolute',
              top: '160px',
              right: '20px',
              maxWidth: { md: '500px' },
              minWidth: '400px',
            }}
          />
        </div>
      </div>
      <div className='flex flex-col sm:flex-row justify-center sm:justify-end mt-20 md:mt-100 items-center ' style={{top: '20px', right: '20px'}}>
        <Dropdown options={sy} label={<span style={{ fontWeight: 'bold' }}>School Year</span>} sx={{ outline: '4px solid black' }} />
        <Dropdown options={gradelevel} label={<span style={{ fontWeight: 'bold' }}>Grade level</span>} sx={{ outline: '4px solid black' }} />
        <Dropdown options={sections} label={<span style={{ fontWeight: 'bold' }}>Section</span>} sx={{ outline: '4px solid black' }} />
        <Dropdown options={present} label={<span style={{ fontWeight: 'bold', }}>Present</span>} sx={{ outline: '4px solid black' }} />
        <Dropdown options={absent} label={<span style={{ fontWeight: 'bold' }}>Absent</span>} sx={{ outline: '4px solid black' }} />
      </div>
      <div style={{borderBottomWidth: 1, borderColor: '#F2B569'}}></div>
      <table className='w-full mt-8 ' style={{borderCollapse: 'bold'}}>
        <thead>
          <tr>
            <th className='px-4 py-2 border font-bold'>LRN</th>
            <th className='px-4 py-2 border font-bold'>Student Name</th>
            <th className='px-4 py-2 border font-bold'>Status</th>
            <th className='px-4 py-2 border font-bold'>Total Present</th>
            <th className='px-4 py-2 border font-bold'>Total Absent</th>
          </tr>
        </thead>
        <tbody className='text-center'>
          <tr className='flex-1 items-center justify-center'>
            <td className='border px-4 py-2'></td>
            <td className='border px-4 py-2'>John Doe</td>
            <td className='border px-4 py-2'>Present</td>
            <td className='border px-4 py-2'>
              <div className='flex items-center justify-center h-8 w-full rounded-md'>
                <span className='text-blue-500'>10</span>
              </div>
            </td>
            <td className='border px-4 py-2'>
              <div className='flex items-center justify-center h-8 w-full rounded-md'>
                <span className='text-red-500'>10</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div className='flex flex-col md:flex-row justify-center lg:justify-end mt-8 md:mt-5 items-center ' style={{ top: '10px', right: '10px'}}>
        <div className='flex items-center justify-center rounded-lg px-2 py-2 lg:w-auto' style={{ backgroundColor: '#F2B569', cursor: 'pointer', marginBottom: '10px', position: 'absolute', top: '170px', right: '450px' }}>
          <img src={adduser} alt="" className="h-12 w-100 lg:h-5 lg:w-5" />
          <h1 className='text-l font-serif px-1' style={{ color: '#079440' }}>Monthly Report</h1>
        </div>
      </div>
    </div>
  );
}

export default TAttendance;
