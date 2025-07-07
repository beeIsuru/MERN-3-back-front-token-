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


exports.updatePayment = async (req, res) => {
  try {
    const paymentId = req.params.id;
    const { name, cardNumber, cnn } = req.body;

    // Only update if the payment belongs to the logged-in user
    const payment = await Payment.findOneAndUpdate(
      { _id: paymentId, userId: req.userId },
      { name, cardNumber, cnn },
      { new: true } // Return updated doc
    );

    if (!payment) {
      return res.status(404).json({ message: "Payment not found or unauthorized" });
    }

    res.json({ message: "Payment updated", payment });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating payment");
  }
};


