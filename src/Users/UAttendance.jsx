import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const columns = [
  { id: 'student_id', label: 'ID No.', minWidth: 170 },
  { id: 'student_name', label: 'Student Name', minWidth: 170 },
  { id: 'status', label: 'Status', minWidth: 170, align: 'center' },
];

const UAttendance = ({ enrolledStudents, attendanceData, handleStatusChange, statusFilter, statusOptions, onStatusFilterChange }) => {
  const [selectedStatus, setSelectedStatus] = useState({});
  
  useEffect(() => {
    const storedStatus = localStorage.getItem('selectedStatus');
    if (storedStatus) {
      setSelectedStatus(JSON.parse(storedStatus));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('selectedStatus', JSON.stringify(selectedStatus));
  }, [selectedStatus]);

  const handleChange = (status, studentId, sectionId) => {
    console.log('Selected Status:', status); // Log selected status
    console.log('Status Options:', statusOptions); // Log status options
    setSelectedStatus(prevState => ({
      ...prevState,
      [studentId]: status,
    }));
    handleStatusChange(status, studentId, sectionId);
  };

  const filterStudentsByStatus = () => {
    if (!statusFilter) {
      return enrolledStudents;
    }
    return enrolledStudents.filter(student =>
      attendanceData.some(entry => entry.student === student.student.user_id && entry.status === statusFilter)
    );
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', mt: 2 }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id}>{column.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filterStudentsByStatus().length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">No data available</TableCell>
              </TableRow>
            ) : (
              filterStudentsByStatus().map((student) => {
                const studentId = student.student.user_id;
                const studentName = student.student.name;
                const studentStatus = selectedStatus[studentId] || '';
  
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={studentId}>
                    <TableCell style={{ borderLeft: '1px solid #ccc', textTransform: 'uppercase' }}>{student.student.student_id}</TableCell>
                    <TableCell style={{ borderLeft: '1px solid #ccc', textTransform: 'uppercase' }}>{studentName}</TableCell>
                    <TableCell style={{ borderLeft: '1px solid #ccc', textTransform: 'uppercase' }} align='center'>
                      <Select
                        value={studentStatus}
                        onChange={(event) => handleChange(event.target.value, studentId, student.section.section_id)}
                        fullWidth
                        style={{
                          backgroundColor: statusOptions.find((option) => option.value === studentStatus)?.color || 'inherit',
                        }}
                      >
                        {statusOptions.map((option) => (
                          <MenuItem key={option.value} value={option.value} style={{ backgroundColor: option.color }}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
  };

export default UAttendance;
