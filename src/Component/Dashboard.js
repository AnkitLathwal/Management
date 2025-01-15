import React, { useState, useEffect } from "react";

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const textStyle={
    marginLeft: '38px'};
  return (
    <div className="container-fluid bg-light vh-100">
      {/* Header Section */}
      <div className="row bg-primary text-white p-3 align-items-center">
        <div className="col-6">
          <h4>$$ Game Management $$</h4>
        </div>
        <div className="col-6 text-end">
          <h5>
            {currentTime.toLocaleDateString()} Time:{" "}
            {currentTime.toLocaleTimeString()}
          </h5>
          <p>Welcome: A1</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="row mt-4">
        {/* Master Section */}
        <div className="col-md-4">
          <h5>Master</h5>
          <ul className="list-unstyled">
            <li>
              <a href="#" className="text-decoration-none">
                <img
                  src="https://static-00.iconduck.com/assets.00/user-icon-1024x1024-dtzturco.png"
                  alt="icon"
                  width="30"
                  className="me-2"
                />
                Add Customer [F6]
              </a>
              <p style={textStyle}>Add/Update/Delete Customer</p>
            </li>
            <li>
              <a href="#" className="text-decoration-none">
                <img
                  src="https://cdn1.iconfinder.com/data/icons/user-package/512/governor-512.png"
                  alt="icon"
                  width="30"
                  className="me-2"
                />
                Add Khaiwal [F7]
              </a>
              <p style={textStyle}>Add/Update/Delete Khaiwal</p>

            </li>
            <li>
              <a href="#" className="text-decoration-none">
                <img
                  src="path-to-icon"
                  alt="icon"
                  width="20"
                  className="me-2"
                />
                Add Game [F3]
              </a>
              <p style={textStyle}>Add/Update/Delete Game</p>

            </li>
            <li>
              <a href="#" className="text-decoration-none">
                <img
                  src="path-to-icon"
                  alt="icon"
                  width="20"
                  className="me-2"
                />
                Game Result [F4]
              </a>
              <p style={textStyle}>Add/Update/Delete Game Result</p>

            </li>
            <li>
              <a href="#" className="text-decoration-none">
                <img
                  src="path-to-icon"
                  alt="icon"
                  width="20"
                  className="me-2"
                />
                Select Game [F5]
              </a>
              <p style={textStyle}>Select Default Game</p>

            </li>
            {/* Add more items as needed */}
          </ul>
        </div>

        {/* Transaction Section */}
        <div className="col-md-4">
          <h5>Transaction</h5>
          <ul className="list-unstyled">
            <li>
              <a href="#" className="text-decoration-none">
                <img
                  src="https://static-00.iconduck.com/assets.00/file-excel-icon-1603x2048-18bcewtx.png"
                  alt="icon"
                  width="30"
                  className="me-2"
                />
                Manage Record (Jantri) [F1]
              </a>
              <p style={textStyle}>Book Set</p>

            </li>
            <li>
              <a href="#" className="text-decoration-none">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1378/1378621.png"
                  alt="icon"
                  width="30"
                  className="me-2"
                />
                Show Ledger [F2]
              </a>
              <p style={textStyle}>Show All Bet</p>

            </li>
            <li>
              <a href="#" className="text-decoration-none">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/5880/5880378.png"
                  alt="icon"
                  width="30"
                  className="me-2"
                />
                Forward Bet [F8]
              </a>
              <p style={textStyle}>Share Your Bet</p>

            </li>
            <li>
              <a href="#" className="text-decoration-none">
                <img
                  src="https://play-lh.googleusercontent.com/Em6UR6KgiH-X1uEvlQ1pFiVDh3QA5Yd_y2m8hj0osjTd5SHCWWRo13VOFJHiJV5JPbA"
                  alt="icon"
                  width="30"
                  className="me-2"
                />
                Customer Hisab [F9]
              </a>
            </li>
            <li>
              <a href="#" className="text-decoration-none">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2132/2132384.png"
                  alt="icon"
                  width="30"
                  className="me-2"
                />
                Khaiwal Hisab [F10]
              </a>
            </li>
            {/* Add more items as needed */}
          </ul>
        </div>

        {/* Reports Section */}
        <div className="col-md-4">
          <h5>Reports</h5>
          <ul className="list-unstyled">
            <li>
              <a href="#" className="text-decoration-none">
                <img
                  src="path-to-icon"
                  alt="icon"
                  width="20"
                  className="me-2"
                />
                Profit & Loss Chart [F11]
              </a>
            </li>
            <li>
              <a href="#" className="text-decoration-none">
                <img
                  src="path-to-icon"
                  alt="icon"
                  width="20"
                  className="me-2"
                />
                Customer Report [F12]
              </a>
            </li>
            <li>
              <a href="#" className="text-decoration-none">
                <img
                  src="path-to-icon"
                  alt="icon"
                  width="20"
                  className="me-2"
                />
                Delete Data [Ctrl+R]
              </a>
            </li>
            <li>
              <a href="#" className="text-decoration-none">
                <img
                  src="path-to-icon"
                  alt="icon"
                  width="20"
                  className="me-2"
                />
                Database BackUp [Ctrl+B]
              </a>
            </li>
            {/* Add more items as needed */}
          </ul>
        </div>
      </div>

      {/* Footer Section */}
      <div className="row bg-secondary text-white p-2 mt-auto">
        <div className="col text-center">© 2025 Your Company Name</div>
      </div>
    </div>
  );
};

export default Dashboard;