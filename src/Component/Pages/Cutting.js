import React, { useState, useRef } from "react";
import { Table, Button, Form, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Cutting = () => {
  const [number, setNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [entries, setEntries] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const amountRef = useRef(null);
  const numberRef = useRef(null);

  const handleNumberKeyPress = (event) => {
    if (event.key === "Enter" && number.length > 0) {
      amountRef.current.focus();
    }
  };

  const handleAmountKeyPress = (event) => {
    if (event.key === "Enter" && amount) {
      const numbersArray = number.match(/.{1,2}/g) || [];
      numbersArray.reverse(); 
      const newEntries = numbersArray.map((num, index) => ({
        id: entries.length + index + 1,
        number: num,
        amount: parseFloat(amount),
      }));

      setEntries([...entries, ...newEntries]);
      setTotalAmount(totalAmount + newEntries.reduce((sum, entry) => sum + entry.amount, 0));
      setNumber("");
      setAmount("");
      numberRef.current.focus();
    }
  };

  return (
    <div className="container-fluid p-3" style={{ backgroundColor: "#d0f0c0" }}>
      <h6>:: CUTTING :: -- Command=[For Save Press "F12"],[For Cutting Press "Space"],[For Recover Press "R"][For Harup Press "H"]</h6>
      <Row className="mb-2 align-items-center">
        <Col md={3}><b>Lottery Name:</b> <Form.Control as="select"><option>4 GAZIABAD (08:01 AM)</option></Form.Control></Col>
        <Col md={2}><b>Customer Name:</b> <Form.Control as="select"><option>10 %</option></Form.Control></Col>
        <Col md={2}><b>Game Type:</b> <Form.Control as="select"><option>PATTI</option></Form.Control></Col>
        <Col md={2}><Form.Control type="date" value="2025-02-09" /></Col>
      </Row>
      
      <Row>
        <Col md={5}>
          <Form.Control as="textarea" rows={2} placeholder="Enter Number" value={number} onChange={(e) => setNumber(e.target.value)} onKeyPress={handleNumberKeyPress} ref={numberRef} />
        </Col>
        <Col md={2}>
          <Form.Control type="text" placeholder="Enter Amount" value={amount} onChange={(e) => setAmount(e.target.value)} onKeyPress={handleAmountKeyPress} ref={amountRef} />
        </Col>
      </Row>
      
      <Row className="mt-3">
        <Col md={6}>
          <h6>A</h6>
          <Row>
            {[...Array(10)].map((_, i) => (
              <Col key={i} md={1}><Form.Control type="text" /></Col>
            ))}
          </Row>
          <h6 className="mt-2">B</h6>
          <Row>
            {[...Array(10)].map((_, i) => (
              <Col key={i} md={1}><Form.Control type="text" /></Col>
            ))}
          </Row>
        </Col>
      </Row>
      
      <Row className="mt-3">
        <Col md={6}>
          <div style={{ maxHeight: "300px", overflowY: "auto", height: "300px" }}>
            <Table bordered size="sm">
              <thead className="bg-dark text-white">
                <tr>
                  <th>S.no</th>
                  <th>Number</th>
                  <th>Amount (Rs.)</th>
                </tr>
              </thead>
              <tbody>
                {entries.length > 0 ? (
                  entries.map((entry) => (
                    <tr key={entry.id}>
                      <td>{entry.id}</td>
                      <td>{entry.number}</td>
                      <td>{entry.amount}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center">No Data</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
          <h5 className="mt-2">Total Amount: <span className="border p-1">{totalAmount}</span></h5>
        </Col>
      </Row>
      
      <Row>
        <Col md={2}><Button variant="success">New</Button></Col>
        <Col md={2}><Button variant="primary">Save</Button></Col>
        <Col md={2}><Button variant="warning">Update</Button></Col>
        <Col md={2}><Button variant="danger">Delete</Button></Col>
      </Row>
    </div>
  );
};

export default Cutting;
