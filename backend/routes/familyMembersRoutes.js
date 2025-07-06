// ====================================
// 7️⃣ routes/familyMembersRoutes.js
// ====================================


const express = require("express");
const router = express.Router();
const {
  addFamily,
  getFamily,
} = require("../controllers/familyMemberController");
const { verifyToken } = require("../middlewares/authMiddleware");

router.post("/family", verifyToken, addFamily);
router.get("/family", verifyToken, getFamily);

module.exports = router;
