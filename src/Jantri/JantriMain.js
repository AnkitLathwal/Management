import React, { useState, useRef } from "react";
import "./Jantri.css";

const JantriMain = () => {
  const [inputs, setInputs] = useState(Array(120).fill("")); // 120 blank inputs
  const inputRefs = useRef([]); // Array of references to input elements

  const handleInputChange = (index, value) => {
    const updatedInputs = [...inputs];
    updatedInputs[index] = value; // Store the value as a string
    setInputs(updatedInputs);
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent default "Enter" key behavior
      const nextIndex = index + 1; // Calculate the next input index
      if (nextIndex < inputRefs.current.length) {
        inputRefs.current[nextIndex]?.focus(); // Focus the next input if available
      }
    }
  };

  // Calculate totals for each row
  const calculateRowTotal = (startIndex) => {
    return inputs
      .slice(startIndex, startIndex + 10)
      .reduce((acc, curr) => acc + (parseFloat(curr) || 0), 0);
  };

  // Calculate the final total
  const calculateFinalTotal = () => {
    return inputs.reduce((acc, curr) => acc + (parseFloat(curr) || 0), 0);
  };

  return (
    <div className="container-fluid vh-100 d-flex">
      {/* Left Section */}
      <div className="left-section w-75 border-end d-flex flex-column">
  {/* <h4 className="text-center py-2">Input Table with Totals</h4> */}
  <div className="table-container flex-grow-1">
    <table className="table table-bordered w-100" style={{ tableLayout: "fixed" }}>
      <tbody>
        {[...Array(12)].map((_, rowIndex) => (
          <tr key={rowIndex}>
            {[...Array(10)].map((_, colIndex) => {
              const index = rowIndex * 10 + colIndex;
              return (
                <td key={colIndex} >
                  <label style={{ fontSize: "0.8rem" }}>{index + 1}</label>
                  <input
                    type="text"
                    className="form-control no-spinner small-input"
                    value={inputs[index]}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, index)} // Handle Enter key
                    ref={(el) => (inputRefs.current[index] = el)} // Assign input to ref
                    style={{ height: "30px", fontSize: "0.9rem" }}
                  />
                </td>
              );
            })}
            {/* Total column for each row */}
            <td className="bg-light text-center" style={{ fontSize: "0.9rem", fontWeight: "bold" }}>
              {calculateRowTotal(rowIndex * 10)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  <div className="final-total bg-light text-center py-2">
    <h5>Final Total: {calculateFinalTotal()}</h5>
  </div>
</div>

      {/* Right Section */}
      <div className="right-section w-25">
        <h4 className="text-center py-2">Right Section</h4>
        <div className="right-content p-3">
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
          <div className="form-group">
            <button className="btn btn-primary w-100">Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JantriMain;
