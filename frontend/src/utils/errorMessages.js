// frontend/src/utils/errorMessages.js
export const errorMessages = {
  password: {
    required: "Password is required",
    pattern: "Password must be 8-30 characters with uppercase, lowercase, number, and special character (@$!%*?&)"
  },
  username: {
    required: "Username is required",
    pattern: "Username must be 4-20 characters (letters, numbers, underscores only)"
  },
  idNumber: {
    required: "ID number is required",
    pattern: "ID number must be exactly 13 digits"
  },
  accountNumber: {
    required: "Account number is required",
    pattern: "Account number must be 8-12 digits"
  },
  amount: {
    required: "Amount is required",
    pattern: "Amount must be a positive number with up to 2 decimal places"
  },
  swiftCode: {
    required: "SWIFT code is required",
    pattern: "SWIFT code must be 8 or 11 characters (e.g., ABCDUS33XXX)"
  },
  currency: {
    required: "Currency is required",
    pattern: "Please select a valid currency"
  },
  provider: {
    required: "Payment provider is required",
    pattern: "SWIFT is the only supported provider"
  },
  fullName: {
    required: "Full name is required",
    pattern: "Full name may only contain letters, spaces, apostrophes, and hyphens"
  },
  payeeName: {
    required: "Payee name is required",
    pattern: "Payee name may only contain letters, spaces, apostrophes, and hyphens"
  },
  payeeAccountNumber: {
    required: "Payee account number is required",
    pattern: "Payee account number must be 8-12 digits"
  }
};