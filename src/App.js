import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./Component/LoginForm";
import Dashboard from "./Component/Dashboard";
import JantriMain from "./Jantri/JantriMain";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/Jantri" element={<JantriMain />} />
      </Routes>
    </Router>
  );
};

export default App;
