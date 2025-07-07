

import React, { useState, useEffect } from "react";
import axios from "axios";

function Payment() {
  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cnn, setCnn] = useState("");
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [editingId, setEditingId] = useState(null);

  const getToken = () => localStorage.getItem("token");

  useEffect(() => {
    fetchPayments();
    // eslint-disable-next-line
  }, []);

  const fetchPayments = () => {
    const token = getToken();
    if (!token) {
      setMessage("You must be logged in to view payments.");
      setLoading(false);
      return;
    }
    axios
      .get("http://localhost:5001/user/payment", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setPayments(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching payments:", err);
        setLoading(false);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = getToken();
    if (!token) {
      setMessage("You must be logged in to add or update a payment.");
      return;
    }
    if (editingId) {
      // Update payment
      axios
        .put(
          `http://localhost:5001/user/payment/${editingId}`,
          { name, cardNumber, cnn },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((res) => {
          setMessage(res.data.message);
          setEditingId(null);
          setName("");
          setCardNumber("");
          setCnn("");
          fetchPayments();
        })
        .catch((err) => {
          console.error("Error updating payment:", err);
          setMessage("Error updating payment");
        });
    } else {
      // Add new payment
      axios
        .post(
          "http://localhost:5001/user/payment",
          { name, cardNumber, cnn },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((res) => {
          setMessage(res.data);
          setName("");
          setCardNumber("");
          setCnn("");
          fetchPayments();
        })
        .catch((err) => {
          console.error("Error adding payment:", err);
          setMessage("Error adding payment");
        });
    }
  };

  // When user clicks "Edit"
  const handleEdit = (payment) => {
    setEditingId(payment._id);
    setName(payment.name);
    setCardNumber(payment.cardNumber);
    setCnn(payment.cnn);
    setMessage("");
  };

  // When user cancels editing
  const handleCancelEdit = () => {
    setEditingId(null);
    setName("");
    setCardNumber("");
    setCnn("");
    setMessage("");
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}>
      <h2>{editingId ? "Update Payment" : "Add Payment"}</h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <input
          type="text"
          placeholder="Cardholder Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Card Number"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="CNN"
          value={cnn}
          onChange={(e) => setCnn(e.target.value)}
          required
        />
        <button type="submit">
          {editingId ? "Update Payment" : "Add Payment"}
        </button>
        {editingId && (
          <button
            type="button"
            onClick={handleCancelEdit}
            style={{ background: "#ccc" }}
          >
            Cancel
          </button>
        )}
      </form>

      {message && <p>{message}</p>}

      <h2 style={{ marginTop: "30px" }}>Your Payments</h2>
      {loading && <p>Loading...</p>}
      {!loading && payments.length === 0 && <p>No payments found.</p>}
      {!loading && payments.length > 0 && (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {payments.map((payment) => (
            <li
              key={payment._id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "10px",
                marginBottom: "10px",
                backgroundColor: "#f9f9f9",
              }}
            >
              <strong>{payment.name}</strong> <br />
              Card Number: {payment.cardNumber} <br />
              CNN: {payment.cnn} <br />
              <button
                style={{ marginTop: "5px" }}
                onClick={() => handleEdit(payment)}
              >
                Edit
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Payment;
