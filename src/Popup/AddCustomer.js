import React from "react";
import Modal from "react-modal";

// Bind modal to app element (for accessibility)
Modal.setAppElement("#root");

const Popup = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={{
        content: { width: "600px", margin: "auto", padding: "20px" },
      }}
    >
      <h2>Customer Account</h2>
      <form>
        <label>
          Name:
          <input type="text" name="name" />
        </label>
        <br />
        <label>
          Address:
          <textarea name="address" />
        </label>
        <br />
        <label>
          Phone:
          <input type="text" name="phone" />
        </label>
        <br />
        <label>
          Mobile:
          <input type="text" name="mobile" />
        </label>
        <br />
        <label>
          E-Mail:
          <input type="email" name="email" />
        </label>
        <br />
        {/* Add more fields as needed */}
        <button type="button" onClick={onClose}>
          Close
        </button>
      </form>
    </Modal>
  );
};

export default Popup;
