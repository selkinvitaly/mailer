"use strict";

const router = require("./router");

module.exports = function(app) {

  app.use(router.routes());

};
