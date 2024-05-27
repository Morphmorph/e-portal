import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import ledger from '../assets/ledger.webp';
import folder from '../assets/folder.webp';
import medal from '../assets/medal.webp';
import TUsers from './TUsers';
import TSubjectHandles from './TSubjectHandles';
import THonorsList from './THonorsList';
import { Link, useLocation, useNavigate } from 'react-router-dom'; 
import { useUser } from '../UserContext';

function TDashboard() {
  const { loggedInUser } = useUser()
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
    if (location.pathname.includes('/TDashboard/section-advice')) {
      // Check if the current path includes '/ADashboard/user-accounts'
      // If yes, remove it from the path
      const newPath = location.pathname.replace('/TDashboard/section-advice', '/TDashboard');
      navigate(newPath); // Navigate to the new path
      console.log('New Path:', newPath);

    }
  };
  
  return (
    <div>
  
      <Container maxWidth="xl" sx={{ paddingTop: '20px', marginBottom: '20px', cursor: 'pointer'}}>
      {(activeSection === 'users' && <TUsers onCancelClick={handleCancelClick}/>) ||
      (activeSection === 'subjecthandles' && <TSubjectHandles onCancelClick={handleCancelClick}/>) ||
      (activeSection === 'honors' && <THonorsList onCancelClick={handleCancelClick}/>) ||
      (
        <Grid container spacing={3}>
          {loggedInUser && loggedInUser.section_handles && loggedInUser.section_handles.length > 0 && (
          <Grid item xs={12} sm={6} md={4} lg={4}>
          <Link to="/TDashboard/section-advice" className="link">
            <div className="bg-slate-600 text-white p-8 text-end rounded-xl item-div" onClick={() => handleClick('users')} style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',  boxShadow: '8px 8px 8px rgba(0, 0, 0, 0.3)', }}>
              <h1 className='text-2xl font-bold font-serif'>Advisory</h1>
              <img
              src={folder}
              alt=""
              className="h-12 w-12 lg:h-20 lg:w-20 item-image"
            />
            </div>
            </Link>
          </Grid>
          )}
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <div className="bg-violet-300 text-white p-8 text-end rounded-xl item-div" onClick={() => handleClick('subjecthandles')} style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',  boxShadow: '8px 8px 8px rgba(0, 0, 0, 0.3)', }}>
              <h1 className='text-2xl font-bold font-serif'>Subjects</h1>
              <img
              src={ledger}
              alt=""
              className="h-12 w-12 lg:h-20 lg:w-20 item-image"
            />
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <div className="bg-red-300 text-white p-8 text-end rounded-xl item-div" onClick={() => handleClick('honors')} style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',  boxShadow: '8px 8px 8px rgba(0, 0, 0, 0.3)', }}>
              <h1 className='text-2xl font-bold font-serif'>List of Honors</h1>
              <img
              src={medal}
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

export default TDashboard;
