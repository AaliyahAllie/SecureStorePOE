const { patterns } = require("../middleware/validators");

describe("Validation patterns", () => {
  test("fullName pattern accepts common names", () => {
    expect(patterns.fullName.test("John Doe")).toBe(true);
    expect(patterns.fullName.test("O'Connor-Smith")).toBe(true);
    expect(patterns.fullName.test("Jane<admin>")).toBe(false);
  });

  test("idNumber pattern accepts exactly 13 digits", () => {
    expect(patterns.idNumber.test("1234567890123")).toBe(true);
    expect(patterns.idNumber.test("12345")).toBe(false);
    expect(patterns.idNumber.test("123456789012a")).toBe(false);
  });

  test("username pattern allows letters, numbers, and underscores", () => {
    expect(patterns.username.test("user_123")).toBe(true);
    expect(patterns.username.test("user-123")).toBe(false);
  });

  test("password pattern enforces strength requirements", () => {
    expect(patterns.password.test("Password@123")).toBe(true);
    expect(patterns.password.test("password123")).toBe(false);
  });
});
