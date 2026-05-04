require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const https = require("https");
const fs = require("fs");
const path = require("path");

const MongoStoreImport = require("connect-mongo");
const MongoStore = MongoStoreImport.default || MongoStoreImport;

const authRoutes = require("./routes/auth");
const paymentRoutes = require("./routes/payments");

const app = express();

app.enable("trust proxy");

app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

app.use(helmet.frameguard({ action: "deny" }));
app.use(helmet.noSniff());
app.use(helmet.referrerPolicy({ policy: "no-referrer" }));

if (process.env.NODE_ENV === "production") {
  app.use(
    helmet.hsts({
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true,
    })
  );
}

app.use(express.json({ limit: "10kb" }));

const frontendOrigins = [
  process.env.FRONTEND_URL || "http://localhost:3000",
  "http://localhost:3000",
  "https://localhost:3000",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || frontendOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("CORS policy: Origin not allowed"));
    },
    credentials: true,
  })
);

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: {
      success: false,
      message: "Too many requests. Please try again later.",
    },
  })
);

if (!process.env.MONGO_URI) {
  console.error("MONGO_URI is missing. Check backend/.env");
  process.exit(1);
}

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Atlas connected"))
  .catch((error) => {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  });

app.use(
  session({
    name: "globalbank.sid",
    secret: process.env.SESSION_SECRET || "fallback_secret_change_this",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      collectionName: "sessions",
    }),
    cookie: {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 1000 * 60 * 60,
    },
  })
);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "GlobalBank Secure HTTPS API is running",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/payments", paymentRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

const PORT = process.env.PORT || 5001;

const sslOptions = {
  key: fs.readFileSync(path.join(__dirname, "certs", "localhost-key.pem")),
  cert: fs.readFileSync(path.join(__dirname, "certs", "localhost.pem")),
};

https.createServer(sslOptions, app).listen(PORT, () => {
  console.log(`GlobalBank Secure API running on https://localhost:${PORT}`);
});