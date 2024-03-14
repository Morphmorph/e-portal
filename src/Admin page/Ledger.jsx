import React from 'react'
import CancelIcon from '@mui/icons-material/Cancel';
import TextField from "@mui/material/TextField";
import Dropdown from '../component/Dropdown';
import LedgerTable from './LedgerTable';
import add from '../assets/add.webp';
import Aos from 'aos';
import 'aos/dist/aos.css'


function Ledger({onCancelClick}) {
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
  const sy = [
    { value: '1', label: '2023-2024' },
    { value: '2', label: '2024-2025' },
  ];
  const gradelevel = [
    { value: '1', label: 'Kinder' },
    { value: '2', label: 'Grade 1' },
    { value: '3', label: 'Grade 2' },
    { value: '4', label: 'Grade 3' },
    { value: '5', label: 'Grade 4' },
    { value: '6', label: 'Grade 5' },
    { value: '7', label: 'Grade 6' },
  ];
  const sections = [
    { value: '1', label: 'Love' },
    { value: '2', label: 'Peace' },
    { value: '3', label: 'Faith' },
  ];
  const status = [
    { value: '1', label: 'Paid' },
    { value: '2', label: 'Pending' },
  ];
  return (
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
       <div data-aos='fade-left' className='flex flex-col md:flex-row justify-center sm:justify-start mt-0 items-center ' style={{top: '10px', right: '10px'}}>
        
       
        <div className='justify-start items-start sm:justify-center sm:items-center mb-2 md:mt-0'>
            <h1 className='text-2xl font-serif font-semibold px-5' style={{color: '#079440', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'}}>LEDGER</h1>
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
         <div className='flex items-center justify-center rounded-lg px-5 py-2 w-full lg:w-64' style={{backgroundColor: '#F2B569', cursor: 'pointer', marginBottom: '10px'}}>
                <img src={add} alt="" className="h-10 w-10"/>
                <h1 className='text-xl font-serif px-1' style={{color: '#079440'}}>Add New Payment</h1>
            </div>
        </div>
        <div data-aos='fade-left' className='flex flex-col sm:flex-row justify-center sm:justify-end mt-5 items-center ' style={{top: '10px', right: '10px', }}>
        <Dropdown options={sy} label="School Year" />
        <Dropdown options={gradelevel} label="Grade level" />
        <Dropdown options={sections} label="Section" />
        <Dropdown options={status} label="Status" />
        </div>
        <div data-aos='fade-right' style={{borderBottomWidth: 1, borderColor: '#F2B569'}}></div>
        <div data-aos='fade-right'>
      <LedgerTable/>
      </div>
    </div>
  )
}

export default Ledger