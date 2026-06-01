const { patterns } = require("../middleware/validators");

describe("Input Validation Tests", () => {
  describe("username validation", () => {
    test("should accept valid usernames", () => {
      const validUsernames = [
        "john_employee",
        "jane_manager",
        "admin_user",
        "user1234",
        "ValidUser",
      ];

      validUsernames.forEach((username) => {
        expect(patterns.username.test(username)).toBe(true);
      });
    });

    test("should reject invalid usernames", () => {
      const invalidUsernames = [
        "ab", // Too short (< 4)
        "user@domain", // Special chars not allowed
        "user!name", // Special chars not allowed
        "user-name", // Dash not allowed
        "a".repeat(21), // Too long (> 20)
      ];

      invalidUsernames.forEach((username) => {
        expect(patterns.username.test(username)).toBe(false);
      });
    });

    test("username length must be 4-20 characters", () => {
      expect(patterns.username.test("abc")).toBe(false); // 3 chars
      expect(patterns.username.test("abcd")).toBe(true); // 4 chars
      expect(patterns.username.test("a".repeat(20))).toBe(true); // 20 chars
      expect(patterns.username.test("a".repeat(21))).toBe(false); // 21 chars
    });
  });

  describe("account number validation", () => {
    test("should accept valid account numbers", () => {
      const validAccounts = [
        "12345678", // 8 digits
        "123456789", // 9 digits
        "1234567890", // 10 digits
        "12345678901", // 11 digits
        "123456789012", // 12 digits
      ];

      validAccounts.forEach((account) => {
        expect(patterns.accountNumber.test(account)).toBe(true);
      });
    });

    test("should reject invalid account numbers", () => {
      const invalidAccounts = [
        "1234567", // Too short (< 8)
        "1234567890123", // Too long (> 12)
        "1234567a", // Contains letter
        "12345-78", // Contains special char
        "12345.78", // Contains decimal
      ];

      invalidAccounts.forEach((account) => {
        expect(patterns.accountNumber.test(account)).toBe(false);
      });
    });

    test("account number must be 8-12 digits", () => {
      expect(patterns.accountNumber.test("1234567")).toBe(false); // 7 digits
      expect(patterns.accountNumber.test("12345678")).toBe(true); // 8 digits
      expect(patterns.accountNumber.test("123456789012")).toBe(true); // 12 digits
      expect(patterns.accountNumber.test("1234567890123")).toBe(false); // 13 digits
    });
  });

  describe("SWIFT code validation", () => {
    test("should accept valid SWIFT codes", () => {
      const validCodes = [
        "ABCDUS33", // 8 chars
        "ABCDUS33XYZ", // 11 chars
        "DEUTSCHE", // 8 chars
        "CITIUS33", // 8 chars
      ];

      validCodes.forEach((code) => {
        expect(patterns.swiftCode.test(code.toUpperCase())).toBe(true);
      });
    });

    test("should reject invalid SWIFT codes", () => {
      const invalidCodes = [
        "ABCD", // Too short
        "abcd1234", // Lowercase
        "ABCD12345678", // Too long
        "ABCD12-4", // Contains invalid chars
      ];

      invalidCodes.forEach((code) => {
        expect(patterns.swiftCode.test(code)).toBe(false);
      });
    });

    test("SWIFT code must be 8 or 11 characters", () => {
      expect(patterns.swiftCode.test("ABCDEFGH")).toBe(true); // 8 chars
      expect(patterns.swiftCode.test("ABCDEFGH123")).toBe(true); // 11 chars
      expect(patterns.swiftCode.test("ABCDEFG")).toBe(false); // 7 chars
      expect(patterns.swiftCode.test("ABCDEFGH12")).toBe(false); // 10 chars
    });
  });

  describe("currency validation", () => {
    test("should accept whitelisted currencies", () => {
      const validCurrencies = ["USD", "EUR", "GBP", "ZAR", "AED"];

      validCurrencies.forEach((currency) => {
        expect(patterns.currency.test(currency)).toBe(true);
      });
    });

    test("should reject non-whitelisted currencies", () => {
      const invalidCurrencies = ["XXX", "BTC", "JPY", "usd", "Eur"];

      invalidCurrencies.forEach((currency) => {
        expect(patterns.currency.test(currency)).toBe(false);
      });
    });
  });

  describe("full name validation", () => {
    test("should accept valid full names", () => {
      const validNames = [
        "John Smith",
        "Jane Doe",
        "Mary O'Brien",
        "Jean-Paul Dupont",
        "Anna-Marie Anderson",
      ];

      validNames.forEach((name) => {
        expect(patterns.fullName.test(name)).toBe(true);
      });
    });

    test("should reject invalid full names", () => {
      const invalidNames = [
        "J", // Too short
        "John Smith123", // Contains numbers
        "John@Smith", // Contains special chars
        "John_Smith", // Contains underscore
      ];

      invalidNames.forEach((name) => {
        expect(patterns.fullName.test(name)).toBe(false);
      });
    });
  });

  describe("amount validation", () => {
    test("should accept valid amounts", () => {
      const validAmounts = ["100", "100.50", "1000.99", "50.1"];

      validAmounts.forEach((amount) => {
        expect(patterns.amount.test(amount)).toBe(true);
      });
    });

    test("should reject invalid amounts", () => {
      const invalidAmounts = [
        "0", // Cannot be zero
        "0.00", // Cannot be zero
        "-100", // Cannot be negative
        "100.999", // Too many decimals
        "abc", // Not a number
      ];

      invalidAmounts.forEach((amount) => {
        expect(patterns.amount.test(amount)).toBe(false);
      });
    });
  });
});
