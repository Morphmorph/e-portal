import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import uccplogo from "../assets/uccplogo.webp";
import schlogo from "../assets/schlogo.webp";
import users from "../assets/users.webp";
import star from "../assets/star.webp";
import attendance from "../assets/attendance.webp";
import billings from "../assets/billings.webp";
import ledger from "../assets/ledger.webp";
import SGrades from "./SGrades";
import SAttendance from "./SAttendance";
import SBillings from "./SBillings";
import SLedger from "./SLedger";

const settings = ["Profile", "Account", "Logout"];

export default function SDashboard() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [showGrades, setShowGrades] = useState(false);
  const [showAttendance, setShowAttendance] = useState(false);
  const [showBillings, setShowBillings] = useState(false);
  const [showLedger, setShowLedger] = useState(false);

  const handleClick = (section) => {
    setShowGrades(false);
    setShowAttendance(false);
    setShowBillings(false);
    setShowLedger(false);

    switch (section) {
      case "grades":
        setShowGrades(true);
        break;
      case "attendance":
        setShowAttendance(true);
        break;
      case "billings":
        setShowBillings(true);
        break;
      case "ledger":
        setShowLedger(true);
        break;
      default:
        break;
    }
  };

  const handleCancelClick = () => {
    setShowGrades(false);
    setShowAttendance(false);
    setShowBillings(false);
    setShowLedger(false);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <div>
      <AppBar position="static" sx={{ bgcolor: "#079440" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <img
              src={uccplogo}
              alt=""
              className="h-12 w-12 lg:h-20 lg:w-20 transition-all duration-300"
            />
            <img
              src={schlogo}
              alt=""
              className="h-16 w-16 lg:h-24 lg:w-24 transition-all duration-300"
            />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                ml: 2,
                display: { md: "flex", xs: "none" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
                fontSize: { md: "20px" },
              }}
            >
              CAGAYAN DE ORO CHRISTIAN SCHOOL - UCCP
            </Typography>

            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                ml: 1,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
                fontSize: { xs: "18px" },
                alignItems: { xs: "center" },
              }}
            >
              COCS-UCCP
            </Typography>

            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Container
        maxWidth="xl"
        sx={{ paddingTop: "20px", marginBottom: "20px", cursor: "pointer" }}
      >
        {(showGrades && <SGrades onCancelClick={handleCancelClick} />) ||
          (showAttendance && (
            <SAttendance onCancelClick={handleCancelClick} />
          )) ||
          (showBillings && <SBillings onCancelClick={handleCancelClick} />) ||
          (showLedger && <SLedger onCancelClick={handleCancelClick} />) || (
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <div
                  className="bg-violet-300 text-white p-8 text-end rounded-xl item-div"
                  onClick={() => handleClick("grades")}
                  style={{
                    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
                    boxShadow: "8px 8px 8px rgba(0, 0, 0, 0.3)",
                  }}
                >
                  <h1 className="text-2xl font-bold font-serif">Grades</h1>
                  <img
                    src={star}
                    alt=""
                    className="h-12 w-12 lg:h-20 lg:w-20 item-image"
                  />
                </div>
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <div
                  className="bg-orange-300 text-white p-8 text-end rounded-xl item-div"
                  onClick={() => handleClick("attendance")}
                  style={{
                    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
                    boxShadow: "8px 8px 8px rgba(0, 0, 0, 0.3)",
                  }}
                >
                  <h1 className="text-2xl font-bold font-serif">Attendance</h1>
                  <img
                    src={attendance}
                    alt=""
                    className="h-12 w-12 lg:h-20 lg:w-20 item-image"
                  />
                </div>
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <div
                  className="bg-red-300 text-white p-8 text-end rounded-xl item-div"
                  onClick={() => handleClick("billings")}
                  style={{
                    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
                    boxShadow: "8px 8px 8px rgba(0, 0, 0, 0.3)",
                  }}
                >
                  <h1 className="text-2xl font-bold font-serif">Billings</h1>
                  <img
                    src={billings}
                    alt=""
                    className="h-12 w-12 lg:h-20 lg:w-20 item-image"
                  />
                </div>
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <div
                  className="bg-pink-400 text-white p-8 text-end rounded-xl item-div"
                  onClick={() => handleClick("ledger")}
                  style={{
                    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
                    boxShadow: "8px 8px 8px rgba(0, 0, 0, 0.3)",
                  }}
                >
                  <h1 className="text-2xl font-bold font-serif">Ledger</h1>
                  <img
                    src={ledger}
                    alt=""
                    className="h-12 w-12 lg:h-20 lg:w-20 item-image"
                  />
                </div>
              </Grid>
            </Grid>
          )}
      </Container>
    </div>
  );
}