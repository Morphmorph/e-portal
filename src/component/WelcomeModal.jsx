import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import useTheme from "@mui/material/styles/useTheme";
import adminLogo from "../assets/samplelogo1.png";    // Recently added
import teacherLogo from "../assets/samplelogo2.png";  // Recently added
import studentLogo from "../assets/samplelogo3.png";  // Recently added
import schoolLogo from "../assets/schlogo.webp";      // Recently added

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

// Note: Added "type" prop
export default function WelcomeModal({ open, handleClose, title, content, type }) {
  const style = useResponsiveStyle();

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      handleClose();
    }
  };

  // Recently Added
  // Declaring which logo to display based on the 'type' prop (page)
  let logoSrc;
  switch (type) {
    case "admin":
      logoSrc = adminLogo;
      break;
    case "teacher":
      logoSrc = teacherLogo;
      break;
    case "student":
      logoSrc = studentLogo;
      break;
    default:
      logoSrc = schoolLogo; // Default logo if the type is unknown
  }

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
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "3vh",
            }}
          >
            {/* Recently added */}
            <img src={logoSrc} alt="Logo" style={{ width: "100px", height: "auto" }} />
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              style={{ color: "#079440", fontWeight: "bold", marginTop: "1vh" }}
            >
              {title}
            </Typography>

            <Typography
              id="modal-modal-content"
              variant="subtitle2"
              style={{ marginTop: "3vh" }}
            >
              {content}
            </Typography>

            <Button
              variant="contained"
              onClick={handleClose}
              style={{
                marginTop: "3vh",
                textTransform: "none",
                background: "#F2B569",
              }}
            >
              Go to Dashboard
            </Button>
          </Box>
        </Box>
      </div>
    </Modal>
  );
}
