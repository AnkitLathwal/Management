import React, { useState } from "react";
import * as XLSX from "xlsx";

const ImportExcel = () => {
  const [excelData, setExcelData] = useState([]);
  const [fileName, setFileName] = useState("");

  // Function to handle file upload and read the Excel file
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setFileName(file.name); // Set file name for display

    const reader = new FileReader();
    reader.onload = (e) => {
      // Read the file content
      const data = e.target.result;
      
      // Parse the Excel file into a worksheet
      const workbook = XLSX.read(data, { type: "binary" });

      // Get the first sheet's data as JSON
      const sheetName = workbook.SheetNames[0]; // You can select a specific sheet if needed
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet);

      // Update the state with the parsed data
      setExcelData(jsonData);
    };

    // Read the file as binary string
    reader.readAsBinaryString(file);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h3>Import Excel Sheet</h3>

      <input
        type="file"
        accept=".xlsx,.xls"
        onChange={handleFileUpload}
        style={{ marginBottom: "20px" }}
      />
      <div>
        {fileName && <p>File Selected: {fileName}</p>}
      </div>

      {/* Display the imported data in a table */}
      <table border="1" style={{ width: "100%", marginTop: "20px" }}>
        <thead>
          <tr>
            {/* Display table headers dynamically based on the first row */}
            {excelData[0] && Object.keys(excelData[0]).map((key, index) => (
              <th key={index}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Display each row of the data */}
          {excelData.map((row, index) => (
            <tr key={index}>
              {Object.values(row).map((value, idx) => (
                <td key={idx}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ImportExcel;
