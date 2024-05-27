import React, { useState, useEffect } from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import CircularProgress from "@mui/material/CircularProgress";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import useTheme from "@mui/material/styles/useTheme";
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

export default function AddSubjectHandleModal({ open, handleClose, handleSuccessModalOpen, }) {
  const [loading, setLoading] = React.useState(false);
  const style = useResponsiveStyle();
  const [teachers, setTeachers] = React.useState([]);
  const [gradeLevel, setGradeLevel] = React.useState("");
  const [section, setSection] = React.useState("");
  const [gradeError, setGradeError] = React.useState(false);
  const [sectionError, setSectionError] = React.useState(false);
  const [selectedTeacher, setSelectedTeacher] = React.useState("");
  const [teacherError, setTeacherError] = React.useState(false);
 
  const handleChangeTeacher = (event) => {
    const selectedTeacherId = event.target.value;
    setSelectedTeacher(selectedTeacherId); // Update selectedTeacher state with the teacher ID
    setTeacherError(false); // Clear teacher error when a selection is made
  };
  
  // Load data from JSON file
  const { gradeLevels, sections} = data;
  useEffect(() => {
    fetchData(); // Fetch data initially
     // Clean up setInterval on component unmount
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8081/api/users/');
      const { teachers } = response.data; // Assuming teachers is already an array
      console.log("Fetched users data:",  teachers); // Debugging statement
  
      // Process the data as needed
      setTeachers(teachers); // Set teachers to the array directly
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  
  // Function to get sections based on selected grade level
  const getSectionsByGradeLevel = (gradeLevel) => {
    return sections[gradeLevel] || [];
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
  const getGradeLabel = (value) => {
    const grade = data.gradeLevels.find((grade) => grade.value === value);
    return grade ? grade.label : '';
  };

  const getSectionLabel = (grade, value) => {
    const section = data.sections[grade].find((section) => section.value === value);
    return section ? section.label : '';
  };
  const handleAddButtonClick = async () => {
    try {  
      // Check if any required field is empty
      if (!gradeLevel || !section || !selectedTeacher) {
        setGradeError(!gradeLevel);
        setSectionError(!section);
        setTeacherError(!selectedTeacher);
        return;
      }
  
      // Convert grade level and section to labels
      const gradeLevelLabel = getGradeLabel(gradeLevel);
      const sectionLabel = section ? getSectionLabel(gradeLevel, section) : null;
  
      const sectionHandleData = {
        teacher_id: selectedTeacher, // Ensure that selectedTeacher contains the teacher's ID
        grade_level: gradeLevelLabel, // Use the label instead of the value
        section: sectionLabel, // Use the label instead of the value
      };
  
      const response = await axios.post('http://127.0.0.1:8081/api/add_section_handles/', sectionHandleData);
      
      setLoading(true)
      if (response.status === 200) {
        // Handle successful response
        setLoading(false);
         // Close the modal
        handleSuccessModalOpen(); // Call handleSuccessModalOpen here
        console.log("Section handle added successfully");
        console.log("Added section handle data:", sectionHandleData); // Log added section handle data
        // Reset all fields to their initial state
        setGradeLevel("");
        setSection("");
        setSelectedTeacher("");
        setGradeError(false);
        setSectionError(false);
        setTeacherError(false);
       
      } else {

      }
      
    } catch (error) {
      console.error("Error adding section handle:", error);
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
            Teacher Handled Section
          </Typography>

          <Grid container spacing={2}>
            {/* Adviser select field */}
            <Grid item xs={12} sm={6} mt={3}>
              <FormControl variant="outlined" size="small" fullWidth error={teacherError}>
                <InputLabel id="grade-level-label">Adviser</InputLabel>
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

          </Grid>

          {/* Align the button to the right using Box */}
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
          <Button
              variant="contained"
              style={{ background: "#F2B569", color: 'white' }}
              startIcon={
                loading ? (
                  <CircularProgress size={24} />
                ) : (
                  <Avatar src={add} sx={{ width: 20, height: 20 }} />
                )
              }
              onClick={handleAddButtonClick}
              disabled={loading}
            >
              {loading ? "Adding..." : "Add"}
            </Button>
          </Box>
        </Box>
      </div>
    </Modal>
  );
}
