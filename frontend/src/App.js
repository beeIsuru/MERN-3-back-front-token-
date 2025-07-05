// 📄 frontend/App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import AddFamily from "./components/AddFamily";
import Payment from "./components/Payment";
import Display from "./components/Display";
import Weather from "./components/Weather/Weather";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/addFamily" element={<AddFamily />} />
      <Route path="/Display" element={<Display />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/weather" element={<Weather />} />
    </Routes>
  );
}

export default App;
