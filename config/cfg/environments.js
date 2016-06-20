"use strict";

module.exports = {
  isDev: process.env.NODE_ENV !== "production",
  isWatch: process.env.WATCH === "true",
  isMongooseDebug: !!process.env.MONGOOSE_DEBUG,
  isDeploy: process.env.NODE_ENV === "deployment",
  isUnitWatch: process.env.IS_UNIT_WATCH === "true"
};
