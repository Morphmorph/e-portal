import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import uccplogo from '../assets/uccplogo.png';
import schlogo from '../assets/schlogo.png';
import { styled } from '@mui/system';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';

const pages = ['Home', 'About', 'Contact'];

// Styled button with hover animation
const HoverButton = styled(Button)({
  transition: 'transform 0.2s ease-in-out, border-bottom-color 0.2s ease-in-out',
  borderBottom: '5px solid transparent',
  borderRadius: 0,
  '&:hover': {
    transform: 'scale(1.1)',
    borderBottomColor: '#F2B569',
  },
});
  
  const HoverMenuIcon = styled(MenuIcon)({
   
    transition: 'transform 0.2s ease-in-out, color 0.2s ease-in-out',
    '&:hover': {
      transform: 'scale(1.2)',
      color: '#F2B569',
    },
  });
  
  const Footer = () => {
    return (
      <footer style={{ position: 'static', bottom: 0, backgroundColor: '#079440', color: 'white', padding: '20px', textAlign: 'center', width: '100%' }}>
        <div className="footer-content">
          <div className="footer-item">
            <PhoneInTalkIcon fontSize="small"  />
            <span style={{ marginLeft: '5px' }}> 0975-495-6027 (TM)</span>
          </div>
          <div className="footer-item">
            <LocationOnIcon fontSize="small" />
            <span style={{ marginLeft: '5px' }}> F.Abellanosa St., CDOC</span>
          </div>
          <div className="footer-item">
            <EmailIcon fontSize="small" />
            <span style={{ marginLeft: '5px' }}> cocs.edu.ph@gmail.com</span>
          </div>
          <div className="footer-item">
            <FacebookIcon fontSize="small" />
            <span style={{ marginLeft: '5px' }}> Cagayan de Oro Christian School - UCCP</span>
          </div>
          </div>
          <p>&copy; 2024 Cagayan de Oro Christian School - UCCP. All rights reserved.</p>
        
      </footer>
    );
  };
  
  
  
