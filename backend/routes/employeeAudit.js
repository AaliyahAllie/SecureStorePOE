const express = require("express");

const router =
  express.Router();

const employeeAuth =
  require(
    "../middleware/employeeAuth"
  );

const AuditLog =
  require(
    "../models/AuditLog"
  );

router.get(
  "/",
  employeeAuth,
  async (req, res) => {
    try {

      const logs =
        await AuditLog
          .find()
          .sort({
            createdAt: -1,
          });

      res.json({
        success: true,
        logs,
      });

    } catch (error) {

      console.error(error);

      res.status(500).json({
        success: false,
        message:
          "Failed to load logs",
      });
    }
  }
);

module.exports = router;