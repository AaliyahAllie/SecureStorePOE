const express = require("express");

const Payment = require("../models/Payment");
const { requireAuth } = require("../middleware/authMiddleware");
const { paymentValidation } = require("../middleware/validators");

const router = express.Router();

router.post("/", requireAuth, paymentValidation, async (req, res) => {
  try {
    const {
      amount,
      currency,
      provider,
      payeeName,
      payeeAccountNumber,
      swiftCode,
    } = req.body;

    const payment = await Payment.create({
      customer: req.session.user.id,
      amount: Number(amount),
      currency,
      provider,
      payeeName,
      payeeAccountNumber,
      swiftCode: swiftCode.toUpperCase(),
    });

    res.status(201).json({
      success: true,
      message: "International payment created successfully.",
      payment,
    });
  } catch (error) {
    console.error("Payment creation error:", error.message);

    res.status(500).json({
      success: false,
      message: "Payment could not be created.",
    });
  }
});

router.get("/my-payments", requireAuth, async (req, res) => {
  try {
    const payments = await Payment.find({
      customer: req.session.user.id,
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      payments,
    });
  } catch (error) {
    console.error("Fetch payments error:", error.message);

    res.status(500).json({
      success: false,
      message: "Could not load payments.",
    });
  }
});

module.exports = router;