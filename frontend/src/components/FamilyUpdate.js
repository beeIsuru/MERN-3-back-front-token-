import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Nav from "../components/Nav/Nav";

function FamilyUpdate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:5001/user/family", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const member = res.data.family.find((m) => m._id === id);
        if (member) {
          setRole(member.role);
          setName(member.name);
          setAge(member.age);
          setAddress(member.address);
        } else {
          setMessage("Family member not found");
        }
      })
      .catch((err) => {
        setMessage("Error fetching family member");
      });
    // eslint-disable-next-line
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    axios
      .put(
        `http://localhost:5001/user/family/${id}`,
        { role, name, age, address },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        setMessage("Family member updated successfully!");
        setTimeout(() => navigate("/Display"), 1000); // Navigate after 1 sec
      })
      .catch((err) => {
        setMessage("Error updating family member");
      });
  };

  return (
    <div>
      <Nav />
    <div style={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}>

      <h2>Update Family Member</h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <select value={role} onChange={(e) => setRole(e.target.value)} required>
          <option value="">Select role</option>
          <option value="parent">Parent</option>
          <option value="child">Child</option>
          <option value="spouse">Spouse</option>
          <option value="sibling">Sibling</option>
          <option value="other">Other</option>
        </select>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <button type="submit">Update</button>
      </form>
      {message && <p>{message}</p>}
    </div>
    </div>
  );
}

export default FamilyUpdate;

