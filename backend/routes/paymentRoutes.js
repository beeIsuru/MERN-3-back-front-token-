// // ====================================
// // 8️⃣ routes/paymentRoutes.js
// // ====================================

const express = require("express");
const router = express.Router();
const { addPayment, getPayment,updatePayment } = require("../controllers/paymentController");
const { verifyToken } = require("../middlewares/authMiddleware");

// Changed paths to be more RESTful
router.post("/payment", verifyToken, addPayment);
router.get("/payment", verifyToken, getPayment);
router.put("/payment/:id", verifyToken, updatePayment);

module.exports = router;
