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

// Adjust the import according to the actual location and structure of the data
import options from "../Users/options.json";

// Function to format time
const formatTime = (time) => {
  if (!time) return ""; // Return empty string if time is not provided

  const formattedTime = time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true });
  return formattedTime;
};

// Functions to get the label for grade level, section, and subject
const getGradeLabel = (value) => {
  const grade = options.gradeLevels.find((grade) => grade.value === value);
  return grade ? grade.label : "";
};

const getSectionLabel = (grade, value) => {
  const section = options.sections[grade].find((section) => section.value === value);
  return section ? section.label : "";
};

const getSubjectLabel = (grade, value) => {
  const subject = options.subjects[grade].find((subject) => subject.value === value);
  return subject ? subject.label : "";
};

const columns = [
  { id: "createdate", label: "Date created", minWidth: 170, align: "center" },
  { id: "subjectname", label: "Subject name", minWidth: 170, align: "center" },
  { id: "gradelvl", label: "Grade level", minWidth: 170 },
  { id: "section", label: "Section", minWidth: 170 },
  { id: "timeIn", label: "Time start", minWidth: 170 },
  { id: "timeOut", label: "Time end", minWidth: 170 },
  {
    id: "details",
    label: "View details",
    minWidth: 170,
    align: "center",
    render: (row, showProfileView) => (
      <Button variant="contained" color="primary" onClick={() => showProfileView(row)}>
        View
      </Button>
    ),
  },
];

const TSubjectHandleTable = ({ rows, showProfileView }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleViewDetails = (row) => {
    showProfileView(row);
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
                  style={{ minWidth: column.minWidth, color: "#079440", fontWeight: "bold" }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  No data available.
                </TableCell>
              </TableRow>
            ) : (
              rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
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
                          {column.id === "gradelvl"
                            ? getGradeLabel(value)
                            : column.id === "section"
                            ? getSectionLabel(row.gradelvl, value)
                            : column.id === "subjectname"
                            ? getSubjectLabel(row.gradelvl, value)
                            : column.id === "timeIn"
                            ? formatTime(row.timeIn)
                            : column.id === "timeOut"
                            ? formatTime(row.timeOut)
                            : column.id === "details"
                            ? column.render(row, handleViewDetails)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {rows.length > 0 && (
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </Paper>
  );
};

export default TSubjectHandleTable;
