import React, { useState, useRef, useEffect } from "react";
import * as XLSX from "xlsx";

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
    if (index < 100) {
      return index + 1; // 1 to 100 labels
    } else if (index >= 100 && index < 200) {
      const newIndex = index - 100; // Convert the range to 1-100
      const letter = String.fromCharCode(65 + Math.floor(newIndex / 10)); // 'B' or 'A'
      const number = newIndex % 10;
      return `${letter}${number + 1}`; // B1 to B0 or A1 to A0
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

  return (
    <div className="container-fluid d-flex flex-column align-items-center p-2" style={{ minHeight: "100vh", overflowY: "auto" }}>
      {/* Top Section (Option Selection) */}
      <div className="mt-2 p-2 bg-white rounded shadow-sm w-100">
        <div className="mb-2">
          <label className="form-label">Lottery Name</label>
          <select className="form-control form-control-sm">
            <option>Option 1</option>
            <option>Option 2</option>
          </select>
        </div>
        <div className="mb-2">
          <label className="form-label">Customer Name</label>
          <select className="form-control form-control-sm">
            <option>Customer 1</option>
            <option>Customer 2</option>
          </select>
        </div>
        <div className="mb-2">
          <label className="form-label">Game Type</label>
          <select className="form-control form-control-sm">
            <option>UTAAR</option>
            <option>PATTI</option>
          </select>
        </div>
        <div className="mb-2">
          <label className="form-label">Date</label>
          <input type="date" className="form-control form-control-sm" />
        </div>
        <div className="d-flex justify-content-between mt-2">
          <button className="btn btn-sm btn-primary">New</button>
          <button className="btn btn-sm btn-warning">Update</button>
          <button className="btn btn-sm btn-success">Save</button>
          <button className="btn btn-sm btn-danger">Delete</button>
        </div>
      </div>

      {/* Customer Details Section (Middle Table) */}
      <div className="w-100 mt-3">
        <h4 className="text-center">Customer Details</h4>
        <div className="table-responsive">
          <table className="table table-bordered text-center w-100">
            <thead>
              <tr>
                <th>Lottery Name</th>
                <th>Customer Name</th>
                <th>Game Type</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Option 1</td>
                <td>Customer 1</td>
                <td>UTAAR</td>
                <td>2025-02-04</td>
              </tr>
              <tr>
                <td>Option 2</td>
                <td>Customer 2</td>
                <td>PATTI</td>
                <td>2025-02-04</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Table Section */}
      <div className="w-100 mt-3" style={{ flex: 1, overflowY: "auto" }}>
        <div className="table-responsive" style={{ height: "calc(100vh - 300px)", overflowY: "scroll" }}>
          <table className="table table-bordered text-center w-100" style={{ tableLayout: "fixed" }}>
            <tbody>
              {[...Array(rows)].map((_, rowIndex) => (
                <tr key={rowIndex}>
                  {[...Array(columns)].map((_, colIndex) => {
                    const index = rowIndex * columns + colIndex;
                    return (
                      <td key={colIndex} className="p-1" style={{ width: `${100 / columns}%` }}>
                        <label style={{ fontSize: "12px", fontWeight: "500", display: "block" }}>
                          {getLabel(index)}
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-sm text-center"
                          value={inputs[index]}
                          onChange={(e) => handleInputChange(index, e.target.value)}
                          ref={(el) => (inputRefs.current[index] = el)}
                          style={{ fontSize: "14px", fontWeight: "700", color: "red" }}
                        />
                      </td>
                    );
                  })}
                  <td className="fw-bold text-primary">{calculateRowTotal(rowIndex * columns)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Final Total Section */}
      <div className="bg-light p-2 rounded w-100 mt-3">
        <h5 className="text-center text-info">Final Total: {calculateFinalTotal()}</h5>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <button className="btn btn-sm btn-primary" onClick={exportToExcel}>Download</button>
          <input type="file" accept=".xlsx, .xls" className="form-control form-control-sm" style={{ width: "150px" }} />
        </div>
      </div>
    </div>
  );
};

export default JantriMain;
