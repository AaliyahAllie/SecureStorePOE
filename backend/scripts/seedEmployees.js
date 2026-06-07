require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Employee = require("../models/Employee");

const seedEmployees = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✓ Connected to MongoDB");

    // Check if employees already exist
    const existingCount = await Employee.countDocuments();
    if (existingCount > 0) {
      console.log(`✓ ${existingCount} employees already exist. Skipping seed.`);
      await mongoose.connection.close();
      return;
    }

    // Create test employees
    const testEmployees = [
      {
        username: "john_employee",
        fullName: "John Smith",
        role: "employee",
      },
      {
        username: "jane_manager",
        fullName: "Jane Doe",
        role: "manager",
      },
      {
        username: "admin_user",
        fullName: "Admin Account",
        role: "admin",
      },
    ];

    // Hash passwords and insert
    const employeesToInsert = await Promise.all(
      testEmployees.map(async (emp) => {
        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash("SecurePass123!", salt);
        return {
          ...emp,
          passwordHash,
          active: true,
        };
      })
    );

    await Employee.insertMany(employeesToInsert);
    console.log("✓ Seeded 3 test employees:");
    console.log("  - john_employee (employee role) - Password: SecurePass123!");
    console.log("  - jane_manager (manager role) - Password: SecurePass123!");
    console.log("  - admin_user (admin role) - Password: SecurePass123!");

    await mongoose.connection.close();
    console.log("✓ Seed complete");
  } catch (error) {
    console.error("✗ Seed failed:", error.message);
    process.exit(1);
  }
};

seedEmployees();
