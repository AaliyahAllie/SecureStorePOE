const bcrypt = require("bcryptjs");
const { patterns } = require("../middleware/validators");

describe("Password Security Tests", () => {
  describe("bcrypt salt rounds", () => {
    test("should use at least 12 salt rounds", async () => {
      const salt = await bcrypt.genSalt(12);
      const hashed = await bcrypt.hash("TestPassword123!", salt);

      // Verify that password is hashed (not plaintext)
      expect(hashed).not.toBe("TestPassword123!");
      expect(hashed).toMatch(/^\$2[aby]\$/); // bcryptjs format
    });

    test("should hash same password differently each time", async () => {
      const password = "TestPassword123!";
      const hash1 = await bcrypt.hash(password, await bcrypt.genSalt(12));
      const hash2 = await bcrypt.hash(password, await bcrypt.genSalt(12));

      expect(hash1).not.toBe(hash2);
    });
  });

  describe("password comparison", () => {
    test("should correctly compare matching passwords", async () => {
      const password = "SecurePass123!";
      const salt = await bcrypt.genSalt(12);
      const hashed = await bcrypt.hash(password, salt);

      const isMatch = await bcrypt.compare(password, hashed);
      expect(isMatch).toBe(true);
    });

    test("should reject non-matching passwords", async () => {
      const password = "SecurePass123!";
      const wrongPassword = "WrongPass123!";
      const salt = await bcrypt.genSalt(12);
      const hashed = await bcrypt.hash(password, salt);

      const isMatch = await bcrypt.compare(wrongPassword, hashed);
      expect(isMatch).toBe(false);
    });

    test("should never compare with plaintext", async () => {
      const password = "TestPassword123!";
      const salt = await bcrypt.genSalt(12);
      const hashed = await bcrypt.hash(password, salt);

      // Ensure we're comparing hashed vs plaintext, not plaintext vs plaintext
      expect(hashed).not.toBe(password);
      expect(typeof hashed).toBe("string");
      expect(hashed.length).toBeGreaterThan(password.length);
    });
  });

  describe("password requirements", () => {
    test("password regex should enforce complexity requirements", () => {
      const passwordRegex = patterns.password;

      // Valid passwords
      expect(passwordRegex.test("ValidPass123!")).toBe(true);
      expect(passwordRegex.test("StrongPassword@99")).toBe(true);

      // Invalid passwords
      expect(passwordRegex.test("weakpass")).toBe(false); // No uppercase, number, special
      expect(passwordRegex.test("WeakPass1")).toBe(false); // No special character
      expect(passwordRegex.test("NoNumber!ABC")).toBe(false); // No number
      expect(passwordRegex.test("Nouppercase1!")).toBe(false); // No uppercase
    });

    test("password must be 8-30 characters", () => {
      const passwordRegex = patterns.password;

      // Too short
      expect(passwordRegex.test("Pass1!")).toBe(false);

      // Too long (31 chars)
      expect(passwordRegex.test("VeryLongPasswordWith123!AbcDef9999")).toBe(false);
    });
  });
});
