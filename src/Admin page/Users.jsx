import React from 'react'
import CancelIcon from '@mui/icons-material/Cancel';
import adduser from '../assets/adduser.png';
import TextField from "@mui/material/TextField";
import Dropdown from '../surface/Dropdown';
import UserTable from './UserTable';

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
       <div className='flex flex-col md:flex-row justify-center sm:justify-start mt-0 md:mt-0 items-center ' style={{top: '10px', right: '10px'}}>
        
       
        <div className='justify-center items-center lg:justify-start md:items-start'>
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
        <div className='flex flex-col md:flex-row justify-center lg:justify-end mt-5 items-center ' style={{top: '10px', right: '10px', }}>
            
            <div className='flex items-center justify-center rounded-lg px-5 py-2 w-full lg:w-56' style={{backgroundColor: '#F2B569', cursor: 'pointer', marginBottom: '10px'}}>
                <img src={adduser} alt="" className="h-12 w-12 lg:h-10 lg:w-10"/>
                <h1 className='text-xl font-serif px-1' style={{color: '#079440'}}>Add New User</h1>
            </div>
            <Dropdown options={userOptions} label="User Type" />
        </div>
        <div style={{borderBottomWidth: 1, borderColor: '#F2B569'}}></div>
      <UserTable/>
    </div>
  )
}

export default Users