import React, { useState, useEffect } from "react";
import Popup from "../Popup/AddCustomer";
import AddGame from "../Popup/AddGame";

const Dashboard = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isAddGameOpen, setIsAddGameOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "F6") {
        e.preventDefault();
        setIsPopupOpen(true);
      } else if (e.key === "F3") {
        e.preventDefault();
        setIsAddGameOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="container-fluid bg-light vh-100 d-flex flex-column">
      <header className="row bg-primary text-white p-3 align-items-center">
        <div className="col-6">
          <h4>$$ Game Management $$</h4>
        </div>
        <div className="col-6 text-end">
          <h5>
            {currentTime.toLocaleDateString()} Time: {currentTime.toLocaleTimeString()}
          </h5>
          <p>Welcome: A1</p>
        </div>
      </header>

      <main className="row flex-grow-1 overflow-auto mt-4 px-3">
        {["Master", "Transaction"].map((section, sectionIndex) => (
          <div className="col-md-6" key={sectionIndex}>
            <div className="card shadow-sm p-3 mb-4">
              <h5 className="card-title">{section}</h5>
              <ul className="list-unstyled">
                {(section === "Master" ? [
                  { src: "Customer.png", text: "Add Customer [F6]", desc: "Add/Update/Delete Customer", shortcut: () => setIsPopupOpen(true) },
                  { src: "Khaiwal.webp", text: "Add Khaiwal [F7]", desc: "Add/Update/Delete Khaiwal" },
                  { src: "game.webp", text: "Add Game [F3]", desc: "Add/Update/Delete Game", shortcut: () => setIsAddGameOpen(true) },
                  { src: "result.png", text: "Game Result [F4]", desc: "Add/Update/Delete Game Result" },
                  { src: "select game.png", text: "Select Game [F5]", desc: "Select Default Game" },
                ] : [
                  { src: "jantri.png", text: "Manage Record (Jantri) [F1]", desc: "Book Set", link: "/Jantri" },
                  { src: "ledger.png", text: "Show Ledger [F2]", desc: "Show All Bet" },
                  { src: "forwed bet.png", text: "Forward Bet [F8]", desc: "Share Your Bet" },
                  { src: "chisab.png", text: "Customer Hisab [F9]", desc: "Check Customer Hisab" },
                  { src: "khisab.png", text: "Khaiwal Hisab [F10]", desc: "Check Khaiwal Hisab" },
                ]).map(({ src, text, desc, shortcut, link }, index) => (
                  <li key={index} className="mb-2">
                    <a
                      href={link || "#"}
                      className="text-decoration-none d-flex align-items-center"
                      onClick={(e) => {
                        e.preventDefault();
                        if (shortcut) shortcut();
                      }}
                    >
                      <img src={`/Images/${src}`} alt="icon" width="30" className="me-2" />
                      {text}
                    </a>
                    <p className="ms-4 text-muted">{desc}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </main>

      <footer className="row bg-secondary text-white p-2 text-center mt-auto">
        <div className="col">© 2025 Your Company Name</div>
      </footer>

      {/* Popups */}
      {isPopupOpen && <Popup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />}
      {isAddGameOpen && <AddGame isOpen={isAddGameOpen} onClose={() => setIsAddGameOpen(false)} />}
    </div>
  );
};

export default Dashboard;
