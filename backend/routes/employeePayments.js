const express = require("express");

const Payment = require("../models/Payment");
const employeeAuth = require("../middleware/employeeAuth");

const router = express.Router();

router.get(
  "/",
  employeeAuth,
  async (req, res) => {

    try {

      const payments =
        await Payment.find()
          .populate(
            "customer",
            "fullName accountNumber"
          )
          .sort({
            createdAt: -1
          });

      res.json({
        success: true,
        payments
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message
      });

    }

  }
);

router.get(
  "/stats",
  employeeAuth,
  async (req, res) => {

    const pending =
      await Payment.countDocuments({
        status: "Pending"
      });

    const verified =
      await Payment.countDocuments({
        status: "Verified"
      });

    const submitted =
      await Payment.countDocuments({
        status:
          "Submitted to SWIFT"
      });

    const rejected =
      await Payment.countDocuments({
        status: "Rejected"
      });

    res.json({
      pending,
      verified,
      submitted,
      rejected
    });

  }
);

router.put(
  "/:id/verify",
  employeeAuth,
  async (req, res) => {

    const payment =
      await Payment.findById(
        req.params.id
      );

    if (!payment) {

      return res.status(404).json({
        success: false
      });

    }

    payment.status =
      "Verified";

    payment.verifiedBy =
      req.session.employee.id;

    payment.verifiedAt =
      new Date();

    await payment.save();

    res.json({
      success: true
    });

  }
);

router.put(
  "/:id/reject",
  employeeAuth,
  async (req, res) => {

    const payment =
      await Payment.findById(
        req.params.id
      );

    if (!payment) {

      return res.status(404).json({
        success: false
      });

    }

    payment.status =
      "Rejected";

    payment.rejectedReason =
      req.body.reason || "";

    await payment.save();

    res.json({
      success: true
    });

  }
);

router.put(
  "/:id/swift",
  employeeAuth,
  async (req, res) => {

    const payment =
      await Payment.findById(
        req.params.id
      );

    if (!payment) {

      return res.status(404).json({
        success: false
      });

    }

    if (
      payment.status !==
      "Verified"
    ) {

      return res.status(400).json({
        success: false,
        message:
          "Must verify payment first"
      });

    }

    payment.status =
      "Submitted to SWIFT";

    payment.submittedAt =
      new Date();

    await payment.save();

    res.json({
      success: true
    });

  }
);

router.get(
  "/search",
  employeeAuth,
  async (req, res) => {

    const q =
      req.query.q || "";

    const payments =
      await Payment.find({
        $or: [
          {
            payeeName: {
              $regex: q,
              $options: "i"
            }
          },
          {
            swiftCode: {
              $regex: q,
              $options: "i"
            }
          },
          {
            payeeAccountNumber: {
              $regex: q,
              $options: "i"
            }
          }
        ]
      });

    res.json({
      success: true,
      payments
    });

  }
);

module.exports = router;