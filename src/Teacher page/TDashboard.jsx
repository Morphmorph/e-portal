import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import uccplogo from '../assets/uccplogo.webp';
import schlogo from '../assets/schlogo.webp';
import ledger from '../assets/ledger.webp';
import folder from '../assets/folder.webp';
import medal from '../assets/medal.webp';
import TAttendance from './TAttendance';
import TUsers from './TUsers';
import TSubjectHandles from './TSubjectHandles';
import THonorsList from './THonorsList';

const settings = ['Profile', 'Account', 'Logout'];

function TDashboard() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [showTusers, setShowTusers] = useState(false);
  const [showHandleSubjects, setShowHandleSubjects] = useState(false);
  const [showHonors, setShowHonors] = useState(false);

  const handleClick = (section) => {
    setShowTusers(false);
    setShowHandleSubjects(false);
    setShowHonors(false);

    switch (section) {
      case 'Tuser':
        setShowTusers(true);
        break;
      case 'handlesubjects':
        setShowHandleSubjects(true);
        break;
      case 'honors':
        setShowHonors(true);
        break;
      default:
        break;
    }
  };

  const handleCancelClick = () => {
    setShowTusers(false);
    setShowHandleSubjects(false);
    setShowHonors(false);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <div>
      <AppBar position="sticky" sx={{ bgcolor: '#079440' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <img
              src={uccplogo}
              alt=""
              className="h-12 w-12 lg:h-20 lg:w-20 transition-all duration-300"
            />
            <img
              src={schlogo}
              alt=""
              className="h-16 w-16 lg:h-24 lg:w-24 transition-all duration-300"
            />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                ml: 2,
                display: { md: 'flex', xs: 'none' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
                fontSize: { md: '20px' },
              }}
            >
              CAGAYAN DE ORO CHRISTIAN SCHOOL - UCCP
            </Typography>

            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                ml: 1,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
                fontSize: { xs: '18px' },
                alignItems: { xs: 'center' },
              }}
            >
              COCS-UCCP
            </Typography>

            <Box
              sx={{
                flexGrow: 1,
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      
      <Container maxWidth="xl" sx={{ paddingTop: '20px', marginBottom: '20px', cursor: 'pointer'}}>
      {(showTusers && <TUsers onCancelClick={handleCancelClick}/>) ||
      (showHandleSubjects && <TSubjectHandles onCancelClick={handleCancelClick}/>) ||
      (showHonors && <THonorsList onCancelClick={handleCancelClick}/>) ||
      (
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <div className="bg-slate-600 text-white p-8 text-end rounded-xl item-div" onClick={() => handleClick('Tuser')} style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',  boxShadow: '8px 8px 8px rgba(0, 0, 0, 0.3)', }}>
              <h1 className='text-2xl font-bold font-serif'>Section Advice</h1>
              <img
              src={folder}
              alt=""
              className="h-12 w-12 lg:h-20 lg:w-20 item-image"
            />
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <div className="bg-violet-300 text-white p-8 text-end rounded-xl item-div" onClick={() => handleClick('handlesubjects')} style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',  boxShadow: '8px 8px 8px rgba(0, 0, 0, 0.3)', }}>
              <h1 className='text-2xl font-bold font-serif'>Handled Subjects</h1>
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
