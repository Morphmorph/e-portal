import React, { useState, useEffect } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import CustomTextField from '../component/CustomTextField';
import CustomDropdown from '../component/CustomDropdown';
import CustomDatePicker from '../component/CustomDatePicker';
import Aos from 'aos';
import 'aos/dist/aos.css';
import data from './options.json'; // Import the JSON data

function Usersform({ onCancelClick, userTypeOptions }) {
    
    const [errors, setErrors] = useState({}); 
    const [userData, setUserData] = useState({
    userType: userTypeOptions[0].value,
    student: {
        studentID: '',
        lastName: '',
        firstName: '',
        middleName: '',
        password: '',
        contactNumber: '',
        address: '',
        gradeLevel: null,
        section: null,
        adviser: null,
        dob: null,
        age: '',
        gender: null,
    },
    advisers: {
        employeeID: '',
        alastName: '',
        afirstName: '',
        amiddleName: '',
        apassword: '',
        acontactnumber: '',
        aaddress: '',
        dob: null,
        age: '',
        gender: null,
    },
    academicData: {
        lastSchoolAttended: '',
        schoolAddress: '',
        yearGraduated: null,
        degree: '',
        achievements: '',
        prcNumber: '',
        expirationDate: null,
        yearsOfTeaching: '',
    },
    parents: {
        mother: {
            mothersName: '',
            mothersContact: '',
            mothersOccupation: '',
            mothersAddress: '',
            dob: null,
            age: '',
        },
        father: {
            fathersName: '',
            fathersContact: '',
            fathersOccupation: '',
            fathersAddress: '',
            dob: null,
            age: '',
        }
    }
});

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

    const userOptions = [
        { value: 'student', label: 'Student' },
        { value: 'teacher', label: 'Teacher' },
    ];

    const genderOptions = [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' },
        { value: 'other', label: 'Other' },
    ];
    const sy = [
        { value: '1', label: '2023-2024' },
        { value: '2', label: '2024-2025' },
    ];
    const gradeLevels = data.gradeLevels; // Updated to use JSON data
    const sections = data.sections; // Updated to use JSON data
    const advisers = data.advisers; // Updated to use JSON data
    const [userType, setUserType] = useState(userTypeOptions[0].value); 
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
    // Validate fields before proceeding
    const errors = {};
    const { userType, student, advisers, } = userData;
    const nameRegex = /^[a-zA-Z\- ]*$/;

    if (userType === 'student') {
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
        if (!student.gender) errors['student.gender'] = "Gender is required";
        // if (!student.contactNumber) errors['contactNumber'] = "Contact number is required";
        if (!student.address) errors['address'] = "Complete address is required";
        if (!student.dob) errors['student.dob'] = "Date of Birth is required";
        if (!student.gradeLevel) errors['gradeLevel'] = "Grade level is required";
        if (!student.section) errors['section'] = "Section is required";
        if (!student.adviser) errors['adviser'] = "Class adviser is required";
       
    } else if (userType === 'teacher') {
        if (!advisers.employeeID) errors['employeeID'] = "Employee ID is required";
        if (!advisers.alastName) errors['alastName'] = "Last Name is required";
        if (!advisers.afirstName) errors['afirstName'] = "First Name is required";
        if (!advisers.amiddleName) errors['amiddleName'] = "Middle Name is required";
        if (!advisers.apassword) errors['apassword'] = "Password is required";
        if (!advisers.gender) errors['advisers.gender'] = "Gender is required";
        if (!advisers.acontactnumber) errors['acontactnumber'] = "Contact number is required";
        if (!advisers.aaddress) errors['aaddress'] = "Complete address is required";
        if (!advisers.dob) errors['advisers.dob'] = "Date of Birth is required";
        if (!advisers.gradeLevel) errors['gradeLevel'] = "Handled Grade level is required";
        if (!advisers.section) errors['section'] = "Section is required";
    }

    // Check if there are any errors
    if (Object.keys(errors).length > 0) {
        setErrors(errors); // Update the errors state to display error messages
    } else {
        console.log('Inputted data:', userData);
        if (step === 1) {
            if (userData.userType === 'student') {
                setStep(2); // Move to the next step for student (Parents Information)
            } else if (userData.userType === 'teacher') {
                setStep(2); // Move to the next step for teacher (Academic Information)
            }
        }
    }
};

