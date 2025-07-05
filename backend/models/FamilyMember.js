// const mongoose = require("mongoose");

// const familyMemberSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//   role: String,
//   name: String,
//   age: Number,
//   address: String,
// });

// module.exports = mongoose.model("FamilyMember", familyMemberSchema);

const mongoose = require("mongoose");

const familyMemberSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["parent", "child", "spouse", "sibling", "other"], // example roles
    },
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
      min: 0,
    },
    address: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("FamilyMember", familyMemberSchema);
