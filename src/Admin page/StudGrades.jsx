import React from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import Dropdown from "../component/Dropdown";
import StudGradesTable from "./StudGradesTable";

export default function StudGrades({ id, onCancelClick }) {
  const gradelevel = [
    { value: "1", label: "Kinder" },
    { value: "2", label: "Grade 1" },
    { value: "3", label: "Grade 2" },
    { value: "4", label: "Grade 3" },
    { value: "5", label: "Grade 4" },
    { value: "6", label: "Grade 5" },
    { value: "7", label: "Grade 6" },
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
        className="flex flex-col sm:flex-row justify-center sm:justify-start mt-0 items-center "
        style={{ top: "10px", right: "10px" }}
      >
        <div className="justify-start items-start sm:justify-center sm:items-center">
          <h1
            className="text-2xl font-serif font-semibold px-5 mt-2"
            style={{ color: "#079440" }}
          >
            REPORT OF GRADES
          </h1>
        </div>
      </div>
      <div
        className="flex flex-col sm:flex-row justify-center sm:justify-end mt-5 items-center "
        style={{ top: "10px", right: "10px" }}
      >
        <Dropdown options={gradelevel} label="Grade level" />
      </div>
      <div style={{ borderBottomWidth: 1, borderColor: "#F2B569" }}></div>
      <div
        className="flex flex-col lg:flex-row justify-center sm:justify-start mt-5 items-center p-2 rounded-md"
        style={{ top: "10px", right: "10px", backgroundColor: "#F2B569" }}
      >
        <h1 className="text-2xl font-semibold" style={{ color: "#079440" }}>
          Class adviser:
        </h1>
        <span className="text-xl font-medium px-3 uppercase">Son Goku</span>
        <span className="ml-0 text-center lg:ml-auto text-blue-600 px-2">
          View details
        </span>
      </div>
      <StudGradesTable />
    </div>
  );
}
