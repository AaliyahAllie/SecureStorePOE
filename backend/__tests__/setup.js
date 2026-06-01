// Setup for all tests
afterAll(async () => {
  // Close any open database connections
  if (require("mongoose").connection.readyState === 1) {
    await require("mongoose").connection.close();
  }
});
