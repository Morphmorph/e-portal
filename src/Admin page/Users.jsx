import React, { useState } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import adduser from '../assets/adduser.webp';
import TextField from "@mui/material/TextField";
import Dropdown from '../component/Dropdown';
import UserTable from './UserTable';
import Usersform from '../Users/Usersform';
import Aos from 'aos';
import 'aos/dist/aos.css'


function Users({ onCancelClick }) {
  Aos.init({
    // Global settings:
    disable: false, 
    startEvent: 'DOMContentLoaded', 
    initClassName: 'aos-init',
    animatedClassName: 'aos-animate', 
    useClassNames: false, 
    disableMutationObserver: false, 
    debounceDelay: 50, 
    throttleDelay: 99, 
    
    offset: 120, 
    delay: 100, 
    duration: 500, 
    easing: 'ease', 
    once: false, 
    mirror: false, 
    anchorPlacement: 'top-bottom', 
  });
  const userOptions = [
    { value: 'student', label: 'Student' },
    { value: 'teacher', label: 'Teacher' },
  ];

  // State to manage the visibility of the form
  const [showForm, setShowForm] = useState(false);

  const handleAddUserClick = () => {
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
  };

  return (
    <div>
      {showForm ? (
        <Usersform onCancelClick={handleFormClose} />
      ) : (
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
      
      <div data-aos='fade-left' className='flex flex-col md:flex-row justify-center sm:justify-start mt-0 md:mt-0 items-center ' style={{ top: '10px', right: '10px' }}>
        <div className='justify-center items-center lg:justify-start md:items-start mb-2 md:mt-0'>
          <h1 className='text-2xl font-serif font-semibold px-5' style={{ color: '#079440', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>USER ACCOUNTS</h1>
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
      <div data-aos='fade-left' className='flex flex-col md:flex-row justify-center lg:justify-end mt-5 items-center ' style={{ top: '10px', right: '10px', }}>

        <div className='flex items-center justify-center rounded-lg px-5 py-2 w-full lg:w-56 item-div' style={{ backgroundColor: '#F2B569', cursor: 'pointer', marginBottom: '10px',}} onClick={handleAddUserClick}>
          <img src={adduser} alt="" className="h-12 w-12 lg:h-10 lg:w-10" />
          <h1 className='text-xl font-serif px-1 ' style={{ color: '#079440' }}>Add New User</h1>
        </div>
        <Dropdown options={userOptions} label="User Type" />
      </div>
      <div data-aos='fade-right'>
      <div style={{ borderBottomWidth: 1, borderColor: '#F2B569' }}></div>
      <UserTable data-aos='fade-left'/>
      </div>
   </div>
      )}
    </div>
      
  )
}

export default Users;
