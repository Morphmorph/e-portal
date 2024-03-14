import React, { useState } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import CustomTextField from '../component/CustomTextField';
import CustomDropdown from '../component/CustomDropdown';
import CustomDatePicker from '../component/CustomDatePicker';
import Aos from 'aos';
import 'aos/dist/aos.css'

function Usersform({ onCancelClick }) {
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

    const userOptions = [
        { value: 'student', label: 'Student' },
        { value: 'teacher', label: 'Teacher' },
    ];

    const genderOptions = [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' },
        { value: 'other', label: 'Other' },
    ];

    const [userType, setUserType] = useState('student');
    const [dob, setDob] = useState(null);
    const [step, setStep] = useState(1);


    const Style = {
        backdropFilter: 'blur(16px) saturate(180%)',
        WebkitBackdropFilter: 'blur(16px) saturate(180%)',
        backgroundColor: 'rgba(17, 25, 40, 0.75)',
        borderRadius: '10px',
        border: '1px solid rgba(255, 255, 255, 0.125)',
        boxShadow: '5px -4px 1px rgb(173, 173, 172)',
      };

      const handleNext = () => {
        if (step === 1 && userType === 'student') {
            setStep(2);
        } else if (step === 1 && userType === 'teacher') {
            setStep(3); // Set next step for teacher
        }
    };
    

    const handleBack = () => {
        if (step === 2) {
            setStep(1);
        }
        else if(step === 3) {
            setStep(1);
        }
    };

    const handleSubmit = () => {
        // Handle form submission
        console.log('Form submitted');
    };

    const calculateAge = () => {
        if (!dob) return '';
        const birthDate = new Date(dob);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            return age - 1;
        }
        return age;
    };

    return (
        <div>
            <div data-aos='fade-left' className='flex justify-start items-center pb-5' style={{ top: '10px', right: '10px' }}>
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

                <div className='justify-center items-center '>
                    <h1 className='text-2xl md:text-2xl font-serif font-semibold px-5' style={{ color: '#079440', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>ADD NEW USER</h1>
                </div>
            </div>
            {step === 1 && (
                <div>
            <div data-aos='fade-left' className='flex justify-center sm:justify-end mt-0 md:mt-0 items-center' style={Style}>
                <h1 className='text-2xl md:text-3xl mx-5 font-semibold py-5 items-center justify-center' style={{color: 'white', textShadow: '2px 2px 2px rgba(0, 0, 0, 0.3)'}}>Personal Information</h1>
            </div>
            
             <div data-aos='fade-right' className='py-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5'>
            
                <CustomDropdown label="User type" options={userOptions} value={userType} onChange={setUserType} />
                {userType === 'student' ? (
                    <>
                        <CustomTextField label='Student ID' />
                        <CustomTextField label='Full Name' />
                        <CustomDropdown label="Gender" options={genderOptions} />
                        <CustomTextField label='Contact number' />
                        <CustomTextField label='Complete address' />
                        <CustomDatePicker
                            label="Date of Birth"
                            value={dob}
                            onChange={setDob}
                        />
                        <CustomTextField label='Age' value={calculateAge()} readOnly />
                        <CustomTextField label='Grade level' />
                        <CustomTextField label='Section' />
                        <CustomTextField label='Class adviser' />
                    </>
                ) : (
                    <>
                        <CustomTextField label='Employee ID' />
                        <CustomTextField label='Full Name' />
                        <CustomDropdown label="Gender" options={genderOptions} />
                        <CustomTextField label='Contact number' type="numeric"/>
                        <CustomTextField label='Complete address' />
                        <CustomDatePicker
                            label="Date of Birth"
                            value={dob}
                            onChange={setDob}
                        />
                        <CustomTextField label='Age' value={calculateAge()} readOnly/>
                    </>
                )}
            </div>
           
            <div data-aos='fade-right' className="flex justify-center mt-5">
                <button onClick={handleNext} className="bg-yellow-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded item-div">
                    Next
                </button>
            </div>
            </div>
            )}

            {/* //Next Part of user type student */}
            {step === 2 && userType === 'student' && (
                <div>
            <div data-aos='fade-left' className='flex justify-center sm:justify-end mt-0 md:mt-0 items-center' style={Style}>
                <h1 className='text-2xl md:text-3xl mx-5 font-semibold py-5 items-center justify-center' style={{color: 'white', textShadow: '2px 2px 2px rgba(0, 0, 0, 0.3)'}}>Parents Information</h1>
            </div>
             <div data-aos='fade-right' className='py-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5'>
                
                        <CustomTextField label='Mothers name' />
                        <CustomTextField label='Contact number' type="numeric"/>
                        <CustomTextField label='Occupation' />
                        <CustomTextField label='Complete address' />
                        <CustomDatePicker
                            label="Date of Birth"
                            value={dob}
                            onChange={setDob}
                        />
                        <CustomTextField label='Age' value={calculateAge()} readOnly />
                        <CustomTextField label='Fathers name' />
                        <CustomTextField label='Contact number' type="numeric"/>
                        <CustomTextField label='Occupation' />
                        <CustomTextField label='Complete address' />
                        <CustomDatePicker
                            label="Date of Birth"
                            value={dob}
                            onChange={setDob}
                        />
                        <CustomTextField label='Age' value={calculateAge()} readOnly />
            </div>
            <div data-aos='fade-right' className="flex flex-col sm:flex-row items-center justify-center mt-5">
                <button onClick={handleBack} className="hover:bg-green-600 bg-red-600 text-white font-bold py-2 px-6 rounded item-div mr-0 sm:mr-5 h-10 w-full sm:w-28 mb-5 sm:mb-0">
                    Back
                </button>
                <button  onClick={handleSubmit} className="bg-yellow-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded item-div ml-0 sm:ml-5 h-10 w-full sm:w-28 mb-5 sm:mb-0">
                    Submit
                </button>
            </div>

            </div>
            )}
                       {/* //Next Part of user type student */}
                       {step === 3 && userType === 'teacher' && (
                <div>
            <div data-aos='fade-left' className='flex justify-center sm:justify-end mt-0 md:mt-0 items-center' style={Style}>
                <h1 className='text-2xl md:text-3xl mx-5 font-semibold py-5 items-center justify-center' style={{color: 'white', textShadow: '2px 2px 2px rgba(0, 0, 0, 0.3)'}}>Educational Information</h1>
            </div>
             <div data-aos='fade-right' className='py-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5'>
                
            <CustomTextField label='Last School Attended' />
            <CustomTextField label='School address' />
            <CustomDatePicker label='Year Graduated' granularity="year" />
            <CustomTextField label='Degree' />
            <CustomTextField label='Achievements' />
            <CustomTextField label='PRC number' type="numeric"/>
            <CustomDatePicker label="Expiration date" />
            <CustomTextField label='# Years of teaching' type="numeric"/>

                       
            </div>
            <div data-aos='fade-right' className="flex flex-col sm:flex-row items-center justify-center mt-5">
                <button onClick={handleBack} className="hover:bg-green-600 bg-red-600 text-white font-bold py-2 px-6 rounded item-div mr-0 sm:mr-5 h-10 w-full sm:w-28 mb-5 sm:mb-0">
                    Back
                </button>
                <button  onClick={handleSubmit} className="bg-yellow-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded item-div ml-0 sm:ml-5 h-10 w-full sm:w-28 mb-5 sm:mb-0">
                    Submit
                </button>
            </div>

            </div>
            )}
        </div>
    )
}

export default Usersform;
