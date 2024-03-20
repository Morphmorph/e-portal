import * as React from "react";
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
    overflowY: "scroll", // Enable vertical scrolling
    maxHeight: "90vh", // Set a maximum height to prevent modal from exceeding viewport height
    [theme.breakpoints.up("sm")]: {
      width: 550,
    },
  };
};

export default function AddSubjectHandleModal({ open, handleClose }) {
  const style = useResponsiveStyle();
  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      handleClose();
    }
  };

  const [gradeLevel, setGradeLevel] = React.useState("");
  const [section, setSection] = React.useState("");
  const [subject, setSUbject] = React.useState("");
  const [timeIn, setTimeIn] = React.useState(null);
  const [timeOut, setTimeOut] = React.useState(null);

  const handleChangeGradeLevel = (event) => {
    setGradeLevel(event.target.value);
  };

  const handleChangeSection = (event) => {
    setSection(event.target.value);
  };

  const handleChangeSubject = (event) => {
    setSUbject(event.target.value);
  };

  const handleTimeInChange = (newTime) => {
    setTimeIn(newTime);
  };

  const handleTimeOutChange = (newTime) => {
    setTimeOut(newTime);
  };

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      closeAfterTransition
    >
      <div onClick={handleBackdropClick}>
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
            Add Handled Subjects
          </Typography>

          <Grid container spacing={2}>
            {/* ID textfield */}
            <Grid item xs={12} sm={6} mt={3}>
              <TextField
                disabled
                id="id-disabled"
                label="ID"
                defaultValue="123456789"
                size="small"
                fullWidth
              />
            </Grid>

            {/* Grade level select field */}
            <Grid item xs={12} sm={6} mt={3}>
              <FormControl variant="outlined" size="small" fullWidth>
                <InputLabel id="grade-level-label">Grade Level</InputLabel>
                <Select
                  labelId="grade-level-label"
                  id="grade-level-select"
                  value={gradeLevel}
                  onChange={handleChangeGradeLevel}
                  label="Grade Level"
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        maxHeight: 200,
                        overflow: "auto",
                      },
                    },
                  }}
                >
                  <MenuItem value={"Kinder 1"}>Kinder 1</MenuItem>
                  <MenuItem value={"Kinder 2"}>Kinder 2</MenuItem>
                  <MenuItem value={"Grade 1"}>Grade 1</MenuItem>
                  <MenuItem value={"Grade 2"}>Grade 2</MenuItem>
                  <MenuItem value={"Grade 3"}>Grade 3</MenuItem>
                  <MenuItem value={"Grade 4"}>Grade 4</MenuItem>
                  <MenuItem value={"Grade 5"}>Grade 5</MenuItem>
                  <MenuItem value={"Grade 6"}>Grade 6</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          {/* New Row of Fields */}
          <Grid container spacing={2}>
            {/* Section select field */}
            <Grid item xs={12} sm={6} mt={3}>
              <FormControl variant="outlined" size="small" fullWidth>
                <InputLabel id="section-label">Section</InputLabel>
                <Select
                  labelId="section-label"
                  id="section-select"
                  value={section}
                  onChange={handleChangeSection}
                  label="Section"
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        maxHeight: 200,
                        overflow: "auto",
                      },
                    },
                  }}
                >
                  <MenuItem value={"Love"}>Love</MenuItem>
                  <MenuItem value={"Peace"}>Peace</MenuItem>
                  <MenuItem value={"Faith"}>Faith</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Subjects select field */}
            <Grid item xs={12} sm={6} mt={3}>
              <FormControl variant="outlined" size="small" fullWidth>
                <InputLabel id="subject-label">Subject</InputLabel>
                <Select
                  labelId="subject-label"
                  id="subject-select"
                  value={subject}
                  onChange={handleChangeSubject}
                  label="Subject"
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        maxHeight: 200,
                        overflow: "auto",
                      },
                    },
                  }}
                >
                  <MenuItem value={"Evelyn Stone"}>Mathematics</MenuItem>
                  <MenuItem value={"Alexander Cross"}>English</MenuItem>
                  <MenuItem value={"Gabrielle Chen"}>Science</MenuItem>
                  <MenuItem value={"Vincent Larson"}>Filipino</MenuItem>
                  <MenuItem value={"Daniel Roberts"}>MAPEH</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

         {/* Time In and Time Out Pickers */}
         <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Grid container spacing={2} mt={3}>
              <Grid item xs={12} sm={6}>
                <TimePicker
                  label="Time In"
                  value={timeIn}
                  onChange={handleTimeInChange}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TimePicker
                  label="Time Out"
                  value={timeOut}
                  onChange={handleTimeOutChange}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </Grid>
            </Grid>
          </LocalizationProvider>

          {/* Align the button to the right using Box */}
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
            <Button
              variant="contained"
              style={{ background: "#F2B569" }}
              startIcon={<Avatar src={add} sx={{ width: 20, height: 20 }} />}
            >
              Add
            </Button>
          </Box>
        </Box>
      </div>
    </Modal>
  );
}