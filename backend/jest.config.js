module.exports = {
  testEnvironment: "node",
  testMatch: ["**/__tests__/**/*.test.js", "**/*.test.js"],
  coverageDirectory: "coverage",
  collectCoverageFrom: [
    "middleware/**/*.js",
    "routes/**/*.js",
    "models/**/*.js",
    "!node_modules/**",
  ],
  testTimeout: 10000,
  setupFilesAfterEnv: ["<rootDir>/__tests__/setup.js"],
};