function Dashboard() {

  const cardStyle = {
    backdropFilter: 'blur(5px) saturate(190%)',
    WebkitBackdropFilter: 'blur(5px) saturate(190%)',
    backgroundColor: 'rgba(102, 127, 167, 0.5)',
    borderRadius: '12px',
    border: '1px solid rgba(255, 255, 255, 0.125)',
    boxShadow: '8px 8px 8px rgba(0, 0, 0, 0.3)',
  };
  const cardStyle2 = {
    backdropFilter: 'blur(5px) saturate(190%)',
    WebkitBackdropFilter: 'blur(5px) saturate(190%)',
    backgroundColor: 'rgba(247, 247, 247, 0.5)',
    borderRadius: '12px',
    border: '1px solid rgba(255, 255, 255, 0.125)',
    boxShadow: '2px 8px 20px rgba(0, 0, 0, 0.3)',
  };

  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const [currentImage, setCurrentImage] = useState(0);
    const imageSources = [schlogo, uccplogo];

    useEffect(() => {
        const intervalId = setInterval(() => {
          setCurrentImage((prevImage) => (prevImage + 1) % imageSources.length);
        }, 3000); // Adjust the interval time as needed
    
        return () => clearInterval(intervalId); // Cleanup interval on component unmount
      }, [imageSources.length]);
    
      const imageStyles = {
        image1: { height: '25rem', width: '25rem' }, // Adjust the height and width for the first image
        image2: { height: '25rem', width: '25rem' }, // Adjust the height and width for the second image
        // Add more styles for additional images as needed
      };
    
      const currentImageStyle = imageStyles[`image${currentImage + 1}`];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
     <AppBar position="sticky" sx={{ bgcolor: '#079440' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img src={uccplogo} alt="" className="h-12 w-12 lg:h-20 lg:w-20 transition-all duration-300" />
          <img src={schlogo} alt="" className="h-16 w-16 lg:h-24 lg:w-24 transition-all duration-300" />

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
              textShadow: '2px 2px 4px rgba(8, 8, 0, 0.8)',
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
              textShadow: '2px 2px 4px rgba(8, 8, 0, 0.8)',
            }}
          >
            COCS-UCCP
          </Typography>
          <Box
            sx={{
              ml: 'auto',
              mr: -2,
              display: { md: 'none', lg: 'flex', xs: 'none' },
            }}
          >
          {pages.map((page) => (
            <HoverButton
              key={page}
              onClick={() => {
                const element = document.getElementById(page.toLowerCase());
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
                handleCloseNavMenu();
              }}
              sx={{
                mx: 2,
                color: 'white',
                display: 'block',
                fontWeight: 500,
                textShadow: '2px 2px 4px rgba(8, 8, 0, 0.8)',
              }}
            >
              {page}
            </HoverButton>
          ))}
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: { md: 'flex', lg: 'none', xs: 'flex' },
              justifyContent: 'flex-end',
              
            }}
          >
             <HoverMenuIcon
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
            />
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { md: 'block', lg: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    <section id="home" className='h-screen grid gap-8 md:grid-cols-2' style={{marginTop: -50, paddingTop: 20 }}>
    <div className='flex-1 flex flex-col items-center justify-center md:items-center md:justify-center'>
      <img
        src={imageSources[currentImage]}
        alt=""
        style={currentImageStyle} // Apply the specific style for the current image
      />
    </div>
    <div className='flex-1 px-4 flex flex-col text-center justify-center pb-10 lg:pb-0 mt-0 mx-2 lg:text-start lg:justify-center'>
      <p className='text-2xl sm:text-2xl md:text-3xl font-bold mb-2' style={{ color: 'black', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>WELCOME TO</p>
      <h1 className='text-2xl sm:text-3xl md:text-6xl font-bold mb-2' style={{ color: '#079440', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>
        Cagayan de Oro Christian School - UCCP <span style={{ color: '#F2B569', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>E-Portal</span>
      </h1>
      <p className='text-2xl sm:text-2xl md:text-2xl font-semibold mb-2 italic'>
        "Give your child an education that is nurtured by Christ-centered ideals.
      </p>
    </div>
  </section>
  
  <section id="about" className='h-screen grid gap-8 md:grid-cols-2 pt-5 md:pt-0 bottom-40' style={{backgroundColor: '#F2B569' }}>
  <div className='flex-1   flex flex-col px-4 items-center justify-center md:items-center md:justify-center'>
    <div className='p-5 rounded-lg text-center md:mt-5' style={cardStyle}>
      <h1 className='text-white text-2xl sm:text-3xl md:text-6xl font-bold mb-2 italic' style={{ color: '#F2B569', textShadow: '2px 2px 4px rgba(8, 8, 0, 0.8)' }}>ABOUT US</h1>
      <p className='text-white text-2xl sm:text-2xl md:text-2xl font-semibold mb-2 italic'style={{ textShadow: '2px 2px 4px rgba(8, 8, 0, 0.8)' }}>The Christian Center, now Cagayan de Oro Christian School (COCS) is the ministerial arm of the United Church of Christ in the Philippines, (UCCP) Cagayan de Oro City that welcomes young children to grow in wisdom and stature and in favor with God and man. COCS is a school where the education of the heart begins.</p>
    </div>
  </div>
  <div className='flex-1 px-4 flex flex-col items-center justify-center pb-5 md:pb-0 mt-0 mx-2 lg:text-start lg:justify-center'>
  <img src={schlogo} alt="" className=' h-48 w-48 sm:h-96 sm:w-96'/>
</div>
</section>


<section id="contact" className='min-h-screen grid gap-8 md:grid-cols-2 pt-5 md:pt-0 pb-5' style={{backgroundColor: '' }}>
  <div className='flex-1 mt:5 flex flex-col px-4 items-center justify-center md:items-center md:justify-center md:mt-0'>
    <div className='p-5 rounded-lg text-center md:mt-5' style={cardStyle2}>
      <h1 className='text-white text-2xl sm:text-3xl md:text-6xl font-bold mb-2 italic' style={{ color: '#F2B569', textShadow: '2px 2px 4px rgba(8, 8, 0, 0.8)' }}>VISION</h1>
      <p className='text-black text-2xl sm:text-2xl md:text-2xl font-semibold mb-2 italic'style={{}}>The Christian Center, now Cagayan de Oro Christian School (COCS) is the ministerial arm of the United Church of Christ in the Philippines, (UCCP) Cagayan de Oro City that welcomes young children to grow in wisdom and stature and in favor with God and man. COCS is a school where the education of the heart begins.</p>
    </div>
  </div>
  <div className='flex-1 flex flex-col px-4 items-center pb-5 justify-center md:items-center md:justify-center md:pb-0'>
    <div className='p-5 rounded-lg text-center md:mt-5' style={cardStyle2}>
      <h1 className='text-white text-2xl sm:text-3xl md:text-6xl font-bold mb-2 italic' style={{ color: '#F2B569', textShadow: '2px 2px 4px rgba(8, 8, 0, 0.8)' }}>MISSION</h1>
      <p className='text-black text-2xl sm:text-2xl md:text-2xl font-semibold mb-2 italic'style={{  }}>The Christian Center, now Cagayan de Oro Christian School (COCS) is the ministerial arm of the United Church of Christ in the Philippines, (UCCP) Cagayan de Oro City that welcomes young children to grow in wisdom and stature and in favor with God and man. COCS is a school where the education of the heart begins.</p>
    </div>
  </div>
</section>

<Footer/>
    </div>
  );
}

export default Dashboard;
