import React, {useState} from 'react'
import CancelIcon from '@mui/icons-material/Cancel';
import add from '../assets/add.webp'
import Aos from 'aos';
import 'aos/dist/aos.css'
import Dropdown from '../component/Dropdown';
import AddSubjectHandleModal from '../component/AddSubjectHandleModal';
import TSubjectHandleTable from './TSubjectHandleTable';


function TSubjectHandles({onCancelClick, }) {

  const [open, setOpen] = useState(false);
  const [tableRows, setTableRows] = useState([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

const addSubjectToTable = (subjectData) => {
    setTableRows([...tableRows, subjectData]);
    handleClose(); // Close the modal after adding the subject
  };
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
    
    offset: 120, 
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
            <h1 className='text-2xl font-serif font-semibold px-5 pt-4' style={{color: '#079440', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'}}>Handled Subjects</h1>
        </div>
        
        </div>
        <div>

              <div data-aos='fade-left' className='flex flex-col md:flex-row justify-center lg:justify-end mt-5 items-center ' style={{ top: '10px', right: '10px', }}>
              <div className='flex items-center justify-center rounded-lg px-5 mx-10 py-2 w-full lg:w-80 item-div' style={{backgroundColor: '#F2B569', cursor: 'pointer', marginBottom: '10px',}} onClick={handleOpen}>
              <img src={add} alt="" className="h-12 w-12 lg:h-10 lg:w-10" />
              <h1 className='text-xl font-serif px-1 ' style={{ color: '#079440' }}>Add Handled Subjects</h1>
              </div>
              </div>

           
        </div>
        <div data-aos='fade-up'>
        <AddSubjectHandleModal open={open} handleClose={handleClose} addSubjectToTable={addSubjectToTable}/>
        </div>
        <div data-aos='fade-right' style={{borderBottomWidth: 1, borderColor: '#F2B569'}}></div>
       <TSubjectHandleTable rows={tableRows}/>
    </div>
  )
}

export default TSubjectHandles