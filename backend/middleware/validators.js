const { body, validationResult } = require("express-validator");

const patterns = {
  fullName: /^[A-Za-z\s'-]{2,60}$/,
  idNumber: /^[0-9]{13}$/,
  username: /^[A-Za-z0-9_]{4,20}$/,
  accountNumber: /^[0-9]{8,12}$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#_-])[A-Za-z\d@$!%*?&.#_-]{8,30}$/,
  amount: /^(?!0$)(?!0\.00$)\d+(\.\d{1,2})?$/,
  swiftCode: /^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/,
  currency: /^(USD|EUR|GBP|ZAR|AED)$/,
  provider: /^SWIFT$/,
};

const handleValidation = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Invalid input. Please check your details and try again.",
      errors: errors.array().map((error) => ({
        field: error.path,
        message: error.msg,
      })),
    });
  }

  next();
};

const registerValidation = [
  body("fullName")
    .trim()
    .escape()
    .blacklist("$.")
    .matches(patterns.fullName)
    .withMessage("Full name may only contain letters, spaces, apostrophes and hyphens."),

  body("idNumber")
    .trim()
    .blacklist("$.")
    .matches(patterns.idNumber)
    .withMessage("ID number must be exactly 13 digits."),

  body("username")
    .trim()
    .escape()
    .blacklist("$.")
    .matches(patterns.username)
    .withMessage("Username must be 4-20 characters and contain only letters, numbers or underscores."),

  body("accountNumber")
    .trim()
    .blacklist("$.")
    .matches(patterns.accountNumber)
    .withMessage("Account number must be 8-12 digits."),

  body("password")
    .matches(patterns.password)
    .withMessage("Password must be 8-30 characters with uppercase, lowercase, number and special character."),

  handleValidation,
];

const loginValidation = [
  body("username")
    .trim()
    .escape()
    .blacklist("$.")
    .matches(patterns.username)
    .withMessage("Invalid login details."),
  body("accountNumber")
    .trim()
    .blacklist("$.")
    .matches(patterns.accountNumber)
    .withMessage("Invalid login details."),
  body("password").notEmpty().withMessage("Invalid login details."),
  handleValidation,
];

const paymentValidation = [
  body("amount")
    .custom((value) => patterns.amount.test(String(value)))
    .withMessage("Amount must be a valid positive amount with up to 2 decimals."),

  body("currency")
    .trim()
    .matches(patterns.currency)
    .withMessage("Invalid currency selected."),

  body("provider")
    .trim()
    .matches(patterns.provider)
    .withMessage("Invalid payment provider."),

  body("payeeName")
    .trim()
    .escape()
    .blacklist("$.")
    .matches(patterns.fullName)
    .withMessage("Payee name contains invalid characters."),

  body("payeeAccountNumber")
    .trim()
    .blacklist("$.")
    .matches(patterns.accountNumber)
    .withMessage("Payee account number must be 8-12 digits."),

  body("swiftCode")
    .trim()
    .toUpperCase()
    .matches(patterns.swiftCode)
    .withMessage("SWIFT code must be 8 or 11 characters."),

  handleValidation,
];

module.exports = {
  registerValidation,
  loginValidation,
  paymentValidation,
  patterns,
};