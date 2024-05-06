import React, { useState, useEffect, useRef } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import TextField from "@mui/material/TextField";
import Dropdown from '../component/Dropdown';
import adduser from '../assets/adduser.webp';
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
    lrn: '',
    name: '',
    description: '',
    deadline: new Date().toISOString().split('T')[0],
    remarks: '',
    paid: new Date().toISOString().split('T')[0],
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
          lrn: row[0],
          name: row[1],
          description: row[2],
          deadline: row[3],
          remarks: row[4],
          paid: row[5],
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
      lrn: '',
      name: '',
      description: '',
      deadline: new Date().toISOString().split('T')[0],
      remarks: '',
      paid: new Date().toISOString().split('T')[0],
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
      billing.lrn,
      billing.name,
      billing.description,
      billing.deadline,
      billing.remarks,
      billing.paid,
    ]);
    doc.autoTable({
      startY: 30,
      head: [['LRN', 'Student Name', 'Payment Description', 'Payment Deadline', 'Remarks', 'Date Paid']],
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
  const section = [
    { value: '1', label: 'love' },
    { value: '2', label: 'hope' },
    { value: '3', label: 'peace' },
    { value: '4', label: 'rose' },
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
        <div className='justify-start items-start sm:justify-center sm:items-center'>
          <h1 className='text-2xl font-serif italic pl-2' style={{ color: '#004d1a', fontSize: '50px' }}>BILLINGS</h1>
        </div>
        <div className="flex items-center">
          <TextField
            id="outlined-basic"
            variant="outlined"
            label={<span style={{ fontWeight: 'bold' }}>Search</span>}
            sx={{
              position: 'absolute',
              top: '160px',
              right: '20px',
              minWidth: '400px',
            }}
          />
        </div>
      </div>
      <div className="flex justify-center mt-8">
        <div style={{ position: 'absolute', top: '230px', right: '-60px' }}>
          <input type="file" onChange={handleFileUpload} />
        </div>
      </div>
      <div className='flex flex-col sm:flex-row justify-center sm:justify-start mt-20 md:mt-50' style={{ top: '20px', right: '20px' }}>
        <Dropdown options={sy} label={<span style={{ fontWeight: 'bold' }}>School Year</span>} sx={{ outline: '4px solid black' }} />
        <Dropdown options={gradelevel} label={<span style={{ fontWeight: 'bold' }}>Grade level</span>} sx={{ outline: '4px solid black' }} />
        <Dropdown options={section} label={<span style={{ fontWeight: 'bold' }}>Section</span>} sx={{ outline: '4px solid black' }} />
      </div>
      <div style={{ borderBottomWidth: 1, borderColor: '#F2B569' }}></div>
      <table className='w-full mt-8 ' style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th className='px-4 py-2 border font-bold'>LRN</th>
            <th className='px-4 py-2 border font-bold'>Student Name</th>
            <th className='px-4 py-2 border font-bold'>Payment Description</th>
            <th className='px-4 py-2 border font-bold'>Payment Deadline</th>
            <th className='px-4 py-2 border font-bold'>Remarks</th>
            <th className='px-4 py-2 border font-bold'>Date Paid</th>
          </tr>
        </thead>
        <tbody className='text-center'>
          {billingsData.map((billing, index) => (
            <tr key={index}>
              <td className='border px-4 py-2'>{billing.lrn}</td>
              <td className='border px-4 py-2'>{billing.name}</td>
              <td className='border px-4 py-2'>{billing.description}</td>
              <td className='border px-4 py-2'>{billing.deadline}</td>
              <td className='border px-4 py-2'>{billing.remarks}</td>
              <td className='border px-4 py-2'>{billing.paid}</td>
              <td className=''>
                <FontAwesomeIcon icon={faEdit} onClick={() => handleEditRow(index)} style={{ cursor: 'pointer', color: 'blue', marginRight: '5px' }} />
                <FontAwesomeIcon icon={faTrash} onClick={() => handleDeleteRow(index)} style={{ cursor: 'pointer', color: 'red' }} />
              </td>
             </tr>
          ))}
        </tbody>
      </table>

      <div className='flex flex-col md:flex-row justify-center lg:justify-end mt-8 md:mt-5 items-center ' style={{ top: '10px', right: '10px' }}>
        <div className='flex flex-col md:flex-row justify-center lg:justify-end mt-8 md:mt-5 items-center ' style={{ top: '10px', right: '10px' }}>
          <div className='flex items-center justify-center rounded-lg px-2 py-2 lg:w-auto' style={{ backgroundColor: '#F2B569', cursor: 'pointer', marginBottom: '10px', position: 'absolute', top: '170px', right: '450px' }}>
            <img src={adduser} alt="" className="h-12 w-100 lg:h-5 lg:w-5" />
            <button onClick={handleDownload} className='text-l font-serif px-1' style={{ color: '#079440' }}>Billing Card</button>
          </div>
        </div>
        <div style={{
          border: '2px solid black',
          padding: '5px',
          borderRadius: '5px',
          position: 'absolute',
          top: '170px',
          right: '630px',
          backgroundColor: '#ffffff',
          textAlign: 'center'
        }}>
          <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
        </div>
      </div>
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0, 0, 0, 0.5)', zIndex: 999 }}>
          <div className="container" style={{ position: 'relative', zIndex: 1000 }}>
            <div className="modal" style={{ width: '500px', height: '490px', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'linear-gradient(to bottom, #d9ffb3, #ffffb3)', borderRadius: '30px' }}>
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
                    label={<b>Remarks</b>}
                    variant="outlined"
                    value={formData.remarks}
                    onChange={handleInputChange}
                    name="remarks"
                    sx={{ fontWeight: 'bold', width: '100%', color: 'black' }}
                  />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px', color: 'black' }}>
                  <TextField
                    onClick={(e) => e.stopPropagation()}
                    id="paid"
                    label={<b>Date Paid</b>}
                    variant="outlined"
                    value={formData.paid}
                    onChange={handleInputChange}
                    name="paid"
                    sx={{ fontWeight: 'bold', width: '100%', color: 'black' }}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Box>
                <button style={{ width: '100%', fontWeight: 'bold', marginTop: '10px', color: '#003300' }} onClick={handleSubmit}>Submit</button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div
        className='flex flex-col md:flex-row justify-center lg:justify-end mt-8 md:mt-5 items-center'
        style={{ top: `${tableHeight + 20}px`, right: '10px' }}>
        <img
          src={addIcon}
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
