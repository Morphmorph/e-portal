import React, { useState, useEffect } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import TextField from "@mui/material/TextField";
import Dropdown from '../component/Dropdown';
import adduser from '../assets/adduser.webp';
import Box from '@mui/material/Box';
import add from '../assets/add.webp';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import * as XLSX from 'xlsx';

function TUsers({ onCancelClick }) {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    Name: '',
    LRN: '',
    Age: '',
    Address: '',
    Contact: '',
    Gender: ''
  });

  const [classAdviser, setClassAdviser] = useState(<b>Johnny Bravo</b>);
  const [studentList, setStudentList] = useState([]);
  const [startDate, setStartDate] = useState(new Date());

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

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
        const parsedData = XLSX.utils.sheet_to_json(ws, { header: 1 }).map(row => ({
          Name: row[0],
          LRN: row[1],
          Age: row[2],
          Address: row[3],
          Contact: row[4],
          Gender: row[5],
        }));
        setStudentList(parsedData);
        localStorage.setItem('studentList', JSON.stringify(parsedData));
      };
      reader.readAsArrayBuffer(file);
    } else {
      console.error('Invalid file object');
    }
  };

  const handleSubmit = () => {
    const newStudent = { ...formData };
    setStudentList([...studentList, newStudent]);
    setShowModal(false);
    window.alert('Student successfully added');
    setFormData({
      Name: '',
      LRN: '',
      Age: '',
      Address: '',
      Contact: '',
      Gender: ''
    });
  };

  const handleDeleteRow = (index) => {
    const newData = [...studentList];
    newData.splice(index, 1);
    setStudentList(newData);
    localStorage.setItem('studentList', JSON.stringify(newData));
  };

  const handleEditRow = (index) => {
    const editedStudent = { ...studentList[index] };
    setFormData(editedStudent);
    const newData = [...studentList];
    newData.splice(index, 1);
    setStudentList(newData);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    window.alert('Student addition cancelled');
  };

  useEffect(() => {
    localStorage.setItem('studentList', JSON.stringify(studentList));
  }, [studentList]);

  useEffect(() => {
    const storedStudentList = localStorage.getItem('studentList');
    if (storedStudentList) {
      setStudentList(JSON.parse(storedStudentList));
    }
  }, []);

  const gender = [
    { value: '1', label: 'All Female' },
    { value: '2', label: 'All Male' },
  ];

  const downloadPDF = () => {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'letter'
    });

    const topMargin = 20;
    const bottomMargin = 20;
    const usableHeight = doc.internal.pageSize.height - topMargin - bottomMargin;

    doc.setFontSize(18);
    doc.setFont("Font Serif", "bold");
    doc.setTextColor(3, 109, 0);
    doc.text('Student List', doc.internal.pageSize.width / 2, topMargin, { align: 'center' });
    doc.setFontSize(12);
    doc.setFont("Font Serif", "bold");
    doc.setTextColor(3, 63, 0);

    const textX = 10;
    const textY = topMargin + 10;

    doc.text(`Date: ${startDate.toLocaleDateString()}`, textX, textY);
    doc.text(`Class Adviser: Johnny Bravo`, textX, textY + 10);

    const startY = textY + 20;
    const tableData = studentList.map(student => [student.Name, student.LRN, student.Age, student.Address, student.Contact, student.Gender]);

    doc.autoTable({
      startY: startY,
      head: [['Student Name', 'LRN', 'Age', 'Home Address', 'Contact Number', 'Gender']],
      body: tableData
    });

    doc.save('List of Student.pdf');
  };

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
      <div className='items-center ' style={{ top: '0px', right: '30px', marginTop: '10px' }}>
        <div className='justify-start items-start sm:justify-center sm:items-center'>
          <div>
            <h1 className='text-2xl font-serif italic pl-2' style={{ color: '#004d1a', fontSize: '50px', marginBottom: '20px' }}>LIST OF STUDENTS</h1>
            <h2 className='text-2xl font-serif italic pl-2' style={{ color: '#004d1a', fontSize: '50px' }}>GRADE 1</h2>
          </div>
          <div style={{ border: '2px solid #004d1a', padding: '2px', borderRadius: '10px', background: 'linear-gradient(to bottom, #d9ffb3, #ffffb3)', marginBottom: '10px', marginTop: '60px' }}>
            <div style={{ color: '#004d1a', fontSize: '20px', fontStyle: 'italic', marginBottom: '10px', marginTop: '10px', paddingLeft: '20px' }}><b>Class Adviser:</b> {classAdviser}</div>
          </div>
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
      <div className='flex flex-col sm:flex-row justify-center sm:justify-end mt-20 md:mt-100 items-center ' style={{ top: '10px', right: '20px' }}>
      </div>
      <div className='' style={{ marginBottom: '0px', marginTop: '-100px' }}>
        <Dropdown options={gender} label={<span style={{ fontWeight: 'bold' }}>Gender</span>} sx={{ outline: '4px solid black' }} />
      </div>
      <div style={{ borderBottomWidth: 1, borderColor: '#F2B569' }}></div>
      <table id="student-table" className='w-full mt-8 ' style={{ borderCollapse: 'bold' }}>
        <thead>
          <tr>
            <th className='px-4 py-2 border font-bold'>Student Name</th>
            <th className='px-4 py-2 border font-bold'>LRN</th>
            <th className='px-4 py-2 border font-bold'>Age</th>
            <th className='px-4 py-2 border font-bold'>Home Address</th>
            <th className='px-4 py-2 border font-bold'>Contact Number</th>
            <th className='px-4 py-2 border font-bold'>Gender</th>
          </tr>
        </thead>
        <tbody className='text-center'>
          {studentList.map((student, index) => (
            <tr key={index} className='flex-1 items-center justify-center'>
              <td className='border px-4 py-2'>{student.Name}</td>
              <td className='border px-4 py-2'>{student.LRN}</td>
              <td className='border px-4 py-2'>{student.Age}</td>
              <td className='border px-4 py-2'>{student.Address}</td>
              <td className='border px-4 py-2'>{student.Contact}</td>
              <td className='border px-4 py-2'>{student.Gender}</td>
              <td className=''>
                <FontAwesomeIcon icon={faEdit} onClick={() => handleEditRow(index)} style={{ cursor: 'pointer', color: 'blue', marginRight: '5px' }} />
                <FontAwesomeIcon icon={faTrash} onClick={() => handleDeleteRow(index)} style={{ cursor: 'pointer', color: 'red' }} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='flex flex-col md:flex-row justify-center lg:justify-end mt-8 md:mt-5 items-center ' style={{ top: '10px', right: '10px' }}>
        <div className='flex items-center justify-center rounded-lg px-2 py-2 lg:w-auto' style={{ backgroundColor: '#F2B569', cursor: 'pointer', marginBottom: '10px', position: 'absolute', top: '170px', right: '450px' }}>
          <img src={adduser} alt="" className="h-12 w-100 lg:h-5 lg:w-5" />
          <button onClick={downloadPDF} className='text-l font-serif px-1' style={{ color: '#079440' }}>Student List</button>
        </div>
      </div>
      <div style={{
        border: '2px solid black',
        padding: '5px',
        borderRadius: '5px',
        position: 'absolute',
        top: '170px',
        right: '600px',
        backgroundColor: '#ffffff',
        textAlign: 'center'
      }}>
        <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
      </div>
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0, 0, 0, 0.5)', zIndex: 999 }}>
          <div className="container" style={{ position: 'relative', zIndex: 1000 }}>
            <div className="modal" style={{ width: '500px', height: '485px', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'linear-gradient(to bottom, #d9ffb3, #ffffb3)', borderRadius: '30px' }}>
              <span className="close" onClick={handleCloseModal} style={{ position: 'absolute', top: '0px', right: '13px', cursor: 'pointer', color: 'red', fontSize: '30px' }}>
                <span style={{ color: 'red', transition: 'color 0.3s' }}>×</span>
              </span>
              <div className="modal-content" style={{ padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                  <TextField
                    onClick={(e) => e.stopPropagation()}
                    id="Name"
                    label={<b>Student Name</b>}
                    variant="outlined"
                    value={formData.Name}
                    onChange={handleInputChange}
                    name="Name"
                    sx={{ fontWeight: 'bold', width: '100%', color: 'black' }}
                  />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                  <TextField
                    onClick={(e) => e.stopPropagation()}
                    id="LRN"
                    label={<b>LRN</b>}
                    variant="outlined"
                    value={formData.LRN}
                    onChange={handleInputChange}
                    name="LRN"
                    sx={{ fontWeight: 'bold', width: '100%', color: 'black' }}
                  />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                  <TextField
                    onClick={(e) => e.stopPropagation()}
                    id="Age"
                    label={<b>Age</b>}
                    variant="outlined"
                    value={formData.Age}
                    onChange={handleInputChange}
                    name="Age"
                    sx={{ fontWeight: 'bold', width: '100%', color: 'black' }}
                  />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                  <TextField
                    onClick={(e) => e.stopPropagation()}
                    id="Address"
                    label={<b>Home Address</b>}
                    variant="outlined"
                    value={formData.Address}
                    onChange={handleInputChange}
                    name="Address"
                    sx={{ fontWeight: 'bold', width: '100%', color: 'black' }}
                  />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                  <TextField
                    onClick={(e) => e.stopPropagation()}
                    id="Contact"
                    label={<b>Contact Number</b>}
                    variant="outlined"
                    value={formData.Contact}
                    onChange={handleInputChange}
                    name="Contact"
                    sx={{ fontWeight: 'bold', width: '100%', color: 'black' }}
                  />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px', color: 'black' }}>
                  <TextField
                    onClick={(e) => e.stopPropagation()}
                    id="Gender"
                    label={<b>Gender</b>}
                    variant="outlined"
                    value={formData.Gender}
                    onChange={handleInputChange}
                    name="Gender"
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
        <img src={add} alt="" className="h-10 w-10" style={{ cursor: 'pointer', marginBottom: '10px', position: 'spatial', top: '670px', right: '30px' }} onClick={() => setShowModal(true)} />
      </div>
      <div></div>
    </div>
  );
}

export default TUsers;
