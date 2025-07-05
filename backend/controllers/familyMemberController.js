// File: backend/controllers/familyMemberController.js

// const FamilyMember = require("../models/FamilyMember");

// exports.addFamily = async (req, res) => {
//   try {
//     const { role, name, age, address } = req.body;

//     // Validate required fields
//     if (!role || !name || !age || !address) {
//       return res.status(400).send("All fields are required");
//     }

//     const familyMember = new FamilyMember({
//       userId: req.userId,
//       role,
//       name,
//       age: Number(age),
//       address,
//     });

//     await familyMember.save();
//     res.status(201).json({ message: "Family member added", familyMember });
//   } catch (err) {
//     console.error("Error adding family member:", err);
//     res.status(500).send("Error adding family member");
//   }
// };

// exports.getFamily = async (req, res) => {
//   try {
//     const family = await FamilyMember.find({ userId: req.userId });

//     if (!family || family.length === 0) {
//       return res.status(404).json({
//         success: false,
//         message: "No family members found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       count: family.length,
//       data: family,
//     });
//   } catch (err) {
//     console.error("Error fetching family:", err);
//     res.status(500).json({
//       error: "Error fetching family",
//       details: err.message,
//     });
//   }
// };

const FamilyMember = require("../models/FamilyMember");

exports.addFamily = async (req, res) => {
  try {
    const { role, name, age, address } = req.body;

    if (!role || !name || !age || !address) {
      return res.status(400).json({ message: "All fields are required" }); // ✅ changed to json
    }

    const familyMember = new FamilyMember({
      userId: req.userId,
      role,
      name,
      age: Number(age),
      address,
    });

    await familyMember.save();

    res.status(201).json({
      message: "Family member added successfully",
      familyMember,
    }); // ✅ clearer response
  } catch (err) {
    console.error("Error adding family member:", err);
    res
      .status(500)
      .json({ message: "Error adding family member", error: err.message }); // ✅
  }
};

exports.getFamily = async (req, res) => {
  try {
    const family = await FamilyMember.find({ userId: req.userId }).sort({
      createdAt: -1,
    }); // ✅ sort latest first

    if (!family || family.length === 0) {
      return res.status(404).json({ message: "No family members found" }); // ✅ clear response if empty
    }

    res.json({
      message: "Family members fetched successfully",
      family,
    }); // ✅ clear structure
  } catch (err) {
    console.error("Error fetching family:", err);
    res
      .status(500)
      .json({ message: "Error fetching family", error: err.message }); // ✅
  }
};
