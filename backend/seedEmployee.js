require("dotenv").config();

const mongoose =
  require("mongoose");

const bcrypt =
  require("bcryptjs");

const Employee =
  require("./models/Employee");

mongoose.connect(
  process.env.MONGO_URI
);

(async () => {

  const exists =
    await Employee.findOne({
      username: "employee"
    });

  if (exists) {

    console.log(
      "Employee already exists"
    );

    process.exit();

  }

  const hash =
    await bcrypt.hash(
      "Employee@123",
      12
    );

  await Employee.create({
    username: "employee",
    passwordHash: hash,
    fullName:
      "Global Bank Employee",
    role: "employee"
  });

  console.log(
    "Employee created"
  );

  process.exit();

})();