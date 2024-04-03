import React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';

const columns = [
  { id: 'createdate', label: 'Date created', minWidth: 170, align: 'center' },
  { id: 'userType', label: 'User type', minWidth: 170, align: 'center' },
  { id: 'id', label: 'ID #', minWidth: 170 },
  { id: 'name', label: 'Name', minWidth: 170 },
  {
    id: 'details',
    label: 'Details',
    minWidth: 170,
    align: 'center',
    render: (row, showProfileView) => (
      <Button variant="contained" color="primary" onClick={() => showProfileView(row)}>
        View
      </Button>
    ),
  },
];

const UserTable = ({ showProfileView, users, selectedUserType }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Simplified filtering logic
  const filteredUsers = selectedUserType ? users.filter(user => user.userType === selectedUserType) : users;

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
            {filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  No users found.
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{ borderLeft: '1px solid #ccc' }}
                        >
                          {column.render ? 
                            column.render(row, showProfileView
                              ) : (
                                (value && (column.id === 'name' || column.id === 'userType')) ? 
                                  value.toUpperCase() : 
                                  value
                              )}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
          {filteredUsers.length > 0 && (
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={filteredUsers.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          )}
        </Paper>
      );
    };
    
    export default UserTable;
