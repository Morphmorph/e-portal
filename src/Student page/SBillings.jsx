import React, { useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import SBillingsTable from "./SBillingsTable";
import Aos from "aos";
import "aos/dist/aos.css";
import Dropdown from "../component/Dropdown";

export default function SBillings({ onCancelClick }) {
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
  const perGrading = [
    { value: "1", label: "1st Grading" },
    { value: "2", label: "2nd Grading" },
    { value: "3", label: "3rd Grading" },
    { value: "4", label: "4th Grading" },
  ];

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
              color: "red", // Change the color on hover
              transform: "scale(1.1)", // Apply a scale effect on hover
            },
            cursor: "pointer",
          }}
          onClick={onCancelClick}
        />
      </div>
      <div
        data-aos="fade-left"
        className="flex flex-col md:flex-row justify-center lg:justify-start mt-0 md:mt-0 items-center "
        style={{ top: "10px", right: "10px" }}
      >
        <div className="justify-start items-start lg:justify-center sm:items-center mb-2 md:mt-0">
          <h1
            className="text-2xl font-serif font-semibold px-5 pt-4"
            style={{
              color: "#079440",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
            }}
          >
            BILLINGS
          </h1>
        </div>
      </div>
      <div
        data-aos="fade-left"
        className="flex flex-col md:flex-row justify-center lg:justify-end mt-5 items-center "
        style={{ top: "10px", right: "10px" }}
      >
        <Dropdown options={sy} label="SY" />
        <Dropdown options={perGrading} label="Per grading" />
      </div>

      <div
        data-aos="fade-right"
        style={{ borderBottomWidth: 1, borderColor: "#F2B569" }}
      ></div>
      <div data-aos="fade-right">
        <SBillingsTable />
      </div>
    </div>
  );
}
