import React, { useState } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import adduser from '../assets/adduser.webp';
import TextField from "@mui/material/TextField";
import Dropdown from '../component/Dropdown';
import UserTable from '../Users/UserTable';
import Usersform from '../Users/Usersform';
import check from '../assets/checked.webp';
import add from '../assets/add.webp';
import Aos from 'aos';
import 'aos/dist/aos.css'
import SProfile from '../Users/Profile';
import UAttendance from '../Users/UAttendance';


function TAttendance({ onCancelClick }) {
  const [showProfileView, setShowProfileView] = useState(false);
  const [showAttendance, setShowAttendance] = useState(false); 

  const handleViewProfile = () => {
    setShowProfileView(true);
  };
  const handleCheckAttendanceClick = () => {
    setShowAttendance(true);
  };

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

  const statusOptions = [
    { value: 'present', label: 'Present' },
    { value: 'absent', label: 'Absent' },
    { value: 'late', label: 'Late' },
    { value: 'cutting', label: 'Cutting' },
    { value: 'excuse', label: 'Excuse' },
  ];

  return (
    <div>
      { showAttendance ? (
        <UAttendance showProfileView={handleViewProfile} onCancelClick={() => setShowAttendance(false)} />
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
          <h1 className='text-2xl uppercase font-serif font-semibold px-5' style={{ color: '#079440', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>Attendance</h1>
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
        <Dropdown options={statusOptions} label="Status" />
      </div>
      <div data-aos='fade-right'>
      <div style={{ borderBottomWidth: 1, borderColor: '#F2B569' }}></div>
      <UAttendance data-aos='fade-left' showProfileView={handleViewProfile}/>
      </div>
   </div>
      )}
      
    </div>
      
  )
}

export default TAttendance;
