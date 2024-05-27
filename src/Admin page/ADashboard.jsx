import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import users from '../assets/users.webp';
import { Link, useLocation, useNavigate } from 'react-router-dom'; // Import useLocation and useNavigate hooks
import star from '../assets/star.webp';
import attendance from '../assets/attendance.webp';
import billings from '../assets/billings.webp';
import ledger from '../assets/ledger.webp';
import Users from './Users';
import Grades from './Grades';
import Attendance from './Attendance';
import Billings from './Billings';
import folder from '../assets/folder.webp';
import ASubjectHandles from './ASubjectHandles';
import ASectionHandled from './ASectionHandled';

function ADashboard() {
  const [activeSection, setActiveSection] = useState('');
  const location = useLocation(); // Get the current location
  const navigate = useNavigate(); // Get the navigate function

  useEffect(() => {
    const storedSection = localStorage.getItem('activeSection');
    if (storedSection) {
      setActiveSection(storedSection);
    }
  }, []);

  const handleClick = (section) => {
    setActiveSection(section);
    localStorage.setItem('activeSection', section);
  };

  const handleCancelClick = () => {
    setActiveSection('');
    localStorage.removeItem('activeSection');
    if (location.pathname.includes('/ADashboard/user-accounts')) {
      // Check if the current path includes '/ADashboard/user-accounts'
      // If yes, remove it from the path
      const newPath = location.pathname.replace('/ADashboard/user-accounts', '/ADashboard');
      navigate(newPath); // Navigate to the new path
      console.log('New Path:', newPath);

    }
  };
  
  
  return (
    <div>
      <Container maxWidth="xl" sx={{ paddingTop: '20px', marginBottom: '20px', cursor: 'pointer'}}>
        {(activeSection === 'users' && <Users onCancelClick={handleCancelClick} />) ||
        (activeSection === 'grades' && <Grades onCancelClick={handleCancelClick}/>) ||
        (activeSection === 'attendance' && <Attendance onCancelClick={handleCancelClick}/>) ||
        (activeSection === 'billings' && <Billings onCancelClick={handleCancelClick}/>) ||
        (activeSection === 'subjecthandles' && <ASubjectHandles onCancelClick={handleCancelClick}/>) ||
        (activeSection === 'sectionhandles' && <ASectionHandled onCancelClick={handleCancelClick}/>) ||
        (
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4} lg={4}>
          <Link to="/ADashboard/user-accounts" className="link">
            <div className="bg-slate-600 text-white p-8 text-end rounded-xl item-div" onClick={() => handleClick('users')} style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',  boxShadow: '8px 8px 8px rgba(0, 0, 0, 0.3)', }}>
              <h1 className='text-2xl font-bold font-serif'>User accounts</h1>
              <img
              src={users}
              alt=""
              className="h-12 w-12 lg:h-20 lg:w-20 item-image"
            />
            </div>
             </Link>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <div className="bg-violet-300 text-white p-8 text-end rounded-xl item-div" onClick={() => handleClick('grades')} style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',  boxShadow: '8px 8px 8px rgba(0, 0, 0, 0.3)', }}>
              <h1 className='text-2xl font-bold font-serif'>Grades</h1>
              <img
              src={star}
              alt=""
              className="h-12 w-12 lg:h-20 lg:w-20 item-image"
            />
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <div className="bg-orange-300 text-white p-8 text-end rounded-xl item-div" onClick={() => handleClick('attendance')} style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',  boxShadow: '8px 8px 8px rgba(0, 0, 0, 0.3)', }}>
              <h1 className='text-2xl font-bold font-serif'>Attendance</h1>
              <img
              src={attendance}
              alt=""
              className="h-12 w-12 lg:h-20 lg:w-20 item-image"
            />
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <div className="bg-red-300 text-white p-8 text-end rounded-xl item-div" onClick={() => handleClick('billings')} style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',  boxShadow: '8px 8px 8px rgba(0, 0, 0, 0.3)', }}>
              <h1 className='text-2xl font-bold font-serif'>Billings</h1>
              <img
              src={billings}
              alt=""
              className="h-12 w-12 lg:h-20 lg:w-20 item-image"
            />
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <div className="bg-pink-400 text-white p-8 text-end rounded-xl item-div" onClick={() => handleClick('subjecthandles')} style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',  boxShadow: '8px 8px 8px rgba(0, 0, 0, 0.3)', }}>
              <h1 className='text-2xl font-bold font-serif'>Teacher Subjects</h1>
              <img
              src={ledger}
              alt=""
              className="h-12 w-12 lg:h-20 lg:w-20 item-image"
            />
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <div className="bg-blue-400 text-white p-8 text-end rounded-xl item-div" onClick={() => handleClick('sectionhandles')} style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',  boxShadow: '8px 8px 8px rgba(0, 0, 0, 0.3)', }}>
              <h1 className='text-2xl font-bold font-serif'>Teacher Advisory</h1>
              <img
              src={folder}
              alt=""
              className="h-12 w-12 lg:h-20 lg:w-20 item-image"
            />
            </div>
          </Grid>
        </Grid>)}
      </Container>
      
    </div>
  );
}

export default ADashboard;
