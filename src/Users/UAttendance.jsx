import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const statusOptions = [
  { value: 'present', label: 'Present', color: '#7ac57a' }, // Light green
  { value: 'absent', label: 'Absent', color: '#ff9999' }, // Light red
  { value: 'late', label: 'Late', color: '#ffa64d' }, // Light orange
  { value: 'cutting', label: 'Cutting', color: '#ffcc66' }, // Light yellow
  { value: 'excuse', label: 'Excuse', color: '#99ccff' }, // Light blue
];

const columns = [
  { id: 'createdate', label: 'Date Created', minWidth: 170, align: 'center' },
  { id: 'id', label: 'ID', minWidth: 170 },
  { id: 'name', label: 'Name', minWidth: 170 },
  {
    id: 'status',
    label: 'Status',
    minWidth: 170,
    align: 'center',
    render: (value, handleStatusChange, index) => (
      <Select
        value={value}
        onChange={(event) => handleStatusChange(event.target.value, index)}
        fullWidth
        style={{
          backgroundColor: statusOptions.find(option => option.value === value)?.color || 'inherit'
        }}
      >
        {statusOptions.map(option => (
          <MenuItem key={option.value} value={option.value} style={{ backgroundColor: option.color }}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    ),
  },
];

function createData(createdate, usertype, id, name) {
  return { createdate, usertype, id, name, status: '' }; // Initial status is empty
}

const rows = [
  createData('03/15/2024', 'Student', 1234567890, 'John Doe'),
  createData('03/15/2024', 'Student', 1234567890, 'John Doe'),
  createData('03/15/2024', 'Student', 1234567890, 'John Doe'),
  createData('03/15/2024', 'Student', 1234567890, 'John Doe'),
  createData('03/15/2024', 'Teacher', 1234567890, 'John Doe'),
];

export default function UAttendance() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [attendanceRows, setAttendanceRows] = React.useState(rows);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleStatusChange = (newValue, index) => {
    const updatedRows = [...attendanceRows];
    updatedRows[index].status = newValue;
    setAttendanceRows(updatedRows);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', mt: 2 }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, color: '#079440', fontWeight: 'bold' }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {attendanceRows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align} style={{ borderLeft: '1px solid #ccc' }}>
                          {column.render ? column.render(value, handleStatusChange, index) : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={attendanceRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
