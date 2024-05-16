import React, { useState, useEffect, useRef } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import TextField from "@mui/material/TextField";
import Dropdown from '../component/Dropdown';
import fileIcon from '../assets/file.webp';
import calendarIcon from '../assets/calendar.webp';
import excelIcon from '../assets/excel.webp';
import plusIcon from '../assets/plus.webp';
import Box from '@mui/material/Box';
import add from '../assets/add.webp';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import addIcon from '../assets/add.webp';
import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';

function TBillings({ onCancelClick }) {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    description: '',
    deadline: new Date().toISOString().split('T')[0],
    remarks: '',
  });
  const [billingsData, setBillingsData] = useState([]);
  const [tableHeight, setTableHeight] = useState(0);
  const fileInputRef = useRef(null);
  const [startDate, setStartDate] = useState(new Date());

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('billingsData'));
    if (savedData) {
      setBillingsData(savedData);
    }
  }, []);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file instanceof Blob) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        const bstr = evt.target.result;
        const wb = XLSX.read(bstr, { type: 'binary' });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
        const parsedData = data.map(row => ({
          description: row[0],
          deadline: row[1],
          remarks: row[2],
        }));
        setBillingsData(parsedData);
        localStorage.setItem('billingsData', JSON.stringify(parsedData));
      };
      reader.readAsArrayBuffer(file);
    } else {
      console.error('Invalid file object');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = () => {
    const newData = [...billingsData, formData];
    setBillingsData(newData);
    localStorage.setItem('billingsData', JSON.stringify(newData));

    setShowModal(false);
    window.alert('bills SUCCESSFULLY computed');
    setFormData({
      description: '',
      deadline: new Date().toISOString().split('T')[0],
      remarks: '',
    });
  };

  const handleDeleteRow = (index) => {
    const newData = [...billingsData];
    newData.splice(index, 1);
    setBillingsData(newData);
    localStorage.setItem('billingsData', JSON.stringify(newData));
  };

  const handleEditRow = (index) => {
    const editedBillings = { ...billingsData[index] };
    setFormData(editedBillings);
    const newData = [...billingsData];
    newData.splice(index, 1);
    setBillingsData(newData);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    window.alert('bills UNSUCCESSFULLY computed');
  };

  const handleDownload = () => {
    const doc = new jsPDF();

    doc.text("Billing Card", 10, 10);
    const currentDate = new Date().toLocaleDateString();
    doc.text(`Date: ${currentDate}`, 10, 20);

    const tableData = billingsData.map((billing) => [
      billing.description,
      billing.deadline,
      billing.remarks,
    ]);
    doc.autoTable({
      startY: 30,
      head: [['Payment Description', 'Payment Deadline', 'Total Payment']],
      body: tableData,
    });

    // Save the PDF
    doc.save('billing_card.pdf');
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
      <div className='flex flex-col sm:flex-row justify-center sm:justify-start mt-8 md:mt-5 items-center ' style={{ top: '0px', right: '30px' }}>
                <div className="justify-start items-start sm:justify-center sm:items-center mb-2 md:mt-0">
                          <h1
                            className="text-4xl font-serif font-semibold px-4"
                            style={{
                              color: "#21421e",
                              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
                            }}
                          >
                            BILLINGS
                          </h1>
                       <div style={{
                           border: '2px solid #ccc',
                           borderRadius: '10px',
                           boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                           backgroundColor: '#fff',
                           textAlign: 'center',
                           padding: '10px',
                           width: '230px',
                           position: 'absolute',
                           zIndex: '900',
                           top: '146px',
                           right: 'calc(100% - -60px - 1100px)'
                       }}>
                           <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                               <div style={{ textAlign: 'center' }}>
                                   <DatePicker
                                       selected={startDate}
                                       onChange={date => setStartDate(date)}
                                       dateFormat="dd/MM/yyyy"
                                       calendarClassName="custom-calendar"
                                       popperPlacement="left"
                                   />
                               </div>
                               <img src={calendarIcon} alt="Calendar Icon" style={{ width: '24px', height: '24px', marginLeft: '0px' }} />
                           </div>
                       </div>
                     </div>
                <div className="flex items-center">
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    label={<span style={{ fontWeight: 'bold', color: 'black' }}>Search </span>}
                    sx={{
                      position: 'absolute',
                      top: '140px',
                      right: '70px',
                      minWidth: '400px',
                    }}
                  />
                </div>
              </div>
      <div className='flex flex-col sm:flex-row justify-center sm:justify-start mt-20 md:mt-50' style={{ top: '20px', right: '20px' }}>
        <Dropdown options={sy} label={<span style={{ fontWeight: 'bold',color: 'black' }}>School Year</span>} sx={{ outline: '4px solid black' }} />
        <Dropdown options={gradelevel} label={<span style={{ fontWeight: 'bold',color: 'black' }}>Grade level</span>} sx={{ outline: '4px solid black' }} />
       </div>
      <div style={{ borderBottomWidth: 3, borderColor: '#F2B569' }}></div>
      <table className='w-full mt-8 ' style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th className='border-4 px-4 py-2 border font-bold' style={{ color: 'black', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>Payment Description</th>
            <th className='border-4 px-4 py-2 border font-bold' style={{ color: 'black', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>Payment Deadline</th>
            <th className='border-4 px-4 py-2 border font-bold' style={{ color: 'black', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>Total Payment</th>
          </tr>
        </thead>
        <tbody className='text-center'>
          {billingsData.map((billing, index) => (
            <tr key={index}>
              <td className='border-4 px-4 py-2'>{billing.description}</td>
              <td className='border-4 px-4 py-2'>{billing.deadline}</td>
              <td className='border-4 px-4 py-2'>{billing.remarks}</td>
              <td className=''>
                <FontAwesomeIcon icon={faEdit} onClick={() => handleEditRow(index)} style={{ cursor: 'pointer', color: 'blue', marginRight: '5px' }} />
                <FontAwesomeIcon icon={faTrash} onClick={() => handleDeleteRow(index)} style={{ cursor: 'pointer', color: 'red' }} />
              </td>
             </tr>
          ))}
        </tbody>
      </table>

      <div className='flex flex-col md:flex-row justify-center lg:justify-end mt-8 md:mt-5 items-center' style={{ top: '10px', right: '10px'}}>
       <div className='flex items-center justify-center rounded-lg px-2 py-2 lg:w-auto' style={{ background: 'linear-gradient(80deg, #fdfd96, #cf1020  ', cursor: 'pointer', marginBottom: '10px', position: 'absolute', top: '205px', right: '90px' }}>
         <img src={fileIcon} alt="" className="h-12 w-100 lg:h-8 lg:w-8" onClick={handleDownload} style={{ boxShadow: '0px 5px 5px rgba(255,0,0)' }} />
      </div>
      <div className='flex flex-col md:flex-row justify-center lg:justify-end mt-8 md:mt-5 items-center' style={{ top: '10px', right: '10px'}}>
      <div className='flex items-center justify-center rounded-lg px-2 py-2 lg:w-auto' style={{ background: 'linear-gradient(80deg, #fdfd96, #228b22', cursor: 'pointer', marginBottom: '10px', position: 'absolute', top: '205px', right: '150px' }}>
             <label htmlFor="file-upload">
      <img src={excelIcon} alt="" className="h-12 w-100 lg:h-8 lg:w-8" style={{ boxShadow: '0px 5px 5px rgba(34,139,34)' }} />

      </label>
           <input
           id="file-upload"
           type="file"
           onChange={handleFileUpload}
           style={{ display: 'none' }}
          />
         </div>
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
                    id="description"
                    label={<b>Payment Description</b>}
                    variant="outlined"
                    value={formData.description}
                    onChange={handleInputChange}
                    name="description"
                    sx={{ fontWeight: 'bold', width: '100%', color: 'black' }}
                  />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px', color: 'black' }}>
                  <TextField
                    onClick={(e) => e.stopPropagation()}
                    id="deadline"
                    label={<b>Payment Deadline</b>}
                    variant="outlined"
                    value={formData.deadline}
                    onChange={handleInputChange}
                    name="deadline"
                    sx={{ fontWeight: 'bold', width: '100%', color: 'black' }}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px', color: 'black' }}>
                  <TextField
                    onClick={(e) => e.stopPropagation()}
                    id="remarks"
                    label={<b>Total Payment</b>}
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
      <div className='flex flex-col md:flex-row justify-center lg:justify-end mt-8 md:mt-5 items-center'
           style={{ top: `${tableHeight + 20}px`, right: '10px' }}>
            <img
                  src={plusIcon}
                  alt=""
                  className="h-10 w-10"
                  style={{ cursor: 'pointer' }}
                  onClick={() => setShowModal(true)}
               />
          </div>
       </div>
  );
}

export default TBillings;