const handleBack = () => {
    setStep(1);
    // Clear errors related to dropdown fields and student gender
    setErrors(prevErrors => {
        const updatedErrors = { ...prevErrors };
        // Clear errors for student dropdown fields
        if (userData.userType === 'student') {
            delete updatedErrors['gradeLevel'];
            delete updatedErrors['section'];
            delete updatedErrors['adviser'];
            delete updatedErrors['student.gender'];
        } else if (userData.userType === 'teacher') {
            // Clear errors for teacher dropdown fields
            delete updatedErrors['advisers.gender'];
            delete updatedErrors['advisers.gradeLevel'];
            delete updatedErrors['advisers.section'];
        }
        return updatedErrors;
    });
};


    
    const handleSubmit = () => {
        const errors = {};
        const { userType, academicData, parents } = userData;
        const nameRegex = /^[a-zA-Z]+$/;
    
        if (userType === 'student') {
            if (!parents.mother.mothersName) {
                errors['mothersName'] = "Mother's name is required";
            } else if (!nameRegex.test(parents.mother.mothersName)) {
                errors['mothersName'] = "Mother's name should contain only letters";
            }
            if (!parents.mother.dob) errors['mother.dob'] = "Date of Birth is required";
            if (!parents.mother.mothersContact) errors['mothersContact'] = "Contact number is required";
            if (!parents.mother.mothersOccupation) errors['mothersOccupation'] = "Mother's occupation is required";
            if (!parents.mother.mothersAddress) errors['mothersAddress'] = "Complete address is required";
            if (!parents.father.fathersName) {
                errors['fathersName'] = "Father's name is required";
            } else if (!nameRegex.test(parents.father.fathersName)) {
                errors['fathersName'] = "Father's name should contain only letters";
            }
            if (!parents.father.dob) errors['father.dob'] = "Date of Birth is required";
            if (!parents.father.fathersContact) errors['fathersContact'] = "Contact number is required";
            if (!parents.father.fathersOccupation) errors['fathersOccupation'] = "Father's occupation is required";
            if (!parents.father.fathersAddress) errors['fathersAddress'] = "Complete address is required";
        }
        else if (userType === 'teacher') {
            if (!academicData.lastSchoolAttended) errors['lastSchoolAttended'] = "This field is required";
            if (!academicData.schoolAddress) errors['schoolAddress'] = "This field is required";
            if (!academicData.yearGraduated) errors['yearGraduated'] = "This field is required";
            if (!academicData.degree) errors['degree'] = "This field is required";
            if (!academicData.prcNumber) errors['prcNumber'] = "This field is required";
            if (!academicData.expirationDate) errors['expirationDate'] = "This field is required";
            if (!academicData.yearsOfTeaching) errors['yearsOfTeaching'] = "This field is required";
        }

        if (Object.keys(errors).length > 0) {
            setErrors(errors); // Update the errors state to display error messages
        } else {
            console.log('Inputted data:', userData);
            if (step === 1) {
                if (userData.userType === 'student') {
                    setStep(2); // Move to the next step for student (Parents Information)
                } else if (userData.userType === 'teacher') {
                    setStep(2); // Move to the next step for teacher (Academic Information)
                }
            }
        }
    };

    useEffect(() => {
        setErrors({});
    }, [userData.userType]);


    
    const handlePasswordChange = () => {
        const { student, advisers } = userData;
        const lrn = student.studentID || ''; // Get LRN value
        const lastName = student.lastName || ''; // Get last name value
        const studentPassword = lastName ? `${lrn}@${lastName}` : lrn; // Generate student password
    
        const employeeID = advisers.employeeID || ''; // Get employee ID
        const alastName = advisers.alastName || ''; // Get last name of adviser
        const adviserPassword = alastName ? `${employeeID}@${alastName}` : employeeID; // Generate adviser password
    
        setUserData(prevState => ({
            ...prevState,
            student: {
                ...prevState.student,
                password: studentPassword // Update student password field directly
            },
            advisers: {
                ...prevState.advisers,
                apassword: adviserPassword // Update adviser password field directly
            }
        }));
    };
    
    useEffect(() => {
        handlePasswordChange();
    }, [userData.student.studentID, userData.student.lastName, userData.advisers.employeeID, userData.advisers.alastName]);
    

    const handleParentInputChange = (e, parentType) => {
        const { name, value } = e.target;
        const updatedErrors = { ...errors };
        delete updatedErrors[name];
        setErrors(updatedErrors);
        setUserData(prevState => ({
            ...prevState,
            parents: {
                ...prevState.parents,
                [parentType]: {
                    ...prevState.parents[parentType],
                    [name]: value
                }
            }
        }));
    };
    const handleInputChange = (e, category) => {
        const { name, value } = e.target;
        // Remove the error for the field being updated
        const updatedErrors = { ...errors };
        delete updatedErrors[name];
        setErrors(updatedErrors);
        setUserData(prevState => ({
            ...prevState,
            [category]: {
                ...prevState[category],
                [name]: value
            }
        }));
    
        // Check if the changed field is relevant to generating the password
        if ((category === 'student' && (name === 'studentID' || name === 'lastName')) ||
            (category === 'advisers' && (name === 'employeeID' || name === 'alastName'))) {
            handlePasswordChange(); // Call handlePasswordChange to update the password field
        }
    };
    
    
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
    

    
    const handleDateChange = (category, member, date) => {
        const updatedUserData = {
          ...userData,
          [category]: {
            ...userData[category],
            [member]: date
          }
        };
        // Calculate and update the age
        updatedUserData[category].age = calculateAge(date);
        setUserData(updatedUserData);
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
            
             <CustomDropdown
                label="User type"
                options={userTypeOptions}
                value={userData.userType}
                onChange={(value) => setUserData({ ...userData, userType: value })}
            />

                {userData.userType === 'student' ? (
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
                            error={errors['student.gender']}
                            helperText={errors['student.gender'] ? "This field is required" : ""}
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
                        required
                    />
                    <CustomTextField
                        label="Age"
                        value={userData.student.age}
                        readOnly
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
                ) : (
                    <>
                        <CustomTextField
                            label="Employee ID"
                            type="numeric"
                            value={userData.advisers.employeeID}
                            onChange={e => handleInputChange(e, 'advisers')} 
                            name="employeeID"
                            error={errors['employeeID']}
                            helperText={errors['employeeID'] ? "This field is required" : ""}
                        />
                        <CustomTextField
                            label="Last Name"
                            value={userData.advisers.alastName}
                            onChange={e => handleInputChange(e, 'advisers')} 
                            name="alastName"
                            error={errors['alastName']}
                            helperText={errors['alastName'] ? "This field is required" : ""}
                        />
                        <CustomTextField
                            label="First Name"
                             value={userData.advisers.afirstName}
                            onChange={e => handleInputChange(e, 'advisers')} 
                            name="afirstName"
                            error={errors['afirstName']}
                            helperText={errors['afirstName'] ? "This field is required" : ""}
                        />
                        <CustomTextField
                            label="Middle Name"
                            value={userData.advisers.amiddleName}
                            onChange={e => handleInputChange(e, 'advisers')} 
                            name="amiddleName"
                            error={errors['amiddleName']}
                            helperText={errors['amiddleName'] ? "This field is required" : ""}
                        />
                        <CustomTextField
                            label="Password"
                            value={userData.advisers.apassword}
                            onChange={e => handleInputChange(e, 'advisers')} 
                            name="apassword"
                            error={errors['apassword']}
                            helperText={errors['apassword'] ? "This field is required" : ""}
                        />
                        <CustomDropdown
                            label="Gender"
                            options={genderOptions}
                            value={userData.advisers.gender}
                            onChange={(value) => setUserData({ ...userData, advisers: { ...userData.advisers, gender: value } })}
                            required
                            error={errors['advisers.gender']}
                            helperText={errors['advisers.gender'] ? "This field is required" : ""}
                        />

                        <CustomTextField
                            label="Contact number"
                            type="numeric"
                             value={userData.advisers.acontactnumber}
                            onChange={e => handleInputChange(e, 'advisers')} 
                            name="acontactnumber"
                            error={errors['acontactnumber']}
                            helperText={errors['acontactnumber'] ? "This field is required" : ""}
                        />
                          <CustomTextField
                            label="Complete address"
                             value={userData.advisers.aaddress}
                            onChange={e => handleInputChange(e, 'advisers')} 
                            name="aaddress"
                            required
                            error={errors['aaddress']}
                            helperText={errors['aaddress'] ? "This field is required" : ""}
                        />
                     <CustomDatePicker
                        label="Date of Birth"
                        value={userData.advisers.dob}
                        onChange={(date) => handleDateChange('advisers', 'dob', date)} // Pass 'student' and 'dob' as parameters
                        required
                        error={errors['advisers.dob']}
                        helperText={errors['advisers.dob'] ? "This field is required" : ""}
                     />

                     <CustomTextField
                        label="Age"
                        value={userData.advisers.age}
                        readOnly
                        error={errors['advisers.age']}
                        helperText={errors['advisers.age'] ? "This field is required" : ""}
                     />

                        <CustomDropdown
                            label="Handled Grade level"
                            options={gradeLevels}
                            value={userData.advisers.gradeLevel}
                           onChange={(value) => handleDropdownChange('advisers', 'gradeLevel', value)}
                           
                            required
                            error={errors['gradeLevel']}
                            helperText={errors['gradeLevel'] ? "This field is required" : ""}
                        />

                        <CustomDropdown
                            label="Section"
                            options={userData.advisers.gradeLevel ? sections[userData.advisers.gradeLevel] : []}
                             value={userData.advisers.section}
                           onChange={(value) => handleDropdownChange('advisers', 'section', value)}
                            required
                            error={errors['section']}
                            helperText={errors['section'] ? "This field is required" : ""}
                        />
                        
                    </>
                )}
            </div>
            <div className="flex justify-center mt-5">
            <button onClick={handleNext} className="bg-yellow-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded item-div">
                Next
            </button>
        </div>
            </div>
            
            )}
            
            {step === 2 && userData.userType === 'student' && (
                <div>
                    <div  data-aos='fade-left' className='flex justify-center sm:justify-end mt-0 md:mt-0 items-center' style={Style}>
                        <h1 className='text-2xl md:text-3xl mx-5 font-semibold py-5 items-center justify-center' style={{color: 'white', textShadow: '2px 2px 2px rgba(0, 0, 0, 0.3)'}}>Parents Information</h1>
                    </div>

                    <div data-aos='fade-right' className='py-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5'>
                    <CustomTextField
                        label="Mother's Name"
                        value={userData.parents.mother.mothersName}
                        onChange={e => handleParentInputChange(e, 'mother')} 
                        name="mothersName"
                        error={errors['mothersName']}
                        helperText={errors['mothersName']}
                    />
                       
                      <CustomDatePicker
                        label="Date of Birth"
                        value={userData.parents.mother.dob}
                        onChange={(date) => handleDateChange('parents','mother', 'dob', date)}
                        required
                        error={errors['mother.dob']}
                        helperText={errors['mother.dob']}
                    />
                    <CustomTextField
                        label="Age"
                        value={userData.parents.mother.age}
                        readOnly
                    />
                
                        <CustomTextField
                            label="Mother's Contact number"
                            value={userData.parents.mother.mothersContact}
                            onChange={e => handleParentInputChange(e, 'mother')} 
                            name="mothersContact"
                            error={errors['mothersContact']}
                            helperText={errors['mothersContact']}
                        />
                        
                        <CustomTextField
                            label="Mother's Occupation"
                            value={userData.parents.mother.mothersOccupation}
                            onChange={e => handleParentInputChange(e, 'mother')} 
                            name="mothersOccupation"
                            error={errors['mothersOccupation']}
                            helperText={errors['mothersOccupation']}
                        />
                    
                        <CustomTextField
                            label="Mother's Address"
                            value={userData.parents.mother.mothersAddress}
                            onChange={e => handleParentInputChange(e, 'mother')} 
                            name="mothersAddress"
                            error={errors['mothersAddress']}
                            helperText={errors['mothersAddress']}
                        />
                        <CustomTextField
                            label="Father's Name"
                            value={userData.parents.father.fathersName}
                            onChange={e => handleParentInputChange(e, 'father')} 
                            name="fathersName"
                            error={errors['fathersName']}
                            helperText={errors['fathersName']}
                        />
                       
                      <CustomDatePicker
                        label="Date of Birth"
                        value={userData.parents.father.dob}
                        onChange={(date) => handleDateChange('parents','father', 'dob', date)}
                        required
                        error={errors['father.dob']}
                        helperText={errors['father.dob']}
                    />
                    <CustomTextField
                        label="Age"
                        value={userData.parents.father.age}
                        readOnly
                    />
                
                        <CustomTextField
                            label="Father's Contact number"
                            value={userData.parents.father.fathersContact}
                            onChange={e => handleParentInputChange(e, 'father')} 
                            name="fathersContact"
                            error={errors['fathersContact']}
                            helperText={errors['fathersContact']}
                        />
                        
                        <CustomTextField
                            label="Father's Occupation"
                            value={userData.parents.father.fathersOccupation}
                            onChange={e => handleParentInputChange(e, 'father')} 
                            name="fathersOccupation"
                            error={errors['fathersOccupation']}
                            helperText={errors['fathersOccupation']}
                        />
                    
                        <CustomTextField
                            label="Father's Address"
                            value={userData.parents.father.fathersAddress}
                            onChange={e => handleParentInputChange(e, 'father')} 
                            name="fathersAddress"
                            error={errors['fathersAddress']}
                            helperText={errors['fathersAddress']}
                        />
                    </div>
                    <div data-aos='fade-right' className="flex justify-center mt-5">
                            <button onClick={handleBack} className="bg-yellow-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded item-div mr-5">
                                Back
                            </button>
                            <button onClick={handleSubmit} className="bg-yellow-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded item-div">
                                Submit
                            </button>
                        </div>
                </div>
            )}
            {step === 2 && userData.userType === 'teacher' && (
                <div>
                    <div data-aos='fade-left' className='flex justify-center sm:justify-end mt-0 md:mt-0 items-center' style={Style}>
                        <h1 className='text-2xl md:text-3xl mx-5 font-semibold py-5 items-center justify-center' style={{color: 'white', textShadow: '2px 2px 2px rgba(0, 0, 0, 0.3)'}}>Academic Information</h1>
                    </div>

                    <div  data-aos='fade-right' className='py-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5'>
                    
                        <CustomTextField
                            label="Last School Attended"
                            value={userData.academicData.lastSchoolAttended}
                            onChange={e => handleInputChange(e, 'academicData')} 
                            name="lastSchoolAttended"
                            required
                            error={errors['lastSchoolAttended']}
                            helperText={errors['lastSchoolAttended']}
                        />
                        <CustomTextField
                            label="School Address"
                            value={userData.academicData.schoolAddress}
                            onChange={e => handleInputChange(e, 'academicData')} 
                            name="schoolAddress"
                            required
                            error={errors['schoolAddress']}
                            helperText={errors['schoolAddress']}
                        />
                        <CustomDatePicker
                            label="Year Graduated"
                            value={userData.academicData.yearGraduated}
                            onChange={(date) => handleDateChange('academicData','yearGraduated', date)}
                            required
                            yearOnly
                            error={errors['yearGraduated']}
                            helperText={errors['yearGraduated']}
                        />
                        
                        <CustomTextField
                            label="Degree"
                            value={userData.academicData.degree}
                            onChange={e => handleInputChange(e, 'academicData')} 
                            name="degree"
                            required
                            error={errors['degree']}
                            helperText={errors['degree']}
                        />
                        {/* <CustomTextField
                            label="Achievements"
                            value={userData.academicData.achievements}
                            onChange={handleInputChange}
                            name="achievements"
                            error={errors['achievements']}
                            helperText={errors['achievements']}
                        /> */}
                        <CustomTextField
                            label="PRC Number"
                            type="numeric"
                            value={userData.academicData.prcNumber}
                            onChange={e => handleInputChange(e, 'academicData')} 
                            name="prcNumber"
                            error={errors['prcNumber']}
                            helperText={errors['prcNumber']}
                        />
                        <CustomDatePicker
                            label="Expiration Date"
                            value={userData.academicData.expirationDate}
                            onChange={(date) => handleDateChange('academicData','expirationDate', date)}
                            error={errors['expirationDate']}
                            helperText={errors['expirationDate']}
                        />
                        <CustomTextField
                            label="Years of Teaching"
                            type="numeric"
                            value={userData.academicData.yearsOfTeaching}
                            required
                            onChange={e => handleInputChange(e, 'academicData')} 
                            name="yearsOfTeaching"
                            error={errors['yearsOfTeaching']}
                            helperText={errors['yearsOfTeaching']}
                        />
                        
                       
                    </div>
                    <div className="flex justify-center mt-5">
                        <button onClick={handleBack} className="bg-yellow-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded item-div mr-5">
                            Back
                        </button>
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
