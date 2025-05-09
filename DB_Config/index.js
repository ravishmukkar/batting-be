"use strict";
const mongoose = require("mongoose");
const config = require("../Config");

mongoose.connect(config.DB_URL)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch(err => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1); // Optional: Stop the app if DB connection fails
  });

const db = mongoose.connection;

// Handle connection errors AFTER the initial connect
db.on("error", (err) => {
  console.error("❌ Mongoose connection error:", err.message);
});

db.once("open", () => {
  console.log("📦 Mongoose connection is open");
});
