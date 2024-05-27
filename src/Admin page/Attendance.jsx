import React, { useState, useEffect } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import TextField from "@mui/material/TextField";
import Dropdown from '../component/Dropdown';
import AttendanceTable from './AttendanceTable';
import Aos from 'aos';
import 'aos/dist/aos.css'
import axios from 'axios';

function Attendance({ onCancelClick, selectedStudentId }) {
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
    
    offset: 0, 
    delay: 100, 
    duration: 500, 
    easing: 'ease', 
    once: false, 
    mirror: false, 
    anchorPlacement: 'top-bottom', 
  });
  const statusOptions = [
    { value: 'Present', label: 'Present', color: '#7ac57a' },
    { value: 'Absent', label: 'Absent', color: '#ff9999' },
    { value: 'Late', label: 'Late', color: '#ffa64d' },
    { value: 'Cutting', label: 'Cutting', color: '#ffcc66' },
    { value: 'Excuse', label: 'Excuse', color: '#99ccff' },
  ];
  const [attendanceSData, setAttendanceSData] = useState([]);

  const Style = {
    backdropFilter: 'blur(16px) saturate(180%)',
    WebkitBackdropFilter: 'blur(16px) saturate(180%)',
    backgroundColor: 'rgba(17, 25, 40, 0.75)',
    borderRadius: '10px',
    border: '1px solid rgba(255, 255, 255, 0.125)',
    boxShadow: '5px -4px 1px rgb(173, 173, 172)',
  };

  useEffect(() => {
    const fetchAttendanceSData = async () => {
      try {
        
        if (selectedStudentId) { // Check if selectedStudentId is not null or undefined
          const response = await axios.get(`http://127.0.0.1:8081/api/attendance/${selectedStudentId.student.user_id}`);
          setAttendanceSData(response.data);
        }
  
      } catch (error) {
        console.error('Error fetching attendance data:', error);
      }
    };
  
    fetchAttendanceSData();
  }, [selectedStudentId]);

  console.log('Selected row:', attendanceSData)
  
  return (
    <div>
      <div className='flex justify-start items-center' style={{ top: '10px', right: '10px' }}>
        <CancelIcon
          sx={{
            color: '#F2B569',
            fontSize: 40,
            transition: 'color 0.3s, transform 0.3s',
            '&:hover': {
              color: 'red',
              transform: 'scale(1.1)',
            },
            cursor: 'pointer'
          }}
          onClick={onCancelClick}
        />
      </div>
      <div data-aos='fade-left' className='flex flex-col sm:flex-row justify-center sm:justify-start mt-0 items-center'>
        <div className='justify-start items-start sm:justify-center sm:items-center mb-2 md:mt-0'>
          <h1 className='text-2xl font-serif font-semibold px-5' style={{ color: '#079440', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'}}>ATTENDANCE RECORD</h1>
        </div>
       
         
      </div>
      
      <div data-aos='fade-left' className='flex flex-col sm:flex-row justify-center md:justify-end mt-5 items-center'>
        
        
        <Dropdown options={statusOptions} label="Status" />
      </div>
      <div data-aos='fade-right' style={{borderBottomWidth: 1, borderColor: '#F2B569'}}></div>
      
        <div data-aos='fade-right' >
      <AttendanceTable attendanceSData={attendanceSData}/>
      </div>
    </div>
  );
}

export default Attendance;
