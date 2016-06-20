"use strict";

const logger = require("koa-logger");

module.exports = function(app) {
  app.use(logger());
};
