const ExpressBrute = require("express-brute");

const store = new ExpressBrute.MemoryStore();

const bruteForce = new ExpressBrute(store, {
  freeRetries: 5,
  minWait: 5 * 60 * 1000, // 5 minutes
  maxWait: 60 * 60 * 1000, // 1 hour
  lifetime: 60 * 60, // 1 hour
  failCallback: (req, res /*, next, nextValidRequestDate */) => {
    res.status(429).json({
      success: false,
      message: "Too many attempts. Please try again later.",
    });
  },
});

module.exports = bruteForce;
