import React, { useState } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import TextField from '@mui/material/TextField';
import Dropdown from '../component/Dropdown';
import fileIcon from '../assets/file.webp';
import calendarIcon from '../assets/calendar.webp';
import excelIcon from '../assets/excel.webp';
import plusIcon from '../assets/plus.webp';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

function TAttendance({ onCancelClick }) {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    lrn: '',
    name: '',
    month: '',
    present: '',
    absent: '',
  });
  const [attendanceData, setAttendanceData] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [language, setLanguage] = useState('English');
  const [tableHeight, setTableHeight] = useState(0);



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
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
          lrn: row[0],
          name: row[1],
          month: row[2],
          present: row[3],
          absent: row[4],
        }));

        const updatedData = parsedData.map(row => {
                const presentValue = parseInt(row.present);
                if (presentValue < 20) {
                  return { ...row, absent: 20 - presentValue };
                } else if (presentValue === 20) {
                  return { ...row, absent: 0, attendanceStatus: ''};
                } else {
                  return row;
                }
              });
        setAttendanceData(updatedData);
      };
      reader.readAsArrayBuffer(file);
    } else {
      console.error('Invalid file object');
    }
  };

  const handlePresentChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value <= 20) {
      setFormData({
        ...formData,
        present: value,
        absent: 20 - value,
      });
    }
  };

  const handleMonthChange = (e, index) => {
    const { value } = e.target;
    const updatedData = attendanceData.map((data, i) => {
      if (i === index) {
        return { ...data, month: value };
      }
      return data;
    });
    setAttendanceData(updatedData);
  };

  const handleSubmit = () => {
    setShowModal(false);
    window.alert('Information successfully added');
    setAttendanceData([...attendanceData, formData]);
    setFormData({
      lrn: '',
      name: '',
      month: '',
      present: '',
      absent: '',
    });
  };

  const handleDeleteRow = (index) => {
    const newData = attendanceData.filter((_, i) => i !== index);
    setAttendanceData(newData);
  };

  const handleEditRow = (index) => {
    const editedStudent = { ...attendanceData[index] };
    setFormData(editedStudent);
    const newData = attendanceData.filter((_, i) => i !== index);
    setAttendanceData(newData);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    window.alert('Information not added');
  };

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

  const handleDownload = () => {
    const doc = new jsPDF();

    const header = 'Attendance Report';
    const today = new Date();
    const date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;

    const tableData = [];
    attendanceData.forEach(data => {
      const monthAbbr = convertToMonthAbbr(data.month);
      tableData.push([data.lrn, data.name, monthAbbr, data.present, data.absent]);
    });

    const columns = ['LRN', 'Student Name', 'Month', 'Total Present', 'Total Absent'];

    doc.setFontSize(18);
    doc.text(header, 14, 20);

    doc.setFontSize(12);
    doc.text(date, 14, 30);

    doc.autoTable({
      startY: 40,
      head: [columns],
      body: tableData,
    });

    doc.save('attendance_report.pdf');
  };

  const convertToMonthAbbr = (monthName) => {
    const monthAbbrMap = {
      'January': 'January',
      'February': 'February',
      'March': 'March',
      'April': 'April',
      'May': 'May',
      'June': 'June',
      'July': 'July',
      'August': 'August',
      'September': 'September',
      'October': 'October',
      'November': 'November',
      'December': 'December'
    };

    return monthAbbrMap[monthName] || 'January';
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
            cursor: 'pointer',
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
      <table className='w-full mt-8' style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th className='border-4 px-4 py-2 border font-bold' style={{ color: 'black', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>LRN</th>
            <th className='border-4 px-4 py-2 border font-bold' style={{ color: 'black', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>Student Name</th>
            <th className='border-4 px-4 py-2 border font-bold' style={{ color: 'black', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>Month</th>
            <th className='border-4 px-4 py-2 border font-bold' style={{ color: 'black', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>Total Present</th>
            <th className='border-4 px-4 py-2 border font-bold' style={{ color: 'black', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>Total Absent</th>
          </tr>
        </thead>
       <tbody className='text-center'>
         {attendanceData.map((data, index) => (
           <tr key={index} className='flex-1 items-center justify-center'>
             <td className='border-4 px-4 py-2'>{data.lrn}</td>
             <td className='border-4 px-4 py-2'>{data.name}</td>
             <td className='border-4 px-4 py-2'>
               <select value={data.month} onChange={(e) => handleMonthChange(e, index)}>
                 <option value="January">January</option>
                 <option value="February">February</option>
                 <option value="March">March</option>
                 <option value="April">April</option>
                 <option value="May">May</option>
                 <option value="June">June</option>
                 <option value="July">July</option>
                 <option value="August">August</option>
                 <option value="September">September</option>
                 <option value="October">October</option>
                 <option value="November">November</option>
                 <option value="December">December</option>
               </select>
             </td>
             <td className='border-4 px-4 py-2'>{data.present}</td>
             <td className='border-4 px-4 py-2'>{data.absent}</td>
             <td className=''>
                 <FontAwesomeIcon icon={faEdit} onClick={() => handleEditRow(index)} style={{ cursor: 'pointer', color: 'blue', marginRight: '5px' }} />
                 <FontAwesomeIcon icon={faTrash} onClick={() => handleDeleteRow(index)} style={{ cursor: 'pointer', color: 'red' }} />
               </td>
           </tr>
         ))}
       </tbody>
      </table>
             <div className='flex flex-col md:flex-row justify-center lg:justify-end mt-8 md:mt-5 items-center' style={{ top: '10px', right: '10px'}}>
               <div className='flex items-center justify-center rounded-lg px-2 py-2 lg:w-auto' style={{ backgroundColor: '#fdfd96', cursor: 'pointer', marginBottom: '10px', position: 'absolute', top: '205px', right: '70px' }}>
                 <img src={fileIcon} alt="" className="h-12 w-100 lg:h-8 lg:w-8" onClick={handleDownload} style={{ boxShadow: '0px 5px 5px rgba(255,0,0)' }} />
               </div>
               <div className='flex flex-col md:flex-row justify-center lg:justify-end mt-8 md:mt-5 items-center' style={{ top: '10px', right: '10px'}}>
               <div className='flex items-center justify-center rounded-lg px-2 py-2 lg:w-auto' style={{ backgroundColor: '#fdfd96', cursor: 'pointer', marginBottom: '10px', position: 'absolute', top: '205px', right: '130px' }}>
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
                       <TextField
                         id="present"
                         label={<b>Total Present</b>}
                         variant="outlined"
                         value={formData.present}
                         onChange={handlePresentChange}
                         name="present"
                         type="number"
                         onClick={(e) => e.stopPropagation()}
                         sx={{ fontWeight: 'bold', width: '100%', color: 'black' }}
                       />
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

export default TAttendance;
