import * as React from 'react';
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
import { Link } from 'react-router-dom';
const pages = ['About', 'Contact', 'Sign in'];

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
  

function Appbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
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
              ml: 'auto',
              mr: -2,
              display: { md: 'none', lg: 'flex', xs: 'none' },
            }}
          >
            {pages.map((page) => (
              <HoverButton
                key={page}
                onClick={handleCloseNavMenu}
                sx={{
                  mx: 2,
                  color: 'white',
                  display: 'block',
                  fontWeight: 500,
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
  );
}
export default Appbar;
