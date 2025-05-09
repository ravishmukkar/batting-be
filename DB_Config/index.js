"use strict";
const mongoose = require("mongoose");
const config = require("../Config");

mongoose.connect(config.DB_URL);

const db = mongoose.connection;

db.on("error", () => console.error);

db.once("open", () => console.log("Database Connected"));
