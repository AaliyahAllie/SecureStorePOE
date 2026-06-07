const fs = require("fs");
const path = require("path");

describe("Employee Account Management Tests", () => {
  describe("Employee registration restriction", () => {
    test("employeeAuth.js should NOT have registration endpoint", () => {
      const employeeAuthPath = path.join(
        __dirname,
        "../routes/employeeAuth.js"
      );
      const employeeAuthCode = fs.readFileSync(employeeAuthPath, "utf8");

      expect(employeeAuthCode).not.toContain('router.post("/register"');
      expect(employeeAuthCode).not.toContain("router.post(\"/register\"");
    });

    test("employeeAuth.js should ONLY have login, /me, and logout", () => {
      const employeeAuthPath = path.join(
        __dirname,
        "../routes/employeeAuth.js"
      );
      const employeeAuthCode = fs.readFileSync(employeeAuthPath, "utf8");

      expect(employeeAuthCode).toContain('router.post("/login"');
      expect(employeeAuthCode).toContain('router.get("/me"');
      expect(employeeAuthCode).toContain('router.post("/logout"');
    });

    test("Frontend should NOT have employee registration page", () => {
      const appPath = path.join(__dirname, "../..");
      const frontendPath = path.join(appPath, "frontend/src");

      // Check if EmployeeRegister exists (it shouldn't)
      const hasEmployeeRegister =
        fs.existsSync(path.join(frontendPath, "pages/EmployeeRegister.jsx")) ||
        fs.existsSync(path.join(frontendPath, "pages/EmployeeRegister.js"));

      expect(hasEmployeeRegister).toBe(false);
    });
  });

  describe("Employee model", () => {
    test("Employee model should have required fields", () => {
      const employeeModelPath = path.join(__dirname, "../models/Employee.js");
      const employeeModelCode = fs.readFileSync(employeeModelPath, "utf8");

      expect(employeeModelCode).toContain("username");
      expect(employeeModelCode).toContain("passwordHash");
      expect(employeeModelCode).toContain("fullName");
      expect(employeeModelCode).toContain("role");
    });

    test("Employee model should NOT store plaintext passwords", () => {
      const employeeModelPath = path.join(__dirname, "../models/Employee.js");
      const employeeModelCode = fs.readFileSync(employeeModelPath, "utf8");

      expect(employeeModelCode).not.toContain('password: {');
      expect(employeeModelCode).toContain("passwordHash");
    });

    test("Employee model should have role enum", () => {
      const employeeModelPath = path.join(__dirname, "../models/Employee.js");
      const employeeModelCode = fs.readFileSync(employeeModelPath, "utf8");

      expect(employeeModelCode).toContain("enum");
      expect(employeeModelCode).toContain("employee");
      expect(employeeModelCode).toContain("manager");
      expect(employeeModelCode).toContain("admin");
    });
  });

  describe("Employee seed script", () => {
    test("seed script should exist", () => {
      const seedPath = path.join(__dirname, "../scripts/seedEmployees.js");
      expect(fs.existsSync(seedPath)).toBe(true);
    });

    test("seed script should use bcrypt for hashing", () => {
      const seedPath = path.join(__dirname, "../scripts/seedEmployees.js");
      const seedCode = fs.readFileSync(seedPath, "utf8");

      expect(seedCode).toContain("bcrypt");
      expect(seedCode).toContain("genSalt");
      expect(seedCode).toContain("hash");
    });

    test("seed script should create test employees", () => {
      const seedPath = path.join(__dirname, "../scripts/seedEmployees.js");
      const seedCode = fs.readFileSync(seedPath, "utf8");

      expect(seedCode).toContain("insertMany");
      expect(seedCode).toContain("testEmployees");
    });

    test("seed script should check if employees exist before seeding", () => {
      const seedPath = path.join(__dirname, "../scripts/seedEmployees.js");
      const seedCode = fs.readFileSync(seedPath, "utf8");

      expect(seedCode).toContain("countDocuments");
    });

    test("seed script should have connect and disconnect logic", () => {
      const seedPath = path.join(__dirname, "../scripts/seedEmployees.js");
      const seedCode = fs.readFileSync(seedPath, "utf8");

      expect(seedCode).toContain("mongoose.connect");
      expect(seedCode).toContain("connection.close");
    });
  });

  describe("Employee login validation", () => {
    test("employeeAuth.js should validate username and password", () => {
      const employeeAuthPath = path.join(
        __dirname,
        "../routes/employeeAuth.js"
      );
      const employeeAuthCode = fs.readFileSync(employeeAuthPath, "utf8");

      expect(employeeAuthCode).toContain("username");
      expect(employeeAuthCode).toContain("password");
    });

    test("employeeAuth.js should use bcrypt.compare for password check", () => {
      const employeeAuthPath = path.join(
        __dirname,
        "../routes/employeeAuth.js"
      );
      const employeeAuthCode = fs.readFileSync(employeeAuthPath, "utf8");

      expect(employeeAuthCode).toContain("bcrypt.compare");
    });

    test("employeeAuth.js should reject invalid credentials", () => {
      const employeeAuthPath = path.join(
        __dirname,
        "../routes/employeeAuth.js"
      );
      const employeeAuthCode = fs.readFileSync(employeeAuthPath, "utf8");

      expect(employeeAuthCode).toContain("401");
    });
  });
});
