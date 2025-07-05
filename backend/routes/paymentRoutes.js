// // ====================================
// // 8️⃣ routes/paymentRoutes.js
// // ====================================
// const express = require("express");
// const router = express.Router();
// const { addPayment, getPayment } = require("../controllers/paymentController");
// const { verifyToken } = require("../middlewares/authMiddleware");

// router.post("/payment", verifyToken, addPayment);
// router.get("/payment", verifyToken, getPayment);

// module.exports = router;

const express = require("express");
const router = express.Router();
const {
  addFamily,
  getFamily,
} = require("../controllers/familyMemberController");
const { verifyToken } = require("../middlewares/authMiddleware");

// Changed paths to be more RESTful
router.post("/family-members", verifyToken, addFamily);
router.get("/family-members", verifyToken, getFamily);

module.exports = router;
