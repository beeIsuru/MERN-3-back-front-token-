// ====================================
// 5️⃣ controllers/paymentController.js
// ====================================
const Payment = require("../models/Payment");

exports.addPayment = async (req, res) => {
  try {
    const { name, cardNumber, cnn } = req.body;
    const payment = new Payment({
      userId: req.userId,
      name,
      cardNumber,
      cnn,
    });
    await payment.save();
    res.send("Payment added");
  } catch (err) {
    res.status(500).send("Error adding payment");
  }
};

exports.getPayment = async (req, res) => {
  try {
    const payments = await Payment.find({ userId: req.userId });
    res.json(payments);
  } catch (err) {
    res.status(500).send("Error fetching payment");
  }
};