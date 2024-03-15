import React from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import TextField from "@mui/material/TextField";
import Dropdown from "../component/Dropdown";
import DatePickerViews from "../component/Datepicker";
import SAttendanceTable from "./SAttendanceTable";
import Aos from "aos";
import "aos/dist/aos.css";

export default function SAttendance({ onCancelClick }) {
  Aos.init({
    // Global settings:
    disable: false,
    startEvent: "DOMContentLoaded",
    initClassName: "aos-init",
    animatedClassName: "aos-animate",
    useClassNames: false,
    disableMutationObserver: false,
    debounceDelay: 50,
    throttleDelay: 99,

    offset: 0,
    delay: 100,
    duration: 500,
    easing: "ease",
    once: false,
    mirror: false,
    anchorPlacement: "top-bottom",
  });
  const sy = [
    { value: "1", label: "2023-2024" },
    { value: "2", label: "2024-2025" },
  ];
  const gradelevel = [
    { value: "1", label: "Kinder" },
    { value: "2", label: "Grade 1" },
    { value: "3", label: "Grade 2" },
    { value: "4", label: "Grade 3" },
    { value: "5", label: "Grade 4" },
    { value: "6", label: "Grade 5" },
    { value: "7", label: "Grade 6" },
  ];
  const sections = [
    { value: "1", label: "Love" },
    { value: "2", label: "Peace" },
    { value: "3", label: "Faith" },
  ];
  const Style = {
    backdropFilter: "blur(16px) saturate(180%)",
    WebkitBackdropFilter: "blur(16px) saturate(180%)",
    backgroundColor: "rgba(17, 25, 40, 0.75)",
    borderRadius: "10px",
    border: "1px solid rgba(255, 255, 255, 0.125)",
    boxShadow: "5px -4px 1px rgb(173, 173, 172)",
  };
  return (
    <div>
      <div
        className="flex justify-start items-center"
        style={{ top: "10px", right: "10px" }}
      >
        <CancelIcon
          sx={{
            color: "#F2B569",
            fontSize: 40,
            transition: "color 0.3s, transform 0.3s",
            "&:hover": {
              color: "red",
              transform: "scale(1.1)",
            },
            cursor: "pointer",
          }}
          onClick={onCancelClick}
        />
      </div>
      <div
        data-aos="fade-left"
        className="flex flex-col sm:flex-row justify-center sm:justify-start mt-0 items-center"
      >
        <div className="justify-start items-start sm:justify-center sm:items-center mb-2 md:mt-0">
          <h1
            className="text-2xl font-serif font-semibold px-5"
            style={{
              color: "#079440",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
            }}
          >
            ATTENDANCE
          </h1>
        </div>
        <TextField
          id="outlined-basic"
          variant="outlined"
          label="Search"
          sx={{
            width: "100%",
            maxWidth: { md: "500px" },
            mx: 2,
            marginBottom: "10px",
          }}
        />
        <div className="mb-2 mx-2 mt-2 sm:mt-0" style={{ width: "100%" }}>
          <DatePickerViews />
        </div>
      </div>
      <div
        data-aos="fade-left"
        className="flex flex-col sm:flex-row justify-center sm:justify-end mt-5 items-center"
      >
        <Dropdown options={sy} label="School Year" />
        <Dropdown options={gradelevel} label="Grade level" />
        <Dropdown options={sections} label="Section" />
      </div>
      <div
        data-aos="fade-right"
        style={{ borderBottomWidth: 1, borderColor: "#F2B569" }}
      ></div>
      <div
        data-aos="fade-right"
        className="flex flex-col sm:flex-row justify-center sm:justify-start mt-5 items-center px-5 py-5"
        style={Style}
      >
        <h1 className="text-2xl font-semibold" style={{ color: "#F2B569" }}>
          Class adviser:
        </h1>
        <span className="text-xl font-medium px-3 uppercase text-white">
          Son Goku
        </span>
        <span className="ml-0 text-center sm:ml-auto text-green-600 px-2 item-div">
          View details
        </span>
      </div>
      <div data-aos="fade-right">
        <SAttendanceTable />
      </div>
    </div>
  );
}
