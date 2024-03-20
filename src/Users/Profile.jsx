import React, { useState } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from '@mui/icons-material/Edit';
import Aos from 'aos';
import 'aos/dist/aos.css';
import {Face, Phone, LocationOn, WorkOutline, Cake, Event, Face3, Person, Class, Stars, School } from '@mui/icons-material'; // Import MUI icons

function Profile({ onCancelClick }) {

  const [isMotherInfo, setIsMotherInfo] = useState(true); // State to track whether to display mother's or father's information
  const [currentIcon, setCurrentIcon] = useState('Face'); // State to track the current icon being displayed

  const toggleInfo = () => {
    setIsMotherInfo(prevState => !prevState); // Toggle the state between true and false
    setCurrentIcon(prevIcon => (prevIcon === 'Face' ? 'Face3' : 'Face')); // Toggle the current icon between 'Face' and 'Face3'
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
    
    offset: 0, 
    delay: 100, 
    duration: 500, 
    easing: 'ease', 
    once: false, 
    mirror: false, 
    anchorPlacement: 'top-bottom', 
  });

  const Style = {
    width: '95%',
    textAlign: 'center',
    backdropFilter: 'blur(5px) saturate(190%)',
    WebkitBackdropFilter: 'blur(5px) saturate(190%)',
    backgroundColor: 'rgba(247, 247, 247, 0.5)',
    borderRadius: '12px',
    border: '1px solid rgba(255, 255, 255, 0.125)',
    boxShadow: '5px 4px 1px rgb(173, 173, 172)',
  };

  return (
    <div>
     
    <div className=' grid gap-8 md:grid-cols-2 mb-14 md:mb-5 h-1/3'  >
    
    <div className='flex flex-col items-center justify-center md:items-center md:justify-center' style={{}}>
  <div data-aos='zoom-in' style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
    <div className='justify-start items-center'>
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
    <div className='justify-end items-center'>
      <EditIcon
        style={{
          color: '#079440',
          fontSize: 40,
          transition: 'color 0.3s, transform 0.3s',
          cursor: 'pointer'
        }}
        onClick={onCancelClick}
      />
    </div>
  </div>

  <div data-aos='zoom-in' style={{ width: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
    <div className='flex h-60 w-60 md:h-80 md:w-80 rounded-full bg-slate-500 items-center justify-center' style={{borderBottomWidth: 10, borderTopWidth: 10, borderColor: '#F2B569'}}>
      <p style={{ color: 'white',  fontSize: 130, textAlign: 'center'}}>JD</p>
    </div>
  </div>
  
  <div data-aos='fade-right' className='p-5 mt-5 mb-5 items-start-start' style={Style}>
            <h1 className='uppercase font-semibold pb-2' style={{ borderBottomWidth: 1, borderColor: '#F2B569' }}>Student Information</h1>
            <div className='flex flex-col'>
              <p className='flex items-center py-1' style={{ borderBottomWidth: 1, borderColor: '#079440', }}>
                <Person style={{ color: '#079440' }}/> {/* Icon for Birthday */}
                <span className='uppercase text-left ml-2'>John Doe Bidobidoe</span> {/* Birthday */}
              </p>
              <p className='flex items-center py-1' style={{ borderBottomWidth: 1, borderColor: '#079440', }}>
                <Class style={{ color: '#079440' }}/> {/* Icon for Age */}
                <span className='uppercase text-left ml-2'>1234567890</span> {/* Age */}
              </p>
              <p className='flex items-center py-1' style={{ borderBottomWidth: 1, borderColor: '#079440', }}>
                <Stars style={{ color: '#079440' }}/> {/* Icon for Gender */}
                <span className='uppercase text-left ml-2'>Grade 6 - Peace</span> {/* Gender */}
              </p>
              <p className='flex items-center py-1' style={{ borderBottomWidth: 1, borderColor: '#079440', }}>
                <School style={{ color: '#079440' }}/> {/* Icon for Contact number */}
                <span className='uppercase text-left ml-2'>Son Goku</span> {/* Contact number */}
              </p>
              </div>
              </div>
</div>

    
    <div data-aos='fade-left' className='flex flex-col justify-start items-center md:items-start md:justify-start' style={{}}>
   
          <div className='p-5 mt-0 md:mt-5 mb-5 items-start-start' style={Style}>
            <h1 className='uppercase font-semibold pb-2' style={{ borderBottomWidth: 1, borderColor: '#F2B569' }}>Personal Information</h1>
            <div className='flex flex-col'>
              <p className='flex items-center py-1' style={{ borderBottomWidth: 1, borderColor: '#079440', }}>
                <Cake style={{ color: '#079440' }}/> {/* Icon for Birthday */}
                <span className='uppercase text-left ml-2'>January 22, 2002</span> {/* Birthday */}
              </p>
              <p className='flex items-center py-1' style={{ borderBottomWidth: 1, borderColor: '#079440', }}>
                <Event style={{ color: '#079440' }}/> {/* Icon for Age */}
                <span className='uppercase text-left ml-2'>22</span> {/* Age */}
              </p>
              <p className='flex items-center py-1' style={{ borderBottomWidth: 1, borderColor: '#079440', }}>
                <Face style={{ color: '#079440' }}/> {/* Icon for Gender */}
                <span className='uppercase text-left ml-2'>Male</span> {/* Gender */}
              </p>
              <p className='flex items-center py-1' style={{ borderBottomWidth: 1, borderColor: '#079440', }}>
                <Phone style={{ color: '#079440' }}/> {/* Icon for Contact number */}
                <span className='uppercase text-left ml-2'>0987654321</span> {/* Contact number */}
              </p>
              <p className='flex items-center py-1' style={{ borderBottomWidth: 1, borderColor: '#079440', }}>
                <LocationOn style={{ color: '#079440' }}/> {/* Icon for Address */}
                <span className='uppercase text-left ml-2'>Zone 1 Jujutsu High, Hidden Leaf Village</span> {/* Address */}
              </p>
            </div>
          </div>
          <div className='p-5 mt-5 items-start-start' style={Style}>
             <div className='flex items-center justify-between ' style={{ borderBottomWidth: 1, borderColor: '#F2B569' }}>
                <h1 className='uppercase font-semibold pb-2'>Parents Information</h1>
                <div className='item-div'>
                {currentIcon === 'Face' ? (
                  <Face onClick={toggleInfo} style={{ cursor: 'pointer', fontSize: 40, color: '#079440' }} className='animate-bounce'/>
                ) : (
                  <Face3 onClick={toggleInfo} style={{ cursor: 'pointer', fontSize: 40, color: '#079440' }} className='animate-bounce'/>
                )}
                </div>
              </div>
            {isMotherInfo ? (
            <div className='flex flex-col'>
              <p className='flex items-center py-1' style={{ borderBottomWidth: 1, borderColor: '#079440', }}>
                <Face3 style={{ color: '#079440' }}/> {/* Icon for Mothers name */}
                <span className='uppercase text-left ml-2'>Ohnana Uchiha</span> {/* Mothers name */}
              </p>
              <p className='flex items-center py-1' style={{ borderBottomWidth: 1, borderColor: '#079440', }}>
                <Cake style={{ color: '#079440' }}/> {/* Icon for Birthday */}
                <span className='uppercase text-left ml-2'>March 03, 1977</span> {/* Birthday */}
              </p>
              <p className='flex items-center py-1' style={{ borderBottomWidth: 1, borderColor: '#079440', }}>
                <Event style={{ color: '#079440' }}/> {/* Icon for Age */}
                <span className='uppercase text-left ml-2'>47</span> {/* Age */}
              </p>
              <p className='flex items-center py-1' style={{ borderBottomWidth: 1, borderColor: '#079440', }}>
                <Phone style={{ color: '#079440' }}/> {/* Icon for Contact */}
                <span className='uppercase text-left ml-2'>0978563412</span> {/* Contact */}
              </p>
              <p className='flex items-center py-1' style={{ borderBottomWidth: 1, borderColor: '#079440', }}>
                <WorkOutline style={{ color: '#079440' }}/> {/* Icon for Occupation */}
                <span className='uppercase text-left ml-2'>Ninja</span> {/* Occupation */}
              </p>
              <p className='flex items-center py-1' style={{ borderBottomWidth: 1, borderColor: '#079440', }}>
                <LocationOn style={{ color: '#079440' }}/> {/* Icon for Address */}
                <span className='uppercase text-left ml-2'>Zone 1 Jujutsu High, Hidden Leaf Village</span> {/* Address*/}
              </p>
            </div>
             ) : (
              <div className='flex flex-col'>
              <p className='flex items-center py-1' style={{ borderBottomWidth: 1, borderColor: '#079440', }}>
                <Face style={{ color: '#079440' }}/> {/* Icon for Mothers name */}
                <span className='uppercase text-left ml-2'>Cebuano Uchiha</span> {/* Mothers name */}
              </p>
              <p className='flex items-center py-1' style={{ borderBottomWidth: 1, borderColor: '#079440', }}>
                <Cake style={{ color: '#079440' }}/> {/* Icon for Birthday */}
                <span className='uppercase text-left ml-2'>November 08, 1966</span> {/* Birthday */}
              </p>
              <p className='flex items-center py-1' style={{ borderBottomWidth: 1, borderColor: '#079440', }}>
                <Event style={{ color: '#079440' }}/> {/* Icon for Age */}
                <span className='uppercase text-left ml-2'>56</span> {/* Age */}
              </p>
              <p className='flex items-center py-1' style={{ borderBottomWidth: 1, borderColor: '#079440', }}>
                <Phone style={{ color: '#079440' }}/> {/* Icon for Contact */}
                <span className='uppercase text-left ml-2'>0978563412</span> {/* Contact */}
              </p>
              <p className='flex items-center py-1' style={{ borderBottomWidth: 1, borderColor: '#079440', }}>
                <WorkOutline style={{ color: '#079440' }}/> {/* Icon for Occupation */}
                <span className='uppercase text-left ml-2'>Hokage</span> {/* Occupation */}
              </p>
              <p className='flex items-center py-1' style={{ borderBottomWidth: 1, borderColor: '#079440', }}>
                <LocationOn style={{ color: '#079440' }}/> {/* Icon for Address */}
                <span className='uppercase text-left ml-2'>Zone 1 Jujutsu High, Hidden Leaf Village</span> {/* Address*/}
              </p>
            </div>
            )}
          </div>
    </div>
  </div>
  </div>
  );
}

export default Profile;
