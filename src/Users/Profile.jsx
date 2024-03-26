import React, { useState } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from '@mui/icons-material/Edit';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { Face, Phone, LocationOn, WorkOutline, Cake, Event, Face3, Person, Class, Stars, School, HomeWorkOutlined, FlagOutlined, Numbers, EventBusy, CalendarMonth, HistoryEdu } from '@mui/icons-material';
import options from './options.json'; // Import the entire JSON object


function Profile({ onCancelClick, userData }) {

  const [isMotherInfo, setIsMotherInfo] = useState(true);
  const [currentIcon, setCurrentIcon] = useState('Face');

  const toggleInfo = () => {
    setIsMotherInfo(prevState => !prevState);
    setCurrentIcon(prevIcon => (prevIcon === 'Face' ? 'Face3' : 'Face'));
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

  const getGradeLabel = (value) => {
    const grade = options.gradeLevels.find((grade) => grade.value === value);
    return grade ? grade.label : '';
  };

  const getSectionLabel = (grade, value) => {
    const section = options.sections[grade].find((section) => section.value === value);
    return section ? section.label : '';
  };

  const getAdviserLabel = (value) => {
    const adviser = options.advisers.find((adviser) => adviser.value === value);
    return adviser ? adviser.label : '';
  };

// Function to format graduation year
const formatGradYear = (date) => {
  return date.getFullYear();
};

  // Function to format date
const formatDate = (date) => {
  const monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  return `${monthNames[monthIndex]} ${day}, ${year}`;
};

// Format dates
const dobDate = new Date(userData.student.dob);
const formattedDate = formatDate(dobDate);

const teacherDobDate = new Date(userData.advisers.dob);
const teacherFormattedDate = formatDate(teacherDobDate);

const fatherDobDate = new Date(userData.student.parents.father.dob);
const formattedFatherDate = formatDate(fatherDobDate);

const motherDobDate = new Date(userData.student.parents.mother.dob);
const formattedMotherDob = formatDate(motherDobDate);

const graduatedYear = new Date(userData.advisers.academicData.yearGraduated)
const gradYear = formatGradYear(graduatedYear);

const expDate = new Date(userData.advisers.academicData.expirationDate)
const dateExp = formatDate(expDate);
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

  const isStudent = userData && userData.userType === 'student';
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
    <p style={{ color: 'white', fontSize: 130, textAlign: 'center', }}>
      {`${userData.name.split(' ')[0][0]}${userData.name.split(' ')[1][0]}`.toUpperCase()}
    </p>
    </div>
  </div>
  
  <div data-aos='fade-right' className='p-5 mt-5 mb-5 items-start-start' style={Style}>
  {isStudent ? (
            <h1 className='uppercase font-semibold pb-2' style={{ borderBottomWidth: 1, borderColor: '#F2B569' }}>Student Information</h1>
    ) : (
      <h1 className='uppercase font-semibold pb-2' style={{ borderBottomWidth: 1, borderColor: '#F2B569' }}>Teacher Information</h1>
    )}
            <div className='flex flex-col'>
            <p className='flex items-center py-1' style={{ borderBottomWidth: 1, borderColor: '#079440' }}>
              <Person style={{ color: '#079440' }} /> {/* Icon for Birthday */}
              <span className='uppercase text-left ml-2 flex-grow text-blue-700'>Name:</span> {/* Birthday */}
              <span className='uppercase text-right ml-2'>{userData.name}</span>
            </p>
              <p className='flex items-center py-1' style={{ borderBottomWidth: 1, borderColor: '#079440', }}>
                <Class style={{ color: '#079440' }}/> {/* Icon for Age */}
                <span className='uppercase text-left ml-2 flex-grow text-blue-700'>ID number: </span>
                <span className='uppercase text-right'>{isStudent ? userData.student.studentID : userData.advisers.employeeID}</span> {/* Age */}
              </p>
              <p className='flex items-center py-1' style={{ borderBottomWidth: 1, borderColor: '#079440', }}>
                <Stars style={{ color: '#079440' }}/> {/* Icon for Gender */}
                {isStudent ? (
                <span className='uppercase text-left ml-2 flex-grow text-blue-700'>Grade & section: </span>
                ): (
                  <span className='uppercase text-left ml-2 flex-grow text-blue-700'>handled Grade & section: </span>
                )}
                <span className='uppercase text-right ml-2'>{getGradeLabel(isStudent ? userData.student.gradeLevel : userData.advisers.gradeLevel)} - {getSectionLabel(isStudent ? userData.student.gradeLevel: userData.advisers.gradeLevel, isStudent ? userData.student.section: userData.advisers.section)}</span> {/* Gender */}
              </p>
              {isStudent ? (
              <p className='flex items-center py-1' style={{ borderBottomWidth: 1, borderColor: '#079440', }}>
                <School style={{ color: '#079440' }}/> {/* Icon for Contact number */}
                <span className='uppercase text-left ml-2 flex-grow text-blue-700'>Adviser: </span>
                <span className='uppercase text-right ml-2'>{getAdviserLabel(userData.student.adviser)}</span> {/* Contact number */}
              </p>
              ) : (
                <div></div>
              )}
              </div>
              </div>
</div>

    
    <div data-aos='fade-left' className='flex flex-col justify-start items-center md:items-start md:justify-start' style={{}}>
   
          <div className='p-5 mt-0 md:mt-5 mb-5 items-start-start' style={Style}>
            <h1 className='uppercase font-semibold pb-2' style={{ borderBottomWidth: 1, borderColor: '#F2B569' }}>Personal Information</h1>
            <div className='flex flex-col'>
              <p className='flex items-center py-1' style={{ borderBottomWidth: 1, borderColor: '#079440' }}>
                <Cake style={{ color: '#079440' }} />
                <span className='uppercase text-left ml-2 flex-grow text-blue-700'>Date of birth</span>
                <span className='uppercase text-right ml-2'>{isStudent ? formattedDate: teacherFormattedDate}</span>
              </p>
              <p className='flex items-center py-1' style={{ borderBottomWidth: 1, borderColor: '#079440' }}>
                <Event style={{ color: '#079440' }} />
                <span className='uppercase text-left ml-2 flex-grow text-blue-700'>Age</span>
                <span className='uppercase text-right ml-2'>{isStudent ? userData.student.age: userData.advisers.age} Yrs old</span>
              </p>
              <p className='flex items-center py-1' style={{ borderBottomWidth: 1, borderColor: '#079440' }}>
                <Face style={{ color: '#079440' }} />
                <span className='uppercase text-left ml-2 flex-grow text-blue-700'>Gender</span>
                <span className='uppercase text-right ml-2'>{isStudent ? userData.student.gender : userData.advisers.gender}</span>
              </p>
              <p className='flex items-center py-1' style={{ borderBottomWidth: 1, borderColor: '#079440' }}>
                <Phone style={{ color: '#079440' }} />
                <span className='uppercase text-left ml-2 flex-grow text-blue-700'>Contact #</span>
                <span className='uppercase text-right ml-2'>{isStudent ? userData.student.contactNumber : userData.advisers.acontactnumber}</span>
              </p>
              <p className='flex items-center py-1' style={{ borderBottomWidth: 1, borderColor: '#079440' }}>
                <LocationOn style={{ color: '#079440' }} />
                <span className='uppercase text-left ml-2 flex-grow text-blue-700'>Address</span>
                <span className='uppercase text-right ml-2'>{isStudent ? userData.student.address : userData.advisers.aaddress }</span>
              </p>
            </div>
          </div>
          {isStudent ? (
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
                <span className='uppercase text-left ml-2 flex-grow text-blue-700'>Mother's Name</span>
                <span className='uppercase text-right ml-2'>{userData.student.parents.mother.mothersName}</span> {/* Mothers name */}
              </p>
              <p className='flex items-center py-1' style={{ borderBottomWidth: 1, borderColor: '#079440', }}>
                <Cake style={{ color: '#079440' }}/> {/* Icon for Birthday */}
                <span className='uppercase text-left ml-2 flex-grow text-blue-700'>Date of birth</span>
                <span className='uppercase text-right ml-2'>{formattedMotherDob}</span> {/* Birthday */}
              </p>
              <p className='flex items-center py-1' style={{ borderBottomWidth: 1, borderColor: '#079440', }}>
                <Event style={{ color: '#079440' }}/> {/* Icon for Age */}
                <span className='uppercase text-left ml-2 flex-grow text-blue-700'>Age</span>
                <span className='uppercase text-right ml-2'>{userData.student.parents.mother.age} Yrs old</span> {/* Age */}
              </p>
              <p className='flex items-center py-1' style={{ borderBottomWidth: 1, borderColor: '#079440', }}>
                <Phone style={{ color: '#079440' }}/> {/* Icon for Contact */}
                <span className='uppercase text-left ml-2 flex-grow text-blue-700'>Contact #</span>
                <span className='uppercase text-right ml-2'>{userData.student.parents.mother.mothersContact}</span> {/* Contact */}
              </p>
              <p className='flex items-center py-1' style={{ borderBottomWidth: 1, borderColor: '#079440', }}>
                <WorkOutline style={{ color: '#079440' }}/> {/* Icon for Occupation */}
                <span className='uppercase text-left ml-2 flex-grow text-blue-700'>Occupation</span>
                <span className='uppercase text-right ml-2'>{userData.student.parents.mother.mothersOccupation}</span> {/* Occupation */}
              </p>
              <p className='flex items-center py-1' style={{ borderBottomWidth: 1, borderColor: '#079440', }}>
                <LocationOn style={{ color: '#079440' }}/> {/* Icon for Address */}
                <span className='uppercase text-left ml-2 flex-grow text-blue-700'>Address</span>
                <span className='uppercase text-right ml-2'>{userData.student.parents.mother.mothersAddress}</span> {/* Address*/}
              </p>
            </div>
             ) : (
              <div className='flex flex-col'>
              <p className='flex items-center py-1' style={{ borderBottomWidth: 1, borderColor: '#079440', }}>
                <Face style={{ color: '#079440' }}/> {/* Icon for Mothers name */}
                <span className='uppercase text-left ml-2 flex-grow text-blue-700'>Father's Name</span>
                <span className='uppercase text-right ml-2'>{userData.student.parents.father.fathersName}</span> {/* Mothers name */}
              </p>
              <p className='flex items-center py-1' style={{ borderBottomWidth: 1, borderColor: '#079440', }}>
                <Cake style={{ color: '#079440' }}/> {/* Icon for Birthday */}
                <span className='uppercase text-left ml-2 flex-grow text-blue-700'>Date of birth</span>
                <span className='uppercase text-right ml-2'>{formattedFatherDate}</span> {/* Birthday */}
              </p>
              <p className='flex items-center py-1' style={{ borderBottomWidth: 1, borderColor: '#079440', }}>
                <Event style={{ color: '#079440' }}/> {/* Icon for Age */}
                <span className='uppercase text-left ml-2 flex-grow text-blue-700'>Age</span>
                <span className='uppercase text-right ml-2'>{userData.student.parents.father.age} Yrs old</span> {/* Age */}
              </p>
              <p className='flex items-center py-1' style={{ borderBottomWidth: 1, borderColor: '#079440', }}>
                <Phone style={{ color: '#079440' }}/> {/* Icon for Contact */}
                <span className='uppercase text-left ml-2 flex-grow text-blue-700'>Contact #</span>
                <span className='uppercase text-right ml-2'>{userData.student.parents.father.fathersContact}</span> {/* Contact */}
              </p>
              <p className='flex items-center py-1' style={{ borderBottomWidth: 1, borderColor: '#079440', }}>
                <WorkOutline style={{ color: '#079440' }}/> {/* Icon for Occupation */}
                <span className='uppercase text-left ml-2 flex-grow text-blue-700'>Occupation</span>
                <span className='uppercase text-right ml-2'>{userData.student.parents.father.fathersOccupation}</span> {/* Occupation */}
              </p>
              <p className='flex items-center py-1' style={{ borderBottomWidth: 1, borderColor: '#079440', }}>
                <LocationOn style={{ color: '#079440' }}/> {/* Icon for Address */}
                <span className='uppercase text-left ml-2 flex-grow text-blue-700'>Address</span>
                <span className='uppercase text-right ml-2'>{userData.student.parents.father.fathersAddress}</span> {/* Address*/}
              </p>
            </div>
            
            )}
           
          </div>
          ) : (
            <div className='p-5 mt-5 items-start-start' style={Style}>
            
             <div className='flex items-center justify-center ' style={{ borderBottomWidth: 1, borderColor: '#F2B569' }}>
                <h1 className='uppercase font-semibold pb-2'>Academic Information</h1>
               
              </div>

            <div className='flex flex-col'>
              <p className='flex items-center py-1' style={{ borderBottomWidth: 1, borderColor: '#079440', }}>
                <HomeWorkOutlined style={{ color: '#079440' }}/>
                <span className='uppercase text-left ml-2 flex-grow text-blue-700'>Last School Attended</span>
                <span className='uppercase text-right ml-2'>{userData.advisers.academicData.lastSchoolAttended}</span>
                
              </p>
              <p className='flex items-center py-1' style={{ borderBottomWidth: 1, borderColor: '#079440', }}>
                <LocationOn style={{ color: '#079440' }}/> 
                <span className='uppercase text-left ml-2 flex-grow text-blue-700'>School Address</span>
                <span className='uppercase text-right ml-2'>{userData.advisers.academicData.schoolAddress}</span> {/* Birthday */}
              </p>
              <p className='flex items-center py-1' style={{ borderBottomWidth: 1, borderColor: '#079440', }}>
                <Stars style={{ color: '#079440' }}/> 
                <span className='uppercase text-left ml-2 flex-grow text-blue-700'>Year Graduated</span>
                <span className='uppercase text-right ml-2'>{gradYear}</span> {/* Age */}
              </p>
              <p className='flex items-center py-1' style={{ borderBottomWidth: 1, borderColor: '#079440', }}>
                <FlagOutlined style={{ color: '#079440' }}/>
                <span className='uppercase text-left ml-2 flex-grow text-blue-700'>Degree</span> 
                <span className='uppercase text-right ml-2'>{userData.advisers.academicData.degree}</span> {/* Contact */}
              </p>
              <p className='flex items-center py-1' style={{ borderBottomWidth: 1, borderColor: '#079440', }}>
                <Numbers style={{ color: '#079440' }}/> 
                <span className='uppercase text-left ml-2 flex-grow text-blue-700'>PRC number</span>
                <span className='uppercase text-right ml-2'>{userData.advisers.academicData.prcNumber}</span> {/* Occupation */}
              </p>
              <p className='flex items-center py-1' style={{ borderBottomWidth: 1, borderColor: '#079440', }}>
                <EventBusy style={{ color: '#079440' }}/> 
                <span className='uppercase text-left ml-2 flex-grow text-blue-700'>PRC Expiration date</span>
                <span className='uppercase text-right ml-2'>{dateExp}</span> {/* Address*/}
              </p>
              <p className='flex items-center py-1' style={{ borderBottomWidth: 1, borderColor: '#079440', }}>
                <HistoryEdu style={{ color: '#079440' }}/>
                <span className='uppercase text-left ml-2 flex-grow text-blue-700'>Years of teaching</span>
                <span className='uppercase text-right ml-2'>{userData.advisers.academicData.yearsOfTeaching} Years</span> {/* Address*/}
              </p>
            </div>
            
          </div>
          )}
    </div>
  </div>
  </div>
  );
}

export default Profile;
