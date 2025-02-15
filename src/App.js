import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./Component/LoginForm";
import Dashboard from "./Component/Dashboard";
import JantriMain from "./Jantri/JantriMain";
import AddKhaiwal from "./Popup/AddKhaiwal";
import MobileJantri from "./Component/Pages/MobileJantri"
import Cutting from "./Component/Pages/Cutting";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/Jantri" element={<JantriMain />} />
        <Route path="/AddKhaiwal" element={<AddKhaiwal />} />
        <Route path="/MobileJantri" element={<MobileJantri />} />
        <Route path="/Cutting" element={<Cutting />} />
      </Routes>
    </Router>
  );
};

export default App;
