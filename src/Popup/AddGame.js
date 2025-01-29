import React, { useState } from "react";

const LotteryPopup = ({ show, handleClose }) => {
  const [lotteryName, setLotteryName] = useState("");
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [selectedTime, setSelectedTime] = useState("AM");

  const handleSave = () => {
    console.log("Lottery Name:", lotteryName);
    console.log("Time:", `${hours}:${minutes} ${selectedTime}`);
    handleClose();
  };

  return (
    <div className={`modal fade ${show ? "show d-block" : "d-none"}`} tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Enter Lottery Category Details</h5>
            <button type="button" className="btn-close" onClick={handleClose}></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label className="form-label">Lottery Name</label>
              <input
                type="text"
                className="form-control"
                value={lotteryName}
                onChange={(e) => setLotteryName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Game Time</label>
              <div className="d-flex">
                <input
                  type="number"
                  className="form-control me-2"
                  placeholder="HH"
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                />
                <input
                  type="number"
                  className="form-control me-2"
                  placeholder="MM"
                  value={minutes}
                  onChange={(e) => setMinutes(e.target.value)}
                />
                <select className="form-select" onChange={(e) => setSelectedTime(e.target.value)}>
                  <option>AM</option>
                  <option>PM</option>
                </select>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={handleClose}>Close</button>
            <button className="btn btn-primary" onClick={handleSave}>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LotteryPopup;
