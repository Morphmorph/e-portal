import React, { useState, useEffect } from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import useTheme from "@mui/material/styles/useTheme";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import add from "../assets/add.webp";
import data from ".././Users/options.json"; // assuming the JSON file is in the same directory
import axios from 'axios';

const useResponsiveStyle = () => {
  const theme = useTheme();
  return {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: "90%", sm: 550 }, // Adjust width based on screen size
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
    // overflowY: "scroll", // Enable vertical scrolling
    maxHeight: "90vh", // Set a maximum height to prevent modal from exceeding viewport height
    [theme.breakpoints.up("sm")]: {
      width: 550,
    },
  };
};

export default function AddSubjectHandleModal({ open, handleClose, addSubjectToTable }) {
  const style = useResponsiveStyle();
  const [gradeLevel, setGradeLevel] = React.useState("");
  const [section, setSection] = useState(null);
  const [subject, setSubject] = React.useState("");
  const [timeIn, setTimeIn] = React.useState(null);
  const [timeOut, setTimeOut] = React.useState(null);
  const [gradeError, setGradeError] = React.useState(false);
  const [sectionError, setSectionError] = React.useState(false);
  const [subjectError, setSubjectError] = React.useState(false);
  const [timeInError, setTimeInError] = React.useState(false);
  const [timeOutError, setTimeOutError] = React.useState(false);
  const [teachers, setTeachers] = React.useState([]);
  const [selectedTeacher, setSelectedTeacher] = React.useState("");
  const [teacherError, setTeacherError] = React.useState(false);

  // Fetch teacher data
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8081/api/users/');
      const { teachers } = response.data;
      setTeachers(teachers);
    } catch (error) {
      console.error('Error fetching teacher data:', error);
    }
  };
  // Load data from JSON file
  const { gradeLevels, sections, subjects } = data;

  // Function to get sections based on selected grade level
  const getSectionsByGradeLevel = (gradeLevel) => {
    return sections[gradeLevel] || [];
  };
  const getSubjectsByGradeLevel = (gradeLevel) => {
    return subjects[gradeLevel] || [];
  };
  const handleChangeGradeLevel = (event) => {
    const selectedGradeLevel = event.target.value;
    setGradeLevel(selectedGradeLevel);
    // Reset section when grade level changes
    setSection("");
    setSectionError(false); // Reset section error
    setGradeError(false); // Clear grade error when a selection is made
  };

  const handleChangeSection = (event) => {
    const selectedSection = event.target.value;
    setSection(selectedSection);
    setSectionError(false); // Clear section error when a selection is made
  };

  const handleChangeSubject = (event) => {
    const selectedSubject = event.target.value;
    setSubject(selectedSubject);
    setSubjectError(false); // Clear subject error when a selection is made
  };
  const getGradeLabel = (value) => {
    const grade = data.gradeLevels.find((grade) => grade.value === value);
    return grade ? grade.label : '';
  };

  const getSectionLabel = (grade, value) => {
    const section = data.sections[grade].find((section) => section.value === value);
    return section ? section.label : '';
  };

  const getSubjectLabel = (grade, value) => {
    const subjects = data.subjects[grade].find((subjects) => subjects.value === value);
    return subjects ? subjects.label : '';
  };
  const handleTimeInChange = (newTime) => {
    setTimeIn(new Date(newTime));
    setTimeInError(false); // Clear time in error when a selection is made
};

  const handleTimeOutChange = (newTime) => {
    setTimeOut(new Date(newTime));
    setTimeOutError(false); // Clear time out error when a selection is made
};

  const handleChangeTeacher = (event) => {
    const selectedTeacherId = event.target.value;
    setSelectedTeacher(selectedTeacherId);
    setTeacherError(false);
  };

  const handleAddButtonClick = async () => {
    let isError = false;
    console.log("Selected data:", {
      gradeLevel,
      section,
      subject,
      timeIn,
      timeOut,
      selectedTeacher
    });
   // Convert grade level and section to labels
   const gradeLevelLabel = getGradeLabel(gradeLevel);
   const sectionLabel = section ? getSectionLabel(gradeLevel, section) : null;
   const subjectLabel = subject ? getSubjectLabel(gradeLevel, subject) : null; 
    // Check if any required field is empty
    if (!gradeLevel || !section || !subject || !timeIn || !timeOut || !selectedTeacher) {
      // Set error state for the respective fields
      setGradeError(!gradeLevel);
      setSectionError(!section);
      setSubjectError(!subject);
      setTimeInError(!timeIn);
      setTimeOutError(!timeOut);
      setTeacherError(!selectedTeacher);
      isError = true;
    }
  
    // Convert timeIn and timeOut values to Date objects
    const formatTime = (dateString) => {
      const date = dateString instanceof Date ? dateString : new Date(dateString);
      if (date instanceof Date && !isNaN(date)) {
          const hours = date.getHours().toString().padStart(2, '0');
          const minutes = date.getMinutes().toString().padStart(2, '0');
          return `${hours}:${minutes}`;
      } else {
          return ''; // Handle invalid date input
      }
  };
    

    // If there is no error, add the subject to the table
    if (!isError) {
      const formattedTimeIn = formatTime(timeIn);
      const formattedTimeOut = formatTime(timeOut);
      try {
        await axios.post('http://127.0.0.1:8081/api/add_subject_handle/', {
          teacher: selectedTeacher,
          grade_level: gradeLevelLabel,
          section: sectionLabel,
          subject: subjectLabel,
          time_in: formattedTimeIn,
          time_out: formattedTimeOut
        });
        addSubjectToTable({
          teacher: selectedTeacher,
          subjectname: subject,
          gradelvl: gradeLevel,
          section: section,
          timeIn: timeIn,
          timeOut: timeOut
        });
        // Reset all fields to their initial state
        setGradeLevel("");
        setSection("");
        setSubject("");
        setTimeIn(null);
        setTimeOut(null);
        setGradeError(false);
        setSectionError(false);
        setSubjectError(false);
        setTimeInError(false);
        setTimeOutError(false);
      } catch (error) {
        console.error('Error adding subject handle:', error);
      }
    }
  };

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      closeAfterTransition
    >
      <div>
        <Box sx={style}>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: "white",
              background: "#F2B569",
              transition: "background 0.3s, transform 0.3s",
              "&:hover": {
                background: "red",
                transform: "scale(1.1)",
              },
            }}
          >
            <CloseIcon style={{ fontSize: 18 }} />
          </IconButton>

          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            style={{ color: "#079440", fontWeight: "bold", marginTop: "3vh" }}
          >
            Teacher Handled Subjects
          </Typography>

          <Grid container spacing={2}>
            {/* Adviser select field */}
            <Grid item xs={12} sm={6} mt={3}>
              <FormControl variant="outlined" size="small" fullWidth error={teacherError}>
                <InputLabel id="grade-level-label">Teacher</InputLabel>
                <Select
                    labelId="teacher-label"
                    id="teacher-select"
                    value={selectedTeacher}
                    onChange={handleChangeTeacher}
                    label="Teacher"
                    >
                    {teachers.map((teacher) => {
                        const { teacher: teacherData, academic } = teacher; // Destructure nested properties
                        console.log("Teacher:", teacher); // Log each teacher object
                        return (
                        <MenuItem key={teacherData.id} value={teacherData.id}> {/* Access id from teacherData */}
                            {`${teacherData.firstName || ''} ${teacherData.middleName || ''} ${teacherData.lastName || ''}`}
                        </MenuItem>
                        );
                    })}
                </Select>
                {teacherError && <Typography variant="caption" color="error">This field is required</Typography>}
              </FormControl>
            </Grid>

            {/* Grade level select field */}
            <Grid item xs={12} sm={6} mt={3}>
              <FormControl variant="outlined" size="small" fullWidth error={gradeError}>
                <InputLabel id="grade-level-label">Grade Level</InputLabel>
                <Select
                  labelId="grade-level-label"
                  id="grade-level-select"
                  value={gradeLevel}
                  onChange={handleChangeGradeLevel}
                  label="Grade Level"
                >
                  {gradeLevels.map((grade) => (
                    <MenuItem key={grade.value} value={grade.value}>
                      {grade.label}
                    </MenuItem>
                  ))}
                </Select>
                {gradeError && <Typography variant="caption" color="error">This field is required</Typography>}
              </FormControl>
            </Grid>
          </Grid>

          {/* New Row of Fields */}
          <Grid container spacing={2}>
            {/* Section select field */}
            <Grid item xs={12} sm={6} mt={3}>
              <FormControl variant="outlined" size="small" fullWidth error={sectionError}>
                <InputLabel id="section-label">Section</InputLabel>
                <Select
                  labelId="section-label"
                  id="section-select"
                  value={section}
                  onChange={handleChangeSection}
                  label="Section"
                  
                >
                  {getSectionsByGradeLevel(gradeLevel).map((section) => (
                    <MenuItem key={section.value} value={section.value}>
                      {section.label}
                    </MenuItem>
                  ))}
                </Select>
                {sectionError && <Typography variant="caption" color="error">This field is required</Typography>}
              </FormControl>
            </Grid>

            {/* Subjects select field */}
            <Grid item xs={12} sm={6} mt={3}>
              <FormControl variant="outlined" size="small" fullWidth error={subjectError}>
                <InputLabel id="subject-label">Subject</InputLabel>
                <Select
                  labelId="subject-label"
                  id="subject-select"
                  value={subject}
                  onChange={handleChangeSubject}
                  label="Subject"
                >
                  {getSubjectsByGradeLevel(gradeLevel).map((subject) => (
                    <MenuItem key={subject.value} value={subject.value}>
                      {subject.label}
                    </MenuItem>
                  ))}
                </Select>
                {subjectError && <Typography variant="caption" color="error">This field is required</Typography>}
              </FormControl>
            </Grid>
          </Grid>

          {/* Time In and Time Out Pickers */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Grid container spacing={2} mt={3}>
              <Grid item xs={12} sm={6}>
              <FormControl variant="outlined" size="small" fullWidth error={timeInError}>
              <TimePicker
                label="Time start"
                value={timeIn}
                onChange={handleTimeInChange}
                
              />
             {timeInError && <Typography variant="caption" color="error">This field is required</Typography>}
              </FormControl>
              </Grid>
             
              <Grid item xs={12} sm={6}>
              <FormControl variant="outlined" size="small" fullWidth error={timeOutError}>
              <TimePicker
                label="Time end"
                value={timeOut}
                onChange={handleTimeOutChange}
                
              />
             {timeOutError && <Typography variant="caption" color="error">This field is required</Typography>}
              </FormControl>
              </Grid>
            </Grid>
          </LocalizationProvider>

          {/* Align the button to the right using Box */}
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
            <Button
              variant="contained"
              style={{ background: "#F2B569" }}
              startIcon={<Avatar src={add} sx={{ width: 20, height: 20 }} />}
              onClick={handleAddButtonClick}
            >
              Add
            </Button>
          </Box>
        </Box>
      </div>
    </Modal>
  );
}
