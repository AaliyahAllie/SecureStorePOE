const express = require("express");
const bcrypt = require("bcryptjs");

const User = require("../models/User");
const {
  registerValidation,
  loginValidation,
} = require("../middleware/validators");
const { requireAuth } = require("../middleware/authMiddleware");
const bruteForce = require("../middleware/bruteForce");

const router = express.Router();

router.post("/register", bruteForce, registerValidation, async (req, res) => {
  try {
    const { fullName, idNumber, username, accountNumber, password } = req.body;

    const existingUser = await User.findOne({
      $or: [{ username: username.toLowerCase() }, { idNumber }, { accountNumber }],
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Registration could not be completed.",
      });
    }

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = await User.create({
      fullName,
      idNumber,
      username: username.toLowerCase(),
      accountNumber,
      passwordHash,
    });

    req.session.user = {
      id: user._id,
      username: user.username,
      fullName: user.fullName,
      accountNumber: user.accountNumber,
    };

    return res.status(201).json({
      success: true,
      message: "Registration successful.",
      user: req.session.user,
    });
  } catch (error) {
    console.error("Registration error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Registration could not be completed.",
    });
  }
});

router.post("/login", bruteForce, loginValidation, async (req, res) => {
  try {
    const { username, accountNumber, password } = req.body;

    const user = await User.findOne({
      username: username.toLowerCase(),
      accountNumber,
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid login details.",
      });
    }

    const passwordMatches = await bcrypt.compare(password, user.passwordHash);

    if (!passwordMatches) {
      return res.status(401).json({
        success: false,
        message: "Invalid login details.",
      });
    }

    req.session.regenerate((error) => {
      if (error) {
        return res.status(500).json({
          success: false,
          message: "Login failed.",
        });
      }

      req.session.user = {
        id: user._id,
        username: user.username,
        fullName: user.fullName,
        accountNumber: user.accountNumber,
      };

      return res.json({
        success: true,
        message: "Login successful.",
        user: req.session.user,
      });
    });
  } catch (error) {
    console.error("Login error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Login failed.",
    });
  }
});

router.get("/me", requireAuth, (req, res) => {
  return res.json({
    success: true,
    user: req.session.user,
  });
});

router.post("/logout", requireAuth, (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("globalbank.sid");

    return res.json({
      success: true,
      message: "Logged out successfully.",
    });
  });
});

module.exports = router;