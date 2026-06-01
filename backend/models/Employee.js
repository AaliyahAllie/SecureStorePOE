const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

    passwordHash: {
      type: String,
      required: true
    },

    fullName: {
      type: String,
      required: true
    },

    role: {
      type: String,
      enum: ["employee", "manager", "admin"],
      default: "employee"
    },

    active: {
      type: Boolean,
      default: true
    },

    lastLogin: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model(
  "Employee",
  employeeSchema
);