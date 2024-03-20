import React, { useState, useEffect } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import CustomTextField from '../component/CustomTextField';
import CustomDropdown from '../component/CustomDropdown';
import CustomDatePicker from '../component/CustomDatePicker';
import Aos from 'aos';
import 'aos/dist/aos.css'

function Usersform({ onCancelClick, userTypeOptions }) {
    const [gender, setGender] = useState(null);
    const [errors, setErrors] = useState({});
    const [userData, setUserData] = useState({
        userType: userTypeOptions[0].value,
        student: {
            dob: null,
            age: '',
            gender: null,
        },
        parents: {
            mother: {
                dob: null,
                age: ''
            },
            father: {
                dob: null,
                age: ''
            },
        },
        advisers:{
            dob: null,
            age: '',
            gender: null,
        },
        step: 1,
        studentID: '',
        lastName: '',
        firstName: '',
        middleName: '',
        password: '',
        contactNumber: '',
        address: '',
        sy: null,
        gradeLevel: null,
        section: null,
        adviser: null,
        employeeID: '',
        alastName: '',
        afirstName: '',
        amiddleName: '',
        apassword: '',
        acontactnumber: '',
        aaddress: '',
        mothersName: '',
        fathersName: '',
        mothersContact: '',
        fathersContact: '',
        mothersOccupation: '',
        fathersOccupation: '',
        mothersAddress: '',
        fathersAddress: '',
        lastSchoolAttended: '',
        schoolAddress: '',
        yearGraduated: null,
        degree: '',
        achievements: '',
        prcNumber: '',
        expirationDate: null,
        yearsOfTeaching: '',
    });


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
    const section = [
        { value: '1', label: 'Love' },
        { value: '2', label: 'Peace' },
        { value: '3', label: 'Faith' },
    ];
    const adviser = [
        { value: '1', label: 'Uzumaki Naruto' },
        { value: '2', label: 'Monkey D. Luffy' },
        { value: '3', label: 'Son Goku' },
    ];
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
        let requiredFields = [];
        if (userData.userType === 'student') {
            requiredFields = [
                'studentID', 'lastName', 'firstName', 'middleName', 'password', 
                'address', 'gradeLevel', 'section', 'adviser'
            ];
        } 
        // else if (userData.userType === 'teacher') {
        //     requiredFields = [
        //         'employeeID', 'alastName', 'afirstName', 'amiddleName', 'aaddress', 
        //         'acontactnumber', 'lastSchoolAttended', 'apassword', 'schoolAddress', 
        //         'yearGraduated', 'degree', 'achievements', 'prcNumber', 'expirationDate', 
        //         'yearsOfTeaching'
        //     ];
        // }
    
        const currentErrors = {};
        requiredFields.forEach(field => {
            if (!userData[field]) {
                currentErrors[field] = true;
            }
        });
    
        // Validate additional fields based on user type
        if (userData.userType === 'student') {
            if (!userData.student.gender) {
                currentErrors['gender'] = true;
            }
            if (!userData.student.dob) {
                currentErrors['dob'] = true;
            }
        } 
        // else if (userData.userType === 'teacher') {
        //     if (!userData.advisers.gender) {
        //         currentErrors['gender'] = true;
        //     }
        //     if (!userData.advisers.dob) {
        //         currentErrors['dob'] = true;
        //     }
        // }
    
        setErrors(currentErrors);
    
        // Proceed to next step only if all required fields are filled
        if (Object.keys(currentErrors).length > 0) {
            if (userData.userType === 'student' && userData.step === 1) {
                setUserData({ ...userData, step: 2 });
            } else if (userData.userType === 'teacher' && userData.step === 1) {
                setUserData({ ...userData, step: 3 });
            }
        }
    };
    
    

    const handleBack = () => {
        setStep(1);
    };
    
    const handleSubmit = () => {
        // Handle form submission
        console.log('Form submitted', userData);
    };

    useEffect(() => {
        setErrors({});
    }, [userData.userType]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        // Remove the error for the field being updated
        const updatedErrors = { ...errors };
        delete updatedErrors[name];
        setErrors(updatedErrors);
        setUserData({ ...userData, [name]: value });
    };

    const handleDateChange = (category, member, date) => {
        // Update the date of birth in the state
        const updatedUserData = {
            ...userData,
            [category]: {
                ...userData[category],
                [member]: {
                    ...userData[category][member],
                    dob: date,
                }
            }
        };
    
        // Calculate and update the age in the state
        if (category === 'student') {
            updatedUserData[category].age = calculateAge(date);
        } else if (category === 'parents') {
            updatedUserData[category][member].age = calculateAge(date);
        } else if (category === 'advisers') {
            updatedUserData[category].age = calculateAge(date);
        }
    
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
                            type="numeric"
                            value={userData.studentID}
                            onChange={handleInputChange}
                            name="studentID"
                            required
                            error={errors['studentID']}
                            helperText={errors['studentID'] ? "This field is required" : ""}
                            
                        />
                        <CustomTextField
                            label="Last Name"
                            value={userData.lastName}
                            onChange={handleInputChange}
                            name="lastName"
                            required
                            error={errors['lastName']}
                            helperText={errors['lastName'] ? "This field is required" : ""}
                        />
                        <CustomTextField
                            label="First Name"
                            value={userData.firstName}
                            onChange={handleInputChange}
                            name="firstName"
                            required
                            error={errors['firstName']}
                            helperText={errors['firstName'] ? "This field is required" : ""}
                        />
                        <CustomTextField
                            label="Middle Name"
                            value={userData.middleName}
                            onChange={handleInputChange}
                            name="middleName"
                            required
                            error={errors['middleName']}
                            helperText={errors['middleName'] ? "This field is required" : ""}
                        />
                        <CustomTextField
                            label="Password"
                            value={userData.password}
                            onChange={handleInputChange}
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
                            value={userData.contactNumber}
                            onChange={handleInputChange}
                            name="contactNumber"
                        />
                         <CustomTextField
                            label="Complete address"
                            value={userData.address}
                            onChange={handleInputChange}
                            name="address"
                            required
                            error={errors['address']}
                            helperText={errors['address'] ? "This field is required" : ""}
                        />
                     <CustomDatePicker
                        label="Date of Birth"
                        value={userData.student.dob}
                        onChange={(date) => handleDateChange('student', 'dob', date)} // Pass 'student' and 'dob' as parameters
                        required
                        error={errors['dob']}
                        helperText={errors['dob'] ? "This field is required" : ""}
                     />

                     <CustomTextField
                        label="Age"
                        value={userData.student.age}
                        readOnly
                     />

                       
                        <CustomDropdown
                            label="Grade level"
                            options={gradelevel}
                            value={userData.gradeLevel}
                            onChange={(value) => setUserData({ ...userData, gradeLevel: value })}
                            required
                            error={errors['gradeLevel']}
                            helperText={errors['gradeLevel'] ? "This field is required" : ""}
                        />

                        <CustomDropdown
                            label="Section"
                            options={section}
                            value={userData.section}
                            onChange={(value) => setUserData({ ...userData, section: value })}
                            required
                            error={errors['section']}
                            helperText={errors['section'] ? "This field is required" : ""}
                        />
                        <CustomDropdown
                            label="Class adviser"
                            options={adviser}
                            value={userData.adviser}
                            onChange={(value) => setUserData({ ...userData, adviser: value })}
                            required
                            error={errors['adviser']}
                            helperText={errors['adviser'] ? "This field is required" : ""}
                        />
                        
                    </>
                ) : (
                    <>
                        <CustomTextField
                            label="Employee ID"
                            type="numeric"
                            value={userData.employeeID}
                            onChange={handleInputChange}
                            name="employeeID"
                            error={errors['employeeID']}
                            helperText={errors['employeeID'] ? "This field is required" : ""}
                        />
                        <CustomTextField
                            label="Last Name"
                            value={userData.alastName}
                            onChange={handleInputChange}
                            name="alastName"
                            error={errors['alastName']}
                            helperText={errors['alastName'] ? "This field is required" : ""}
                        />
                        <CustomTextField
                            label="First Name"
                            value={userData.afirstName}
                            onChange={handleInputChange}
                            name="afirstName"
                            error={errors['afirstName']}
                            helperText={errors['afirstName'] ? "This field is required" : ""}
                        />
                        <CustomTextField
                            label="Middle Name"
                            value={userData.amiddleName}
                            onChange={handleInputChange}
                            name="amiddleName"
                            error={errors['amiddleName']}
                            helperText={errors['amiddleName'] ? "This field is required" : ""}
                        />
                        <CustomTextField
                            label="Password"
                            value={userData.apassword}
                            onChange={handleInputChange}
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
                            error={errors['gender']}
                            helperText={errors['gender'] ? "This field is required" : ""}
                        />

                        <CustomTextField
                            label="Contact number"
                            type="numeric"
                            value={userData.acontactnumber}
                            onChange={handleInputChange}
                            name="acontactnumber"
                            error={errors['acontactnumber']}
                            helperText={errors['acontactnumber'] ? "This field is required" : ""}
                        />
                         <CustomTextField
                            label="Last school attended"
                            value={userData.lastSchoolAttended}
                            onChange={handleInputChange}
                            name="lastSchoolAttended"
                            error={errors['lastSchoolAttended']}
                            helperText={errors['lastSchoolAttended'] ? "This field is required" : ""}
                        />
                        <CustomTextField
                            label="School address"
                            value={userData.schoolAddress}
                            onChange={handleInputChange}
                            name="schoolAddress"
                            error={errors['schoolAddress']}
                            helperText={errors['schoolAddress'] ? "This field is required" : ""}
                        />
                       <CustomDatePicker
                            label="Year graduated"
                            value={userData.yearGraduated}
                            onChange={(date) => handleInputChange({ target: { name: 'yearGraduated', value: date } })}
                            name="yearGraduated"
                            required
                            error={errors['yearGraduated']}
                            helperText={errors['yearGraduated'] ? "This field is required" : ""}
                            yearOnly
                        />
                        <CustomTextField
                            label="Degree"
                            value={userData.degree}
                            onChange={handleInputChange}
                            name="degree"
                            error={errors['degree']}
                            helperText={errors['degree'] ? "This field is required" : ""}
                        />
                        <CustomTextField
                            label="PRC number"
                            type="numeric"
                            value={userData.prcNumber}
                            onChange={handleInputChange}
                            name="prcNumber"
                            error={errors['prcNumber']}
                            helperText={errors['prcNumber'] ? "This field is required" : ""}
                        />

                        <CustomDatePicker
                            label="License expiration date"
                            value={userData.expirationDate}
                            onChange={(date) => handleInputChange({ target: { name: 'expirationDate', value: date } })}
                            name="expirationDate"
                            required
                            error={errors['expirationDate']}
                            helperText={errors['expirationDate'] ? "This field is required" : ""}
                        />
                        <CustomTextField
                            label="Years of teaching experience"
                            type="numeric"
                            value={userData.yearsOfTeaching}
                            onChange={handleInputChange}
                            name="yearsOfTeaching"
                            error={errors['yearsOfTeaching']}
                            helperText={errors['yearsOfTeaching'] ? "This field is required" : ""}
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
                <div data-aos='fade-left'>
                    <div className='flex justify-center sm:justify-end mt-0 md:mt-0 items-center' style={Style}>
                        <h1 className='text-2xl md:text-3xl mx-5 font-semibold py-5 items-center justify-center' style={{color: 'white', textShadow: '2px 2px 2px rgba(0, 0, 0, 0.3)'}}>Academic Information</h1>
                    </div>

                    <div data-aos='fade-right' className='py-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5'>
                        <CustomTextField
                            label="Last School Attended"
                            value={userData.lastSchoolAttended}
                            onChange={handleInputChange}
                            name="lastSchoolAttended"
                        />
                        <CustomTextField
                            label="School Address"
                            value={userData.schoolAddress}
                            onChange={handleInputChange}
                            name="schoolAddress"
                        />
                        <CustomTextField
                            label="Year Graduated"
                            type="numeric"
                            value={userData.yearGraduated}
                            onChange={handleInputChange}
                            name="yearGraduated"
                        />
                        <CustomTextField
                            label="Degree"
                            value={userData.degree}
                            onChange={handleInputChange}
                            name="degree"
                        />
                        <CustomTextField
                            label="Achievements"
                            value={userData.achievements}
                            onChange={handleInputChange}
                            name="achievements"
                        />
                        <CustomTextField
                            label="PRC Number"
                            type="numeric"
                            value={userData.prcNumber}
                            onChange={handleInputChange}
                            name="prcNumber"
                        />
                        <CustomDatePicker
                            label="Expiration Date"
                            value={userData.expirationDate}
                            onChange={(date) => setUserData({ ...userData, expirationDate: date })}
                        />
                        <CustomTextField
                            label="Years of Teaching"
                            type="numeric"
                            value={userData.yearsOfTeaching}
                            onChange={handleInputChange}
                            name="yearsOfTeaching"
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
            {step === 3 && userData.userType === 'teacher' && (
                <div>
                    <div className='flex justify-center sm:justify-end mt-0 md:mt-0 items-center' style={Style}>
                        <h1 className='text-2xl md:text-3xl mx-5 font-semibold py-5 items-center justify-center' style={{color: 'white', textShadow: '2px 2px 2px rgba(0, 0, 0, 0.3)'}}>Parent/Guardian Information</h1>
                    </div>

                    <div className='py-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5'>
                        <CustomTextField
                            label="Last Name"
                            value={userData.alastName}
                            onChange={handleInputChange}
                            name="alastName"
                        />
                        <CustomTextField
                            label="First Name"
                            value={userData.afirstName}
                            onChange={handleInputChange}
                            name="afirstName"
                        />
                        <CustomTextField
                            label="Middle Name"
                            value={userData.amiddleName}
                            onChange={handleInputChange}
                            name="amiddleName"
                        />
                        <CustomTextField
                            label="Password"
                            value={userData.apassword}
                            onChange={handleInputChange}
                            name="apassword"
                        />
                        <CustomTextField
                            label="Contact number"
                            type="numeric"
                            value={userData.acontactnumber}
                            onChange={handleInputChange}
                            name="acontactnumber"
                        />
                         <CustomTextField
                            label="Complete address"
                            value={userData.aaddress}
                            onChange={handleInputChange}
                            name="aaddress"
                        />
                        <CustomTextField
                            label="Mothers Name"
                            value={userData.mothersName}
                            onChange={handleInputChange}
                            name="mothersName"
                        />
                        <CustomTextField
                            label="Fathers Name"
                            value={userData.fathersName}
                            onChange={handleInputChange}
                            name="fathersName"
                        />
                        <CustomTextField
                            label="Mothers Contact number"
                            type="numeric"
                            value={userData.mothersContact}
                            onChange={handleInputChange}
                            name="mothersContact"
                        />
                        <CustomTextField
                            label="Fathers Contact number"
                            type="numeric"
                            value={userData.fathersContact}
                            onChange={handleInputChange}
                            name="fathersContact"
                        />
                        <CustomTextField
                            label="Mothers Occupation"
                            value={userData.mothersOccupation}
                            onChange={handleInputChange}
                            name="mothersOccupation"
                        />
                        <CustomTextField
                            label="Fathers Occupation"
                            value={userData.fathersOccupation}
                            onChange={handleInputChange}
                            name="fathersOccupation"
                        />
                        <CustomTextField
                            label="Mothers Address"
                            value={userData.mothersAddress}
                            onChange={handleInputChange}
                            name="mothersAddress"
                        />
                        <CustomTextField
                            label="Fathers Address"
                            value={userData.fathersAddress}
                            onChange={handleInputChange}
                            name="fathersAddress"
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
