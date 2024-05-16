import React, { useState, useEffect } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import TextField from "@mui/material/TextField";
import Dropdown from '../component/Dropdown';
import adduser from '../assets/adduser.webp';
import fileIcon from '../assets/file.webp';
import plusIcon from '../assets/plus.webp';
import calendarIcon from '../assets/calendar.webp';
import excelIcon from '../assets/excel.webp';
import Box from '@mui/material/Box';
import add from '../assets/add.webp';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import * as XLSX from 'xlsx';

function TGrades({ onCancelClick }) {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    lrn: '',
    name: '',
    subject: '',
    grades: '',
    remarks: ''
  });
  const [gradesData, setGradesData] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [selectedSchoolYear, setSelectedSchoolYear] = useState(null);
  const [selectedGradeLevel, setSelectedGradeLevel] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [tableHeight, setTableHeight] = useState(0);

  useEffect(() => {
    const savedData = localStorage.getItem('gradesData');
    if (savedData) {
      setGradesData(JSON.parse(savedData));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if ((name === 'lrn' || name === 'grades') && isNaN(value)) {
      window.alert('Please enter a VALID NUMBER.');
      return;
    }

    if (name === 'lrn' && value.length > 12) return;

    if (name === 'grades') {
      const newValue = value.replace(/\D/g, '');
      if (newValue.length > 3) return;
      setFormData({
        ...formData,
        [name]: newValue
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = () => {
    const { lrn, name, subject, grades } = formData;

    const grade = parseFloat(grades);
    if (isNaN(grade) || grade < 0 || grade > 100) {
      window.alert('Please enter a valid grade (0-100)');
      return;
    }

    let remarks = '';
    if (grade >= 95) {
      remarks = 'Outstanding Student';
    } else if (grade >= 90) {
      remarks = 'Excellent Student';
    } else if (grade >= 85) {
      remarks = 'Student is in a learning state';
    } else if (grade >= 80) {
      remarks = 'Student is in need of time to understand the lesson';
    } else if (grade >= 75) {
      remarks = 'Student needs time to study';
    } else {
      remarks = 'Student needs time to study';
    }

    const newData = [...gradesData, { lrn, name, subject, grades, remarks }];
    setGradesData(newData);
    localStorage.setItem('gradesData', JSON.stringify(newData));

    setFormData({
      lrn: '',
      name: '',
      subject: '',
      grades: '',
      remarks: ''
    });

    setShowModal(false);
    window.alert('Grade successfully computed');
  };

  const handleDeleteRow = (index) => {
    const newData = [...gradesData];
    newData.splice(index, 1);
    setGradesData(newData);
    localStorage.setItem('gradesData', JSON.stringify(newData));
  };

  const handleEditRow = (index) => {
    const editedGrades = { ...gradesData[index] };
    setFormData(editedGrades);
    const newData = [...gradesData];
    newData.splice(index, 1);
    setGradesData(newData);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    window.alert('Grade computation cancelled');
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

  const handleDownload = () => {
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
    doc.text('Grades', doc.internal.pageSize.width / 2, topMargin, { align: 'center' });
    doc.setFontSize(12);
    doc.setFont("Font Serif", "bold");
    doc.setTextColor(3, 63, 0);

    const textX = 10;
    const textY = topMargin + 10;
    const dateString = `Date: ${startDate.toLocaleDateString()}`;
    const schoolInfoString = `School Year: ${selectedSchoolYear?.label || 'N/A'} | Grade Level: ${selectedGradeLevel?.label || 'N/A'} | Section: ${selectedSection?.label || 'N/A'}`;
    const lineHeight = 10;

    doc.text(dateString, textX, textY);
    doc.text(schoolInfoString, textX, textY + lineHeight);

    const startY = textY + 2 * lineHeight; // Adjust as necessary

    doc.autoTable({
      startY: startY,
      head: [['LRN', 'Student Name', 'Subject', 'Grades', 'Remarks']],
      body: gradesData.map(student => [student.lrn, student.name, student.subject, student.grades, student.remarks])
    });
     

    doc.save('Grades.pdf');
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: 'binary' });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
      const parsedData = XLSX.utils.sheet_to_json(ws, { header: 1 }).map(row => {
        let remarks = '';
        const grades = parseFloat(row[3]);
        if (grades >= 95) {
          remarks = 'Outstanding Student';
        } else if (grades >= 90) {
          remarks = 'Excellent Student';
        } else if (grades >= 85) {
          remarks = 'Student is in a learning state';
        } else if (grades >= 80) {
          remarks = 'Student is in need of time to understand the lesson';
        } else if (grades >= 75) {
          remarks = 'Student needs time to study';
        } else {
          remarks = 'Student needs time to study';
        }
        return {
          lrn: row[0],
          name: row[1],
          subject: row[2],
          grades: row[3],
          remarks: remarks
        };
      });
      setGradesData(parsedData);
    };
    reader.readAsArrayBuffer(file);
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
       <div className='flex flex-col sm:flex-row justify-center sm:justify-start mt-8 md:mt-5 items-center ' style={{ top: '0px', right: '30px' }}>
                <div className="justify-start items-start sm:justify-center sm:items-center mb-2 md:mt-0">
                          <h1
                            className="text-4xl font-serif font-semibold px-4"
                            style={{
                              color: "#21421e",
                              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
                            }}
                          >
                            ATTENDANCE
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
      <div className='flex flex-col sm:flex-row justify-center sm:justify-end mt-20 md:mt-100 items-center ' style={{ top: '0px', right: '0px' }}>
              <Dropdown options={sy} label={<span style={{ fontWeight: 'bold',color: 'black' }}>School Year</span>} sx={{ outline: '4px solid black' }} />
              <Dropdown options={gradelevel} label={<span style={{ fontWeight: 'bold',color: 'black' }}>Grade level</span>} sx={{ outline: '4px solid black' }} />
              <Dropdown options={sections} label={<span style={{ fontWeight: 'bold',color: 'black',}}>Section</span>} sx={{ outline: '4px solid black' }} />
       </div>
      <div style={{ borderBottomWidth: 3, borderColor: '#F2B569' }}></div>
      <table className='w-full mt-8 ' style={{ borderCollapse: 'bold' }}>
        <thead>
          <tr>
            <th className='border-4 px-4 py-2 border font-bold' style={{ color: 'black', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>LRN</th>
            <th className='border-4 px-4 py-2 border font-bold' style={{ color: 'black', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>Student Name</th>
            <th className='border-4 px-4 py-2 border font-bold' style={{ color: 'black', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>Subject</th>
            <th className='border-4 px-4 py-2 border font-bold' style={{ color: 'black', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>Grades</th>
            <th className='border-4 px-4 py-2 border font-bold' style={{ color: 'black', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>Remarks</th>
          </tr>
        </thead>
        <tbody className='text-center'>
          {gradesData.map((data, index) => (
            <tr key={index} className='flex-1 items-center justify-center'>
              <td className='border-4 px-4 py-2'>{data.lrn}</td>
              <td className='border-4 px-4 py-2'>{data.name}</td>
              <td className='border-4 px-4 py-2'>{data.subject}</td>
              <td className='border-4 px-4 py-2'>{data.grades}</td>
              <td className='border-4 px-4 py-2'>{data.remarks} </td>
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

export default TGrades;
