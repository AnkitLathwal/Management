import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());
  const navigate = useNavigate();

  // Predefined valid credentials
  const validCredentials = {
    userId: "A1", // Replace with your valid User ID
    password: "123", // Replace with your valid Password
  };

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer); // Cleanup the timer
  }, []);

  const handleLogin = () => {
    // Check if credentials match
    if (userId === validCredentials.userId && password === validCredentials.password) {
      navigate("/dashboard", { state: { userId } });
    } else {
      alert("Invalid User ID or Password! Please try again.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow" style={{ width: "300px" }}>
        <h3 className="text-center">User Login</h3>
        <p className="text-center text-muted">
          {currentTime.toLocaleDateString()} {currentTime.toLocaleTimeString()}
        </p>
        <div className="mb-3">
          <label htmlFor="userId" className="form-label">
            User ID
          </label>
          <input
            type="text"
            id="userId"
            className="form-control"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="d-flex justify-content-between">
          <button className="btn btn-primary" onClick={handleLogin}>
            Login
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => {
              setUserId("");
              setPassword("");
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
