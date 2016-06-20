"use strict";

const serve  = require("koa-static");
const config = require("config");

module.exports = function(app) {
  app.use(serve(config.get("rootServer") + "/public"));
};
