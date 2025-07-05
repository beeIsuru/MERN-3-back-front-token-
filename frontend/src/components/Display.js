import React, { useEffect, useState } from "react";
import axios from "axios";

function Display() {
  const [family, setFamily] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFamily = async () => {
      try {
        const token = localStorage.getItem("token"); // ✅ retrieve token
        if (!token) {
          console.error("No token found. Please log in.");
          setLoading(false);
          return;
        }

        const res = await axios.get("http://localhost:5001/user/family", {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ send token in Authorization header
          },
        });

        // ✅ adjust to your backend response structure
        setFamily(res.data.family || []);
        setLoading(false);
      } catch (err) {
        console.error(
          "Error fetching family:",
          err.response?.data || err.message
        );
        setLoading(false);
      }
    };

    fetchFamily();
  }, []);

  return (
    <div>
      <h2>Family Members</h2>

      {loading && <p>Loading...</p>}

      {!loading && family.length === 0 && <p>No family members found.</p>}

      {!loading && family.length > 0 && (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {family.map((member) => (
            <li key={member._id} style={{ marginBottom: "10px" }}>
              <strong>Role:</strong> {member.role}
              <br />
              <strong>Name:</strong> {member.name} ({member.age} years)
              <br />
              <strong>Address:</strong> {member.address}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Display;
