import React from "react";

const RightPanel = () => {
  return (
    <div className="right-panel">
      <div className="dropdowns">
        <select>
          <option>3 FARIDABAD (05:01 AM)</option>
        </select>
        <select>
          <option>10P VERMA CU</option>
        </select>
        <select>
          <option>UTAAR</option>
        </select>
        <input type="date" />
      </div>
      <div className="table-section">
        <table>
          <thead>
            <tr>
              <th>Sno</th>
              <th>Date</th>
              <th>Client</th>
              <th>Game</th>
              <th>Total</th>
              <th>Type</th>
              <th>Join</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>3</td>
              <td>14-01-25</td>
              <td>DINESH</td>
              <td>3 FARIDABAD</td>
              <td>13445</td>
              <td>U</td>
              <td>A</td>
            </tr>
            {/* Add more rows as needed */}
          </tbody>
        </table>
      </div>
      <div className="actions">
        <button>New</button>
        <button>Save</button>
        <button>Update</button>
        <button>Delete</button>
      </div>
    </div>
  );
};

export default RightPanel;

