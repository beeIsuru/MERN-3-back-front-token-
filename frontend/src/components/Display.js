

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav/Nav";

function Display() {
  const [family, setFamily] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Fetch family members
  const fetchFamily = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("No token found. Please log in.");
        setLoading(false);
        return;
      }
      const res = await axios.get("http://localhost:5001/user/family", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFamily(res.data.family || []);
      setLoading(false);
    } catch (err) {
      setMessage(
        "Error fetching family: " + (err.response?.data?.message || err.message)
      );
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFamily();
    // eslint-disable-next-line
  }, []);

  // Handle delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this member?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5001/user/family/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("Family member deleted successfully.");
      fetchFamily();
    } catch (err) {
      setMessage(
        "Error deleting family member: " +
          (err.response?.data?.message || err.message)
      );
    }
  };

  // Handle update (navigate to update page)
  const handleUpdate = (id) => {
    navigate(`/updateFamily/${id}`);
  };

  return (
    <div>
            <Nav />
      <h2>Family Members</h2>

      {message && <p>{message}</p>}

      {loading && <p>Loading...</p>}

      {!loading && family.length === 0 && <p>No family members found.</p>}

      {!loading && family.length > 0 && (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {family.map((member) => (
            <li
              key={member._id}
              style={{
                marginBottom: "10px",
                border: "1px solid #eee",
                borderRadius: "6px",
                padding: "10px",
              }}
            >
              <strong>Role:</strong> {member.role}
              <br />
              <strong>Name:</strong> {member.name} ({member.age} years)
              <br />
              <strong>Address:</strong> {member.address}
              <br />
              <button
                style={{ marginRight: "10px", marginTop: "5px" }}
                onClick={() => handleUpdate(member._id)}
              >
                Update
              </button>
              <button
                style={{
                  background: "#f44336",
                  color: "white",
                  marginTop: "5px",
                }}
                onClick={() => handleDelete(member._id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Display;
