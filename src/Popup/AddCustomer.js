import React, { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

const Popup = ({ isOpen, onClose }) => {
  const [customerList, setCustomerList] = useState([]);
  const [customer, setCustomer] = useState({
    id: "",
    date: new Date().toISOString().split("T")[0],
    name: "",
    address: "",
    phone: "",
    commission: "",
    jodi: "",
    harup: "",
    patti: "",
    dailyCharge: ""
  });

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (customer.id) {
      // If customer has an ID, update existing customer
      setCustomerList(
        customerList.map((cust) => (cust.id === customer.id ? customer : cust))
      );
    } else {
      // If no ID, create a new customer
      const newCustomer = { ...customer, id: Date.now().toString() }; // Generate a unique ID
      setCustomerList([...customerList, newCustomer]);
    }

    // Reset form after saving
    setCustomer({
      id: "",
      date: new Date().toISOString().split("T")[0],
      name: "",
      address: "",
      phone: "",
      commission: "",
      jodi: "",
      harup: "",
      patti: "",
      dailyCharge: ""
    });
  };

  const handleSelectCustomer = (selectedCustomer) => {
    // Fill the form with selected customer's details
    setCustomer(selectedCustomer);
  };

  const handleUpdate = () => {
    if (customer.id) {
      setCustomerList(
        customerList.map((cust) => (cust.id === customer.id ? customer : cust))
      );
      // Reset form after update
      setCustomer({
        id: "",
        date: new Date().toISOString().split("T")[0],
        name: "",
        address: "",
        phone: "",
        commission: "",
        jodi: "",
        harup: "",
        patti: "",
        dailyCharge: ""
      });
    }
  };

  const handleDelete = () => {
    if (customer.id) {
      // Delete customer from the list
      setCustomerList(customerList.filter((cust) => cust.id !== customer.id));
      // Reset the form after deletion
      setCustomer({
        id: "",
        date: new Date().toISOString().split("T")[0],
        name: "",
        address: "",
        phone: "",
        commission: "",
        jodi: "",
        harup: "",
        patti: "",
        dailyCharge: ""
      });
    }
  };

  const handleNew = () => {
    // Reset form to allow creating a new customer
    setCustomer({
      id: "",
      date: new Date().toISOString().split("T")[0],
      name: "",
      address: "",
      phone: "",
      commission: "",
      jodi: "",
      harup: "",
      patti: "",
      dailyCharge: ""
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={{
        content: {
          width: "800px",
          margin: "auto",
          padding: "20px",
          backgroundColor: "#f8f9fa"
        }
      }}
    >
      <h2>Customer Account</h2>
      <div className="d-flex">
        {/* Left Section - Customer List */}
        <div className="w-50 pe-3" style={{ backgroundColor: "#e9ecef", padding: "10px", borderRadius: "8px" }}>
          <input type="text" placeholder="Search Customer" className="form-control mb-2" />
          <ul className="list-group">
            {customerList.map((cust, index) => (
              <li
                key={index}
                className="list-group-item"
                onClick={() => handleSelectCustomer(cust)}
                style={{ cursor: "pointer" }}
              >
                {cust.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Right Section - Customer Form */}
        <div className="w-50" style={{ backgroundColor: "#ffffff", padding: "10px", borderRadius: "8px" }}>
          <div className="mb-2">
            <label>ID:</label>
            <input type="text" name="id" value={customer.id} onChange={handleChange} className="form-control" disabled />
          </div>
          <div className="mb-2">
            <label>Date:</label>
            <input type="date" name="date" value={customer.date} onChange={handleChange} className="form-control" />
          </div>
          <div className="mb-2">
            <label>Name:</label>
            <input type="text" name="name" value={customer.name} onChange={handleChange} className="form-control" />
          </div>
          <div className="mb-2">
            <label>Address:</label>
            <textarea name="address" value={customer.address} onChange={handleChange} className="form-control" />
          </div>
          <div className="mb-2">
            <label>Phone:</label>
            <input type="text" name="phone" value={customer.phone} onChange={handleChange} className="form-control" />
          </div>
          <div className="mb-2">
            <label>Commission:</label>
            <input type="text" name="commission" value={customer.commission} onChange={handleChange} className="form-control" />
          </div>
          <div className="mb-2">
            <label>Jodi:</label>
            <input type="text" name="jodi" value={customer.jodi} onChange={handleChange} className="form-control" />
          </div>
          <div className="mb-2">
            <label>Harup:</label>
            <input type="text" name="harup" value={customer.harup} onChange={handleChange} className="form-control" />
          </div>
          <div className="mb-2">
            <label>Patti (%):</label>
            <input type="text" name="patti" value={customer.patti} onChange={handleChange} className="form-control" />
          </div>
          <div className="mb-2">
            <label>Daily Charge:</label>
            <input type="text" name="dailyCharge" value={customer.dailyCharge} onChange={handleChange} className="form-control" />
          </div>
          
          {/* Buttons */}
          <div className="d-flex justify-content-between mt-3">
            <button className="btn btn-secondary" onClick={handleNew}>New</button>
            <button 
              className="btn btn-primary" 
              onClick={handleSave} 
              disabled={customer.id !== ""}  // Disable Save when editing
            >
              Save
            </button>
            <button className="btn btn-warning" onClick={handleUpdate} disabled={customer.id === ""}>
              Update
            </button>
            <button className="btn btn-danger" onClick={handleDelete} disabled={customer.id === ""}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default Popup;
