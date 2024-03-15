import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";

const columns = [
  { id: "id", label: "ID", minWidth: 170 },
  { id: "name", label: "Name", minWidth: 170 },
  { id: "contact", label: "Contact no.", minWidth: 170 },
  { id: "gradelevel", label: "Grade level", minWidth: 170 },
  { id: "section", label: "Section", minWidth: 170 },
  { id: "adviser", label: "Adviser", minWidth: 170 },
  {
    id: "status",
    label: "Status",
    minWidth: 170,
    align: "center",
    render: (value) => (
      <span
        style={{
          fontWeight: "bold",
          padding: 10,
          color: value === "Paid" ? "#079440" : "#F2B569",
          borderRadius: 5,
        }}
      >
        {value}
      </span>
    ),
  },
];

function createData(id, name, contact, gradelevel, section, adviser, status) {
  return { id, name, contact, gradelevel, section, adviser, status };
}

const rows = [
  createData(
    1234567890,
    "John Doe Dobido",
    9876543210,
    "Grade 1",
    "Peace",
    "Son Goku",
    "Pending"
  ),
  createData(
    6231811933,
    " Doe Dobido-bido",
    9663718826,
    "Grade 1",
    "Peace",
    "Son Goku",
    "Paid"
  ),
];

export default function SLedgerTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", mt: 2 }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    color: "#079440",
                    fontWeight: "bold",
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{ borderLeft: "1px solid #ccc" }}
                        >
                          {column.render ? column.render(value) : value}
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
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
