import React, { useState, useEffect } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import CustomTextField from '../component/CustomTextField';
import CustomDropdown from '../component/CustomDropdown';
import CustomDatePicker from '../component/CustomDatePicker';
import dayjs from 'dayjs'; // Import dayjs library for date formatting
import Aos from 'aos';
import axios from 'axios';
import 'aos/dist/aos.css';
import data from './options.json'; // Import the JSON data

    function Usersform({ onCancelClick,  onSaveUserData, userTypeOptions  }) {

        const [errors, setErrors] = useState({}); 
        const [userType, setUserType] = useState('student');

        const [userData, setUserData] = useState({
            student: {
                studentID: '',
                lastName: '',
                firstName: '',
                middleName: '',
                password: '',
                contactNumber: '',
                address: '',
                gradeLevel: null,
                section: '',
                adviser: '',
                dob: null,
                age: null,
                gender: '',
                mothersName: '',
                mothersContact: '',
                mothersOccupation: '',
                m_dob: null,
                m_age: null,
                fathersName: '',
                fathersContact: '',
                fathersOccupation: '',
                f_dob: null,
                f_age: null
            },
            
            teacher: {
                employeeID: '',
                lastName: '',
                firstName: '',
                middleName: '',
                password: '',
                contactNumber: '',
                address: '',
                dob: null,
                age: null,
                gender: '',
                gradeLevel: null,
                section: '',
                lastSchoolAttended: '',
                schoolAddress: '',
                yearGraduated: null,
                degree: '',
                prcNumber: '',
                expirationDate: null,
                yearsOfTeaching: ''
            },
            
        });
        
        const Style = {
            backdropFilter: 'blur(16px) saturate(180%)',
            WebkitBackdropFilter: 'blur(16px) saturate(180%)',
            backgroundColor: 'rgba(17, 25, 40, 0.75)',
            borderRadius: '10px',
            border: '1px solid rgba(255, 255, 255, 0.125)',
            boxShadow: '5px -4px 1px rgb(173, 173, 172)',
        };
    const [showForm, setShowForm] = useState(true); // State variable to manage form visibility
    const genderOptions = [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' },
        { value: 'other', label: 'Other' },
    ];

    const gradeLevels = data.gradeLevels; // Updated to use JSON data
    const sections = data.sections; // Updated to use JSON data
    const advisers = data.advisers;
    useEffect(() => {
        const initAos = async () => {
            await Aos.init({
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
        };

        initAos();

        return () => {
            // Cleanup function if needed
        };
    }, []);

    const validateStudentData = () => {
        const errors = {};
        const { student } = userData;
        const nameRegex = /^[a-zA-Z\- ]*$/;

        if (!student.studentID) errors['studentID'] = "LRN is required";
        if (!student.lastName) {
            errors['lastName'] = "Last name is required";
        } else if (!nameRegex.test(student.lastName)) {
            errors['lastName'] = "Last name should contain only letters";
        }

        if (!student.firstName) {
            errors['firstName'] = "First name is required";
        } else if (!nameRegex.test(student.firstName)) {
            errors['firstName'] = "First name should contain only letters";
        }

        if (!student.middleName) {
            errors['middleName'] = "Middle name is required";
        } else if (!nameRegex.test(student.middleName)) {
            errors['middleName'] = "Middle name should contain only letters";
        }

        if (!student.password) errors['password'] = "Password is required";
        if (!student.gender) errors['gender'] = "Gender is required";
        if (!student.address) errors['address'] = "Complete address is required";
        if (!student.dob) errors['dob'] = "Date of Birth is required";
        if (!student.age) errors['age'] = "Age is required";
        if (!student.gradeLevel) errors['gradeLevel'] = "Grade level is required";
        if (!student.section) errors['section'] = "Section is required";
        if (!student.adviser) errors['adviser'] = "Class adviser is required";


        if (!student.mothersName) {
            errors['mothersName'] = "Mother's name is required";
        } else if (!nameRegex.test(student.mothersName)) {
            errors['mothersName'] = "Mother's name should contain only letters";
        }

        if (!student.mothersContact) errors['mothersContact'] = "Contact number is required";
        if (!student.m_dob) errors['m_dob'] = "Date of Birth is required";
        if (!student.m_age) errors['m_age'] = "Age is required";
        if (!student.mothersOccupation) errors['mothersOccupation'] = "Mother's occupation is required";

        if (!student.fathersName) {
            errors['fathersName'] = "Father's name is required";
        } else if (!nameRegex.test(student.fathersName)) {
            errors['fathersName'] = "Father's name should contain only letters";
        }

        if (!student.fathersContact) errors['fathersContact'] = "Contact number is required";
        if (!student.f_dob) errors['f_dob'] = "Date of Birth is required";
        if (!student.f_age) errors['f_age'] = "Age is required";
        if (!student.fathersOccupation) errors['fathersOccupation'] = "Father's occupation is required";

        return errors;
    };

    const validateTeacherData = () => {
        const errors = {};
        const { teacher } = userData;

        if (!teacher.employeeID) errors['employeeID'] = "Employee ID is required";
        if (!teacher.lastName) errors['lastName'] = "Last Name is required";
        if (!teacher.firstName) errors['firstName'] = "First Name is required";
        if (!teacher.middleName) errors['middleName'] = "Middle Name is required";
        if (!teacher.password) errors['password'] = "Password is required";
        if (!teacher.gender) errors['gender'] = "Gender is required";
        if (!teacher.contactNumber) errors['contactNumber'] = "Contact number is required";
        if (!teacher.address) errors['address'] = "Complete address is required";
        if (!teacher.dob) errors['dob'] = "Date of Birth is required";
        if (!teacher.gradeLevel) errors['gradeLevel'] = "Handled Grade level is required";
        if (!teacher.section) errors['section'] = "Section is required";

        if (!teacher.lastSchoolAttended) errors['lastSchoolAttended'] = "This field is required";
        if (!teacher.schoolAddress) errors['schoolAddress'] = "This field is required";
        if (!teacher.yearGraduated) errors['yearGraduated'] = "This field is required";
        if (!teacher.degree) errors['degree'] = "This field is required";
        if (!teacher.prcNumber) errors['prcNumber'] = "This field is required";
        if (!teacher.expirationDate) errors['expirationDate'] = "This field is required";
        if (!teacher.yearsOfTeaching) errors['yearsOfTeaching'] = "This field is required";

        return errors;
    };

    const handlePasswordChange = () => {
        const { student, teacher } = userData;
        const lrn = student.studentID || ''; // Get LRN value
        const lastName = student.lastName || ''; // Get last name value
        const studentPassword = lastName ? `${lrn}@${lastName}` : lrn; // Generate student password

        const employeeID = teacher.employeeID || ''; // Get employee ID
        const tlastName = teacher.lastName || ''; // Get last name of adviser
        const adviserPassword = tlastName ? `${employeeID}@${tlastName}` : employeeID; // Generate adviser password

        setUserData(prevState => ({
            ...prevState,
            student: {
                ...prevState.student,
                password: studentPassword // Update student password field directly
            },
            teacher: {
                ...prevState.teacher,
                password: adviserPassword // Update adviser password field directly
            }
        }));
    };

    useEffect(() => {
        handlePasswordChange();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userData.student.studentID, userData.student.lastName, userData.teacher.employeeID, userData.teacher.lastName]);

    
    const handleDropdownChange = (category, member, value) => {
        // Update the value for the specified category and member
        if (member === 'gradeLevel') {
            // If the selected member is gradeLevel, update the sections dropdown based on the selected grade level
            setUserData(prevState => ({
                ...prevState,
                [category]: {
                    ...prevState[category],
                    [member]: value,
                    // Reset the section and adviser values when grade level changes
                    section: null,
                    adviser: null
                }
            }));
        } else {
            // If the selected member is not gradeLevel, update the value directly
            setUserData(prevState => ({
                ...prevState,
                [category]: {
                    ...prevState[category],
                    [member]: value
                }
            }));
        }
    };

    const handleUserTypeChange = (value) => {
        setUserType(value);
        setErrors({}); // Reset errors when user type changes
    };

    // Remove the calls to validateTeacherData() and validateStudentData() here

    // Modify the useEffect hook to watch for userType changes only
    useEffect(() => {
        setErrors({});
    }, [userType]);

    // Rest of your code remains unchanged
    const handleDateChange = (category, member, date) => {
        const updatedUserData = {
            ...userData,
            [category]: {
                ...userData[category],
                [member]: date,
            }
        };
    
        let updatedAge;
        if (member === 'dob') {
            updatedAge = calculateAge(date);
            updatedUserData[category].age = updatedAge;
        } else if (member === 'm_dob') {
            updatedAge = calculateAge(date);
            updatedUserData[category].m_age = updatedAge;
        } else if (member === 'f_dob') {
            updatedAge = calculateAge(date);
            updatedUserData[category].f_age = updatedAge;
        }
    
        setUserData(updatedUserData);
    
        const updatedErrors = { ...errors };
        delete updatedErrors[member];
        delete updatedErrors[member.replace('dob', 'age', '_dob', '_age')];
        setErrors(updatedErrors);
    };
    
    
    
    const handleInputChange = (e, category, subcategory = null) => {
        const { name, value } = e.target;
        // Remove the error for the field being updated
        const updatedErrors = { ...errors };
        delete updatedErrors[name];
        setErrors(updatedErrors);
    
        if (subcategory) {
            setUserData(prevState => ({
                ...prevState,
                [category]: {
                    ...prevState[category],
                    [subcategory]: {
                        ...prevState[category][subcategory],
                        [name]: value
                    }
                }
            }));
        } else {
            const updatedUserData = {
                ...userData,
                [category]: {
                    ...userData[category],
                    [name]: value,
                    age: name === 'age' ? value : userData[category].age // Update age if age field changes
                }
            };
            setUserData(updatedUserData);
    
          
        }
    
        // Check if the changed field is relevant to generating the password
        if ((category === 'student' && (name === 'studentID' || name === 'lastName')) ||
            (category === 'teacher' && (name === 'employeeID' || name === 'lastName'))) {
            handlePasswordChange(); // Call handlePasswordChange to update the password field
        }
    };
    
    const calculateAge = (dob) => {
    if (!dob) return '';
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--; // Adjust age if the birthday hasn't occurred yet
    }
    return age;
    };

    const handleSubmit = () => {
        let validationErrors = {};
        let serializedData = {};
      
        // Format date fields before sending the data
        const formattedData = {
          ...userData,
          student: {
            ...userData.student,
            dob: userData.student.dob ? dayjs(userData.student.dob).format('YYYY-MM-DD') : null,
            m_dob: userData.student.m_dob ? dayjs(userData.student.m_dob).format('YYYY-MM-DD') : null,
            f_dob: userData.student.f_dob ? dayjs(userData.student.f_dob).format('YYYY-MM-DD') : null,
          },
          // Format other date fields similarly if needed
        };
      
        if (userType === 'student') {
          validationErrors = validateStudentData();
          serializedData = {
            userType: userType,
            student: formattedData.student,
          };
        } else if (userType === 'teacher') {
          validationErrors = validateTeacherData();
          serializedData = {
            userType: userType,
            teacher: formattedData.teacher,
          };
        }
      
        if (Object.keys(validationErrors).length === 0) {
            console.log('Submitted data:', serializedData);
          // Send the formatted data to the backend
          axios.post('http://127.0.0.1:8081/api/users/', serializedData)
            .then(response => {
              console.log('Submitted data:', response.data);
              // Handle successful response if needed
            })
            .catch(error => {
              if (error.response) {
                // The request was made and the server responded with a status code
                console.error('Error submitting data:', error.response.data);
              } else if (error.request) {
                // The request was made but no response was received
                console.error('No response received:', error.request);
              } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Error setting up the request:', error.message);
              }
              // Handle the error gracefully
            });
        } else {
          setErrors(validationErrors);
        }
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

            <div data-aos='fade-left' className='flex justify-center sm:justify-end mt-0 md:mt-0 items-center' style={Style}>
                <h1 className='text-2xl md:text-3xl mx-5 font-semibold py-5 items-center justify-center' style={{color: 'white', textShadow: '2px 2px 2px rgba(0, 0, 0, 0.3)'}}>Personal Information</h1>
            </div>
            
             <div data-aos='fade-right' className='py-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5'>
            
             <CustomDropdown
                    label="User type"
                    options={userTypeOptions}
                    value={userType || ''}
                    onChange={handleUserTypeChange}
                />

            {userType === 'student' && (
                    <>
                        <CustomTextField
                            label="LRN"
                            value={userData.student.studentID}
                            type='numeric'
                            onChange={e => {
                                handleInputChange(e, 'student'); // Call handleInputChange to update LRN field
                                handlePasswordChange(); // Call handlePasswordChange to update password field
                            }} // Pass the category ('student') to handleInputChange
                            name="studentID"
                            required
                            error={errors['studentID']}
                            helperText={errors['studentID'] ? "This field is required" : ""}
                        />
                        <CustomTextField
                            label="Last Name"
                            value={userData.student.lastName}
                            onChange={e => {
                                handleInputChange(e, 'student'); // Call handleInputChange to update LRN field
                                handlePasswordChange(); // Call handlePasswordChange to update password field
                            }}
                            name="lastName"
                            required
                            error={errors['lastName']}
                            helperText={errors['lastName']}
                        />
                        <CustomTextField
                            label="First Name"
                            value={userData.student.firstName}
                            onChange={e => handleInputChange(e, 'student')} 
                            name="firstName"
                            required
                            error={errors['firstName']}
                            helperText={errors['firstName']}
                        />
                        <CustomTextField
                            label="Middle Name"
                            value={userData.student.middleName}
                            onChange={e => handleInputChange(e, 'student')} 
                            name="middleName"
                            required
                            error={errors['middleName']}
                            helperText={errors['middleName']}
                        />
                        <CustomTextField
                            label="Password"
                            value={userData.student.password}
                            onChange={e => handleInputChange(e, 'student')}
                            name="password"
                            required
                            error={errors['password']}
                            helperText={errors['password'] ? "This field is required" : ""}
                        />
                       <CustomDropdown
                            label="Gender"
                            options={genderOptions}
                            value={userData.student.gender}
                            onChange={(value) => setUserData({ ...userData, student: { ...userData.student, gender: value } })}
                            required
                            error={errors['gender']}
                            helperText={errors['gender'] ? "This field is required" : ""}
                        />


                        <CustomTextField
                            label="Contact number"
                            type="numeric"
                            value={userData.student.contactNumber}
                            onChange={e => handleInputChange(e, 'student')} 
                            name="contactNumber"
                        />
                         <CustomTextField
                            label="Complete address"
                            value={userData.student.address}
                            onChange={e => handleInputChange(e, 'student')} 
                            name="address"
                            required
                            error={errors['address']}
                            helperText={errors['address'] ? "This field is required" : ""}
                        />
                        <CustomDatePicker
                            label="Date of Birth"
                            value={userData.student.dob}
                            onChange={(date) => handleDateChange('student', 'dob', date)}
                            error={errors['dob']} 
                            helperText={errors['dob']} // Pass the helperText prop
                        />
                    <CustomTextField
                        label="Age"
                        value={userData.student.age}
                        onChange={(e) => handleInputChange(e, 'student')} 
                        error={errors['age']}
                        helperText={errors['age']}
                        InputLabelProps={{
                            shrink: !!userData.student.age, // Set label to active position if age has data
                        }}
                    />

   
                    <CustomDropdown
                        label="Grade level"
                        options={gradeLevels}
                        value={userData.student.gradeLevel}
                        onChange={(value) => handleDropdownChange('student', 'gradeLevel', value)}
                        required
                        error={errors['gradeLevel']}
                        helperText={errors['gradeLevel']}
                    />

                    <CustomDropdown
                        label="Section"
                        options={userData.student.gradeLevel ? sections[userData.student.gradeLevel] : []}
                        value={userData.student.section}
                        onChange={(value) => handleDropdownChange('student', 'section', value)}
                        required
                        error={errors['section']}
                        helperText={errors['section']}
                    />


                        <CustomDropdown
                            label="Class adviser"
                            options={advisers}
                            value={userData.student.adviser}
                           onChange={(value) => handleDropdownChange('student', 'adviser', value)}
                            required
                            error={errors['adviser']}
                            helperText={errors['adviser']}
                        />
                        
                    </>
            )}

               {userType === 'teacher' && (
                    <>
                        <CustomTextField
                            label="Employee ID"
                            type="numeric"
                            value={userData.teacher.employeeID}
                            onChange={e => handleInputChange(e, 'teacher')} 
                            name="employeeID"
                            error={errors['employeeID']}
                            helperText={errors['employeeID'] ? "This field is required" : ""}
                        />
                        <CustomTextField
                            label="Last Name"
                            value={userData.teacher.lastName}
                            onChange={e => handleInputChange(e, 'teacher')} 
                            name="lastName"
                            error={errors['lastName']}
                            helperText={errors['alastName'] ? "This field is required" : ""}
                        />
                        <CustomTextField
                            label="First Name"
                             value={userData.teacher.firstName}
                            onChange={e => handleInputChange(e, 'teacher')} 
                            name="firstName"
                            error={errors['firstName']}
                            helperText={errors['firstName'] ? "This field is required" : ""}
                        />
                        <CustomTextField
                            label="Middle Name"
                            value={userData.teacher.middleName}
                            onChange={e => handleInputChange(e, 'teacher')} 
                            name="middleName"
                            error={errors['middleName']}
                            helperText={errors['middleName'] ? "This field is required" : ""}
                        />
                        <CustomTextField
                            label="Password"
                            value={userData.teacher.password}
                            onChange={e => handleInputChange(e, 'teacher')} 
                            name="password"
                            error={errors['password']}
                            helperText={errors['password'] ? "This field is required" : ""}
                        />
                        <CustomDropdown
                            label="Gender"
                            options={genderOptions}
                            value={userData.teacher.gender}
                            onChange={(value) => setUserData({ ...userData, teacher: { ...userData.teacher, gender: value } })}
                            required
                            error={errors['gender']}
                            helperText={errors['gender'] ? "This field is required" : ""}
                        />

                        <CustomTextField
                            label="Contact number"
                            type="numeric"
                             value={userData.teacher.contactNumber}
                            onChange={e => handleInputChange(e, 'teacher')} 
                            name="contactNumber"
                            error={errors['contactNumber']}
                            helperText={errors['contactNumber'] ? "This field is required" : ""}
                        />
                          <CustomTextField
                            label="Complete address"
                             value={userData.teacher.address}
                            onChange={e => handleInputChange(e, 'teacher')} 
                            name="address"
                            required
                            error={errors['address']}
                            helperText={errors['address'] ? "This field is required" : ""}
                        />
                        <CustomDatePicker
                            label="Date of Birth"
                            value={userData.teacher.dob}
                            onChange={(date) => handleDateChange('teacher', 'dob', date)}
                            required
                            error={errors['dob']}
                            helperText={errors['dob'] ? "This field is required" : ""}
                        />

                        <CustomTextField
                            label="Age"
                            value={userData.teacher.age}
                            onChange={(e) => handleInputChange(e, 'teacher')} // Ensure onChange handler for age field
                            readOnly
                            error={errors['age']}
                            helperText={errors['age'] ? "This field is required" : ""}
                        />

                        <CustomDropdown
                            label="Handled Grade level"
                            options={gradeLevels}
                            value={userData.teacher.gradeLevel}
                           onChange={(value) => handleDropdownChange('teacher', 'gradeLevel', value)}
                           
                            required
                            error={errors['gradeLevel']}
                            helperText={errors['gradeLevel'] ? "This field is required" : ""}
                        />

                        <CustomDropdown
                            label="Section"
                            options={userData.teacher.gradeLevel ? sections[userData.teacher.gradeLevel] : []}
                             value={userData.teacher.section}
                           onChange={(value) => handleDropdownChange('teacher', 'section', value)}
                            required
                            error={errors['section']}
                            helperText={errors['section'] ? "This field is required" : ""}
                        />
                        
                    </>
               )}
            </div>

            
            {userType === 'student' && (
                <div>
                    <div  data-aos='fade-left' className='flex justify-center sm:justify-end mt-0 md:mt-0 items-center' style={Style}>
                        <h1 className='text-2xl md:text-3xl mx-5 font-semibold py-5 items-center justify-center' style={{color: 'white', textShadow: '2px 2px 2px rgba(0, 0, 0, 0.3)'}}>Parents Information</h1>
                    </div>

                    <div data-aos='fade-right' className='py-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5'>
                    <CustomTextField
                        label="Mother's Name"
                        value={userData.student.mothersName}
                        onChange={e => handleInputChange(e, 'student')} 
                        name="mothersName"
                        error={errors['mothersName']}
                        helperText={errors['mothersName']}
                    />
                       <CustomDatePicker
                            label="Date of Birth"
                            value={userData.student.m_dob}
                            onChange={(date) => handleDateChange('student', 'm_dob', date)}
                            required
                            error={errors['m_dob']}
                            helperText={errors['m_dob'] ? "This field is required" : ""}
                        />

                    <CustomTextField
                        label="Mother's Age"
                        value={userData.student.m_age}
                        onChange={(e) => handleInputChange(e, 'student')} 
                        error={errors['m_age']}
                        helperText={errors['m_age']}
                        InputLabelProps={{
                            shrink: !!userData.student.m_age, // Set label to active position if age has data
                        }}
                    />
                
                        <CustomTextField
                            label="Mother's Contact number"
                            type='numeric'
                            value={userData.student.mothersContact}
                            onChange={e => handleInputChange(e, 'student')} 
                            name="mothersContact"
                            error={errors['mothersContact']}
                            helperText={errors['mothersContact']}
                        />
                        
                        <CustomTextField
                            label="Mother's Occupation"
                            value={userData.student.mothersOccupation}
                            onChange={e => handleInputChange(e, 'student')} 
                            name="mothersOccupation"
                            error={errors['mothersOccupation']}
                            helperText={errors['mothersOccupation']}
                        />
                        </div>

                        <div data-aos='fade-right' className='py-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5'>
                        <CustomTextField
                            label="Father's Name"
                            value={userData.student.fathersName}
                            onChange={e => handleInputChange(e, 'student')} 
                            name="fathersName"
                            error={errors['fathersName']}
                            helperText={errors['fathersName']}
                        />
                       <CustomDatePicker
                            label="Date of Birth"
                            value={userData.student.f_dob}
                            onChange={(date) => handleDateChange('student', 'f_dob', date)}
                            required
                            error={errors['f_dob']}
                            helperText={errors['f_dob'] ? "This field is required" : ""}
                        />
                       <CustomTextField
                        label="Father's Age"
                        value={userData.student.f_age}
                        onChange={(e) => handleInputChange(e, 'student')} 
                        error={errors['f_age']}
                        helperText={errors['f_age']}
                        InputLabelProps={{
                            shrink: !!userData.student.f_age, // Set label to active position if age has data
                        }}
                    />
                
                        <CustomTextField
                            label="Father's Contact number"
                            type='numeric'
                            value={userData.student.fathersContact}
                            onChange={e => handleInputChange(e, 'student')} 
                            name="fathersContact"
                            error={errors['fathersContact']}
                            helperText={errors['fathersContact']}
                        />
                        
                        <CustomTextField
                            label="Father's Occupation"
                            value={userData.student.fathersOccupation}
                            onChange={e => handleInputChange(e, 'student')} 
                            name="fathersOccupation"
                            error={errors['fathersOccupation']}
                            helperText={errors['fathersOccupation']}
                        />
                    </div>
                    <div className="flex justify-center mt-5">
                         
                            <button onClick={handleSubmit} className="bg-yellow-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded item-div">
                                Submit
                            </button>
                        </div>
                </div>
            )}
           {userType === 'teacher' && (
                <div>
                    <div data-aos='fade-left' className='flex justify-center sm:justify-end mt-0 md:mt-0 items-center' style={Style}>
                        <h1 className='text-2xl md:text-3xl mx-5 font-semibold py-5 items-center justify-center' style={{color: 'white', textShadow: '2px 2px 2px rgba(0, 0, 0, 0.3)'}}>Academic Information</h1>
                    </div>

                    <div  data-aos='fade-right' className='py-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5'>
                    
                    <CustomTextField
                        label="Last School Attended"
                        value={userData.teacher.lastSchoolAttended}
                        onChange={e => handleInputChange(e,'teacher')} 
                        name="lastSchoolAttended"
                        required
                        error={errors['lastSchoolAttended']}
                        helperText={errors['lastSchoolAttended']}
                    />
                        <CustomTextField
                            label="School Address"
                            value={userData.teacher.schoolAddress}
                            onChange={e => handleInputChange(e, 'teacher')} 
                            name="schoolAddress"
                            required
                            error={errors['schoolAddress']}
                            helperText={errors['schoolAddress']}
                        />
                        <CustomDatePicker
                            label="Year Graduated"
                            value={userData.teacher.yearGraduated}
                            onChange={(date) => handleDateChange('teacher', date)}
                            required
                            yearOnly
                            error={errors['yearGraduated']}
                            helperText={errors['yearGraduated']}
                        />
                        
                        <CustomTextField
                            label="Degree"
                            value={userData.teacher.degree}
                            onChange={e => handleInputChange(e, 'teacher')} 
                            name="degree"
                            required
                            
                            error={errors['degree']}
                            helperText={errors['degree']}
                        />
                        <CustomTextField
                            label="PRC Number"
                            type="numeric"
                            value={userData.teacher.prcNumber}
                            onChange={e => handleInputChange(e, 'teacher')} 
                            name="prcNumber"
                            error={errors['prcNumber']}
                            helperText={errors['prcNumber']}
                        />
                        <CustomDatePicker
                            label="Expiration Date"
                            value={userData.teacher.expirationDate}
                            onChange={(date) => handleDateChange('teacher', date)}
                            error={errors['expirationDate']}
                            helperText={errors['expirationDate']}
                        />
                        <CustomTextField
                            label="Years of Teaching"
                            type="numeric"
                            value={userData.teacher.yearsOfTeaching}
                            required
                            onChange={e => handleInputChange(e, 'teacher')} 
                            name="yearsOfTeaching"
                            error={errors['yearsOfTeaching']}
                            helperText={errors['yearsOfTeaching']}
                        />
                        
                       
                    </div>
                    <div className="flex justify-center mt-5">
                        <button onClick={handleSubmit} className="bg-yellow-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded item-div">
                            Submit
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Usersform;