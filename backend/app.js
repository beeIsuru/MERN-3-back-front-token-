// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const userRoutes = require("./routes/userRoutes");
// const familyRoutes = require("./routes/familyMembersRoutes");
// const paymentRoutes = require("./routes/paymentRoutes");
// const weatherRoutes = require("./routes/weatherRoutes");
// require("dotenv").config();

// const app = express();

// // Middleware
// app.use(cors({ origin: "http://localhost:3000" }));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // MongoDB connection
// mongoose
//   .connect(
//     "mongodb+srv://ibimsara00:pMKMPT02YzBizUnx@cluster0.eo2yq54.mongodb.net/familyApp2"
//   )
//   .then(() => console.log("MongoDB Connected (familyApp2)"))
//   .catch((err) => console.error("MongoDB Error:", err));

// // Routes
// app.use("/user", userRoutes);
// app.use("/user", familyRoutes);
// app.use("/user", paymentRoutes);
// app.use("/api", weatherRoutes);

// // Start server
// app.listen(5001, () => console.log("Server running on port 5001"));

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const familyRoutes = require("./routes/familyMembersRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const weatherRoutes = require("./routes/weatherRoutes");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());


// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected (familyApp2)"))
  .catch((err) => console.error("MongoDB Error:", err));

// Routes
app.use("/user", userRoutes);
app.use("/user", familyRoutes);
app.use("/user", paymentRoutes);
app.use("/api", weatherRoutes);

// Start server
app.listen(5001, () => console.log("Server running on port 5001"));
