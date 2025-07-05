import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddFamily() {
  const [form, setForm] = useState({
    role: "",
    name: "",
    age: "",
    address: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Basic validation
    if (!form.role || !form.name || !form.age || !form.address) {
      alert("Please fill in all fields.");
      return;
    }

    const allowedRoles = ["parent", "child", "spouse", "sibling", "other"];
    if (!allowedRoles.includes(form.role.toLowerCase())) {
      alert("Role must be one of: parent, child, spouse, sibling, other.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please log in first.");
        navigate("/");
        return;
      }

      const res = await axios.post("http://localhost:5001/user/family", form, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert(res.data.message);
      setForm({ role: "", name: "", age: "", address: "" }); // ✅ clear form
      navigate("/Display"); // ✅ go to Display immediately after adding
    } catch (err) {
      console.error("Error adding family member:", err);
      if (err.response?.data?.message) {
        alert(err.response.data.message);
      } else {
        alert("Failed to add family member. Please try again.");
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Logged out");
    navigate("/"); // ✅ clean navigation
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Add Family Member</h2>
        <input
          placeholder="Role (parent, child, spouse, sibling, other)"
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        />
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Age"
          type="number"
          value={form.age}
          onChange={(e) => setForm({ ...form, age: e.target.value })}
        />
        <input
          placeholder="Address"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        />
        <button type="submit">Add Family Member</button>
      </form>

      <button
        style={{ marginTop: "20px" }}
        onClick={() => navigate("/Display")}
      >
        Display Family Members
      </button>
      <button
        style={{ marginTop: "20px" }}
        onClick={() => navigate("/payment")}
      >
        Add Payment
      </button>
      <button
        style={{ marginTop: "20px" }}
        onClick={handleLogout} // ✅ simplified
      >
        Logouts
      </button>
    </div>
  );
}

export default AddFamily;
