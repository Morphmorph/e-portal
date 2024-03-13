import React from 'react'
import CancelIcon from '@mui/icons-material/Cancel';
import add from '../assets/add.png';
import BillingsTable from './BillingsTable';

function Billings({onCancelClick}) {

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
       <div className='flex flex-col md:flex-row justify-center lg:justify-start mt-0 md:mt-0 items-center ' style={{top: '10px', right: '10px'}}>
        
       
        <div className='justify-start items-start lg:justify-center sm:items-center'>
            <h1 className='text-2xl font-serif font-semibold px-5 pt-4' style={{color: '#079440'}}>BILLINGS</h1>
        </div>
        
        </div>
        <div className='flex flex-col md:flex-row justify-center lg:justify-end mt-5 items-center ' style={{top: '10px', right: '10px', }}>
            
            <div className='flex items-center justify-center rounded-lg px-5 py-2 w-full lg:w-64' style={{backgroundColor: '#F2B569', cursor: 'pointer', marginBottom: '10px'}}>
                <img src={add} alt="" className="h-12 w-12 lg:h-10 lg:w-10"/>
                <h1 className='text-xl font-serif px-1' style={{color: '#079440'}}>Add New Billings</h1>
            </div>
            
        </div>
        <div style={{borderBottomWidth: 1, borderColor: '#F2B569'}}></div>
      <BillingsTable/>
    </div>
  )
}

export default Billings