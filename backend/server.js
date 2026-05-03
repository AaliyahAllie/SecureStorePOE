require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const authRoutes = require("./routes/auth");

const app = express();

// 🔒 SECURITY
app.use(helmet());
app.use(express.json());

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

// 🛡️ RATE LIMIT
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
}));

// 🔐 SESSION
app.use(session({
  secret: "supersecretkey",
  resave: false,
  saveUninitialized: false
}));

// ☁️ MONGODB ATLAS CONNECTION
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Atlas Connected"))
.catch(err => console.log(err));

// ROUTES
app.use("/api/auth", authRoutes);

// START
app.listen(5000, () => console.log("Server running on port 5000"));