import React, { useState, useRef, useEffect } from "react";
import * as XLSX from "xlsx";
import "./Jantri.css";

const JantriMain = () => {
  const [rows, setRows] = useState(12); // Number of rows
  const [columns, setColumns] = useState(10); // Number of columns
  const [inputs, setInputs] = useState(Array(120).fill("")); // Default 120 inputs
  const inputRefs = useRef([]); // Array of input references

  // Load saved data from localStorage on component mount
  useEffect(() => {
    const savedInputs = JSON.parse(localStorage.getItem("jantriInputs"));
    if (savedInputs) setInputs(savedInputs);
  }, []);

  // Save inputs to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("jantriInputs", JSON.stringify(inputs));
  }, [inputs]);

  // Handle input value change
  const handleInputChange = (index, value) => {
    if (!isNaN(value) || value === "") {
      const updatedInputs = [...inputs];
      updatedInputs[index] = value;
      setInputs(updatedInputs);
    }
  };

  // Keyboard navigation for inputs
  const handleKeyDown = (e, index) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const nextIndex = index + 1;
      if (nextIndex < inputRefs.current.length) {
        inputRefs.current[nextIndex]?.focus();
      }
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      if (index % columns < columns - 1) inputRefs.current[index + 1]?.focus();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      if (index % columns > 0) inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (index + columns < rows * columns) inputRefs.current[index + columns]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (index - columns >= 0) inputRefs.current[index - columns]?.focus();
    }
  };

  // Generate dynamic label
  const getLabel = (index) => {
    if (index >= rows * columns - columns && index < rows * columns) {
      return `A${(index % columns) + 1}`;
    } else if (index >= rows * columns - 2 * columns && index < rows * columns - columns) {
      return `B${(index % columns) + 1}`;
    }
    return index + 1;
  };

  // Calculate row total
  const calculateRowTotal = (startIndex) => {
    return inputs
      .slice(startIndex, startIndex + columns)
      .reduce((acc, curr) => acc + (parseFloat(curr) || 0), 0);
  };

  // Calculate final total
  const calculateFinalTotal = () => {
    return inputs.reduce((acc, curr) => acc + (parseFloat(curr) || 0), 0);
  };

  // Export to Excel
  const exportToExcel = () => {
    const data = inputs.map((value, index) => ({
      Label: getLabel(index),
      Value: value || "0",
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Jantri Data");
    XLSX.writeFile(workbook, "JantriData.xlsx");
  };

  return (
    <div className="container-fluid vh-100 d-flex">
      {/* Left Section */}
      <div className="left-section w-75 border-end d-flex flex-column">
        <div className="table-container flex-grow-1 overflow-hidden">
          <table className="table w-100 h-100" style={{ tableLayout: "fixed" }}>
            <tbody>
              {[...Array(rows)].map((_, rowIndex) => (
                <tr key={rowIndex}>
                  {[...Array(columns)].map((_, colIndex) => {
                    const index = rowIndex * columns + colIndex;
                    return (
                      <td key={colIndex} className="p-0 text-center">
                        <div style={{ padding: "2px 0" }}>
                          <label
                            style={{
                              fontSize: "15px",
                              fontWeight: "500",
                              display: "block",
                              marginBottom: "4px",
                              color: "red",
                            }}
                          >
                            {getLabel(index)}
                          </label>
                          <input
                            type="text"
                            className="no-spinner small-input"
                            value={inputs[index]}
                            onChange={(e) => handleInputChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            ref={(el) => (inputRefs.current[index] = el)}
                            style={{
                              height: "25px",
                              fontSize: "1rem",
                              padding: 0,
                              margin: 0,
                              backgroundColor: "white",
                              color: "black",
                              fontWeight: "700",
                            }}
                          />
                        </div>
                      </td>
                    );
                  })}
                  <td
                    className="bg-light text-center"
                    style={{ fontSize: "1rem", fontWeight: "bold", color: "blue" }}
                  >
                    {calculateRowTotal(rowIndex * columns)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="final-total bg-light text-center py-2 text-info">
          <h5>Final Total: {calculateFinalTotal()}</h5>
        </div>
      </div>

      {/* Right Section */}
      <div className="right-section w-25">
        <h4 className="text-center py-2">Right Section</h4>
        <div className="right-content p-3 overflow-hidden">
          <div className="form-group mb-3">
            <label>Dropdown</label>
            <select className="form-control">
              <option value="Option 1">Option 1</option>
              <option value="Option 2">Option 2</option>
              <option value="Option 3">Option 3</option>
            </select>
          </div>
          <div className="form-group mb-3">
            <label>Text Input</label>
            <input type="text" className="form-control" placeholder="Enter text" />
          </div>
          <div className="form-group mb-3">
            <label>Number Input</label>
            <input type="text" className="form-control" placeholder="Enter number" />
          </div>
          <div className="form-group mb-3">
            <button className="btn btn-primary w-100" onClick={exportToExcel}>
              Export to Excel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JantriMain;
