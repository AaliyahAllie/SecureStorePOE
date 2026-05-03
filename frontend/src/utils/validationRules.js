// frontend/src/utils/validationRules.js
export const validationRules = {
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/,
  username: /^[a-zA-Z0-9_]{4,20}$/,
  idNumber: /^\d{13}$/,
  accountNumber: /^\d{8,12}$/,
  amount: /^(?!0$)(?!0\.00$)\d+(\.\d{1,2})?$/,
  swiftCode: /^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/,
  currency: /^(USD|EUR|GBP|ZAR|AED)$/,
  provider: /^SWIFT$/,
  fullName: /^[A-Za-z\s'-]{2,60}$/,
};

export const getFieldError = (errors, fieldName) => {
  return errors[fieldName]?.message;
};

export const validateField = (value, pattern) => {
  return pattern.test(value);
};