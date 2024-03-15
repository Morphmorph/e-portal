import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

const columns = [
  { id: "id", label: "#", minWidth: 170 },
  { id: "subject", label: "Subject", minWidth: 170 },
  {
    id: "firstGrading",
    label: "1st Grading",
    align: "center",
    minWidth: 170,
  },
  {
    id: "secondGrading",
    label: "2nd Grading",
    align: "center",
    minWidth: 170,
  },
  {
    id: "thirdGrading",
    label: "3rd Grading",
    align: "center",
    minWidth: 170,
  },
  {
    id: "fourthGrading",
    label: "4th Grading",
    align: "center",
    minWidth: 170,
  },
  {
    id: "remarks",
    label: "Remarks",
    align: "center",
    minWidth: 170,
  },
];

function createData(
  id,
  subject,
  firstGrading,
  secondGrading,
  thirdGrading,
  fourthGrading,
  remarks
) {
  return {
    id,
    subject,
    firstGrading,
    secondGrading,
    thirdGrading,
    fourthGrading,
    remarks,
  };
}

const rows = [
  createData(
    1,
    "Mathematics",
    85,
    88,
    90,
    87,
    "Excellent progress throughout the year."
  ),
  createData(2, "English", 78, 80, 82, 79, "Consistent improvement shown."),
  createData(
    3,
    "Science",
    92,
    89,
    91,
    93,
    "Outstanding performance in all quarters."
  ),
  createData(
    4,
    "History",
    75,
    77,
    78,
    76,
    "Satisfactory progress, but room for improvement noted."
  ),
  createData(
    5,
    "Geography",
    86,
    88,
    84,
    87,
    "Strong understanding of concepts demonstrated consistently."
  ),
  createData(
    6,
    "Art",
    80,
    82,
    79,
    81,
    "Creativity and effort reflected in performance."
  ),
  createData(
    7,
    "Physical Education",
    90,
    91,
    88,
    92,
    "Exceptional participation and fitness levels maintained."
  ),
  createData(
    8,
    "Computer Science",
    88,
    85,
    86,
    89,
    "Proficient in understanding programming concepts."
  ),
  createData(
    9,
    "Music",
    82,
    83,
    80,
    84,
    "Improvement shown in practical skills and theoretical knowledge."
  ),
  createData(
    10,
    "Foreign Language (French)",
    87,
    89,
    85,
    88,
    "Competent understanding of vocabulary and grammar structures."
  ),
];

export default function StudGradesTable() {
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
