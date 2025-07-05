const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: String,
  cardNumber: String,
  cnn: Number,

});

module.exports = mongoose.model("Payment", paymentSchema);
