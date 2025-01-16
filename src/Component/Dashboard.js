import React, { useState, useEffect } from "react";
import Popup from "../Popup/AddCustomer"; // Import the popup component


const Dashboard = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Cleanup timer
    return () => clearInterval(timer);
  }, []);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "F6") {
        setIsPopupOpen(true); // Open popup on F6
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const textStyle = {
    marginLeft: "38px",
  };

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
              <a
                href="#"
                className="text-decoration-none"
                onClick={() => setIsPopupOpen(true)}
              >
                <img
                  src="/Images/Customer.png"
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
                  src="/Images/Khaiwal.webp"
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
                  src="/Images/game.webp"
                  alt="icon"
                  width="40"
                  className="me-2"
                />
                Add Game [F3]
              </a>
              <p style={textStyle}>Add/Update/Delete Game</p>
            </li>
            <li>
              <a href="#" className="text-decoration-none">
                <img
                  src="/Images/result.png"
                  alt="icon"
                  width="40"
                  className="me-2"
                />
                Game Result [F4]
              </a>
              <p style={textStyle}>Add/Update/Delete Game Result</p>
            </li>
            <li>
              <a href="#" className="text-decoration-none">
                <img
                  src="/Images/select game.png"
                  alt="icon"
                  width="30"
                  className="me-2"
                />
                Select Game [F5]
              </a>
              <p style={textStyle}>Select Default Game</p>
            </li>
          </ul>
        </div>

        {/* Transaction Section */}
        <div className="col-md-4">
          <h5>Transaction</h5>
          <ul className="list-unstyled">
            <li>
              <a href="/Jantri" className="text-decoration-none">
                <img
                  src="/Images/jantri.png"
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
                  src="/Images/ledger.png"
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
                  src="/Images/forwed bet.png"
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
                  src="/Images/chisab.png"
                  alt="icon"
                  width="30"
                  className="me-2"
                />
                Customer Hisab [F9]
              </a>
              <p style={textStyle}>Check Customer Hisab</p>
            </li>
            <li>
              <a href="#" className="text-decoration-none">
                <img
                  src="/Images/khisab.png"
                  alt="icon"
                  width="30"
                  className="me-2"
                />
                Khaiwal Hisab [F10]
              </a>
              <p style={textStyle}>Check Khaiwal Hisab</p>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Section */}
      <div className="row bg-secondary text-white p-2 mt-auto">
        <div className="col text-center">© 2025 Your Company Name</div>
      </div>

      {/* Call the Popup Component */}
      <Popup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
    </div>
  );
};

export default Dashboard;
