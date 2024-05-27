import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import star from "../assets/star.webp";
import attendance from "../assets/attendance.webp";
import billings from "../assets/billings.webp";
import ledger from "../assets/ledger.webp";
import SGrades from "./SGrades";
import SAttendance from "./SAttendance";
import SBillings from "./SBillings";
import SLedger from "./SLedger";
import { useUser } from '../UserContext';

export default function SDashboard() {
  const [showGrades, setShowGrades] = useState(false);
  const [showAttendance, setShowAttendance] = useState(false);
  const [showBillings, setShowBillings] = useState(false);
  const [showLedger, setShowLedger] = useState(false);
  const { loggedInUser } = useUser();
  
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

  return (
    <div>

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