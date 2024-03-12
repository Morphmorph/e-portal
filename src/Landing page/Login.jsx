import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Aos from 'aos';
import 'aos/dist/aos.css'
import CancelIcon from '@mui/icons-material/Cancel';

function Login({ onCancelClick }) {
  Aos.init({
    // Global settings:
    disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
    startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
    initClassName: 'aos-init', // class applied after initialization
    animatedClassName: 'aos-animate', // class applied on animation
    useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
    disableMutationObserver: false, // disables automatic mutations' detections (advanced)
    debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
    throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)
    
    // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
    offset: 120, // offset (in px) from the original trigger point
    delay: 100, // values from 0 to 3000, with step 50ms
    duration: 800, // values from 0 to 3000, with step 50ms
    easing: 'ease', // default easing for AOS animations
    once: false, // whether animation should happen only once - while scrolling down
    mirror: false, // whether elements should animate out while scrolling past them
    anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
  });

  return (
    <div className='flex items-center justify-center px-5 pt-10 md:pt-10'>
      <div data-aos='fade-right' className='p-5 rounded-xl' style={{ boxShadow: '3px 5px 25px 2px rgba(0, 0, 0, 0.3)', overflowX: 'hidden', position: 'relative' }}>
        <div className='flex justify-end' style={{ position: 'absolute', top: '10px', right: '10px', cursor: 'pointer' }}>
        <CancelIcon
          sx={{
            color: '#F2B569',
            fontSize: 32,
            transition: 'color 0.3s, transform 0.3s',
            '&:hover': {
              color: 'red', // Change the color on hover
              transform: 'scale(1.1)', // Apply a scale effect on hover
            },
          }}
          onClick={onCancelClick}
        />
        </div>
        <div className='flex flex-col justify-center items-center'>
          <h1 className='text-2xl font-semibold' style={{ color: '#079440' }}>LOGIN</h1>
          <p className='font-medium text-gray-600'>Sign in to your account</p>
          <Box
            component="form"
            sx={{
              '& > :not(style)': { width: '100%', my: 1 },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField id="username" label="Username" variant="filled" />
            <TextField id="password" label="Password" variant="filled" />
          </Box>

          <div className='text-center text-blue-700 pb-2'>
            <p>Forgot password?</p>
          </div>
          <div className='text-center rounded-sm w-full p-2' style={{ backgroundColor: '#079440' }}>
            <p className='text-white'>Sign in</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
