import React, { useState, useEffect } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import adduser from '../assets/adduser.webp';
import TextField from "@mui/material/TextField";
import UserTable from '../Users/UserTable';
import Usersform from '../Users/Usersform';
import check from '../assets/checked.webp';
import add from '../assets/add.webp';
import Aos from 'aos';
import 'aos/dist/aos.css'
import SProfile from '../Users/Profile';
import TAttendance from './TAttendance';
import TGrades from './TGrades';
import { useUser } from '../UserContext';
import TUserTable from './TUsersTable';
import AddStudentModal from '../component/AddStudentModal';
import SuccessModal from '../component/SuccessModal';
import axios from 'axios';
import TSubjectSectionTable from './TSubjectSectionTable';
import OtherProfile from '../Users/OtherProfile';
import TOtherProfile from '../Users/TOtherProfile';
import GradeViews from '../Admin page/Views/GradeViews';

function TSubjectSection({ onCancelClick, selectedRow}) {
  
  const { loggedInUser } = useUser()
  const [enrolledStudents, setEnrolledStudents] = useState([]);
  const teacherGradeLevel = selectedRow.grade_level;
  const teacherSection = selectedRow.section_id;
  const [showProfileView, setShowProfileView] = useState(false);
  const [showAttendance, setShowAttendance] = useState(false); 
  const [showGrades, setShowGrades] = useState(false);
  const [showGradesView, setShowGradesView] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUserType, setSelectedUserType] = useState(null);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [tableRows, setTableRows] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);

  const handleViewGrades = (user) => {
    setSelectedUser(user);
    setShowGrades(true);
  };
  const handleGradesView = (user) => {
    setSelectedUser(user);
    setShowGradesView(true);
  };
  const handleViewProfile = (user) => {
    setSelectedUser(user);
    setShowProfileView(true);
  };
  const handleCheckAttendanceClick = () => {
    setShowAttendance(true);
  };
  useEffect(() => {
    // Fetch enrolled students data
    const fetchEnrolledStudents = async () => {
      try {
        console.log('selected row:', selectedRow)
        const response = await axios.get(`http://127.0.0.1:8081/api/sub/get_enrolled_students/${teacherSection}`); // Pass teacherSection as section_handle_id
        const { students } = response.data;
        setEnrolledStudents(students);
        console.log("Enrolled Students:", students);
      } catch (error) {
        console.error('Error fetching enrolled students data:', error);
      }
    };

    fetchEnrolledStudents(); // Call the function to fetch enrolled students data
    const interval = setInterval(fetchEnrolledStudents, 5000); // Fetch data every 5 seconds
  
    return () => clearInterval(interval); // Clean up setInterval on component unmount
  }, [teacherSection]);
  

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8081/api/attendance/');
        setAttendanceData(response.data);
      } catch (error) {
        console.error('Error fetching attendance data:', error);
      }
    };

    fetchAttendanceData();
  }, []);

  const handleUserTypeChange = (value) => {
    setSelectedUserType(value);
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
  ];

  return (
    <div>
    <SuccessModal
            open={successModalOpen}
            handleClose={() => {
                setSuccessModalOpen(false);
                setOpen(false)
            }}
        />
      {showProfileView ? (
        <TOtherProfile onCancelClick={() => setShowProfileView(false)} userData={selectedUser} />
      ) : (
      showGrades ? (
        <TGrades onCancelClick={() => setShowGrades(false)} enrolledStudents={enrolledStudents} userData={selectedUser}/>
      ) : (
        showGradesView ? (
          <GradeViews onCancelClick={() => setShowGradesView(false)} enrolledStudents={enrolledStudents} userData={selectedUser}/>
        ) : (
        showAttendance ? (
        <TAttendance onCancelClick={() => setShowAttendance(false)} enrolledStudents={enrolledStudents} attendanceData={attendanceData}/>
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
        <h1 className='text-2xl uppercase font-serif font-semibold px-5' style={{ color: '#079440', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>
        {selectedRow.grade_level} - {selectedRow.section}
        </h1>
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
      
      
      <div data-aos='fade-left' className='flex flex-col md:flex-row justify-between items-center mt-5' style={{ top: '10px', right: '10px' }}>
  <div className='flex justify-start items-center mb-2 md:mt-0'>
    <h1 className='text-2xl uppercase font-serif font-semibold px-5' style={{ color: '#CC33FF', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>
      {selectedRow.subject}
    </h1>
  </div>
  <div className='flex flex-col md:flex-row items-center justify-end w-full md:w-auto space-y-2 md:space-y-0 md:space-x-4 lg:space-x-10'>
    
    <div className='flex items-center justify-center rounded-lg pl-5 md:ml-10 py-2 w-full md:w-56 item-div' style={{ backgroundColor: '#F2B569', cursor: 'pointer' }} onClick={handleViewGrades}>
      <img src={add} alt="" className="h-12 w-12 lg:h-10 lg:w-10" />
      <h1 className='text-xl font-serif px-1 ' style={{ color: '#079440' }}>Add Grades</h1>
    </div>
  </div>
</div>


      <div data-aos='fade-right'>
      <div style={{ borderBottomWidth: 1, borderColor: '#F2B569', paddingTop: 10}}></div>
      <TSubjectSectionTable
              showProfileView={handleViewProfile}
              showGrades={handleViewGrades}
              showGradesView={handleGradesView}
              enrolledStudents={enrolledStudents}
            />
      </div>
   </div>
      ))))}
      
    </div>
      
  )
}

export default TSubjectSection;
