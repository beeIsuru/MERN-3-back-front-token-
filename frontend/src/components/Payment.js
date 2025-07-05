import React, { useState, useEffect } from "react";
import axios from "axios";

function Payment() {
  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cnn, setCnn] = useState("");
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // Fetch payments on load
  useEffect(() => {
    axios
      .get("http://localhost:5001/user/payment", { withCredentials: true })
      .then((res) => {
        setPayments(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching payments:", err);
        setLoading(false);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:5001/user/payment",
        { name, cardNumber, cnn },
        { withCredentials: true }
      )
      .then((res) => {
        setMessage(res.data);
        // Refresh payment list
        return axios.get("http://localhost:5001/user/payment", {
          withCredentials: true,
        });
      })
      .then((res) => {
        setPayments(res.data);
        setName("");
        setCardNumber("");
        setCnn("");
      })
      .catch((err) => {
        console.error("Error adding payment:", err);
        setMessage("Error adding payment");
      });
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}>
      <h2>Add Payment</h2>
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
        <button type="submit">Add Payment</button>
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
              CNN: {payment.cnn}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Payment;
