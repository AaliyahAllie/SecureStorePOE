const express = require("express");
const bcrypt = require("bcryptjs");

const Employee = require("../models/Employee");
const employeeAuth = require("../middleware/employeeAuth");

const router = express.Router();

/*
  POST /api/employee/auth/login
*/
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const employee = await Employee.findOne({
      username,
    });

    if (!employee) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password",
      });
    }

    const validPassword =
      await bcrypt.compare(
        password,
        employee.passwordHash
      );

    if (!validPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password",
      });
    }

    req.session.employee = {
      id: employee._id,
      username: employee.username,
      role: employee.role,
    };

    res.json({
      success: true,
      employee: {
        username: employee.username,
        role: employee.role,
        fullName: employee.fullName,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

/*
  GET /api/employee/auth/me
*/
router.get(
  "/me",
  employeeAuth,
  async (req, res) => {
    res.json({
      success: true,
      employee: req.session.employee,
    });
  }
);

/*
  POST /api/employee/auth/logout
*/
router.post(
  "/logout",
  employeeAuth,
  (req, res) => {
    req.session.destroy(() => {
      res.json({
        success: true,
      });
    });
  }
);

module.exports = router;