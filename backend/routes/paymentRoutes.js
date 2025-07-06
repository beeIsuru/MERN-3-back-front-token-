// // ====================================
// // 8️⃣ routes/paymentRoutes.js
// // ====================================


const express = require("express");
const router = express.Router();
const {
  addPayment,
  getPayment,
} = require("../controllers/paymentController");
const { verifyToken } = require("../middlewares/authMiddleware");

// Changed paths to be more RESTful
router.post("/payment", verifyToken, addPayment);
router.get("/payment", verifyToken, getPayment);

module.exports = router;
