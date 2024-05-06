import React, { useState } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import TextField from "@mui/material/TextField";
import Dropdown from '../component/Dropdown';
import adduser from '../assets/adduser.webp';
import Box from '@mui/material/Box';
import add from '../assets/add.webp';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function TLedger({ onCancelClick }) {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const [startDate, setStartDate] = useState(new Date());


  const handleSubmit = () => {
    setShowModal(false);
    window.alert('student SUCCESSFULLY paid');
    console.log(formData);

    setFormData({
      name: '',
    });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    window.alert('student UNSUCCESSFULLY paid');
  };
  const [language, setLanguage] = useState('English');

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
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
      <div className='text-center' style={{ padding: '10px' }}>
        <div className='justify-start items-start sm:justify-center sm:items-center'>
          <div className='text-center' style={{ padding: '20px 0' }}>
            <div className='justify-start items-start sm:justify-center sm:items-center'>
              <h1 className='text-2xl font-serif font-bold pl-2' style={{ color: '#001a09', fontSize: '40px', marginBottom: '10px' }}>COCS&nbsp;(2023-2024)</h1>
              <h2 className='text-2xl font-serif font-bold pl-2' style={{ color: '#001a09', fontSize: '30px', marginBottom: '10px' }}>Customer Ledger</h2>
              <h3 className='text-2xl font-serif font-bold pl-2' style={{ color: '#001a09', fontSize: '17px' }}>For the Period From June 1, 2023 to May 31, 2024</h3>
            </div>
          </div>

        </div>
      </div>

      <div className='flex flex-col sm:flex-row justify-center items-center ' style={{ top: '20px', right: '20px' }}>
          <Dropdown options={sy} label={<span style={{ fontWeight: 'bold' }}>School Year</span>} sx={{ outline: '4px solid black' }} />
          <Dropdown options={gradelevel} label={<span style={{ fontWeight: 'bold' }}>Grade level</span>} sx={{ outline: '4px solid black' }} />
          <Dropdown options={sections} label={<span style={{ fontWeight: 'bold' }}>Section</span>} sx={{ outline: '4px solid black' }} />


      </div>

      <div style={{borderBottomWidth: 1, borderColor: '#F2B569'}}></div>
      <table className='w-full mt-8 ' style={{borderCollapse: 'bold'}}>
        <thead>
          <tr>
            <th className='px-4 py-2 border font-bold'>NO.</th>
            <th className='px-4 py-2 border font-bold'>Name</th>
            <th className='px-4 py-2 border font-bold'>Date.</th>
            <th className='px-4 py-2 border font-bold'>Transfer No.</th>
            <th className='px-4 py-2 border font-bold'>Type</th>
            <th className='px-4 py-2 border font-bold'>Mode of Payment</th>
            <th className='px-4 py-2 border font-bold'>Discount</th>
            <th className='px-4 py-2 border font-bold'>Balance</th>
          </tr>
        </thead>
        <tbody className='text-center'>
          <tr className='flex-1 items-center justify-center'>
            <td className='border px-4 py-2'></td>
            <td className='border px-4 py-2'>John Doe</td>
            <td className='border px-4 py-2'>
              <input type="date" />
            </td>
            <td className='border px-4 py-2'>
              <select className='w-40 h-8 rounded-md'>
                <option value="Transfer1"> Registration and Other Fee </option>
                <option value="Transfer2">PTA Fee</option>
                <option value="Transfer3">Prep Books</option>
                <option value="Transfer3">Tuition Fee</option>
                {}
              </select>
            </td>
            <td className='border px-4 py-2'>
              <select>
                <option value="option1">SJ</option>
                <option value="option2">CRJ</option>
                {}
              </select>
            </td>
            <td className='border px-4 py-2'>
              <select>
                <option value="cash">Cash</option>
                <option value="credit">Credit Card</option>
                <option value="debit">Debit Card</option>
                <option value="debit">Gcash</option>
                {}
              </select>
            </td>
            <td className='border px-4 py-2'>
              <select>
                <option value="0">No discount</option>
                <option value="5">5% discount</option>
                <option value="10">10% discount</option>
                <option value="15">15% discount</option>
                <option value="25">25% discount</option>
                <option value="30">30% discount</option>
                <option value="50">50% discount</option>
                {}
              </select>
            </td>
            <td className='border px-4 py-2'>Balance</td>
          </tr>
        </tbody>

      </table>
      <div className='flex flex-col md:flex-row justify-center lg:justify-end mt-8 md:mt-5 items-center ' style={{ top: '10px', right: '10px'}}>
        <div className='flex items-center justify-center rounded-lg px-2 py-2 lg:w-auto' style={{ backgroundColor: '#F2B569', cursor: 'pointer', marginBottom: '10px', position: 'absolute', top: '240px', right: '60px' }}>
          <img src={adduser} alt="" className="h-12 w-100 lg:h-5 lg:w-5" />
          <h1 className='text-l font-serif px-1' style={{ color: '#079440' }}>Receipt</h1>
        </div>
      </div>

      {showModal && (
              <div className="modal-overlay" onClick={() => setShowModal(false)} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0, 0, 0, 0.5)', zIndex: 999 }}>
                <div className="container" style={{ position: 'relative', zIndex: 1000 }}>
                  <div className="modal" style={{ width: '500px', height: '300px', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'linear-gradient(to bottom, #d9ffb3, #ffffb3)', borderRadius: '30px' }}>
                    <span className="close" onClick={handleCloseModal} style={{ position: 'absolute', top: '0px', right: '13px', cursor: 'pointer', color: 'red', fontSize: '30px' }}>
                      <span style={{ color: 'red', transition: 'color 0.3s' }}>×</span>
                    </span>
                    <div className="modal-content" style={{ padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                            <TextField
                                onClick={(e) => e.stopPropagation()}
                                id="name"
                                label={<b>Student Name</b>}
                                variant="outlined"
                                value={formData.name}
                                onChange={handleInputChange}
                                name="name"
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

export default TLedger;
