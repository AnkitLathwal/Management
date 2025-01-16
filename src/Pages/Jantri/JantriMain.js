import React from "react";
import Header from './Header';
import NumberGrid from "./NumberGrid";
import RightPanel from "./RightPanel";
import Footer from "./Footer";
import "./Jantri.css";

const JantriMain = () => {
  return (
    <div className="app-container">
      <Header />
      <div className="main-content">
        <NumberGrid />
        <RightPanel />
      </div>
      <Footer />
    </div>
  );
};

export default JantriMain;
