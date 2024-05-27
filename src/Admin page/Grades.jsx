import React, { useState } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Typography from '@mui/material/Typography';
import Aos from 'aos';
import 'aos/dist/aos.css';

function Grades({ onCancelClick }) {
  const [switchStates, setSwitchStates] = useState({
    first: false,
    second: false,
    third: false,
    fourth: false,
  });

  const handleSwitchChange = (event) => {
    setSwitchStates({
      ...switchStates,
      [event.target.name]: event.target.checked,
    });
  };

  Aos.init({
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

  const Style = {
    backdropFilter: 'blur(16px) saturate(180%)',
    WebkitBackdropFilter: 'blur(16px) saturate(180%)',
    backgroundColor: 'rgba(17, 25, 40, 0.75)',
    borderRadius: '10px',
    border: '1px solid rgba(255, 255, 255, 0.125)',
    boxShadow: '5px -4px 1px rgb(173, 173, 172)',
  };

  return (
    <div>
      <div>
        <div data-aos="fade-left" className="flex justify-start items-center" style={{ top: '10px', right: '10px' }}>
          <CancelIcon
            sx={{
              color: '#F2B569',
              fontSize: 40,
              transition: 'color 0.3s, transform 0.3s',
              '&:hover': {
                color: 'red',
                transform: 'scale(1.1)',
              },
              cursor: 'pointer',
            }}
            onClick={onCancelClick}
          />

          <div className="justify-center items-center ">
            <h1
              className="text-xl md:text-2xl font-serif font-semibold px-5"
              style={{ color: '#079440', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}
            >
              GRADE SWITCHES
            </h1>
          </div>
        </div>
        <div data-aos="fade-left" className="flex flex-col sm:flex-row justify-center sm:justify-end mt-5 items-center "></div>
        <div data-aos="fade-right" style={{ borderBottomWidth: 1, borderColor: '#F2B569' }}></div>
        <div data-aos="fade-right">
          <FormControl component="fieldset" className="top-5">
            <FormGroup aria-label="position" row>
              <FormControlLabel
                value="start"
                control={<Switch sx={{ transform: 'scale(1.5)', marginLeft: 2 }} color="primary" checked={switchStates.first} onChange={handleSwitchChange} name="first" />}
                label={
                  <Typography sx={{ fontWeight: 'normal', textTransform: 'uppercase', color: switchStates.first ? 'black' : 'white' }}>
                    1st grading
                  </Typography>
                }
                labelPlacement="start"
                className={`p-5 rounded-lg ${switchStates.first ? 'bg-yellow-500' : 'bg-gray-500'} m-5`}
              />
              <FormControlLabel
                value="start"
                control={<Switch sx={{ transform: 'scale(1.5)', marginLeft: 2 }} color="primary" checked={switchStates.second} onChange={handleSwitchChange} name="second" />}
                label={
                  <Typography sx={{ fontWeight: 'normal', textTransform: 'uppercase', color: switchStates.second ? 'black' : 'white' }}>
                    2nd grading
                  </Typography>
                }
                labelPlacement="start"
                className={`p-5 rounded-lg ${switchStates.second ? 'bg-yellow-500' : 'bg-gray-500'} m-5`}
              />
              <FormControlLabel
                value="start"
                control={<Switch sx={{ transform: 'scale(1.5)', marginLeft: 2 }} color="primary" checked={switchStates.third} onChange={handleSwitchChange} name="third" />}
                label={
                  <Typography sx={{ fontWeight: 'normal', textTransform: 'uppercase', color: switchStates.third ? 'black' : 'white' }}>
                    3rd grading
                  </Typography>
                }
                labelPlacement="start"
                className={`p-5 rounded-lg ${switchStates.third ? 'bg-yellow-500' : 'bg-gray-500'} m-5`}
              />
              <FormControlLabel
                value="start"
                control={<Switch sx={{ transform: 'scale(1.5)', marginLeft: 2 }} color="primary" checked={switchStates.fourth} onChange={handleSwitchChange} name="fourth" />}
                label={
                  <Typography sx={{ fontWeight: 'normal', textTransform: 'uppercase', color: switchStates.fourth ? 'black' : 'white' }}>
                    4th grading
                  </Typography>
                }
                labelPlacement="start"
                className={`p-5 rounded-lg ${switchStates.fourth ? 'bg-yellow-500' : 'bg-gray-500'} m-5`}
              />
            </FormGroup>
          </FormControl>
        </div>
      </div>
    </div>
  );
}

export default Grades;
