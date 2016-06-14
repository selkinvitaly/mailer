"use strict";

module.exports = {
  isDev: process.env.NODE_ENV !== "production",
  isWatch: process.env.WATCH === "true",
  isMongooseDebug: !!process.env.MONGOOSE_DEBUG
};
