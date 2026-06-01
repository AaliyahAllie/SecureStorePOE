const fs = require("fs");
const path = require("path");

describe("Attack Protection Tests", () => {
  describe("Helmet middleware", () => {
    test("server.js should require helmet", () => {
      const serverPath = path.join(__dirname, "../server.js");
      const serverCode = fs.readFileSync(serverPath, "utf8");
      expect(serverCode).toContain('require("helmet")');
    });

    test("server.js should use helmet()", () => {
      const serverPath = path.join(__dirname, "../server.js");
      const serverCode = fs.readFileSync(serverPath, "utf8");
      expect(serverCode).toContain("app.use(helmet");
    });

    test("server.js should have frameguard protection", () => {
      const serverPath = path.join(__dirname, "../server.js");
      const serverCode = fs.readFileSync(serverPath, "utf8");
      expect(serverCode).toContain("helmet.frameguard");
      expect(serverCode).toContain('action: "deny"');
    });

    test("server.js should have noSniff protection", () => {
      const serverPath = path.join(__dirname, "../server.js");
      const serverCode = fs.readFileSync(serverPath, "utf8");
      expect(serverCode).toContain("helmet.noSniff()");
    });

    test("server.js should have referrer policy", () => {
      const serverPath = path.join(__dirname, "../server.js");
      const serverCode = fs.readFileSync(serverPath, "utf8");
      expect(serverCode).toContain("helmet.referrerPolicy");
      expect(serverCode).toContain("no-referrer");
    });
  });

  describe("Rate limiting", () => {
    test("server.js should require express-rate-limit", () => {
      const serverPath = path.join(__dirname, "../server.js");
      const serverCode = fs.readFileSync(serverPath, "utf8");
      expect(serverCode).toContain('require("express-rate-limit")');
    });

    test("server.js should apply global rate limiting", () => {
      const serverPath = path.join(__dirname, "../server.js");
      const serverCode = fs.readFileSync(serverPath, "utf8");
      expect(serverCode).toContain("rateLimit({");
    });

    test("bruteForce middleware should limit login attempts", () => {
      const bruteForceCode = fs.readFileSync(
        path.join(__dirname, "../middleware/bruteForce.js"),
        "utf8"
      );
      expect(bruteForceCode).toContain("windowMs");
      expect(bruteForceCode).toContain("max: 5");
    });
  });

  describe("CSRF protection", () => {
    test("server.js should require cookie-parser", () => {
      const serverPath = path.join(__dirname, "../server.js");
      const serverCode = fs.readFileSync(serverPath, "utf8");
      expect(serverCode).toContain('require("cookie-parser")');
    });

    test("server.js should require csurf", () => {
      const serverPath = path.join(__dirname, "../server.js");
      const serverCode = fs.readFileSync(serverPath, "utf8");
      expect(serverCode).toContain('require("csurf")');
    });

    test("server.js should use CSRF middleware", () => {
      const serverPath = path.join(__dirname, "../server.js");
      const serverCode = fs.readFileSync(serverPath, "utf8");
      expect(serverCode).toContain("csrf({");
    });

    test("csrfProtection middleware should exist", () => {
      const csrfPath = path.join(__dirname, "../middleware/csrfProtection.js");
      expect(fs.existsSync(csrfPath)).toBe(true);
    });
  });

  describe("Input validation sanitization", () => {
    test("validators.js should use escape()", () => {
      const validatorsPath = path.join(__dirname, "../middleware/validators.js");
      const validatorsCode = fs.readFileSync(validatorsPath, "utf8");
      expect(validatorsCode).toContain(".escape()");
    });

    test("validators.js should use blacklist for injection chars", () => {
      const validatorsPath = path.join(__dirname, "../middleware/validators.js");
      const validatorsCode = fs.readFileSync(validatorsPath, "utf8");
      expect(validatorsCode).toContain('blacklist("$.")');
    });

    test("validators.js should use trim()", () => {
      const validatorsPath = path.join(__dirname, "../middleware/validators.js");
      const validatorsCode = fs.readFileSync(validatorsPath, "utf8");
      expect(validatorsCode).toContain(".trim()");
    });
  });

  describe("SQL injection prevention", () => {
    test("routes should use Mongoose ORM, not raw SQL", () => {
      const routePaths = [
        path.join(__dirname, "../routes/auth.js"),
        path.join(__dirname, "../routes/employeeAuth.js"),
        path.join(__dirname, "../routes/payments.js"),
      ];

      routePaths.forEach((routePath) => {
        if (fs.existsSync(routePath)) {
          const routeCode = fs.readFileSync(routePath, "utf8");
          // Should NOT contain raw SQL query execution
          expect(routeCode).not.toContain("query(");
          expect(routeCode).not.toContain("execute(");
          // Should use Mongoose methods
          expect(routeCode).toMatch(/(findOne|findByIdAndUpdate|create|insertMany)/);
        }
      });
    });
  });

  describe("XSS prevention", () => {
    test("auth.js should use bcrypt for password storage", () => {
      const authPath = path.join(__dirname, "../routes/auth.js");
      const authCode = fs.readFileSync(authPath, "utf8");
      expect(authCode).toContain("bcrypt");
      expect(authCode).not.toContain("password:"); // No plaintext passwords
    });

    test("session should use httpOnly cookies", () => {
      const serverPath = path.join(__dirname, "../server.js");
      const serverCode = fs.readFileSync(serverPath, "utf8");
      expect(serverCode).toContain("httpOnly: true");
    });

    test("session should use sameSite cookie protection", () => {
      const serverPath = path.join(__dirname, "../server.js");
      const serverCode = fs.readFileSync(serverPath, "utf8");
      expect(serverCode).toContain("sameSite");
    });
  });
});
