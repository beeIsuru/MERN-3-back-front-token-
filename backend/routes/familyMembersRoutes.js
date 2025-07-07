// ====================================
// 7️⃣ routes/familyMembersRoutes.js
// ====================================


const express = require("express");
const router = express.Router();
const {
  addFamily,
  getFamily,
  updateFamily,
  deleteFamily,
} = require("../controllers/familyMemberController");
const { verifyToken } = require("../middlewares/authMiddleware");

router.post("/family", verifyToken, addFamily);
router.get("/family", verifyToken, getFamily);
router.put("/family/:id", verifyToken, updateFamily);     // 🆕 Update
router.delete("/family/:id", verifyToken, deleteFamily);

module.exports = router;
