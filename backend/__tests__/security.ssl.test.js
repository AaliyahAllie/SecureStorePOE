const fs = require("fs");
const path = require("path");

describe("SSL/HTTPS Configuration Tests", () => {
  describe("certificate files", () => {
    test("should have private key file", () => {
      const keyPath = path.join(__dirname, "../certs/localhost-key.pem");
      expect(fs.existsSync(keyPath)).toBe(true);
    });

    test("should have certificate file", () => {
      const certPath = path.join(__dirname, "../certs/localhost.pem");
      expect(fs.existsSync(certPath)).toBe(true);
    });

    test("private key should be readable", () => {
      const keyPath = path.join(__dirname, "../certs/localhost-key.pem");
      const key = fs.readFileSync(keyPath, "utf8");
      expect(key).toContain("BEGIN");
      expect(key).toContain("PRIVATE KEY");
    });

    test("certificate should be readable", () => {
      const certPath = path.join(__dirname, "../certs/localhost.pem");
      const cert = fs.readFileSync(certPath, "utf8");
      expect(cert).toContain("BEGIN");
      expect(cert).toContain("CERTIFICATE");
    });
  });

  describe("HTTPS server configuration", () => {
    test("server.js should require https module", () => {
      const serverPath = path.join(__dirname, "../server.js");
      const serverCode = fs.readFileSync(serverPath, "utf8");
      expect(serverCode).toContain('require("https")');
    });

    test("server.js should use https.createServer", () => {
      const serverPath = path.join(__dirname, "../server.js");
      const serverCode = fs.readFileSync(serverPath, "utf8");
      expect(serverCode).toContain("https.createServer");
    });

    test("server.js should load SSL certificates", () => {
      const serverPath = path.join(__dirname, "../server.js");
      const serverCode = fs.readFileSync(serverPath, "utf8");
      expect(serverCode).toContain("localhost-key.pem");
      expect(serverCode).toContain("localhost.pem");
    });
  });

  describe("HSTS configuration", () => {
    test("server.js should have HSTS in production", () => {
      const serverPath = path.join(__dirname, "../server.js");
      const serverCode = fs.readFileSync(serverPath, "utf8");
      expect(serverCode).toContain("helmet.hsts");
    });

    test("HSTS should have maxAge of 31536000 (1 year)", () => {
      const serverPath = path.join(__dirname, "../server.js");
      const serverCode = fs.readFileSync(serverPath, "utf8");
      expect(serverCode).toContain("31536000");
    });

    test("HSTS should include subdomains", () => {
      const serverPath = path.join(__dirname, "../server.js");
      const serverCode = fs.readFileSync(serverPath, "utf8");
      expect(serverCode).toContain("includeSubDomains");
    });

    test("HSTS should have preload enabled", () => {
      const serverPath = path.join(__dirname, "../server.js");
      const serverCode = fs.readFileSync(serverPath, "utf8");
      expect(serverCode).toContain("preload");
    });
  });
});
