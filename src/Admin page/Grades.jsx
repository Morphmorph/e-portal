import React from 'react'
import CancelIcon from '@mui/icons-material/Cancel';
import TextField from "@mui/material/TextField";
import Dropdown from '../surface/Dropdown';


function Grades({onCancelClick}) {
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
  return (
    <div>
         <div className='flex justify-start items-center' style={{ top: '10px', right: '10px' }}>
         <CancelIcon
          sx={{
            color: '#F2B569',
            fontSize: 40,
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
       <div className='flex flex-col sm:flex-row justify-center sm:justify-start mt-8 md:mt-0 items-center ' style={{top: '10px', right: '10px'}}>
        
       
        <div className='justify-start items-start sm:justify-center sm:items-center'>
            <h1 className='text-2xl font-serif font-semibold px-5' style={{color: '#079440'}}>GRADES</h1>
        </div>
        
        <TextField
          id="outlined-basic"
          variant="outlined"
          label="Search"
          sx={{
            width: '100%',
            maxWidth: { md: '500px', },
            mx: 2,
            marginBottom: '10px',
          }}
        />
        </div>
        <div className='flex flex-col sm:flex-row justify-center sm:justify-end mt-8 md:mt-5 items-center ' style={{top: '10px', right: '10px', }}>
        <Dropdown options={sy} label="School Year" />
        <Dropdown options={gradelevel} label="Grade level" />
        <Dropdown options={sections} label="Section" />
        </div>
        <div style={{borderBottomWidth: 1, borderColor: '#F2B569'}}></div>
        <div className='flex flex-col lg:flex-row justify-center sm:justify-start mt-5 items-center p-2 rounded-md' style={{top: '10px', right: '10px', backgroundColor: '#F2B569'}}>
          <h1 className='text-2xl font-semibold' style={{color: '#079440'}}>Class adviser:</h1>
          <span className='text-xl font-medium px-3 uppercase'>Son Goku</span>
          <span className='ml-0 text-center lg:ml-auto text-blue-600 px-2'>View details</span>
        </div>
      <table className='w-full mt-8 '>
        <thead>
          <tr>
            <th className='px-4 py-2'>ID</th>
            <th className='px-4 py-2'>Name</th>
            <th className='px-4 py-2'>Grades</th>
          </tr>
        </thead>
        <tbody>
        <tr className='flex-1 items-center justify-center'>
            <td className='border px-4 py-2'>1</td>
            <td className='border px-4 py-2'>John Doe</td>
            <td className='border px-4 py-2'>
            <div className='flex items-center justify-center h-8 w-full rounded-md' style={{backgroundColor: '#079440'}}>
                <span className='text-white'>View</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Grades