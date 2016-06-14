"use strict";

const config = require("config");
const co     = require("co");

const mongoose   = require("odm");
const loadModels = require("../fixtures/libs/loadModels");

module.exports = function(options) {

  return function() {

    return co(function*() {
      yield mongoose.connect(config.get("mongoose.uri"), config.get("mongoose.options"));
      yield* loadModels("./fixtures");
      yield mongoose.disconnect();
    });

  };

};
