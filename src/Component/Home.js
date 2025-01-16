import React, { useState } from "react";
import * as XLSX from "xlsx";

const ExportExcel = () => {
  // Example input data
  const [data, setData] = useState([
    { Name: "John Doe", Age: 28, City: "New York" },
    { Name: "Jane Smith", Age: 34, City: "Los Angeles" },
    { Name: "Sam Johnson", Age: 23, City: "Chicago" },
  ]);

  // Function to export the data to Excel
  const exportToExcel = () => {
    // 1. Convert JSON data to a worksheet
    const worksheet = XLSX.utils.json_to_sheet(data);

    // 2. Create a new workbook and append the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // 3. Generate and trigger download
    XLSX.writeFile(workbook, "MyExcelFile.xlsx");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h3>Export Data to Excel</h3>
      <table border="1" style={{ marginBottom: "20px" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>City</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row.Name}</td>,
              <td>{row.Age}</td>
              <td>{row.City}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={exportToExcel}>Download Excel</button>
    </div>
  );
};

export default ExportExcel;
