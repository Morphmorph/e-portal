import React, { useState } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import TextField from "@mui/material/TextField";
import Dropdown from '../component/Dropdown';
import adduser from '../assets/adduser.webp';
import Box from '@mui/material/Box';
import add from '../assets/add.webp';

function TGrades({ onCancelClick }) {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    lrn: '',
    name: '',
    subject: '',
    grades: '',
    remarks: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = () => {
    setShowModal(false);
    window.alert('student SUCCESSFULLY added');
    console.log(formData);

    setFormData({
      lrn: '',
      name: '',
      subject: '',
      grades: '',
      remarks: ''
    });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    window.alert('student UNSUCCESSFULLY added');
  };

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

  return (
    <div>
      <div className='flex justify-start items-center' style={{ top: '5px', right: '10px' }}>
        <CancelIcon
          sx={{
            position: 'absolute',
            top: '110px',
            right: '20px',
            color: '#F2B569',
            fontSize: 30,
            transition: 'color 0.3s, transform 0.3s',
            '&:hover': {
              color: 'red',
              transform: 'scale(1.1)',
            },
             cursor: 'pointer'
          }}
          onClick={onCancelClick}
        />
      </div>
      <div className='flex flex-col sm:flex-row justify-center sm:justify-start mt-8 md:mt-5 items-center ' style={{top: '0px', right: '30px'}}>
        <div className='justify-start items-start sm:justify-center sm:items-center'>
          <h1 className='text-2xl font-serif font-italian pl-2' style={{color: '#079440', fontSize: '50px'}}>GRADES</h1>
        </div>
        <div className="flex items-center">
          <TextField
            id="outlined-basic"
            variant="outlined"
            label={<span style={{ fontWeight: 'bold' }}>Search ID Number</span>}
            sx={{
              position: 'absolute',
              top: '160px',
              right: '20px',
              minWidth: '400px',
            }}
          />
        </div>
      </div>
      <div className='flex flex-col sm:flex-row justify-center sm:justify-end mt-20 md:mt-100 items-center ' style={{top: '20px', right: '20px'}}>
        <Dropdown options={sy} label={<span style={{ fontWeight: 'bold' }}>School Year</span>} sx={{ outline: '4px solid black' }} />
        <Dropdown options={gradelevel} label={<span style={{ fontWeight: 'bold' }}>Grade level</span>} sx={{ outline: '4px solid black' }} />
        <Dropdown options={sections} label={<span style={{ fontWeight: 'bold' }}>Section</span>} sx={{ outline: '4px solid black' }} />
      </div>
      <div style={{borderBottomWidth: 1, borderColor: '#F2B569'}}></div>
      <table className='w-full mt-8 ' style={{borderCollapse: 'bold'}}>
        <thead>
          <tr>
            <th className='px-4 py-2 border font-bold'>LRN</th>
            <th className='px-4 py-2 border font-bold'>Student Name</th>
            <th className='px-4 py-2 border font-bold'>Subject</th>
            <th className='px-4 py-2 border font-bold'>Grades</th>
            <th className='px-4 py-2 border font-bold'>Remarks</th>
          </tr>
        </thead>
        <tbody className='text-center'>
          <tr className='flex-1 items-center justify-center'>
            <td className='border px-4 py-2'></td>
            <td className='border px-4 py-2'>John Doe</td>
            <td className='border px-4 py-2'>English</td>
            <td className='border px-4 py-2'>87</td>
            <td className='border px-4 py-2'>
              <div className='flex items-center justify-center h-8 w-full rounded-md'>
                <span className='text-blue-500'>Excellent Student</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div className='flex flex-col md:flex-row justify-center lg:justify-end mt-8 md:mt-5 items-center ' style={{ top: '10px', right: '10px'}}>
        <div className='flex items-center justify-center rounded-lg px-2 py-2 lg:w-auto' style={{ backgroundColor: '#F2B569', cursor: 'pointer', marginBottom: '10px', position: 'absolute', top: '170px', right: '450px' }}>
          <img src={adduser} alt="" className="h-12 w-100 lg:h-5 lg:w-5" />
          <h1 className='text-l font-serif px-1' style={{ color: '#079440' }}>Report Card</h1>
        </div>
      </div>

      {showModal && (
              <div className="modal-overlay" onClick={() => setShowModal(false)} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0, 0, 0, 0.5)', zIndex: 999 }}>
                <div className="container" style={{ position: 'relative', zIndex: 1000 }}>
                  <div className="modal" style={{ width: '500px', height: '420px', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'linear-gradient(to bottom, #d9ffb3, #ffffb3)', borderRadius: '30px' }}>
                    <span className="close" onClick={handleCloseModal} style={{ position: 'absolute', top: '0px', right: '13px', cursor: 'pointer', color: 'red', fontSize: '30px' }}>
                      <span style={{ color: 'red', transition: 'color 0.3s' }}>×</span>
                    </span>
                    <div className="modal-content" style={{ padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                        <TextField
                          onClick={(e) => e.stopPropagation()}
                          id="lrn"
                          label={<b>LRN</b>}
                          variant="outlined"
                          value={formData.lrn}
                          onChange={handleInputChange}
                          name="lrn"
                          sx={{ fontWeight: 'bold', width: '100%', color: 'black' }}
                        />
                      </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                            <TextField
                                onClick={(e) => e.stopPropagation()}
                                id="name"
                                label={<b>Name</b>}
                                variant="outlined"
                                value={formData.name}
                                onChange={handleInputChange}
                                name="name"
                                sx={{ fontWeight: 'bold', width: '100%', color: 'black' }}
                            />
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                            <TextField
                                onClick={(e) => e.stopPropagation()}
                                id="subject"
                                label={<b>Subject</b>}
                                variant="outlined"
                                value={formData.subject}
                                onChange={handleInputChange}
                                name="subject"
                                sx={{ fontWeight: 'bold', width: '100%', color: 'black' }}
                            />
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                            <TextField
                                onClick={(e) => e.stopPropagation()}
                                id="grades"
                                label={<b>Grades</b>}
                                variant="outlined"
                                value={formData.grades}
                                onChange={handleInputChange}
                                name="grades"
                                sx={{ fontWeight: 'bold', width: '100%', color: 'black' }}
                            />
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px',color: 'black' }}>
                            <TextField
                                onClick={(e) => e.stopPropagation()}
                                id="remarks"
                                label={<b>Remarks</b>}
                                variant="outlined"
                                value={formData.remarks}
                                onChange={handleInputChange}
                                name="remarks"
                                sx={{ fontWeight: 'bold', width: '100%', color: 'black' }}
                            />
                        </Box>
                        <button style={{ width: '100%', fontWeight: 'bold', marginTop: '10px', color: '#003300' }} onClick={handleSubmit}>Submit</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

      <div className='flex flex-col md:flex-row justify-center lg:justify-end mt-8 md:mt-5 items-center' style={{ top: '10px', right: '10px' }}>
       <img src={add} alt="" className="h-10 w-10" style={{ cursor: 'pointer', marginBottom: '10px', position: 'absolute', top: '670px', right: '30px' }} onClick={() => setShowModal(true)}/>
        
      </div>
    </div>
  );
}

export default TGrades;
