"use strict";

const spa = require("./controllers/spa");

module.exports = function(app) {

  app.use(spa);

};
