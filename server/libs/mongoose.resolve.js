"use strict";

const mongoose = require("mongoose");
const config = require("config");

if (config.get("env.isMongooseDebug")) {
  mongoose.set("debug", true);
}

module.exports = mongoose;
