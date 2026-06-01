const csrf = require("csurf");
const cookieParser = require("cookie-parser");

// CSRF protection middleware using cookies
const csrfProtection = csrf({ cookie: true });

// For routes that serve HTML forms (if needed in future)
const csrfErrorHandler = (err, req, res, next) => {
  if (err.code !== "EBADCSRFTOKEN") {
    return next(err);
  }

  // Handle CSRF token errors
  res.status(403).json({
    success: false,
    message: "Invalid CSRF token. Request rejected for security.",
  });
};

module.exports = {
  csrfProtection,
  csrfErrorHandler,
};
