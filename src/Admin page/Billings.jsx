import React from 'react'
import CancelIcon from '@mui/icons-material/Cancel';
import add from '../assets/add.webp';
import BillingsTable from './BillingsTable';
import Aos from 'aos';
import 'aos/dist/aos.css'


function Billings({onCancelClick}) {
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
       <div data-aos='fade-left' className='flex flex-col md:flex-row justify-center lg:justify-start mt-0 md:mt-0 items-center ' style={{top: '10px', right: '10px'}}>
        
       
        <div className='justify-start items-start lg:justify-center sm:items-center mb-2 md:mt-0'>
            <h1 className='text-2xl font-serif font-semibold px-5 pt-4' style={{color: '#079440', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'}}>BILLINGS</h1>
        </div>
        
        </div>
        <div data-aos='fade-left' className='flex flex-col md:flex-row justify-center lg:justify-end mt-5 items-center ' style={{top: '10px', right: '10px', }}>
            
            <div className='flex items-center justify-center rounded-lg px-5 py-2 w-full lg:w-64' style={{backgroundColor: '#F2B569', cursor: 'pointer', marginBottom: '10px'}}>
                <img src={add} alt="" className="h-12 w-12 lg:h-10 lg:w-10"/>
                <h1 className='text-xl font-serif px-1' style={{color: '#079440'}}>Add New Billings</h1>
            </div>
            
        </div>
        <div data-aos='fade-right' style={{borderBottomWidth: 1, borderColor: '#F2B569'}}></div>
      <div data-aos='fade-right'>
      <BillingsTable/>
      </div>
    </div>
  )
}

export default Billings