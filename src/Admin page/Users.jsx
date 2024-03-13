import React from 'react'
import CancelIcon from '@mui/icons-material/Cancel';
import adduser from '../assets/adduser.png';
import TextField from "@mui/material/TextField";
import Dropdown from '../surface/Dropdown';

function Users({onCancelClick}) {
  const userOptions = [
    { value: 'student', label: 'Student' },
    { value: 'teacher', label: 'Teacher' },
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
       <div className='flex flex-col md:flex-row justify-center sm:justify-start mt-8 md:mt-0 items-center ' style={{top: '10px', right: '10px'}}>
        
       
        <div className='justify-start items-start md:justify-center sm:items-center'>
            <h1 className='text-2xl font-serif font-semibold px-5' style={{color: '#079440'}}>USER ACCOUNTS</h1>
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
        <div className='flex flex-col md:flex-row justify-center lg:justify-end mt-8 md:mt-5 items-center ' style={{top: '10px', right: '10px', }}>
            
            <div className='flex items-center justify-center rounded-lg px-5 py-2 w-full lg:w-56' style={{backgroundColor: '#F2B569', cursor: 'pointer', marginBottom: '10px'}}>
                <img src={adduser} alt="" className="h-12 w-12 lg:h-10 lg:w-10"/>
                <h1 className='text-xl font-serif px-1' style={{color: '#079440'}}>Add New User</h1>
            </div>
            <Dropdown options={userOptions} label="User Type" />
        </div>
        <div style={{borderBottomWidth: 1, borderColor: '#F2B569'}}></div>
      <table className='w-full mt-8 '>
        <thead>
          <tr>
            <th className='px-4 py-2'>ID</th>
            <th className='px-4 py-2'>Name</th>
            <th className='px-4 py-2'>Email</th>
            <th className='px-4 py-2'>Details</th>
          </tr>
        </thead>
        <tbody>
        <tr className='flex-1 items-center justify-center'>
            <td className='border px-4 py-2'>1</td>
            <td className='border px-4 py-2'>John Doe</td>
            <td className='border px-4 py-2'>john.doe@example.com</td>
            <td className='border px-4 py-2'>
              <div className='flex items-center justify-center bg-blue-500 h-8 w-full rounded-md'>
                <span className='text-white'>View</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Users