import React, { useState, useRef, useEffect } from "react";
import * as XLSX from "xlsx";
import "./Jantri.css";

const JantriMain = () => {
  const [rows, setRows] = useState(12);
  const [columns, setColumns] = useState(10);
  const [inputs, setInputs] = useState(Array(120).fill(""));
  const inputRefs = useRef([]);

  useEffect(() => {
    const savedInputs = JSON.parse(localStorage.getItem("jantriInputs"));
    if (savedInputs) setInputs(savedInputs);
  }, []);

  useEffect(() => {
    localStorage.setItem("jantriInputs", JSON.stringify(inputs));
  }, [inputs]);

  const handleInputChange = (index, value) => {
    if (!isNaN(value) || value === "") {
      const updatedInputs = [...inputs];
      updatedInputs[index] = value;
      setInputs(updatedInputs);
    }
  };

  const getLabel = (index) => {
    if (index >= rows * columns - columns && index < rows * columns) {
      return `A${(index % columns) + 1}`;
    } else if (index >= rows * columns - 2 * columns && index < rows * columns - columns) {
      return `B${(index % columns) + 1}`;
    }
    return index + 1;
  };

  const calculateRowTotal = (startIndex) => {
    return inputs
      .slice(startIndex, startIndex + columns)
      .reduce((acc, curr) => acc + (parseFloat(curr) || 0), 0);
  };

  const calculateFinalTotal = () => {
    return inputs.reduce((acc, curr) => acc + (parseFloat(curr) || 0), 0);
  };

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

  const handleExcelUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const binaryStr = event.target.result;
        const workbook = XLSX.read(binaryStr, { type: "binary" });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        const updatedInputs = [...inputs];

        data.forEach(([label, value]) => {
          const index = inputs.findIndex((_, idx) => getLabel(idx) === label);
          if (index !== -1) {
            updatedInputs[index] = value !== undefined && value !== null && value !== "" ? value : "";
          }
        });

        setInputs(updatedInputs);
      };
      reader.readAsBinaryString(file);
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex">
      {/* Left Section */}
      <div className="left-section w-75 border-end d-flex flex-column" style={{ backgroundColor: "#f8f9fa", boxShadow: "4px 0px 6px rgba(0, 0, 0, 0.1)" }}>
        <div className="table-container flex-grow-1 overflow-hidden">
          <table className="table w-100 h-100" style={{ tableLayout: "fixed", backgroundColor: "#ffffff", fontSize: "12px" }}>
            <tbody>
              {[...Array(rows)].map((_, rowIndex) => (
                <tr key={rowIndex} style={{ backgroundColor: "#f1f1f1" }}>
                  {[...Array(columns)].map((_, colIndex) => {
                    const index = rowIndex * columns + colIndex;
                    return (
                      <td key={colIndex} className="p-0 text-center" style={{ backgroundColor: "#ffffff" }}>
                        <div style={{ padding: "2px 0" }}>
                          <label style={{ fontSize: "12px", fontWeight: "500", display: "block", marginBottom: "4px", color: "red" }}>
                            {getLabel(index)}
                          </label>
                          <input
                            type="text"
                            className="no-spinner small-input"
                            value={inputs[index]}
                            onChange={(e) => handleInputChange(index, e.target.value)}
                            ref={(el) => (inputRefs.current[index] = el)}
                            style={{
                              height: "20px",
                              fontSize: "12px",
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
                  <td className="bg-light text-center" style={{ fontSize: "12px", fontWeight: "bold", color: "blue" }}>
                    {calculateRowTotal(rowIndex * columns)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* File Upload & Download Section */}
        <div className="final-total bg-light d-flex justify-content-between align-items-center py-2 text-info">
          <div className="d-flex align-items-center">
            <button className="btn btn-primary me-2" onClick={exportToExcel}>
              <i className="fa fa-download"></i> Download
            </button>
            <input type="file" accept=".xlsx, .xls" className="form-control" onChange={handleExcelUpload} style={{ width: "200px" }} />
          </div>
          <h5 className="m-0 text-center flex-grow-1">Final Total: {calculateFinalTotal()}</h5>
        </div>
      </div>

      {/* Right Section */}
      <div className="right-section w-25" style={{ backgroundColor: "#f8f9fa", boxShadow: "-4px 0px 6px rgba(0, 0, 0, 0.1)" }}>
        <div className="right-content p-3 overflow-hidden">
          <div className="form-group mb-3">
            <label>Lottery Name</label>
            <select className="form-control">
              <option>Option 1</option>
              <option>Option 2</option>
              <option>Option 3</option>
            </select>
          </div>
          <div className="form-group mb-3">
            <label>Customer Name</label>
            <select className="form-control">
              <option>Option 1</option>
              <option>Option 2</option>
              <option>Option 3</option>
            </select>
          </div>
          <div className="form-group mb-3">
            <label>Game Type</label>
            <select className="form-control">
              <option>UTAAR</option>
              <option>PATTI</option>
            </select>
          </div>

          {/* Table Section */}
          <div className="table-container mt-3">
            <table className="table table-bordered" style={{ fontSize: "12px" }}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Column 1</th>
                  <th>Column 2</th>
                  <th>Column 3</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>1</td><td>Data 1</td><td>Data 2</td><td>Data 3</td></tr>
                <tr><td>2</td><td>Data 4</td><td>Data 5</td><td>Data 6</td></tr>
              </tbody>
            </table>
          </div>

          {/* Buttons */}
          <div className="d-flex justify-content-between mt-3">
            <button className="btn btn-primary">New</button>
            <button className="btn btn-warning">Update</button>
            <button className="btn btn-success">Save</button>
            <button className="btn btn-danger">Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JantriMain;
