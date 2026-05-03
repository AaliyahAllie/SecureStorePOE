const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 1,
    },
    currency: {
      type: String,
      required: true,
      enum: ["USD", "EUR", "GBP", "ZAR", "AED"],
    },
    provider: {
      type: String,
      required: true,
      enum: ["SWIFT"],
      default: "SWIFT",
    },
    payeeName: {
      type: String,
      required: true,
      trim: true,
    },
    payeeAccountNumber: {
      type: String,
      required: true,
      trim: true,
    },
    swiftCode: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Verified", "Submitted to SWIFT"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);