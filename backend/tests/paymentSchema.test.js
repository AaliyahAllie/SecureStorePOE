const Payment = require("../models/Payment");

describe("Payment model schema", () => {
  test("currency enum includes supported currencies", () => {
    expect(Payment.schema.path("currency").enumValues).toEqual(["USD", "EUR", "GBP", "ZAR", "AED"]);
  });

  test("provider enum only allows SWIFT", () => {
    expect(Payment.schema.path("provider").enumValues).toEqual(["SWIFT"]);
  });
});
